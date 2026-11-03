(function(){
'use strict';
const params=new URLSearchParams(location.search),preview=params.get('preview')==='s22';
let rows=params.get('rows')==='2'?2:3;
const phone=$('playPhone'),top=phone.querySelector('.top'),notes=$('playNotes');
// Keep game actions in the compact header; no permanent bottom toolbar.
const back=$('gameBack'),speed=phone.querySelector('.speed');
top.prepend(back);back.textContent='‹';back.title='Zum Rätselkatalog';back.setAttribute('aria-label','Zum Rätselkatalog');
const headerActions=document.createElement('div');headerActions.id='gameHeaderActions';
const undo=$('playUndo'),hintButton=$('gameHint');undo.textContent='↶';undo.title='Letzte Auswahl zurücknehmen';undo.setAttribute('aria-label',undo.title);hintButton.textContent='';hintButton.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M8.5 14.5a6 6 0 1 1 7 0c-1 .7-1.5 1.4-1.5 2.5h-4c0-1.1-.5-1.8-1.5-2.5Z"/></svg>';hintButton.title='Hinweis';hintButton.setAttribute('aria-label','Hinweis');headerActions.append(undo,hintButton,$('gameSettings'));top.append(headerActions);
const tools=document.createElement('details');tools.id='gameTestTools';
const summary=document.createElement('summary');summary.textContent='Testbedienung';
const controls=document.createElement('div');controls.className='row';
controls.append($('playAuto'),$('playPause'),$('playReset'));
tools.append(summary,speed,controls);notes.prepend(tools);
const rowChoice=document.createElement('label');rowChoice.textContent='Sichtbare Schatullenreihen ';
const choice=document.createElement('select');choice.id='gameQueueRows';choice.innerHTML='<option value="2">2 Reihen</option><option value="3">3 Reihen</option>';rowChoice.append(choice);tools.append(rowChoice);
function setRows(n){rows=n===2?2:3;phone.dataset.queueRows=String(rows);choice.value=String(rows);updateRemaining();}
function updateRemaining(){if(!playGame)return;for(const [i,col]of [...$('playQueues').children].entries()){let label=col.querySelector('.queue-remaining');if(!label){label=document.createElement('small');label.className='queue-remaining';col.append(label);}const count=Math.max(0,(playGame.queues[i]?.length||0)-rows),text=count?'+'+count+' weitere':'';if(label.textContent!==text){label.textContent=text;label.setAttribute('aria-label',count+' weitere verdeckte Boxen in Spalte '+(i+1));label.title=count+' weitere Boxen';}}}
choice.onchange=()=>setRows(Number(choice.value));setRows(rows);
const startBase=startPlay;startPlay=function(version){$('gameHome').hidden=true;document.documentElement.classList.add('game-playing');startBase(version);};playDialog.addEventListener('close',()=>{$('gameHome').hidden=false;document.documentElement.classList.remove('game-playing');});
const style=document.createElement('style');style.textContent=`
html.game-playing,html.game-playing body{overflow:hidden}#playDialog{scrollbar-width:none}
#playPhone.phone{width:100%;max-width:420px;border:0;border-radius:0;box-shadow:none;zoom:1!important}
#playPhone .top{display:grid;grid-template-columns:36px minmax(0,1fr) 108px;gap:4px;align-items:center;height:44px;padding:0 10px;margin:0;border:0}
#playPhone .top>div{min-width:0}#playPhone #playTitle{margin:0;font-size:15px;line-height:20px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}
#playPhone .kicker{display:none}#gameBack,#gameSettings{width:40px;height:40px;min-height:40px;padding:0;font-size:25px;text-align:center;color:#bdd1da}
#gameHeaderActions{display:flex;align-items:center;justify-content:flex-end;gap:0}#gameHeaderActions button{width:36px;height:40px;min-height:40px;padding:0;border:0;background:transparent;color:#bdd1da;font-size:22px;border-radius:9px}#gameHeaderActions button:disabled{opacity:.25}#gameHeaderActions svg{display:block;width:21px;height:21px;margin:auto;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}#gameSettings{font-size:22px}#playPhone .progressline{height:4px;padding:0 16px;margin:0;border:0}#playPhone .bar{height:3px;background:#34495b}#gameCount{display:none}
#playPhone .queuearea{padding:0;margin:0}#playQueues{box-sizing:border-box;width:100%;padding:0 18px 8px;margin:0;gap:8px!important}
#playQueues .play-lane{gap:6px;justify-items:center}#playQueues button.original-box{width:60px;max-width:100%;min-height:0;margin:0;padding:0;aspect-ratio:200/180}
#playQueues button.original-box span{font-size:22px;line-height:26px;inset:auto;left:50%;top:55%;width:100%;transform:translate(-50%,-50%);text-align:center;pointer-events:none}#playQueues button.preview{opacity:.48}
#playPhone[data-queue-rows="2"] #playQueues .play-lane>button:nth-of-type(n+3){display:none}
#playQueues .queue-remaining{display:block;height:14px;line-height:14px;font-size:10px;font-weight:500;color:#92aabd;text-align:center;white-space:nowrap;align-self:end}
#playPhone .actions{display:none;grid-template-columns:1fr 1fr;gap:8px;border:0;padding:0 18px 4px;margin:0}
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
const baseDraw=drawPlay;drawPlay=function(){baseDraw();updateRemaining();if(Date.now()<hintUntil)$('playStatus').textContent=hintMessage;phone.classList.toggle('game-alert',!!(playGame?.error||playGame?.lost));for(const b of tools.querySelectorAll('[data-speed]'))b.classList.toggle('active',Number(b.dataset.speed)===playApplied.playback);};
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
