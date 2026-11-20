import {describeGarment} from "./names.js";
function canvas(width,height) {
  const c=document.createElement("canvas"); c.width=width;c.height=height;return c;
}
let worker;
function analyze(category,mask) {
  return new Promise(resolve=>{
    try {worker??=new Worker(new URL("analyze.js",import.meta.url));}
    catch {resolve({});return;}
    const reset=()=>{worker?.terminate();worker=null;resolve({});};
    const timeout=setTimeout(reset,90000);
    worker.onmessage=e=>{clearTimeout(timeout);resolve(e.data);};
    worker.onerror=()=>{clearTimeout(timeout);reset();};
    worker.postMessage({category,mask},mask?[category.buffer,mask.buffer]:[category.buffer]);
  });
}
function modelInput(photo,size,pad) {
  const c=canvas(size,size),ctx=c.getContext("2d");
  ctx.fillStyle=pad?"#727272":"white";ctx.fillRect(0,0,size,size);
  const scale=Math.min(size/photo.width,size/photo.height);
  const w=pad?Math.round(photo.width*scale):size,h=pad?Math.round(photo.height*scale):size;
  ctx.drawImage(photo,(size-w)/2,(size-h)/2,w,h);
  return ctx.getImageData(0,0,size,size).data;
}
// A connected, plain backdrop can also be cut out when model downloads are unavailable.
function trimBackdrop(pixels,w,h) {
  const d=pixels.data, refs=[0,w-1,w*(h-1),w*h-1].map(i=>Array.from(d.slice(i*4,i*4+3)));
  const distance=(a,b)=>Math.max(...a.map((v,k)=>Math.abs(v-b[k])));
  const bg=refs.find(c=>refs.filter(v=>distance(c,v)<23).length>=3);
  if(!bg)return false;
  const mark=new Uint8Array(w*h), queue=new Int32Array(w*h);let head=0,end=0;
  function test(i) {
    if(mark[i])return;
    mark[i]=1; const k=i*4;
    if(Math.max(Math.abs(d[k]-bg[0]),Math.abs(d[k+1]-bg[1]),Math.abs(d[k+2]-bg[2]))<=32)queue[end++]=i;
  }
  for(let x=0;x<w;x++){test(x);test((h-1)*w+x);}
  for(let y=0;y<h;y++){test(y*w);test(y*w+w-1);}
  while(head<end){const i=queue[head++],x=i%w;if(x)test(i-1);if(x<w-1)test(i+1);if(i>=w)test(i-w);if(i+w<w*h)test(i+w);}
  if(end<w*h*.04||end>w*h*.96)return false;
  for(let i=0;i<end;i++)d[queue[i]*4+3]=0;
  return true;
}
function bounds(data,w,h) {
  let x1=w,x2=-1,y1=h,y2=-1;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(data[(y*w+x)*4+3]>40){
    x1=Math.min(x1,x);x2=Math.max(x2,x);y1=Math.min(y1,y);y2=Math.max(y2,y);
  }
  return x2<x1?null:[x1,y1,x2-x1+1,y2-y1+1];
}
export async function preparePhoto(file,initialCategory) {
  const img=new Image(),url=URL.createObjectURL(file);img.src=url;
  try{await img.decode();}finally{URL.revokeObjectURL(url);}
  const scale=Math.min(1,900/Math.max(img.naturalWidth,img.naturalHeight));
  const photo=canvas(Math.max(1,Math.round(img.naturalWidth*scale)),Math.max(1,Math.round(img.naturalHeight*scale)));
  const {width:w,height:h}=photo, ctx=photo.getContext("2d",{willReadFrequently:true});
  ctx.drawImage(img,0,0,w,h);
  const original=ctx.getImageData(0,0,w,h);
  let transparent=0;
  for(let i=3;i<original.data.length;i+=4)if(original.data[i]<24)transparent++;
  const hasAlpha=transparent>w*h*.03;
  const {category,kind,mask}=await analyze(modelInput(photo,640,true),hasAlpha?null:modelInput(photo,320,false));
  let cut=hasAlpha;
  if(mask){
    const small=canvas(320,320), sc=small.getContext("2d"), ic=sc.createImageData(320,320);
    for(let i=0;i<mask.length;i++)ic.data[i*4+3]=mask[i];
    sc.putImageData(ic,0,0);
    ctx.globalCompositeOperation="destination-in";ctx.drawImage(small,0,0,w,h);ctx.globalCompositeOperation="source-over";
    cut=true;
  }
  let pixels=ctx.getImageData(0,0,w,h),box=bounds(pixels.data,w,h);
  if(!box||box[2]*box[3]<w*h*.025){ctx.putImageData(original,0,0);cut=false;}
  if(!cut){cut=trimBackdrop(original,w,h);ctx.putImageData(original,0,0);}
  pixels=ctx.getImageData(0,0,w,h);box=bounds(pixels.data,w,h);
  if(!box)throw Error("빈 이미지");
  const out=canvas(box[2],box[3]);out.getContext("2d").drawImage(photo,...box,0,0,out.width,out.height);
  // An empty column near the centre marks a photographed pair of shoes, socks or gloves.
  let split=0;
  for(let x=Math.floor(box[2]*.32);x<box[2]*.68;x++){
    let occupied=false;
    for(let y=box[1];y<box[1]+box[3];y++)if(pixels.data[(y*w+box[0]+x)*4+3]>80){occupied=true;break;}
    if(!occupied && (!split || Math.abs(x-box[2]/2)<Math.abs(split-box[2]/2)))split=x;
  }
  const blob=await new Promise((ok,fail)=>out.toBlob(b=>b?ok(b):fail(Error("이미지 저장 실패")),"image/png"));
  const item={id:crypto.randomUUID(),category:category||initialCategory,kind,png:await blob.arrayBuffer(),split,created:Date.now(),recognized:Boolean(category),cut};
  return {...item,name:describeGarment(out,item),nameVersion:1};
}
