const assert=require('assert'),fs=require('fs'),vm=require('vm'),native=require('@napi-rs/canvas');
const s={};vm.createContext(s);vm.runInContext(fs.readFileSync(require.resolve('../editor-src/queue-label.js'),'utf8'),s);
for(const value of [1,7,8,16,28,99,104,120]){
 const can=native.createCanvas(200,180),c=can.getContext('2d');s.MosaicQueueLabel.draw(c,100,150,150,value);
 const pixels=c.getImageData(0,0,200,180).data;let left=200,right=-1,top=180,bottom=-1;
 for(let y=0;y<180;y++)for(let x=0;x<200;x++){const k=(y*200+x)*4;if(pixels[k]>240&&pixels[k+1]>235&&pixels[k+2]>220&&pixels[k+3]>230){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}}
 assert(right>=left,'no visible text');assert(Math.abs((left+right)/2-105.175)<1.6,'horizontal ink alignment '+value);assert(Math.abs((top+bottom)/2-94.6125)<1.6,'vertical ink alignment '+value);assert(right-left<91,'text exceeds coloured inset '+value);
}
console.log('Rendered numeral ink stays centred on the coloured inset: 1,7,8,16,28,99,104,120 PASS');
