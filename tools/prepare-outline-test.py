import json,base64
from pathlib import Path
from PIL import Image
src=Path(__file__).resolve().parents[1]/'assets'/'eight-color-test';root=Path(__file__).resolve().parents[1]/'assets'/'outline-test';root.mkdir(exist_ok=True)
d=json.loads((src/'art.json').read_text(encoding='utf8'))
palette=['#16191c','#128b3b','#64d832','#fff080','#fffdf4','#ffd21a','#f49a18','#ff729b']
for v in d['variants'].values():
 # The border is expressed in the actual cell data, not drawn over the mosaic.
 old=v['pixels'];n=v['size'];p=[row[:] for row in old]
 for y in range(n):
  for x in range(n):
   if old[y][x] is not None and any(nx<0 or ny<0 or nx>=n or ny>=n or old[ny][nx] is None for nx,ny in [(x-1,y),(x+1,y),(x,y-1),(x,y+1)]):p[y][x]=0
 v['pixels']=p;v['colors']=palette
 v['singletons']=sum(k is not None and not any(0<=xx<n and 0<=yy<n and p[yy][xx]==k for xx,yy in [(x-1,y),(x+1,y),(x,y-1),(x,y+1)]) for y,row in enumerate(p) for x,k in enumerate(row))
v=d['variants']['48-16'];im=Image.new('RGBA',(48,48))
for y,row in enumerate(v['pixels']):
 for x,k in enumerate(row):
  if k is not None:im.putpixel((x,y),tuple(bytes.fromhex(palette[k][1:]))+(255,))
im.resize((480,480),Image.Resampling.NEAREST).save(root/'flat-48.png')
d.update(id='frog-black-outline',name='Frosch · Schwarz & kräftig',source='data:image/png;base64,'+base64.b64encode((root/'flat-48.png').read_bytes()).decode())
(root/'art.json').write_text(json.dumps(d,separators=(',',':')),encoding='utf8')
print('Palette remapped; actual occupied boundary cells black; silhouette and stone counts preserved')
