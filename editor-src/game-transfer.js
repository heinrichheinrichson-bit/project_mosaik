(function(root){
'use strict';
const KEY='mosaik-game-transfer-v1',LIBRARY='mosaik-game-library-v1';
function pack(doc,settings){const d=EditorCore.validate(doc);if(!d.queues)d.queues=EditorCore.buildQueues(d,28);if(!EditorCore.counts(d).some(Boolean))throw Error('Das Motiv ist leer.');return{kind:'mosaic-game-puzzle',schema:1,doc:d,settings:settings?PlayLabOptions.normalize(settings,d):null};}
function unpack(raw){if(!raw||raw.kind!=='mosaic-game-puzzle'||raw.schema!==1)throw Error('Keine gültige Spielrätsel-Datei.');return pack(raw.doc,raw.settings);}
function send(doc,settings){const p=pack(doc,settings);localStorage.setItem(KEY,JSON.stringify(p));return p;}
const api={KEY,LIBRARY,pack,unpack,send};if(typeof module!=='undefined')module.exports=api;else root.MosaicGameTransfer=api;
})(typeof globalThis!=='undefined'?globalThis:this);
