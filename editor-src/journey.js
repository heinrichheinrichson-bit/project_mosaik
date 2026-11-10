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

const intro=[
 {id:'intro-v1-icepop',title:'Sommerlaune',rule:'normal',heading:'Eine Farbe macht den Weg frei',text:'Wähle eine vordere Schatulle. Ihre Bots holen erreichbare Steine derselben Farbe. Mit dem schwarzen Umriss öffnest du den Zugang zu den bunten Flächen.'},
 {id:'intro-v1-pear',title:'Freches Früchtchen',rule:'normal',heading:'Platz für die nächste Farbe',text:'Wähle die nächste hilfreiche Farbe, sobald sie erreichbar wird. Vier Stellplätze stehen bereit. Eine Schatulle mit noch eingeschlossener Farbe wartet, bis du ihren Zugang öffnest.'},
 {id:'intro-v1-teapot-key',title:'Tee mit Schlüssel',rule:'key',heading:'Der Schlüssel wartet dahinter',text:'Der Schlüssel steht in Reihe zwei. Wähle die Schatulle davor, damit er nach vorne rückt. Wenn du seine Schatulle auswählst, öffnet sich die angekettete Spalte sofort.'},
 {id:'intro-v1-roller',title:'Süße Spritztour',rule:'normal',heading:'Eine kleine Runde ohne Sonderregel',text:'Hier zählen wieder nur Farben, Zugänge und freie Stellplätze. Wähle die passenden Schatullen und räume den Roller ab.'},
 {id:'intro-v1-cherries-pair',title:'Doppelt frech',rule:'pair',heading:'Zusammen brauchen sie zwei Plätze',text:'Die Klammer verbindet zwei Schatullen. Beide stehen vorne und starten mit einer Auswahl gemeinsam. Halte dafür zwei Stellplätze frei. Danach arbeiten ihre Bots unabhängig.'},
 {id:'intro-v1-orca-bonus',title:'Wellenreiter',rule:'bonus',heading:'Zwei Steine auf einer Fahrt',text:'Die markierte ×2-Schatulle kann zwei benachbarte Steine ihrer Farbe pro Fahrt holen. Die Zahl zählt weiterhin Steine. Fehlt ein passender Nachbar, wird ein Stein geholt.'}
];
function chapter(id,title,description,storageKey,list){
 const ids=new Set(list.map(s=>s.id)),rules=new Set(list.map(s=>s.rule));
 function normalize(raw){raw=raw&&typeof raw==='object'?raw:{};return{version:1,completed:[...new Set(Array.isArray(raw.completed)?raw.completed:[])].filter(id=>ids.has(id)),seen:[...new Set(Array.isArray(raw.seen)?raw.seen:[])].filter(id=>rules.has(id)),current:ids.has(raw.current)?raw.current:list[0].id};}
 function complete(raw,id,assisted=false){const p=normalize(raw);if(!assisted&&ids.has(id)&&!p.completed.includes(id))p.completed.push(id);return p;}
 function following(id){const i=list.findIndex(s=>s.id===id);return i>=0?list[i+1]||null:null;}
 return{id,title,description,storageKey,stages:list,normalize,complete,following};
}
const reference=chapter('reference','Große Referenzrunde','Sechs Referenzrätsel zum Vergleichen von Schlüssel, Klammern und Doppeltransport. Ihre großen Motive sind keine Anfangslevel.','mosaik-reference-chapter-v1',stages);
const beginning=chapter('intro','Kleine Einstiegsrätsel','Sechs kompakte Atelier-Motive: zwei Grundrätsel, Schlüssel, eine normale Zwischenrunde, Klammerpaar und Doppeltransport.','mosaik-intro-chapter-v1',intro);
const chapters=[beginning,reference],api={...reference,chapters,getChapter:id=>chapters.find(c=>c.id===id)||reference};
if(typeof module==='object'&&module.exports)module.exports=api;else root.MosaicJourney=api;
})(globalThis);
