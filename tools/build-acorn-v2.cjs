const fs=require('fs'),assert=require('assert'),C=require('../editor-src/core.js');
function build(){
 const seeds=JSON.parse(fs.readFileSync('editor-src/seeds.json')),base=seeds.find(d=>d.id==='flow-v1-acorn-key'),d=C.copy(base),orders=[8,42,43,44];
 assert.equal(base.queues.flat().length,47);
 for(const order of orders){const job=d.queues.flat().find(j=>j.order===order);assert(job&&job.c===0);job.capacity=2;}
 Object.assign(d,{id:'flow-v2-acorn-key',name:'Eichelhut \u00b7 gezielte Bonusboxen',familyId:'',variantKey:'',notes:'Vergleich bei Verkehr B. Motiv, Mengen, Reihenfolge und Schl\u00fcssel unver\u00e4ndert. Vier markierte schwarze Konturboxen mit Doppeltransport: erste Box hinter dem Schloss sowie die drei letzten gr\u00f6\u00dferen Konturauftr\u00e4ge. Kein h\u00f6heres Tempo und keine zus\u00e4tzlichen Boxen.',updatedAt:'2026-11-09T00:00:00Z'});
 const normal=C.copy(d.queues);for(const j of normal.flat())delete j.capacity;assert.deepEqual(normal,base.queues);assert.deepEqual(d.pixels,base.pixels);assert.deepEqual(C.counts(d),C.counts(base));assert(C.checkQueues(d).ok);return C.validate(d);
}
module.exports={build};if(require.main===module){const d=build(),seeds=JSON.parse(fs.readFileSync('editor-src/seeds.json')),index=seeds.findIndex(a=>a.id===d.id);if(index<0)seeds.push(d);else seeds[index]=d;fs.writeFileSync('editor-src/seeds.json',JSON.stringify(seeds));console.log(d.id,d.queues.flat().length,'boxes; four bonus jobs');}
