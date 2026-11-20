// Measure the centre panel independently of either sleeve on a flat lay or a worn shirt.
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const mix=(a,b,t)=>a+(b-a)*t;
const median=values=>values.sort((a,b)=>a-b)[values.length>>1];
function trunk(rows,w,h){
  const left=[],right=[];
  for(let y=Math.floor(h*.46);y<h*.84;y+=3){
    const run=rows[y].find(([a,b])=>a<w*.5&&b>w*.5);
    if(run){left.push(run[0]);right.push(run[1]);}
  }
  if(!left.length)return [w*.22,w*.78];
  return [clamp(median(left),w*.04,w*.46),clamp(median(right),w*.54,w*.96)];
}
function fabricRuns(data,w,h){
  // A partially transparent edge pixel contains a mixture of cloth and its backdrop.
  // Keep a small interior margin for texture sampling while preserving the photo's cutout.
  const stride=w+2,dist=new Uint16Array(stride*(h+2));
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const i=(y+1)*stride+x+1;
    if(data[(y*w+x)*4+3]>222)dist[i]=1+Math.min(dist[i-1],dist[i-stride]);
  }
  const margin=clamp(Math.round(Math.min(w,h)*.016),2,7);
  const rows=Array.from({length:h},()=>[]),top=new Int16Array(w).fill(h),end=new Int16Array(w).fill(-1);
  for(let y=h-1;y>=0;y--){
    let right=-1;
    for(let x=w-1;x>=-1;x--){
      const i=(y+1)*stride+x+1;
      dist[i]=Math.min(dist[i],1+dist[i+1],1+dist[i+stride]);
      if(x>=0&&dist[i]>=margin){
        if(right<0)right=x;
        top[x]=y;if(end[x]<0)end[x]=y;
      }else if(right>=0){rows[y].unshift([x+1,right]);right=-1;}
    }
  }
  return {rows,top,end};
}
export function shirtGeometry(s){
  if(s.shirt!==undefined)return s.shirt;
  const {data,w,h}=s,inside=fabricRuns(data,w,h);
  const [left,right]=trunk(inside.rows,w,h);
  const center=(left+right)/2,valid=[];
  const body=inside.rows.map((row,y)=>{
    const span=row.find(([a,b])=>center>=a&&center<=b);
    if(!span)return null;
    valid.push(y);
    return [clamp(span[0],left-w*.04,center),clamp(span[1],center,right+w*.04),y];
  });
  if(valid.length<5){s.shirt=null;return null;}
  const first=valid[0],last=valid.at(-1);
  for(let y=first;y<=last;y++)if(!body[y])body[y]=body[y-1];
  const arms=[false,true].map(rightSide=>{
    const shoulder=Math.round(rightSide?right:left);
    const xs=[];
    for(let x=0;x<w;x++)if(inside.end[x]-inside.top[x]>1 && (rightSide?x>shoulder:x<shoulder))xs.push(x);
    if(!xs.length)return {shoulder,cuff:shoulder,reach:0};
    const cuff=xs[Math.floor((xs.length-1)*(rightSide?.95:.05))];
    const yCuff=(inside.top[cuff]+inside.end[cuff])/2;
    const rise=inside.top[shoulder];
    const reach=Math.hypot(cuff-shoulder,yCuff-rise)/Math.max(1,last-first);
    return {shoulder,cuff,reach};
  });
  s.shirt={...inside,body,first,last,arms,long:(arms[0].reach+arms[1].reach)/2>.56};
  return s.shirt;
}
function bodyPixel(s,g,u,v){
  const row=Math.round(mix(g.first,g.last,clamp(v)));
  const [a,b,sourceY]=g.body[row];
  return (sourceY*s.w+Math.round(mix(a,b,clamp(u))))*4;
}
function sleevePixel(s,g,side,t,u){
  const arm=g.arms[side],x=Math.round(mix(arm.shoulder,arm.cuff,clamp(t)));
  let start=g.top[x],end=g.end[x];
  if(end<start)return bodyPixel(s,g,side?.90:.10,t);
  const maxWidth=Math.max(s.h*.095,Math.abs(arm.shoulder-arm.cuff)*.48);
  end=Math.min(end,start+maxWidth);
  const y=Math.round(mix(start,end,side?u:1-u));
  const span=g.rows[y].find(([a,b])=>a<=x&&x<=b);
  return span?(y*s.w+x)*4:bodyPixel(s,g,side?.9:.1,t);
}
const targets=new WeakMap();
export function shirtTarget(plate,rows){
  if(targets.has(plate))return targets.get(plate);
  const w=plate.width,h=plate.height,[l,r]=trunk(rows,w,h);
  const cuffs=[0,0];let hem=0;
  rows.forEach((runs,y)=>{
    for(const [a,b] of runs){
      if(a<w*.5&&b>w*.5)hem=y;
      if(a<l-.025*w)cuffs[0]=y;
      if(b>r+.025*w)cuffs[1]=y;
    }
  });
  const target={l,r,hem,cuffs};targets.set(plate,target);return target;
}
export function sampleShirt(s,g,target,run,x,y,w,h,angled){
  const {l,r,hem,cuffs}=target;
  const progress=y/Math.max(1,hem),[a,b]=run;
  const center=(l+r)/2,side=Number(x>center),seam=side?r:l;
  const u=clamp((x-l)/(r-l));
  const torsoU=clamp(u-(angled?.13:.025)*Math.sin((angled?1:2)*Math.PI*u));
  // Start inside the front collar: the part above it in a flat lay is the inside back neck.
  const start=.10*(1-Math.abs(torsoU-.5)*1.6);
  const body=bodyPixel(s,g,torsoU,mix(start,1,clamp(progress)));
  const separate=(side?a>center:b<center) && b-a<w*.35 && y>h*.23;
  const distance=(x-seam)*(side?1:-1);
  const weight=separate?1:clamp(.5+distance/(w*.095));
  if(weight<=0)return [body,body,0];
  const width=Math.max(w*.09,side?w-1-r:l);
  const across=separate?(x-a)/Math.max(1,b-a):clamp(side?(x-r)/width:1-(l-x)/width);
  const t=clamp((y-h*.09)/Math.max(1,cuffs[side]-h*.09));
  return [body,sleevePixel(s,g,side,t,across),weight];
}
