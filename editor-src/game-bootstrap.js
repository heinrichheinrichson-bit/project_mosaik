'use strict';
const gameHadSettings=!!localStorage.getItem('mosaik-play-lab-v2');
const C=EditorCore,$=id=>document.getElementById(id),state={docs:EDITOR_SEEDS.map(C.validate),selectedId:EDITOR_SEEDS[0].id,baselines:{}};
const current=()=>state.docs.find(d=>d.id===state.selectedId);
function selectDoc(id){if(state.docs.some(d=>d.id===id))state.selectedId=id;}
function say(message){const el=$('gameMessage');if(el)el.textContent=message;}
function queueSave(){}
function download(name,text){const blob=new Blob([text],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
try{const saved=JSON.parse(localStorage.getItem(MosaicGameTransfer.LIBRARY)||'[]');for(const item of saved){const p=MosaicGameTransfer.unpack(item);state.docs=state.docs.filter(d=>d.id!==p.doc.id);state.docs.push(p.doc);}}catch(e){console.warn('Spielkatalog:',e.message);}
