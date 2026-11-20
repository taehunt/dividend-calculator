import {drawForm,slots} from "./form.js";
import {preparePhoto} from "./photo.js";

const $=id=>document.getElementById(id);
const records=new Map(), images=new Map();
let category="top", db, wearing={}, busy=false;
const selectionKey="codirum:selected:v1";
const say=message=>{$("status").textContent=message;};
drawForm($("form"));

function write(record,erase=false){
  return new Promise((resolve,reject)=>{
    const tx=db.transaction("clothes","readwrite");
    const store=tx.objectStore("clothes");
    if(erase)store.delete(record.id);else store.put(record);
    tx.oncomplete=resolve;tx.onerror=tx.onabort=()=>reject(tx.error);
  });
}
async function cacheImage(record) {
  const url=URL.createObjectURL(new Blob([record.png],{type:"image/png"})),image=new Image();image.src=url;
  try{await image.decode();}catch(error){URL.revokeObjectURL(url);throw error;}
  const urls=[url];
  if(record.split>0&&record.split<image.width){
    for(const [left,width] of [[0,record.split],[record.split,image.width-record.split]]){
      const c=document.createElement("canvas");c.width=width;c.height=image.height;
      c.getContext("2d").drawImage(image,left,0,width,image.height,0,0,width,image.height);
      urls.push(c.toDataURL("image/png"));
    }
  }
  images.set(record.id,{urls,image});
}
function remember(){try{localStorage.setItem(selectionKey,JSON.stringify(wearing));}catch{}}
function renderLook(){
  const layers=$("layers");layers.replaceChildren();const names=[];
  for(const [key,slot] of Object.entries(slots)){
    const item=records.get(wearing[key]),entry=images.get(wearing[key]);
    if(!entry||item?.category!==key)continue;
    names.push(item.name);
    slot.boxes.forEach(([x,y,w,h],i)=>{
      const img=new Image();img.className="piece";img.alt=slot.name+" "+item.name;
      img.src=slot.boxes.length===2&&entry.urls.length===3?entry.urls[i+1]:entry.urls[0];
      Object.assign(img.style,{left:x/4+"%",top:y/7.6+"%",width:w/4+"%",height:h/7.6+"%",zIndex:slot.z,
        objectPosition:key==="bottom"||key==="top"||key==="outer"?"center top":"center",
        transform:i===1&&entry.urls.length===1?"scaleX(-1)":""});
      layers.append(img);
    });
  }
  $("count").textContent="착용 "+names.length+"개";$("look").textContent=names.length?names.join(" / "):"선택한 옷이 여기에 표시돼요.";
}
function choose(id){if(id)wearing[category]=id;else delete wearing[category];remember();renderLook();updateChecks();}
function updateChecks(){
  for(const btn of $("items").children)btn.setAttribute("aria-pressed",String((wearing[category]||"")===btn.dataset.id));
  $("tools").hidden=!records.has(wearing[category]);$("move").value=category;
}
function tile(item){
  const b=document.createElement("button");b.type="button";b.className="tile";b.dataset.id=item?.id||"";
  const icon=item?new Image():document.createElement("span");
  if(item){icon.src=images.get(item.id).urls[0];icon.alt="";}else{icon.className="skip";icon.textContent="∅";icon.setAttribute("aria-hidden","true");}
  const name=document.createElement("span");name.className="name";name.textContent=item?.name||"없음";b.append(icon,name);
  b.onclick=()=>choose(item?.id);return b;
}
function renderCategory(){
  for(const b of $("tabs").children)b.setAttribute("aria-pressed",String(b.dataset.key===category));
  $("categoryName").textContent=slots[category].name;
  const items=[...records.values()].filter(r=>r.category===category&&images.has(r.id)).sort((a,b)=>b.created-a.created);
  $("total").textContent=items.length+"벌";$("items").replaceChildren(tile(null),...items.map(tile));$("empty").hidden=!!items.length;
  updateChecks();
}
for(const [key,slot] of Object.entries(slots)){
  const b=document.createElement("button");b.type="button";b.dataset.key=key;b.textContent=slot.name;
  b.onclick=()=>{category=key;renderCategory();};$("tabs").append(b);$("move").add(new Option(slot.name,key));
}
$("files").disabled=true;
$("files").onchange=async e=>{
  if(busy)return;
  const files=[...e.target.files],initialCategory=category;e.target.value="";if(!files.length)return;
  busy=true;e.target.disabled=true;let last=null,added=0,failed=0,uncertain=0,backgrounds=0;
  for(const [i,file] of files.entries()){
    say("옷을 정리하는 중 ("+(i+1)+"/"+files.length+"). 첫 등록에는 모델을 내려받아 시간이 걸릴 수 있어요.");
    try {
      const item=await preparePhoto(file,initialCategory);
      await write(item);await cacheImage(item);records.set(item.id,item);
      last=item;added++;if(!item.recognized)uncertain++;if(!item.cut)backgrounds++;
    }catch{failed++;}
  }
  if(last){category=last.category;wearing[category]=last.id;remember();}
  renderCategory();renderLook();busy=false;e.target.disabled=false;
  const notes=[added+"벌 저장"];
  if(uncertain)notes.push(uncertain+"벌은 선택한 항목에 저장했어요. 분류를 수정할 수 있어요.");
  if(backgrounds)notes.push(backgrounds+"벌은 원본 배경을 유지했어요.");
  if(failed)notes.push(failed+"벌 저장 실패. JPG, PNG, WebP 사진과 기기 저장 공간을 확인해 주세요.");
  say(notes.join(" / "));
};
$("move").onchange=async e=>{
  const item=records.get(wearing[category]),target=e.target.value;if(!item||!slots[target]||target===category)return;
  const updated={...item,category:target};
  try{await write(updated);records.set(item.id,updated);delete wearing[item.category];wearing[target]=item.id;category=target;remember();renderCategory();renderLook();say(slots[target].name+" 항목으로 이동했어요.");}
  catch{say("분류 저장에 실패했어요.");renderCategory();}
};
$("remove").onclick=async ()=>{
  const item=records.get(wearing[category]);if(!item||!confirm(item.name+" 사진을 옷장에서 삭제할까요?"))return;
  try{await write(item,true);URL.revokeObjectURL(images.get(item.id).urls[0]);records.delete(item.id);images.delete(item.id);delete wearing[item.category];remember();renderCategory();renderLook();say("옷을 삭제했어요.");}
  catch{say("삭제에 실패했어요.");}
};
async function init(){
  renderCategory();
  try{
    db=await new Promise((ok,fail)=>{const req=indexedDB.open("codirum-wardrobe",1);req.onupgradeneeded=()=>req.result.createObjectStore("clothes",{keyPath:"id"});req.onsuccess=()=>ok(req.result);req.onerror=()=>fail(req.error);});
    const all=await new Promise((ok,fail)=>{const r=db.transaction("clothes").objectStore("clothes").getAll();r.onsuccess=()=>ok(r.result);r.onerror=()=>fail(r.error);});
    await Promise.all(all.map(async item=>{await cacheImage(item);records.set(item.id,item);}));
    try{wearing=JSON.parse(localStorage.getItem(selectionKey)||"{}")||{};}catch{}
    renderLook();renderCategory();$("files").disabled=false;
  }catch{say("이 브라우저에서 저장 공간을 열지 못했어요. 사이트 저장 권한을 확인해 주세요.");}
}
init();
