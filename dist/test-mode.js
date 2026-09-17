import {SAVE_KEY,TOTAL_BATTLES,STATS,SKILLS,freshPlayer,referenceStat,firstClearCoins,scaleCoins} from './core.js';

export const TEST_SAVE_KEY='one-brave-odyssey.browser.test.v1';
export const TEST_PREPARATIONS=[{id:'ready',label:'Prepared'},{id:'undertrained',label:'Skip recent training'},{id:'ungeared',label:'Missing gear upgrades'},{id:'extra',label:'Extra boss practice'}];

export function testStorage(baseStorage){
return{
getItem(key){return key===SAVE_KEY?baseStorage.getItem(TEST_SAVE_KEY):null},
setItem(key,value){if(key!==SAVE_KEY)throw new Error('Test storage only accepts the game save.');baseStorage.setItem(TEST_SAVE_KEY,value)},
removeItem(key){if(key!==SAVE_KEY)throw new Error('Test storage only accepts the game save.');baseStorage.removeItem(TEST_SAVE_KEY)}
}
}

export function createTestCheckpoint(stage,preparation='ready',now=Date.now()){
const timestamp=Number.isFinite(now)?Math.max(0,Math.min(Number.MAX_SAFE_INTEGER,Math.floor(now))):Date.now();
const battle=Number.isFinite(stage)?Math.max(1,Math.min(TOTAL_BATTLES,Math.floor(stage))):1;
const mode=TEST_PREPARATIONS.some(option=>option.id===preparation)?preparation:'ready';
const player=freshPlayer(timestamp),clears=battle-1,tier=mode==='ungeared'?Math.max(1,battle-3):battle;
const stat=mode==='undertrained'?(battle===1?Math.max(1,referenceStat(1)-5):referenceStat(battle-1)):referenceStat(battle)+(mode==='extra'?40:0);
const trainingLevel=1+[1,7,14,21].filter(required=>clears>=required).length,skillLevel=Math.min(10,1+Math.floor(clears/3));
player.name='Test Rook';
player.stage=battle;
player.cleared=Array.from({length:clears},(_,index)=>index+1);
player.survivalUnlocked=false;
player.stats=Object.fromEntries(STATS.map(kind=>[kind,stat]));
player.trainingLevels=Object.fromEntries(STATS.map(kind=>[kind,trainingLevel]));
player.trainingProgress=Object.fromEntries(STATS.map(kind=>[kind,0]));
player.tutorials=Object.fromEntries(STATS.map(kind=>[kind,true]));
player.inventory=Array.from({length:tier},(_,index)=>['weapon','armor','shield'].map(slot=>`${slot}_t${index+1}`)).flat();
player.equipment=Object.fromEntries(['weapon','armor','shield'].map(slot=>[slot,`${slot}_t${tier}`]));
player.coins=clears?scaleCoins(firstClearCoins(clears),30):120n;
player.skills=[];
player.skillLevels={};
for(const [id,skill] of Object.entries(SKILLS)){
if(clears<skill.unlockAfter||skill.requires&&!player.skillLevels[skill.requires])continue;
player.skills.push(id);player.skillLevels[id]=skillLevel
}
player.home=Math.min(5,Math.floor(clears/6));
player.museum=player.home;
player.potions=2;
player.statPoints=clears?8:0;
player.skillPoints=3;
player.level=1+Math.floor(clears*1.5);
player.xp=0;
player.trainingGoals=0;
player.totalHits=0;
player.sessions=0;
player.bestCombo=0;
player.lastCollection=timestamp;
player.lastManualCollection=timestamp;
player.pendingIdleCoins=0n;
return player
}

export function advanceTestIdle(player,milliseconds,now=Date.now()){
if(!player||typeof player!=='object'||!Number.isFinite(milliseconds)||milliseconds<=0||!Number.isFinite(now)||now<0)return false;
const timestamp=Math.min(Number.MAX_SAFE_INTEGER,Math.floor(now)),duration=Math.max(300000,Math.min(259200000,Math.floor(milliseconds)));
for(const key of ['lastCollection','lastManualCollection']){
const previous=Number.isFinite(player[key])?Math.max(0,Math.min(timestamp,Math.floor(player[key]))):timestamp;
player[key]=Math.max(0,previous-duration)
}
return true
}
