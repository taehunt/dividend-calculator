// Refine only the uncertain strip around a shirt, using nearby colours from the original photo.
export function refineShirtMatte(photo,mask,w,h){
  const stride=w+2,fg=new Uint8Array(stride*(h+2)),bg=new Uint8Array(fg.length);
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const i=(y+1)*stride+x+1,a=mask[(y*w+x)*4+3];
    if(a>175)fg[i]=Math.min(20,fg[i-1]+1,fg[i-stride]+1);
    if(a<60)bg[i]=Math.min(20,bg[i-1]+1,bg[i-stride]+1);
  }
  for(let y=h-1;y>=0;y--)for(let x=w-1;x>=0;x--){
    const i=(y+1)*stride+x+1;
    fg[i]=Math.min(fg[i],fg[i+1]+1,fg[i+stride]+1);
    bg[i]=Math.min(bg[i],bg[i+1]+1,bg[i+stride]+1);
  }
  const steps=[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,-1],[-1,1],[1,1]];
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const i=(y+1)*stride+x+1,k=4*(y*w+x);
    if(fg[i]>6||bg[i]>4)continue;
    let fi=-1,bi=-1,fd=Infinity,bd=Infinity;
    for(const radius of [3,7,12,18])for(const [dx,dy] of steps){
      const nx=x+dx*radius,ny=y+dy*radius;
      if(nx<0||nx>=w||ny<0||ny>=h)continue;
      const j=(ny+1)*stride+nx+1,n=4*(ny*w+nx);
      if(fg[j]<5&&bg[j]<4)continue;
      const dist=(photo[n]-photo[k])**2+(photo[n+1]-photo[k+1])**2+(photo[n+2]-photo[k+2])**2+radius*.8;
      if(fg[j]>=5&&dist<fd){fi=n;fd=dist;}
      if(bg[j]>=4&&dist<bd){bi=n;bd=dist;}
    }
    if(fi<0||bi<0)continue;
    let norm=0,dot=0;
    for(let c=0;c<3;c++){
      const d=photo[fi+c]-photo[bi+c];norm+=d*d;dot+=(photo[k+c]-photo[bi+c])*d;
    }
    if(norm<650)continue;
    const confidence=Math.min(1,(norm-650)/1800);
    const fraction=Math.max(0,Math.min(1,dot/norm));
    mask[k+3]=Math.round((1-confidence)*mask[k+3]+confidence*255*fraction);
    for(let c=0;c<3;c++)mask[k+c]=photo[k+c];
  }
}
