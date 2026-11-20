import {maleFit} from "./pose.js";
// Coordinates below use the original 1024 x 1536 studio pose.
export const slots = Object.fromEntries([
  ["hat","모자",7],["top","상의",4],["bottom","하의",3],["outer","아우터",5],
  ["socks","양말",1],["shoes","신발",2],["gloves","장갑",3]
].map(([key,name,z])=>[key,{name,z}]));

const scale = .625;
const width = Math.round(1024*scale), height = Math.round(1536*scale);
const cap = (n,min,max)=>Math.max(min,Math.min(max,n));
const mix = (a,b,t)=>a+(b-a)*t;
const median = values=>values.sort((a,b)=>a-b)[Math.floor(values.length/2)];
function surface(w,h) {
  const c=document.createElement("canvas"); c.width=w;c.height=h;
  return c;
}
let light;
export async function loadStudio() {
  const image=new Image(); image.src=new URL("fabric-light.webp",import.meta.url);
  await image.decode();
  const ctx=surface(width,height).getContext("2d");
  ctx.drawImage(image,0,0,width,height);
  light=ctx.getImageData(0,0,width,height).data;
}
function garment(image) {
  const ratio=Math.min(1,700/Math.max(image.width,image.height));
  const w=Math.max(2,Math.round(image.width*ratio)),h=Math.max(2,Math.round(image.height*ratio));
  const ctx=surface(w,h).getContext("2d");
  ctx.drawImage(image,0,0,w,h);
  const data=ctx.getImageData(0,0,w,h).data;
  const rows=Array.from({length:h},()=>[]), top=new Int16Array(w).fill(h),end=new Int16Array(w).fill(-1);
  for(let y=0;y<h;y++){
    let start=-1;
    for(let x=0;x<=w;x++){
      const filled=x<w && data[4*(y*w+x)+3]>64;
      if(filled){if(start<0)start=x;top[x]=Math.min(top[x],y);end[x]=y;}
      else if(start>=0){if(x-start>=2)rows[y].push([start,x-1]);start=-1;}
    }
  }
  function runs(y){return rows[cap(Math.round(y),0,h-1)];}
  function body(y){
    const spans=runs(y);return spans.find(([a,b])=>a<w*.5&&b>w*.5) ||
      spans.reduce((best,r)=>r[1]-r[0]>best[1]-best[0]?r:best,[w*.49,w*.51]);
  }
  return {w,h,data,runs,body,top,end};
}
// Linearly interpolate photographed seams between measured shoulder, waist, hip and ankle landmarks.
function profile(points,y) {
  let i=1;while(i<points.length-1&&points[i][0]<y)i++;
  const a=points[i-1],b=points[i],t=cap((y-a[0])/(b[0]-a[0]),0,1);
  return a.slice(1).map((value,j)=>mix(value,b[j+1],t));
}
const torso=[[262,460,566],[283,406,621],[300,358,658],[365,377,642],[430,388,633],
 [480,398,625],[555,391,630],[606,376,638],[679,362,653],[719,355,661]];
const arm=[[295,353,362],[313,337,371],[365,325,382],[440,316,390],[515,308,393],
 [552,302,381],[595,299,373],[645,289,364],[686,282,350],[722,279,334],[766,278,323]];
const hips=[[592,386,634],[640,369,649],[705,355,662],[769,350,665],[811,353,665]];
const legs=[[798,351,508,512,665],[850,354,504,517,662],[1020,359,482,534,654],
 [1100,358,473,537,652],[1240,361,462,546,650],[1395,364,452,554,645],[1430,369,444,560,639]];

class Fitting {
  constructor(source){
    this.s=source;
    this.canvas=surface(width,height);
    this.ctx=this.canvas.getContext("2d");
    this.frame=this.ctx.createImageData(width,height);
    this.minX=width;this.maxX=0;this.minY=height;this.maxY=0;
  }
  // Project a horizontal section of cloth onto a curved body section, retaining the photo's cut edges.
  strip(row,left,right,sx1,sx2,sy,{fabric=true,alpha=1,curve=.09,arc=0,edge=1,mapY=null,bodyRange=null}={}){
    if(right<=left||row<0||row>=height)return;
    const s=this.s,dst=this.frame.data,src=s.data,begin=Math.max(0,Math.ceil(left*scale)),stop=Math.min(width,Math.ceil(right*scale));
    this.minX=Math.min(this.minX,begin);this.maxX=Math.max(this.maxX,stop);this.minY=Math.min(this.minY,row);this.maxY=Math.max(this.maxY,row+1);
    for(let x=begin;x<stop;x++){
      const u=cap(((x+.5)/scale-left)/(right-left),0,1),center=2*u-1;
      const warped=u-curve*Math.sin(2*Math.PI*u);
      let fx=cap(mix(sx1,sx2,warped),0,s.w-1);
      const sampleY=mapY?mapY((x+.5)/scale,fx):sy+arc*(1-center*center);
      if(sampleY<0)continue;
      const fy=cap(sampleY,0,s.h-1);
      if(bodyRange&&fy>s.h*.12){
        const [start,end]=bodyRange,span=s.body(fy);
        const lo=Math.max(start,span[0]+2),hi=Math.min(end,span[1]-2);
        if(lo<s.w*.5&&hi>s.w*.5&&hi-lo>s.w*.18)
          fx=mix(lo,hi,cap((fx-start)/(end-start),0,1));
      }
      const ix=Math.floor(fx),iy=Math.floor(fy),k=4*(iy*s.w+ix),n=k+(ix<s.w-1?4:0);
      const down=iy<s.h-1?4*s.w:0,tx=fx-ix,ty=fy-iy;
      const dest=4*(row*width+x);
      const opacity=mix(mix(src[k+3],src[n+3],tx),mix(src[k+down+3],src[n+down+3],tx),ty)*alpha*
        cap(Math.min((x+.5)-left*scale,right*scale-(x+.5))/edge,0,1);
      if(opacity<6)continue;
      const red=light[dest],blue=light[dest+2];
      const greyCloth=red<173 && Math.abs(red-blue)<23;
      const studioShade=fabric&&greyCloth?cap(.34+.66*(red*.3+light[dest+1]*.59+blue*.11)/113,.68,1.24):1;
      const shade=(.92+.11*Math.cos(center*Math.PI/2))*studioShade;
      const underneath=dst[dest+3]*(1-opacity/255);
      const composedAlpha=opacity+underneath;
      for(let ch=0;ch<3;ch++){
        const color=mix(mix(src[k+ch],src[n+ch],tx),mix(src[k+down+ch],src[n+down+ch],tx),ty)*shade;
        dst[dest+ch]=(color*opacity+dst[dest+ch]*underneath)/composedAlpha;
      }
      dst[dest+3]=composedAlpha;
    }
  }
  result(){
    this.ctx.putImageData(this.frame,0,0);
    const x=this.minX,y=this.minY,w=this.maxX-x,h=this.maxY-y;
    if(w<=0||h<=0)return null;
    const cropped=surface(w,h);cropped.getContext("2d").drawImage(this.canvas,x,y,w,h,0,0,w,h);
    cropped.style.cssText="position:absolute;left:"+100*x/width+"%;top:"+100*y/height+"%;width:"+100*w/width+"%;height:"+100*h/height+"%;";
    return cropped;
  }
}
// A flat-lay V-neck includes the inside back panel and label. Find the front seam
// across both halves of the collar so that the model's skin shows through it.
function neckline(s) {
  const {w,h,data}=s;
  function pixel(x,y){return 4*(Math.round(cap(y,0,.99)*h)*w+Math.round(cap(x,0,.99)*w));}
  function distance(a,b){return Math.max(Math.abs(data[a]-data[b]),Math.abs(data[a+1]-data[b+1]),Math.abs(data[a+2]-data[b+2]));}
  // A continuous field of the front fabric above the chest rules out a deep neckline.
  let solid=0;
  for(const y of [.105,.12,.135]){
    const anchor=pixel(.35,y);
    const distances=Array.from({length:17},(_,i)=>distance(anchor,pixel(.36+i*.0175,y)));
    if(distances.sort((a,b)=>a-b)[14]<13)solid++;
  }
  let best={depth:.082,radius:.185,power:2},score=10;
  if(solid>=2)return best;
  for(const radius of [.145,.16,.175,.19,.205,.22])for(let depth=.16;depth<.33;depth+=.012){
    const changes=[];
    for(const sign of [-1,1])for(let j=2;j<11;j++){
      const t=j/12;
      const x=.5+sign*radius*(1-t**1.45),y=.012+depth*t;
      changes.push(distance(pixel(x-sign*.013,y),pixel(x+sign*.013,y)));
    }
    changes.sort((a,b)=>a-b);
    const strength=changes[4]*.55+changes[9]*.45;
    if(strength>score){best={depth:depth+.012,radius,power:1};score=strength;}
  }
  return best;
}
function upper(fit,kind,isOuter,measuredNeck) {
  const s=fit.s,w=s.w,h=s.h;
  const neck=measuredNeck||neckline(s);
  const spans=[.53,.59,.65,.71,.77].map(t=>s.body(t*h));
  let left=median(spans.map(r=>r[0])),right=median(spans.map(r=>r[1]));
  const sideRoom=Math.max(left/w,1-right/w);
  const sleeveless=kind===5||sideRoom<.07;
  left=cap(left,w*.08,w*.36);right=cap(right,w*.64,w*.92);
  const midEnd=median(Array.from({length:25},(_,i)=>s.end[Math.round(w*(.32+.36*i/24))]));
  const bodyEnd=cap(midEnd/h,.70,1);
  const isDress=kind===10||kind===11;
  const hem=isDress?Math.min(1240,770+230*h/w):isOuter&&kind===9?945:710;
  const neckDepth=cap(26+(neck.depth-.08)*450,25,142);
  // Each sleeve follows its own shoulder-to-wrist axis. Cuff length comes from its outer silhouette.
  for(const side of [0,1]){
    if(sleeveless)break;
    const band=side===0?left:w-right;
    const ends=Array.from({length:17},(_,i)=>s.end[cap(Math.round(side===0?band*(.19+.58*i/16):w-1-band*(.19+.58*i/16)),0,w-1)]).filter(v=>v>0);
    const frac=cap((median(ends)||.25*h)/h,.16,1);
    const cuff=cap(322+485*frac,382,766);
    for(let row=Math.floor(295*scale);row<cuff*scale;row++){
      const y=row/scale,t=cap((y-295)/(cuff-295),0,1);
      let [a,b]=profile(arm,y);
      if(isOuter){a-=6;b+=4;}
      const srcY=mix(.055*h,frac*h-1,t);
      const bounds=s.runs(srcY),outer=side===0?bounds[0]:bounds.at(-1);
      if(!outer)continue;
      const sleeveWidth=Math.max(band,.15*w)*mix(.52,1,t);
      const sx1=side===0?outer[0]+1:Math.max(outer[0]+1,outer[1]-sleeveWidth);
      const sx2=side===0?Math.min(outer[1]-1,outer[0]+sleeveWidth):outer[1]-1;
      if(side===1)[a,b]=[1016-b,1016-a];
      const cuffLine=(x)=>cuff-7*Math.abs((x-a)/(b-a)-.35);
      fit.strip(row,a,b,sx1,sx2,srcY,{curve:.045,mapY:x=>y<cuffLine(x)?srcY:-1});
    }
  }
  for(let row=Math.floor(262*scale);row<(hem+9)*scale;row++){
    const y=row/scale,t=cap((y-262)/(hem-262),0,1),srcY=t*(h-1)*bodyEnd;
    let [a,b]=profile(torso,Math.min(y,719));
    if(isDress&&y>700){const flare=(y-700)*.19;a-=flare;b+=flare;}
    if(isOuter){a-=7;b+=7;}
    const fullLeft=Math.min(a,357),fullRight=Math.max(b,659);
    const align=cap((y-300)/94,0,1);
    const farLeft=mix(fullLeft,a,align),farRight=mix(fullRight,b,align);
    const sx1=mix(left,right,(a-farLeft)/(farRight-farLeft));
    const sx2=mix(left,right,(b-farLeft)/(farRight-farLeft));
    const neckWidth=cap(neck.radius*w/(right-left)*300,55,82);
    const mapY=(x,fx)=>{
      const dx=Math.abs(x-512),neckLine=dx<neckWidth?262+neckDepth*(1-(dx/neckWidth)**neck.power):262+.35*(dx-neckWidth);
      const hemLine=hem+9*cap(1-(dx/150)**2,0,1);
      if(measuredNeck){
        if(y>hemLine)return -1;
        const fraction=cap((y-262)/(hemLine-262),0,1);
        const ix=cap(Math.round(fx),0,w-1),u=Math.abs(fx/w-.5)/neck.radius;
        const sourceRow=mix(0,Math.min(s.end[ix]-1,(h-1)*bodyEnd),fraction);
        const opening=u<1?h*neck.depth*(neck.power===2?Math.sqrt(1-u*u):1-u):0;
        if(sourceRow<opening)return -1;
        return Math.max(sourceRow,s.top[ix]+1);
      }
      if(y<neckLine||y>hemLine)return -1;
      const v=cap((y-neckLine)/(hemLine-neckLine),0,1);
      const ix=cap(Math.round(fx),0,w-1);
      const u=Math.abs(fx/w-.5)/neck.radius;
      const facing=u<1?h*(.014+neck.depth*(1-u**neck.power)):0;
      const start=Math.max(s.top[ix]+1,facing);
      const end=Math.min(s.end[ix]-1,(h-1)*bodyEnd);
      return mix(start,end,v);
    };
    fit.strip(row,a,b,sx1,sx2,srcY,{curve:.035,mapY,bodyRange:[left,right]});
  }
}
function lower(fit,kind) {
  const s=fit.s,w=s.w,h=s.h;
  const skirt=kind===8,shorts=kind===7||(kind==null&&w/h>1.03);
  const hem=skirt?cap(619+h/w*440,840,1350):shorts?cap(657+h/w*345,875,1035):1428;
  let crotch=.36;
  if(!skirt)for(let p=.15;p<.8;p+=.01){
    const spans=s.runs(h*p).filter(([l,r])=>r-l>w*.12);
    if(spans.length>=2&&spans[0][1]<w*.6&&spans.at(-1)[0]>w*.38){crotch=p;break;}
  }
  for(let row=Math.floor(614*scale);row<hem*scale;row++){
    const y=row/scale;
    const sy=skirt?(y-614)/(hem-614)*(h-1):y<=805?mix(0,crotch*h,(y-614)/191):mix(crotch*h,h-1,(y-805)/(hem-805));
    const runs=s.runs(sy);
    if(!runs.length)continue;
    const left=runs[0][0],right=runs.at(-1)[1];
    if(y<805||skirt){
      let [a,b]=profile(hips,y);
      if(skirt&&y>780){a-=(y-780)*.20;b+=(y-780)*.20;}
      fit.strip(row,a,b,left,right,sy,{curve:.04,arc:-.006*h});continue;
    }
    const [a,b,c,d]=profile(legs,y);
    const mid=Math.round((left+right)/2), leftLeg=runs.find(([l,r])=>l<mid&&r-l>w*.10),rightLeg=runs.slice().reverse().find(([l,r])=>r>mid&&r-l>w*.10);
    const paper=x=>{const k=4*(cap(Math.round(sy),0,h-1)*w+x);return Math.min(s.data[k],s.data[k+1],s.data[k+2])>244;};
    let innerL=mid,innerR=mid;
    if(paper(mid)&&!paper(Math.round(left*.65+mid*.35))&&!paper(Math.round(right*.65+mid*.35))){
      while(innerL>mid-w*.2&&paper(innerL))innerL--;
      while(innerR<mid+w*.2&&paper(innerR))innerR++;
    }
    if(leftLeg)fit.strip(row,a,b,leftLeg[0]+1,Math.min(innerL-1,leftLeg[1]-1),sy,{curve:.055});
    if(rightLeg)fit.strip(row,c,d,Math.max(innerR+1,rightLeg[0]+1),rightLeg[1]-1,sy,{curve:.055});
  }
}
function accessory(fit,category,split) {
  const s=fit.s;
  const contours={
    hat:[[12,471,551],[31,439,584],[64,423,596],[111,422,603],[126,439,591]],
    gloves:[[744,282,325],[779,278,326],[810,274,326],[848,280,319],[892,290,306]],
    socks:[[1260,367,448],[1330,376,439],[1392,374,431],[1420,370,431],[1463,350,434],[1487,348,431],[1499,352,423]],
    shoes:[[1406,375,426],[1430,366,433],[1462,349,438],[1486,340,438],[1504,343,436],[1510,352,428]]
  };
  const outline=contours[category],first=outline[0][0],end=outline.at(-1)[0];
  for(const side of category==="hat"?[0]:[0,1]){
    const sx1=split&&side?split:0,sx2=split&&!side?split-1:s.w-1;
    for(let row=Math.floor(first*scale);row<end*scale;row++){
      const y=row/scale,t=(y-first)/(end-first),sy=cap(t,0,1)*(s.h-1);
      let [a,b]=profile(outline,y);
      if(side)[a,b]=[(category==="gloves"?1016:1000)-b,(category==="gloves"?1016:1000)-a];
      // Map the visible material at this height to the foot or hand once.
      // Keeping the full transparent bounding box here would narrow the ankle twice.
      let from=sx1,to=sx2;
      if(category==="socks"||category==="shoes"||category==="gloves"){
        const spans=s.runs(sy).filter(([l,r])=>r>=sx1&&l<=sx2);
        if(!spans.length)continue;
        const rowLeft=Math.max(sx1,spans[0][0]),rowRight=Math.min(sx2,spans.at(-1)[1]);
        const keep=category==="gloves"?.35:category==="shoes"?.28:.12;
        from=mix(rowLeft,sx1,keep);to=mix(rowRight,sx2,keep);
      }
      const mirrored=side&&!split;
      fit.strip(row,a,b,mirrored?to:from,mirrored?from:to,sy,{fabric:false,curve:.06,arc:.007*s.h});
    }
  }
}
export function fitGarment(image,item,model="female") {
  const fit=new Fitting(garment(image));
  if(item.category==="top"||item.category==="outer")upper(fit,item.kind,item.category==="outer",item.collar);
  else if(item.category==="bottom")lower(fit,item.kind);
  else accessory(fit,item.category,item.split?Math.round(item.split*fit.s.w/image.width):0);
  if(model==="male")return maleFit(fit.frame,{top:fit.minY,bottom:fit.maxY,left:fit.minX,right:fit.maxX},item.category,scale);
  return fit.result();
}
