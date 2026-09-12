import test from 'node:test';
import assert from 'node:assert/strict';
import {CRITICAL_TIMING,TRAINING_INTRO,TRAINING_PACE,TRAINING_MISSIONS,BLOCK_RULES,DODGE_TIMING,trainingMission,checkpointTraining,freshPlayer,normalizePlayer,readSave,writeSave,SAVE_KEY,combatStats,addXp,buyItem,upgradeGround,learnSkill,allocateStat,settleTraining,settleBattle,passiveCoins,collectMuseum,upgradeLegacy,Pool} from '../dist/core.js';
import {Training} from '../dist/training.js';
import {Battle} from '../dist/battle.js';
const noop=()=>{};
test('new game has both equipment slots and survives a save round trip',()=>{const p=freshPlayer(1000),m=new Map(),storage={getItem:k=>m.get(k),setItem:(k,v)=>m.set(k,v)};assert.equal(writeSave(storage,p),true);assert.deepEqual(readSave(storage,1000).player,p);assert.equal(combatStats(p).attack,15)});
test('malformed and unavailable storage are handled without crashing',()=>{assert.ok(readSave({getItem:()=>'{'}).warning);assert.equal(writeSave({setItem(){throw Error()}},freshPlayer()),false);const p=normalizePlayer({coins:-10,stats:{strength:NaN},inventory:['weapon_t3'],equipment:{armor:'weapon_t3',weapon:'nope'},skills:['bad'],trainingLevels:{crit:900}});assert.equal(p.coins,0);assert.equal(p.equipment.armor,'armor_t1');assert.equal(p.equipment.weapon,'weapon_t1');assert.equal(p.trainingLevels.crit,5);assert.equal(p.stats.strength,5)});
test('purchases charge once, equip owned items for free and reject wrong ids',()=>{const p=freshPlayer();assert.equal(buyItem(p,'weapon_t2').ok,false);p.coins=200;assert.equal(buyItem(p,'weapon_t2').ok,true);assert.equal(p.coins,20);assert.equal(combatStats(p).attack,24);buyItem(p,'weapon_t1');buyItem(p,'weapon_t2');assert.equal(p.coins,20);assert.equal(buyItem(p,'missing').ok,false)});
test('training upgrades are bounded and speed goal progress without multiplying each goal reward',()=>{
const p=freshPlayer();assert.equal(upgradeGround(p,'strength').ok,true);assert.equal(p.coins,40);assert.equal(p.trainingLevels.strength,2);
const normal=new Training('strength',freshPlayer(),noop),upgraded=new Training('strength',p,noop);
for(let i=0;i<4;i++){normal.success(430,340);upgraded.success(430,340)}
assert.equal(normal.goals,2);assert.equal(upgraded.goals,2);assert.equal(normal.goalProgress,0);assert.equal(upgraded.goalProgress,2.5);
const r=settleTraining(p,upgraded);assert.equal(r.gain,2);assert.equal(r.skill,0);
const snapshot=JSON.stringify(p);assert.equal(settleTraining(p,upgraded),null);assert.equal(JSON.stringify(p),snapshot);
});
test('partial training banks earned stats without a completion bonus',()=>{const p=freshPlayer();const r=settleTraining(p,{kind:'accuracy',hits:12,bestCombo:4,elapsed:12,rewarded:false});assert.equal(r.gain,3);assert.equal(r.skill,0);assert.equal(p.sessions,0)});
test('leveling and skill spending cannot overspend or duplicate',()=>{const p=freshPlayer();assert.equal(addXp(p,150),2);assert.equal(p.level,3);assert.equal(p.statPoints,6);assert.equal(learnSkill(p,'ward').ok,true);assert.equal(learnSkill(p,'ward').ok,false);assert.equal(allocateStat(p,'strength'),true);assert.equal(p.statPoints,5);p.statPoints=0;assert.equal(allocateStat(p,'strength'),false)});
test('arena first clear unlocks next stage, duplicate payout blocked',()=>{const p=freshPlayer(),b={stage:1,rewarded:false};const r=settleBattle(p,b,true);assert.equal(r.coins,48);assert.equal(r.first,true);assert.equal(p.stage,2);assert.deepEqual(p.cleared,[1]);assert.equal(settleBattle(p,b,true),null);assert.equal(settleBattle(p,{stage:1},true).coins,31);assert.equal(settleBattle(p,{stage:2},false).coins,0)});
test('survival banks cleared-wave rewards when retreating',()=>{const p=freshPlayer();const r=settleBattle(p,{stage:12,survival:true,wavesCleared:4},false);assert.equal(r.coins,60);assert.equal(p.stage,1)});
test('museum income is capped and collected once; expansion settles old rate',()=>{const p=freshPlayer(0);p.museum=1;p.cleared=[1,2];assert.equal(passiveCoins(p,60000),2);assert.equal(passiveCoins(p,100000000),960);assert.equal(collectMuseum(p,60000),2);assert.equal(collectMuseum(p,60000),0);p.coins=1000;upgradeLegacy(p,'museum',120000);assert.equal(p.lastCollection,120000);assert.equal(p.museum,2)});
test('object pools reuse slots and respect their fixed capacity',()=>{const p=new Pool(1);const a=p.spawn({x:1});assert.equal(p.spawn({x:2}),null);a.active=false;assert.equal(p.spawn({x:3}),a);assert.equal(a.x,3)});
test('all five trainers accept correct inputs and penalize mistakes',()=>{const p=freshPlayer();for(const kind of ['strength','accuracy','block','crit','dodge']){const t=new Training(kind,p,noop);t.countdown=0;if(kind==='strength'){t.objects.spawn({x:430,y:340,lane:1,kick:false,speed:0});t.input('1')}if(kind==='block'){t.nextSpawn=999;const o=t.spawnBlock(0);o.distance=BLOCK_RULES.shieldRadius;o.speed=0;t.step(.01)}if(kind==='accuracy'){t.phase=0;t.target=700;t.input('tap')}if(kind==='crit'){t.spawnCritical(false);t.input('hit')}if(kind==='dodge'){const a=t.spawnDodge(0);t.step(a.impactAt-.2);t.input('tuck');t.step(.2)}assert.equal(t.hits,1,kind);assert.equal(t.combo,t.streak?2:1,kind);t.cooldown=0;if(kind==='dodge'){const a=t.spawnDodge(2);t.step(a.impactAt-t.elapsed+.01)}else if(kind==='accuracy'){t.target=1000;t.input('tap')}else if(kind==='crit'){t.spawnCritical(true);t.input('hit')}else if(kind==='strength'){t.objects.spawn({x:344,y:340,lane:1,kick:false,speed:0});t.step(.01)}else{const o=t.spawnBlock(Math.PI);o.distance=52;o.speed=0;t.step(.01)}assert.equal(t.combo,t.streak?1:0,kind)}});
test('training timer stops cleanly and countdown prevents early scoring',()=>{const t=new Training('accuracy',freshPlayer(),noop);t.input('tap');assert.equal(t.hits,0);for(let i=0;i<661;i++)t.step(.05);assert.equal(t.done,true);assert.equal(t.elapsed,30)});
test('battle skill unlocks, cooldowns, healing and consumables are enforced',()=>{const p=freshPlayer();const b=new Battle(p,1,noop);assert.equal(b.input('flare'),false);p.skills.push('flare','mend','ward');assert.equal(b.input('mend'),false);b.hp=30;assert.equal(b.input('mend'),true);assert.equal(b.input('mend'),false);assert.equal(b.input('ward'),true);assert.equal(b.ward,3);assert.equal(b.input('tonic'),true);assert.equal(p.potions,1);assert.equal(b.input('tonic'),false)});
test('arena cannot advance beyond its third wave and survival continues',()=>{const p=freshPlayer();const b=new Battle(p,1,noop);for(let i=0;i<3;i++)b.damageEnemy(10000);assert.equal(b.done,true);assert.equal(b.won,true);assert.equal(b.wavesCleared,3);const s=new Battle(p,12,noop,true);for(let i=0;i<5;i++)s.damageEnemy(10000);assert.equal(s.done,false);assert.equal(s.wave,5)});

test('Strength stays active and keeps spawning beyond thirty seconds with bounded speed and pools',()=>{
const t=new Training('strength',freshPlayer(),noop);
t.input('1');assert.equal(t.hits,0);
for(let i=0;i<2481;i++)t.step(.05);
assert.equal(t.done,false);assert.ok(t.elapsed>120);
const next=t.nextSpawn;
for(let i=0;i<30;i++)t.step(.05);
assert.ok(t.nextSpawn>next);assert.equal(t.objects.items.length,20);assert.equal(t.effects.items.length,32);
const o=t.spawnStrength(0);assert.ok(o.speed<=350*TRAINING_PACE*(1+120/180));
});

test('Strength tutorial flag defaults safely for older saves and survives normalization and storage',()=>{
assert.equal(normalizePlayer({}).tutorials.strength,false);
assert.equal(normalizePlayer({tutorials:{strength:'true'}}).tutorials.strength,false);
const p=freshPlayer(1000),m=new Map(),storage={getItem:k=>m.get(k),setItem:(k,v)=>m.set(k,v)};
const first=new Training('strength',p,noop);assert.equal(first.tutorialRemaining,4);
p.tutorials.strength=true;writeSave(storage,p);
const saved=readSave(storage,1000).player;assert.equal(saved.tutorials.strength,true);
assert.equal(new Training('strength',saved,noop).tutorialRemaining,0);
for(let i=0;i<81;i++)first.step(.05);
assert.equal(first.tutorialRemaining,0);
});

test('high fruit follows an exact parabola with frame-independent coordinates and can be slashed',()=>{
const make=()=>{const t=new Training('strength',freshPlayer(),noop);t.countdown=0;t.nextSpawn=999;return[t,t.spawnStrength(0)]};
const [t,o]=make();assert.equal(o.x,1110);assert.equal(o.y,340);
const duration=o.duration;t.step(duration/2);
assert.equal(o.x,770);assert.equal(o.y,175);
t.step(duration/2);assert.equal(o.x,430);assert.equal(o.y,210);
t.input('1');assert.equal(t.hits,0);assert.equal(o.active,true);
t.cooldown=0;t.input('0');assert.equal(t.hits,1);assert.equal(o.active,false);
const [fine,f]=make(),[coarse,c]=make();
for(let i=0;i<100;i++)fine.step(duration/100);
for(let i=0;i<20;i++)coarse.step(duration/20);
assert.ok(Math.abs(f.x-c.x)<1e-8);assert.ok(Math.abs(f.y-c.y)<1e-8);
});

test('Strength hit detection uses actual height and rear sparks remain independently hittable',()=>{
const t=new Training('strength',freshPlayer(),noop);t.countdown=0;
t.objects.spawn({x:430,y:340,lane:0,kick:false});t.input('0');assert.equal(t.hits,0);
t.cooldown=0;t.objects.spawn({x:170,y:425,lane:1,kick:true});t.input('kick');assert.equal(t.hits,2);assert.equal(t.combo,3);
});

test('weighted stat goals retain points on contact, reset the multiplier to one, and pay fixed stats',()=>{
for(const kind of ['strength','dodge','block','crit']){
const p=freshPlayer(),t=new Training(kind,p,noop);assert.equal(t.combo,1);
t.success(430,340);assert.equal(t.combo,2);assert.equal(t.goalProgress,1);
t.success(430,340);assert.equal(t.combo,3);assert.equal(t.goalProgress,3);
t.fail(430,340);assert.equal(t.combo,1);assert.equal(t.goalProgress,3);
t.success(430,340);assert.equal(t.combo,2);assert.equal(t.goals,1);assert.equal(t.goalProgress,0);assert.equal(t.goalTarget,6);
const r=settleTraining(p,t);assert.equal(r.gain,1);assert.equal(r.xp,15);assert.equal(r.bestCombo,3);assert.equal(r.skill,0);
}
});
test('Town and pagehide cash-out orders are idempotent and stop the Strength simulation',()=>{
for(const elapsed of [0,8,31,180])for(const order of ['town-pagehide','pagehide-town']){
const p=freshPlayer(),t=new Training('strength',p,noop);t.countdown=0;t.elapsed=elapsed;
for(let i=0;i<8;i++)t.success(430,340);
const r=settleTraining(p,t);assert.equal(r.gain,4,order);assert.equal(r.xp,48);assert.equal(r.skill,0);assert.equal(p.skillPoints,1);assert.equal(p.sessions,1);assert.equal(t.done,true);
const snapshot=JSON.stringify(p);assert.equal(settleTraining(p,t),null);assert.equal(settleTraining(p,t),null);t.step(1);t.input('1');assert.equal(JSON.stringify(p),snapshot);assert.equal(t.elapsed,elapsed);
}
const p=freshPlayer(),empty=new Training('strength',p,noop);assert.equal(settleTraining(p,empty).xp,0);assert.equal(p.sessions,0);
});

test('Accuracy retains timed completion and its existing skill reward',()=>{
for(const kind of ['accuracy']){
const p=freshPlayer(),t=new Training(kind,p,noop);t.hits=8;
for(let i=0;i<661;i++)t.step(.05);
assert.equal(t.done,true,kind);assert.equal(t.elapsed,30);assert.equal(settleTraining(p,t).skill,1);assert.equal(p.sessions,1);
}
});

test('Strength layout keeps the right controller cluster separate and every control in bounds',async()=>{
const {strengthControlRects}=await import('../dist/strength-layout.js');
for(const [width,height] of [[844,390],[667,375],[568,320]]){
const rects=strengthControlRects(width,height),{kick,high,low,mid}=rects;
assert.ok(kick.x<width*.2);assert.ok(high.y+high.height<=low.y-7);assert.ok(low.x+low.width<=mid.x-7);
for(const r of Object.values(rects)){assert.ok(r.width>=52&&r.height>=52);assert.ok(r.x>=0&&r.y>=0&&r.x+r.width<=width&&r.y+r.height<=height)}
}
});

test('Strength layout projects fruit from the partner hand to the slash point while preserving the high arc',async()=>{
const {STRENGTH_LAYOUT:layout,strengthPoint}=await import('../dist/strength-layout.js');
const origin=strengthPoint(1110,340),target=strengthPoint(430,210);
assert.ok(Math.abs(origin.x-(layout.partner.x*1400-80*layout.partner.scale))<1e-8);
assert.ok(Math.abs(origin.y-(layout.partner.y*700-170*layout.partner.scale))<1e-8);
assert.ok(Math.abs(target.x-(layout.hero.x*1400+95*layout.hero.scale/1.35))<1e-8);
assert.ok(origin.x>target.x);
const points=[0,.25,.5,.75,1].map(u=>strengthPoint(1110-680*u,340-130*u-400*u*(1-u)));
assert.ok(points[2].y<points[0].y&&points[2].y<points[4].y);
const second=i=>points[i+1].y-2*points[i].y+points[i-1].y;
assert.ok(Math.abs(second(1)-second(2))<1e-8);assert.ok(Math.abs(second(2)-second(3))<1e-8);
});

test('Mid and Low fruit stay horizontal at their launch height and remain hittable at either frame rate',async()=>{
const {strengthPoint}=await import('../dist/strength-layout.js');
for(const lane of [1,2])for(const frames of [20,100]){
const t=new Training('strength',freshPlayer(),noop);t.countdown=0;t.nextSpawn=999;
const o=t.spawnStrength(lane),height=lane===1?340:470,screenY=strengthPoint(o.x,o.y).y;
assert.equal(o.y,height);assert.equal(o.arc,0);assert.equal(t.throwLane,lane);assert.equal(t.throwPose,1);
for(let i=0;i<frames;i++){t.step(o.duration/frames);assert.equal(o.y,height);assert.ok(Math.abs(strengthPoint(o.x,o.y).y-screenY)<1e-8)}
assert.ok(Math.abs(o.x-430)<1e-8);assert.equal(t.throwPose,0);
t.input(String(lane));assert.equal(t.hits,1);assert.equal(o.active,false);
}
});

test('Strength only penalizes orange contact; empty swings and skipped stars preserve earned progress',()=>{
const t=new Training('strength',freshPlayer(),noop);t.countdown=0;t.nextSpawn=999;
for(let i=0;i<5;i++)t.success(430,340);
const earned={hits:t.hits,combo:t.combo,goals:t.goals,bonusStrength:t.bonusStrength,bonusXp:t.bonusXp,goalProgress:t.goalProgress};
for(const action of ['0','1','2','kick']){t.cooldown=0;t.input(action)}
t.objects.spawn({x:170,y:489,kick:true,speed:100});t.step(.02);
assert.equal(t.misses,0);assert.equal(t.hit,0);
for(const [key,value] of Object.entries(earned))assert.equal(t[key],value,key);
t.objects.spawn({x:346,y:340,lane:1,kick:false,speed:100});t.step(.02);
assert.equal(t.misses,1);assert.equal(t.combo,1);assert.equal(t.goalProgress,earned.goalProgress);
assert.equal(t.hits,earned.hits);assert.equal(t.bonusStrength,earned.bonusStrength);assert.equal(t.bonusXp,earned.bonusXp);
});

test('Dodge requires tuck for high, back for mid and jump for low, resolving each attack once',()=>{
for(const [lane,action] of [[0,'tuck'],[1,'back'],[2,'jump']])for(const frames of [20,100]){
const t=new Training('dodge',freshPlayer(),noop);t.countdown=0;
const a=t.spawnDodge(lane);
for(let i=0;i<frames;i++)t.step((a.impactAt-.2)/frames);
t.input(action);assert.equal(t.hits,0);
t.step(.2+1e-8);assert.equal(t.hits,1);assert.equal(t.combo,2);assert.equal(t.misses,0);assert.equal(t.perfectDodges,0);
t.step(.1);assert.equal(t.hits,1);assert.equal(t.stickAttack.resolved,true);
}
});

test('Dodge timing boundaries distinguish early, safe, perfect, wrong and late moves',()=>{
for(const [lead,action,hits,misses,perfect] of [[.5,'tuck',0,1,0],[DODGE_TIMING.window,'tuck',1,0,0],[.2,'tuck',1,0,0],[.181,'tuck',1,0,0],[.15,'tuck',2,0,1],[DODGE_TIMING.perfect,'tuck',2,0,1],[.05,'tuck',2,0,1],[.05,'jump',0,1,0]]){
const t=new Training('dodge',freshPlayer(),noop);t.countdown=0;const a=t.spawnDodge(0);
t.step(a.impactAt-lead);t.input(action);assert.equal(t.misses,0);
t.step(lead+1e-8);assert.equal(t.hits,hits);assert.equal(t.misses,misses);assert.equal(t.perfectDodges,perfect);
if(perfect){assert.ok(t.perfectStar>0);t.step(.81);assert.equal(t.perfectStar,0)}
}
const t=new Training('dodge',freshPlayer(),noop);t.countdown=0;const a=t.spawnDodge(1);
t.step(a.impactAt+.01);t.input('back');t.step(.01);assert.equal(t.misses,1);assert.equal(t.hits,0);
});

test('Dodge countdown, invalid inputs and cooldown prevent scoring or stacking evasions',()=>{
const t=new Training('dodge',freshPlayer(),noop);t.input('tuck');assert.equal(t.dodgeAt,-Infinity);t.step(TRAINING_INTRO);assert.equal(t.stickAttack,null);
for(const action of ['0','kick','tap',''])t.input(action);
assert.equal(t.dodgeAt,-Infinity);assert.equal(t.cooldown,0);
const a=t.spawnDodge(0);t.step(a.impactAt-.08);t.input('jump');t.input('tuck');t.input('back');
assert.equal(t.action,'jump');t.step(.081);assert.equal(t.hits,0);assert.equal(t.misses,1);
t.step(DODGE_TIMING.cooldown);t.input('tuck');assert.equal(t.action,'tuck');assert.equal(t.hits,0);
});

test('Perfect Dodge stars reward an extra hit just like Strength stars and bank only once',()=>{
const p=freshPlayer(),t=new Training('dodge',p,noop);t.countdown=0;
for(let i=0;i<2;i++){const a=t.spawnDodge(1);t.step(a.impactAt-t.elapsed-.08);t.input('back');t.step(.081)}
assert.equal(t.hits,4);assert.equal(t.combo,5);assert.equal(t.perfectDodges,2);assert.equal(t.goals,2);assert.equal(t.goalTarget,8);
assert.equal(t.bonusDodge,2);assert.equal(t.bonusXp,12);assert.equal(t.bonusStrength,0);
const a=t.spawnDodge(2);t.step(a.impactAt-t.elapsed+.01);assert.equal(t.combo,1);assert.equal(t.goalProgress,0);assert.equal(t.hits,4);assert.equal(t.bonusDodge,2);
const r=settleTraining(p,t);assert.equal(r.gain,2);assert.equal(r.xp,24);assert.equal(r.skill,0);assert.equal(r.perfectDodges,2);assert.equal(p.stats.dodge,7);assert.equal(p.stats.strength,5);assert.equal(p.sessions,1);
const saved=JSON.stringify(p),elapsed=t.elapsed;t.step(1);t.input('tuck');assert.equal(t.elapsed,elapsed);assert.equal(settleTraining(p,t),null);assert.equal(JSON.stringify(p),saved);
const boundary=new Training('dodge',freshPlayer(),noop);boundary.countdown=0;
for(let i=0;i<3;i++)boundary.success(560,350);
const strike=boundary.spawnDodge(0);boundary.step(strike.impactAt-.08);boundary.input('tuck');boundary.step(.081);
assert.equal(boundary.lastText,'');assert.equal(boundary.comboFeedback,.42);assert.equal(boundary.comboStar,true);assert.equal(boundary.goalProgress,5);assert.equal(boundary.perfectDodges,1);
const upgraded=freshPlayer();upgraded.trainingLevels.dodge=5;
assert.equal(settleTraining(upgraded,{kind:'dodge',hits:4,bestCombo:4,bonusDodge:1,bonusXp:6,elapsed:8}).gain,1);
});

test('Dodge continues beyond two minutes with one stick attack, capped cadence and bounded effects',()=>{
const t=new Training('dodge',freshPlayer(),noop);
for(let i=0;i<3100;i++)t.step(.05);
assert.equal(t.done,false);assert.ok(t.elapsed>150);assert.ok(t.misses>60);assert.equal(t.objects.items.filter(o=>o.active).length,0);assert.equal(t.effects.items.length,32);
const first=t.spawnDodge(0);t.elapsed+=300;const later=t.spawnDodge(1);
assert.equal(first.windup,later.windup);assert.equal(first.strike,later.strike);
});

test('Dodge first-visit tutorial saves independently from Strength and defaults safely for old saves',()=>{
assert.deepEqual(normalizePlayer({tutorials:{strength:true,dodge:'true'}}).tutorials,{strength:true,dodge:false,block:false,crit:false});
const p=freshPlayer(1000),m=new Map(),storage={getItem:k=>m.get(k),setItem:(k,v)=>m.set(k,v)};
assert.equal(new Training('dodge',p,noop).tutorialRemaining,4);p.tutorials.dodge=true;writeSave(storage,p);
const saved=readSave(storage,1000).player;assert.equal(new Training('dodge',saved,noop).tutorialRemaining,0);assert.equal(new Training('strength',saved,noop).tutorialRemaining,4);
});

test('ordinary actions add one multiplier step, while all four practice stars take ×4 to ×6',()=>{
for(const kind of ['strength','dodge','block','crit']){
const t=new Training(kind,freshPlayer(),noop);t.countdown=0;t.nextSpawn=999;
for(let i=0;i<3;i++)t.success(430,340);
assert.equal(t.combo,4);assert.equal(t.goalProgress,2);assert.equal(t.goals,1);
if(kind==='strength'){t.objects.spawn({x:170,y:425,kick:true});t.input('kick')}
else if(kind==='block'){const o=t.spawnBlock(0,true);o.distance=52;o.speed=0;t.step(.01)}
else if(kind==='crit')t.success(650,340,true);
else{const a=t.spawnDodge(0);t.step(a.impactAt-.15);t.input('tuck');t.step(.151)}
assert.equal(t.combo,6);assert.equal(t.hits,5);assert.equal(t.goalProgress,5);assert.equal(t.goals,2);
t.fail(430,340);assert.equal(t.combo,1);assert.equal(t.goalProgress,5);
}
});

test('mission types rotate independently, raise their targets each cycle, and increase payouts with number',()=>{
for(const [kind,types] of [['strength',['unhurt','perfect','perfectCombo','combo','goals']],['dodge',['unhurt','perfect','goals','combo']],['block',['unhurt','perfect','goals','combo']],['crit',['unhurt','perfect','goals','combo']]]){
for(let i=0;i<types.length;i++){
const first=trainingMission(kind,i+1),next=trainingMission(kind,i+1+types.length);
assert.equal(first.type,types[i]);assert.equal(next.type,types[i]);assert.ok(next.target>first.target);assert.ok(next.reward>first.reward);
}
assert.equal(trainingMission(kind,1).target,6);assert.equal(trainingMission(kind,2).target,5);
}
assert.equal(trainingMission('strength',3).target,5);assert.equal(trainingMission('strength',4).target,12);assert.equal(trainingMission('strength',5).target,3);
assert.equal(trainingMission('dodge',3).target,3);assert.equal(trainingMission('dodge',4).target,12);
});

test('avoid-hit missions count active time only and reset on contact without wiping main goal points',()=>{
const t=new Training('strength',freshPlayer(),noop);t.nextSpawn=999;
t.step(TRAINING_INTRO);assert.equal(t.missionProgress,0);t.step(4);assert.equal(t.missionProgress,4);
t.success(430,340);t.fail(430,340);assert.equal(t.missionProgress,0);assert.equal(t.goalProgress,1);
t.step(5.99);assert.equal(t.missionNumber,1);t.step(.01);assert.equal(t.missionNumber,2);assert.equal(t.missionProgress,0);assert.equal(t.missionStats,1);
settleTraining(t.player,t);t.step(10);assert.equal(t.missionNumber,2);
});

test('perfect missions count stars once, while only skipped stars break the consecutive-star mission',()=>{
for(const kind of ['strength','dodge','block','crit']){
const p=freshPlayer();p.trainingMissions[kind]=2;const t=new Training(kind,p,noop);
for(let i=0;i<4;i++){t.success(430,340,true);t.success(430,340);t.fail(430,340)}
assert.equal(t.missionProgress,4);assert.equal(t.missionNumber,2);t.success(430,340,true);assert.equal(t.missionNumber,3);assert.equal(t.missionProgress,0);assert.equal(t.missionStats,2);
}
const p=freshPlayer();p.trainingMissions.strength=3;const t=new Training('strength',p,noop);t.countdown=0;t.nextSpawn=999;
for(let i=0;i<4;i++)t.success(170,425,true);
t.fail(430,340);assert.equal(t.missionProgress,4);
const kept=t.goalProgress,combo=t.combo;
t.objects.spawn({x:170,y:489,kick:true,speed:100});t.step(.02);
assert.equal(t.missionProgress,0);assert.equal(t.goalProgress,kept);assert.equal(t.combo,combo);assert.equal(t.misses,1);
for(let i=0;i<5;i++)t.success(170,425,true);
assert.equal(t.missionNumber,4);assert.equal(t.missionStats,3);assert.equal(t.missionsCompleted,1);
});

test('combo missions require reaching the requested multiplier and stat-up missions count completed main goals',()=>{
for(const [kind,comboNumber,goalNumber] of [['strength',4,5],['dodge',4,3],['block',4,3],['crit',4,3]]){
const p=freshPlayer();p.trainingMissions[kind]=comboNumber;const t=new Training(kind,p,noop);
for(let i=0;i<5;i++)t.success(430,340);
t.fail(430,340);assert.equal(t.missionProgress,1);assert.equal(t.missionNumber,comboNumber);
for(let i=0;i<10;i++)t.success(430,340);
assert.equal(t.combo,11);assert.equal(t.missionNumber,comboNumber);t.success(430,340,true);
assert.equal(t.combo,13);assert.equal(t.missionNumber,comboNumber+1);assert.equal(t.missionProgress,0);
const p2=freshPlayer();p2.trainingMissions[kind]=goalNumber;const goals=new Training(kind,p2,noop);
for(let i=0;i<4;i++)goals.success(430,340);
assert.equal(goals.goals,2);assert.equal(goals.missionProgress,2);assert.equal(goals.missionNumber,goalNumber);
goals.success(430,340,true);assert.equal(goals.goals,3);assert.equal(goals.missionNumber,goalNumber+1);assert.equal(goals.missionProgress,0);
}
});

test('mission number and rewards checkpoint together, never pay twice, and partial progress restarts on entry',()=>{
const p=freshPlayer(1000),t=new Training('strength',p,noop),m=new Map(),storage={getItem:k=>m.get(k),setItem:(k,v)=>m.set(k,v)};
t.countdown=0;t.nextSpawn=999;t.step(6);assert.equal(t.savePending,true);
const checkpoint=checkpointTraining(p,t);assert.equal(checkpoint.gain,1);assert.equal(p.stats.strength,6);assert.equal(p.trainingMissions.strength,2);assert.equal(p.sessions,0);assert.equal(t.done,false);
writeSave(storage,p);const snapshot=JSON.stringify(p);checkpointTraining(p,t);assert.equal(JSON.stringify(p),snapshot);
const restored=readSave(storage,1000).player;assert.equal(restored.trainingMissions.strength,2);assert.equal(restored.stats.strength,6);
for(let i=0;i<3;i++)t.success(170,425,true);
assert.equal(t.missionProgress,3);const total=settleTraining(p,t);assert.equal(total.gain,4);assert.equal(p.stats.strength,9);assert.equal(p.sessions,1);
const paid=JSON.stringify(p);assert.equal(settleTraining(p,t),null);assert.equal(checkpointTraining(p,t),null);assert.equal(JSON.stringify(p),paid);
writeSave(storage,p);const next=new Training('strength',readSave(storage,1000).player,noop);assert.equal(next.missionNumber,2);assert.equal(next.missionProgress,0);assert.equal(next.combo,1);assert.equal(next.goalProgress,0);
assert.equal(new Training('dodge',p,noop).missionNumber,1);
});

test('old and malformed saves normalize lifetime mission numbers without persisting attempt progress',()=>{
assert.deepEqual(normalizePlayer({}).trainingMissions,{strength:1,dodge:1,block:1,crit:1});
assert.deepEqual(normalizePlayer({trainingMissions:{strength:-5,dodge:Infinity}}).trainingMissions,{strength:1,dodge:1,block:1,crit:1});
assert.deepEqual(normalizePlayer({trainingMissions:{strength:7.9,dodge:12},missionProgress:999}).trainingMissions,{strength:7,dodge:12,block:1,crit:1});
const t=new Training('strength',normalizePlayer({trainingMissions:{strength:7},missionProgress:999}),noop);
assert.equal(t.missionNumber,7);assert.equal(t.missionProgress,0);assert.equal(trainingMission(t.kind,t.missionNumber).target,7);
});


test('every training entrance lasts 1.5 active seconds without scoring, spawns or mission time',()=>{
for(const kind of ['strength','dodge','block','accuracy','crit']){
const t=new Training(kind,freshPlayer(),noop);
assert.equal(t.countdown,1.5);assert.equal(t.entrance(),0);
t.input('tap');t.step(.75);assert.equal(t.countdown,.75);assert.equal(t.elapsed,0);assert.ok(t.entrance(.2)>0);
t.input('tap');assert.equal(t.hits,0);t.step(.75);
assert.equal(t.countdown,0);assert.equal(t.elapsed,0);assert.equal(t.missionProgress,0);assert.equal(t.stickAttack,null);assert.equal(t.objects.items.filter(o=>o.active).length,0);assert.equal(t.entrance(.35),1);
t.step(.01);assert.equal(t.elapsed,.01);if(t.streak)assert.equal(t.missionProgress,.01);
const next=new Training(kind,t.player,noop);assert.equal(next.countdown,1.5);assert.equal(next.entrance(),0);
next.reducedMotion=true;assert.equal(next.entrance(),1);next.step(1);assert.equal(next.elapsed,0);
}
const t=new Training('block',freshPlayer(),noop);t.step(1.6);assert.ok(Math.abs(t.elapsed-.1)<1e-9);
});

test('Block intercepts all directions and wrapped angles, once per orange at either frame rate',()=>{
for(const angle of [0,Math.PI/2,Math.PI,-Math.PI/2,.7,-2.3,Math.PI*2-.02])for(const frames of [20,100]){
const t=new Training('block',freshPlayer(),noop);t.countdown=0;t.nextSpawn=999;
t.aimShield(angle-Math.PI*2);const o=t.spawnBlock(angle);
for(let i=0;i<frames;i++)t.step(BLOCK_RULES.flightTime/TRAINING_PACE/frames);
assert.equal(t.hits,1);assert.equal(t.misses,0);assert.equal(t.combo,2);assert.equal(o.active,false);
t.step(.1);assert.equal(t.hits,1);
}
});

test('Block only penalizes body contact and cannot rescue an orange already past the shield',()=>{
const t=new Training('block',freshPlayer(),noop);t.countdown=0;t.nextSpawn=999;t.success(700,350);t.success(700,350);
const points=t.goalProgress;t.aimShield(Math.PI);const o=t.spawnBlock(0);o.distance=BLOCK_RULES.shieldRadius-17;o.speed=100;
t.step(.001);assert.equal(t.misses,0);t.aimShield(0);t.step(.001);assert.equal(o.active,true);assert.equal(t.hits,2);
t.step(.5);assert.equal(t.misses,1);assert.equal(t.combo,1);assert.equal(t.goalProgress,points);assert.equal(o.active,false);
t.input('tap');t.aimShield(NaN);assert.equal(t.shieldAngle,0);assert.equal(t.misses,1);
const edge=t.spawnBlock(BLOCK_RULES.shieldHalfAngle+.05);edge.distance=BLOCK_RULES.shieldRadius;edge.speed=0;t.step(.01);assert.equal(edge.active,true);
});

test('unblocked Block stars auto-collect two credits exactly once',()=>{
const p=freshPlayer();p.trainingMissions.block=2;const t=new Training('block',p,noop);t.countdown=0;t.nextSpawn=999;
for(let i=0;i<3;i++)t.success(700,350);
t.aimShield(Math.PI);const o=t.spawnBlock(0,true);o.distance=BLOCK_RULES.shieldRadius;o.speed=100;t.step(.01);
assert.equal(o.active,true);assert.equal(t.combo,4);assert.equal(t.blockPulse,0);
t.step(.6);assert.equal(o.active,false);assert.equal(t.combo,6);assert.equal(t.hits,5);assert.equal(t.missionProgress,1);assert.ok(t.perfectStar>0);
t.step(.1);assert.equal(t.hits,5);assert.equal(t.misses,0);
const r=settleTraining(p,t);assert.equal(r.gain,2);assert.equal(r.xp,27);assert.equal(r.skill,0);assert.equal(p.stats.block,7);
const paid=JSON.stringify(p);assert.equal(settleTraining(p,t),null);t.aimShield(2);assert.equal(t.shieldAngle,Math.PI);assert.equal(JSON.stringify(p),paid);
});

test('Block checkpoints missions and rewards together and resets only partial progress on reentry',()=>{
const p=freshPlayer(1000),t=new Training('block',p,noop);t.countdown=0;t.nextSpawn=999;t.step(6);
checkpointTraining(p,t);assert.equal(p.trainingMissions.block,2);assert.equal(p.stats.block,6);
const snapshot=JSON.stringify(p);checkpointTraining(p,t);assert.equal(JSON.stringify(p),snapshot);
t.success(700,350,true);t.success(700,350,true);assert.equal(t.missionProgress,2);settleTraining(p,t);
const saved=normalizePlayer(JSON.parse(JSON.stringify(p)),1000),next=new Training('block',saved,noop);
assert.equal(next.missionNumber,2);assert.equal(next.missionProgress,0);assert.equal(next.combo,1);assert.equal(next.goalProgress,0);
assert.deepEqual(saved.trainingMissions,{strength:1,dodge:1,block:2,crit:1});assert.equal(saved.stats.block,8);
assert.equal(normalizePlayer({tutorials:{block:'true'},trainingMissions:{block:-3}}).tutorials.block,false);
p.tutorials.block=true;assert.equal(new Training('block',normalizePlayer(p),noop).tutorialRemaining,0);
});

test('Block remains indefinite with capped pacing, bounded effects and unchanged reduced-motion scoring',()=>{
const t=new Training('block',freshPlayer(),noop);for(let i=0;i<3100;i++)t.step(.05);
assert.equal(t.done,false);assert.ok(t.elapsed>150);assert.equal(t.objects.items.length,20);assert.equal(t.effects.items.length,32);
const speed=t.spawnBlock(0).speed;t.elapsed+=300;assert.equal(t.spawnBlock(0).speed,speed);
for(const reducedMotion of [false,true]){
const b=new Training('block',freshPlayer(),noop);b.reducedMotion=reducedMotion;b.countdown=0;b.nextSpawn=999;
const o=b.spawnBlock(0);o.distance=BLOCK_RULES.shieldRadius;o.speed=0;b.step(.01);assert.equal(b.hits,1);assert.equal(b.blockPulse,1);
assert.ok(b.effects.items.some(e=>e.active&&e.type==='fruit'));b.step(.6);assert.equal(b.blockPulse,0);assert.equal(b.effects.items.filter(e=>e.active).length,0);
}
});


test('blocked stars deflect once without rewards, penalty, a combo pulse or total-star mission credit',()=>{
for(const angle of [0,Math.PI/2,Math.PI,-Math.PI/2]){
const p=freshPlayer();p.trainingMissions.block=2;const t=new Training('block',p,noop);t.countdown=0;t.nextSpawn=999;
for(let i=0;i<3;i++)t.success(700,350);t.missionProgress=3;t.comboFeedback=0;
const kept=[t.hits,t.combo,t.goalProgress,t.goals,t.missionProgress,t.missionStats,t.bonusXp,t.misses,t.perfectStar];
t.aimShield(angle);const o=t.spawnBlock(angle,true);o.distance=BLOCK_RULES.shieldRadius;o.speed=0;t.step(.01);
assert.equal(o.active,false);assert.equal(t.blockPulse,1);assert.equal(t.comboFeedback,0);
assert.deepEqual([t.hits,t.combo,t.goalProgress,t.goals,t.missionProgress,t.missionStats,t.bonusXp,t.misses,t.perfectStar],kept);
assert.ok(t.effects.items.some(e=>e.active&&e.type==='deflectedStar'));
t.step(1);assert.equal(t.hits,kept[0]);assert.equal(t.misses,0);assert.equal(t.effects.items.filter(e=>e.active).length,0);
const result=settleTraining(p,t);assert.equal(result.gain,1);assert.equal(result.xp,15);
}
});

test('a blocked star breaks only a mission configured for consecutive stars',()=>{
const original=TRAINING_MISSIONS.block[1];
try{
TRAINING_MISSIONS.block[1]={type:'perfectCombo',base:5,step:1};
const p=freshPlayer();p.trainingMissions.block=2;const t=new Training('block',p,noop);t.countdown=0;t.nextSpawn=999;
t.missionProgress=4;t.combo=7;t.goalProgress=3;const o=t.spawnBlock(0,true);o.distance=BLOCK_RULES.shieldRadius;o.speed=0;t.step(.01);
assert.equal(t.missionProgress,0);assert.equal(t.missionNumber,2);assert.equal(t.combo,7);assert.equal(t.goalProgress,3);assert.equal(t.misses,0);assert.equal(t.hits,0);
}finally{TRAINING_MISSIONS.block[1]=original}
});

test('all trainers start faster while keeping their hit geometry and safe/perfect Dodge windows',()=>{
const p=freshPlayer(),s=new Training('strength',p,noop),b=new Training('block',p,noop),d=new Training('dodge',p,noop);
const fruit=s.spawnStrength(1),spark=s.spawnStrength(2,true);assert.ok(Math.abs(fruit.speed-472.5)<1e-9);assert.ok(Math.abs(spark.speed-222.75)<1e-9);assert.ok(Math.abs(fruit.duration-680/(350*1.35))<1e-9);
const orange=b.spawnBlock(0);assert.ok(Math.abs((orange.distance-BLOCK_RULES.shieldRadius)/orange.speed-2.1/1.35)<1e-9);
const attack=d.spawnDodge(0);assert.ok(Math.abs(attack.windup-.85/1.35)<1e-9);assert.ok(Math.abs(attack.strike-.28/1.35)<1e-9);assert.equal(DODGE_TIMING.window,.32);assert.equal(DODGE_TIMING.perfect,.18);
for(const kind of ['accuracy','crit']){const t=new Training(kind,p,noop);t.countdown=0;t.step(1);assert.equal(t.phase,1.35)}
for(const t of [s,b]){t.countdown=0;t.objects.clear();t.step(.5);assert.ok(Math.abs(t.nextSpawn-t.elapsed-1.25/(1.35*(1+.5/(t.kind==='strength'?180:240))))<1e-9)}
});

test('successful actions pulse the combo instead of floating stat text in every trainer',()=>{
for(const kind of ['strength','dodge','block','accuracy','crit']){
const t=new Training(kind,freshPlayer(),noop);t.countdown=0;t.nextSpawn=999;
t.success(700,350);assert.equal(t.comboFeedback,.42);assert.equal(t.comboStar,false);assert.equal(t.lastText,'');assert.equal(t.lastTextLife,0);
t.step(.1);assert.ok(t.comboFeedback>0&&t.comboFeedback<.42);t.success(700,350,true);assert.equal(t.comboFeedback,.42);assert.equal(t.comboStar,true);
assert.equal(t.lastText,'');assert.equal(t.lastTextLife,0);t.fail(700,350);assert.equal(t.comboFeedback,0);assert.equal(t.comboStar,false);
if(t.streak){t.missionNumber=1;t.missionProgress=5.99;t.missionEvent('time',.01);assert.equal(t.missionMessage,'');assert.ok(t.missionFeedback>0)}
}
});

function criticalTraining(){const t=new Training('crit',freshPlayer(),noop);t.countdown=0;t.nextSpawn=999;return t}
function advanceCritical(t,seconds,frame=1/60){for(let remaining=seconds;remaining>1e-10;){const dt=Math.min(remaining,frame);t.step(dt);remaining-=dt}}
function airborneCue(t,frame=1/60){advanceCritical(t,CRITICAL_TIMING.rise+t.criticalRound.airWait,frame)}
function criticalStrike(t){t.spawnCritical(false);t.input('hit');airborneCue(t);t.input('hit');advanceCritical(t,CRITICAL_TIMING.land+CRITICAL_TIMING.recovery+CRITICAL_TIMING.reset)}

test('Critical fake and no-cue taps reset the combo and mistake mission, preserving earned goal points',()=>{
for(const phase of ['idle','fake','gap','rise','wait','land','recovery','reset']){
const t=criticalTraining();
if(phase!=='idle')t.spawnCritical(phase==='fake'||phase==='gap');
if(phase==='gap')advanceCritical(t,CRITICAL_TIMING.fake);
if(['rise','wait','land','recovery','reset'].includes(phase))t.input('hit');
if(phase==='wait')advanceCritical(t,CRITICAL_TIMING.rise);
if(['land','recovery','reset'].includes(phase)){airborneCue(t);t.input('hit')}
if(['recovery','reset'].includes(phase))advanceCritical(t,CRITICAL_TIMING.land);
if(phase==='reset')advanceCritical(t,CRITICAL_TIMING.recovery);
t.success(0,0);t.success(0,0);t.missionProgress=3;
const points=t.goalProgress,hits=t.hits,stats=t.bonusCrit;
t.input('hit');assert.equal(t.combo,1,phase);assert.equal(t.misses,1,phase);assert.equal(t.missionProgress,0,phase);assert.equal(t.goalProgress,points,phase);assert.equal(t.hits,hits,phase);assert.equal(t.bonusCrit,stats,phase);
if(phase==='land'){advanceCritical(t,CRITICAL_TIMING.land);assert.equal(t.hits,hits);assert.equal(t.perfectStar,0)}
}
});

test('Critical first and second real cues each penalize a timeout once, including exact deadlines',()=>{
for(const airborne of [false,true]){
const t=criticalTraining();t.success(0,0);t.success(0,0);t.spawnCritical(false);
if(airborne){t.input('hit');airborneCue(t)}
const points=t.goalProgress,hits=t.hits;advanceCritical(t,(airborne?CRITICAL_TIMING.finish:CRITICAL_TIMING.ready)-.00001);
assert.equal(t.misses,0);advanceCritical(t,.00001);assert.equal(t.misses,1);assert.equal(t.combo,1);assert.equal(t.hits,hits);assert.equal(t.goalProgress,points);assert.equal(t.perfectStar,0);
advanceCritical(t,.5);assert.equal(t.misses,1);
}
const t=criticalTraining();t.spawnCritical(false);t.elapsed=t.criticalRound.until;t.input('hit');assert.equal(t.misses,1);assert.equal(t.hits,0);
});

test('Critical waits 550–750 ms after takeoff before revealing its second cue',()=>{
for(let i=0;i<20;i++){
const t=criticalTraining();t.spawnCritical(false);t.input('hit');
assert.ok(t.criticalRound.airWait>=.25&&t.criticalRound.airWait<=.45);
advanceCritical(t,CRITICAL_TIMING.rise);assert.equal(t.criticalRound.phase,'wait');
advanceCritical(t,t.criticalRound.airWait-.00001);assert.equal(t.criticalRound.phase,'wait');
advanceCritical(t,.00001);assert.equal(t.criticalRound.phase,'finish');assert.equal(t.combo,2);assert.equal(t.misses,0);
}
});

test('Critical fast double-taps and early airborne taps lose combo and cannot claim a later star',()=>{
for(const delay of [0,.05,.17,.3,.54]){
const t=criticalTraining();t.spawnCritical(false);t.input('hit');advanceCritical(t,delay);t.input('hit');
assert.equal(t.hits,1);assert.equal(t.combo,1);assert.equal(t.misses,1);assert.equal(t.goalProgress,1);assert.equal(t.criticalRound.perfect,false);
advanceCritical(t,1);assert.equal(t.hits,1);assert.equal(t.combo,1);assert.equal(t.perfectStar,0);
}
});

test('Critical full sequences earn +1 at takeoff and +2 only on landing, once at each frame rate',()=>{
for(const frame of [1/30,1/60,1/120]){
const t=criticalTraining();t.missionNumber=2;t.spawnCritical(false);t.input('hit');
assert.equal(t.hits,1);assert.equal(t.combo,2);assert.equal(t.goalProgress,1);assert.equal(t.perfectStar,0);
airborneCue(t,frame);assert.equal(t.criticalRound.phase,'finish');t.input('hit');assert.equal(t.hits,1);
advanceCritical(t,CRITICAL_TIMING.land,frame);assert.equal(t.hits,3);assert.equal(t.combo,4);assert.equal(t.goals,1);assert.equal(t.goalProgress,2);assert.equal(t.missionProgress,1);assert.ok(t.perfectStar>0);assert.equal(t.comboStar,true);
advanceCritical(t,.5,frame);assert.equal(t.hits,3);assert.equal(t.missionProgress,1);
const r=settleTraining(t.player,t);assert.equal(r.gain,1);assert.equal(r.xp,15);assert.equal(r.skill,0);
}
});

test('Critical cue boundaries include the opening and exclude the deadline',()=>{
for(const firstDelay of [0,CRITICAL_TIMING.ready-.00001,CRITICAL_TIMING.ready]){
const t=criticalTraining();t.spawnCritical(false);advanceCritical(t,firstDelay);t.input('hit');assert.equal(t.hits,firstDelay<CRITICAL_TIMING.ready?1:0);
}
for(const offset of [-.00001,0,CRITICAL_TIMING.finish-.00001,CRITICAL_TIMING.finish]){
const t=criticalTraining();t.spawnCritical(false);t.input('hit');advanceCritical(t,CRITICAL_TIMING.rise+t.criticalRound.airWait+offset);t.input('hit');advanceCritical(t,.2);
assert.equal(t.hits,offset>=0&&offset<CRITICAL_TIMING.finish?3:1);
assert.equal(t.combo,offset>=0&&offset<CRITICAL_TIMING.finish?4:1);
}
});

test('Critical star missions count completed strikes and persist only their own mission number',()=>{
const t=criticalTraining(),p=t.player;p.trainingMissions.crit=2;t.missionNumber=2;
for(let i=0;i<4;i++)criticalStrike(t);
assert.equal(t.missionNumber,2);assert.equal(t.missionProgress,4);
t.spawnCritical(false);t.input('hit');advanceCritical(t,1.3);assert.equal(t.missionProgress,4);
criticalStrike(t);assert.equal(t.missionNumber,3);assert.equal(t.missionProgress,0);assert.equal(t.missionStats,2);
checkpointTraining(p,t);const snapshot=JSON.stringify(p);checkpointTraining(p,t);assert.equal(JSON.stringify(p),snapshot);
const restored=normalizePlayer(p);assert.deepEqual(restored.trainingMissions,{strength:1,dodge:1,block:1,crit:3});
const retry=new Training('crit',restored,noop);assert.equal(retry.missionNumber,3);assert.equal(retry.missionProgress,0);assert.equal(retry.countdown,1.5);assert.equal(retry.combo,1);
});

test('Critical settlement in every phase pays earned credits once and stops unfinished rewards',()=>{
for(const phase of ['fake','gap','ready','rise','wait','finish','land','recovery','reset']){
const t=criticalTraining(),p=t.player;t.spawnCritical(phase==='fake'||phase==='gap');
if(phase==='gap')advanceCritical(t,CRITICAL_TIMING.fake);
if(['rise','wait','finish','land','recovery','reset'].includes(phase))t.input('hit');
if(phase==='wait')advanceCritical(t,CRITICAL_TIMING.rise);
if(['finish','land','recovery','reset'].includes(phase))airborneCue(t);
if(['land','recovery','reset'].includes(phase))t.input('hit');
if(['recovery','reset'].includes(phase))advanceCritical(t,CRITICAL_TIMING.land);
if(phase==='reset')advanceCritical(t,CRITICAL_TIMING.recovery);
assert.equal(t.criticalRound.phase,phase);const hits=t.hits;checkpointTraining(p,t);const r=settleTraining(p,t);
assert.equal(r.hits,['fake','ready'].includes(phase)?0:['recovery','reset'].includes(phase)?3:1);
const snapshot=JSON.stringify(p);t.step(5);t.input('hit');assert.equal(t.hits,hits);assert.equal(settleTraining(p,t),null);assert.equal(checkpointTraining(p,t),null);assert.equal(JSON.stringify(p),snapshot);
}
});

test('Critical remains indefinite with bounded effects and identical reduced-motion scoring',()=>{
for(const reduced of [false,true]){
const t=criticalTraining();t.reducedMotion=reduced;t.nextSpawn=.5;
for(let i=0;i<4000;i++){t.step(.05);if(['ready','finish'].includes(t.criticalRound?.phase))t.input('hit')}
assert.equal(t.done,false);assert.ok(t.elapsed>190);assert.ok(t.hits>150);assert.equal(t.objects.items.length,20);assert.equal(t.effects.items.length,32);
}
const a=criticalTraining(),b=criticalTraining();b.reducedMotion=true;
for(let i=0;i<5;i++){criticalStrike(a);criticalStrike(b)}
assert.deepEqual([a.hits,a.combo,a.goals,a.missionStats],[b.hits,b.combo,b.goals,b.missionStats]);
assert.equal(b.effects.items.filter(e=>e.active&&['dust','straw'].includes(e.type)).length,0);
});


test('Critical safely ignoring a fake earns one ordinary credit exactly once',()=>{
for(const frame of [1/30,1/60,1/120]){
const t=criticalTraining();t.spawnCritical(true);advanceCritical(t,CRITICAL_TIMING.fake-.00001,frame);
assert.equal(t.combo,1);assert.equal(t.hits,0);assert.equal(t.goalProgress,0);
advanceCritical(t,.00001,frame);assert.equal(t.criticalRound.phase,'gap');assert.equal(t.combo,2);assert.equal(t.hits,1);assert.equal(t.goalProgress,1);assert.equal(t.comboStar,false);assert.equal(t.perfectStar,0);
advanceCritical(t,CRITICAL_TIMING.gap,frame);assert.equal(t.criticalRound.phase,'ready');assert.equal(t.hits,1);
t.input('hit');airborneCue(t,frame);t.input('hit');advanceCritical(t,CRITICAL_TIMING.land,frame);
assert.equal(t.combo,5);assert.equal(t.hits,4);assert.equal(t.goals,2);assert.equal(t.goalProgress,0);
const reward=settleTraining(t.player,t);assert.equal(reward.gain,2);assert.equal(reward.xp,24);assert.equal(settleTraining(t.player,t),null);
}
});

test('Critical tapped or unfinished fake cues give no avoidance credit or star-mission progress',()=>{
for(const delay of [0,CRITICAL_TIMING.fake-.00001]){
const t=criticalTraining();t.missionNumber=2;t.spawnCritical(true);advanceCritical(t,delay);t.input('hit');advanceCritical(t,CRITICAL_TIMING.fake);
assert.equal(t.hits,0);assert.equal(t.combo,1);assert.equal(t.misses,1);assert.equal(t.missionProgress,0);
}
const t=criticalTraining();t.missionNumber=2;t.spawnCritical(true);advanceCritical(t,CRITICAL_TIMING.fake);assert.equal(t.hits,1);assert.equal(t.missionProgress,0);assert.equal(t.perfectStar,0);
const saved=settleTraining(t.player,t);assert.equal(saved.xp,3);assert.equal(saved.gain,0);
const partial=criticalTraining();partial.spawnCritical(true);advanceCritical(partial,.3);assert.equal(settleTraining(partial.player,partial).xp,0);partial.step(1);assert.equal(partial.hits,0);
});
