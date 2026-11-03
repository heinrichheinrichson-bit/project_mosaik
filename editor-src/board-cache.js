(function(root){
'use strict';
// Keep the full board as a transparent layer. Tile removal only repaints its
// neighbourhood; overlapping bevels and shadows retain the original draw order.
function update(canvas,previous,doc,board,lifting,layout,style,paint,makeCanvas=()=>document.createElement('canvas')){
 const {pitch,bx,by}=layout,w=doc.width,h=doc.height;
 const signature=JSON.stringify([w,h,doc.palette,layout,style,canvas.width,canvas.height]);
 const visible=board.map((row,y)=>row.map((color,x)=>lifting.has(y*w+x)?null:color));
 const full=!previous||previous.signature!==signature;
 const changes=[];
 if(!full)for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(previous.visible[y][x]!==visible[y][x])changes.push([x,y]);
 const c=canvas.getContext('2d');let painted=0,scratch=previous?.scratch;
 if(full||changes.length){
  if(!scratch||scratch.width!==canvas.width||scratch.height!==canvas.height){scratch=makeCanvas();scratch.width=canvas.width;scratch.height=canvas.height;}
  const b=scratch.getContext('2d');b.clearRect(0,0,scratch.width,scratch.height);
  const region=full?{left:0,top:0,right:canvas.width,bottom:canvas.height}:{left:Math.max(0,Math.floor(Math.min(...changes.map(([x])=>bx+(x-2)*pitch)))),top:Math.max(0,Math.floor(Math.min(...changes.map(([,y])=>by+(y-2)*pitch)))),right:Math.min(canvas.width,Math.ceil(Math.max(...changes.map(([x])=>bx+(x+3)*pitch)))),bottom:Math.min(canvas.height,Math.ceil(Math.max(...changes.map(([,y])=>by+(y+3)*pitch))))};
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
   const color=visible[y][x];if(color===null)continue;
   const px=bx+(x+.5)*pitch,py=by+(y+.5)*pitch;
   if(!full&&(px+2*pitch<region.left||px-2*pitch>region.right||py+2*pitch<region.top||py-2*pitch>region.bottom))continue;
   paint(b,px,py,pitch,doc.palette[color],style);painted++;
  }
  const {left,top,right,bottom}=region,rw=right-left,rh=bottom-top;
  if(rw>0&&rh>0){c.clearRect(left,top,rw,rh);c.drawImage(scratch,left,top,rw,rh,left,top,rw,rh);}
 }
 return{signature,visible,painted,scratch};
}
if(typeof module!=='undefined')module.exports={update};else root.MosaicBoardCache={update};
})(typeof globalThis!=='undefined'?globalThis:this);
