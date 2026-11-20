import {shirtGeometry,shirtTarget,sampleShirt} from "./shirt.js";
// Each studio plate records the actual silhouette and lighting for this pose.
const clamp=(v,lo=0,hi=1)=>Math.max(lo,Math.min(hi,v));
export function surface(w,h) {
  const c=document.createElement("canvas");c.width=w;c.height=h;return c;
}
function pixels(c){return c.getContext("2d",{willReadFrequently:true}).getImageData(0,0,c.width,c.height);}
function spans(data,w,y) {
  const runs=[];let start=-1;
  for(let x=0;x<=w;x++){
    if(x<w&&data[(y*w+x)*4+3]>85){if(start<0)start=x;}
    else if(start>=0){runs.push([start,x-1]);start=-1;}
  }
  return runs;
}
const sources=new WeakMap();
// Turn enclosed white studio paper between the two legs back into an opening.
function legRows(s){
  if(s.legs)return s.legs;
  const {w,h,data}=s,legs=s.rows.slice();
  for(let y=Math.floor(h*.24);y<h;y++){
    const row=s.rows[y];
    if(row.length!==1)continue;
    const [a,b]=row[0],sample=(u,k)=>data[4*(y*w+Math.round(a+(b-a)*u))+k];
    let bright=0;
    for(const u of [.20,.8])if(Math.min(sample(u,0),sample(u,1),sample(u,2))>234)bright++;
    if(bright===2)continue;
    let hole=null;
    for(let x=Math.floor(a+.29*(b-a));x<b-.29*(b-a);x++){
      const j=4*(y*w+x);
      if(Math.min(data[j],data[j+1],data[j+2])>243 && Math.max(data[j],data[j+1],data[j+2])-Math.min(data[j],data[j+1],data[j+2])<8){
        if(!hole)hole=[x,x];else if(x===hole[1]+1)hole[1]=x;
      }
    }
    if(hole&&hole[1]-hole[0]>w*.014)legs[y]=[[a,hole[0]-1],[hole[1]+1,b]];
  }
  s.legs=legs;return legs;
}
function source(image){
  if(sources.has(image))return sources.get(image);
  const ratio=Math.min(1,540/Math.max(image.width,image.height));
  const w=Math.max(1,Math.round(image.width*ratio)),h=Math.max(1,Math.round(image.height*ratio));
  const canvas=surface(w,h);canvas.getContext("2d").drawImage(image,0,0,w,h);
  const {data}=pixels(canvas),rows=[],valid=[],ends=new Int16Array(w);
  for(let y=0;y<h;y++){
    const row=spans(data,w,y);rows.push(row);
    if(row.length){valid.push(y);for(const [l,r] of row)ends.fill(y,l,r+1);}
  }
  if(!valid.length)return null;
  for(let y=0;y<h;y++)if(!rows[y].length)rows[y]=rows[valid.reduce((a,b)=>Math.abs(a-y)<Math.abs(b-y)?a:b)];
  const sleeveDepth=[.04,.08,.12,.88,.92,.96].map(x=>ends[Math.floor(x*w)]/h).sort((a,b)=>a-b)[3];
  const result={data,w,h,rows,sleeveDepth};sources.set(image,result);return result;
}
export function patternFor(image,item){
  const s=source(image);if(!s)return null;
  switch(item.category){
    case "outer":return item.kind===9?"coat":"chore-jacket";
    case "top":
      if(item.kind===10||item.kind===11)return item.kind===10?"dress":"jumpsuit";
      if(item.kind===5)return "tank";
      return shirtGeometry(s)?.long || s.sleeveDepth>.63?"fit-long":"fit-short";
    case "bottom":return item.kind===8?"skirt":item.kind===7||(item.kind==null&&s.w/s.h>1.03)?"sand-shorts":"jeans";
    default:return {hat:"blue-cap",socks:"charcoal-sock",shoes:"sneaker",gloves:"leather-glove"}[item.category];
  }
}
function sourceSpan(row,u,side,pair) {
  let left=row[0][0],right=row.at(-1)[1];
  if(pair&&row.length>=2){
    const half=(left+right)/2;
    const group=row.filter(([l,r])=>side?(l+r)*.5>half:(l+r)*.5<half);
    if(group.length){left=group[0][0];right=group.at(-1)[1];}
  }
  const x=left+clamp(u)*(right-left);
  for(const [a,b] of row)if(x>=a&&x<=b)return Math.round(x);
  let closest=left;
  for(const run of row)for(const edge of run)if(Math.abs(edge-x)<Math.abs(closest-x))closest=edge;
  return closest;
}
function frontNeck(s){
  if(s.neck!==undefined)return s.neck;
  function contrast(x,y){
    const a=4*(Math.round(y*s.h)*s.w+Math.round((x-.018)*s.w));
    const b=4*(Math.round(y*s.h)*s.w+Math.round((x+.018)*s.w));
    return Math.max(...[0,1,2].map(k=>Math.abs(s.data[a+k]-s.data[b+k])));
  }
  let best=17,result=null;
  for(const radius of [.13,.16,.19,.22])for(const depth of [.19,.23,.27,.31]){
    const hits=[];
    for(const sign of [-1,1])for(let i=2;i<=9;i++){
      const t=i/10;hits.push(contrast(.5+sign*radius*(1-t),.014+t*depth));
    }
    hits.sort((a,b)=>a-b);const score=hits[4]*.6+hits[8]*.4;
    if(score>best){best=score;result={depth:depth*.9,radius:radius*.9};}
  }
  s.neck=result;return result;
}
export function hasFrontV(image){const fabric=source(image);return Boolean(fabric && frontNeck(fabric));}
// Match the flat photograph to the neckline, sleeve, placket and individual leg panels.
export function dressPhoto(image,item,plate,angled,shirt=false) {
  const s=source(image),w=plate.width,h=plate.height;
  if(!s)return null;
  const c=surface(w,h),ctx=c.getContext("2d"),dst=ctx.createImageData(w,h);
  const tpl=pixels(plate).data,light=[];
  for(let i=0;i<tpl.length;i+=28)if(tpl[i+3]>225)light.push(.3*tpl[i]+.59*tpl[i+1]+.11*tpl[i+2]);
  light.sort((a,b)=>a-b);
  const median=light[Math.floor(light.length*.50)]||110;
  const upper=item.category==="top"||item.category==="outer";
  const outer=item.category==="outer";
  const paired=["shoes","socks","gloves"].includes(item.category);
  const sourceRows=item.category==="bottom" && item.kind!==8?legRows(s):s.rows;
  const regionCenter=angled?.63:.5;
  // A front V can include the back-facing lining in a flat-lay photograph.
  const neck=upper&&!outer?frontNeck(s):null;
  const fabric=shirt?shirtGeometry(s):null;
  const rows=fabric?Array.from({length:h},(_,y)=>spans(tpl,w,y)):null;
  const target=rows?shirtTarget(plate,rows):null;
  for(let y=0;y<h;y++){
    const runs=rows?rows[y]:spans(tpl,w,y);if(!runs.length)continue;
    const left=runs[0][0],right=runs.at(-1)[1],v=y/Math.max(1,h-1);
    for(const run of runs){
      const [a,b]=run;
      const side=(a+b)*.5>w*.5;
      const leg=item.category==="bottom" && item.kind!==8 && runs.length>=2 && v>.22 && b-a>w*.12;
      const limb=paired||leg, sleeve=upper&&runs.length>1&&(b-a)<w*.24 && v>.21 && (b<w*.33 || a>w*.67);
      for(let x=a;x<=b;x++){
        const i=(y*w+x)*4,alpha=tpl[i+3];if(alpha<16)continue;
        if(neck){
          const depth=neck.depth*(1-Math.abs(x/w-regionCenter)/neck.radius);
          if(v<depth)continue;
        }
        if(item.category==="outer" && item.kind===5 && (x<w*.19||x>w*.81) && v>.16)continue;
        let first,second,blend=0;
        if(target){
          [first,second,blend]=sampleShirt(s,fabric,target,run,x,y,w,h,angled);
        }else{
          let u=limb?(x-a)/Math.max(1,b-a):(x-left)/Math.max(1,right-left);
          if(angled&&!paired)u=clamp(u-.15*Math.sin(Math.PI*u));
          u=clamp(u-.035*Math.sin(2*Math.PI*u));
          let sy=v;
          if(upper){
            sy=clamp(v+.024*Math.sin(Math.PI*u)*Math.sin(Math.PI*v));
            if(sleeve){u=side?.83+.16*(x-a)/Math.max(1,b-a):.01+.16*(x-a)/Math.max(1,b-a);sy=clamp(v*s.sleeveDepth);}
            else if(outer){
              // Both photographed front edges sample the closure of the uploaded jacket.
              const center=angled?.63:.5;
              if(u<center)u=clamp(u*.5/Math.max(.2,center-.035),0,.498);
              else u=clamp(.502+(u-center-.035)*.5/(1-center-.035),.502,1);
            }
          }
          const row=Math.round(clamp(sy)*(s.h-1));
          const bilateral=paired?Boolean(item.split):leg;
          if(leg && sourceRows[row].length===1)u=.5*(u+Number(side));
          if(paired&&!bilateral&&side)u=1-u;
          const sx=sourceSpan(sourceRows[row],u,side,bilateral);
          first=second=(row*s.w+sx)*4;
        }
        const luminance=.3*tpl[i]+.59*tpl[i+1]+.11*tpl[i+2];
        const shade=clamp(Math.pow(Math.max(5,luminance)/median,.59),.55,1.32);
        const high=Math.max(s.data[first],s.data[first+1],s.data[first+2]);
        const weight=item.category==="bottom"?.62:.8;
        for(let k=0;k<3;k++){
          const base=s.data[first+k]*(1-blend)+s.data[second+k]*blend;
          const room=shade>1?Math.min(base,(255-high)*.7):base;
          dst.data[i+k]=base+room*(shade-1)*weight;
        }
        dst.data[i+3]=alpha;
      }
    }
  }
  ctx.putImageData(dst,0,0);return c;
}
