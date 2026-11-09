(function(root){
'use strict';
const stages=[
 {id:'flow-v1-whale',title:'Farben freilegen',rule:'normal',heading:'Eine Farbe öffnet die nächste',text:'Wähle eine vordere Schatulle. Ihre Bots holen erreichbare Steine derselben Farbe. Halte einen der vier Stellplätze für die nächste hilfreiche Farbe frei.'},
 {id:'flow-v1-acorn-key',title:'Den Schlüssel erreichen',rule:'key',heading:'Der Schlüssel öffnet die Kette',text:'Wähle die Schatullen vor dem Schlüssel, bis er vorne steht. Wenn du seine Schatulle auf einen freien Stellplatz setzt, öffnet sich die zugehörige Spalte sofort.'},
 {id:'flow-v1-sunmoon-pair',title:'Gemeinsam starten',rule:'pair',heading:'Eine Klammer, zwei Stellplätze',text:'Die verbundenen Schatullen starten zusammen. Beide müssen vorne stehen und zwei Stellplätze müssen frei sein. Danach arbeiten sie unabhängig voneinander.'},
 {id:'flow-v1-balance-bonus',title:'Doppelt transportieren',rule:'bonus',heading:'Zwei Steine auf einer Fahrt',text:'Bots einer ×2-Schatulle können zwei benachbarte Steine ihrer Farbe mitnehmen. Die Zahl bleibt die Steinmenge. Fehlt ein passender Nachbar, holen sie einen Stein.'},
 {id:'flow-v2-sunmoon-pair-depth',title:'Den Partner nach vorne holen',rule:'depth',heading:'Der Partner wartet dahinter',text:'Eine verbundene Schatulle steht noch in Reihe zwei. Wähle zuerst die Schatulle davor. Sobald beide Partner vorne sind, können sie mit zwei freien Stellplätzen gemeinsam starten.'},
 {id:'flow-v2-acorn-key',title:'Schlüssel und Belohnung',rule:'combination',heading:'Die geöffnete Spalte hilft weiter',text:'Hier öffnet der Schlüssel den Zugang zu einer ×2-Schatulle. Weitere markierte Konturboxen helfen beim Auflösen des Bildes. Die bekannten Regeln bleiben gleich.'}
];
const ids=new Set(stages.map(s=>s.id)),rules=new Set(stages.map(s=>s.rule));
function normalize(raw){raw=raw&&typeof raw==='object'?raw:{};return{version:1,completed:[...new Set(Array.isArray(raw.completed)?raw.completed:[])].filter(id=>ids.has(id)),seen:[...new Set(Array.isArray(raw.seen)?raw.seen:[])].filter(id=>rules.has(id)),current:ids.has(raw.current)?raw.current:stages[0].id};}
function complete(raw,id,assisted=false){const p=normalize(raw);if(!assisted&&ids.has(id)&&!p.completed.includes(id))p.completed.push(id);return p;}
function following(id){const i=stages.findIndex(s=>s.id===id);return i>=0?stages[i+1]||null:null;}
const api={stages,normalize,complete,following};if(typeof module==='object'&&module.exports)module.exports=api;else root.MosaicJourney=api;
})(globalThis);
