import {Pool} from './core.js';
import {hero,ellipse,poly} from './art.js';
import {drawStrength} from './strength-art.js';
export class Training{
constructor(kind,player,feedback){this.kind=kind;this.player=player;this.feedback=feedback;this.elapsed=0;this.countdown=3;this.hits=0;this.combo=0;this.bestCombo=0;this.misses=0;this.rewarded=false;this.done=false;this.objects=new Pool(20);this.effects=new Pool(32);this.nextSpawn=.5;this.cooldown=0;this.attack=0;this.hit=0;this.lane=1;this.flash=0;this.target=700;this.phase=0;this.shield=0;this.lastText='';this.lastTextLife=0;this.goalTarget=4;this.goalProgress=0;this.goals=0;this.bonusStrength=0;this.bonusXp=0;this.goalFeedback=0;this.throwPose=0;this.throwLane=1;this.action='1';this.tutorialRemaining=kind==='strength'&&!player.tutorials?.strength?4:0}
spawnStrength(lane,kick=false){
const pace=1+Math.min(this.elapsed,120)/180;
const startY=lane===2?470:340;
const object=this.objects.spawn({x:kick?170:1110,y:kick?125:startY,lane,kick,speed:kick?165*pace:350*pace,angle:0,age:0,duration:680/(350*pace),startY,targetY:210+lane*130,arc:lane===0?100:0});
if(object&&!kick){this.throwLane=lane;this.throwPose=1}
return object
}
step(dt){
if(this.done)return;
this.tutorialRemaining=Math.max(0,this.tutorialRemaining-dt);
if(this.countdown>0){this.countdown=Math.max(0,this.countdown-dt);return}
this.elapsed+=dt;
this.phase+=dt;
this.cooldown=Math.max(0,this.cooldown-dt);
this.attack=Math.max(0,this.attack-dt*4);
this.hit=Math.max(0,this.hit-dt*4);
this.flash=Math.max(0,this.flash-dt*5);
this.shield=Math.max(0,this.shield-dt);
this.lastTextLife=Math.max(0,this.lastTextLife-dt);
this.goalFeedback=Math.max(0,this.goalFeedback-dt);
this.throwPose=Math.max(0,this.throwPose-dt*3);
if(this.kind!=='strength'&&this.elapsed>=30){this.elapsed=30;this.done=true;return}
const pace=1+this.elapsed/85;
if(['strength','dodge','block'].includes(this.kind)&&this.elapsed>=this.nextSpawn&&(this.kind==='strength'||this.elapsed<28)){
const lane=Math.floor(Math.random()*3);
if(this.kind==='strength'){
const kick=Math.random()<.22;
this.spawnStrength(lane,kick);
this.nextSpawn=this.elapsed+1.25/(1+Math.min(this.elapsed,120)/180)
}else{
this.nextSpawn=this.elapsed+(this.kind==='block'?1.7:1.15)/pace;
this.objects.spawn({x:1200,y:210+lane*130,lane,kick:false,speed:330*pace,angle:Math.random()*6})
}
}
for(const o of this.objects.items){
if(!o.active)continue;
if(o.kick){o.y+=o.speed*dt;if(o.y>490){o.active=false;this.fail(170,470)}}
else{
if(this.kind==='strength'&&o.duration){
o.age+=dt;
const u=o.age/o.duration;
o.x=1110-680*u;
o.y=o.startY+(o.targetY-o.startY)*u-4*o.arc*u*(1-u)
}else o.x-=o.speed*dt;
if(this.kind==='dodge'&&o.x<=310){o.active=false;if(o.lane===this.lane)this.fail(300,o.y);else this.success(300,210+this.lane*130)}
else if(this.kind==='block'&&o.x<450){o.active=false;this.fail(460,340)}
else if(this.kind==='strength'&&o.x<345){o.active=false;this.fail(350,o.y)}
}
}
for(const e of this.effects.items){if(!e.active)continue;e.life-=dt;e.x+=e.vx*dt;e.y+=e.vy*dt;e.vy+=100*dt;if(e.life<=0)e.active=false}
}
input(action){if(this.done||this.countdown>0)return;if(this.kind==='dodge'){const lane=Number(action);if(Number.isInteger(lane)&&lane>=0&&lane<=2)this.lane=lane;return}if(this.cooldown>0)return;this.cooldown=.23;this.attack=1;this.action=action;if(this.kind==='strength'){const kick=action==='kick';const lane=Number(action);const o=this.objects.items.find(o=>o.active&&(kick?o.kick&&Math.abs(o.y-425)<65:!o.kick&&o.lane===lane&&Math.abs(o.x-430)<85&&Math.abs(o.y-(210+lane*130))<65));if(o){o.active=false;this.success(o.x,o.y)}else this.fail(kick?170:430,kick?425:210+lane*130)}else if(this.kind==='block'){this.shield=.3;const o=this.objects.items.find(o=>o.active&&Math.abs(o.x-555)<90);if(o){o.active=false;this.success(o.x,340)}else this.fail(555,340)}else if(this.kind==='accuracy'){const x=700+Math.sin(this.phase*2.6)*305;if(Math.abs(x-this.target)<60){this.success(x,345);this.target=500+Math.random()*400}else this.fail(x,345)}else if(this.kind==='crit'){const radius=85+Math.sin(this.phase*3.3)*49;if(Math.abs(radius-85)<13)this.success(700,350);else this.fail(700,350)}}
success(x,y){this.hits++;this.combo++;this.bestCombo=Math.max(this.combo,this.bestCombo);this.lastText=this.combo>=5?'PERFECT · '+this.combo+' COMBO':'NICE!';this.lastTextLife=.7;if(this.kind==='strength'){this.goalProgress++;if(this.goalProgress>=this.goalTarget){this.goals++;this.bonusStrength++;this.bonusXp+=6;this.goalProgress=0;this.goalTarget+=2;this.goalFeedback=1.8;this.lastText='Goal banked! +1 Strength · +6 XP';this.lastTextLife=1.8}}this.burst(x,y,'#fff0a0');this.feedback('hit')}
fail(x,y){this.misses++;this.combo=0;this.goalProgress=0;this.hit=1;this.flash=1;this.lastText='Keep going';this.lastTextLife=.65;this.burst(x,y,'#ed997b');this.feedback('miss')}
burst(x,y,color){for(let i=0;i<8;i++)this.effects.spawn({x,y,vx:Math.cos(i*Math.PI/4)*140,vy:Math.sin(i*Math.PI/4)*140,life:.5,maxLife:.5,color})}
draw(c,t){if(this.kind==='strength'){drawStrength(c,this,t);return}const moving=this.kind==='dodge';const y=moving?210+this.lane*130:475;hero(c,this.kind==='block'?410:290,y,this.kind==='block'?1.2:.9,this.player.equipment,t,this.attack,this.hit,this.player.scarf);c.save();c.font='700 16px "DM Sans",sans-serif';c.textAlign='center';if(moving){for(let i=0;i<3;i++){const ly=210+i*130;c.strokeStyle='#527b7555';c.lineWidth=2;c.setLineDash([9,12]);c.beginPath();c.moveTo(360,ly);c.lineTo(1170,ly);c.stroke();c.setLineDash([]);ellipse(c,300,ly+8,45,12,i===this.lane?'#ffefbc88':'#477d6c44');c.fillStyle='#3e6d69';c.fillText(['HIGH','MID','LOW'][i],190,ly-25)}}if(this.kind==='block'){c.strokeStyle='#fff2bd';c.lineWidth=7;c.beginPath();c.arc(555,340,55,0,Math.PI*2);c.stroke();if(this.shield>0){c.fillStyle='#79dce0aa';c.beginPath();c.arc(450,375,100,-1.3,1.3);c.fill()}c.fillStyle='#335f66';c.fillText('BLOCK AT THE RING',700,450)}for(const o of this.objects.items){if(!o.active)continue;const y=this.kind==='block'?340:o.y;c.save();c.translate(o.x,y);c.rotate(o.angle+(this.player.settings.motion?this.elapsed*2:0));if(o.kick){poly(c,[[0,-25],[7,-7],[25,0],[7,7],[0,25],[-7,7],[-25,0],[-7,-7]],'#ffe3a1','#b78748')}else if(this.kind==='strength'){ellipse(c,0,0,23,20,'#f3932d');ellipse(c,-6,-6,12,9,'#ffd278');poly(c,[[0,-18],[8,-34],[19,-25],[6,-18]],'#458c69')}else{poly(c,[[0,-24],[26,0],[0,24],[-26,0]],this.kind==='block'?'#9d8dda':'#cb795f','#fff0bc');poly(c,[[0,-24],[3,0],[26,0]],'#ffffff66')}c.restore()}if(this.kind==='accuracy'){c.fillStyle='#355e61';c.fillText('TAP WHEN THE SIGHT CROSSES THE TARGET',750,230);for(const [r,col] of [[65,'#efcf93'],[48,'#d77360'],[29,'#f6e5ac'],[12,'#d77360']])ellipse(c,this.target,345,r,r,col);c.strokeStyle='#456e7380';c.lineWidth=4;c.beginPath();c.moveTo(360,345);c.lineTo(1040,345);c.stroke();const x=700+Math.sin(this.phase*2.6)*305;c.strokeStyle='#173a4b';c.lineWidth=4;c.strokeRect(x-16,329,32,32);c.beginPath();c.moveTo(x,315);c.lineTo(x,375);c.moveTo(x-30,345);c.lineTo(x+30,345);c.stroke()}if(this.kind==='crit'){c.lineWidth=26;c.strokeStyle='#e3b461';c.beginPath();c.arc(700,350,85,0,Math.PI*2);c.stroke();c.strokeStyle='#fff2c9';c.lineWidth=3;c.beginPath();c.arc(700,350,85,0,Math.PI*2);c.stroke();const r=85+Math.sin(this.phase*3.3)*49;c.strokeStyle='#fff';c.lineWidth=7;c.beginPath();c.arc(700,350,r,0,Math.PI*2);c.stroke();poly(c,[[700,327],[706,344],[723,350],[706,356],[700,373],[694,356],[677,350],[694,344]],'#fff4bc');c.fillStyle='#355e61';c.fillText('MATCH THE GOLD RING',700,520)}for(const e of this.effects.items){if(!e.active||!this.player.settings.motion)continue;c.globalAlpha=e.life/e.maxLife;ellipse(c,e.x,e.y,5,5,e.color)}c.globalAlpha=1;if(this.lastTextLife>0){c.font='700 28px "DM Sans",sans-serif';c.fillStyle=this.combo?'#fff7ce':'#944e46';c.strokeStyle='#34626a';c.lineWidth=3;if(this.combo)c.strokeText(this.lastText,720,this.kind==='strength'?575:165);c.fillText(this.lastText,720,this.kind==='strength'?575:165)}c.restore()}
}
