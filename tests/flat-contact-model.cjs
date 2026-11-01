function flatContactPose(style){const half=.94*(1-style.gap/100)/2;return{half,front:.34,cargoX:.34+half,padHalfWidth:.14,zLow:.05,zHigh:.13};}
function frontContactScene(phase){
 const g=flatContactPose(stoneStyle),ease=v=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v);};let body,cargo=0,attached=false,label;
 if(phase<.28){body=-2.2+(2.2-g.cargoX)*ease(phase/.28);label='Anfahren · nur diese Seite ist frei';}
 else if(phase<.43){body=-g.cargoX;attached=true;label='Haftfläche liegt direkt an';}
 else{const pull=2.2*ease((phase-.43)/.57);cargo=-pull;body=cargo-g.cargoX;attached=true;label='Rückwärts herausziehen · fester Kontakt';}
 return{body,cargo,attached,label,g};
}

module.exports={flatContactPose,frontContactScene};