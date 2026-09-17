const TAU=Math.PI*2;
export const TOWN_ART={name:'SkyHaven',src:'./assets/town/town-facilities.png',width:1844,height:853,hero:{x:450,y:465,height:188},destinations:[{id:'forge',label:'Shop',x:290,y:393},{id:'legacy',label:'Legacy',x:930,y:282},{id:'train',label:'Training',x:940,y:570},{id:'arena',label:'Arena',x:1500,y:515}]};
export const ARENA_ART={src:'./assets/arena/arena-hall.png',width:1448,height:1086,focusX:.5,focusY:.25};
export const HERO_SCENE_ART={trainingScale:1.2,arenaScale:1.2};
export function placeSceneHero(c,x,y,scale=1){const m=c.getTransform(),sx=Math.hypot(m.a,m.b),sy=Math.hypot(m.c,m.d);c.translate(x,y);c.scale(scale*(sx&&sy?sy/sx:1),scale)}
export function townPlacement(w,h){const scale=Math.max(w/TOWN_ART.width,h/TOWN_ART.height);return {scale,x:(w-TOWN_ART.width*scale)/2,y:(h-TOWN_ART.height*scale)/2}}
let townImage=null;
function townBackground(){if(!townImage){townImage=new Image();townImage.src=new URL(TOWN_ART.src,import.meta.url).href}return townImage.complete&&townImage.naturalWidth?townImage:null}
let arenaImage=null;
function arenaBackground(){if(!arenaImage){arenaImage=new Image();arenaImage.src=new URL(ARENA_ART.src,import.meta.url).href}return arenaImage.complete&&arenaImage.naturalWidth?arenaImage:null}
export function ellipse(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fill()}
export function poly(c,points,color,stroke){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=color;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=3;c.stroke()}}
function rect(c,x,y,w,h,r,color){c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,r);c.fill()}
function cloud(c,x,y,s,a=.7){c.save();c.globalAlpha=a;ellipse(c,x,y,90*s,17*s,'#f9fff2');ellipse(c,x-35*s,y-10*s,35*s,21*s,'#f9fff2');ellipse(c,x+12*s,y-17*s,40*s,30*s,'#f9fff2');c.restore()}
function tree(c,x,y,s=1){rect(c,x-5*s,y-40*s,10*s,45*s,2,'#746e52');ellipse(c,x,y-51*s,26*s,37*s,'#367e70');ellipse(c,x-8*s,y-62*s,17*s,25*s,'#57a478');ellipse(c,x+7*s,y-53*s,13*s,22*s,'#68b985')}
function island(c,x,y,s,green='#7cbc83'){poly(c,[[x-270*s,y],[x-195*s,y+100*s],[x-120*s,y+70*s],[x-45*s,y+220*s],[x+20*s,y+160*s],[x+160*s,y+150*s],[x+245*s,y+30*s]],'#657f85');poly(c,[[x-270*s,y],[x-120*s,y+70*s],[x-45*s,y+220*s],[x-70*s,y+50*s],[x+25*s,y]],'#769497');poly(c,[[x+25*s,y],[x-45*s,y+220*s],[x+20*s,y+160*s],[x+160*s,y+150*s],[x+110*s,y]],'#4e737d');ellipse(c,x,y,275*s,87*s,'#416f67');ellipse(c,x,y-12*s,275*s,84*s,green);ellipse(c,x-35*s,y-28*s,225*s,48*s,'#9dce8f')}
function building(c,x,y,s,kind){c.save();c.translate(x,y);c.scale(s,s);ellipse(c,0,7,90,20,'#356c6944');if(kind==='arena'){ellipse(c,0,-8,91,37,'#adad91');rect(c,-80,-85,160,78,8,'#dcd5af');ellipse(c,0,-85,80,27,'#ece3bc');ellipse(c,0,-87,53,15,'#8d997e');for(let i=-65;i<=65;i+=26){rect(c,i-8,-67,16,46,8,'#607f77');rect(c,i-10,-28,20,10,2,'#eee3bc')}for(let i=-65;i<=65;i+=26)rect(c,i-9,-118,18,31,3,'#eee3bc');rect(c,-17,-51,34,45,17,'#3b686b');for(const sign of [-1,1]){rect(c,sign*99,-131,4,110,0,'#586d63');poly(c,[[sign*99,-131],[sign*99+41,-119],[sign*99,-102]],'#f08e65')}}else{rect(c,-65,-90,130,90,4,'#f2ddad');rect(c,38,-90,27,90,2,'#cbb685');poly(c,[[-82,-85],[0,-153],[82,-85]],kind==='forge'?'#365f70':'#d67558');poly(c,[[-82,-85],[0,-153],[2,-137],[-60,-85]],kind==='forge'?'#578891':'#ee9c6b');for(let i=0;i<3;i++){c.strokeStyle='#ffffff22';c.lineWidth=3;c.beginPath();c.moveTo(-56+i*16,-106-i*13);c.lineTo(54-i*16,-106-i*13);c.stroke()}rect(c,-16,-55,32,55,13,'#52777a');rect(c,-48,-61,21,28,5,'#427778');rect(c,27,-61,21,28,5,'#427778');rect(c,-49,-48,23,3,1,'#e9d298');rect(c,26,-48,23,3,1,'#e9d298');if(kind==='forge'){rect(c,36,-147,22,49,2,'#b1baa1');ellipse(c,48,-159,12,10,'#e4ecda88');ellipse(c,55,-177,17,12,'#e4ecda55');rect(c,-78,-27,44,12,3,'#477482');poly(c,[[-72,-15],[-62,-3],[-46,-3],[-41,-15]],'#294b58')}if(kind==='lodge'){rect(c,-82,-37,164,9,3,'#bb8959');rect(c,-75,-37,7,37,1,'#8f825d');rect(c,65,-37,7,37,1,'#8f825d')}}c.restore()}
export const EQUIPMENT_ART={weapon_t1:{blade:'#ccd6bf',edge:'#f6ffeb',length:65},weapon_t2:{blade:'#79cbce',edge:'#d6ffff',length:78},weapon_t3:{blade:'#ffb24f',edge:'#fff5c2',length:91},armor_t1:{base:'#3b7481',trim:'#85b5a5'},armor_t2:{base:'#668bad',trim:'#bedadf'},armor_t3:{base:'#8257a2',trim:'#ebbd69'}};
Object.assign(EQUIPMENT_ART,{weapon_t4:{blade:'#b9c9c9',edge:'#f4f1d8',length:91},weapon_t5:{blade:'#aeb5bf',edge:'#fff0bd',length:91},weapon_t6:{blade:'#c4cbdc',edge:'#fff6db',length:91},armor_t4:{base:'#155a5c',trim:'#dbc37d'},armor_t5:{base:'#681f2c',trim:'#e2a749'},armor_t6:{base:'#302c5c',trim:'#e6cc78'}});
export const IDLE_PORTRAIT_ART={
src:'./assets/hero-idle/idle.png',frameSeconds:.4,height:300,baseline:15,referenceHeight:500,
handMask:[[-18,-10],[-13,-23],[10,-23],[16,-13],[22,-3],[20,8],[14,15],[5,18],[-7,15],[-17,9],[-21,1]],
frames:[
{rect:[210,8,257,512],origin:[365,516],height:501,hand:{x:305,y:367,rotation:0,scale:1}},
{rect:[648,8,250,512],origin:[802,516],height:500,hand:{x:742,y:369,rotation:0,scale:1}},
{rect:[1066,4,262,516],origin:[1230,516],height:506,hand:{x:1166,y:367,rotation:0,scale:1}},
{rect:[210,524,262,496],origin:[371,1014],height:485,hand:{x:306,y:868,rotation:0,scale:1}},
{rect:[648,530,265,490],origin:[806,1014],height:478,hand:{x:744,y:878,rotation:0,scale:1}},
{rect:[1078,525,250,495],origin:[1234,1014],height:483,hand:{x:1172,y:872,rotation:0,scale:1}}
]};
export const HERO_WEAPON_SCALE=1.4;
export const PORTRAIT_WEAPON_ART={weapon_t2:{src:'./assets/hero-equipment/sword-a-long.png',pivot:[323,350],scale:.137,icon:[40,157,2104,391]},weapon_t3:{src:'./assets/hero-equipment/sword-b-long.png',pivot:[325,346],scale:.137,icon:[56,154,2061,386]}};
export const SHIELD_ART={shield_t2:{src:'./assets/hero-equipment/shield-a.png',icon:[62,52,763,765],back:[949,52,762,765],pivot:[1330,434]},shield_t3:{src:'./assets/hero-equipment/shield-b.png',icon:[56,38,795,788],back:[919,36,795,791],pivot:[1317,416]}};
Object.assign(PORTRAIT_WEAPON_ART,{weapon_t4:{src:'./assets/hero-equipment/sword-c-long.png',pivot:[325,347],scale:.137,icon:[62,160,2049,374]},weapon_t5:{src:'./assets/hero-equipment/sword-d-long.png',pivot:[355,351],scale:.137,icon:[29,87,2113,531]},weapon_t6:{src:'./assets/hero-equipment/sword-f-long.png',pivot:[325,347],scale:.137,icon:[61,157,2053,378]}});
Object.assign(SHIELD_ART,{shield_t4:{src:'./assets/hero-equipment/shield-c.png',icon:[36,28,809,806],back:[924,29,809,805],pivot:[1330,424]},shield_t5:{src:'./assets/hero-equipment/shield-d.png',icon:[36,28,811,807],back:[924,27,811,809],pivot:[1330,424]},shield_t6:{src:'./assets/hero-equipment/shield-f.png',icon:[49,43,794,786],back:[927,42,796,787],pivot:[1328,421]}});
export const FULL_BODY_IDLE_ART={armor_t2:{src:'./assets/hero-equipment/set-a-full.png',rect:[268,20,600,1344],origin:[590,1360],height:1336,breathSeconds:3.4,breathStretch:.018,hand:{x:409,y:949,rotation:0},handMask:[[346,914],[366,916],[394,924],[416,924],[437,914],[452,917],[466,923],[473,934],[468,947],[457,954],[447,950],[443,969],[432,981],[415,984],[401,978],[382,977],[366,968],[353,956],[345,943],[341,929]]}};
FULL_BODY_IDLE_ART.armor_t3={src:'./assets/hero-equipment/set-b-full.png',rect:[275,21,618,1395],origin:[610,1416],height:1394,breathSeconds:3.4,breathStretch:.018,hand:{x:410,y:975,rotation:0},handMask:[[347,940],[367,942],[395,950],[417,950],[438,940],[453,943],[467,949],[474,960],[469,973],[458,980],[448,976],[444,995],[433,1007],[416,1010],[402,1004],[383,1003],[367,994],[354,982],[346,969],[342,955]]};
export const FULL_BODY_ATTACK_ART={armor_t2:{src:'./assets/hero-actions/set-a-attack.png',height:568,
clips:{attack:[[null,.5],[0,.1],[1,.12],[2,.09],[3,.14],[null,.37]],raised:[[null,.35],[0,.12],[1,.75],[0,.12],[null,.4]]},
frames:[
{rect:[0,0,627,627],origin:[335,599],hand:{x:399,y:299,rotation:-1.3},handMask:[[393,280],[404,279],[412,288],[414,298],[410,309],[404,316],[397,320],[387,317],[380,310],[382,293]]},
{rect:[627,0,627,627],origin:[904,599],hand:{x:830,y:187,rotation:-3.02},handMask:[[813,170],[826,166],[837,170],[844,179],[846,190],[839,200],[831,203],[826,211],[814,210],[807,201],[807,185]]},
{rect:[0,627,627,627],origin:[333,1221],hand:{x:466,y:948,rotation:0},handMask:[[446,930],[467,926],[480,929],[486,939],[486,952],[479,959],[471,960],[465,968],[455,972],[446,967],[439,958],[439,944]]},
{rect:[627,627,627,627],origin:[904,1221],hand:{x:896,y:1000,rotation:0},handMask:[[880,980],[895,978],[905,981],[914,989],[919,1000],[916,1009],[909,1012],[904,1018],[894,1022],[885,1018],[877,1010],[871,999],[873,988]]}
]}};
FULL_BODY_ATTACK_ART.armor_t3={src:'./assets/hero-actions/set-b-attack.png',height:568,clips:FULL_BODY_ATTACK_ART.armor_t2.clips,frames:FULL_BODY_ATTACK_ART.armor_t2.frames.map(frame=>({...frame,origin:[frame.origin[0],frame.origin[1]+2]}))};
export const FULL_BODY_JUMP_ART={armor_t2:{
sources:['./assets/hero-actions/set-a-jump-ground.png','./assets/hero-actions/set-a-jump-keyposes.png'],
preview:[['standing',.35,0,0],['crouch',.12,0,0],['airborne',.3,0,1],['airborne',.48,1,1],['strike',.18,1,0],['landing',.24,0,0],['standing',.53,0,0]],
frames:{
crouch:{src:'./assets/hero-actions/set-a-jump-ground.png',height:600,rect:[0,0,512,512],origin:[256,506],hand:{x:136,y:357,rotation:0},handMask:[[117,338],[130,336],[145,342],[158,350],[161,360],[155,369],[145,374],[132,377],[118,369],[110,357],[109,348]]},
airborne:{src:'./assets/hero-actions/set-a-jump-keyposes.png',height:960,rect:[0,0,887,887],origin:[530,925],hand:{x:430,y:236,rotation:2.3},handMask:[[414,207],[429,203],[443,209],[453,220],[461,233],[460,244],[451,254],[442,266],[428,271],[414,266],[406,258],[400,245],[400,232],[405,219]]},
strike:{src:'./assets/hero-actions/set-a-jump-keyposes.png',height:960,rect:[887,0,887,887],origin:[1285,970],hand:{x:1506,y:692,rotation:.1},handMask:[[1465,657],[1481,650],[1503,653],[1528,662],[1543,677],[1546,696],[1538,712],[1525,720],[1512,725],[1497,727],[1484,722],[1472,711],[1462,697],[1456,681]]},
landing:{src:'./assets/hero-actions/set-a-jump-ground.png',height:600,rect:[1024,512,512,512],origin:[1281,983],hand:{x:1186,y:846,rotation:0},handMask:[[1171,829],[1182,830],[1196,836],[1207,844],[1210,852],[1201,862],[1190,869],[1177,866],[1163,856],[1160,846],[1164,835]]}
}}};
FULL_BODY_JUMP_ART.armor_t3={
src:'./assets/hero-actions/set-b-jump-land.png',sources:['./assets/hero-actions/set-b-jump-land.png'],preview:FULL_BODY_JUMP_ART.armor_t2.preview,
frames:{
crouch:{height:690,rect:[27,282,381,493],origin:[218,772],hand:{x:64,y:610,rotation:0},handMask:[[37,589],[53,585],[68,590],[82,600],[94,612],[91,625],[79,636],[65,640],[49,633],[36,623],[29,609],[31,597]]},
airborne:{height:770,rect:[469,124,383,668],clip:[[469,124],[850,124],[850,450],[800,450],[800,792],[469,792]],origin:[635,852],hand:{x:562,y:307,rotation:2.3},handMask:[[548,285],[561,280],[574,286],[585,296],[592,308],[589,321],[578,329],[564,334],[550,329],[541,319],[538,305],[541,291]]},
strike:{height:770,rect:[811,272,551,519],clip:[[900,272],[1362,272],[1362,791],[811,791],[811,450],[900,450]],origin:[1045,865],hand:{x:1199,y:657,rotation:.1},handMask:[[1175,629],[1191,625],[1210,632],[1227,642],[1236,657],[1233,673],[1221,684],[1208,689],[1193,687],[1178,677],[1167,663],[1166,647]]},
landing:{height:680,rect:[1404,246,329,538],origin:[1557,780],hand:{x:1449,y:624,rotation:0},handMask:[[1430,607],[1443,604],[1458,609],[1471,620],[1476,633],[1469,645],[1457,651],[1444,648],[1431,641],[1420,631],[1417,618],[1421,609]]}
}};
FULL_BODY_IDLE_ART.armor_t2.farHand={x:752,y:938,rotation:0};
FULL_BODY_IDLE_ART.armor_t3.farHand={x:780,y:960,rotation:0};
for(const id of ['armor_t2','armor_t3'])FULL_BODY_ATTACK_ART[id].frames=FULL_BODY_ATTACK_ART[id].frames.map((frame,i)=>({...frame,farHand:[{x:409,y:417,rotation:0},{x:978,y:418,rotation:0},{x:406,y:1039,rotation:0},{x:979,y:1044,rotation:0}][i]}));
for(const [id,hands] of Object.entries({armor_t2:{crouch:[397,309,-.35],airborne:[651,613,0],strike:[1175,566,.3],landing:[1366,852,0]},armor_t3:{crouch:[373,552,-.35],airborne:[690,556,0],strike:[1017,567,.3],landing:[1660,625,0]}}))for(const [name,[x,y,rotation]] of Object.entries(hands))FULL_BODY_JUMP_ART[id].frames[name].farHand={x,y,rotation};
FULL_BODY_IDLE_ART.armor_t4={src:'./assets/hero-equipment/set-c-full.png',rect:[264,12,644,1414],origin:[612,1423],height:1407,breathSeconds:3.4,breathStretch:.018,hand:{x:410,y:971,rotation:0},farHand:{x:784,y:956,rotation:0},handMask:[[346,931],[364,931],[388,943],[412,947],[437,932],[451,936],[467,946],[472,960],[463,975],[451,977],[445,990],[432,1000],[413,1002],[399,995],[381,996],[367,987],[355,975],[346,958],[341,944]]};
FULL_BODY_IDLE_ART.armor_t5={src:'./assets/hero-equipment/set-d-full.png',rect:[265,12,647,1423],origin:[614,1432],height:1416,breathSeconds:3.4,breathStretch:.018,hand:{x:413,y:978,rotation:0},farHand:{x:788,y:963,rotation:0},handMask:[[349,938],[367,938],[391,950],[415,954],[440,939],[454,943],[470,953],[475,967],[466,982],[454,984],[448,997],[435,1007],[416,1009],[402,1002],[384,1003],[370,994],[358,982],[349,965],[344,951]]};
FULL_BODY_IDLE_ART.armor_t6={src:'./assets/hero-equipment/set-f-full.png',rect:[275,19,639,1416],origin:[620,1432],height:1410,breathSeconds:3.4,breathStretch:.018,hand:{x:416,y:1004,rotation:0},farHand:{x:799,y:989,rotation:0},handMask:[[352,964],[370,964],[394,976],[418,980],[443,965],[457,969],[473,979],[478,993],[469,1008],[457,1010],[451,1023],[438,1033],[419,1035],[405,1028],[387,1029],[373,1020],[361,1008],[352,991],[347,977]]};
const newAttackSets={
armor_t4:{set:'c',height:573,origins:[[337,603],[911,603],[337,1226],[912,1226]],offsets:[[0,0],[0,1],[0,-3],[-1,3]],farHands:[[409,417],[980,417],[408,1040],[982,1040]]},
armor_t5:{set:'d',height:576,origins:[[337,605],[912,605],[337,1227],[913,1227]],offsets:[[0,0],[0,1],[3,-3],[1,3]],farHands:[[410,417],[981,418],[409,1041],[984,1040]]},
armor_t6:{set:'f',height:572,origins:[[336,602],[934,602],[335,1223],[934,1223]],offsets:[[-2,0],[22,1],[-2,-2],[22,2]],farHands:[[409,417],[1003,417],[407,1040],[1004,1040]]}
};
for(const [id,spec] of Object.entries(newAttackSets))FULL_BODY_ATTACK_ART[id]={src:`./assets/hero-actions/set-${spec.set}-attack.png`,height:spec.height,clips:FULL_BODY_ATTACK_ART.armor_t2.clips,frames:FULL_BODY_ATTACK_ART.armor_t2.frames.map((frame,i)=>{const [dx,dy]=spec.offsets[i],[x,y]=spec.farHands[i];return {...frame,origin:spec.origins[i],hand:{...frame.hand,x:frame.hand.x+dx,y:frame.hand.y+dy},handMask:frame.handMask.map(([px,py])=>[px+dx,py+dy]),farHand:{x,y,rotation:0}}})};
const newJumpSets={
armor_t4:{set:'c',bounds:{crouch:[27,283,377,490],airborne:[468,125,380,668],strike:[811,273,550,515],landing:[1405,244,328,540]},origins:{crouch:[218,771],airborne:[637,852],strike:[1045,865],landing:[1558,780]},offsets:{crouch:[0,4],airborne:[0,0],strike:[0,0],landing:[0,0]},farHands:{crouch:[369,550,-.35],airborne:[690,556,0],strike:[1017,567,.3],landing:[1666,629,0]}},
armor_t5:{set:'d',bounds:{crouch:[20,281,383,495],airborne:[466,122,380,672],strike:[806,273,556,515],landing:[1405,244,336,541]},origins:{crouch:[212,774],airborne:[635,852],strike:[1045,865],landing:[1560,783]},offsets:{crouch:[-6,4],airborne:[-1,-1],strike:[5,-1],landing:[1,0]},farHands:{crouch:[364,550,-.35],airborne:[689,555,0],strike:[1017,567,.3],landing:[1671,629,0]}},
armor_t6:{set:'f',bounds:{crouch:[28,283,379,489],airborne:[468,123,380,670],strike:[808,273,553,515],landing:[1405,244,327,538]},origins:{crouch:[218,770],airborne:[637,852],strike:[1045,865],landing:[1557,780]},offsets:{crouch:[0,4],airborne:[1,0],strike:[-1,1],landing:[-1,0]},farHands:{crouch:[370,550,-.35],airborne:[690,556,0],strike:[1017,567,.3],landing:[1665,629,0]}}
};
for(const [id,spec] of Object.entries(newJumpSets)){const src=`./assets/hero-actions/set-${spec.set}-jump-land.png`;FULL_BODY_JUMP_ART[id]={src,sources:[src],preview:FULL_BODY_JUMP_ART.armor_t2.preview,frames:Object.fromEntries(Object.entries(FULL_BODY_JUMP_ART.armor_t3.frames).map(([name,frame])=>{const [dx,dy]=spec.offsets[name],[x,y,rotation]=spec.farHands[name];return [name,{...frame,rect:spec.bounds[name],origin:spec.origins[name],hand:{...frame.hand,x:frame.hand.x+dx,y:frame.hand.y+dy},handMask:frame.handMask.map(([px,py])=>[px+dx,py+dy]),farHand:{x,y,rotation}}]}))}}
export const MODULAR_EQUIPMENT_ART={
armor_t2:{src:'./assets/hero-equipment/set-a-armor.png',bottomsSrc:'./assets/hero-equipment/set-a-bottoms.png',joint:'#62564e',icon:[504,124,391,453],parts:{
torso:{rect:[504,124,391,453],pivot:[710,543],scale:.35,clip:[[630,124],[818,124],[814,190],[824,249],[853,286],[895,286],[895,577],[504,577],[504,197],[536,197],[548,201],[573,213],[594,237],[614,262],[642,270],[665,257],[677,242],[669,217],[646,184],[618,169]]},
nearSleeve:{rect:[137,536,247,285],pivot:[283,596],tip:[208,773]},
farSleeve:{rect:[140,885,244,278],pivot:[223,947],tip:[290,1122]},
pelvis:{sheet:'armorBottoms',rect:[63,958,358,207],pivot:[247,1000],scale:.31,clip:[[63,958],[421,958],[421,1070],[275,1110],[217,1102],[63,1063]]},
nearThigh:{sheet:'armorBottoms',rect:[142,106,240,345],pivot:[258,143],tip:[269,412]},
nearShin:{sheet:'armorBottoms',rect:[568,113,169,355],pivot:[655,145],tip:[655,437]},
nearFoot:{sheet:'armorBottoms',rect:[918,312,238,171],pivot:[982,344],scale:.3},
farThigh:{sheet:'armorBottoms',rect:[122,550,233,309],pivot:[267,580],tip:[202,820]},
farShin:{sheet:'armorBottoms',rect:[543,550,222,327],pivot:[610,584],tip:[695,844]},
farFoot:{sheet:'armorBottoms',rect:[921,732,258,160],pivot:[983,764],scale:.28}
}},
armor_t3:{src:'./assets/hero-equipment/set-b-armor.png',bottomsSrc:'./assets/hero-equipment/set-b-bottoms.png',joint:'#333e59',icon:[480,117,435,500],parts:{
torso:{rect:[480,117,435,500],pivot:[699,569],scale:.325},
nearSleeve:{rect:[162,509,234,281],pivot:[296,573],tip:[235,747]},
farSleeve:{rect:[162,892,244,279],pivot:[243,959],tip:[317,1130]},
pelvis:{sheet:'armorBottoms',rect:[63,963,371,229],pivot:[247,1007],scale:.3,clip:[[63,963],[434,963],[434,1087],[275,1130],[217,1122],[63,1080]]},
nearThigh:{sheet:'armorBottoms',rect:[107,97,270,375],pivot:[257,138],tip:[268,434]},
nearShin:{sheet:'armorBottoms',rect:[571,98,194,388],pivot:[669,139],tip:[680,458]},
nearFoot:{sheet:'armorBottoms',rect:[930,318,268,192],pivot:[993,351],scale:.275},
farThigh:{sheet:'armorBottoms',rect:[123,551,260,335],pivot:[270,584],tip:[214,852]},
farShin:{sheet:'armorBottoms',rect:[551,551,248,366],pivot:[621,585],tip:[725,883]},
farFoot:{sheet:'armorBottoms',rect:[931,745,280,179],pivot:[997,780],scale:.26}
}}
};
const rigStanding={hipX:0,hipY:0,lean:0,head:0,nearArm:-.15,nearForearm:.14,nearWrist:0,farArm:.15,farForearm:-.04,farWrist:0,nearFootX:-30,nearFootY:153,nearFootAngle:0,farFootX:39,farFootY:145,farFootAngle:0};
export const RIG_HERO_ART={
sources:{upper:'./assets/hero-rig/upper.png',lower:'./assets/hero-rig/lower.png',identity:'./assets/hero-equipment/set-a-full.png'},
directedAngles:['nearArm','nearForearm','nearWrist','farArm','farForearm','farWrist'],
view:{width:620,height:630},
body:{floor:192,torsoScale:.45,pelvisScale:.34,headScale:.58,neck:[0,-140],neckAttachment:[1.8,-120.6],
near:{hip:[-28,18],shoulder:[-42,-107],upperArm:56,forearm:56,thigh:70,shin:68,handScale:.26,footScale:.3,weaponRotation:-.04},
far:{hip:[28,15],shoulder:[43,-100],upperArm:53,forearm:52,thigh:68,shin:65,handScale:.23,footScale:.28}},
parts:{
head:{sheet:'identity',rect:[268,20,600,568],pivot:[603,562],scale:.34,clip:[[268,20],[868,20],[868,535],[716,535],[697,547],[673,552],[642,550],[619,543],[614,581],[594,579],[585,550],[545,535],[517,539],[482,536],[449,546],[420,538],[268,538]]},
neck:{sheet:'upper',rect:[587,105,138,121],pivot:[650,160],clip:[[604,105],[704,130],[710,176],[724,204],[678,224],[596,172]]},
torso:{sheet:'upper',rect:[505,105,285,368],pivot:[646,428]},
pelvis:{sheet:'upper',rect:[875,206,325,252],pivot:[1038,255],clip:[[875,206],[1200,206],[1200,319],[1080,347],[1000,338],[875,319]]},
nearUpperArm:{sheet:'upper',rect:[129,524,200,277],pivot:[267,579],tip:[185,762]},
nearForearm:{sheet:'upper',rect:[563,556,176,248],pivot:[610,594],tip:[692,766]},
nearHand:{sheet:'upper',rect:[976,654,150,154],pivot:[1036,679],grip:[1047,753]},
farUpperArm:{sheet:'upper',rect:[143,885,193,277],pivot:[205,934],tip:[282,1121]},
farForearm:{sheet:'upper',rect:[590,924,141,241],pivot:[630,956],tip:[680,1137]},
farHand:{sheet:'upper',rect:[974,1007,148,166],pivot:[1025,1040],grip:[1048,1118]},
nearThigh:{sheet:'lower',rect:[135,69,227,346],pivot:[270,115],tip:[197,380]},
nearShin:{sheet:'lower',rect:[560,97,159,302],pivot:[658,135],tip:[622,369]},
nearFoot:{sheet:'lower',rect:[928,238,238,177],pivot:[986,280]},
farThigh:{sheet:'lower',rect:[131,479,224,324],pivot:[220,524],tip:[291,769]},
farShin:{sheet:'lower',rect:[560,496,156,281],pivot:[616,536],tip:[665,750]},
farFoot:{sheet:'lower',rect:[930,648,200,143],pivot:[1068,678],mirror:true}
},
poses:{
standing:rigStanding,
raised:{...rigStanding,lean:-.04,head:.04,nearArm:2.0,nearForearm:4.0,nearWrist:.82,farArm:.1,farForearm:.35},
attack:{...rigStanding,hipX:14,hipY:10,lean:.22,head:-.1,nearArm:1.48,nearForearm:1.65,nearWrist:1.29,farArm:-.55,farForearm:1.1},
airborne:{...rigStanding,hipY:-75,lean:-.06,head:.04,nearArm:2.0,nearForearm:4.0,nearWrist:.82,farArm:2.0,farForearm:2.6,nearFootX:-45,nearFootY:24,nearFootAngle:-.25,farFootX:50,farFootY:14,farFootAngle:.3},
landing:{...rigStanding,hipX:-10,hipY:68,lean:.45,head:-.3,nearArm:.6,nearForearm:.95,nearWrist:.36,farArm:-.8,farForearm:1.3},
crouch:{...rigStanding,hipX:-12,hipY:38,lean:.18,head:-.1,nearArm:.1,nearForearm:.3,nearWrist:-.02,farArm:-.15,farForearm:.65},
windup:{...rigStanding,hipX:-8,hipY:9,lean:-.12,head:.1,nearArm:2.3,nearForearm:3.9,nearWrist:.86,farArm:.25,farForearm:1.05},
reach:{...rigStanding,hipY:-30,lean:.15,head:-.05,nearArm:2.0,nearForearm:4.0,nearWrist:.6,farArm:.2,farForearm:.5,nearFootX:-40,nearFootY:95,farFootX:47,farFootY:75}
},
clips:{
raised:{duration:2.4,keys:[[0,'standing'],[.4,'raised'],[.65,'raised'],[1,'standing']]},
attack:{duration:1.65,keys:[[0,'standing'],[.32,'windup'],[.44,'attack'],[.56,'attack'],[.88,'standing'],[1,'standing']]},
airborne:{duration:2.2,keys:[[0,'standing'],[.14,'crouch'],[.4,'airborne'],[.56,'airborne'],[.68,'reach'],[.79,'landing'],[1,'standing']]},
landing:{duration:2.2,keys:[[0,'standing'],[.14,'crouch'],[.4,'airborne'],[.56,'airborne'],[.68,'reach'],[.79,'landing'],[1,'standing']]}
}
};
export const ACTION_HERO_ART={
referenceHeight:500,handMask:[[-22,-12],[-15,-24],[8,-25],[21,-15],[24,-2],[20,13],[9,21],[-7,18],[-20,9],[-25,0]],
jump:{src:'./assets/hero-actions/jump-land.png',frames:[
{rect:[120,114,350,390],origin:[294,499],hand:{x:159,y:318,rotation:2.9,scale:1}},
{rect:[614,11,337,484],origin:[792,464],hand:{x:738,y:65,rotation:-1.05,scale:1}},
{rect:[1077,2,333,467],origin:[1240,445],hand:{x:1195,y:64,rotation:-1.05,scale:1}},
{rect:[109,500,343,417],origin:[285,932],hand:{x:224,y:555,rotation:-1.05,scale:1}},
{rect:[583,517,373,455],origin:[760,945],hand:{x:827,y:887,rotation:0,scale:1}},
{rect:[1033,610,417,374],origin:[1267,979],hand:{x:1280,y:953,rotation:0,scale:1}}
]},
attack:{src:'./assets/hero-actions/attack.png',windup:.24,recovery:.32,frames:[
{rect:[158,24,311,509],origin:[327,528],hand:{x:255,y:350,rotation:0,scale:1}},
{rect:[587,20,355,513],origin:[774,528],hand:{x:622,y:256,rotation:2.85,scale:1}},
{rect:[1058,19,360,513],clip:[[1058,19],[1418,19],[1418,524],[1200,524],[1200,532],[1058,532]],origin:[1228,529],hand:{x:1103,y:114,rotation:-1.05,scale:1}},
{rect:[99,533,422,456],origin:[302,984],hand:{x:490,y:777,rotation:0,scale:1}},
{rect:[547,539,441,451],origin:[755,985],hand:{x:958,y:760,rotation:0,scale:1}},
{rect:[1085,523,308,474],clip:[[1085,534],[1200,534],[1200,523],[1393,523],[1393,997],[1085,997]],origin:[1233,992],hand:{x:1185,y:829,rotation:0,scale:1}}
]}
};
const starterIdleHands=[[414,366],[856,364],[1284,358],[421,867],[856,873],[1283,869]];
const starterIdleFrames=IDLE_PORTRAIT_ART.frames.map((frame,i)=>({...frame,handMask:IDLE_PORTRAIT_ART.handMask.map(([x,y])=>[frame.hand.x+x,frame.hand.y+y]),farHand:{x:starterIdleHands[i][0],y:starterIdleHands[i][1],rotation:0}}));
FULL_BODY_IDLE_ART.armor_t1={src:IDLE_PORTRAIT_ART.src,...starterIdleFrames[0],frames:starterIdleFrames,frameSeconds:IDLE_PORTRAIT_ART.frameSeconds,breathSeconds:3.4,breathStretch:0,weaponFallback:'original'};
const starterAttackHands=[[436,334],[908,312],[1361,322],[238,747],[700,749],[1363,827]];
FULL_BODY_ATTACK_ART.armor_t1={src:ACTION_HERO_ART.attack.src,height:ACTION_HERO_ART.referenceHeight,weaponFallback:'original',defaultFrames:{raised:2,attack:4},gameFrames:[1,2,4,5],combat:{windup:[[0,1/3],[1,2/3],[2,1]],recovery:[[3,.25],[4,.5625],[5,1]]},clips:{attack:[[0,.18],[1,.16],[2,.16],[3,.12],[4,.16],[5,.18],[null,.36]],raised:[[null,.35],[1,.12],[2,.75],[1,.12],[null,.4]]},frames:ACTION_HERO_ART.attack.frames.map((frame,i)=>({...frame,handMask:ACTION_HERO_ART.handMask.map(([x,y])=>[frame.hand.x+x,frame.hand.y+y]),farHand:{x:starterAttackHands[i][0],y:starterAttackHands[i][1],rotation:0}}))};
const starterJumpNames=['crouch','takeoff','airborne','hold','strike','landing'],starterJumpHands=[[433,398],[922,261],[1382,221],[428,698],[689,753],[1373,826]];
FULL_BODY_JUMP_ART.armor_t1={src:ACTION_HERO_ART.jump.src,sources:[ACTION_HERO_ART.jump.src],weaponFallback:'original',preview:FULL_BODY_JUMP_ART.armor_t2.preview,frames:Object.fromEntries(ACTION_HERO_ART.jump.frames.map((frame,i)=>[starterJumpNames[i],{...frame,height:ACTION_HERO_ART.referenceHeight,handMask:ACTION_HERO_ART.handMask.map(([x,y])=>[frame.hand.x+x,frame.hand.y+y]),farHand:{x:starterJumpHands[i][0],y:starterJumpHands[i][1],rotation:0}}]))};
for(let tier=7;tier<=30;tier++){
const base=2+(tier-7)%5;
for(const slot of ['weapon','armor'])EQUIPMENT_ART[`${slot}_t${tier}`]=EQUIPMENT_ART[`${slot}_t${base}`];
FULL_BODY_IDLE_ART[`armor_t${tier}`]=FULL_BODY_IDLE_ART[`armor_t${base}`];
FULL_BODY_ATTACK_ART[`armor_t${tier}`]=FULL_BODY_ATTACK_ART[`armor_t${base}`];
FULL_BODY_JUMP_ART[`armor_t${tier}`]=FULL_BODY_JUMP_ART[`armor_t${base}`];
PORTRAIT_WEAPON_ART[`weapon_t${tier}`]=PORTRAIT_WEAPON_ART[`weapon_t${base}`];
SHIELD_ART[`shield_t${tier}`]=SHIELD_ART[`shield_t${base}`]
}
export const CRITICAL_ART={heroX:490,groundY:476,dummyX:900,jumpX:660,jumpHeight:132,strikeX:806,missX:650,scale:.972};
export function hero(c,x,y,s=1,equipment={},time=0,attack=0,hit=0,scarf='#63dbc4',action=null,pose=null){const a=EQUIPMENT_ART[equipment.armor]||EQUIPMENT_ART.armor_t1;const w=EQUIPMENT_ART[equipment.weapon]||EQUIPMENT_ART.weapon_t1;c.save();c.translate(x,y);c.scale(s,s);if(pose?.shadow!==false)ellipse(c,0,0,45,10,'#183c4844');c.rotate(pose?.lean||0);c.scale(pose?.stretchX||1,pose?.stretchY||1);c.translate(attack*18,Math.sin(time*3)*2);if(pose?.legs){for(const [i,angle] of pose.legs.entries()){c.save();c.translate(i?17:-15,-38);c.rotate(angle);rect(c,-9,0,18,33,6,'#293e4d');rect(c,-12,25,27,12,5,'#524e42');c.restore()}}else{if(action==='kick'&&attack>0){c.save();c.translate(-14,-36);c.rotate(attack*1.4);rect(c,-10,0,18,48,6,'#293e4d');rect(c,-17,38,27,12,5,'#524e42');c.restore()}else rect(c,-24,-38,18,33,6,'#293e4d');rect(c,8,-38,18,33,6,'#293e4d');rect(c,-29,-13,27,12,5,'#524e42');rect(c,7,-13,29,12,5,'#524e42');}poly(c,[[-23,-94],[24,-94],[30,-39],[-29,-39]],a.base,'#274c58');rect(c,-30,-85,20,24,8,a.trim);rect(c,13,-85,20,24,8,a.trim);rect(c,-26,-48,54,9,3,'#625a42');rect(c,-4,-49,12,12,2,'#e4bd6a');poly(c,[[-24,-96],[-61,-82],[-45,-69],[-67,-55],[-19,-66]],scarf);ellipse(c,-3,-117,29,33,'#bd7e55');ellipse(c,1,-120,27,31,'#f0bd83');poly(c,[[-29,-120],[-33,-143],[-17,-153],[-4,-151],[10,-158],[20,-145],[30,-139],[27,-123],[15,-136],[3,-130],[-9,-138],[-15,-115]],'#3d4350');rect(c,0,-123,5,8,2,'#203443');rect(c,18,-123,5,8,2,'#203443');c.strokeStyle='#ba7d55';c.lineWidth=2;c.beginPath();c.arc(13,-110,5,0,Math.PI);c.stroke();rect(c,-25,-99,52,13,6,scarf);c.save();c.translate(28,-76);if(action==='guard'){c.rotate(-.55);rect(c,-1,-7,14,28,6,'#edb480');rect(c,-16,9,27,13,6,'#f0bd83')}else{c.rotate(pose?.swordAngle??(-.5+attack*(action==='0'?.65:action==='1'?1.65:action==='2'?2.6:action==='kick'?.1:1.9)));rect(c,3,-10,12,34,6,'#edb480');c.save();c.translate(12,0);c.scale(HERO_WEAPON_SCALE,HERO_WEAPON_SCALE);c.translate(-12,0);rect(c,8,-51,8,50,3,'#725541');rect(c,-4,-38,32,7,2,'#dfb464');poly(c,[[8,-38],[5,-w.length-25],[12,-w.length-46],[21,-w.length-25],[17,-38]],w.blade,'#345867');poly(c,[[12,-w.length-46],[12,-40],[17,-40],[21,-w.length-25]],w.edge);c.restore()}c.restore();if(hit>0){c.globalAlpha=hit*.5;ellipse(c,0,-85,45,70,'#fff7df')}c.restore()}
export function enemy(c,x,y,s=1,type=0,t=0,hit=0){c.save();c.translate(x,y);c.scale(s,s);ellipse(c,0,0,53,11,'#16394944');const bob=Math.sin(t*4)*5;if(type%3===0){ellipse(c,0,-38+bob,48,38,'#478a79');ellipse(c,-8,-48+bob,35,29,'#80c67d');poly(c,[[-30,-62+bob],[-39,-91+bob],[-10,-68+bob]],'#e4d49b');poly(c,[[16,-67+bob],[36,-92+bob],[35,-59+bob]],'#e4d49b');ellipse(c,-17,-43+bob,7,9,'#fff5d4');ellipse(c,13,-43+bob,7,9,'#fff5d4');ellipse(c,-19,-43+bob,3,5,'#273f47');ellipse(c,11,-43+bob,3,5,'#273f47');rect(c,-10,-25+bob,15,4,2,'#365c4f')}else if(type%3===1){poly(c,[[-20,-44+bob],[-88,-74+bob],[-73,-20+bob],[-40,-27+bob]],'#666398');poly(c,[[20,-44+bob],[88,-74+bob],[73,-20+bob],[40,-27+bob]],'#666398');ellipse(c,0,-47+bob,29,42,'#ac82b0');poly(c,[[-23,-68+bob],[-28,-110+bob],[-3,-84+bob]],'#9272a5');poly(c,[[23,-68+bob],[28,-110+bob],[3,-84+bob]],'#9272a5');ellipse(c,-10,-53+bob,9,11,'#ffe2a1');ellipse(c,10,-53+bob,9,11,'#ffe2a1');ellipse(c,-12,-53+bob,3,6,'#383c61');ellipse(c,8,-53+bob,3,6,'#383c61')}else{poly(c,[[-52,-9],[-60,-64],[-28,-102],[23,-109],[59,-64],[50,-9]],'#6e8295');poly(c,[[-52,-9],[-60,-64],[-28,-102],[-7,-57],[-16,-8]],'#91a8ab');poly(c,[[-28,-102],[23,-109],[59,-64],[-7,-57]],'#b1c4b5');rect(c,-26,-56,16,8,3,'#ffdc78');rect(c,12,-56,16,8,3,'#ffdc78');poly(c,[[-9,-87],[0,-113],[12,-89],[0,-68]],'#63d6c3')}if(hit>0){c.globalAlpha=hit*.6;ellipse(c,0,-48,52,55,'#fff')}c.restore()}
export function drawWorld(c,w,h,t=0,scene='town',equipment={},drawHero=hero){
if(scene==='arena'){
const image=arenaBackground(),scale=Math.max(w/ARENA_ART.width,h/ARENA_ART.height),width=ARENA_ART.width*scale,height=ARENA_ART.height*scale;
c.save();c.fillStyle='#b69c51';c.fillRect(0,0,w,h);if(image)c.drawImage(image,(w-width)*ARENA_ART.focusX,(h-height)*ARENA_ART.focusY,width,height);c.restore();return
}
if(scene==='town'||scene==='home'){
const image=townBackground(),placement=townPlacement(w,h);
c.save();c.fillStyle='#87becb';c.fillRect(0,0,w,h);c.translate(placement.x,placement.y);c.scale(placement.scale,placement.scale);
if(image)c.drawImage(image,0,0,TOWN_ART.width,TOWN_ART.height);
if(scene==='town')drawHero(c,TOWN_ART.hero.x,TOWN_ART.hero.y,TOWN_ART.hero.height/158,equipment,t);
c.restore();return
}
c.save();c.scale(w/1400,h/700);const g=c.createLinearGradient(0,0,0,700);g.addColorStop(0,'#87becb');g.addColorStop(.65,'#cee2cb');g.addColorStop(1,'#f6e6b9');c.fillStyle=g;c.fillRect(0,0,1400,700);ellipse(c,1120,102,54,54,'#fff1bd');ellipse(c,1120,102,69,69,'#fff0bd22');for(let i=0;i<8;i++)cloud(c,((i*251+t*3)%1800)-200,85+(i%3)*74,.65+(i%3)*.35,.35);poly(c,[[0,440],[180,289],[350,403],[510,253],[770,453],[950,289],[1150,398],[1400,271],[1400,700],[0,700]],'#87b9b84b');island(c,710,607,3.4);ellipse(c,700,531,570,72,'#b2c78c');ellipse(c,700,540,480,48,'#d8cd98');for(const [x,y,s] of [[100,475,1.8],[1320,475,2],[225,420,1.2],[1180,405,1.4]])tree(c,x,y,s);if(scene==='battle'){for(let i=0;i<8;i++){rect(c,370+i*90,295,35,130,6,'#a3b4a099');rect(c,360+i*90,285,55,18,5,'#d4dabb99')}}c.restore()
}

export function trainingPartner(c,release=0,windup=0,lane=1,stick=null){
const low=!stick&&lane===2?Math.min(1,release*2):0;
c.save();
ellipse(c,1190,510,65,13,'#183c4844');
if(low>0){
c.strokeStyle='#405369';c.lineWidth=23;c.lineCap='round';c.beginPath();
c.moveTo(1165,455+low*30);c.lineTo(1155-low*10,480);c.lineTo(1164,502);
c.moveTo(1215,455+low*30);c.lineTo(1220+low*10,480);c.lineTo(1216,502);c.stroke()
}else{
rect(c,1152,455,25,52,9,'#405369');
rect(c,1203,455,25,52,9,'#405369');
}
rect(c,1145,497,38,15,6,'#60494c');
rect(c,1197,497,38,15,6,'#60494c');
c.save();c.translate(-12*low,35*low);
poly(c,[[1158,352],[1210,350],[1233,465],[1140,465]],'#945b88','#4f4664');
poly(c,[[1166,382],[1201,382],[1213,453],[1155,453]],'#e4c39c');
rect(c,1168,412,30,22,4,'#ae835f');
ellipse(c,1183,318,34,39,'#a8684e');
ellipse(c,1177,318,30,34,'#dca77b');
for(const [x,y,r] of [[1150,299,16],[1164,284,18],[1187,283,20],[1208,299,16]])ellipse(c,x,y,r,r,'#f0dec1');
rect(c,1145,302,67,10,4,'#664f6c');
ellipse(c,1159,307,11,9,'#a8dcce');
ellipse(c,1184,307,11,9,'#a8dcce');
ellipse(c,1159,323,3,4,'#3e3649');
ellipse(c,1182,323,3,4,'#3e3649');
c.strokeStyle='#774d46';c.lineWidth=3;c.beginPath();c.arc(1169,333,9,.15,2.3);c.stroke();
c.strokeStyle='#945b88';c.lineWidth=23;c.lineCap='round';c.beginPath();c.moveTo(1210,367);c.lineTo(1238,404);c.stroke();
ellipse(c,1238,405,12,12,'#dca77b');
const reach=release>0?Math.min(1,release*4):0;
const handX=stick?.handX??1140-30*reach+35*windup*(1-reach)+12*low,handY=stick?.handY??373-33*reach-38*windup*(1-reach)+95*low;
c.strokeStyle='#945b88';c.lineWidth=22;c.beginPath();c.moveTo(1155,369);c.lineTo(handX,handY);c.stroke();
ellipse(c,handX,handY,12,12,'#dca77b');
if(stick){c.strokeStyle='#654c3e';c.lineWidth=13;c.beginPath();c.moveTo(handX+18,handY);c.lineTo(stick.tipX,stick.tipY);c.stroke();c.strokeStyle='#d7ae70';c.lineWidth=7;c.stroke();ellipse(c,handX,handY,12,12,'#dca77b')}
else if(release===0){ellipse(c,handX-4,handY-11,19,18,'#f3932d');ellipse(c,handX-9,handY-17,7,6,'#ffd278')}
c.restore();
if(!stick){poly(c,[[1250,462],[1320,462],[1308,509],[1260,509]],'#bd8f5e','#886447');
for(const [x,y] of [[1265,457],[1286,451],[1306,459]]){ellipse(c,x,y,16,15,'#f3932d');ellipse(c,x-4,y-5,5,4,'#ffd278')}}
c.restore()
}

export function appearTraining(c,training,x,y,delay=.12){const p=training.entrance?.(delay)??1;c.globalAlpha*=p;c.translate(x,y+(1-p)*22);const scale=.94+.06*p;c.scale(scale,scale);c.translate(-x,-y)}
export const BLOCK_SHIELD_ART={rim:'#d9b16b',edge:'#ffe4a3',dark:'#294958',face:'#438e94',light:'#81cfbf'};
export function trainingShield(c,x,y,angle,pulse=0){
const a=BLOCK_SHIELD_ART;c.save();c.translate(x,y);c.rotate(Math.cos(angle)*Math.PI/2);c.lineJoin='round';
poly(c,[[-53,-14],[0,-30],[53,-14],[48,14],[28,34],[0,48],[-28,34],[-48,14]],a.dark);
poly(c,[[-49,-13],[0,-25],[49,-13],[44,12],[25,30],[0,43],[-25,30],[-44,12]],a.rim);
poly(c,[[-40,-7],[0,-18],[40,-7],[35,10],[21,23],[0,35],[-21,23],[-35,10]],a.face);
poly(c,[[-40,-7],[0,-18],[0,35],[-21,23],[-35,10]],a.light);
poly(c,[[0,-18],[7,-16],[7,30],[0,35]],'#c1e5c5');
poly(c,[[0,-11],[6,0],[18,4],[6,9],[0,22],[-6,9],[-18,4],[-6,0]],a.edge,a.dark);
for(const [rx,ry] of [[-43,-9],[43,-9],[0,38]]){ellipse(c,rx,ry,3,3,a.dark);ellipse(c,rx-1,ry-1,2,2,a.edge)}
c.strokeStyle=a.edge;c.lineWidth=3;c.beginPath();c.moveTo(-47,-14);c.lineTo(0,-27);c.lineTo(47,-14);c.stroke();
if(pulse>0){c.globalAlpha*=pulse*.6;poly(c,[[-49,-13],[0,-25],[49,-13],[44,12],[25,30],[0,43],[-25,30],[-44,12]],'#fffbe0')}
c.restore()
}

export function menuIllustration(c,width,height,kind){
c.clearRect(0,0,width,height);c.save();c.scale(width/300,height/240);ellipse(c,150,214,66,12,'#17374524');
if(kind.startsWith('weapon')||kind==='strength'){
const w=EQUIPMENT_ART[kind]||EQUIPMENT_ART.weapon_t1;
c.save();c.translate(136,204);c.rotate(.42);rect(c,-8,-50,16,50,4,'#745637');poly(c,[[-11,-61],[-14,-170],[0,-207],[14,-170],[11,-61]],w.blade,'#345867');poly(c,[[0,-207],[0,-61],[11,-61],[14,-170]],w.edge);rect(c,-34,-62,68,13,4,'#e9b958');ellipse(c,0,-5,12,8,'#d6a457');c.restore();
if(kind==='strength'){ellipse(c,213,169,27,26,'#e99132');ellipse(c,207,160,19,18,'#ffc052');poly(c,[[207,142],[215,130],[231,132],[218,144]],'#498c67')}
}else if(kind.startsWith('armor')){
const a=EQUIPMENT_ART[kind]||EQUIPMENT_ART.armor_t1;
poly(c,[[103,69],[126,57],[174,57],[197,69],[211,180],[174,199],[126,199],[89,180]],a.base,'#294c59');poly(c,[[103,69],[69,83],[69,114],[110,120],[124,83]],a.trim,'#294c59');poly(c,[[197,69],[231,83],[231,114],[190,120],[176,83]],a.trim,'#294c59');poly(c,[[126,57],[134,82],[166,82],[174,57]],'#173745');rect(c,97,166,106,15,4,'#5c533e');rect(c,141,164,20,20,3,'#e7bd64');poly(c,[[141,101],[163,101],[169,128],[151,145],[134,128]],a.trim);
}else if(kind==='accuracy'){
rect(c,143,134,14,79,3,'#866846');poly(c,[[119,214],[143,185],[157,185],[182,214]],'#866846');ellipse(c,150,103,62,69,'#7c6545');ellipse(c,150,100,57,63,'#efd4a0');ellipse(c,150,100,41,46,'#cd785e');ellipse(c,150,100,25,29,'#f4dfae');ellipse(c,150,100,10,12,'#668f82');c.strokeStyle='#344e59';c.lineWidth=5;c.beginPath();c.moveTo(150,101);c.lineTo(76,66);c.stroke();poly(c,[[74,67],[61,68],[62,54],[76,56]],'#65c6b5');
}else if(kind==='dodge'){
hero(c,154,212,1.05,{},0,0,0,'#63dbc4','guard',{legs:[.28,-.55],lean:-.15});c.strokeStyle='#d9f7ea';c.lineWidth=6;c.lineCap='round';for(let i=0;i<3;i++){c.beginPath();c.moveTo(52+i*5,128+i*22);c.quadraticCurveTo(77,139+i*22,103,132+i*22);c.stroke()}
}else if(kind==='block'){
poly(c,[[150,35],[218,62],[209,155],[185,192],[150,218],[115,192],[91,155],[82,62]],'#c4a064','#4c6458');poly(c,[[150,49],[203,71],[195,148],[176,179],[150,200],[124,179],[105,148],[97,71]],'#406a61');poly(c,[[150,49],[150,200],[176,179],[195,148],[203,71]],'#294e4f');poly(c,[[150,86],[161,117],[193,119],[168,139],[176,170],[150,152],[124,170],[132,139],[107,119],[139,117]],'#eac476');
}else if(kind==='crit'){
rect(c,145,117,12,97,2,'#8c7049');rect(c,76,106,148,12,5,'#8c7049');poly(c,[[120,108],[180,108],[190,177],[161,192],[117,178]],'#d4b974','#8c7953');poly(c,[[126,112],[149,116],[149,181],[121,173]],'#edd395');ellipse(c,150,79,28,29,'#ead197');poly(c,[[125,62],[115,46],[138,53],[151,38],[162,55],[183,47],[175,63]],'#bb9756');c.strokeStyle='#7d6b45';c.lineWidth=3;for(const x of [138,160]){c.beginPath();c.moveTo(x-4,73);c.lineTo(x+4,82);c.moveTo(x+4,73);c.lineTo(x-4,82);c.stroke()}poly(c,[[226,45],[232,63],[251,64],[236,76],[241,94],[226,83],[211,94],[216,76],[201,64],[220,63]],'#ffe396','#b39754');
}else if(kind==='home'){
building(c,150,207,1.05,'lodge');tree(c,44,209,.8);
}else if(kind==='gallery'){
building(c,150,208,1.15,'arena');poly(c,[[150,33],[156,49],[174,50],[160,61],[165,78],[150,68],[135,78],[140,61],[126,50],[144,49]],'#ffe39b','#ad8d4e');
}else if(kind==='tonic'){
rect(c,131,67,38,40,9,'#bccdc0');rect(c,128,59,44,20,5,'#9a7549');rect(c,110,96,80,106,20,'#81b0a3');rect(c,117,123,66,69,16,'#cf7c7b');rect(c,124,105,8,62,4,'#e9fff080');poly(c,[[150,151],[142,142],[131,145],[130,155],[150,172],[170,155],[169,145],[158,142]],'#fff1c0');
}
c.restore()
}
