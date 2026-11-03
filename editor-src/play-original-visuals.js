(function(root){'use strict';let garageLook='porch',ctx,tactileUnderlay=true,carrierStudyVariant='pip',activeCarrierRig=null;let carrierTexture=()=>null;const boxPaletteCache=new Map();const renderedBoxImage=new Image();renderedBoxImage.src=ORIGINAL_PLAY_BOX;function volumeCarrierTexture(name,color){return carrierTexture(name,color);}
function materialGradient(c,y,h,a,b){const g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,a);g.addColorStop(1,b);return g;}
function garageShape(c,points,fill){c.fillStyle=fill;c.beginPath();points.forEach((p,i)=>c[i?'lineTo':'moveTo'](...p));c.closePath();c.fill();}
function paintGarageShell(c,p){if(garageLook!=="original")return paintGarageStudyShell(c,p);c.save();c.translate(p.x,p.y);const G=(y,h,a,b)=>materialGradient(c,y,h,a,b); // Wide north-facing mouth narrows into the southward descent.
c.shadowColor='#08142040';c.shadowBlur=4;c.shadowOffsetY=3;c.fillStyle='#bba27b';c.beginPath();c.roundRect(-43,-26,86,56,13);c.fill();c.shadowColor='transparent';c.fillStyle=G(-26,56,'#fff1d0','#cbb18a');c.beginPath();c.roundRect(-43,-29,86,56,13);c.fill();
garageShape(c,[[-32,-26],[32,-26],[21,22],[-21,22]],G(-26,48,'#9bd5c0','#4d9997'));c.save();c.beginPath();c.moveTo(-32,-26);c.lineTo(32,-26);c.lineTo(21,22);c.lineTo(-21,22);c.closePath();c.clip();const center=c.createLinearGradient(0,-26,0,22);center.addColorStop(0,'#ddedd35c');center.addColorStop(1,'#326f7900');c.fillStyle=center;c.fillRect(-30,-26,60,50);c.strokeStyle='#e9f0cf80';c.lineWidth=1;for(const sign of [-1,1]){c.beginPath();c.moveTo(sign*25,-24);c.lineTo(sign*16,20);c.stroke();}c.restore();
// Thick rounded V-walls: outer ivory shell and shaded inner bevel.
for(const sign of [-1,1]){c.save();c.scale(sign,1);c.lineJoin='round';c.lineCap='round';c.strokeStyle='#b69a76';c.lineWidth=11;c.beginPath();c.moveTo(36,-21);c.lineTo(24,22);c.stroke();c.strokeStyle=G(-26,50,'#fff6dc','#dfc79e');c.lineWidth=10;c.beginPath();c.moveTo(36,-25);c.lineTo(24,18);c.stroke();c.strokeStyle='#fff9e780';c.lineWidth=1;c.beginPath();c.moveTo(37,-25);c.lineTo(25,17);c.stroke();c.restore();}c.restore();}
function paintGarageHood(c,p){if(garageLook!=="original")return paintGarageStudyHood(c,p);c.save();c.translate(p.x,p.y);c.fillStyle='#2e686c';c.beginPath();c.roundRect(-21,12,42,11,5);c.fill();const face=materialGradient(c,17,14,'#d6b58b','#b18c62');c.fillStyle=face;c.beginPath();c.roundRect(-31,17,62,14,7);c.fill();c.fillStyle=materialGradient(c,12,13,'#fff0cd','#ddbf91');c.beginPath();c.roundRect(-32,11,64,13,7);c.fill();c.strokeStyle='#fff8e3aa';c.lineWidth=.8;c.beginPath();c.moveTo(-24,13);c.lineTo(24,13);c.stroke();c.fillStyle='#73b5a9';c.beginPath();c.roundRect(-10,16,20,3.5,1.7);c.fill();c.restore();}
function paintGarageStudyShell(c,p){if(["sweep","porch","base"].includes(garageLook))return paintComposedGarage(c,p,false);if(["open","tunnel","inset"].includes(garageLook))return paintNewGarageShape(c,p,false);const depth=garageLook==='clear',quiet=garageLook==='quiet';c.save();c.translate(p.x,p.y);c.shadowColor='#07162235';c.shadowBlur=3;c.shadowOffsetY=2;c.fillStyle='#bca481';c.beginPath();c.roundRect(-43,-27,86,56,12);c.fill();c.shadowColor='transparent';c.fillStyle=materialGradient(c,-29,55,'#fff1d4','#ddc8a5');c.beginPath();c.roundRect(-43,-29,86,55,12);c.fill();
garageShape(c,[[-34,-26],[34,-26],[24,24],[-24,24]],materialGradient(c,-26,50,quiet?'#b5d8c9':depth?'#c2e2d5':'#aedfd0',quiet?'#639e96':depth?'#478b89':'#72afa4'));
c.save();c.beginPath();c.moveTo(-34,-26);c.lineTo(34,-26);c.lineTo(24,24);c.lineTo(-24,24);c.closePath();c.clip();const g=c.createLinearGradient(0,-16,0,23);g.addColorStop(0,'#244b5000');g.addColorStop(.55,'#244b5010');g.addColorStop(1,depth?'#163a4c99':'#234d5060');c.fillStyle=g;c.fillRect(-35,-26,70,52);c.strokeStyle=quiet?'#edf6df38':'#f5fae875';c.lineWidth=.8;for(const sign of [-1,1]){c.beginPath();c.moveTo(sign*28,-23);c.lineTo(sign*20,10);c.stroke();}c.restore();
for(const sign of [-1,1]){c.save();c.scale(sign,1);c.lineCap='round';c.strokeStyle='#bba582';c.lineWidth=quiet?5:6;c.beginPath();c.moveTo(38,-23);c.lineTo(27,21);c.stroke();c.strokeStyle=materialGradient(c,-27,50,'#fff6df','#e7d3af');c.lineWidth=quiet?5:6;c.beginPath();c.moveTo(38,-25);c.lineTo(27,18);c.stroke();c.strokeStyle='#fffbea9c';c.lineWidth=.8;c.beginPath();c.moveTo(38,-24);c.lineTo(28,17);c.stroke();c.restore();}c.restore();}
function paintGarageStudyHood(c,p){if(["sweep","porch","base"].includes(garageLook))return paintComposedGarage(c,p,true);if(["open","tunnel","inset"].includes(garageLook))return paintNewGarageShape(c,p,true);const quiet=garageLook==='quiet',depth=garageLook==='clear';c.save();c.translate(p.x,p.y);c.fillStyle=depth?'#28575c':'#416e6b';c.beginPath();c.roundRect(-24,11,48,13,4);c.fill();c.fillStyle=materialGradient(c,19,10,'#d2bb96','#bca17c');c.beginPath();c.roundRect(-31,18,62,10,5);c.fill();c.fillStyle=materialGradient(c,11,12,'#fff0d2','#e4cfaa');c.beginPath();c.roundRect(-32,11,64,11,5);c.fill();c.strokeStyle='#fff9e7ad';c.lineWidth=.8;c.beginPath();c.moveTo(-26,12.5);c.lineTo(26,12.5);c.stroke();c.fillStyle=quiet?'#8db7a7':'#81bcb0';c.beginPath();c.roundRect(-9,15,18,2.5,1.2);c.fill();c.restore();}
function paintNewGarageShape(c,p,front){c.save();c.translate(p.x,p.y);const G=(y,h,a,b)=>materialGradient(c,y,h,a,b);const rr=(x,y,w,h,r,fill)=>{c.fillStyle=fill;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();};
if(garageLook==='open'){
 if(!front){
 // A thin wedge, open across the north. No enclosing tray or high walls.
 garageShape(c,[[-38,-24],[38,-24],[27,26],[-27,26]],G(-24,50,'#c1e3d4','#609f98'));
 c.strokeStyle='#e8f4df';c.lineWidth=1;c.beginPath();c.moveTo(-37,-24);c.lineTo(37,-24);c.stroke();
 for(const s of [-1,1]){c.save();c.scale(s,1);c.lineCap='round';c.strokeStyle='#b49c77';c.lineWidth=4;c.beginPath();c.moveTo(34,-6);c.lineTo(28,22);c.stroke();c.strokeStyle='#f4e5c6';c.lineWidth=4;c.beginPath();c.moveTo(34,-8);c.lineTo(28,20);c.stroke();c.restore();}
 const g=c.createLinearGradient(0,-8,0,25);g.addColorStop(0,'#315b6000');g.addColorStop(1,'#315b6080');garageShape(c,[[-33,-8],[33,-8],[26,26],[-26,26]],g);
 }else{rr(-27,11,54,14,3,'#376f70');rr(-30,16,60,10,4,G(16,10,'#d7bd94','#b49a74'));rr(-30,11,60,8,4,G(11,8,'#fff0ce','#e3cdab'));rr(-8,14,16,2,1,'#80b7a5');}
}else if(garageLook==='tunnel'){
 if(!front){
 // Short rectangular porch. Parallel sides and a real bridge roof replace the V.
 rr(-36,-9,72,36,9,'#bca47e');rr(-36,-12,72,36,9,G(-12,36,'#eee0c5','#d3bb95'));
 rr(-28,-10,56,34,6,G(-10,34,'#b3dbca','#568e89'));
 rr(-35,-10,8,33,4,G(-10,33,'#fff1d3','#d1b58d'));rr(27,-10,8,33,4,G(-10,33,'#fff1d3','#d1b58d'));
 c.fillStyle='#2d646b';c.fillRect(-27,8,54,16);
 }else{
 rr(-36,16,72,13,7,G(16,13,'#c8ac82','#b4966f'));
 rr(-36,11,72,11,6,G(11,11,'#fff1d4','#e1c69f'));
 c.strokeStyle='#fff9e9';c.lineWidth=.8;c.beginPath();c.moveTo(-28,12.5);c.lineTo(28,12.5);c.stroke();
 rr(-11,15,22,3,1.5,'#82b6a7');
 }
}else{
 if(!front){
 // Inset oval: no exterior plinth; shading lives inside the cutout.
 c.fillStyle='#ddc9a7';c.beginPath();c.ellipse(0,-1,43,29,0,0,Math.PI*2);c.fill();
 c.fillStyle=G(-27,52,'#547e79','#a2ccbc');c.beginPath();c.ellipse(0,0,40,26,0,0,Math.PI*2);c.fill();
 c.strokeStyle='#f7e9cdaa';c.lineWidth=2;c.beginPath();c.ellipse(0,-1,42,28,0,Math.PI,Math.PI*2);c.stroke();
 c.fillStyle=G(-20,44,'#b9decd','#4b8986');c.beginPath();c.moveTo(-30,-20);c.quadraticCurveTo(0,-25,30,-20);c.lineTo(24,24);c.lineTo(-24,24);c.closePath();c.fill();
 const g=c.createLinearGradient(0,-4,0,23);g.addColorStop(0,'#254c5400');g.addColorStop(1,'#254c547a');c.fillStyle=g;c.beginPath();c.ellipse(0,6,32,18,0,0,Math.PI*2);c.fill();
 }else{
 // A shallow crescent overlaps the lower opening, keeping the same occlusion edge.
 c.fillStyle='#e5d1ae';c.beginPath();c.moveTo(-33,11);c.lineTo(33,11);c.quadraticCurveTo(41,18,29,25);c.quadraticCurveTo(0,38,-29,25);c.quadraticCurveTo(-41,18,-33,11);c.fill();
 c.fillStyle=G(11,18,'#fff0d0','#ddc6a0');c.beginPath();c.moveTo(-33,11);c.lineTo(33,11);c.quadraticCurveTo(38,17,27,22);c.quadraticCurveTo(0,31,-27,22);c.quadraticCurveTo(-38,17,-33,11);c.fill();rr(-8,16,16,2.5,1.2,'#8cb9a7');
 }
}c.restore();}
function paintComposedGarage(c,p,front){const mode=garageLook;if(front){const previous=garageLook;garageLook=mode==='porch'?'tunnel':'original';try{paintGarageHood(c,p);}finally{garageLook=previous;}return;}
c.save();c.translate(p.x,p.y);const G=(y,h,a,b)=>materialGradient(c,y,h,a,b);
const path=(left,right)=>{c.beginPath();c.moveTo(-left,-(mode==='sweep'?91:mode==='base'?67:49));c.bezierCurveTo(-left+4,-30,-right,-10,-right,22);c.lineTo(right,22);c.bezierCurveTo(right,-10,left-4,-30,left,-(mode==='sweep'?91:mode==='base'?67:49));c.closePath();};
const w=mode==='sweep'?40:mode==='base'?34:44,depth=mode==='sweep'?91:mode==='base'?67:49;
path(w,23);c.fillStyle=G(-depth,depth+22,'#c2dfcf','#559c98');c.fill();
c.save();path(w,23);c.clip();const sh=c.createLinearGradient(0,-30,0,23);sh.addColorStop(0,'#285b6200');sh.addColorStop(1,'#285b6270');c.fillStyle=sh;c.fillRect(-50,-depth,100,depth+25);c.restore();
for(const sign of [-1,1]){c.save();c.scale(sign,1);c.beginPath();c.moveTo(w,-depth);c.bezierCurveTo(w-2,-40,24,-12,24,20);c.lineTo(33,23);c.bezierCurveTo(33,-12,w+10,-40,w+3,-depth);c.quadraticCurveTo(w+1,-depth-2,w,-depth);c.closePath();c.fillStyle=G(-depth,depth+24,'#f7ecd3','#bca17d');c.fill();c.beginPath();c.moveTo(w+1,-depth+2);c.bezierCurveTo(w+4,-38,29,-10,29,17);c.strokeStyle='#fff3d9';c.lineWidth=mode==='sweep'?4:5;c.lineCap='round';c.stroke();c.restore();}
if(mode==='porch'){c.fillStyle=G(-7,25,'#fff0d1','#d5bc96');c.beginPath();c.roundRect(-36,-6,9,32,4);c.roundRect(27,-6,9,32,4);c.fill();}
c.restore();}
function rr(x,y,w,h,r,fill){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();}
function drawParkingPad(x){if(!tactileUnderlay){rr(x-28,437,56,46,9,'#f8f7f0');return;}ctx.save();ctx.shadowColor='#07111b60';ctx.shadowBlur=5;ctx.shadowOffsetY=3;rr(x-28,439,56,46,9,'#a99b84');ctx.shadowColor='transparent';rr(x-28,439,56,46,9,materialGradient(ctx,468,17,'#e1d4ba','#ae9c7f'));rr(x-28,435,56,46,9,materialGradient(ctx,435,46,'#fffbef','#e6dcc6'));ctx.strokeStyle='#fffdf5c0';ctx.lineWidth=.9;ctx.beginPath();ctx.roundRect(x-27.3,435.7,54.6,44.5,8);ctx.stroke();ctx.fillStyle='#e8dfcd';ctx.beginPath();ctx.roundRect(x-23,439,46,36,6);ctx.fill();ctx.strokeStyle='#bcad922e';ctx.lineWidth=.6;ctx.stroke();ctx.restore();}
function teamBoxTexture(hex){if(boxPaletteCache.has(hex))return boxPaletteCache.get(hex);if(!renderedBoxImage.complete||!renderedBoxImage.naturalWidth)return renderedBoxImage;const cv=document.createElement('canvas');cv.width=renderedBoxImage.naturalWidth;cv.height=renderedBoxImage.naturalHeight;const c=cv.getContext('2d',{willReadFrequently:true});c.drawImage(renderedBoxImage,0,0);const im=c.getImageData(0,0,cv.width,cv.height),a=im.data;const rgb=[parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)],base=[218,37,65];for(let i=0;i<a.length;i+=4){if(!a[i+3])continue;const r=a[i],g=a[i+1],b=a[i+2],red=r-Math.max(g,b);if(red<18||b<g*.80)continue;const mask=Math.min(1,(red-18)/30)*Math.min(1,(b-g+9)/19);const light=Math.min(1,Math.min(g/base[1],b/base[2],r/base[0]));const highlight=Math.max(0,(Math.min(g,b)-base[1])/(255-base[1]));for(let k=0;k<3;k++){const shade=rgb[k]*light;const v=shade+(255-shade)*Math.min(.95,highlight);a[i+k]=Math.round(a[i+k]*(1-mask)+v*mask);}}c.putImageData(im,0,0);boxPaletteCache.set(hex,cv);return cv;}
function paintRiggedCarrier(c,x,y,s,heading,swing,color,loaded=true,grip=1,variantOverride=null){
 const variant=variantOverride||(typeof activeCarrierRig!=='undefined'&&activeCarrierRig?activeCarrierRig:carrierStudyVariant),texture=volumeCarrierTexture(variant,color),g={cargoX:0};
 c.save();c.translate(x,y);c.rotate(heading);c.scale(s,s);const P=p=>({x:p.x-.36*p.z,y:p.y-.72*p.z});
 const poly=(ps,col)=>{c.fillStyle=col;c.beginPath();ps.map(P).forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.closePath();c.fill();};
 c.fillStyle='#14252c25';c.beginPath();c.ellipse(-.08,.03,.37,.33,0,0,Math.PI*2);c.fill();
 if(texture){const f=Math.min(.76/texture.width,.95/texture.height);c.save();c.translate(-.08,-.13);c.rotate(-Math.PI/2);c.drawImage(texture,-texture.width*f/2,-texture.height*f/2,texture.width*f,texture.height*f);c.restore();}
 // Broad bumper face, lower than the visor. The dark pad is inset in its face.
 poly([{x:.26,y:-.19,z:.14},{x:.34,y:-.19,z:.14},{x:.34,y:.19,z:.14},{x:.26,y:.19,z:.14}],'#fff0cf');
 poly([{x:.34,y:-.19,z:.025},{x:.34,y:.19,z:.025},{x:.34,y:.19,z:.14},{x:.34,y:-.19,z:.14}],'#bda884');
 poly([{x:.341,y:-.14,z:.05},{x:.341,y:.14,z:.05},{x:.341,y:.14,z:.13},{x:.341,y:-.14,z:.13}],'#314d54');
 if(loaded)renderStone(c,g.cargoX,0,.94,color,stoneStyle,0);
 c.restore();return g;
}
root.OriginalGameVisuals={garage(c,p,look,front){garageLook=look;if(front)paintGarageHood(c,p);else paintGarageShell(c,p);},parking(c,x,y,scale=1){ctx=c;c.save();c.translate(x,y);c.scale(scale,scale);c.translate(0,-458);drawParkingPad(0);c.restore();},carrier(c,x,y,pitch,heading,color,variant,lookup){carrierTexture=lookup;paintRiggedCarrier(c,x,y,pitch,heading,0,color,false,1,variant);},box(c,x,y,w,color,count,open=false){if(!renderedBoxImage.complete||!renderedBoxImage.naturalWidth)return false;const tex=teamBoxTexture(color),half=tex.width/2,iw=w*1.15,ih=iw*tex.height/half;c.save();c.drawImage(tex,open?half:0,0,half,tex.height,x-iw/2,y+30-ih,iw,ih);if(count!==null){c.fillStyle='#263b47';c.beginPath();c.roundRect(x-w*.21,y+7,w*.42,14,5);c.fill();c.fillStyle='#fff8ed';c.font='800 9px system-ui';c.textAlign='center';c.fillText(String(count),x,y+17);}c.restore();return true;}};
})(globalThis);