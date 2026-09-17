import {CRITICAL_TIMING} from './core.js';
import {ACTION_HERO_ART,IDLE_PORTRAIT_ART,PORTRAIT_WEAPON_ART,HERO_WEAPON_SCALE,FULL_BODY_IDLE_ART,FULL_BODY_ATTACK_ART,FULL_BODY_JUMP_ART,CRITICAL_ART,ellipse} from './art.js';
import {asset,fallbackWeapon,fullBodyIdle,fullBodyAttack,fullBodyJump} from './portrait-art.js';
import {drawRigHero,hasRigEquipment,rigPose,sampleRigPose} from './rig-art.js';
import {getAppliedRigConfig} from './rig-config.js';

const motionPreference=typeof matchMedia==='function'?matchMedia('(prefers-reduced-motion: reduce)'):null;

function paintFrame(c,sheet,frame,normal){
const [sx,sy,sw,sh]=frame.rect,[ox,oy]=frame.origin;
c.save();
if(frame.clip){c.beginPath();frame.clip.forEach(([x,y],i)=>{const px=(x-ox)*normal,py=(y-oy)*normal;i?c.lineTo(px,py):c.moveTo(px,py)});c.closePath();c.clip()}
c.drawImage(sheet,sx,sy,sw,sh,(sx-ox)*normal,(sy-oy)*normal,sw*normal,sh*normal);c.restore()
}

function drawFrame(c,x,y,height,equipment,spec,index,hit,shadow){
const sheet=asset(spec.src),weapon=PORTRAIT_WEAPON_ART[equipment.weapon],sword=weapon?asset(weapon.src):null;
if(!sheet)return false;
const frame=spec.frames[index],normal=ACTION_HERO_ART.referenceHeight/(frame.height||ACTION_HERO_ART.referenceHeight);
const [ox,oy]=frame.origin,hand=frame.hand;
c.save();c.translate(x,y);c.scale(height/ACTION_HERO_ART.referenceHeight,height/ACTION_HERO_ART.referenceHeight);
if(shadow)ellipse(c,0,0,90,17,'#183c4844');
paintFrame(c,sheet,frame,normal);
c.save();c.translate((hand.x-ox)*normal,(hand.y-oy)*normal);c.rotate(hand.rotation);c.scale(hand.scale*HERO_WEAPON_SCALE,hand.scale*HERO_WEAPON_SCALE);
if(sword){c.scale(weapon.scale,weapon.scale);c.drawImage(sword,-weapon.pivot[0],-weapon.pivot[1])}else fallbackWeapon(c,equipment.weapon);
c.restore();c.save();c.beginPath();
(spec.handMask||ACTION_HERO_ART.handMask).forEach(([px,py],i)=>{const hx=(hand.x+px-ox)*normal,hy=(hand.y+py-oy)*normal;i?c.lineTo(hx,hy):c.moveTo(hx,hy)});
c.closePath();c.clip();paintFrame(c,sheet,frame,normal);c.restore();
if(hit>0){c.globalAlpha*=hit*.35;ellipse(c,0,-250,95,180,'#fff7df')}
c.restore();return true
}

export function drawCriticalHero(c,training,pose){
const r=training.criticalRound,phase=r?.phase,age=r?training.elapsed-r.startedAt:0,motion=training.motion;
if(FULL_BODY_JUMP_ART[training.player.equipment.armor]){
let frame='standing';
if(r?.jumpAt!==null&&r?.jumpAt!==undefined){
if(phase==='rise')frame=motion&&(training.elapsed-r.jumpAt)/CRITICAL_TIMING.rise<.16?'crouch':'airborne';
else if(phase==='wait'||phase==='finish')frame='airborne';
else if(phase==='land'){
const grounded=!motion||age>=CRITICAL_TIMING.land,from=Math.max(0,Math.min(1,r.landFrom??1));
frame=grounded?'landing':r.strike?'strike':from<=.16?'crouch':'airborne'
}else if(phase==='recovery'&&r.landed&&age<.2)frame='landing'
}
if(fullBodyJump(c,pose.x,pose.y,158*CRITICAL_ART.scale,training.player.equipment,training.elapsed,{frame,motion,animated:frame==='standing'&&motion,shadow:false,hit:training.hit,facing:getAppliedRigConfig().facing}))return true
if(training.player.equipment.armor==='armor_t1')return true
}
if(hasRigEquipment(training.player.equipment)){
let p=rigPose('standing',training.elapsed,motion),elevation=0;
if(r?.jumpAt!==null&&r?.jumpAt!==undefined){
if(phase==='rise'){const t=Math.min(1,(training.elapsed-r.jumpAt)/CRITICAL_TIMING.rise);p=motion?sampleRigPose([[0,'crouch'],[1,'airborne']],t):rigPose('airborne');elevation=75*(motion?t*t*(3-2*t):1)}
else if(phase==='wait'||phase==='finish'){p=rigPose('airborne');elevation=75}
else if(phase==='land'){const t=Math.min(1,age/CRITICAL_TIMING.land),from=Math.max(0,Math.min(1,r.landFrom??1)),start=sampleRigPose([[0,'crouch'],[1,'airborne']],from);p=motion?sampleRigPose([[0,start],[1,r.strike?'landing':'crouch']],t):rigPose(r.strike?'landing':'crouch');elevation=motion?75*from*from*(3-2*from)*(1-t*t*(3-2*t)):0}
else if(phase==='recovery'&&r.landed)p=motion?sampleRigPose([[0,r.strike?'landing':'crouch'],[1,'standing']],Math.min(1,age/.3)):rigPose('standing');
}
p.hipY+=elevation;p.nearFootY+=elevation;p.farFootY+=elevation;
if(drawRigHero(c,pose.x,pose.y,158*CRITICAL_ART.scale,training.player.equipment,training.elapsed,{pose:p,shadow:false,hit:training.hit}))return true
}
let spec=IDLE_PORTRAIT_ART,index=0;
asset(ACTION_HERO_ART.jump.src);
if(r?.jumpAt!==null&&r?.jumpAt!==undefined){
if(phase==='rise'){spec=ACTION_HERO_ART.jump;const p=(training.elapsed-r.jumpAt)/CRITICAL_TIMING.rise;index=motion?(p<.2?0:p<.68?1:2):2}
else if(phase==='wait'||phase==='finish'){spec=ACTION_HERO_ART.jump;index=phase==='wait'?2:3}
else if(phase==='land'){spec=ACTION_HERO_ART.jump;index=r.strike?(motion?4:5):3}
else if(phase==='recovery'&&r.landed&&age<.3){spec=ACTION_HERO_ART.jump;index=r.strike&&age<.14?5:0}
}
return drawFrame(c,pose.x,pose.y,158*CRITICAL_ART.scale,training.player.equipment,spec,index,training.hit,false)
}

export function drawArenaHero(c,battle){
const attack=ACTION_HERO_ART.attack,until=battle.nextTurn-battle.time,since=battle.time-battle.normalAttackAt,motion=battle.player.settings.motion&&!motionPreference?.matches;
const equipment=battle.player.equipment,fullAttack=FULL_BODY_ATTACK_ART[equipment.armor];
if(fullAttack||FULL_BODY_IDLE_ART[equipment.armor]){
if(fullAttack)asset(fullAttack.src);
let frame=null;
if(fullAttack){
if(since>=0&&since<attack.recovery){
const sequence=fullAttack.combat?.recovery||[[2,.4],[3,1]];
frame=motion?sequence.find(([,end])=>since/attack.recovery<end)[0]:sequence[0][0]
}else if(motion&&!battle.done&&battle.turn%2===0&&until>=0&&until<=attack.windup){
const sequence=fullAttack.combat?.windup||[[0,.42],[1,1]],phase=1-until/attack.windup;
frame=(sequence.find(([,end])=>phase<end)||sequence[sequence.length-1])[0]
}
}
const options={frame,motion,animated:frame===null&&motion,hit:battle.heroHit,facing:getAppliedRigConfig().facing};
const rendered=frame===null?fullBodyIdle(c,410+battle.heroAttack*18*1.65,500,158*1.65,equipment,battle.time,options):fullBodyAttack(c,410+battle.heroAttack*18*1.65,500,158*1.65,equipment,battle.time,options);
if(rendered||equipment.armor==='armor_t1')return true
}
if(hasRigEquipment(battle.player.equipment)){
let p=rigPose('standing',battle.time,motion);
if(since>=0&&since<attack.recovery)p=motion?sampleRigPose([[0,'attack'],[.24,'attack'],[1,'standing']],since/attack.recovery):rigPose('attack');
else if(motion&&!battle.done&&battle.turn%2===0&&until>=0&&until<=attack.windup)p=sampleRigPose([[0,'standing'],[.72,'windup'],[1,'attack']],1-until/attack.windup);
if(drawRigHero(c,410+battle.heroAttack*18*1.65,500,158*1.65,battle.player.equipment,battle.time,{pose:p,hit:battle.heroHit}))return true
}
let spec=IDLE_PORTRAIT_ART,index=0;
asset(attack.src);
if(since>=0&&since<attack.recovery){spec=attack;index=motion?(since<.08?3:since<.18?4:5):3}
else if(motion&&!battle.done&&battle.turn%2===0&&until>=0&&until<=attack.windup){spec=attack;index=Math.min(2,Math.floor((attack.windup-until)/(attack.windup/3)))}
return drawFrame(c,410+battle.heroAttack*18*1.65,500,158*1.65,battle.player.equipment,spec,index,battle.heroHit,true)
}
