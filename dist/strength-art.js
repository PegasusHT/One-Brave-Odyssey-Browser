import {hero,trainingPartner,ellipse,poly,appearTraining} from './art.js';
import {STRENGTH_LAYOUT,strengthPoint} from './strength-layout.js';
export function drawStrength(c,training,time,layout=STRENGTH_LAYOUT){
const h=layout.hero,p=layout.partner;
c.save();appearTraining(c,training,h.x*1400,h.y*700);hero(c,h.x*1400,h.y*700,h.scale,training.player.equipment,time,training.attack,training.hit,training.player.scarf,training.action);c.restore();
c.save();appearTraining(c,training,p.x*1400,p.y*700,.28);c.translate(p.x*1400,p.y*700);c.scale(p.scale,p.scale);c.translate(-1190,-510);
trainingPartner(c,training.throwPose,Math.max(0,1-(training.nextSpawn-training.elapsed)/.3),training.throwLane);c.restore();
if(training.attack>0){
const kick=training.action==='kick',point=strengthPoint(kick?170:430,kick?425:210+Number(training.action)*130,layout);
c.save();c.globalAlpha=training.attack;c.strokeStyle='#f5fff1';c.lineWidth=6;c.lineCap='round';c.beginPath();c.arc(point.x,point.y,(kick?30:48)*point.scale,-1.3,1.3);c.stroke();c.restore()
}
for(const o of training.objects.items){
if(!o.active)continue;
const point=strengthPoint(o.x,o.y,layout);
c.save();c.translate(point.x,point.y);c.scale(point.scale,point.scale);c.rotate(o.angle+(training.player.settings.motion?training.elapsed*2:0));
if(o.kick)poly(c,[[0,-25],[7,-7],[25,0],[7,7],[0,25],[-7,7],[-25,0],[-7,-7]],'#ffe3a1','#b78748');
else{ellipse(c,0,0,23,20,'#f3932d');ellipse(c,-6,-6,12,9,'#ffd278');poly(c,[[0,-18],[8,-34],[19,-25],[6,-18]],'#458c69')}
c.restore()
}
if(training.player.settings.motion)for(const e of training.effects.items){
if(!e.active)continue;
const point=strengthPoint(e.x,e.y,layout);
c.save();c.globalAlpha=e.life/e.maxLife;ellipse(c,point.x,point.y,4,4,e.color);c.restore()
}
if(training.lastTextLife>0){c.save();c.textAlign='center';c.font='700 24px "DM Sans",sans-serif';c.fillStyle=training.combo?'#fff7ce':'#944e46';c.strokeStyle='#34626a';c.lineWidth=3;if(training.combo)c.strokeText(training.lastText,700,195);c.fillText(training.lastText,700,195);c.restore()}
}
