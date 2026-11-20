// The form and garment slots share a 400 by 760 coordinate system.
export function drawForm(canvas) {
  const ctx = canvas.getContext("2d");
  const tone = ctx.createLinearGradient(85, 0, 302, 0);
  for (const [p,c] of [[0,"#ac967a"],[.25,"#d4c4a8"],[.48,"#ece0c8"],[.72,"#d2c0a3"],[1,"#a38e73"]]) tone.addColorStop(p,c);
  function shape(path) {
    const outline = new Path2D(path);
    ctx.fillStyle = tone; ctx.fill(outline);
    ctx.strokeStyle = "rgba(109,91,64,.29)"; ctx.lineWidth = 1.6; ctx.stroke(outline);
  }
  function paired(path) {
    shape(path); ctx.save(); ctx.translate(400,0); ctx.scale(-1,1); shape(path); ctx.restore();
  }
  const shadow=ctx.createRadialGradient(200,710,3,200,710,116);
  shadow.addColorStop(0,"rgba(59,73,50,.24)"); shadow.addColorStop(1,"rgba(59,73,50,0)");
  ctx.save(); ctx.translate(0,602); ctx.scale(1,.15); ctx.fillStyle=shadow;ctx.fillRect(65,570,270,280);ctx.restore();
  paired("M154 321 Q136 368 145 419 L154 511 Q148 557 162 611 L165 670 Q158 682 149 698 Q143 710 163 710 L184 707 Q192 705 190 693 L186 671 Q196 613 190 566 L193 523 L199 431 L203 352 Z");
  paired("M151 137 Q132 128 122 151 Q114 169 110 197 L98 242 Q94 253 94 269 L78 354 Q72 369 77 388 L83 403 Q87 408 90 401 L89 382 Q94 392 97 383 L97 365 Q104 349 105 333 L118 282 Q126 263 127 250 L149 192 Z");
  shape("M178 101 Q180 124 164 130 L138 138 Q129 142 130 158 Q132 188 145 213 Q159 246 155 263 Q151 280 141 309 Q132 340 143 364 Q161 377 198 377 Q239 378 257 364 Q268 341 259 310 Q249 278 244 263 Q240 242 254 212 Q266 187 270 157 Q271 141 260 137 L235 131 Q220 126 222 102 Z");
  shape("M200 19 C175 18 163 33 165 62 Q164 88 180 105 Q189 118 200 119 Q211 118 221 105 Q236 87 236 60 C237 33 225 19 200 19 Z");
  ctx.beginPath(); ctx.moveTo(200,140);ctx.bezierCurveTo(196,204,203,277,200,366);
  ctx.moveTo(152,263);ctx.quadraticCurveTo(199,273,246,263);
  ctx.strokeStyle="rgba(126,101,70,.23)";ctx.setLineDash([3,4]);ctx.stroke();
}

export const slots = {
  hat: {name:"모자", boxes:[[146,0,108,85]],z:8},
  top: {name:"상의", boxes:[[103,121,194,184]],z:4},
  bottom: {name:"하의", boxes:[[135,279,130,409]],z:3},
  outer: {name:"아우터", boxes:[[90,116,220,249]],z:6},
  socks: {name:"양말", boxes:[[150,621,44,79],[208,621,44,79]],z:2},
  shoes: {name:"신발", boxes:[[139,659,57,55],[204,659,57,55]],z:7},
  gloves: {name:"장갑", boxes:[[68,352,37,58],[295,352,37,58]],z:5}
};
