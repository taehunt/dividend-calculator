import {dressPhoto,patternFor,surface} from "./drape.js";

export const slots=Object.fromEntries([
  ["hat","모자",7],["top","상의",4],["bottom","하의",3],["outer","아우터",5],
  ["socks","양말",1],["shoes","신발",2],["gloves","장갑",4]
].map(([key,name,z])=>[key,{name,z}]));

const root=new URL("fitting/",import.meta.url),studios=new Map();
async function loadImage(url){
  const img=new Image();img.src=url;await img.decode();return img;
}
export async function loadStudio(){
  const response=await fetch(new URL("atlas.json",root));
  if(!response.ok)throw Error("피팅 자료");
  const catalog=await response.json();
  await Promise.all(Object.entries(catalog).map(async ([key,parts])=>{
    const [model,atlas]=await Promise.all(["model","atlas"].map(name=>loadImage(new URL(key+"/"+name+".webp",root))));
    model.draggable=false;model.id="form";model.alt=(key.startsWith("female")?"여성":"남성")+" 모델 "+(key.endsWith("angle")?"사선":"정면");
    studios.set(key,{model,parts,atlas,templates:new Map()});
  }));
}
export function studioPhoto(key){return studios.get(key)?.model;}
function part(studio,name){
  if(studio.templates.has(name))return studio.templates.get(name);
  const [,,w,h,sx,sy]=studio.parts[name],c=surface(w,h);
  c.getContext("2d").drawImage(studio.atlas,sx,sy,w,h,0,0,w,h);
  studio.templates.set(name,c);return c;
}
function placed(components){
  const x=Math.min(...components.map(p=>p.x)),y=Math.min(...components.map(p=>p.y));
  const w=Math.max(...components.map(p=>p.x+p.img.width))-x;
  const h=Math.max(...components.map(p=>p.y+p.img.height))-y;
  const c=surface(w,h),ctx=c.getContext("2d");
  for(const p of components)ctx.drawImage(p.img,p.x-x,p.y-y);
  Object.assign(c.style,{position:"absolute",left:100*x/512+"%",top:100*y/1024+"%",width:100*w/512+"%",height:100*h/1024+"%"});
  return c;
}
export function fitGarment(image,item,view){
  const studio=studios.get(view);
  const name=item.sample?item.id.slice(7):patternFor(image,item);
  if(!name)return null;
  const components=[];
  function add(key,photo,record){
    const [x,y]=studio.parts[key],template=part(studio,key);
    const img=photo?dressPhoto(photo,record,template,view.endsWith("angle")):template;
    if(img)components.push({img,x,y});
  }
  if(name==="jumpsuit"){
    const waist=Math.max(1,Math.min(image.height-1,Math.round(image.height*.40)));
    for(const [key,start,h,category] of [["jeans",waist,image.height-waist,"bottom"],["brick-tee",0,waist,"top"]]){
      const panel=surface(image.width,Math.max(1,h));
      panel.getContext("2d").drawImage(image,0,start,image.width,panel.height,0,0,image.width,panel.height);
      add(key,panel,{...item,category});
    }
  }else{
    if(studio.parts[name+"-edge"])add(name+"-edge");
    add(name,item.sample?null:image,item);
  }
  return components.length?placed(components):null;
}
