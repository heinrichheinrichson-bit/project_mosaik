(function(){
'use strict';
const phone=$('playPhone'),params=new URLSearchParams(location.search);
let surface=params.get('surface')==='crafted'?'crafted':'original',cache=null,cacheKey='';
const choice=document.createElement('select');choice.id='gameSurface';choice.innerHTML='<option value="original">Bisherige Gestaltung</option><option value="crafted">Keramik & Blaugrau</option>';
const label=document.createElement('label');label.textContent='Oberfläche ';label.append(choice);$('gameTestTools').append(label);
const style=document.createElement('style');style.textContent=`
#playDialog:has(#playPhone[data-surface="crafted"]){background:#213a46}
#playPhone[data-surface="crafted"]{background:radial-gradient(ellipse at 15% 15%,#36515a 0%,#29434e 43%,#213a46 100%);color:#f6efe0}
#playPhone[data-surface="crafted"] .top{background:linear-gradient(180deg,#20384490,#20384400)}
#playPhone[data-surface="crafted"] #playTitle{color:#f5eedf;letter-spacing:.1px}
#playPhone[data-surface="crafted"] #gameBack,#playPhone[data-surface="crafted"] #gameHeaderActions button{color:#d6dacd}
#playPhone[data-surface="crafted"] .bar{background:#10293670;box-shadow:inset 0 1px 1px #07172355}
#playPhone[data-surface="crafted"] #gameProgress{background:linear-gradient(90deg,#91bdb0,#c1d7b9);box-shadow:0 0 3px #c0d5b755}
#playPhone[data-surface="crafted"] .queuearea{position:relative;isolation:isolate}
#playPhone[data-surface="crafted"] .queuearea::before{content:"";position:absolute;inset:-4px 12px 0;border-radius:17px;background:linear-gradient(160deg,#3c565d,#2a424d 70%);border:1px solid #91a79c38;box-shadow:inset 0 1px 0 #e5e7cf1a,inset 0 3px 9px #0b243630,0 3px 9px #071b2420;z-index:-1;pointer-events:none}
#playPhone[data-surface="crafted"] #playQueues button.preview{opacity:.8}
#playPhone[data-surface="crafted"] #playQueues button.preview:nth-of-type(3){opacity:.66}
#playPhone[data-surface="crafted"] #playQueues .queue-remaining{color:#bac8c2}
`;document.head.append(style);
function rounded(c,x,y,w,h,r,fill){c.fillStyle=fill;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();}
function gradient(c,y,h,a,b){const g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,a);g.addColorStop(1,b);return g;}
function paint(c,g,l,height){
 const {pitch,bx,by,parkingY}=l,pad=2+g.padding,x=bx-pad*pitch,y=by-pad*pitch,w=(g.w+2*pad)*pitch,h=(g.h+2*pad)*pitch;
 // Only a soft light pool under the transport area; no drawn route or border.
 const floor=c.createLinearGradient(0,y+h-8,0,height);floor.addColorStop(0,'#b9c7ab00');floor.addColorStop(.55,'#b9c7ab0d');floor.addColorStop(1,'#b9c7ab04');c.fillStyle=floor;c.fillRect(0,y+h-8,420,height-y-h+8);
 c.save();c.shadowColor='#06192360';c.shadowBlur=9;c.shadowOffsetY=5;rounded(c,x,y+4,w,h,10,'#ac9e86');c.restore();
 rounded(c,x,y+3,w,h+2,10,gradient(c,y,h,'#dbd1bd','#a99c86'));
 rounded(c,x,y,w,h,10,gradient(c,y,h,'#fff8e9','#d1c5ac'));
 // A narrow, raised rim surrounds the calm recessed playing surface.
 rounded(c,x+4,y+4,w-8,h-8,7,gradient(c,y,h,'#c8bda8','#eee4d0'));
 rounded(c,x+6,y+6,w-12,h-12,6,gradient(c,y,h,'#e9dfca','#e0d5bd'));
 c.save();c.strokeStyle='#fffdf1b0';c.lineWidth=.8;c.beginPath();c.roundRect(x+.7,y+.7,w-1.4,h-1.4,9);c.stroke();c.strokeStyle='#a0947c50';c.beginPath();c.roundRect(x+5.5,y+5.5,w-11,h-11,6);c.stroke();c.restore();
 const edge=y+h;rounded(c,x,edge-2,w,7,2,gradient(c,edge-2,7,'#f3ead7','#c9ba9c'));rounded(c,x,edge+5,w,7,3,gradient(c,edge+5,7,'#ddd0b5','#bcae90'));
 c.save();c.fillStyle='#0b26331a';c.beginPath();c.ellipse(210,parkingY+27,166,7,0,0,Math.PI*2);c.fill();c.restore();
}
globalThis.mosaicGameBackdrop=(c,g,l,height)=>{
 if(surface!=='crafted')return false;
 const key=JSON.stringify([g.w,g.h,g.padding,l,height]);
 if(!cache||key!==cacheKey){cache=document.createElement('canvas');cache.width=420;cache.height=height;paint(cache.getContext('2d'),g,l,height);cacheKey=key;}
 c.drawImage(cache,0,0);return true;
};
function setSurface(value){surface=value==='crafted'?'crafted':'original';phone.dataset.surface=surface;choice.value=surface;if(playGame)drawPlay();}
choice.onchange=()=>setSurface(choice.value);
window.addEventListener('message',e=>{if(e.origin===location.origin&&e.source===parent&&e.data?.kind==='mosaic-layout-study'&&e.data.action==='surface')setSurface(e.data.surface);});
globalThis.MosaicSurface={set:setSurface,get:()=>surface};setSurface(surface);
})();
