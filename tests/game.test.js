import test from 'node:test';
import assert from 'node:assert/strict';
import {freshPlayer,normalizePlayer,readSave,writeSave,SAVE_KEY,combatStats,addXp,buyItem,upgradeGround,learnSkill,allocateStat,settleTraining,settleBattle,passiveCoins,collectMuseum,upgradeLegacy,Pool} from '../dist/core.js';
import {Training} from '../dist/training.js';
import {Battle} from '../dist/battle.js';
const noop=()=>{};
test('new game has both equipment slots and survives a save round trip',()=>{const p=freshPlayer(1000),m=new Map(),storage={getItem:k=>m.get(k),setItem:(k,v)=>m.set(k,v)};assert.equal(writeSave(storage,p),true);assert.deepEqual(readSave(storage,1000).player,p);assert.equal(combatStats(p).attack,15)});
test('malformed and unavailable storage are handled without crashing',()=>{assert.ok(readSave({getItem:()=>'{'}).warning);assert.equal(writeSave({setItem(){throw Error()}},freshPlayer()),false);const p=normalizePlayer({coins:-10,stats:{strength:NaN},inventory:['weapon_t3'],equipment:{armor:'weapon_t3',weapon:'nope'},skills:['bad'],trainingLevels:{crit:900}});assert.equal(p.coins,0);assert.equal(p.equipment.armor,'armor_t1');assert.equal(p.equipment.weapon,'weapon_t1');assert.equal(p.trainingLevels.crit,5);assert.equal(p.stats.strength,5)});
test('purchases charge once, equip owned items for free and reject wrong ids',()=>{const p=freshPlayer();assert.equal(buyItem(p,'weapon_t2').ok,false);p.coins=200;assert.equal(buyItem(p,'weapon_t2').ok,true);assert.equal(p.coins,20);assert.equal(combatStats(p).attack,24);buyItem(p,'weapon_t1');buyItem(p,'weapon_t2');assert.equal(p.coins,20);assert.equal(buyItem(p,'missing').ok,false)});
test('training upgrades are bounded and improve earned stat yield',()=>{const p=freshPlayer();assert.equal(upgradeGround(p,'strength').ok,true);assert.equal(p.coins,40);assert.equal(p.trainingLevels.strength,2);const s={kind:'strength',hits:16,bestCombo:9,elapsed:30,rewarded:false};const r=settleTraining(p,s);assert.equal(r.gain,5);assert.equal(r.skill,0);const snapshot=JSON.stringify(p);assert.equal(settleTraining(p,s),null);assert.equal(JSON.stringify(p),snapshot)});
test('partial training banks earned stats without a completion bonus',()=>{const p=freshPlayer();const r=settleTraining(p,{kind:'crit',hits:12,bestCombo:4,elapsed:12,rewarded:false});assert.equal(r.gain,3);assert.equal(r.skill,0);assert.equal(p.sessions,0)});
test('leveling and skill spending cannot overspend or duplicate',()=>{const p=freshPlayer();assert.equal(addXp(p,150),2);assert.equal(p.level,3);assert.equal(p.statPoints,6);assert.equal(learnSkill(p,'ward').ok,true);assert.equal(learnSkill(p,'ward').ok,false);assert.equal(allocateStat(p,'strength'),true);assert.equal(p.statPoints,5);p.statPoints=0;assert.equal(allocateStat(p,'strength'),false)});
test('arena first clear unlocks next stage, duplicate payout blocked',()=>{const p=freshPlayer(),b={stage:1,rewarded:false};const r=settleBattle(p,b,true);assert.equal(r.coins,48);assert.equal(r.first,true);assert.equal(p.stage,2);assert.deepEqual(p.cleared,[1]);assert.equal(settleBattle(p,b,true),null);assert.equal(settleBattle(p,{stage:1},true).coins,31);assert.equal(settleBattle(p,{stage:2},false).coins,0)});
test('survival banks cleared-wave rewards when retreating',()=>{const p=freshPlayer();const r=settleBattle(p,{stage:12,survival:true,wavesCleared:4},false);assert.equal(r.coins,60);assert.equal(p.stage,1)});
test('museum income is capped and collected once; expansion settles old rate',()=>{const p=freshPlayer(0);p.museum=1;p.cleared=[1,2];assert.equal(passiveCoins(p,60000),2);assert.equal(passiveCoins(p,100000000),960);assert.equal(collectMuseum(p,60000),2);assert.equal(collectMuseum(p,60000),0);p.coins=1000;upgradeLegacy(p,'museum',120000);assert.equal(p.lastCollection,120000);assert.equal(p.museum,2)});
test('object pools reuse slots and respect their fixed capacity',()=>{const p=new Pool(1);const a=p.spawn({x:1});assert.equal(p.spawn({x:2}),null);a.active=false;assert.equal(p.spawn({x:3}),a);assert.equal(a.x,3)});
test('all five trainers accept correct inputs and penalize mistakes',()=>{const p=freshPlayer();for(const kind of ['strength','accuracy','block','crit','dodge']){const t=new Training(kind,p,noop);t.countdown=0;if(kind==='strength'){t.objects.spawn({x:430,y:340,lane:1,kick:false,speed:0});t.input('1')}if(kind==='block'){t.objects.spawn({x:555,y:340,lane:1,kick:false,speed:0});t.input('tap')}if(kind==='accuracy'){t.phase=0;t.target=700;t.input('tap')}if(kind==='crit'){t.phase=0;t.input('tap')}if(kind==='dodge'){t.input('0');t.objects.spawn({x:310,y:340,lane:1,kick:false,speed:10});t.step(.05)}assert.equal(t.hits,1,kind);assert.equal(t.combo,1,kind);t.cooldown=0;if(kind==='dodge'){t.objects.spawn({x:310,y:210,lane:0,kick:false,speed:10});t.step(.05)}else if(kind==='accuracy'){t.target=1000;t.input('tap')}else if(kind==='crit'){t.phase=.4;t.input('tap')}else t.input('tap');assert.equal(t.combo,0,kind)}});
test('training timer stops cleanly and countdown prevents early scoring',()=>{const t=new Training('crit',freshPlayer(),noop);t.input('tap');assert.equal(t.hits,0);for(let i=0;i<661;i++)t.step(.05);assert.equal(t.done,true);assert.equal(t.elapsed,30)});
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
const o=t.spawnStrength(0);assert.ok(o.speed<=350*(1+120/180));
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
t.cooldown=0;t.objects.spawn({x:170,y:425,lane:1,kick:true});t.input('kick');assert.equal(t.hits,1);
});

test('escalating streak goals bank fixed bonuses, reset current progress on a miss and retain completed bonuses',()=>{
const p=freshPlayer(),t=new Training('strength',p,noop);
for(let i=0;i<4;i++)t.success(430,340);
assert.equal(t.goals,1);assert.equal(t.goalTarget,6);assert.equal(t.goalProgress,0);assert.equal(t.bonusStrength,1);assert.equal(t.bonusXp,6);
t.success(430,340);t.fail(430,340);
assert.equal(t.combo,0);assert.equal(t.goalProgress,0);assert.equal(t.bonusStrength,1);assert.equal(t.hits,5);
for(let i=0;i<6;i++)t.success(430,340);
assert.equal(t.goals,2);assert.equal(t.goalTarget,8);assert.equal(t.bonusStrength,2);assert.equal(t.bonusXp,12);
const r=settleTraining(p,t);assert.equal(r.gain,4);assert.equal(r.xp,45);assert.equal(r.bestCombo,6);assert.equal(r.goals,2);assert.equal(r.skill,0);
});

test('Town and pagehide cash-out orders are idempotent and stop the Strength simulation',()=>{
for(const elapsed of [0,8,31,180])for(const order of ['town-pagehide','pagehide-town']){
const p=freshPlayer(),t=new Training('strength',p,noop);t.countdown=0;t.elapsed=elapsed;
for(let i=0;i<8;i++)t.success(430,340);
const r=settleTraining(p,t);assert.equal(r.gain,3,order);assert.equal(r.xp,30);assert.equal(r.skill,0);assert.equal(p.skillPoints,1);assert.equal(p.sessions,1);assert.equal(t.done,true);
const snapshot=JSON.stringify(p);assert.equal(settleTraining(p,t),null);assert.equal(settleTraining(p,t),null);t.step(1);t.input('1');assert.equal(JSON.stringify(p),snapshot);assert.equal(t.elapsed,elapsed);
}
const p=freshPlayer(),empty=new Training('strength',p,noop);assert.equal(settleTraining(p,empty).xp,0);assert.equal(p.sessions,0);
});

test('other four trainers retain timed completion and their existing skill reward',()=>{
for(const kind of ['accuracy','dodge','block','crit']){
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
