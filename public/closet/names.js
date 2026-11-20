import {hasFrontV} from "./drape.js";

const categoryNames = { hat:"모자", top:"상의", bottom:"바지", outer:"아우터", socks:"양말", shoes:"신발", gloves:"장갑" };
const details = {
  0:["top","상의"], 1:["top","티셔츠"], 2:["top","스웨터"], 3:["outer","카디건"],
  4:["outer","재킷"], 5:["outer","조끼"], 6:["bottom","바지"], 7:["bottom","반바지"],
  8:["bottom","치마"], 9:["outer","코트"], 10:["top","원피스"], 11:["top","점프수트"]
};

function colorFamily(r,g,b) {
  const high=Math.max(r,g,b),low=Math.min(r,g,b),delta=high-low;
  if(high<49)return "검정";
  if(b>r+7 && b>=g && b-r>high*.12 && g>=r-5)
    return high<91?"네이비":high>150?"하늘색":"파란색";
  if(delta<18 || delta/high<.095)return low>221?"흰색":low>177?"연회색":"회색";
  if(r>=g && g>=b && r-b<78 && g-b>6 && r>158)return high>219?"크림색":"베이지";
  const h=(high===r?(g-b)/delta:high===g?2+(b-r)/delta:4+(r-g)/delta)*60;
  const hue=(h+360)%360;
  if((hue<15||hue>=345)&&r>170&&g>85)return "분홍색";
  if(hue<15||hue>=345)return r<140?"버건디":"빨간색";
  if(hue<44)return r<171?"갈색":"주황색";
  if(hue<65)return high<150?"카키색":"노란색";
  if(hue<162)return "초록색";
  if(hue<191)return "청록색";
  if(hue<255)return high<91?"네이비":high>150?"하늘색":"파란색";
  return "보라색";
}

export function describeGarment(image,item) {
  const canvas=document.createElement("canvas");
  canvas.width=72;canvas.height=72;
  const ctx=canvas.getContext("2d",{willReadFrequently:true});
  ctx.drawImage(image,0,0,72,72);
  const data=ctx.getImageData(0,0,72,72).data;
  const colors=new Map(), blues=[];
  let opaque=0;
  for(let y=0;y<72;y++)for(let x=0;x<72;x++){
    const k=4*(y*72+x);
    if(data[k+3]<190)continue;
    // A failed cutout can still be named by type without counting a backdrop as fabric.
    if(item.cut===false && (x<21||x>50||y<18||y>54))continue;
    const [r,g,b]=[data[k],data[k+1],data[k+2]],color=colorFamily(r,g,b);
    colors.set(color,(colors.get(color)||0)+1);
    if(b>=g+2 && g>r && b-r>11)blues.push([r,g,b]);
    opaque++;
  }
  const type=details[item.kind];
  const noun=type?.[0]===item.category?type[1]:categoryNames[item.category]||"옷";
  const primary=[...colors].sort((a,b)=>b[1]-a[1])[0];
  if(!primary || primary[1]/opaque<.2)return noun;
  if(noun==="바지" && blues.length>opaque*.54){
    const tones=blues.map(([r,g,b])=>(r+g*2+b)/4).sort((a,b)=>a-b);
    const brightness=tones[Math.floor(tones.length*.5)];
    const spread=tones[Math.floor(tones.length*.9)]-tones[Math.floor(tones.length*.1)];
    const muted=blues.filter(([r,g,b])=>b-r<112 && b-g<66).length/blues.length;
    if(muted>.70 && spread>12)return brightness>145?"연청바지":brightness<76?"진청바지":"중청바지";
  }
  const neckline=item.cut && item.category==="top" && (item.kind==null||item.kind<=1) && hasFrontV(image);
  return primary[0]+" "+(neckline?"브이넥 상의":noun);
}
