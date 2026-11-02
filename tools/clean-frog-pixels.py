from pathlib import Path
from PIL import Image,ImageDraw
import json,base64,copy
root=Path(__file__).resolve().parents[1]/'assets'/'clean-frog-test';root.mkdir(exist_ok=True)
a=json.loads((Path(__file__).resolve().parents[1]/'assets'/'outline-test'/'art.json').read_text(encoding='utf8'));v=copy.deepcopy(a['variants']['48-16']);old=v['pixels'];p=copy.deepcopy(old);n=48
# Local noise cleanup only in the hind leg/torso greens; eyes and expression untouched.
for y in range(26,40):
 for x in range(7,24):
  k=old[y][x]
  ns=[old[yy][xx] for xx,yy in [(x-1,y),(x+1,y),(x,y-1),(x,y+1)]]
  if k==0 and all(z in [1,2] for z in ns):p[y][x]=1
  elif k in [1,2] and all(z in [1,2] for z in ns) and sum(z!=k for z in ns)>=3:p[y][x]=1 if ns.count(1)>ns.count(2) else 2
# Replace the crown only, with three connected, deliberately stepped points.
for y in range(2,16):
 for x in range(11,28):
  if y<=10 or x<=20 or (y<=12 and x<=23):p[y][x]=None
mask=Image.new('L',(48,48));dr=ImageDraw.Draw(mask);dr.polygon([(12,8),(16,10),(16,4),(20,8),(23,2),(25,3),(25,10),(28,8),(26,14),(20,16),(15,13)],fill=255)
for y in range(2,17):
 for x in range(11,29):
  if mask.getpixel((x,y)):
   # Head remains in front of the crown.
   if x>=23 and y>=11 and old[y][x] is not None:continue
   p[y][x]=6 if y>=12 else 5
# Keep the established face pixel-for-pixel, in front of the crown.
for yy in range(14,26):
 for xx in range(20,45):p[yy][xx]=old[yy][xx]
# Three broad clean feet; preserve body transitions above row 40.
for y in range(41,46):
 for x in range(4,45):p[y][x]=None
feet=[[(6,41),(12,40),(17,41),(19,43),(14,43),(13,44),(10,43),(7,43),(5,42)],[(24,41),(28,41),(30,43),(32,44),(28,44),(27,45),(24,44),(22,43)],[(34,40),(38,40),(40,41),(43,41),(44,42),(41,43),(38,43),(36,44),(33,43)]]
for shape in feet:
 m=Image.new('L',(48,48));ImageDraw.Draw(m).polygon(shape,fill=255)
 for y in range(40,46):
  for x in range(4,45):
   if m.getpixel((x,y)):p[y][x]=1 if y>=43 else 2
# One black cell along every new exterior boundary, with no renderer trick.
pre=copy.deepcopy(p)
for y in range(n):
 for x in range(n):
  if pre[y][x] is not None and any(xx<0 or yy<0 or xx>=n or yy>=n or pre[yy][xx] is None for xx,yy in [(x-1,y),(x+1,y),(x,y-1),(x,y+1)]):p[y][x]=0
v['pixels']=p;v['stones']=sum(k is not None for row in p for k in row);v['singletons']=sum(k is not None and not any(0<=xx<n and 0<=yy<n and p[yy][xx]==k for xx,yy in [(x-1,y),(x+1,y),(x,y-1),(x,y+1)]) for y,row in enumerate(p) for x,k in enumerate(row))
im=Image.new('RGBA',(48,48))
for y,row in enumerate(p):
 for x,k in enumerate(row):
  if k is not None:im.putpixel((x,y),tuple(bytes.fromhex(v['colors'][k][1:]))+(255,))
im.resize((480,480),Image.Resampling.NEAREST).save(root/'flat.png')
changes=[{'x':x,'y':y,'from':old[y][x],'to':p[y][x]} for y in range(48) for x in range(48) if old[y][x]!=p[y][x]]
a.update(id='frog-clean-pixels',name='Frosch · Pixel nachgearbeitet',fixedResolution=48,variants={f'48-{c}':v for c in [12,16,20]},source='data:image/png;base64,'+base64.b64encode((root/'flat.png').read_bytes()).decode())
(root/'art.json').write_text(json.dumps(a,separators=(',',':')),encoding='utf8');(root/'changes.json').write_text(json.dumps(changes,indent=2),encoding='utf8');print(len(changes),'cells edited;',v['stones'],'stones;',v['singletons'],'isolated color cells')

