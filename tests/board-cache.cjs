const assert=require('assert'),fs=require('fs'),vm=require('vm'),native=require('@napi-rs/canvas'),cache=require('../editor-src/board-cache.js');
const s={};vm.createContext(s);vm.runInContext(fs.readFileSync(require.resolve('../editor-src/stone-renderer.js'),'utf8'),s);
const d=require('../editor-src/seeds.json').find(d=>d.id.startsWith('studio-v2-'));
const board=d.pixels.map(r=>r.slice()),a=native.createCanvas(420,505),b=native.createCanvas(420,505),layout={pitch:312/d.width,bx:54,by:34},style={round:12,gap:4,bevel:9,depth:36,material:'satin'};
let state,fullTime=0,incrementalTime=0,fullCalls=0,cachedCalls=0;
const lifting=new Set();
function check(){
 let t=performance.now();state=cache.update(a,state,d,board,lifting,layout,style,s.renderStone,()=>native.createCanvas(420,505));incrementalTime+=performance.now()-t;cachedCalls+=state.painted;
 const c=b.getContext('2d');c.clearRect(0,0,420,505);t=performance.now();
 for(let y=0;y<d.height;y++)for(let x=0;x<d.width;x++)if(board[y][x]!==null&&!lifting.has(y*d.width+x)){s.renderStone(c,layout.bx+(x+.5)*layout.pitch,layout.by+(y+.5)*layout.pitch,layout.pitch,d.palette[board[y][x]],style);fullCalls++;}
 fullTime+=performance.now()-t;
 const left=a.getContext('2d').getImageData(0,0,420,505).data,right=c.getImageData(0,0,420,505).data;
 assert.deepStrictEqual(left,right,'incremental board must match full redraw');
}
check();const cells=board.flatMap((row,y)=>row.flatMap((k,x)=>k===null?[]:[[x,y]]));
for(let i=0;i<40;i++){const [x,y]=cells[(i*31)%cells.length];lifting.add(y*d.width+x);check();board[y][x]=null;lifting.delete(y*d.width+x);check();}
style.depth=60;check();state=null;check();
console.log(JSON.stringify({checks:83,fullCalls,cachedCalls,fullTimeMs:Math.round(fullTime),incrementalTimeMs:Math.round(incrementalTime)}));assert(cachedCalls<fullCalls*.2);
