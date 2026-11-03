(function(){
'use strict';
const params=new URLSearchParams(location.search),preview=params.get('preview')==='s22';
let rows=params.get('rows')==='2'?2:3;
const phone=$('playPhone'),top=phone.querySelector('.top'),notes=$('playNotes');
// Navigation, title and settings are the only permanent header controls.
const back=$('gameBack'),speed=phone.querySelector('.speed');
top.prepend(back);back.textContent='‹';back.title='Zum Rätselkatalog';back.setAttribute('aria-label','Zum Rätselkatalog');
const tools=document.createElement('details');tools.id='gameTestTools';
const summary=document.createElement('summary');summary.textContent='Testbedienung';
const controls=document.createElement('div');controls.className='row';
controls.append($('playAuto'),$('playPause'),$('playReset'));
tools.append(summary,speed,controls);notes.prepend(tools);
const rowChoice=document.createElement('label');rowChoice.textContent='Sichtbare Schatullenreihen ';
const choice=document.createElement('select');choice.id='gameQueueRows';choice.innerHTML='<option value="2">2 Reihen</option><option value="3">3 Reihen</option>';rowChoice.append(choice);tools.append(rowChoice);
function setRows(n){rows=n===2?2:3;phone.dataset.queueRows=String(rows);choice.value=String(rows);}
choice.onchange=()=>setRows(Number(choice.value));setRows(rows);
const startBase=startPlay;startPlay=function(version){$('gameHome').hidden=true;document.documentElement.classList.add('game-playing');startBase(version);};playDialog.addEventListener('close',()=>{$('gameHome').hidden=false;document.documentElement.classList.remove('game-playing');});
const style=document.createElement('style');style.textContent=`
html.game-playing,html.game-playing body{overflow:hidden}#playDialog{scrollbar-width:none}
#playPhone.phone{width:100%;max-width:420px;border:0;border-radius:0;box-shadow:none;zoom:1!important}
#playPhone .top{display:grid;grid-template-columns:40px minmax(0,1fr) 40px;gap:4px;align-items:center;height:44px;padding:0 10px;margin:0;border:0}
#playPhone .top>div{min-width:0}#playPhone #playTitle{margin:0;font-size:15px;line-height:20px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}
#playPhone .kicker{display:none}#gameBack,#gameSettings{width:40px;height:40px;min-height:40px;padding:0;font-size:25px;text-align:center;color:#bdd1da}
#gameSettings{font-size:22px}#playPhone .progressline{height:4px;padding:0 16px;margin:0;border:0}#playPhone .bar{height:3px;background:#34495b}#gameCount{display:none}
#playPhone .queuearea{padding:0;margin:0}#playQueues{box-sizing:border-box;width:100%;padding:0 18px 8px;margin:0;gap:8px!important}
#playQueues .play-lane{gap:6px;justify-items:center}#playQueues button.original-box{width:60px;max-width:100%;min-height:0;margin:0;padding:0;aspect-ratio:200/180}
#playQueues button.original-box span{font-size:22px;line-height:26px;inset:42% 0 auto}#playQueues button.preview{opacity:.48}
#playPhone[data-queue-rows="2"] #playQueues .play-lane>:nth-child(n+3){display:none}
#playPhone .actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;border:0;padding:0 18px 4px;margin:0}
#playPhone .actions button{height:38px;min-height:38px;padding:4px 8px;font-size:12px;border-radius:12px;background:#24364c;border:1px solid #40586b;color:#c5d5df}
#playPhone .status{display:none}#playPhone.game-alert .status,#playPhone.game-hint .status{display:block;position:absolute;bottom:45px;left:12px;right:12px;margin:0;padding:10px;border-radius:10px;min-height:0;z-index:3;box-shadow:0 4px 18px #0004}
#playPhone .field{margin:0;padding:0}#gameTestTools{padding:12px;border:1px solid #526779;border-radius:10px;margin-bottom:18px}#gameTestTools summary{font-weight:700;margin-bottom:12px}#gameTestTools .speed{display:flex;width:max-content;margin-bottom:12px}#gameTestTools label{margin-top:12px}
`;document.head.append(style);
// Give the board 388/420 of the view, including its path margin. Keep its
// physical size independent of the number of queue rows and viewport height.
playLayout=function(){const g=playGame,pad=g.padding||0,n=Math.max(g.w,g.h),pitch=388/(n+4+2*pad),bx=(420-g.w*pitch)/2,by=8+(2+pad)*pitch+(n-g.h)*pitch/2;
return{pitch,bx,by,parkingY:by+g.h*pitch+Math.max((pad+2)*pitch+48,Math.min(playApplied.parkingGap,86))};};
globalThis.mosaicGameCanvasHeight=(parkingY,o)=>Math.ceil(parkingY+Math.max(34*o.parkingScale,31*o.boxScale,23*o.garageScale*o.garageLength)+8);
let hintMessage='',hintUntil=0;
const baseDraw=drawPlay;drawPlay=function(){baseDraw();if(Date.now()<hintUntil)$('playStatus').textContent=hintMessage;phone.classList.toggle('game-alert',!!(playGame?.error||playGame?.lost));for(const b of tools.querySelectorAll('[data-speed]'))b.classList.toggle('active',Number(b.dataset.speed)===playApplied.playback);};
const hint=$('gameHint').onclick;$('gameHint').onclick=()=>{hint();hintMessage=$('playStatus').textContent;hintUntil=Date.now()+4000;phone.classList.add('game-hint');setTimeout(()=>phone.classList.remove('game-hint'),4000);};
// There is deliberately no whole-screen zoom-to-fit. Short screens can scroll
// the controls without shrinking the mosaic and its transporters.
phone.style.zoom='';phone.style.width='';playBoardKey='';playCache=null;
if(preview){
 const id=params.get('motif')||'studio-v2-puffin';if(state.docs.some(d=>d.id===id))selectDoc(id);
 playApplied.playback=1;playDraft.playback=1;startPlay('current');playPaused=true;document.activeElement?.blur();
 window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==parent||e.data?.kind!=='mosaic-layout-study')return;
 const m=e.data;
 if(m.action==='motif'&&state.docs.some(d=>d.id===m.id)){selectDoc(m.id);startPlay('current');playPaused=true;}
 if(m.action==='start'){startPlay('current');playGame.demo=true;playPaused=false;}
 if(m.action==='pause')playPaused=m.paused===true;
 if(m.action==='reset'){startPlay('current');playPaused=true;}
 if(m.action==='speed'){playApplied.playback=[1,1.5,2,3].includes(m.speed)?m.speed:1;if(playGame)playGame.options.playback=playApplied.playback;}
 });
 parent.postMessage({kind:'mosaic-layout-ready',rows,docs:state.docs.filter(d=>!d.familyId&&d.category.startsWith('Atelier · ')).map(d=>({id:d.id,name:d.name}))},location.origin);
}
if(playGame){$('gameHome').hidden=true;document.documentElement.classList.add('game-playing');drawPlay();}
})();
