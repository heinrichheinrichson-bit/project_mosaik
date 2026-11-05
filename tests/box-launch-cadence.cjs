const assert=require('assert'),C=require('../editor-src/core.js'),Play=require('../editor-src/play-core.js');
const d=C.blank(12,12);for(let y=0;y<12;y++)for(let x=0;x<12;x++)d.pixels[y][x]=x<6?0:1;d.queues=[[{c:0,n:12}],[{c:1,n:12}],[],[]];
function game(scope='box',cap=0){const g=new Play(d,'free',{launchScope:scope,maxActive:cap,maxPerTeam:128,launchInterval:.16,startDelay:0});assert(g.dispatch(0));assert(g.dispatch(1));return g;}
let g=game();g.runStep();assert.equal(g.workers.length,2,'Both boxes start in same step');g.time=.15;g.runStep();assert.equal(g.workers.length,2);g.time=.16;g.runStep();assert.equal(g.workers.length,4,'Each box observes its own gap');
g=game('global');g.runStep();assert.equal(g.workers.length,1);g.time=.16;g.runStep();assert.equal(g.workers.length,2);
g=game('box',1);g.runStep();assert.equal(g.workers.length,1);g.time=.16;g.runStep();assert.equal(g.workers.length,1,'Global active cap respected');
g=game();g.runStep();const snapshot=g.capture();assert.equal(snapshot.teams[0].lastLaunchAt,0);assert.equal(snapshot.teams[1].lastLaunchAt,0);console.log('Independent box cadence, global comparison, total cap and saved team timestamps PASS');
