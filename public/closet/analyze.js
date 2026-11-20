// Runs only during import. Pixel arrays stay in this worker on this device.
const cdn = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.20.1/dist/";
const models = {
  category:"https://huggingface.co/louisJLN/yolo8-fashionpedia/resolve/f98e49e0336097c355473cbb85e8187770820521/results/yolov8n-fashionpedia-1.onnx",
  mask:"https://huggingface.co/nfa04/u2netp-onnx/resolve/8e72726f035efc3d1918c96b020d536f2b69ba0c/u2netp.onnx"
};
const groups = {0:"top",1:"top",2:"top",3:"outer",4:"outer",5:"outer",6:"bottom",7:"bottom",8:"bottom",9:"outer",10:"top",11:"top",12:"outer",14:"hat",15:"hat",17:"gloves",20:"socks",21:"socks",22:"socks",23:"shoes"};
const sessions = {};
async function session(key) {
  if (sessions[key]) return sessions[key];
  const url=models[key];
  let cache, response;
  try { cache=await caches.open("codirum-models-v1"); response=await cache.match(url); } catch {}
  if (!response) {
    response=await fetch(url,{credentials:"omit"});
    if (!response.ok) throw Error("model");
    if(cache) try {await cache.put(url,response.clone());} catch {}
  }
  const bytes=await response.arrayBuffer();
  sessions[key]=await ort.InferenceSession.create(bytes,{executionProviders:["wasm"],graphOptimizationLevel:"all"});
  return sessions[key];
}
async function run(key,rgba,size) {
  const model=await session(key);
  const n=size*size, input=new Float32Array(3*n);
  const means=[.485,.456,.406], std=[.229,.224,.225];
  for(let i=0;i<n;i++) for(let c=0;c<3;c++) {
    const normalized=rgba[i*4+c]/255;
    input[c*n+i]=key==="mask"?(normalized-means[c])/std[c]:normalized;
  }
  const data=await model.run({[model.inputNames[0]]:new ort.Tensor("float32",input,[1,3,size,size])});
  return data[model.outputNames[0]];
}
self.onmessage=async ({data})=>{
  try{
    if(!self.ort) {
      importScripts(cdn+"ort.wasm.min.js");
      ort.env.wasm.wasmPaths=cdn; ort.env.wasm.numThreads=1;
    }
    let category=null, mask=null;
    try {
      const tensor=await run("category",data.category,640);
      const count=tensor.dims[2]; let best=.18;
      for(const [id,group] of Object.entries(groups)) {
        const offset=(4+Number(id))*count;
        for(let i=0;i<count;i++) if(tensor.data[offset+i]>best) {
          best=tensor.data[offset+i];category=group;
        }
      }
    } catch {}
    if(data.mask) try {
      const prediction=await run("mask",data.mask,320);
      const pixels=prediction.data;
      let low=Infinity,high=-Infinity;
      for(const value of pixels){low=Math.min(low,value);high=Math.max(high,value);}
      if(high-low>.1) {
        mask=new Uint8ClampedArray(pixels.length);
        for(let i=0;i<pixels.length;i++) mask[i]=255*Math.max(0,Math.min(1,((pixels[i]-low)/(high-low)-.08)/.84));
      }
    } catch {}
    self.postMessage({category,mask},mask?[mask.buffer]:[]);
  }catch{self.postMessage({category:null,mask:null});}
};
