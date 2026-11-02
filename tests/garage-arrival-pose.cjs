function garageArrivalPose(progress,center,end){const p=Math.max(0,Math.min(1,progress)),q=Math.min(1,p*2),ease=q*q*(3-2*q);return{dx:(center.x-end.x)*ease,dy:32*p,clipY:center.y+4.5+.57*11,alpha:1,scale:1};}

module.exports=garageArrivalPose;