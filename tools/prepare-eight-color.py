from PIL import Image
from pathlib import Path
from collections import Counter
import json,sys,base64
root=Path(__file__).resolve().parents[1]/'assets'/'eight-color-test'
palette=['#263346','#34834c','#6dbf55','#fff0c8','#fffdf0','#f5c44f','#bf852f','#e88493']
rgb=[tuple(bytes.fromhex(c[1:])) for c in palette]
im=Image.open(root/'source.png').convert('RGBA'); box=im.getchannel('A').point(lambda a:255 if a>=128 else 0).getbbox();im=im.crop(box)
variants={}
for n in [32,40,48,56]:
 scale=min((n-4)/im.width,(n-4)/im.height);w=max(1,round(im.width*scale*8));h=max(1,round(im.height*scale*8));large=Image.new('RGBA',(n*8,n*8));fit=im.resize((w,h),Image.Resampling.NEAREST);large.alpha_composite(fit,((n*8-w)//2,(n*8-h)//2))
 # Map BEFORE reducing the grid. Every destination cell takes a dominant exact swatch.
 pix=large.load();mapped=[];cache={}
 for y in range(n*8):
  row=[]
  for x in range(n*8):
   r,g,b,a=pix[x,y]
   if a<128:row.append(None);continue
   key=(r,g,b)
   if key not in cache:cache[key]=min(range(8),key=lambda k:sum((key[j]-rgb[k][j])**2 for j in range(3)))
   row.append(cache[key])
  mapped.append(row)
 cells=[]
 for y in range(n):
  row=[]
  for x in range(n):
   votes=Counter(mapped[y*8+dy][x*8+dx] for dy in range(8) for dx in range(8));visible=sum(v for k,v in votes.items() if k is not None)
   row.append(None if visible<32 else max((k for k in votes if k is not None),key=lambda k:votes[k]))
  cells.append(row)
 singles=0
 for y in range(n):
  for x in range(n):
   k=cells[y][x]
   if k is not None and not any(0<=xx<n and 0<=yy<n and cells[yy][xx]==k for xx,yy in [(x-1,y),(x+1,y),(x,y-1),(x,y+1)]):singles+=1
 v={'size':n,'colors':palette,'pixels':cells,'stones':sum(k is not None for row in cells for k in row),'singletons':singles,'components':None}
 for limit in [12,16,20]:variants[f'{n}-{limit}']=v
 if n==48:
  flat=Image.new('RGBA',(48,48))
  for y,row in enumerate(cells):
   for x,k in enumerate(row):
    if k is not None:flat.putpixel((x,y),rgb[k]+(255,))
  flat.resize((480,480),Image.Resampling.NEAREST).save(root/'flat-48.png')
  flat.resize((384,384),Image.Resampling.NEAREST).save(root/'source-preview.png')
item={'id':'frog-fixed-eight','name':'Froschkönig · feste Palette','fixedPalette':True,'source':'data:image/png;base64,'+base64.b64encode((root/'source-preview.png').read_bytes()).decode(),'variants':variants}
(root/'art.json').write_text(json.dumps(item,separators=(',',':')),encoding='utf-8')
print('Exact 8-color majority-cell pipeline prepared; no interpolated cell colors')
