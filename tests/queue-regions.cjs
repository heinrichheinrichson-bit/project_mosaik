const assert=require('assert'),C=require('../editor-src/core.js'),Play=require('../editor-src/play-core.js');
const d=C.blank(12,12);for(let y=2;y<=9;y++)for(let x=2;x<=9;x++)d.pixels[y][x]=(x===2||x===9||y===2||y===9)?0:2;for(let y=5;y<=6;y++)for(let x=5;x<=6;x++)d.pixels[y][x]=0;d.queues=C.buildQueues(d,100);const g=new Play(d,'frame',{maxPerTeam:6,startDelay:0,launchInterval:0,travelSpeed:600,pickupDuration:0});assert(g.colorRegions);
const outer=g.colorRegion(0),inside=new Set([...g.colorRegions[0].at(-1)]);assert.equal(inside.size,4);
// A manual opening can expose a later portion while the planned one remains enclosed.
g.colorRegions[0]=[inside,outer];g.regionCache=null;assert.equal(g.availableColor(0,100,true),0);assert.equal(g.availableColor(0,100),28);assert(g.targets({slot:0,c:0}).length>0);assert.equal(g.workers.length,0);assert(g.dispatchChoices().some(a=>a.job.c===0&&a.reachable>0),'Hints use actual reachability');assert(g.dispatchChoices(true).filter(a=>a.job.c===0).every(a=>a.reachable===0),'Automatic plan availability is separate');
assert(g.dispatch(g.queues.findIndex(l=>l[0]?.c===0)));for(let i=0;i<300&&g.done===0;i++)g.tick(.1);assert(g.done>0,'An idle team must collect reachable same-colour tiles outside the planned portion');
// Parallel teams must not reserve the same tile.
const targets=g.targets({slot:1,c:0}),reserved=new Set(g.workers.filter(w=>!w.picked).map(w=>w.tile));assert(targets.every(t=>!reserved.has(t.tile)));
// A genuinely sealed colour remains unavailable.
assert.equal(new Play(d,'frame').targets({slot:2,c:2}).length,0);console.log('Manual team leaves an empty field for reachable same-colour tiles despite a sealed planned portion; no double reservations PASS');
