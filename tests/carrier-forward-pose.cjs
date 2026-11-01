function carrierTransportPose(anchor,travel,cargo,turnProgress,center=null){
 const smooth=t=>t*t*(3-2*t),heading=travel+Math.PI*(1-smooth(Math.max(0,Math.min(1,turnProgress)))),lag=1-cargo/2,m=center||{x:anchor.x-Math.cos(travel)*lag,y:anchor.y-Math.sin(travel)*lag};
 return{heading,body:{x:m.x-Math.cos(heading)*cargo/2,y:m.y-Math.sin(heading)*cargo/2},cargo:{x:m.x+Math.cos(heading)*cargo/2,y:m.y+Math.sin(heading)*cargo/2},center:m};
}

module.exports=carrierTransportPose;