import json,base64
from pathlib import Path
from PIL import Image
from collections import Counter
root=Path(__file__).resolve().parents[1]/'assets'/'production-test'
names={'raccoon':'Donutdieb','frog':'Quak mit Krone','wizard':'Feierabendzauber','toast':'Toast im Urlaub','abstract':'Sonnenwelle'}
items=[]
for key,name in names.items():
 p=root/'sources'/f'{key}.png'
 if not p.exists():continue
 src=Image.open(p).convert('RGBA'); alpha=src.getchannel('A'); box=alpha.point(lambda v:255 if v>=32 else 0).getbbox()
 if not box:raise ValueError(f'{key}: no visible subject')
 src=src.crop(box); variants={}
 for n in [32,40,48,56]:
  side=n-4; scale=min(side/src.width,side/src.height); fit=src.resize((max(1,round(src.width*scale)),max(1,round(src.height*scale))),Image.Resampling.LANCZOS)
  tile=Image.new('RGBA',(n,n));tile.alpha_composite(fit,((n-fit.width)//2,(n-fit.height)//2)); coords=[(x,y) for y in range(n) for x in range(n) if tile.getpixel((x,y))[3]>=128]
  strip=Image.new('RGB',(len(coords),1));strip.putdata([tile.getpixel(xy)[:3] for xy in coords])
  for colors in [12,16,20]:
   q=strip.quantize(colors=colors,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.NONE); rgb=q.convert('RGB'); palette=[];pixels=[[None]*n for _ in range(n)]
   for i,(x,y) in enumerate(coords):
    col='#%02x%02x%02x'%rgb.getpixel((i,0))
    if col not in palette:palette.append(col)
    pixels[y][x]=palette.index(col)
   seen=set();singletons=0;components=0
   for x,y in coords:
    if (x,y) in seen:continue
    stack=[(x,y)];seen.add((x,y));component=[]
    while stack:
     xx,yy=stack.pop();component.append((xx,yy))
     for nx,ny in [(xx-1,yy),(xx+1,yy),(xx,yy-1),(xx,yy+1)]:
      if 0<=nx<n and 0<=ny<n and (nx,ny) not in seen and pixels[ny][nx]==pixels[yy][xx]:seen.add((nx,ny));stack.append((nx,ny))
    components+=1
    if len(component)==1:singletons+=1
   variants[f'{n}-{colors}']={'size':n,'colors':palette,'pixels':pixels,'stones':len(coords),'singletons':singletons,'components':components}
 thumb=src.copy();thumb.thumbnail((360,360));thumb.save(root/f'{key}-source-preview.png')
 items.append({'id':key,'name':name,'source':'data:image/png;base64,'+base64.b64encode((root/f'{key}-source-preview.png').read_bytes()).decode(),'variants':variants})
(root/'catalogue.json').write_text(json.dumps(items,separators=(',',':')),encoding='utf-8')
print('Prepared',len(items),'sources;',sum(len(i['variants']) for i in items),'grid/palette variants')
