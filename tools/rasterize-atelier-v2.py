from PIL import Image, ImageDraw, ImageFont
import numpy as np, json, pathlib, collections, shutil, sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
OUT=ROOT/'assets'/'catalogue-atelier-v2';OUT.mkdir(exist_ok=True)
SPECS=json.load(open(OUT/'specs.json',encoding='utf8'))
PREPARED={}
def prepare(source,spec):
 key=str(source)
 if key in PREPARED:return PREPARED[key]
 image=Image.open(source).convert('RGB');a=np.array(image);h,w=a.shape[:2]
 # Only flood-connected neutral white is empty. Cream inside a black contour stays visible.
 white=(a.min(axis=2)>234)&((a.max(axis=2).astype(int)-a.min(axis=2))<22)
 empty=np.zeros((h,w),bool);q=collections.deque()
 for x in range(w):
  if white[0,x]:q.append((x,0));empty[0,x]=1
  if white[h-1,x]:q.append((x,h-1));empty[h-1,x]=1
 for y in range(h):
  if white[y,0]:q.append((0,y));empty[y,0]=1
  if white[y,w-1]:q.append((w-1,y));empty[y,w-1]=1
 while q:
  x,y=q.popleft()
  for xx,yy in ((x-1,y),(x+1,y),(x,y-1),(x,y+1)):
   if 0<=xx<w and 0<=yy<h and white[yy,xx] and not empty[yy,xx]:empty[yy,xx]=1;q.append((xx,yy))
 if spec['id'] in ('teapot','ribbon'):empty|=white
 ys,xs=np.where(~empty);bbox=(xs.min(),ys.min(),xs.max()+1,ys.max()+1);x0,y0,x1,y1=bbox
 a=a[y0:y1,x0:x1];mask=(~empty[y0:y1,x0:x1]).astype('uint8')*255
 pal=np.array([[int(c[i:i+2],16) for i in (1,3,5)] for c in spec['palette']],dtype=np.float32)
 # Assign source colours before area voting; never dither or invent intermediate colours.
 flat=a.reshape(-1,3).astype(np.float32);idx=np.empty(len(flat),dtype=np.uint8)
 for start in range(0,len(flat),50000):
  dist=((flat[start:start+50000,None,:]-pal[None,:,:])**2*np.array([.9,1.2,1])).sum(axis=2);idx[start:start+50000]=dist.argmin(axis=1)
 idx=idx.reshape(a.shape[:2])
 PREPARED[key]=(a,mask,idx)
 return PREPARED[key]
def rasterize(source,spec,n):
 a,mask,idx=prepare(source,spec)
 inner=n-6;ratio=min(inner/a.shape[1],inner/a.shape[0]);rw=max(1,round(a.shape[1]*ratio));rh=max(1,round(a.shape[0]*ratio));ox=(n-rw)//2;oy=(n-rh)//2
 pal=spec['palette'];votes=[]
 for k in range(len(pal)):
  m=Image.fromarray(((idx==k)&(mask>0)).astype('uint8')*255);votes.append(np.array(m.resize((rw,rh),Image.Resampling.BOX)))
 votes=np.stack(votes,axis=2);coverage=np.array(Image.fromarray(mask).resize((rw,rh),Image.Resampling.BOX));cells=votes.argmax(axis=2).astype('int16');cells[(coverage<115)]=-1
 # The contour is the silhouette itself, not an added fringe of black pixels.
 for y in range(rh):
  for x in range(rw):
   if cells[y,x]<0:continue
   if any(xx<0 or yy<0 or xx>=rw or yy>=rh or coverage[yy,xx]<115 for xx,yy in ((x-1,y),(x+1,y),(x,y-1),(x,y+1))):cells[y,x]=0
 grid=np.full((n,n),-1,dtype='int16');grid[oy:oy+rh,ox:ox+rw]=cells
 # Remove only disconnected conversion dust, never re-shape the motif.
 seen=set()
 for y in range(n):
  for x in range(n):
   if grid[y,x]<0 or (x,y) in seen:continue
   comp=[];queue=[(x,y)];seen.add((x,y))
   for xx,yy in queue:
    comp.append((xx,yy))
    for dx,dy in ((1,0),(-1,0),(0,1),(0,-1),(1,1),(-1,-1),(1,-1),(-1,1)):
     p=(xx+dx,yy+dy)
     if 0<=p[0]<n and 0<=p[1]<n and p not in seen and grid[p[1],p[0]]>=0:seen.add(p);queue.append(p)
   if len(comp)<=2:
    for xx,yy in comp:grid[yy,xx]=-1
 return dict(id='studio-v2-'+spec['id'],name=spec['name'],width=n,height=n,palette=spec['palette'],pixels=[[None if k<0 else int(k) for k in row] for row in grid],category='Atelier · '+spec['cat'],notes='Neue Motivserie · begrenzte feste Palette, schwarzer Umriss, freier Hintergrund. Die Rastervarianten sind getrennt bearbeitbar. Quelle: neue Atelier-II-Serie; eigens erstellte Pixelart; in Spielsteine übertragen. Status: zur gemeinsamen Auswahl.',status='draft')
def preview(doc,pitch=7):
 n=doc['width'];im=Image.new('RGB',(n*pitch,n*pitch),'#e4d4b7');d=ImageDraw.Draw(im)
 for y,row in enumerate(doc['pixels']):
  for x,k in enumerate(row):
   if k is not None:d.rectangle((x*pitch,y*pitch,(x+1)*pitch-1,(y+1)*pitch-1),fill=doc['palette'][k])
 return im
if __name__=='__main__':
 variants={};docs=[];found=[]
 previous=json.load(open(OUT/'variants.json',encoding='utf8')) if len(sys.argv)>1 and (OUT/'variants.json').exists() else {}
 for spec in SPECS:
  source=OUT/(spec['id']+'-source.png')
  if not source.exists():continue
  family='studio-v2-'+spec['id'];variants[family]={}
  if len(sys.argv)>1 and spec['id'] not in sys.argv[1:] and family in previous:variants[family]=previous[family]
  else:
   for n in [32,40,48,56,64]:variants[family][str(n)]=rasterize(source,spec,n)
  doc=variants[family]['56'];docs.append(doc);preview(doc).save(OUT/(spec['id']+'-56.png'));found.append(spec)
 json.dump(docs,open(OUT/'seeds.json','w',encoding='utf8'),ensure_ascii=False);json.dump(variants,open(OUT/'variants.json','w',encoding='utf8'),ensure_ascii=False)
 cols=4;rows=(len(docs)+cols-1)//cols;sheet=Image.new('RGB',(cols*310,rows*350),'#e4d4b7');d=ImageDraw.Draw(sheet)
 try:font=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf',17)
 except:font=ImageFont.load_default()
 for i,doc in enumerate(docs):
  x=(i%cols)*310+10;y=(i//cols)*350+35;sheet.paste(preview(doc,5),(x,y));d.text((x,y-26),doc['name'],font=font,fill='#101318');d.text((x,y+286),str(len(doc['palette']))+' Farben · 56 × 56',font=font,fill='#384550')
 if docs:sheet.save(OUT/'catalogue-flat.png')
 print(len(docs),'new raster motifs,',sum(len(v) for v in variants.values()),'variants')
