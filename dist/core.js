export const TRAINING_INTRO=1.5;
export const TRAINING_PACE=1.35;
export const PRACTICE_KINDS=['strength','dodge','block','crit'];
export const CRITICAL_TIMING={fake:.55,gap:.32,ready:.65,rise:.3,waitMin:.25,waitMax:.45,finish:.35,land:.18,recovery:.45,reset:.36,interval:.34};
export const BLOCK_RULES={x:700,y:350,shieldRadius:70,shieldHalfAngle:.55,bodyRadius:52,flightTime:2.1,spawnInterval:1.25};
export const DODGE_TIMING={window:.32,perfect:.18,pose:.54,cooldown:.42,recovery:.45};
export const SAVE_KEY='one-brave-odyssey.browser.v1';
export const STATS=['strength','accuracy','dodge','block','crit'];
export const GROUNDS=[{id:'strength',name:'Strength',icon:'⚔',color:'#ffba73',description:'Slash practice fruit at three heights. Kick the falling sparks.',benefit:'More attack damage'},{id:'accuracy',name:'Accuracy',icon:'◎',color:'#85ded7',description:'Throw when the moving sight crosses the target.',benefit:'More reliable hits'},{id:'dodge',name:'Dodge',icon:'➶',color:'#a7ccff',description:'Dodge the practice stick: tuck high, jump low, step back from mid.',benefit:'Evade enemy attacks'},{id:'block',name:'Block',icon:'⬡',color:'#ace2a0',description:'Rotate your shield to block oranges from every direction. Let stars reach you without touching the shield.',benefit:'Reduce incoming damage'},{id:'crit',name:'Critical',icon:'✦',color:'#d8b0ed',description:'Ignore the dummy’s fake cue. Tap anywhere to jump, then tap again in the air for a perfect strike.',benefit:'More critical strikes'}];
export const ITEMS={weapon_t1:{id:'weapon_t1',name:'Wayfarer blade',slot:'weapon',tier:1,cost:0,bonus:0},weapon_t2:{id:'weapon_t2',name:'Cloudsteel saber',slot:'weapon',tier:2,cost:180,bonus:9},weapon_t3:{id:'weapon_t3',name:'Sunbreak edge',slot:'weapon',tier:3,cost:650,bonus:24},armor_t1:{id:'armor_t1',name:'Trail vest',slot:'armor',tier:1,cost:0,bonus:0},armor_t2:{id:'armor_t2',name:'Skyranger mail',slot:'armor',tier:2,cost:150,bonus:35},armor_t3:{id:'armor_t3',name:'Dawnwarden plate',slot:'armor',tier:3,cost:550,bonus:85},helmet_t1:{id:'helmet_t1',name:'No helmet',slot:'helmet',tier:1,cost:0,bonus:0},helmet_t2:{id:'helmet_t2',name:'Skyranger helmet',slot:'helmet',tier:2,cost:80,bonus:12},helmet_t3:{id:'helmet_t3',name:'Dawnwarden helmet',slot:'helmet',tier:3,cost:280,bonus:30},bottoms_t1:{id:'bottoms_t1',name:'Trail trousers',slot:'bottoms',tier:1,cost:0,bonus:0},bottoms_t2:{id:'bottoms_t2',name:'Skyranger trousers',slot:'bottoms',tier:2,cost:100,bonus:18},bottoms_t3:{id:'bottoms_t3',name:'Dawnwarden greaves',slot:'bottoms',tier:3,cost:350,bonus:45}};
export const SKILLS={flare:{name:'Sunflare',icon:'✷',description:'Strike for 2.5× damage. 12s cooldown.',cooldown:12,cost:1},ward:{name:'Windguard',icon:'⬡',description:'Halve the next 3 enemy hits. 16s cooldown.',cooldown:16,cost:2},mend:{name:'Second wind',icon:'❋',description:'Restore 30% of your health. 20s cooldown.',cooldown:20,cost:2}};
export const ENEMIES=['Moss hornling','Twilight flutter','Pebble sentinel','Briar hornling','Violet skywing','Basalt keeper','Wildroot brute','Moonveil hunter','Stormstone giant','Elder thornhorn','Duskwing monarch','The Crown of Stone'];
export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const whole=(n,fallback=0,max=1e9)=>Number.isFinite(n)?clamp(Math.floor(n),0,max):fallback;
export const TRAINING_MISSIONS={
strength:[{type:'unhurt',base:6,step:2},{type:'perfect',base:5,step:2},{type:'perfectCombo',base:5,step:1},{type:'combo',base:12,step:4},{type:'goals',base:3,step:1}],
dodge:[{type:'unhurt',base:6,step:2},{type:'perfect',base:5,step:2},{type:'goals',base:3,step:1},{type:'combo',base:12,step:4}],
block:[{type:'unhurt',base:6,step:2},{type:'perfect',base:5,step:2},{type:'goals',base:3,step:1},{type:'combo',base:12,step:4}],
crit:[{type:'unhurt',base:6,step:2},{type:'perfect',base:5,step:2},{type:'goals',base:3,step:1},{type:'combo',base:12,step:4}]
};
export function trainingMission(kind,number=1){
const list=TRAINING_MISSIONS[kind],n=Math.max(1,whole(number,1)),cycle=Math.floor((n-1)/list.length),spec=list[(n-1)%list.length],target=spec.base+cycle*spec.step;
const title={unhurt:kind==='crit'?`Avoid mistakes for ${target}s`:`Avoid hits for ${target}s`,perfect:`Collect ${target} stars`,perfectCombo:`Catch ${target} stars in a row`,combo:`Reach ×${target}`,goals:`Complete ${target} stat goals`}[spec.type];
return{number:n,type:spec.type,target,title,reward:n}
}
export function freshPlayer(now=Date.now()){return{version:1,name:'Rook',scarf:'#63dbc4',coins:120,xp:0,level:1,statPoints:0,skillPoints:1,stats:Object.fromEntries(STATS.map(k=>[k,5])),trainingLevels:Object.fromEntries(STATS.map(k=>[k,1])),equipment:{weapon:'weapon_t1',armor:'armor_t1',helmet:'helmet_t1',bottoms:'bottoms_t1'},inventory:['weapon_t1','armor_t1','helmet_t1','bottoms_t1'],skills:[],stage:1,cleared:[],potions:2,home:0,museum:0,lastCollection:now,totalHits:0,sessions:0,bestCombo:0,tutorials:{strength:false,dodge:false,block:false,crit:false},trainingMissions:{strength:1,dodge:1,block:1,crit:1},settings:{sound:false,motion:true}}}
export function normalizePlayer(raw,now=Date.now()){const p=freshPlayer(now);if(!raw||typeof raw!=='object')return p;p.name=typeof raw.name==='string'?raw.name.slice(0,18):p.name;p.scarf=['#63dbc4','#f0ad65','#b89be0'].includes(raw.scarf)?raw.scarf:p.scarf;for(const k of ['coins','xp','statPoints','skillPoints','potions','totalHits','sessions','bestCombo'])p[k]=whole(raw[k],p[k]);p.level=clamp(whole(raw.level,1),1,999);p.stage=clamp(whole(raw.stage,1),1,13);p.home=clamp(whole(raw.home),0,5);p.museum=clamp(whole(raw.museum),0,5);p.lastCollection=clamp(whole(raw.lastCollection,now,now),0,now);for(const k of STATS){p.stats[k]=clamp(whole(raw.stats?.[k],5),1,99999);p.trainingLevels[k]=clamp(whole(raw.trainingLevels?.[k],1),1,5)}p.inventory=[...new Set([...p.inventory,...(Array.isArray(raw.inventory)?raw.inventory:[]).filter(k=>ITEMS[k])])];for(const slot of ['weapon','armor','helmet','bottoms']){const id=raw.equipment?.[slot];if(ITEMS[id]?.slot===slot&&p.inventory.includes(id))p.equipment[slot]=id}p.skills=[...new Set((Array.isArray(raw.skills)?raw.skills:[]).filter(k=>SKILLS[k]))];p.cleared=[...new Set((Array.isArray(raw.cleared)?raw.cleared:[]).filter(k=>Number.isInteger(k)&&k>=1&&k<=12))];p.tutorials={strength:raw.tutorials?.strength===true,dodge:raw.tutorials?.dodge===true,block:raw.tutorials?.block===true,crit:raw.tutorials?.crit===true};p.trainingMissions={strength:Math.max(1,whole(raw.trainingMissions?.strength,1)),dodge:Math.max(1,whole(raw.trainingMissions?.dodge,1)),block:Math.max(1,whole(raw.trainingMissions?.block,1)),crit:Math.max(1,whole(raw.trainingMissions?.crit,1))};p.settings={sound:raw.settings?.sound===true,motion:raw.settings?.motion!==false};return p}
export function readSave(storage,now=Date.now()){try{const raw=storage.getItem(SAVE_KEY);return{player:raw?normalizePlayer(JSON.parse(raw),now):freshPlayer(now),warning:null}}catch{return{player:freshPlayer(now),warning:'Your save could not be read. This session starts fresh.'}}}
export function writeSave(storage,p){try{storage.setItem(SAVE_KEY,JSON.stringify(p));return true}catch{return false}}
export function xpNeeded(p){return 60+(p.level-1)*30}
export function addXp(p,amount){p.xp+=whole(amount);let levels=0;while(p.xp>=xpNeeded(p)&&p.level<999){p.xp-=xpNeeded(p);p.level++;p.statPoints+=3;p.skillPoints++;levels++}return levels}
export function combatStats(p){return{hp:90+p.level*6+['armor','helmet','bottoms'].reduce((sum,slot)=>sum+(ITEMS[p.equipment[slot]]?.bonus||0),0),attack:Math.round(8+p.stats.strength*1.4+ITEMS[p.equipment.weapon].bonus),hit:clamp(.78+p.stats.accuracy*.006,.78,.98),dodge:clamp(p.stats.dodge*.008,0,.38),block:clamp(p.stats.block*.009,0,.5),crit:clamp(.05+p.stats.crit*.007,0,.45)}}
export function trainingCost(p,k){return 80*p.trainingLevels[k]**2}
export function buyItem(p,id){const item=ITEMS[id];if(!item)return{ok:false,message:'Unknown equipment.'};if(p.inventory.includes(id)){p.equipment[item.slot]=id;return{ok:true,message:item.name+' equipped.'}}if(p.coins<item.cost)return{ok:false,message:'You need '+(item.cost-p.coins)+' more coins.'};p.coins-=item.cost;p.inventory.push(id);p.equipment[item.slot]=id;return{ok:true,message:item.name+' equipped!'}}
export function upgradeGround(p,k){if(!STATS.includes(k))return{ok:false,message:'Unknown ground.'};if(p.trainingLevels[k]>=5)return{ok:false,message:'This ground is fully upgraded.'};const cost=trainingCost(p,k);if(p.coins<cost)return{ok:false,message:'You need '+(cost-p.coins)+' more coins.'};p.coins-=cost;p.trainingLevels[k]++;return{ok:true,message:'Training yield increased by 25%.'}}
export function learnSkill(p,k){if(!SKILLS[k]||p.skills.includes(k))return{ok:false,message:'Skill already learned or unavailable.'};if(p.skillPoints<SKILLS[k].cost)return{ok:false,message:'Earn more skill points by training or leveling up.'};p.skillPoints-=SKILLS[k].cost;p.skills.push(k);return{ok:true,message:SKILLS[k].name+' learned!'}}
export function allocateStat(p,k){if(!STATS.includes(k)||p.statPoints<1)return false;p.statPoints--;p.stats[k]++;return true}
function trainingRewards(p,session){
const strength=session.kind==='strength',dodge=session.kind==='dodge',block=session.kind==='block',critical=session.kind==='crit',streak=PRACTICE_KINDS.includes(session.kind);
const bonusStrength=strength?whole(session.bonusStrength):0,bonusDodge=dodge?whole(session.bonusDodge):0,bonusBlock=block?whole(session.bonusBlock):0,bonusCrit=critical?whole(session.bonusCrit):0;
const missionStats=streak?whole(session.missionStats):0,missionXp=streak?whole(session.missionXp):0,bonusXp=streak?whole(session.bonusXp):0;
const gain=streak?bonusStrength+bonusDodge+bonusBlock+bonusCrit+missionStats:Math.floor(session.hits*(1+.25*(p.trainingLevels[session.kind]-1))/4);
return{gain,xp:session.hits*3+bonusXp+missionXp,hits:session.hits,bestCombo:session.bestCombo,goals:streak?whole(session.goals):0,bonusStrength,bonusDodge,bonusBlock,bonusCrit,bonusXp,missionStats,missionXp,missions:streak?whole(session.missionsCompleted):0,perfectDodges:dodge?whole(session.perfectDodges):0}
}
export function checkpointTraining(p,session){
if(session.rewarded)return null;
const result=trainingRewards(p,session),banked=session.banked||{gain:0,xp:0,hits:0,levels:0};
p.stats[session.kind]+=result.gain-banked.gain;
const levels=addXp(p,result.xp-banked.xp);
p.totalHits+=result.hits-banked.hits;p.bestCombo=Math.max(p.bestCombo,result.bestCombo);
if(session.missionNumber){p.trainingMissions??={strength:1,dodge:1,block:1,crit:1};p.trainingMissions[session.kind]=session.missionNumber}
session.banked={gain:result.gain,xp:result.xp,hits:result.hits,levels:banked.levels+levels};session.savePending=false;
return{...result,levels:session.banked.levels}
}
export function settleTraining(p,session){
const result=checkpointTraining(p,session);
if(!result)return null;
session.rewarded=true;session.done=true;
const streak=PRACTICE_KINDS.includes(session.kind),complete=!streak&&session.elapsed>=29.9;
const skill=complete&&session.hits>=8?1:0;
if(streak?session.elapsed>0||session.hits>0:complete)p.sessions++;
p.skillPoints+=skill;
return{...result,skill}
}
export function enemyStats(stage,wave=0,survival=0){return{hp:Math.round((35+stage*15+wave*10)*(1+survival*.15)),attack:Math.round((4+stage*1.6+wave)*(1+survival*.12)),type:(stage-1+wave)%3,name:wave===2?ENEMIES[stage-1]:['Moss hornling','Twilight flutter','Pebble sentinel'][(stage-1+wave)%3]}}
export function settleBattle(p,battle,won){if(battle.rewarded)return null;battle.rewarded=true;if(battle.survival){const coins=battle.wavesCleared*15;const xp=battle.wavesCleared*8;p.coins+=coins;return{coins,xp,levels:addXp(p,xp),first:false}}if(!won)return{coins:0,xp:0,levels:0,first:false};const first=!p.cleared.includes(battle.stage)&&!battle.survival;const coins=Math.round((30+battle.stage*18)*(1+p.home*.1)*(first?1:0.65));const xp=25+battle.stage*8;const levels=addXp(p,xp);p.coins+=coins;if(first){p.cleared.push(battle.stage);p.stage=Math.max(p.stage,battle.stage+1);p.skillPoints++}return{coins,xp,levels,first}}
export function legacyCost(p,kind){return kind==='home'?100*(p.home+1)**2:120*(p.museum+1)**2}
export function passiveCoins(p,now=Date.now()){if(!p.museum||!p.cleared.length)return 0;const seconds=clamp((now-p.lastCollection)/1000,0,28800);return Math.floor(seconds/60*p.museum*p.cleared.length)}
export function collectMuseum(p,now=Date.now()){const amount=passiveCoins(p,now);p.coins+=amount;p.lastCollection=now;return amount}
export function upgradeLegacy(p,kind,now=Date.now()){if(!['home','museum'].includes(kind)||p[kind]>=5)return{ok:false,message:'Fully upgraded.'};const cost=legacyCost(p,kind);if(p.coins<cost)return{ok:false,message:'You need '+(cost-p.coins)+' more coins.'};if(kind==='museum')collectMuseum(p,now);p.coins-=cost;p[kind]++;return{ok:true,message:kind==='home'?'Lodge improved. Arena coin rewards increased.':'Gallery expanded. Your trophies earn more coins.'}}
export function purchasePotion(p){if(p.coins<25)return{ok:false,message:'A tonic costs 25 coins.'};if(p.potions>=9)return{ok:false,message:'Your tonic pouch is full.'};p.coins-=25;p.potions++;return{ok:true,message:'Skyberry tonic added to your pouch.'}}
export class Pool{constructor(size){this.items=Array.from({length:size},()=>({active:false}))}spawn(values){const item=this.items.find(x=>!x.active);if(!item)return null;Object.assign(item,values,{active:true});return item}clear(){for(const item of this.items)item.active=false}}
