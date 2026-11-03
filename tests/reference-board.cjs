const fs=require('fs'),vm=require('vm'),assert=require('assert'),native=require('@napi-rs/canvas'),reference=require('../tools/extract-reference-board.cjs');
const extracted={};vm.createContext(extracted);vm.runInContext(fs.readFileSync(require.resolve('../editor-src/reference-board.js'),'utf8'),extracted);
for(const frame of [{x:28.5,y:18.5,w:363,h:363},{x:16,y:8,w:388,h:388}]){
 const a=native.createCanvas(420,460),b=native.createCanvas(420,460),ctx=a.getContext('2d');
 const original={canvasContext:ctx,frame};vm.createContext(original);vm.runInContext(reference.setup+'\n'+reference.functions+'\nctx=canvasContext;ctx.save();ctx.translate(frame.x,frame.y);ctx.scale(frame.w/363,frame.h/363);ctx.translate(-28.5,-18.5);drawUnderlay();ctx.restore();',original);
 extracted.MosaicReferenceBoard.paint(b.getContext('2d'),frame);
 assert.deepStrictEqual(a.getContext('2d').getImageData(0,0,420,460).data,b.getContext('2d').getImageData(0,0,420,460).data,'Original source / shared reference renderer differ');
 const lastY=Math.ceil(frame.y+frame.h+16*frame.h/363);assert(b.getContext('2d').getImageData(210,lastY-2,1,1).data[3]>0,'Second tread missing');
}
console.log('Original board + two-step source: pixel-identical at original and S22 dimensions PASS');
