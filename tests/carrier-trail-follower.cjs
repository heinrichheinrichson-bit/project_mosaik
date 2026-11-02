function carrierFollowerPose(a,distance=.90){
 const current={x:a.x,y:a.y};if(!a.rigTrail)a.rigTrail=[point(a.tile)];const last=a.rigTrail[a.rigTrail.length-1];if(!last||Math.hypot(current.x-last.x,current.y-last.y)>1e-7)a.rigTrail.push(current);if(a.rigTrail.length>80)a.rigTrail.splice(0,a.rigTrail.length-80);
 let from=current,left=distance,lastDirection=null;
 for(let i=a.rigTrail.length-2;i>=0;i--){const q=a.rigTrail[i],dx=q.x-from.x,dy=q.y-from.y,len=Math.hypot(dx,dy);if(len<1e-8)continue;lastDirection={x:dx/len,y:dy/len};if(len>=left){const body={x:from.x+dx/len*left,y:from.y+dy/len*left};return{body,heading:Math.atan2(current.y-body.y,current.x-body.x)};}left-=len;from=q;}
 const d=lastDirection||{x:0,y:1},body={x:from.x+d.x*left,y:from.y+d.y*left};return{body,heading:Math.atan2(current.y-body.y,current.x-body.x)};
}

module.exports=carrierFollowerPose;