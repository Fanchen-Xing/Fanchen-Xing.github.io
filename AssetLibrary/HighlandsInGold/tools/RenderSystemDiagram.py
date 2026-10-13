"""Portfolio architecture overview; no Unreal access."""
from pathlib import Path
import math
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[1]
S=2
im=Image.new('RGB',(1700*S,1090*S),'#efeee8');d=ImageDraw.Draw(im)
INK,MUTED,LINE,GREEN,BLUE,GOLD='#252b25','#646d62','#b8c2b3','#365641','#447b91','#a16b35'
def text(x,y,v,size=20,color=INK):
 d.multiline_text((x*S,y*S),v,font=ImageFont.truetype('C:/Windows/Fonts/msyh.ttc',size*S),fill=color,spacing=7*S)
def path(ps,color=LINE,width=2,dashed=False):
 for (a,b),(x,y) in zip(ps,ps[1:]):
  length=math.hypot(x-a,y-b)
  if dashed:
   for start in range(0,int(length),14):
    end=min(start+8,length);d.line(((a+(x-a)*start/length)*S,(b+(y-b)*start/length)*S,(a+(x-a)*end/length)*S,(b+(y-b)*end/length)*S),fill=color,width=width*S)
  else:d.line((a*S,b*S,x*S,y*S),fill=color,width=width*S)
 (a,b),(x,y)=ps[-2:];ang=math.atan2(y-b,x-a)
 d.polygon([(x*S,y*S)]+[((x-10*math.cos(ang)+k*5*math.sin(ang))*S,(y-10*math.sin(ang)-k*5*math.cos(ang))*S) for k in [-1,1]],fill=color)
def box(x,y,w,title,sub='',h=82):
 d.rounded_rectangle((x*S,y*S,(x+w)*S,(y+h)*S),radius=6*S,fill='white',outline=LINE,width=S)
 text(x+16,y+12,title,23,GREEN)
 if sub:
  size=17
  while ImageFont.truetype('C:/Windows/Fonts/msyh.ttc',size*S).getlength(sub)>(w-32)*S:size-=1
  text(x+16,y+48,sub,size,MUTED)
def panel(x,y,w,h,title,code):
 d.rounded_rectangle((x*S,y*S,(x+w)*S,(y+h)*S),radius=12*S,fill='#e5e7dd')
 text(x+28,y+22,title,30);text(x+28,y+66,code,17,MUTED)
panel(30,90,990,390,'主图','PCG_Main')
panel(30,660,990,350,'草地图','PCG_Grass')
panel(1280,90,390,390,'成簇系统','PCG_Cluster_ThreeLayer')
panel(1280,660,390,350,'村庄系统','PCG_Village')
box(60,255,145,'地形采样','Landscape')
box(255,210,210,'道路 / 河流规避','RoadMask / RiverMask')
box(515,210,180,'树林生成','ForestLayers')
box(745,210,240,'灌木生成','树木规避 · ShrubLayers')
box(255,355,210,'河岸生成','岩石 / 植物')
path([(205,296),(228,296),(228,251),(255,251)])
path([(228,296),(228,396),(255,396)])
path([(465,251),(515,251)]);path([(695,251),(745,251)])
box(745,355,240,'树灌 Mask','树木 + 灌木占用范围')
path([(865,292),(865,355)])
box(60,800,145,'地形采样','Landscape')
box(255,740,210,'空间规避','道路 / 河流 / 树灌')
box(515,740,470,'草地生成','草花分布 / 实例生成')
box(255,890,210,'沿路生成','道路距离带 / 路边细节')
path([(205,841),(228,841),(228,781),(255,781)])
path([(228,841),(228,931),(255,931)])
path([(465,781),(515,781)])
text(1308,192,'中心点 + 地表 + Palette',20,MUTED)
box(1308,244,334,'三层植物簇','核心 / 中层 / 外层')
text(1308,360,'独立制作近景生态',21,GREEN)
text(1308,400,'作为子图辅助植被生成',21,GREEN)
box(1308,786,334,'村庄生成','地块 / 道路 / 房屋 / 院落')
text(1308,883,'内部子图：Fence 围栏',18,MUTED)
box(1308,927,334,'道路 Mask','植被规避 / 沿路分布',70)
path([(1308,285),(1230,285),(1230,251),(985,251)],BLUE,3,True)
text(1045,197,'成簇子图复用',20,BLUE)
path([(865,437),(865,565),(360,565),(360,740)],BLUE,3,True)
text(430,526,'树灌占用范围 → 草地规避',23,BLUE)
path([(1308,962),(1170,962),(1170,410),(1020,410)],GOLD,3,True)
path([(1170,931),(1020,931)],GOLD,3,True)
text(1036,361,'道路 Mask',20,GOLD)
text(1036,882,'道路 Mask',20,GOLD)
text(1190,535,'道路遮罩\n联动主图\n与草地图',21,GOLD)
path([(45,1048),(105,1048)]);text(120,1032,'系统内部流程',18,MUTED)
path([(360,1048),(420,1048)],BLUE,3,True);text(435,1032,'子图复用 / 树灌遮罩',18,BLUE)
path([(780,1048),(840,1048)],GOLD,3,True);text(855,1032,'村庄道路遮罩',18,GOLD)
im.save(ROOT/'assets'/'SystemArchitecture.png')
