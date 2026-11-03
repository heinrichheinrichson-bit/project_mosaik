import os,pathlib,subprocess,zipfile,hashlib,json
ROOT=pathlib.Path(__file__).resolve().parents[1]; APP=ROOT/'android-test'; BUILD=APP/'build'; OUT=ROOT.parents[1]/'outputs'; SDK=pathlib.Path(os.environ.get('LOCALAPPDATA',r'C:/Users/heinr/AppData/Local'))/'Android/Sdk'; JDK=pathlib.Path(r'C:/Program Files/Android/Android Studio/jbr'); BT=SDK/'build-tools/35.0.0'; JAR=SDK/'platforms/android-35/android.jar'
for p in [BUILD,BUILD/'assets',BUILD/'classes',BUILD/'dex',BUILD/'gen',OUT]:p.mkdir(parents=True,exist_ok=True)
env={**os.environ,'JAVA_HOME':str(JDK),'PATH':str(JDK/'bin')+os.pathsep+os.environ['PATH']}
def run(args):
 r=subprocess.run([str(x) for x in args],cwd=APP,env=env,capture_output=True,text=True)
 if r.returncode:raise RuntimeError('Build failed: '+str(args[0])+'\n'+r.stdout+'\n'+r.stderr)
 if r.stdout.strip():print(r.stdout.strip(),flush=True)
html=(ROOT/'editor.html').read_text(encoding='utf8');mobile=(APP/'mobile.js').read_text(encoding='utf-8-sig');html=html.replace("g.demo?'Automatik stoppen':'▷ Automatisch testen'","g.demo?'Auto aus':'Auto'");html=html.replace('<head>','<head><script>globalThis.MOSAIK_APK=true;</script>',1).replace('</body>','<script>'+mobile+'</script></body>');(BUILD/'assets/mosaik.html').write_text(html,encoding='utf8')
run([BT/'aapt.exe','package','-f','-M',APP/'AndroidManifest.xml','-S',APP/'res','-A',BUILD/'assets','-I',JAR,'-J',BUILD/'gen','-F',BUILD/'resources.apk'])
run([JDK/'bin/javac.exe','-encoding','UTF-8','-source','8','-target','8','-bootclasspath',JAR,'-d',BUILD/'classes',APP/'src/com/mosaik/puzzletest/MainActivity.java'])
with zipfile.ZipFile(BUILD/'classes.jar','w') as z:
 for p in (BUILD/'classes').rglob('*.class'):z.write(p,p.relative_to(BUILD/'classes').as_posix())
run([JDK/'bin/java.exe','-cp',BT/'lib/d8.jar','com.android.tools.r8.D8','--min-api','26','--lib',JAR,'--output',BUILD/'dex',BUILD/'classes.jar'])
with zipfile.ZipFile(BUILD/'resources.apk') as src,zipfile.ZipFile(BUILD/'unsigned.apk','w') as dst:
 for item in src.infolist():dst.writestr(item,src.read(item.filename))
 dst.write(BUILD/'dex/classes.dex','classes.dex')
key=APP/'debug.keystore'
if not key.exists():run([JDK/'bin/keytool.exe','-genkeypair','-keystore',key,'-alias','androiddebugkey','-storepass','android','-keypass','android','-keyalg','RSA','-keysize','2048','-validity','10000','-storetype','JKS','-dname','CN=Mosaik Test,O=Mosaik,C=AT'])
run([BT/'zipalign.exe','-f','-p','4',BUILD/'unsigned.apk',BUILD/'aligned.apk'])
apk=OUT/'mosaik-test-s22-v0.1.0.apk'
run([JDK/'bin/java.exe','-jar',BT/'lib/apksigner.jar','sign','--ks',key,'--ks-key-alias','androiddebugkey','--ks-pass','pass:android','--key-pass','pass:android','--out',apk,BUILD/'aligned.apk'])
run([JDK/'bin/java.exe','-jar',BT/'lib/apksigner.jar','verify','--verbose',apk]);run([BT/'aapt.exe','dump','badging',apk]);print('APK:',apk,'bytes:',apk.stat().st_size,flush=True)
(OUT/'mosaik-test-s22-sha256.txt').write_text(hashlib.sha256(apk.read_bytes()).hexdigest()+'  '+apk.name+'\n',encoding='utf8')
