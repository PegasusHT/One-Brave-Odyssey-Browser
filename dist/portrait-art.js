import {EQUIPMENT_ART,IDLE_PORTRAIT_ART,PORTRAIT_WEAPON_ART,SHIELD_ART,HERO_WEAPON_SCALE,FULL_BODY_IDLE_ART,FULL_BODY_ATTACK_ART,FULL_BODY_JUMP_ART,ellipse,poly} from './art.js';

const images=new Map();
export function asset(src){
if(!images.has(src)){const image=new Image();image.src=new URL(src,import.meta.url).href;images.set(src,image)}
const image=images.get(src);return image.complete&&image.naturalWidth?image:null
}

export function heldShield(c,x,y,height,id,rotation=0){
const art=SHIELD_ART[id],image=art?asset(art.src):null;if(!image)return false;
const [sx,sy,sw,sh]=art.back,scale=height/sh;
c.save();c.translate(x,y);c.rotate(rotation);c.scale(scale,scale);c.drawImage(image,sx,sy,sw,sh,sx-art.pivot[0],sy-art.pivot[1],sw,sh);c.restore();return true
}

export function fallbackWeapon(c,id){
const w=EQUIPMENT_ART[id]||EQUIPMENT_ART.weapon_t1;
c.save();c.scale(2,2);c.rotate(Math.PI/2);c.translate(-12,12);
c.fillStyle='#725541';c.beginPath();c.roundRect(8,-51,8,50,3);c.fill();
c.fillStyle='#dfb464';c.beginPath();c.roundRect(-4,-38,32,7,2);c.fill();
poly(c,[[8,-38],[5,-w.length-25],[12,-w.length-46],[21,-w.length-25],[17,-38]],w.blade,'#345867');
poly(c,[[12,-w.length-46],[12,-40],[17,-40],[21,-w.length-25]],w.edge);c.restore()
}

function fullBodyFrame(c,x,y,height,equipment,art,frame,options={}){
const sheet=asset(frame.src||art.src),weapon=PORTRAIT_WEAPON_ART[equipment.weapon],sword=weapon?asset(weapon.src):null;
if(!sheet)return false;
const [sx,sy,sw,sh]=frame.rect,[ox,oy]=frame.origin,referenceHeight=frame.height||art.height,scale=height/referenceHeight;
c.save();c.translate(x,y);if(options.shadow!==false)ellipse(c,0,0,height*.18,height*.022,'#183c4833');c.scale(scale*(options.facing??1),scale*(options.stretch??1));
if(frame.farHand&&options.shield!==false)heldShield(c,frame.farHand.x-ox,frame.farHand.y-oy,referenceHeight*.27,equipment.shield,frame.farHand.rotation);
c.save();
if(frame.clip){c.beginPath();frame.clip.forEach(([px,py],i)=>i?c.lineTo(px-ox,py-oy):c.moveTo(px-ox,py-oy));c.closePath();c.clip()}
c.drawImage(sheet,sx,sy,sw,sh,sx-ox,sy-oy,sw,sh);c.restore();
if(options.weapon!==false){
c.save();c.translate(frame.hand.x-ox,frame.hand.y-oy);c.rotate(frame.hand.rotation);c.scale(referenceHeight/500*HERO_WEAPON_SCALE,referenceHeight/500*HERO_WEAPON_SCALE);
if(sword){c.scale(weapon.scale,weapon.scale);c.drawImage(sword,-weapon.pivot[0],-weapon.pivot[1])}else if(art.weaponFallback==='original')fallbackWeapon(c,equipment.weapon);else{
const w=EQUIPMENT_ART[equipment.weapon]||EQUIPMENT_ART.weapon_t1,tip=w.length*2+22;
c.fillStyle='#725541';c.beginPath();c.roundRect(-25,-5,46,10,3);c.fill();
c.fillStyle='#dfb464';c.beginPath();c.roundRect(18,-17,7,34,2);c.fill();
poly(c,[[25,-7],[tip-32,-11],[tip,0],[tip-32,11],[25,7]],w.blade,'#345867');
poly(c,[[25,0],[tip,0],[tip-32,11],[25,7]],w.edge)
}
c.restore();c.save();c.beginPath();frame.handMask.forEach(([px,py],i)=>i?c.lineTo(px-ox,py-oy):c.moveTo(px-ox,py-oy));c.closePath();c.clip();
c.drawImage(sheet,sx,sy,sw,sh,sx-ox,sy-oy,sw,sh);c.restore()
}
if(options.hit>0){c.globalAlpha*=options.hit*.35;ellipse(c,0,-referenceHeight*.5,referenceHeight*.19,referenceHeight*.36,'#fff7df')}
c.restore();return true
}

export function fullBodyIdle(c,x,y,height,equipment,time=0,options={}){
const art=FULL_BODY_IDLE_ART[equipment.armor];if(!art)return false;
if(art.frames){
const index=options.animated!==false&&options.motion!==false?Math.floor(Math.max(0,time)/art.frameSeconds)%art.frames.length:0;
return fullBodyFrame(c,x,y,height,equipment,art,art.frames[index],options)
}
const breath=options.animated!==false&&options.motion!==false?art.breathStretch*(1-Math.cos(time*Math.PI*2/art.breathSeconds))/2:0;
return fullBodyFrame(c,x,y,height,equipment,art,art,{...options,stretch:1+breath})
}

export function fullBodyAttack(c,x,y,height,equipment,time=0,options={}){
const art=FULL_BODY_ATTACK_ART[equipment.armor];if(!art)return false;
const sheet=asset(art.src),explicit=Object.hasOwn(options,'frame');
let index=explicit?options.frame:art.defaultFrames?.[options.pose||'attack']??(options.pose==='raised'?1:2);
if(!explicit&&options.animated&&options.motion!==false){
const clip=art.clips[options.pose]||art.clips.attack,duration=clip.reduce((sum,step)=>sum+step[1],0);
let phase=Math.max(0,time)%duration;
for(const [frame,hold] of clip){index=frame;if(phase<hold)break;phase-=hold}
}
if(index===null)return fullBodyIdle(c,x,y,height,equipment,explicit?time:0,{...options,animated:explicit?options.animated:false});
if(!sheet||!Number.isInteger(index)||!art.frames[index])return false;
return fullBodyFrame(c,x,y,height,equipment,art,art.frames[index],options)
}

export function fullBodyJump(c,x,y,height,equipment,time=0,options={}){
const art=FULL_BODY_JUMP_ART[equipment.armor];if(!art)return false;
const ready=art.sources.map(src=>asset(src));if(ready.some(sheet=>!sheet))return false;
const name=options.frame||'airborne';
if(name==='standing')return fullBodyIdle(c,x,y,height,equipment,time,options);
const frame=art.frames[name];return frame?fullBodyFrame(c,x,y,height,equipment,art,frame,options):false
}

export function idlePortrait(c,width,height,equipment,time=0){
const art=IDLE_PORTRAIT_ART,sheet=asset(art.src),weapon=PORTRAIT_WEAPON_ART[equipment.weapon],sword=weapon?asset(weapon.src):null;
if(!sheet)return false;
const frame=art.frames[Math.floor(Math.max(0,time)/art.frameSeconds)%art.frames.length],normal=art.referenceHeight/frame.height;
const [sx,sy,sw,sh]=frame.rect,[ox,oy]=frame.origin,hand=frame.hand,scale=Math.min(art.height,height-art.baseline-10)/art.referenceHeight;
const dx=(sx-ox)*normal,dy=(sy-oy)*normal,dw=sw*normal,dh=sh*normal;
c.save();c.translate(width/2,height-art.baseline);c.scale(scale,scale);
ellipse(c,0,0,80,13,'#183c4844');
c.drawImage(sheet,sx,sy,sw,sh,dx,dy,dw,dh);
c.save();c.translate((hand.x-ox)*normal,(hand.y-oy)*normal);c.rotate(hand.rotation);c.scale(hand.scale*HERO_WEAPON_SCALE,hand.scale*HERO_WEAPON_SCALE);
if(sword){c.scale(weapon.scale,weapon.scale);c.drawImage(sword,-weapon.pivot[0],-weapon.pivot[1])}else fallbackWeapon(c,equipment.weapon);
c.restore();
c.save();c.beginPath();
art.handMask.forEach(([x,y],i)=>{const px=(hand.x+x-ox)*normal,py=(hand.y+y-oy)*normal;i?c.lineTo(px,py):c.moveTo(px,py)});
c.closePath();c.clip();c.drawImage(sheet,sx,sy,sw,sh,dx,dy,dw,dh);c.restore();c.restore();return true
}
