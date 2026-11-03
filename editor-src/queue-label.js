(function(root){
'use strict';
// Anchor on the coloured inset of the closed sprite, not the asymmetric PNG
// bounds (which include the handle, base and shadow). Match the box transform.
function draw(c,x,y,w,value,imageRatio=1){
 const iw=w*1.15,ih=iw*imageRatio,cx=x-iw/2+iw*.53,cy=y+30-ih+ih*.505,text=String(value);
 c.save();c.textAlign='left';c.textBaseline='alphabetic';c.lineJoin='round';
 let size=68,metrics;
 for(let i=0;i<4;i++){c.font='800 '+size+'px system-ui';metrics=c.measureText(text);const inkWidth=metrics.actualBoundingBoxLeft+metrics.actualBoundingBoxRight;if(inkWidth<=iw*.52)break;size*=iw*.52/inkWidth;}
 const left=metrics.actualBoundingBoxLeft,right=metrics.actualBoundingBoxRight,ascent=metrics.actualBoundingBoxAscent,descent=metrics.actualBoundingBoxDescent;
 const tx=cx-(right-left)/2,ty=cy+(ascent-descent)/2;
 c.strokeStyle='#182b36';c.lineWidth=Math.max(5,size*.1);c.strokeText(text,tx,ty);c.fillStyle='#fff9e9';c.fillText(text,tx,ty);c.restore();
 return{cx,cy,left:tx-left,right:tx+right,top:ty-ascent,bottom:ty+descent};
}
root.MosaicQueueLabel={draw};
})(globalThis);
