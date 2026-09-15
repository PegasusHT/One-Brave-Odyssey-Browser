const TAU=Math.PI*2;
export function ellipse(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fill()}
export function poly(c,points,color,stroke){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=color;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=3;c.stroke()}}
function rect(c,x,y,w,h,r,color){c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,r);c.fill()}
function cloud(c,x,y,s,a=.7){c.save();c.globalAlpha=a;ellipse(c,x,y,90*s,17*s,'#f9fff2');ellipse(c,x-35*s,y-10*s,35*s,21*s,'#f9fff2');ellipse(c,x+12*s,y-17*s,40*s,30*s,'#f9fff2');c.restore()}
function tree(c,x,y,s=1){rect(c,x-5*s,y-40*s,10*s,45*s,2,'#746e52');ellipse(c,x,y-51*s,26*s,37*s,'#367e70');ellipse(c,x-8*s,y-62*s,17*s,25*s,'#57a478');ellipse(c,x+7*s,y-53*s,13*s,22*s,'#68b985')}
function island(c,x,y,s,green='#7cbc83'){poly(c,[[x-270*s,y],[x-195*s,y+100*s],[x-120*s,y+70*s],[x-45*s,y+220*s],[x+20*s,y+160*s],[x+160*s,y+150*s],[x+245*s,y+30*s]],'#657f85');poly(c,[[x-270*s,y],[x-120*s,y+70*s],[x-45*s,y+220*s],[x-70*s,y+50*s],[x+25*s,y]],'#769497');poly(c,[[x+25*s,y],[x-45*s,y+220*s],[x+20*s,y+160*s],[x+160*s,y+150*s],[x+110*s,y]],'#4e737d');ellipse(c,x,y,275*s,87*s,'#416f67');ellipse(c,x,y-12*s,275*s,84*s,green);ellipse(c,x-35*s,y-28*s,225*s,48*s,'#9dce8f')}
function building(c,x,y,s,kind){c.save();c.translate(x,y);c.scale(s,s);ellipse(c,0,7,90,20,'#356c6944');if(kind==='arena'){ellipse(c,0,-8,91,37,'#adad91');rect(c,-80,-85,160,78,8,'#dcd5af');ellipse(c,0,-85,80,27,'#ece3bc');ellipse(c,0,-87,53,15,'#8d997e');for(let i=-65;i<=65;i+=26){rect(c,i-8,-67,16,46,8,'#607f77');rect(c,i-10,-28,20,10,2,'#eee3bc')}for(let i=-65;i<=65;i+=26)rect(c,i-9,-118,18,31,3,'#eee3bc');rect(c,-17,-51,34,45,17,'#3b686b');for(const sign of [-1,1]){rect(c,sign*99,-131,4,110,0,'#586d63');poly(c,[[sign*99,-131],[sign*99+41,-119],[sign*99,-102]],'#f08e65')}}else{rect(c,-65,-90,130,90,4,'#f2ddad');rect(c,38,-90,27,90,2,'#cbb685');poly(c,[[-82,-85],[0,-153],[82,-85]],kind==='forge'?'#365f70':'#d67558');poly(c,[[-82,-85],[0,-153],[2,-137],[-60,-85]],kind==='forge'?'#578891':'#ee9c6b');for(let i=0;i<3;i++){c.strokeStyle='#ffffff22';c.lineWidth=3;c.beginPath();c.moveTo(-56+i*16,-106-i*13);c.lineTo(54-i*16,-106-i*13);c.stroke()}rect(c,-16,-55,32,55,13,'#52777a');rect(c,-48,-61,21,28,5,'#427778');rect(c,27,-61,21,28,5,'#427778');rect(c,-49,-48,23,3,1,'#e9d298');rect(c,26,-48,23,3,1,'#e9d298');if(kind==='forge'){rect(c,36,-147,22,49,2,'#b1baa1');ellipse(c,48,-159,12,10,'#e4ecda88');ellipse(c,55,-177,17,12,'#e4ecda55');rect(c,-78,-27,44,12,3,'#477482');poly(c,[[-72,-15],[-62,-3],[-46,-3],[-41,-15]],'#294b58')}if(kind==='lodge'){rect(c,-82,-37,164,9,3,'#bb8959');rect(c,-75,-37,7,37,1,'#8f825d');rect(c,65,-37,7,37,1,'#8f825d')}}c.restore()}
export const EQUIPMENT_ART={weapon_t1:{blade:'#ccd6bf',edge:'#f6ffeb',length:65},weapon_t2:{blade:'#79cbce',edge:'#d6ffff',length:78},weapon_t3:{blade:'#ffb24f',edge:'#fff5c2',length:91},armor_t1:{base:'#3b7481',trim:'#85b5a5'},armor_t2:{base:'#668bad',trim:'#bedadf'},armor_t3:{base:'#8257a2',trim:'#ebbd69'}};
export const CRITICAL_ART={heroX:490,groundY:476,dummyX:900,jumpX:660,jumpHeight:132,strikeX:806,missX:650,scale:.972};
export function hero(c,x,y,s=1,equipment={},time=0,attack=0,hit=0,scarf='#63dbc4',action=null,pose=null){const a=EQUIPMENT_ART[equipment.armor]||EQUIPMENT_ART.armor_t1;const w=EQUIPMENT_ART[equipment.weapon]||EQUIPMENT_ART.weapon_t1;c.save();c.translate(x,y);c.scale(s,s);if(pose?.shadow!==false)ellipse(c,0,0,45,10,'#183c4844');c.rotate(pose?.lean||0);c.scale(pose?.stretchX||1,pose?.stretchY||1);c.translate(attack*18,Math.sin(time*3)*2);if(pose?.legs){for(const [i,angle] of pose.legs.entries()){c.save();c.translate(i?17:-15,-38);c.rotate(angle);rect(c,-9,0,18,33,6,'#293e4d');rect(c,-12,25,27,12,5,'#524e42');c.restore()}}else{if(action==='kick'&&attack>0){c.save();c.translate(-14,-36);c.rotate(attack*1.4);rect(c,-10,0,18,48,6,'#293e4d');rect(c,-17,38,27,12,5,'#524e42');c.restore()}else rect(c,-24,-38,18,33,6,'#293e4d');rect(c,8,-38,18,33,6,'#293e4d');rect(c,-29,-13,27,12,5,'#524e42');rect(c,7,-13,29,12,5,'#524e42');}poly(c,[[-23,-94],[24,-94],[30,-39],[-29,-39]],a.base,'#274c58');rect(c,-30,-85,20,24,8,a.trim);rect(c,13,-85,20,24,8,a.trim);rect(c,-26,-48,54,9,3,'#625a42');rect(c,-4,-49,12,12,2,'#e4bd6a');poly(c,[[-24,-96],[-61,-82],[-45,-69],[-67,-55],[-19,-66]],scarf);ellipse(c,-3,-117,29,33,'#bd7e55');ellipse(c,1,-120,27,31,'#f0bd83');poly(c,[[-29,-120],[-33,-143],[-17,-153],[-4,-151],[10,-158],[20,-145],[30,-139],[27,-123],[15,-136],[3,-130],[-9,-138],[-15,-115]],'#3d4350');rect(c,0,-123,5,8,2,'#203443');rect(c,18,-123,5,8,2,'#203443');c.strokeStyle='#ba7d55';c.lineWidth=2;c.beginPath();c.arc(13,-110,5,0,Math.PI);c.stroke();rect(c,-25,-99,52,13,6,scarf);c.save();c.translate(28,-76);if(action==='guard'){c.rotate(-.55);rect(c,-1,-7,14,28,6,'#edb480');rect(c,-16,9,27,13,6,'#f0bd83')}else{c.rotate(pose?.swordAngle??(-.5+attack*(action==='0'?.65:action==='1'?1.65:action==='2'?2.6:action==='kick'?.1:1.9)));rect(c,3,-10,12,34,6,'#edb480');rect(c,8,-51,8,50,3,'#725541');rect(c,-4,-38,32,7,2,'#dfb464');poly(c,[[8,-38],[5,-w.length-25],[12,-w.length-46],[21,-w.length-25],[17,-38]],w.blade,'#345867');poly(c,[[12,-w.length-46],[12,-40],[17,-40],[21,-w.length-25]],w.edge)}c.restore();if(hit>0){c.globalAlpha=hit*.5;ellipse(c,0,-85,45,70,'#fff7df')}c.restore()}
export function enemy(c,x,y,s=1,type=0,t=0,hit=0){c.save();c.translate(x,y);c.scale(s,s);ellipse(c,0,0,53,11,'#16394944');const bob=Math.sin(t*4)*5;if(type%3===0){ellipse(c,0,-38+bob,48,38,'#478a79');ellipse(c,-8,-48+bob,35,29,'#80c67d');poly(c,[[-30,-62+bob],[-39,-91+bob],[-10,-68+bob]],'#e4d49b');poly(c,[[16,-67+bob],[36,-92+bob],[35,-59+bob]],'#e4d49b');ellipse(c,-17,-43+bob,7,9,'#fff5d4');ellipse(c,13,-43+bob,7,9,'#fff5d4');ellipse(c,-19,-43+bob,3,5,'#273f47');ellipse(c,11,-43+bob,3,5,'#273f47');rect(c,-10,-25+bob,15,4,2,'#365c4f')}else if(type%3===1){poly(c,[[-20,-44+bob],[-88,-74+bob],[-73,-20+bob],[-40,-27+bob]],'#666398');poly(c,[[20,-44+bob],[88,-74+bob],[73,-20+bob],[40,-27+bob]],'#666398');ellipse(c,0,-47+bob,29,42,'#ac82b0');poly(c,[[-23,-68+bob],[-28,-110+bob],[-3,-84+bob]],'#9272a5');poly(c,[[23,-68+bob],[28,-110+bob],[3,-84+bob]],'#9272a5');ellipse(c,-10,-53+bob,9,11,'#ffe2a1');ellipse(c,10,-53+bob,9,11,'#ffe2a1');ellipse(c,-12,-53+bob,3,6,'#383c61');ellipse(c,8,-53+bob,3,6,'#383c61')}else{poly(c,[[-52,-9],[-60,-64],[-28,-102],[23,-109],[59,-64],[50,-9]],'#6e8295');poly(c,[[-52,-9],[-60,-64],[-28,-102],[-7,-57],[-16,-8]],'#91a8ab');poly(c,[[-28,-102],[23,-109],[59,-64],[-7,-57]],'#b1c4b5');rect(c,-26,-56,16,8,3,'#ffdc78');rect(c,12,-56,16,8,3,'#ffdc78');poly(c,[[-9,-87],[0,-113],[12,-89],[0,-68]],'#63d6c3')}if(hit>0){c.globalAlpha=hit*.6;ellipse(c,0,-48,52,55,'#fff')}c.restore()}
export function drawWorld(c,w,h,t=0,scene='town'){c.save();c.scale(w/1400,h/700);const g=c.createLinearGradient(0,0,0,700);g.addColorStop(0,'#87becb');g.addColorStop(.65,'#cee2cb');g.addColorStop(1,'#f6e6b9');c.fillStyle=g;c.fillRect(0,0,1400,700);ellipse(c,1120,102,54,54,'#fff1bd');ellipse(c,1120,102,69,69,'#fff0bd22');for(let i=0;i<8;i++)cloud(c,((i*251+t*3)%1800)-200,85+(i%3)*74,.65+(i%3)*.35,.35);poly(c,[[0,440],[180,289],[350,403],[510,253],[770,453],[950,289],[1150,398],[1400,271],[1400,700],[0,700]],'#87b9b84b');if(scene==='town'){island(c,830,354,1.65);island(c,260,309,.29,'#8dc6a0');tree(c,250,285,.8);island(c,1290,253,.38,'#8dbb98');tree(c,1280,232,.8);c.strokeStyle='#e9d4a2';c.lineWidth=28;c.lineCap='round';c.beginPath();c.moveTo(630,412);c.bezierCurveTo(705,404,700,291,785,299);c.bezierCurveTo(900,310,967,320,1045,334);c.stroke();c.beginPath();c.moveTo(770,314);c.lineTo(824,208);c.stroke();building(c,855,227,1.05,'arena');building(c,1022,361,.92,'forge');for(const [x,y,s] of [[438,350,1.3],[482,295,.9],[1054,232,1.2],[1140,335,.9],[950,432,.7],[645,242,.8],[1085,420,.8]])tree(c,x,y,s);building(c,470,354,.76,'lodge');ellipse(c,723,362,73,30,'#79945f');ellipse(c,723,358,67,26,'#decc8c');for(let i=0;i<3;i++){rect(c,680+i*42,304,7,48,2,'#8b7651');ellipse(c,684+i*42,309,18,21,'#eacf95');ellipse(c,684+i*42,309,12,15,'#cc755f');ellipse(c,684+i*42,309,6,8,'#edd9a3')}hero(c,700,276,.57,{},t);for(let i=0;i<30;i++){const x=420+(i*97)%745,y=350+(i*31)%95;ellipse(c,x,y,2.5,3,i%2?'#ffdc8b':'#fff2c9')}cloud(c,310,584,1.7,.5);cloud(c,1150,644,2,.45)}else{island(c,710,607,3.4);ellipse(c,700,531,570,72,'#b2c78c');ellipse(c,700,540,480,48,'#d8cd98');for(const [x,y,s] of [[100,475,1.8],[1320,475,2],[225,420,1.2],[1180,405,1.4]])tree(c,x,y,s);if(scene==='battle'){for(let i=0;i<8;i++){rect(c,370+i*90,295,35,130,6,'#a3b4a099');rect(c,360+i*90,285,55,18,5,'#d4dabb99')}}}c.restore()}

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
