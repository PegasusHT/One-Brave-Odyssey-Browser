import {DODGE_TIMING} from './core.js';
import {hero,trainingPartner,ellipse,poly,appearTraining} from './art.js';

export function drawDodge(c,training,time){
const h={x:560,y:476,scale:.972},p={x:840,y:476,scale:.72};
const age=training.elapsed-training.dodgeAt,pose=age<0||age>=DODGE_TIMING.pose?0:Math.min(1,.45+age/.06,1-(age-DODGE_TIMING.window)/(DODGE_TIMING.pose-DODGE_TIMING.window));
const jump=training.action==='jump'?105*pose:0,back=training.action==='back'?110*pose:0,tuck=training.action==='tuck'?.53*pose:0;
c.save();appearTraining(c,training,h.x,h.y);c.translate(h.x-back,h.y-jump);c.scale(1,1-tuck);
hero(c,0,0,h.scale,training.player.equipment,time,0,training.hit,training.player.scarf);c.restore();
const a=training.stickAttack,lane=a?.lane??1,targetY=[355,410,466][lane];
let reach=0,ready=0;
if(a){const age=training.elapsed-a.startedAt;ready=Math.min(1,age/a.windup);reach=Math.max(0,Math.min(1,(age-a.windup)/a.strike));if(a.resolved)reach=Math.max(0,1-(training.elapsed-a.impactAt)/DODGE_TIMING.recovery)}
const handX=800-25*reach,handY=395+([365,400,430][lane]-395)*ready;
const tipX=690-155*reach,tipY=350+(targetY-350)*ready+(lane===0?-65:lane===2?35:0)*ready*(1-reach);
const local=(x,y)=>({x:1190+(x-p.x)/p.scale,y:510+(y-p.y)/p.scale});
const hand=local(handX,handY),tip=local(tipX,tipY);
c.save();appearTraining(c,training,p.x,p.y,.28);c.translate(p.x,p.y);c.scale(p.scale,p.scale);c.translate(-1190,-510);
trainingPartner(c,0,0,lane,{handX:hand.x,handY:hand.y,tipX:tip.x,tipY:tip.y});c.restore();
if(a&&!a.resolved){
c.save();c.textAlign='center';c.font='700 20px "DM Sans",sans-serif';c.fillStyle='#355e61';c.fillText(['HIGH','MID','LOW'][lane],p.x,285);
if(a.impactAt-training.elapsed<=DODGE_TIMING.perfect){c.strokeStyle='#fff4be';c.lineWidth=4;c.beginPath();c.arc(tipX,tipY,14,0,Math.PI*2);c.stroke()}
c.restore()
}
if(training.perfectStar>0){
const x=h.x-back,y=h.y-jump-154*(1-tuck)-30;
c.save();c.translate(x,y);c.globalAlpha=Math.min(1,training.perfectStar/.2);
poly(c,[[0,-19],[5,-6],[19,-6],[8,3],[12,17],[0,9],[-12,17],[-8,3],[-19,-6],[-5,-6]],'#ffe38b','#9e743e');c.restore()
}
if(training.player.settings.motion)for(const e of training.effects.items){if(!e.active)continue;c.save();c.globalAlpha=e.life/e.maxLife;ellipse(c,e.x,e.y,4,4,e.color);c.restore()}
if(training.lastTextLife>0){c.save();c.textAlign='center';c.font='700 24px "DM Sans",sans-serif';c.fillStyle=training.combo?'#fff7ce':'#944e46';c.strokeStyle='#34626a';c.lineWidth=3;if(training.combo)c.strokeText(training.lastText,700,195);c.fillText(training.lastText,700,195);c.restore()}
}
