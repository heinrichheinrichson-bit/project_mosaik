function shade(hex,amount){const v=parseInt(hex.slice(1),16),target=amount>0?255:0,t=Math.abs(amount);return 'rgb('+[v>>16,(v>>8)&255,v&255].map(c=>Math.round(c+(target-c)*t)).join(',')+')';}
function stonePath(c,x,y,s,r){c.beginPath();if(r>0)c.roundRect(x,y,s,s,r);else c.rect(x,y,s,s);}
function renderStone(c,x,y,pitch,color,style,lift=0){
 const s=pitch*(1-style.gap/100),r=Math.min(s/2,pitch*style.round/100),height=pitch*style.depth/100,dx=height*.36,dy=height*.72,bevel=Math.min(s*.45,pitch*style.bevel/100);
 c.save();
 // The footprint stays in the grid; the upper face projects up and left.
 // Repeated rounded silhouettes form continuous walls, including curved corners.
 if(lift>0){c.fillStyle='rgba(63,43,28,'+Math.max(.10,.23-lift/pitch*.12)+')';c.beginPath();c.ellipse(x+height*.12,y+height*.12,s*.54,s*.43,0,0,Math.PI*2);c.fill();}
 const bottom=y-lift,steps=Math.max(1,Math.min(48,Math.ceil(height*1.5)));
 if(height>0){for(let i=0;i<=steps;i++){const f=i/steps,left=x-s/2-dx*f,top=bottom-s/2-dy*f;stonePath(c,left,top,s,r);const g=c.createLinearGradient(left,top,left+s,top+s);g.addColorStop(0,shade(color,-.20));g.addColorStop(.46,shade(color,-.29));g.addColorStop(1,shade(color,-.43));c.fillStyle=g;c.fill();}}
 const left=x-s/2-dx,top=bottom-s/2-dy;
 stonePath(c,left,top,s,r);c.fillStyle=color;c.fill();c.clip();
 if(bevel>0){let g=c.createLinearGradient(0,top,0,top+s);const stop=Math.min(.45,bevel/s);g.addColorStop(0,shade(color,.30));g.addColorStop(stop,color);g.addColorStop(1-stop,color);g.addColorStop(1,shade(color,-.16));c.fillStyle=g;c.fillRect(left,top,s,s);g=c.createLinearGradient(left,0,left+s,0);g.addColorStop(0,'#ffffff25');g.addColorStop(stop,'#ffffff00');g.addColorStop(1-stop,'#00000000');g.addColorStop(1,'#00000012');c.fillStyle=g;c.fillRect(left,top,s,s);}
 if(style.material!=='matte'){const g=c.createLinearGradient(left,top,left+s,top+s);g.addColorStop(0,style.material==='gloss'?'#ffffff88':'#ffffff20');g.addColorStop(.43,style.material==='gloss'?'#ffffff24':'#ffffff00');g.addColorStop(.46,'#ffffff00');g.addColorStop(1,'#ffffff00');c.fillStyle=g;c.fillRect(left,top,s,s);}
 c.restore();
}
