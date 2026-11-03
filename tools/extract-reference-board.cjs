const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(root,'index.html'),'utf8');
function block(at){const open=source.indexOf('{',at);let depth=0,quote=null;for(let i=open;i<source.length;i++){const c=source[i];if(quote){if(c==='\\'){i++;continue;}if(c===quote)quote=null;continue;}if(c==='"'||c==="'"||c==='`'){quote=c;continue;}if(c==='{')depth++;if(c==='}'&&--depth===0)return source.slice(at,i+1);}throw Error('Unclosed reference function');}
function original(name){const at=source.indexOf('function '+name+'(');if(at<0)throw Error(name);return block(at);}
const stepAt=source.indexOf('drawStudiedRamp=function(x,y,w,h){');if(stepAt<0)throw Error('Original two-step renderer missing');
const functions=['materialGradient','rr','drawUnderlay','drawStudiedRamp'].map(original).join('\n')+'\nconst slopeStudyDrawing=drawStudiedRamp;'+block(stepAt)+';';
const setup="let ctx;const tactileUnderlay=true,rampLength=12,rampDesign='steps',rampContrast=65,whiteWalkway=false;class DynamicPuzzle{}const puzzle=new DynamicPuzzle();puzzle.level={fullPicture:true};";
function build(){const out="// Generated directly from index.html. Preserve original board and stair drawing.\n(function(root){'use strict';"+setup+'\n'+functions+"\nroot.MosaicReferenceBoard={paint(c,frame){ctx=c;ctx.save();ctx.translate(frame.x,frame.y);ctx.scale(frame.w/363,frame.h/363);ctx.translate(-28.5,-18.5);drawUnderlay();ctx.restore();}};\n})(globalThis);\n";fs.writeFileSync(path.join(root,'editor-src/reference-board.js'),out);console.log('Original board and exact two-step renderer extracted');}
module.exports={functions,setup};if(require.main===module)build();
