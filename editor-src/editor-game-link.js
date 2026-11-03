(function(){
const bar=document.createElement('div');bar.className='row';bar.style.marginBottom='12px';
const open=document.createElement('button');open.textContent='▷ Im Spiel öffnen';open.id='openRealGame';
const file=document.createElement('button');file.textContent='Für Spiel / APK exportieren';file.id='exportGamePuzzle';
function payload(){return MosaicGameTransfer.pack(current(),playApplied);}
open.onclick=()=>{try{MosaicGameTransfer.send(current(),playApplied);window.open('/game.html?fromEditor=1','mosaik-game');say('Aktueller Stand mit Raster, Farben, Schatullen und Einstellungen an das Spiel übergeben.');}catch(e){say('Nicht geöffnet: '+e.message,true);}};
file.onclick=()=>{try{download(slug(current().name)+'-spiel.json',JSON.stringify(payload(),null,2));say('Spielrätsel exportiert. In der APK über „Rätsel importieren“ öffnen.');}catch(e){say('Nicht exportiert: '+e.message,true);}};
bar.append(open,file);$('workarea').before(bar);
})();
