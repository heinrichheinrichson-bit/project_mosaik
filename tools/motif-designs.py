from PIL import Image,ImageDraw,ImageFont
import json, pathlib
out=pathlib.Path(__file__).resolve().parents[1]/'assets'/'motif-designs';out.mkdir(parents=True,exist_ok=True)
pal=['#101318','#fff5d9','#ffca28','#ff7336','#15cde0','#1477cf','#f65a85','#8046c8','#47cb58']
def draw(kind,n):
 im=Image.new('RGBA',(n,n));d=ImageDraw.Draw(im);s=n/40
 def box(a,c):d.rectangle(tuple(round(v*s) for v in a),fill=pal[c])
 def poly(a,c):d.polygon([(round(x*s),round(y*s)) for x,y in a],fill=pal[c])
 def ell(a,c):d.ellipse(tuple(round(v*s) for v in a),fill=pal[c])
 if kind=='ghost':
  poly([(7,31),(7,16),(9,11),(13,7),(18,5),(23,5),(28,8),(31,13),(32,19),(32,32),(28,30),(25,33),(21,30),(17,33),(13,30),(9,33)],1)
  poly([(27,10),(29,16),(29,28),(26,29),(24,26),(24,31),(27,32),(29,30),(31,31),(31,18),(29,12)],4)
  box((10,15,18,19),0);box((22,15,30,19),0);box((18,15,22,16),0);poly([(11,16),(15,16),(11,18)],1);poly([(23,16),(27,16),(23,18)],1)
  poly([(17,23),(23,23),(22,26),(19,27),(17,25)],0);box((19,25,21,26),6)
 elif kind=='rocket':
  poly([(12,27),(12,31),(15,30),(16,35),(20,32),(23,35),(25,29),(28,31),(27,25)],3);poly([(16,28),(18,32),(20,30),(22,32),(24,27)],2)
  poly([(12,18),(7,25),(7,30),(14,27),(26,27),(32,30),(32,25),(27,18)],3)
  poly([(13,26),(12,19),(13,12),(16,7),(20,3),(24,7),(27,12),(28,19),(26,27)],1)
  poly([(13,12),(16,7),(20,3),(24,7),(27,12)],6);poly([(24,13),(25,23),(23,27),(26,27),(28,19),(27,13)],4)
  ell((15,13,24,22),0);ell((17,15,22,20),5);box((17,15,19,16),4);box((14,25,25,27),0);box((16,25,23,26),5)
 elif kind=='volcano':
  poly([(4,34),(9,27),(13,17),(17,15),(23,15),(27,18),(30,27),(35,34)],7)
  poly([(13,18),(16,16),(24,16),(27,19),(25,24),(22,21),(20,26),(17,21),(14,24)],3)
  poly([(17,16),(18,12),(15,8),(17,5),(20,9),(22,4),(25,7),(23,12),(24,16)],3);poly([(19,16),(20,12),(22,10),(22,16)],2)
  poly([(6,32),(13,30),(15,27),(16,33),(23,32),(26,28),(29,32),(34,33),(35,34),(4,34)],6)
  box((13,25,15,27),0);box((24,25,26,27),0);poly([(18,29),(22,29),(21,31),(19,31)],0)
 elif kind=='toast':
  poly([(9,33),(9,18),(6,15),(6,10),(9,6),(14,4),(26,4),(31,6),(34,10),(34,15),(31,18),(31,33),(28,35),(12,35)],3)
  poly([(12,31),(12,17),(9,14),(9,11),(12,8),(16,7),(24,7),(28,9),(31,12),(30,15),(28,17),(28,31),(26,32),(14,32)],1)
  poly([(11,17),(17,17),(18,19),(22,19),(23,17),(29,17),(28,23),(24,23),(22,21),(18,21),(16,23),(12,23)],0)
  box((12,18,14,19),4);box((24,18,26,19),4);poly([(18,26),(24,26),(23,29),(20,30),(18,28)],0);box((20,28,22,29),6)
 elif kind=='moon':
  poly([(29,5),(22,5),(15,8),(10,13),(7,20),(8,27),(12,32),(19,35),(26,34),(32,30),(35,24),(29,26),(23,25),(19,21),(18,16),(20,11),(24,8)],2)
  poly([(8,24),(11,29),(17,32),(25,32),(31,28),(34,25),(32,30),(26,34),(19,35),(12,32),(8,27)],3)
  poly([(11,19),(13,21),(16,21)],0);box((12,20,16,21),0);poly([(17,26),(19,27),(22,26)],0);box((18,27,21,27),0);box((10,24,12,25),6)
  poly([(29,10),(31,14),(35,15),(31,17),(29,21),(27,17),(23,15),(27,14)],4)
 elif kind=='fish':
  poly([(28,18),(35,12),(35,27),(28,23)],3)
  ell((5,8,31,32),2);poly([(22,10),(27,13),(29,19),(28,25),(24,29),(16,31),(12,29),(22,28),(25,23),(25,17)],3)
  ell((9,12,16,20),1);ell((19,12,26,20),1);box((13,15,15,18),0);box((20,15,22,18),0)
  poly([(10,24),(15,22),(17,24),(15,27),(11,27)],3);poly([(22,24),(25,23),(27,25),(24,27)],3)
  poly([(16,24),(21,24),(20,27),(18,28),(16,26)],0);box((18,26,20,27),6)
 # Exterior outline, no extra detached dots or semitransparent colours.
 pix=im.load();mask={(x,y) for y in range(n) for x in range(n) if pix[x,y][3]}
 for x,y in mask:
  if any((x+dx,y+dy) not in mask for dx,dy in [(1,0),(-1,0),(0,1),(0,-1)]):pix[x,y]=tuple(bytes.fromhex(pal[0][1:]))+(255,)
 used=[c for c in pal if any(pix[x,y][:3]==tuple(bytes.fromhex(c[1:])) for x,y in mask)]
 rows=[[used.index('#%02x%02x%02x'%pix[x,y][:3]) if (x,y) in mask else None for x in range(n)] for y in range(n)]
 return im,used,rows
names=[('ghost','Inkognito · Frecher Geist'),('rocket','Feierabend zum Mond'),('volcano','Der kleine Hitzkopf'),('toast','Toast mit Attitüde'),('moon','Noch fünf Minuten'),('fish','Dicke Backen')]
docs=[];variants={}
for kind,name in names:
 id='new-pixel-'+kind;variants[id]={}
 for n in [32,40,48,56]:
  im,colors,pixels=draw(kind,n);v=dict(id=id,name=name,width=n,height=n,palette=colors,pixels=pixels,category='Neue klare Motive',notes='Direkt im Pixelraster gestaltet. Schwarze Kontur, flächige Palette, freier Hintergrund. Keine Dithering-Farben oder automatisch quantisierten Bildflecken.')
  variants[id][str(n)]=v
  if n==40:docs.append(v);im.resize((280,280),Image.Resampling.NEAREST).save(out/(kind+'.png'))
json.dump(docs,open(out/'seeds.json','w'),ensure_ascii=False);json.dump(variants,open(out/'variants.json','w'),ensure_ascii=False)
sheet=Image.new('RGB',(900,680),'#e4d4b7');d=ImageDraw.Draw(sheet)
for i,(kind,name) in enumerate(names):
 im=Image.open(out/(kind+'.png'));x=(i%3)*300+10;y=(i//3)*340+35;sheet.paste(im,(x,y),im);d.text((x,y-20),name,fill='#101318')
sheet.save(out/'contact.png')
