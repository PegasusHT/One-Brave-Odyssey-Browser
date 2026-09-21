import {combatStats,enemyStats,skillEffect,COMBAT_BALANCE,SKILLS,Pool,clamp} from './core.js';
import {hero,enemy,ellipse,HERO_SCENE_ART,ARENA_BATTLE_ART,placeSceneHero} from './art.js';
import {drawArenaHero} from './action-art.js';
const motionPreference=typeof matchMedia==='function'?matchMedia('(prefers-reduced-motion: reduce)'):null;
export class Battle{
constructor(player,stage,feedback,survival=false){this.player=player;this.stage=stage;this.survival=survival;this.wavesCleared=0;this.wave=0;this.stats=combatStats(player,stage);this.hp=this.stats.hp;this.foe=enemyStats(stage,0);this.enemyHp=this.foe.hp;this.time=0;this.nextTurn=1;this.turn=0;this.attacks=0;this.done=false;this.won=false;this.rewarded=false;this.outcomeElapsed=0;this.outcomeDuration=1.65;this.event=0;this.heroAttack=0;this.normalAttackAt=-Infinity;this.enemyAttack=0;this.heroHit=0;this.enemyHit=0;this.ward=0;this.stunTurns=0;this.poison=null;this.tonicUses=0;this.cooldowns=Object.fromEntries([...Object.keys(SKILLS),'tonic'].map(key=>[key,0]));this.effects=new Pool(30);this.feedback=feedback;this.message='Attacks are automatic. Watch for a golden opening.'}
advanceVisuals(dt){
this.heroAttack=Math.max(0,this.heroAttack-dt*3);this.enemyAttack=Math.max(0,this.enemyAttack-dt*3);this.heroHit=Math.max(0,this.heroHit-dt*3);this.enemyHit=Math.max(0,this.enemyHit-dt*3);
for(const effect of this.effects.items){if(!effect.active)continue;effect.life-=dt;effect.y-=40*dt;if(effect.life<=0)effect.active=false}
}
finish(won){
if(this.done)return;
this.done=true;this.won=won;this.outcomeElapsed=0;this.event=0;this.poison=null;this.stunTurns=0;this.ward=0;this.message=won?'Victory!':'Defeated';
}
advanceOutcome(dt){
if(!this.done)return;
const elapsed=Math.min(Math.max(0,dt),Math.max(0,this.outcomeDuration-this.outcomeElapsed));
this.outcomeElapsed+=elapsed;this.time+=elapsed;this.advanceVisuals(elapsed)
}
step(dt){
if(this.done)return;
this.time+=dt;this.advanceVisuals(dt);this.event=Math.max(0,this.event-dt);
for(const key of Object.keys(this.cooldowns))this.cooldowns[key]=Math.max(0,this.cooldowns[key]-dt);
while(this.poison&&this.poison.wave===this.wave&&this.poison.nextTick<=Math.min(this.time,this.poison.expiresAt)){
const poison=this.poison,wave=this.wave;poison.ticks++;poison.nextTick=poison.startedAt+(poison.ticks+1);this.damageEnemy(poison.damage,'POISON');
if(this.done||this.wave!==wave)return
}
if(this.poison&&this.time>=this.poison.expiresAt)this.poison=null;
if(this.time<this.nextTurn)return;
const wave=this.wave;this.nextTurn=this.time+1.05;
if(this.turn%2===0){
this.attacks++;this.heroAttack=1;this.normalAttackAt=this.time;
if(Math.random()<this.stats.hit){
const crit=Math.random()<this.stats.crit;this.damageEnemy(Math.round(this.stats.attack*(crit?COMBAT_BALANCE.criticalMultiplier:1)),crit?'CRITICAL!':'');
if(!this.done&&this.wave===wave&&this.attacks%3===0){this.event=1.3;this.message='An opening! Tap the golden burst.'}
}else{this.pop(980,275,'MISS','#e6e7cd');this.message='Your strike missed. Accuracy training improves hit chance.'}
}else if(this.stunTurns>0){this.stunTurns--;this.pop(980,275,'STUNNED','#ffe397');this.message='Bash stopped the enemy attack.'}
else{
this.enemyAttack=1;
if(Math.random()<this.stats.dodge){this.pop(410,275,'DODGE','#99f0cf');this.message='A clean dodge.'}
else{
const blocked=Math.random()<this.stats.block,amount=Math.max(1,Math.round(this.foe.attack*(1-(this.stats.mitigation??0))*(blocked?1-(this.stats.guardReduction??.5):1)*(this.ward>0?.5:1)));
if(this.ward>0)this.ward--;
this.hp=Math.max(0,this.hp-amount);this.heroHit=1;this.pop(410,275,(blocked?'BLOCK ':'−')+amount,blocked?'#a6eacf':'#ffb5a0');this.feedback('miss');
if(this.hp<=0)this.finish(false)
}
}
if(this.wave===wave)this.turn++
}
pop(x,y,text,color){this.effects.spawn({x,y,text,color,life:1})}
damageEnemy(amount,label=''){
if(this.done)return;
this.enemyHp=Math.max(0,this.enemyHp-amount);this.enemyHit=1;this.pop(980,275,label?label+' −'+amount:'−'+amount,label?'#ffe397':'#fff8d6');this.feedback('hit');
if(this.enemyHp!==0)return;
this.wavesCleared++;this.event=0;this.poison=null;this.stunTurns=0;
if(this.wave>=2&&!this.survival){this.finish(true);return}
this.wave++;this.foe=enemyStats(this.stage,this.wave%3,this.survival?this.wave:0);this.enemyHp=this.foe.hp;this.nextTurn=this.time+1.8;this.enemyAttack=0;this.enemyHit=0;this.message=this.survival?'Wave '+(this.wave+1)+' · '+this.wavesCleared+' cleared':'Wave '+(this.wave+1)+' of 3';this.turn=0
}
input(action){
if(this.done)return false;
if(action==='event'){if(this.event<=0)return false;this.event=0;this.heroAttack=1;this.normalAttackAt=this.time;this.damageEnemy(Math.round(this.stats.attack*1.25),'PERFECT');return true}
if(action==='tonic'){
if(this.tonicUses>=2||this.player.potions<=0||this.cooldowns.tonic>0||this.hp>=this.stats.hp)return false;
this.player.potions--;this.tonicUses++;this.hp=Math.min(this.stats.hp,this.hp+Math.round(this.stats.hp*.45));this.cooldowns.tonic=10;this.pop(410,275,'+45% HP','#a1edbf');this.feedback('heal');return true
}
if(!this.player.skills.includes(action)||!SKILLS[action]||this.cooldowns[action]>0)return false;
if(action==='mend'&&this.hp>=this.stats.hp)return false;
const effect=skillEffect(this.player,action);if(!effect)return false;
this.cooldowns[action]=effect.cooldown;
if(action==='flare'){this.heroAttack=1;this.normalAttackAt=this.time;this.damageEnemy(Math.round(this.stats.attack*effect.damage),'SUNFLARE')}
if(action==='bash'){
const wave=this.wave;this.heroAttack=1;this.normalAttackAt=this.time;this.damageEnemy(Math.round(this.stats.attack*effect.damage),'BASH');
if(!this.done&&this.wave===wave){this.stunTurns=1;this.message='Enemy stunned. Its next attack is stopped.'}
}
if(action==='poison'){this.poison={wave:this.wave,damage:Math.max(1,Math.round(this.stats.attack*effect.tickDamage)),startedAt:this.time,ticks:0,nextTick:this.time+1,expiresAt:this.time+effect.duration};this.pop(980,275,'POISONED','#b8ee87');this.message='Poison deals damage every second.';this.feedback('hit')}
if(action==='ward'){this.ward=effect.guardHits;this.pop(410,275,'GUARDED','#a2e8e5');this.feedback('heal')}
if(action==='mend'){this.hp=Math.min(this.stats.hp,this.hp+Math.round(this.stats.hp*effect.heal));this.pop(410,275,'+'+Math.round(effect.heal*100)+'% HP','#a1edbf');this.feedback('heal')}
return true
}
draw(c,t){
c.save();c.translate(0,ARENA_BATTLE_ART.offsetY);
c.save();placeSceneHero(c,410,500,HERO_SCENE_ART.arenaScale);c.translate(-410,-500);
if(!drawArenaHero(c,this))hero(c,410,500,1.65,this.player.equipment,t,this.heroAttack,this.heroHit,this.player.scarf);
if(this.ward>0){c.strokeStyle='#9cf4e6aa';c.lineWidth=5;c.beginPath();c.ellipse(430,375,95,145,0,-1.5,1.5);c.stroke()}
c.restore();
const motion=this.player.settings.motion&&!motionPreference?.matches,enemyX=980-this.enemyAttack*26;
if(this.poison)ellipse(c,enemyX,479,105,24,'#91d57855');
if(this.done&&this.won){
const fall=motion?clamp(this.outcomeElapsed/.65,0,1):1,ease=fall*fall*(3-2*fall);
c.save();c.translate(enemyX,495);c.rotate(ease*.8);c.scale(1,1-ease*.35);c.globalAlpha=1-ease*.8;enemy(c,0,0,1.8,this.foe.type,0,this.enemyHit);c.restore()
}else enemy(c,enemyX,495,1.8,this.foe.type,this.done||!motion?0:t,this.enemyHit);
for(const effect of this.effects.items){if(!effect.active)continue;c.globalAlpha=clamp(effect.life,0,1);c.font='700 28px "DM Sans",sans-serif';c.textAlign='center';c.strokeStyle='#224350';c.lineWidth=5;const y=effect.y-(effect.x===410?158*1.65*(HERO_SCENE_ART.arenaScale-1):0);c.strokeText(effect.text,effect.x,y);c.fillStyle=effect.color;c.fillText(effect.text,effect.x,y)}c.restore()
}
}
