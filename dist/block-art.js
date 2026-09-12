import {BLOCK_RULES} from './core.js';
import {hero,ellipse,poly,appearTraining,trainingShield} from './art.js';

function orange(c,x,y,rotation=0){
c.save();c.translate(x,y);c.rotate(rotation);
ellipse(c,1,3,19,18,'#a95a2633');ellipse(c,0,0,18,17,'#df7528');ellipse(c,-3,-3,14,13,'#f8a13b');ellipse(c,-7,-7,5,4,'#ffe2a0');
poly(c,[[0,-14],[4,-25],[15,-21],[7,-14]],'#387b57');c.restore()
}
function star(c,x,y,size=1,rotation=0){
c.save();c.translate(x,y);c.rotate(rotation);c.scale(size,size);
poly(c,[[0,-22],[6,-7],[22,-7],[10,4],[14,21],[0,12],[-14,21],[-10,4],[-22,-7],[-6,-7]],'#ffd46c','#a47637');
poly(c,[[0,-18],[0,1],[-17,-5],[-5,-5]],'#fff6c8');poly(c,[[0,1],[10,16],[0,9],[-10,16]],'#f0b84e');c.restore()
}
export function drawBlock(c,training){
const {x,y,shieldRadius,shieldHalfAngle}=BLOCK_RULES,motion=training.motion,t=motion?training.elapsed:0;
const pulse=training.blockPulse,hit=training.hit,angle=training.shieldAngle,low=Math.max(0,Math.sin(angle));
const recoil=motion?Math.sin(pulse*Math.PI)*6:0,knock=motion?Math.sin(hit*Math.PI)*9:0;
const hx=x-Math.cos(training.blockAngle)*recoil-Math.cos(training.impactAngle)*knock,hy=y+70-Math.sin(training.impactAngle)*knock;
c.save();appearTraining(c,training,x,y+70);
ellipse(c,x,y+76,107,27,'#7f976344');ellipse(c,x,y+71,96,22,'#e2d5a13b');
if(motion&&pulse>0){c.save();c.globalAlpha*=pulse*.65;c.lineWidth=4;c.strokeStyle='#d1fff1';c.beginPath();const r=shieldRadius+16+(1-pulse)*36;c.arc(x,y,r,training.blockAngle-shieldHalfAngle,training.blockAngle+shieldHalfAngle);c.stroke();c.restore()}
if(hit>0){c.save();c.globalAlpha*=hit*.45;c.strokeStyle='#d67454';c.lineWidth=5;c.beginPath();c.arc(x,y,57+(motion?(1-hit)*22:0),0,Math.PI*2);c.stroke();c.restore()}
const heldRadius=shieldRadius-28*low*low-recoil,sx=x+Math.cos(angle)*heldRadius,sy=y+Math.sin(angle)*heldRadius;
c.save();c.translate(hx,hy);if(Math.cos(angle)<-.1)c.scale(-1,1);if(motion)c.rotate(-recoil*.006);
c.scale(1,1-low*.12);hero(c,0,0,.92,training.player.equipment,t,0,hit,training.player.scarf,'guard');c.restore();
if(low>0){c.save();c.lineCap='round';c.lineJoin='round';c.strokeStyle='#c4875c';c.lineWidth=13;c.beginPath();const side=Math.cos(angle)<-.1?-1:1;c.moveTo(hx+side*22,hy-63);c.lineTo(hx+side*32,hy-40+low*7);c.lineTo(sx,sy-8);c.stroke();ellipse(c,sx,sy-8,8,7,'#efbb83');c.restore()}
trainingShield(c,sx,sy,angle,pulse);
c.restore();
for(const o of training.objects.items){
if(!o.active)continue;
if(motion){c.save();c.lineCap='round';const dx=Math.cos(o.angle),dy=Math.sin(o.angle);c.strokeStyle=o.star?'#fff3b455':'#ffe1a055';c.lineWidth=o.star?5:8;c.beginPath();c.moveTo(o.x+dx*22,o.y+dy*22);c.lineTo(o.x+dx*48,o.y+dy*48);c.stroke();c.restore()}
if(o.star){const glow=motion?1+Math.sin(t*6+o.angle)*.1:1;ellipse(c,o.x,o.y,30*glow,30*glow,'#fff3ba25');ellipse(c,o.x,o.y,24,24,'#fff5cb32');star(c,o.x,o.y,glow,motion?t*.8:0)}
else orange(c,o.x,o.y,motion?t*3+o.angle:0)
}
if(motion)for(const e of training.effects.items){
if(!e.active)continue;
c.save();const life=Math.max(0,e.life/e.maxLife);c.globalAlpha=life;
if(e.type==='fruit')orange(c,e.x,e.y,e.angle+(1-life)*5);
else if(e.type==='deflectedStar')star(c,e.x,e.y,1,e.angle+(1-life)*5);
else{c.translate(e.x,e.y);c.rotate((1-life)*3);poly(c,[[0,-5],[3,0],[0,5],[-3,0]],e.color)}
c.restore()
}
if(training.perfectStar>0){
const life=training.perfectStar/.8,age=1-life,sy=y-110-(motion?age*22:0);
c.save();c.globalAlpha=Math.min(1,life*4);
if(motion){c.globalAlpha*=.5;c.strokeStyle='#fff3ba';c.lineWidth=3;c.beginPath();c.arc(x,y,28+age*74,0,Math.PI*2);c.stroke();c.globalAlpha=Math.min(1,life*4)}
star(c,x,sy,motion?.8+Math.sin(Math.min(1,age*3)*Math.PI)*.25:.8);c.restore()
}
if(training.lastTextLife>0){c.save();c.globalAlpha=Math.min(1,training.lastTextLife/.25);c.textAlign='center';c.font='700 24px "DM Sans",sans-serif';c.fillStyle='#fff7ce';c.strokeStyle='#34626a';c.lineWidth=3;const ty=160-(motion?(1-Math.min(1,training.lastTextLife/1.8))*12:0);c.strokeText(training.lastText,700,ty);c.fillText(training.lastText,700,ty);c.restore()}
}
