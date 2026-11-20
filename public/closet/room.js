import {fitGarment,loadStudio,slots} from "./form.js";
import {preparePhoto} from "./photo.js";
import {samples} from "./samples.js";

const $=id=>document.getElementById(id);
const records=new Map(), images=new Map();
const fittedCache=new Map();
const modelPhotos=new Map();
let model="female";
const modelKey="codirum:model:v1";
let category="top", db, wearing={}, busy=false;
const selectionKey="codirum:selected:v1";
const say=message=>{$("status").textContent=message;};


function write(record,erase=false){
  return new Promise((resolve,reject)=>{
    const tx=db.transaction("clothes","readwrite");
    const store=tx.objectStore("clothes");
    if(erase)store.delete(record.id);else store.put(record);
    tx.oncomplete=resolve;tx.onerror=tx.onabort=()=>reject(tx.error);
  });
}
async function cacheImage(record) {
  const url=record.sample?record.url:URL.createObjectURL(new Blob([record.png],{type:"image/png"}));
  const image=new Image();image.src=url;
  try{await image.decode();}catch(error){if(!record.sample)URL.revokeObjectURL(url);throw error;}
  images.set(record.id,{url,image});
}
function remember(){try{localStorage.setItem(selectionKey,JSON.stringify(wearing));}catch{}}
function fittedFor(item){
  if(item.cut===false)return null;
  const key=model+":"+item.id;
  const old=fittedCache.get(key);
  fittedCache.delete(key);
  const entry=old?.category===item.category?old:{
    category:item.category,canvas:fitGarment(images.get(item.id).image,item,model)
  };
  fittedCache.set(key,entry);
  if(fittedCache.size>32)fittedCache.delete(fittedCache.keys().next().value);
  return entry.canvas;
}
function selectModel(key){
  const img=modelPhotos.get(key);if(!img)return;
  model=key;
  if($("form")!==img)$("form").replaceWith(img);
  document.querySelector(".figure").dataset.model=key;
  for(const b of $("models").children)b.setAttribute("aria-pressed",String(b.dataset.model===key));
  try{localStorage.setItem(modelKey,key);}catch{}
  renderLook();
}
for(const button of $("models").children){
  button.disabled=true;
  button.onclick=()=>selectModel(button.dataset.model);
}
function renderLook(){
  const layers=$("layers");layers.replaceChildren();const names=[],missing=[];
  for(const [key,slot] of Object.entries(slots)){
    const item=records.get(wearing[key]),entry=images.get(wearing[key]);
    if(!entry||item?.category!==key)continue;
    const canvas=fittedFor(item);
    if(canvas){
      names.push(item.name);
      canvas.style.zIndex=slot.z;
      canvas.setAttribute("role","img");
      canvas.setAttribute("aria-label",slot.name+" "+item.name);
      layers.append(canvas);
    }else missing.push(item.name);
  }
  $("count").textContent="착용 "+names.length+"개";
  $("look").textContent=missing.length?missing.join(", ")+" 사진에서 옷을 구분하지 못했어요. 한 벌씩 펼쳐 다시 찍어 주세요.":names.join(" / ")||"선택한 옷이 여기에 표시돼요.";
}
function choose(id){if(id)wearing[category]=id;else delete wearing[category];remember();renderLook();updateChecks();}
function updateChecks(){
  for(const btn of $("items").children)btn.setAttribute("aria-pressed",String((wearing[category]||"")===btn.dataset.id));
  const selected=records.get(wearing[category]);$("tools").hidden=!selected||selected.sample;$("move").value=category;
}
function tile(item){
  const b=document.createElement("button");b.type="button";b.className="tile";b.dataset.id=item?.id||"";
  const icon=item?new Image():document.createElement("span");
  if(item){icon.src=images.get(item.id).url;icon.alt="";}else{icon.className="skip";icon.textContent="∅";icon.setAttribute("aria-hidden","true");}
  const name=document.createElement("span");name.className="name";name.textContent=item?.name||"없음";b.append(icon,name);
  if(item?.sample){b.dataset.sample="true";b.title="샘플 / "+item.name;}
  b.onclick=()=>choose(item?.id);return b;
}
function renderCategory(){
  for(const b of $("tabs").children)b.setAttribute("aria-pressed",String(b.dataset.key===category));
  $("categoryName").textContent=slots[category].name;
  const all=[...records.values()].filter(r=>r.category===category&&images.has(r.id));
  const own=all.filter(r=>!r.sample).sort((a,b)=>b.created-a.created);
  const demo=samples.filter(r=>r.category===category&&images.has(r.id));
  $("total").textContent="내 옷 "+own.length+"개 / 샘플 "+demo.length+"개";
  $("items").replaceChildren(tile(null),...own.map(tile),...demo.map(tile));$("empty").hidden=!!all.length;
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
      await write(item);await cacheImage(item);records.set(item.id,item);fittedFor(item);
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
  const item=records.get(wearing[category]),target=e.target.value;if(!item||item.sample||!slots[target]||target===category)return;
  const updated={...item,category:target};
  try{await write(updated);records.set(item.id,updated);delete wearing[item.category];wearing[target]=item.id;category=target;remember();renderCategory();renderLook();say(slots[target].name+" 항목으로 이동했어요.");}
  catch{say("분류 저장에 실패했어요.");renderCategory();}
};
$("remove").onclick=async ()=>{
  const item=records.get(wearing[category]);if(!item||item.sample||!confirm(item.name+" 사진을 옷장에서 삭제할까요?"))return;
  try{await write(item,true);URL.revokeObjectURL(images.get(item.id).url);records.delete(item.id);images.delete(item.id);for(const key of modelPhotos.keys())fittedCache.delete(key+":"+item.id);delete wearing[item.category];remember();renderCategory();renderLook();say("옷을 삭제했어요.");}
  catch{say("삭제에 실패했어요.");}
};
async function init(){
  renderCategory();
  const female=$("form"),male=new Image(768,1152);
  female.alt="여성 피팅 모델";male.id="form";male.alt="남성 피팅 모델";male.src=new URL("studio-male.webp",import.meta.url);
  try{await Promise.all([loadStudio(),female.decode(),male.decode()]);modelPhotos.set("female",female);modelPhotos.set("male",male);}
  catch{say("피팅 모델을 불러오지 못했어요. 연결을 확인하고 새로고침해 주세요.");return;}
  const loaded=await Promise.allSettled(samples.map(async item=>{await cacheImage(item);records.set(item.id,item);}));
  if(loaded.some(result=>result.status==="rejected"))say("일부 샘플 사진을 불러오지 못했어요. 연결을 확인하고 새로고침해 주세요.");
  try{
    db=await new Promise((ok,fail)=>{const req=indexedDB.open("codirum-wardrobe",1);req.onupgradeneeded=()=>req.result.createObjectStore("clothes",{keyPath:"id"});req.onsuccess=()=>ok(req.result);req.onerror=()=>fail(req.error);});
    const all=await new Promise((ok,fail)=>{const r=db.transaction("clothes").objectStore("clothes").getAll();r.onsuccess=()=>ok(r.result);r.onerror=()=>fail(r.error);});
    await Promise.all(all.map(async item=>{await cacheImage(item);records.set(item.id,item);}));
    $("files").disabled=false;
  }catch{say("이 브라우저에서 저장 공간을 열지 못했어요. 사이트 저장 권한을 확인해 주세요.");}
  try{
    const saved=localStorage.getItem(selectionKey);
    wearing=saved?JSON.parse(saved)||{}:{};
    if(localStorage.getItem(modelKey)==="male")model="male";
  }catch{}
  for(const button of $("models").children)button.disabled=false;
  selectModel(model);renderCategory();
}
init();
