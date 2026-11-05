const pairStyle=document.createElement('style');pairStyle.textContent=`
#queues{position:relative}
#queues .pair-box{outline:1px solid #e9cb87;outline-offset:3px}
.pair-bracket{position:absolute;top:-22px;height:26px;pointer-events:none;overflow:visible;color:#f5d892;z-index:3}
.pair-bracket path{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.pair-bracket rect{fill:#24394a;stroke:#d6ba7c;stroke-width:1}
.pair-bracket text{fill:#f5e5bf;font:700 9px system-ui;text-anchor:middle}
`;document.head.append(pairStyle);
function presentPairQueues(){
 const g=puzzle.session,queues=D('queues'),seen=new Set();
 for(let lane=0;lane<4;lane++){
  const job=g.queues[lane][0];if(!job?.pair||seen.has(job.pair))continue;seen.add(job.pair);
  const group=g.dispatchGroup(lane);if(group.length!==2)continue;
  const buttons=group.map(i=>queues.children[i]?.querySelector('button'));if(buttons.some(b=>!b))continue;
  const parent=queues.getBoundingClientRect(),rects=buttons.map(b=>b.getBoundingClientRect()).sort((a,b)=>a.left-b.left),x1=rects[0].left+rects[0].width/2-parent.left,x2=rects[1].left+rects[1].width/2-parent.left,w=x2-x1;
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('pair-bracket');svg.setAttribute('aria-hidden','true');svg.style.left=x1+'px';svg.style.width=w+'px';svg.setAttribute('viewBox','0 0 '+w+' 26');
  svg.innerHTML='<path d="M0 24V10Q0 6 4 6H'+(w-4)+'Q'+w+' 6 '+w+' 10V24"/><rect x="'+(w/2-26)+'" y="0" width="52" height="16" rx="7"/><text x="'+w/2+'" y="11">2 Plätze</text>';queues.append(svg);
  for(const button of buttons){button.classList.add('pair-box');button.setAttribute('aria-label',button.getAttribute('aria-label')+'. Verbundenes Paar: gemeinsam wählen, zwei freie Stellplätze erforderlich.');
   if(group.includes(puzzle.hintLane))button.classList.add('hint');
   button.onclick=()=>{if(!g.canDispatch(lane)){for(const b of buttons)b.animate([{transform:'translateX(0)'},{transform:'translateX(-3px)'},{transform:'translateX(3px)'},{transform:'translateX(0)'}],{duration:230});return;}
    puzzle.dispatch(lane);notice='';renderUI();};
  }
 }
}
