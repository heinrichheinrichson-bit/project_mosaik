const fs=require('fs'),path=require('path'),vm=require('vm'),root=path.resolve(__dirname,'..'),src=path.join(root,'editor-src'),read=f=>fs.readFileSync(path.join(src,f),'utf8');
const scripts=[read('core.js'),'globalThis.MOSAIC_QUEUE_LEGACY='+read('queue-legacy-plans.json')+';',read('play-options.js'),read('board-cache.js'),read('play-core.js'),'const ORIGINAL_CATALOGUE_SEEDS='+read('seeds.json').replace(/</g,'\\u003c')+';'];
// Reuse the tested transport visuals without replacing the original screen.
const helpers=['playFollower','playVisualOffset','playEntryOffset','drawPlayLoadCue','drawPlayFrames','drawPlayKeys','playTint','playFigurePitch','playProjectedTrail','playEntryPath','playUnproject','playReturnConnector','playEntryLaneOffset','playGradient','drawPlayGarage'].map(name=>{const line=read('play-app.js').split(/\r?\n/).find(l=>l.startsWith('function '+name+'('));if(!line)throw Error(name);return line;}).join('\n');
const fields=read('play-app.js').match(/const LAB_FIELDS=([\s\S]*?);\r?\nfunction savePlayLab/)[1];
scripts.push('const EDITOR_PLAY_SPRITES='+read('sprites.json')+';const ORIGINAL_PLAY_BOX='+read('play-box.json')+';');
scripts.push(read('play-original-visuals.js'));
scripts.push('const ORIGINAL_LAB_FIELDS='+fields+';');
scripts.push(read('original-catalogue.js').replace('/* TRANSPORT_HELPERS */',helpers).replace('/* KEY_PRESENTATION */',read('key-presentation.js')).replace('/* PAIR_PRESENTATION */',read('pair-presentation.js')));
for(const [i,s]of scripts.entries())new vm.Script(s,{filename:'original-catalogue-'+i});
const start='<!-- ORIGINAL_CATALOGUE_RUNTIME_START -->',end='<!-- ORIGINAL_CATALOGUE_RUNTIME_END -->';let html=fs.readFileSync(path.join(root,'index.html'),'utf8');const a=html.indexOf(start);if(a>=0){const b=html.indexOf(end,a);if(b<0)throw Error('Unclosed catalogue block');html=html.slice(0,a)+html.slice(b+end.length);}
html=html.replace('</html>',start+scripts.map(s=>'<script>'+s+'</script>').join('\n')+end+'</html>');fs.writeFileSync(path.join(root,'index.html'),html);console.log('Full catalogue connected to existing original phone');
