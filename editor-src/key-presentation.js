const keyIcon='<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m14 14 13 13m-6-6 4-4m-1 7 4-4"/></svg>';
const lockIcon='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 15V10a7 7 0 0 1 14 0v5"/><rect x="5" y="14" width="22" height="16" rx="4"/><path d="M16 20v5"/></svg>';
const keyStyle=document.createElement('style');keyStyle.textContent=`
.queuearea:has(.key-objective){position:relative}
.key-objective{position:absolute;left:0;right:0;top:-32px;display:flex;align-items:center;justify-content:center;gap:7px;min-height:25px;margin:0;color:#f4deb0;font-size:11px;text-align:center}
.key-objective svg,.key-lock svg,.key-flight svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2.7;stroke-linecap:round;stroke-linejoin:round}
#queues .lane.key-locked{position:relative}
#queues .key-locked>.jar{filter:grayscale(.85) brightness(.65);opacity:.55!important}
.key-lock{position:absolute;inset:-7px -5px 12px;z-index:3;border:1px solid #ddbd7970;border-radius:12px;background:linear-gradient(90deg,#12233370,#172a3eaa,#12233370);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;color:#f6d68b;pointer-events:none}
.key-lock .lock-medal{display:grid;place-items:center;width:40px;height:44px;border:1px solid #f6d68b;border-radius:11px;background:linear-gradient(#40505b,#243542);box-shadow:0 3px 7px #0005}
.key-lock small{font-size:9px;line-height:1.4;text-align:center;color:#fff0ce;background:#182b3de8;padding:4px 5px;border-radius:5px}
.key-lock b{font-size:10px}.key-flight{position:fixed;z-index:9999;pointer-events:none;color:#ffe39a;background:#263b4b;border:1px solid #ffe39a;border-radius:50%;padding:7px;width:38px;height:38px;box-shadow:0 0 16px #f4cf8055;display:grid;place-items:center}
@keyframes key-open-glow{0%{outline:3px solid #ffe39a;outline-offset:5px}100%{outline:3px solid transparent;outline-offset:10px}}
#queues .lane.key-just-opened{animation:key-open-glow 1.2s ease-out;border-radius:10px}
`;document.head.append(keyStyle);
const keyViews=new WeakMap();
function presentKeyQueues(){
 const g=puzzle.session,keys=g.doc.mechanics?.keys||[],queues=D('queues');
 let objective=document.querySelector('.key-objective');
 if(!keys.length){objective?.remove();return;}
 if(!objective){objective=document.createElement('div');objective.className='key-objective';objective.setAttribute('role','status');objective.setAttribute('aria-live','polite');queues.before(objective);}
 const closed=keys.filter(k=>g.isLaneLocked(k.lane));
 objective.hidden=!closed.length;objective.style.display=closed.length?'flex':'none';
 objective.innerHTML=closed.length?keyIcon+'<span>Hole den Schlüsselstein, um die gesperrte Reihe zu öffnen.</span>':'';
 for(const k of closed){const col=queues.children[k.lane];if(!col)continue;col.classList.add('key-locked');for(const b of col.querySelectorAll('button')){b.disabled=true;b.setAttribute('aria-label','Gesperrt. Passenden Schlüsselstein im Bild abholen.');}
 const overlay=document.createElement('div');overlay.className='key-lock';overlay.innerHTML='<span class="lock-medal">'+lockIcon+'</span><small>Mit Schlüssel<br>öffnen</small>';
 if(keys.length>1){const n=document.createElement('b');n.textContent='Schlüssel '+(keys.indexOf(k)+1);overlay.append(n);}
 col.append(overlay);}
}
function animateKeyUnlocks(){
 const g=playGame,keys=g.doc.mechanics?.keys||[];
 if(!keys.length)return;
 const previous=keyViews.get(g)||[];keyViews.set(g,g.unlockedLanes.slice());
 // Undo restores the old state; it never plays an unlock animation.
 for(const k of keys){if(!g.unlockedLanes.includes(k.lane)||previous.includes(k.lane))continue;
  presentKeyQueuesAfterUnlock(k);
 }
}
function presentKeyQueuesAfterUnlock(k){
 // Rebuild from the actual state before targeting the unlocked column.
 renderUI();const lane=D('queues').children[k.lane];if(!lane)return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 lane.classList.add('key-just-opened');
 if(reduced)return;
 const point=playProject(playGame.point(playGame.key(k.x+2,k.y+2))),r=canvas.getBoundingClientRect(),target=lane.getBoundingClientRect(),scale=r.width/420;
 const flying=document.createElement('div');flying.className='key-flight';flying.innerHTML=keyIcon;flying.style.left=(r.left+point.x*scale-19)+'px';flying.style.top=(r.top+point.y*scale-19)+'px';document.body.append(flying);
 const dx=target.left+target.width/2-(r.left+point.x*scale),dy=target.top+22-(r.top+point.y*scale);
 const animation=flying.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:'translate('+dx*.5+'px,'+(dy*.5-35)+'px) scale(1.15)',opacity:1},{transform:'translate('+dx+'px,'+dy+'px) scale(.65)',opacity:0}],{duration:700,easing:'ease-in-out'});
 animation.onfinish=()=>flying.remove();animation.oncancel=()=>flying.remove();setTimeout(()=>flying.remove(),1000);
}
