import {CRITICAL_TIMING} from './core.js';
import {hero,ellipse,poly,appearTraining,CRITICAL_ART as art} from './art.js';
import {drawCriticalHero} from './action-art.js';

const clamp=n=>Math.max(0,Math.min(1,n)),ease=n=>n*n*(3-2*n),mix=(a,b,n)=>a+(b-a)*n;
function dummy(c,x,y,pose,flash){
c.save();c.translate(x,y);ellipse(c,0,0,57,12,'#294b493b');
poly(c,[[-45,0],[-13,-13],[16,-12],[43,1],[32,6],[-35,6]],'#8f7950','#715e41');
c.rotate(pose);c.lineCap='round';c.strokeStyle='#715738';c.lineWidth=14;c.beginPath();c.moveTo(0,-145);c.lineTo(0,0);c.moveTo(-68,-108);c.lineTo(68,-108);c.stroke();
c.strokeStyle='#bf9d62';c.lineWidth=4;c.beginPath();c.moveTo(-3,-137);c.lineTo(-3,-9);c.moveTo(-63,-112);c.lineTo(63,-112);c.stroke();
const fabric=c.createLinearGradient(-40,-90,40,-80);fabric.addColorStop(0,'#c2a567');fabric.addColorStop(.45,'#ebd49a');fabric.addColorStop(1,'#b69a63');
poly(c,[[-36,-115],[32,-115],[40,-49],[23,-32],[-29,-35],[-43,-57]],fabric,'#887149');
ellipse(c,0,-147,29,30,'#e4cf99');ellipse(c,5,-150,20,22,'#ecdaad');
poly(c,[[-27,-164],[-28,-184],[-13,-175],[-4,-189],[7,-174],[24,-184],[27,-162]],'#b89956','#887149');
c.strokeStyle='#766749';c.lineWidth=3;c.beginPath();c.moveTo(-16,-154);c.lineTo(-7,-145);c.moveTo(-7,-154);c.lineTo(-16,-145);c.moveTo(8,-154);c.lineTo(17,-145);c.moveTo(17,-154);c.lineTo(8,-145);c.moveTo(-10,-133);c.quadraticCurveTo(0,-127,12,-133);c.stroke();
poly(c,[[-26,-122],[25,-122],[23,-111],[-25,-110]],'#469c9b');poly(c,[[23,-121],[54,-106],[35,-97],[23,-109]],'#73cbb5');
c.strokeStyle='#927953';c.lineWidth=4;c.beginPath();c.moveTo(-37,-74);c.lineTo(36,-74);c.moveTo(-29,-65);c.lineTo(32,-64);c.stroke();
c.strokeStyle='#9f854f';c.lineWidth=2;for(let i=0;i<5;i++){c.beginPath();c.moveTo(-19+i*9,-100);c.lineTo(-15+i*9,-91);c.stroke()}
poly(c,[[-23,-42],[-33,-18],[-16,-30],[-3,-17],[8,-32],[23,-20],[21,-40]],'#c2a86b');
if(flash>0){c.globalAlpha=flash;ellipse(c,0,-147,28,29,'#fff8d7');poly(c,[[-36,-115],[32,-115],[40,-49],[23,-32],[-29,-35],[-43,-57]],'#fff8d7')}
c.restore()
}
function cue(c,x,y,fake,remaining,age,motion){
const pop=motion?1+.12*Math.sin(clamp(age/.16)*Math.PI):1;
c.save();c.translate(x,y);c.scale(pop,pop);c.lineWidth=3;c.fillStyle='#17374530';c.beginPath();c.roundRect(-82,-28,164,67,18);c.fill();
c.fillStyle=fake?'#a84f4b':'#286e61';c.strokeStyle=fake?'#ffd0bd':'#cbffe4';c.beginPath();c.roundRect(-82,-33,164,66,16);c.fill();c.stroke();poly(c,[[-8,33],[0,43],[8,33]],c.fillStyle);
c.textAlign='center';c.textBaseline='middle';c.font='800 34px "DM Sans",sans-serif';c.fillStyle='#fff9e4';c.fillText(fake?'FAKE':'HIT!',0,-4);
if(!fake){c.strokeStyle='#c5ffe2';c.lineWidth=4;c.lineCap='round';c.beginPath();c.moveTo(-60,22);c.lineTo(-60+120*clamp(remaining),22);c.stroke()}
c.restore()
}
function jumpPose(progress){
const u=clamp((progress-.16)/.84),travel=1-(1-u)**2;
return{x:mix(art.heroX,art.jumpX,travel),y:art.groundY-art.jumpHeight*Math.sin(u*Math.PI/2),lean:.14*Math.sin(u*Math.PI),stretchX:1+.09*Math.sin(Math.PI*clamp(progress/.16)),stretchY:1-.13*Math.sin(Math.PI*clamp(progress/.16)),legs:[-.72*travel,.68*travel],swordAngle:mix(-.5,-1,travel)}
}
function position(training){
const r=training.criticalRound,phase=r?.phase,motion=training.motion;
const rest={x:art.heroX,y:art.groundY,lean:0,stretchX:1,stretchY:1,legs:[0,0],swordAngle:-.5};
if(!r||r.jumpAt===null){if(r?.failed&&motion){const u=clamp((training.elapsed-r.startedAt)/CRITICAL_TIMING.recovery);rest.x-=18*Math.sin(u*Math.PI);rest.lean=-.13*Math.sin(u*Math.PI);rest.swordAngle+=.9*Math.sin(u*Math.PI)}return rest}
if(phase==='rise'||phase==='wait'||phase==='finish')return jumpPose(motion?clamp((training.elapsed-r.jumpAt)/CRITICAL_TIMING.rise):1);
const landedX=r.strike?art.strikeX:art.missX;
if(phase==='land'){
const u=motion?clamp((training.elapsed-r.startedAt)/CRITICAL_TIMING.land):1,travel=u*u,from=jumpPose(r.landFrom);
return{...rest,x:mix(from.x,landedX,travel),y:mix(from.y,art.groundY,travel),lean:r.strike?.22*Math.sin(u*Math.PI):0,legs:from.legs.map(a=>a*(1-u)),swordAngle:mix(from.swordAngle,r.strike?1.5:-.5,ease(u))}
}
if(phase==='recovery'){
const u=clamp((training.elapsed-r.startedAt)/CRITICAL_TIMING.recovery),squash=motion?Math.sin(Math.PI*clamp(u/.4)):0;
return{...rest,x:landedX,stretchX:1+.13*squash,stretchY:1-.17*squash,swordAngle:r.strike?mix(1.5,-.5,ease(clamp((u-.3)/.7))):-.5}
}
if(phase==='reset'){
const u=motion?clamp((training.elapsed-r.startedAt)/CRITICAL_TIMING.reset):1;
return{...rest,x:mix(landedX,art.heroX,ease(u)),y:art.groundY-18*Math.sin(u*Math.PI),legs:[.5*Math.sin(u*Math.PI*2),-.5*Math.sin(u*Math.PI*2)]}
}
return rest
}
function particles(c,training){
for(const e of training.effects.items){if(!e.active)continue;c.save();c.globalAlpha=clamp(e.life/e.maxLife);
if(e.type==='dust'){const size=4+10*(1-e.life/e.maxLife);ellipse(c,e.x,e.y,size,size*.55,'#e8d4a2')}
else if(e.type==='straw'){c.translate(e.x,e.y);c.rotate(e.angle+(e.maxLife-e.life)*5);poly(c,[[-2,-9],[2,-7],[2,8],[-1,10]],'#efd18a','#a2824a')}
else ellipse(c,e.x,e.y,4,4,e.color);
c.restore()}
}
export function drawCritical(c,training){
const r=training.criticalRound,phase=r?.phase,motion=training.motion,pose=position(training),age=r?training.elapsed-r.startedAt:0,impact=r?.landed?training.elapsed-r.landedAt:Infinity;
const recoil=motion&&r?.perfect&&impact<2?Math.sin(impact*26)*Math.exp(-impact*6)*.24:0;
const fakeTilt=motion&&phase==='fake'?Math.sin(age*22)*.065*(1-clamp(age/CRITICAL_TIMING.fake)):0;
c.save();appearTraining(c,training,art.dummyX,art.groundY,.28);
ellipse(c,art.dummyX,art.groundY+4,105,19,'#dcc28a44');dummy(c,art.dummyX,art.groundY,Number.isFinite(recoil)?recoil+fakeTilt:fakeTilt,r?.perfect?clamp(1-impact/.16)*.75:0);c.restore();
c.save();appearTraining(c,training,art.heroX,art.groundY);
const height=clamp((art.groundY-pose.y)/art.jumpHeight);ellipse(c,pose.x,art.groundY,44-height*15,9-height*3,'#183c4838');
if(motion&&phase==='land'&&r.strike){
c.save();c.strokeStyle='#e3fff391';c.lineWidth=12;c.lineCap='round';c.beginPath();c.moveTo(art.jumpX-25,art.groundY-art.jumpHeight-45);c.lineTo(pose.x-24,pose.y-40);c.stroke();
c.strokeStyle='#fff4ba';c.lineWidth=6;c.beginPath();c.arc(pose.x+27,pose.y-74,93,-2.55,-Math.PI/2+pose.swordAngle);c.stroke();c.restore()
}
if(!drawCriticalHero(c,training,pose))hero(c,pose.x,pose.y,art.scale,training.player.equipment,motion&&(r?.jumpAt===null||!r)?training.elapsed:0,0,training.hit,training.player.scarf,null,{...pose,shadow:false});c.restore();
if(motion){
particles(c,training);
if(r?.perfect&&impact<.35){const u=clamp(impact/.35);c.save();c.globalAlpha=(1-u)*.7;c.strokeStyle='#fff3b5';c.lineWidth=5*(1-u)+1;c.beginPath();c.ellipse(art.strikeX,art.groundY,25+u*100,6+u*18,0,0,Math.PI*2);c.stroke();c.restore()}
}
if(phase==='fake'||phase==='ready')cue(c,art.dummyX,225,phase==='fake',(r.until-training.elapsed)/CRITICAL_TIMING[phase],age,motion);
if(phase==='finish')cue(c,pose.x,pose.y-190,false,(r.until-training.elapsed)/CRITICAL_TIMING.finish,age,motion);
if(training.perfectStar>0){
const u=clamp(1-training.perfectStar/.8),scale=motion?1+.25*Math.sin(clamp(u/.3)*Math.PI):1;
c.save();c.translate(pose.x,pose.y-185-(motion?u*28:0));c.scale(scale,scale);c.globalAlpha=clamp(training.perfectStar/.2);
ellipse(c,0,0,31,31,'#fff0aa30');poly(c,[[0,-22],[6,-7],[23,-7],[10,5],[14,22],[0,12],[-14,22],[-10,5],[-23,-7],[-6,-7]],'#ffe38b','#a77a42');c.restore()
}
}
