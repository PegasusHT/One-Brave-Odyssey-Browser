import {equippedHero as hero} from './hero-art.js';
import {Pool,TRAINING_INTRO,TRAINING_PACE,CRITICAL_TIMING,DODGE_TIMING,trainingMission,trainingGoalTarget,trainingYield,PRACTICE_KINDS,BLOCK_RULES,GROUNDS} from './core.js';
import {ellipse,poly,appearTraining,CRITICAL_ART,HERO_SCENE_ART,placeSceneHero} from './art.js';
import {drawStrength} from './strength-art.js';
import {drawDodge} from './dodge-art.js';
import {drawBlock} from './block-art.js';
import {drawCritical} from './critical-art.js';
export class Training{
constructor(kind,player,feedback){this.kind=kind;this.streak=PRACTICE_KINDS.includes(kind);this.statName=GROUNDS.find(g=>g.id===kind)?.name||kind;this.player=player;this.startingStat=player.stats[kind];this.feedback=feedback;this.elapsed=0;this.countdown=TRAINING_INTRO;this.reducedMotion=false;this.hits=0;this.combo=1;this.comboFeedback=0;this.comboStar=false;this.bestCombo=0;this.misses=0;this.rewarded=false;this.done=false;this.objects=new Pool(20);this.effects=new Pool(32);this.nextSpawn=.5;this.cooldown=0;this.attack=0;this.hit=0;this.lane=1;this.flash=0;this.target=700;this.phase=0;this.lastText='';this.lastTextLife=0;this.goalTarget=trainingGoalTarget(kind,this.startingStat);this.goalProgress=player.trainingProgress?.[kind]||0;this.goals=0;this.bonusStrength=0;this.bonusAccuracy=0;this.bonusDodge=0;this.bonusBlock=0;this.bonusCrit=0;this.criticalRound=null;this.criticalRounds=0;this.shieldAngle=0;this.blockPulse=0;this.blockAngle=0;this.impactAngle=0;this.perfectDodges=0;this.perfectStar=0;this.stickAttack=null;this.dodgeAt=-Infinity;this.bonusXp=0;this.goalFeedback=0;this.throwPose=0;this.throwLane=1;this.action='1';this.tutorialRemaining=this.streak&&!player.tutorials?.[kind]?4:0;this.missionNumber=player.trainingMissions?.[kind]||1;this.missionProgress=0;this.missionSuccesses=0;this.missionsCompleted=0;this.missionStats=0;this.missionXp=0;this.missionFeedback=0;this.missionMessage='';this.savePending=false}
get motion(){return this.player.settings.motion&&!this.reducedMotion}
entrance(delay=0){if(!this.motion)return 1;const p=Math.max(0,Math.min(1,(TRAINING_INTRO-this.countdown-delay)/.65));return 1-(1-p)**3}
spawnStrength(lane,kick=false){
const pace=TRAINING_PACE*(1+Math.min(this.elapsed,120)/180);
const startY=lane===2?470:340;
const object=this.objects.spawn({x:kick?170:1110,y:kick?125:startY,lane,kick,speed:kick?165*pace:350*pace,angle:0,age:0,duration:680/(350*pace),startY,targetY:210+lane*130,arc:lane===0?100:0});
if(object&&!kick){this.throwLane=lane;this.throwPose=1}
return object
}
spawnDodge(lane=Math.floor(Math.random()*3)){
const pace=TRAINING_PACE*(1+Math.min(this.elapsed,120)/240),windup=.85/pace,strike=.28/pace;
this.stickAttack={lane,startedAt:this.elapsed,windup,strike,impactAt:this.elapsed+windup+strike,resolved:false};
this.nextSpawn=this.stickAttack.impactAt+DODGE_TIMING.recovery+.4/pace;
return this.stickAttack
}
stepDodge(){
if(this.elapsed>=this.nextSpawn&&!this.stickAttack)this.spawnDodge();
const a=this.stickAttack;
if(!a)return;
if(!a.resolved&&this.elapsed+1e-9>=a.impactAt){
a.resolved=true;
const lead=a.impactAt-this.dodgeAt,correct=this.action===['tuck','back','jump'][a.lane];
if(correct&&lead>=0&&lead<=DODGE_TIMING.window+1e-9){
const perfect=lead<=DODGE_TIMING.perfect+1e-9;
this.success(560,[355,410,465][a.lane],perfect);
if(perfect){this.perfectDodges++;this.perfectStar=.8}
}else this.fail(560,[355,410,465][a.lane])
}
if(this.elapsed>=a.impactAt+DODGE_TIMING.recovery)this.stickAttack=null
}
inputDodge(action){
if(!['tuck','jump','back'].includes(action)||this.cooldown>0)return;
this.action=action;this.dodgeAt=this.elapsed;this.cooldown=DODGE_TIMING.cooldown
}
spawnBlock(angle=Math.random()*Math.PI*2,star=false){
const {x,y,shieldRadius,flightTime}=BLOCK_RULES,dx=Math.cos(angle),dy=Math.sin(angle);
const distance=Math.min((dx>=0?1350-x:x-50)/Math.max(.001,Math.abs(dx)),(dy>=0?650-y:y-50)/Math.max(.001,Math.abs(dy)));
const pace=TRAINING_PACE*(1+Math.min(this.elapsed,120)/240);
return this.objects.spawn({x:x+dx*distance,y:y+dy*distance,angle,distance,speed:(distance-shieldRadius)*pace/flightTime,star,kick:false})
}
aimShield(angle){if(this.kind==='block'&&!this.done&&Number.isFinite(angle))this.shieldAngle=angle}
stepBlock(dt){
const {x,y,shieldRadius,shieldHalfAngle,bodyRadius,spawnInterval}=BLOCK_RULES;
if(this.elapsed>=this.nextSpawn){this.spawnBlock(Math.random()*Math.PI*2,Math.random()<.22);this.nextSpawn=this.elapsed+spawnInterval/(TRAINING_PACE*(1+Math.min(this.elapsed,120)/240))}
for(const o of this.objects.items){
if(!o.active)continue;
const previous=o.distance;o.distance=Math.max(0,o.distance-o.speed*dt);o.x=x+Math.cos(o.angle)*o.distance;o.y=y+Math.sin(o.angle)*o.distance;
const difference=Math.atan2(Math.sin(o.angle-this.shieldAngle),Math.cos(o.angle-this.shieldAngle));
if(previous>=shieldRadius-16&&o.distance<=shieldRadius+16&&Math.abs(difference)<=shieldHalfAngle){o.active=false;this.blockPulse=1;this.blockAngle=o.angle;this.effects.spawn({type:o.star?'deflectedStar':'fruit',x:o.x,y:o.y,vx:Math.cos(o.angle)*260-Math.sin(o.angle)*100,vy:Math.sin(o.angle)*260+Math.cos(o.angle)*100,angle:o.angle,life:.55,maxLife:.55});if(o.star){this.missionEvent('skipStar');this.burst(o.x,o.y,'#d9d7af');this.feedback('block')}else this.success(o.x,o.y)}
else if(o.distance<=bodyRadius){o.active=false;if(o.star){this.success(o.x,o.y,true);this.perfectStar=.8}else{this.impactAngle=o.angle;this.fail(o.x,o.y)}}
}
}
spawnCritical(fake=this.criticalRounds===0||Math.random()<.5){
this.criticalRounds++;this.tutorialRemaining=0;
const phase=fake?'fake':'ready';
this.criticalRound={phase,startedAt:this.elapsed,until:this.elapsed+CRITICAL_TIMING[phase],jumpAt:null,landFrom:0,perfect:false,landed:false};
return this.criticalRound
}
setCriticalPhase(phase,at=this.elapsed,duration=CRITICAL_TIMING[phase]){
const r=this.criticalRound;if(!r)return;
r.phase=phase;r.startedAt=at;r.until=at+duration
}
criticalMistake(){
const r=this.criticalRound,airborne=r&&r.jumpAt!==null&&!r.landed;
if(r)r.failed=true;
this.fail(airborne?CRITICAL_ART.jumpX:CRITICAL_ART.heroX,CRITICAL_ART.groundY-(airborne?200:70))
}
landCritical(perfect,at=this.elapsed){
const r=this.criticalRound;if(!r)return;
r.perfect=perfect;r.strike=perfect;r.landFrom=Math.max(0,Math.min(1,(at-r.jumpAt)/CRITICAL_TIMING.rise));
if(!perfect)this.missionEvent('skipStar');
this.setCriticalPhase('land',at)
}
stepCritical(){
if(!this.criticalRound&&this.elapsed>=this.nextSpawn)this.spawnCritical();
for(let i=0;i<6;i++){
const r=this.criticalRound;if(!r||this.elapsed+1e-9<r.until)return;
const at=r.until;
if(r.phase==='fake'){this.success(CRITICAL_ART.heroX,CRITICAL_ART.groundY-70);this.setCriticalPhase('gap',at)}
else if(r.phase==='gap')this.setCriticalPhase('ready',at);
else if(r.phase==='ready'){this.criticalMistake();this.setCriticalPhase('recovery',at)}
else if(r.phase==='rise'){this.setCriticalPhase('wait',at,r.airWait)}
else if(r.phase==='wait')this.setCriticalPhase('finish',at);
else if(r.phase==='finish'){this.criticalMistake();this.landCritical(false,at)}
else if(r.phase==='land'){
r.landed=true;r.landedAt=at;this.criticalParticles(r.perfect?CRITICAL_ART.strikeX:CRITICAL_ART.missX,CRITICAL_ART.groundY);
if(r.perfect){this.success(CRITICAL_ART.dummyX-10,CRITICAL_ART.groundY-95,true);this.perfectStar=.8;this.criticalParticles(CRITICAL_ART.dummyX,CRITICAL_ART.groundY-100,true)}
this.setCriticalPhase('recovery',at)
}else if(r.phase==='recovery'&&r.landed)this.setCriticalPhase('reset',at);
else{this.criticalRound=null;this.nextSpawn=at+CRITICAL_TIMING.interval;return}
}
}
criticalParticles(x,y,straw=false){
if(!this.motion)return;
for(let i=0;i<8;i++)this.effects.spawn({type:straw?'straw':'dust',x,y,vx:(i-3.5)*(straw?37:26),vy:-35-(i%3)*35,life:straw?.65:.4,maxLife:straw?.65:.4,angle:i*.8})
}
inputCritical(action){
if(action!=='hit')return;
const misses=this.misses;this.stepCritical();
if(this.misses!==misses)return;
const r=this.criticalRound;
if(r?.phase==='ready'){
r.jumpAt=this.elapsed;r.airWait=CRITICAL_TIMING.waitMin+Math.random()*(CRITICAL_TIMING.waitMax-CRITICAL_TIMING.waitMin);
this.success(CRITICAL_ART.heroX,CRITICAL_ART.groundY-70);this.criticalParticles(CRITICAL_ART.heroX,CRITICAL_ART.groundY);this.setCriticalPhase('rise')
}else if(r?.phase==='finish')this.landCritical(true);
else{
this.criticalMistake();
if(!r)return;
if(r.phase==='rise'||r.phase==='wait')this.landCritical(false);
else if(r.phase==='land'&&r.perfect){r.perfect=false;this.missionEvent('skipStar')}
else if(r.phase==='fake'||r.phase==='gap')this.setCriticalPhase('recovery')
}
}

step(dt){
if(this.done)return;
this.tutorialRemaining=Math.max(0,this.tutorialRemaining-dt);
if(this.countdown>0){const wait=Math.min(this.countdown,dt);this.countdown=Math.max(0,this.countdown-wait);dt-=wait;if(dt<1e-9)return}
const missionBefore=this.missionNumber,missesBefore=this.misses;
this.elapsed+=dt;
this.phase+=dt*TRAINING_PACE;
this.comboFeedback=Math.max(0,this.comboFeedback-dt);
this.cooldown=Math.max(0,this.cooldown-dt);
this.attack=Math.max(0,this.attack-dt*4);
this.hit=Math.max(0,this.hit-dt*4);
this.blockPulse=Math.max(0,this.blockPulse-dt*4);
this.flash=Math.max(0,this.flash-dt*5);
this.lastTextLife=Math.max(0,this.lastTextLife-dt);
this.goalFeedback=Math.max(0,this.goalFeedback-dt);
this.missionFeedback=Math.max(0,this.missionFeedback-dt);
this.throwPose=Math.max(0,this.throwPose-dt*3);
this.perfectStar=Math.max(0,this.perfectStar-dt);
if(this.kind==='dodge')this.stepDodge();
if(this.kind==='block')this.stepBlock(dt);
if(this.kind==='crit')this.stepCritical();
if(!this.streak&&this.elapsed>=60){this.elapsed=60;this.done=true;return}
if(this.kind==='strength'&&this.elapsed>=this.nextSpawn){
this.spawnStrength(Math.floor(Math.random()*3),Math.random()<.22);
this.nextSpawn=this.elapsed+1.25/(TRAINING_PACE*(1+Math.min(this.elapsed,120)/180))
}
for(const o of this.objects.items){
if(!o.active||this.kind==='block')continue;
if(o.kick){o.y+=o.speed*dt;if(o.y>490){o.active=false;this.missionEvent('skipStar')}}
else{
if(this.kind==='strength'&&o.duration){
o.age+=dt;
const u=o.age/o.duration;
o.x=1110-680*u;
o.y=o.startY+(o.targetY-o.startY)*u-4*o.arc*u*(1-u)
}else o.x-=o.speed*dt;
if(this.kind==='strength'&&o.x<345){o.active=false;this.fail(350,o.y)}
}
}
if(this.missionNumber===missionBefore&&this.misses===missesBefore)this.missionEvent('time',dt);
for(const e of this.effects.items){if(!e.active)continue;e.life-=dt;e.x+=e.vx*dt;e.y+=e.vy*dt;e.vy+=100*dt;if(e.life<=0)e.active=false}
}
input(action){if(this.done||this.countdown>0||this.kind==='block')return;if(this.kind==='dodge'){this.inputDodge(action);return}if(this.kind==='crit'){this.inputCritical(action);return}if(this.cooldown>0)return;this.cooldown=.23;this.attack=1;this.action=action;if(this.kind==='strength'){const kick=action==='kick';const lane=Number(action);const o=this.objects.items.find(o=>o.active&&(kick?o.kick&&Math.abs(o.y-425)<65:!o.kick&&o.lane===lane&&Math.abs(o.x-430)<85&&Math.abs(o.y-(210+lane*130))<65));if(o){o.active=false;this.success(o.x,o.y,o.kick)}}else if(this.kind==='accuracy'){const x=700+Math.sin(this.phase*2.6)*305;if(Math.abs(x-this.target)<60){this.success(x,345);this.target=500+Math.random()*400}else this.fail(x,345)}}
bankGoals(){
this.goalTarget=trainingGoalTarget(this.kind,this.startingStat+this.goals+this.missionStats);
while(this.goalProgress+1e-9>=this.goalTarget){
this.goalProgress=Math.max(0,this.goalProgress-this.goalTarget);this.goals++;
if(this.kind==='strength')this.bonusStrength++;else if(this.kind==='accuracy')this.bonusAccuracy++;else if(this.kind==='dodge')this.bonusDodge++;else if(this.kind==='block')this.bonusBlock++;else this.bonusCrit++;
this.bonusXp+=6;this.goalFeedback=1.8;this.savePending=true;
this.goalTarget=trainingGoalTarget(this.kind,this.startingStat+this.goals+this.missionStats)
}
}
missionEvent(event,value=1){
if(this.done)return;
const mission=trainingMission(this.kind,this.missionNumber);let eligible=false;
if(event==='success')this.missionSuccesses++;
if(mission.type==='unhurt'){
if(event==='contact'){this.missionProgress=0;this.missionSuccesses=0}
else if(event==='time'&&this.missionSuccesses>0)this.missionProgress+=value;
eligible=(event==='success'||event==='time')&&this.missionSuccesses>=2
}else if(mission.type==='perfect'&&event==='star'){this.missionProgress++;eligible=true}
else if(mission.type==='perfectCombo'){if(event==='skipStar')this.missionProgress=0;else if(event==='star'){this.missionProgress++;eligible=true}}
else if(mission.type==='combo'&&(event==='success'||event==='contact')){this.missionProgress=this.combo;eligible=event==='success'}
else if(mission.type==='goals'&&event==='goals'){this.missionProgress+=value;eligible=true}
if(eligible&&this.missionProgress+1e-9>=mission.target){
this.missionStats+=mission.reward;this.missionXp+=mission.reward*6;this.missionsCompleted++;this.missionNumber++;this.missionProgress=0;this.missionSuccesses=0;this.missionFeedback=2;this.missionMessage='';this.savePending=true;this.bankGoals()
}
}
success(x,y,star=false){
if(this.done)return;
const goals=this.goals,mission=this.missionNumber,credits=star?2:1;
for(let i=0;i<credits;i++){
this.hits++;
this.goalProgress+=Math.min(this.combo,4)*trainingYield(this.player,this.kind);this.savePending=true;
this.combo++;this.bestCombo=Math.max(this.combo,this.bestCombo);
this.bankGoals()
}
this.lastText='';this.lastTextLife=0;this.comboFeedback=.42;this.comboStar=star;
this.missionEvent('success');
if(this.missionNumber===mission&&star)this.missionEvent('star');
if(this.missionNumber===mission&&this.goals>goals)this.missionEvent('goals',this.goals-goals);
this.burst(x,y,this.kind==='block'&&!star?'#b5ffec':'#fff0a0');this.feedback(star&&this.kind==='crit'?'star':this.kind==='block'?(star?'star':'block'):'hit')
}
fail(x,y){if(this.done)return;this.misses++;this.combo=1;this.comboFeedback=0;this.comboStar=false;this.missionEvent('contact');this.hit=1;this.flash=1;this.lastText=this.streak?'':'Keep going';this.lastTextLife=this.streak?0:.8;this.burst(x,y,'#ed997b');this.feedback('miss')}
burst(x,y,color){for(let i=0;i<8;i++)this.effects.spawn({type:'spark',x,y,vx:Math.cos(i*Math.PI/4)*140,vy:Math.sin(i*Math.PI/4)*140,life:.5,maxLife:.5,color})}
draw(c,t){if(this.kind==='strength'){drawStrength(c,this,t);return}if(this.kind==='dodge'){drawDodge(c,this,t);return}if(this.kind==='block'){drawBlock(c,this);return}if(this.kind==='crit'){drawCritical(c,this);return}c.save();appearTraining(c,this,290,475,.12);placeSceneHero(c,290,475,HERO_SCENE_ART.trainingScale);hero(c,0,0,.9,this.player.equipment,t,this.attack,this.hit,this.player.scarf);c.restore();c.save();c.font='700 16px "DM Sans",sans-serif';c.textAlign='center';if(this.kind==='accuracy'){c.fillStyle='#355e61';c.fillText('TAP WHEN THE SIGHT CROSSES THE TARGET',750,230);for(const [r,col] of [[65,'#efcf93'],[48,'#d77360'],[29,'#f6e5ac'],[12,'#d77360']])ellipse(c,this.target,345,r,r,col);c.strokeStyle='#456e7380';c.lineWidth=4;c.beginPath();c.moveTo(360,345);c.lineTo(1040,345);c.stroke();const x=700+Math.sin(this.phase*2.6)*305;c.strokeStyle='#173a4b';c.lineWidth=4;c.strokeRect(x-16,329,32,32);c.beginPath();c.moveTo(x,315);c.lineTo(x,375);c.moveTo(x-30,345);c.lineTo(x+30,345);c.stroke()}for(const e of this.effects.items){if(!e.active||!this.player.settings.motion)continue;c.globalAlpha=e.life/e.maxLife;ellipse(c,e.x,e.y,5,5,e.color)}c.globalAlpha=1;if(this.lastTextLife>0){c.font='700 28px "DM Sans",sans-serif';c.fillStyle=this.combo?'#fff7ce':'#944e46';c.strokeStyle='#34626a';c.lineWidth=3;if(this.combo)c.strokeText(this.lastText,720,this.kind==='strength'?575:165);c.fillText(this.lastText,720,this.kind==='strength'?575:165)}c.restore()}
}
