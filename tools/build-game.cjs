const fs=require('fs'),path=require('path'),vm=require('vm'),root=path.resolve(__dirname,'..'),src=path.join(root,'editor-src'),read=f=>fs.readFileSync(path.join(src,f),'utf8'),safe=x=>JSON.stringify(x).replace(/</g,'\\u003c');
const study=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=study.match(/<style>([\s\S]*?)<\/style>/)[1];
const phone=study.match(/<main class="phone">([\s\S]*?)<\/main>/)[1];
const scripts=[read('core.js'),read('stone-renderer.js'),read('play-options.js'),read('game-transfer.js'),'const EDITOR_SEEDS='+read('seeds.json').replace(/</g,'\\u003c')+';',read('game-bootstrap.js'),read('board-cache.js'),read('play-core.js'),'const EDITOR_PLAY_SPRITES='+read('sprites.json').replace(/</g,'\\u003c')+';const ORIGINAL_PLAY_BOX='+read('play-box.json').replace(/</g,'\\u003c')+';',read('play-original-visuals.js'),read('queue-label.js'),read('play-app.js'),'const ORIGINAL_PHONE='+safe(phone)+';',read('game-shell.js'),read('game-layout.js')];
let html='<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Mosaik</title><style>'+css+'</style></head><body data-ui-design="night"><div id="workarea" hidden></div>';
for(const [i,s]of scripts.entries()){new vm.Script(s,{filename:'game-'+i});html+='<script>'+s+'</script>';}
html+='</body></html>';fs.writeFileSync(path.join(root,'game.html'),html);console.log('Game built: original phone markup/styles, shared play engine, '+Buffer.byteLength(html)+' bytes');
