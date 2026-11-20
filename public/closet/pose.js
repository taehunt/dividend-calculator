// Corresponding landmarks in the two front-facing studio photographs.
// Each row records the source and destination height, followed by matching X coordinates.
const upper = [
  [250,235,[350,449,512,570,672],[327,434,506,578,689]],
  [285,273,[338,399,512,622,677],[314,386,506,629,699]],
  [310,301,[335,367,512,652,681],[309,348,506,668,701]],
  [370,359,[323,379,512,641,691],[298,368,506,643,711]],
  [440,433,[315,389,512,632,701],[288,370,506,641,722]],
  [555,544,[301,392,512,630,715],[280,389,506,629,730]],
  [640,639,[289,371,512,642,727],[274,374,506,643,733]],
  [717,728,[279,354,512,662,737],[272,349,506,661,736]],
  [767,778,[277,351,512,664,739],[272,346,506,666,736]],
  [950,955,[272,352,512,664,740],[270,345,506,665,738]],
  [1400,1400,[269,354,512,660,743],[267,344,506,666,741]]
];
const lower=[
  [590,601,[385,505,517,635],[379,500,513,633]],
  [690,703,[355,505,517,663],[350,500,513,663]],
  [805,830,[351,505,517,665],[344,501,515,669]],
  [885,923,[355,500,522,664],[345,491,524,670]],
  [1030,1044,[359,481,534,654],[349,465,537,661]],
  [1250,1251,[361,461,547,650],[344,445,551,658]],
  [1430,1431,[368,445,560,639],[358,443,562,645]]
];
const head=[
  [0,0,[422,512,603],[420,506,596]],
  [55,47,[422,512,603],[425,506,591]],
  [135,119,[422,512,603],[426,506,590]]
];
const hands=[
  [735,734,[280,324,695,734],[272,317,688,731]],
  [800,807,[272,327,695,742],[272,329,685,737]],
  [899,903,[284,316,701,729],[281,321,689,721]]
];
const feet=[
  [1255,1250,[367,446,554,633],[353,443,553,650]],
  [1390,1393,[372,438,562,630],[366,433,565,637]],
  [1460,1460,[350,435,562,647],[341,432,564,656]],
  [1510,1513,[343,435,565,657],[337,432,565,664]]
];
const maps={hat:head,top:upper,outer:upper,bottom:lower,gloves:hands,socks:feet,shoes:feet};
function at(rows,col,value){
  let i=1;while(i<rows.length-1&&rows[i][col]<value)i++;
  const a=rows[i-1],b=rows[i],t=Math.min(1,Math.max(0,(value-a[col])/(b[col]-a[col])));
  return [a,b,t];
}
const mix=(a,b,t)=>a+(b-a)*t;
export function maleFit(frame,bounds,category,scale){
  const rows=maps[category],{width,height,data}=frame;
  function destY(y){const [a,b,t]=at(rows,0,y);return mix(a[1],b[1],t);}
  const top=Math.max(0,Math.floor(destY(bounds.top/scale)*scale));
  const bottom=Math.min(height,Math.ceil(destY(bounds.bottom/scale)*scale));
  const left=Math.max(0,bounds.left-36),right=Math.min(width,bounds.right+36);
  if(bottom<=top||right<=left)return null;
  const canvas=document.createElement("canvas");canvas.width=right-left;canvas.height=bottom-top;
  const ctx=canvas.getContext("2d"),out=ctx.createImageData(canvas.width,canvas.height);
  for(let y=top;y<bottom;y++){
    const [a,b,t]=at(rows,1,(y+.5)/scale);
    const fy=Math.min(height-1,Math.max(0,mix(a[0],b[0],t)*scale-.5));
    const sy=Math.floor(fy),ty=fy-sy;
    const xs=[0,...a[2].map((v,j)=>mix(v,b[2][j],t)),1024];
    const xd=[0,...a[3].map((v,j)=>mix(v,b[3][j],t)),1024];
    let seg=0;
    for(let x=left;x<right;x++){
      const px=(x+.5)/scale;
      while(seg<xd.length-2&&px>xd[seg+1])seg++;
      const fx=Math.max(0,Math.min(width-1,mix(xs[seg],xs[seg+1],(px-xd[seg])/(xd[seg+1]-xd[seg]))*scale-.5));
      const sx=Math.floor(fx),tx=fx-sx,i=4*(sy*width+sx),o=4*((y-top)*canvas.width+x-left);
      const j=sx+1<width?i+4:i,k=sy+1<height?i+4*width:i,l=k+(j-i);
      const wa=data[i+3]*(1-tx)*(1-ty),wb=data[j+3]*tx*(1-ty),wc=data[k+3]*(1-tx)*ty,wd=data[l+3]*tx*ty;
      const alpha=wa+wb+wc+wd;if(alpha<1)continue;
      for(let ch=0;ch<3;ch++)out.data[o+ch]=(wa*data[i+ch]+wb*data[j+ch]+wc*data[k+ch]+wd*data[l+ch])/alpha;
      out.data[o+3]=alpha;
    }
  }
  ctx.putImageData(out,0,0);
  canvas.style.cssText="position:absolute;left:"+left/width*100+"%;top:"+top/height*100+"%;width:"+canvas.width/width*100+"%;height:"+canvas.height/height*100+"%;";
  return canvas;
}
