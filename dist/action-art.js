import {CRITICAL_TIMING} from './core.js';
import {ACTION_HERO_ART,IDLE_PORTRAIT_ART,PORTRAIT_WEAPON_ART,CRITICAL_ART,ellipse} from './art.js';
import {asset,fallbackWeapon} from './portrait-art.js';

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
c.save();c.translate((hand.x-ox)*normal,(hand.y-oy)*normal);c.rotate(hand.rotation);c.scale(hand.scale,hand.scale);
if(sword){c.scale(weapon.scale,weapon.scale);c.drawImage(sword,-weapon.pivot[0],-weapon.pivot[1])}else fallbackWeapon(c,equipment.weapon);
c.restore();c.save();c.beginPath();
(spec.handMask||ACTION_HERO_ART.handMask).forEach(([px,py],i)=>{const hx=(hand.x+px-ox)*normal,hy=(hand.y+py-oy)*normal;i?c.lineTo(hx,hy):c.moveTo(hx,hy)});
c.closePath();c.clip();paintFrame(c,sheet,frame,normal);c.restore();
if(hit>0){c.globalAlpha*=hit*.35;ellipse(c,0,-250,95,180,'#fff7df')}
c.restore();return true
}

export function drawCriticalHero(c,training,pose){
const r=training.criticalRound,phase=r?.phase,age=r?training.elapsed-r.startedAt:0,motion=training.motion;
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
const attack=ACTION_HERO_ART.attack,until=battle.nextTurn-battle.time,since=battle.time-battle.normalAttackAt,motion=battle.player.settings.motion;
let spec=IDLE_PORTRAIT_ART,index=0;
asset(attack.src);
if(since>=0&&since<attack.recovery){spec=attack;index=motion?(since<.08?3:since<.18?4:5):3}
else if(motion&&!battle.done&&battle.turn%2===0&&until>=0&&until<=attack.windup){spec=attack;index=Math.min(2,Math.floor((attack.windup-until)/(attack.windup/3)))}
return drawFrame(c,410+battle.heroAttack*18*1.65,500,158*1.65,battle.player.equipment,spec,index,battle.heroHit,true)
}
