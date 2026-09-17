import {RIG_HERO_ART,MODULAR_EQUIPMENT_ART,PORTRAIT_WEAPON_ART,HERO_WEAPON_SCALE,SHIELD_ART,FULL_BODY_IDLE_ART,FULL_BODY_ATTACK_ART,FULL_BODY_JUMP_ART,ellipse} from './art.js';
import {asset,fallbackWeapon,heldShield,fullBodyIdle,fullBodyAttack,fullBodyJump} from './portrait-art.js';
import {getAppliedRigConfig,getPartAdjustment,getRigPartKey,RIG_PART_LABELS} from './rig-config.js';

const A=RIG_HERO_ART;
const mix=(a,b,t)=>a+(b-a)*t;
const smooth=t=>t*t*(3-2*t);
const point=(p,a,d)=>[p[0]+Math.sin(a)*d,p[1]+Math.cos(a)*d];
const rotate=(p,a)=>[p[0]*Math.cos(a)-p[1]*Math.sin(a),p[0]*Math.sin(a)+p[1]*Math.cos(a)];

export function sampleRigPose(keys,t,config=getAppliedRigConfig()){
let i=1;while(i<keys.length-1&&t>keys[i][0])i++;
const [start,from]=keys[i-1],[end,to]=keys[i],f=smooth(Math.max(0,Math.min(1,(t-start)/(end-start))));
const source=typeof from==='string'?{...A.poses[from],...config.poses[from]}:from,target=typeof to==='string'?{...A.poses[to],...config.poses[to]}:to;
const pose={};for(const k of Object.keys(A.poses.standing)){const a=source[k],b=target[k],angular=!/^(hip|nearFoot[XY]|farFoot[XY])/.test(k)&&!A.directedAngles.includes(k);pose[k]=angular?a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*f:mix(a,b,f)}return pose
}

export function rigPose(name='standing',time=0,animated=false,config=getAppliedRigConfig()){
const p={...(A.poses[name]||A.poses.standing),...config.poses[name]};
if(!animated)return {...p};
if(name==='standing')return {...p,hipY:p.hipY+Math.sin(time*2)*1.5,lean:p.lean+Math.sin(time*2)*.008,head:p.head+Math.sin(time*1.5)*.012,nearArm:p.nearArm+Math.sin(time*2)*.018,farArm:p.farArm-Math.sin(time*2)*.018};
const clip=A.clips[name];return clip?sampleRigPose(clip.keys,(time%clip.duration)/clip.duration,config):p
}

function matrix(c){const m=c.getTransform();return [m.a,m.b,m.c,m.d,m.e,m.f]}
function projected(m,x,y){return [m[0]*x+m[2]*y+m[4],m[1]*x+m[3]*y+m[5]]}
function adjust(c,fit){c.translate(fit.x,fit.y);c.rotate(fit.rotation*Math.PI/180);c.scale(fit.scale*(fit.flipX?-1:1),fit.scale*(fit.flipY?-1:1))}
function beginPart(c,state,name,at,scale,angle,s){
const key=getRigPartKey(state.equipment,name),fit=getPartAdjustment(state.config,key);
c.save();c.translate(...at);c.rotate(angle);const editMatrix=matrix(c);adjust(c,fit);c.scale(scale*(s.mirror?-1:1),scale);
if(state.inspect){const m=matrix(c),[x,y,w,h]=s.rect,px=s.pivot[0],py=s.pivot[1];state.inspect.push({id:name,key,label:RIG_PART_LABELS[name]||name,matrix:m,editMatrix,origin:projected(m,0,0),bounds:[[x-px,y-py],[x+w-px,y-py],[x+w-px,y+h-py],[x-px,y+h-py]].map(p=>projected(m,...p))})}
}

function stamp(c,images,parts,name,at,scale,angle,state){
const s=parts[name],[x,y,w,h]=s.rect;scale=s.scale??scale;
beginPart(c,state,name,at,scale,angle,s);
if(s.clip){c.beginPath();s.clip.forEach(([px,py],i)=>i?c.lineTo(px-s.pivot[0],py-s.pivot[1]):c.moveTo(px-s.pivot[0],py-s.pivot[1]));c.closePath();c.clip()}
c.drawImage(images[s.sheet],x,y,w,h,x-s.pivot[0],y-s.pivot[1],w,h);c.restore()
}

function segment(c,images,parts,name,from,to,state,sleeve=false){
const s=parts[name],dx=s.tip[0]-s.pivot[0],dy=s.tip[1]-s.pivot[1],tx=to[0]-from[0],ty=to[1]-from[1];
const sourceLength=Math.hypot(dx,dy),scale=Math.hypot(tx,ty)/sourceLength,[x,y,w,h]=s.rect;
const sourceAngle=Math.atan2(dy,dx);
beginPart(c,state,name,from,scale,Math.atan2(ty,tx)-sourceAngle,s);
c.rotate(sourceAngle);c.beginPath();c.rect(sleeve?-100:-5,-1000,sourceLength+(sleeve?98:10),2000);c.clip();c.rotate(-sourceAngle);c.drawImage(images[s.sheet],x,y,w,h,x-s.pivot[0],y-s.pivot[1],w,h);c.restore()
}

function knee(hip,ankle,upper,lower){
const dx=ankle[0]-hip[0],dy=ankle[1]-hip[1],d=Math.max(.01,Math.hypot(dx,dy)),reach=Math.min(upper+lower-.01,Math.max(Math.abs(upper-lower)+.01,d));
const along=(upper*upper-lower*lower+reach*reach)/(2*reach),side=Math.sqrt(Math.max(0,upper*upper-along*along));
return [hip[0]+dx/d*along+dy/d*side,hip[1]+dy/d*along-dx/d*side]
}

function arm(c,images,parts,side,shoulder,upperAngle,lowerAngle,state,wristAngle=0,showWeapon=true){
const equipment=state.equipment;
const spec=A.body[side],elbow=point(shoulder,upperAngle,spec.upperArm),wrist=point(elbow,lowerAngle,spec.forearm),angle=.18-lowerAngle+wristAngle;
ellipse(c,...elbow,9,9,'#f8bd88');
segment(c,images,parts,`${side}UpperArm`,shoulder,elbow,state);segment(c,images,parts,`${side}Forearm`,elbow,wrist,state);
if(parts[`${side}Sleeve`])segment(c,images,parts,`${side}Sleeve`,shoulder,elbow,state,true);
if(side==='far'&&state.shield!==false&&SHIELD_ART[equipment.shield]){
const hand=parts.farHand,offset=[(hand.grip[0]-hand.pivot[0])*spec.handScale,(hand.grip[1]-hand.pivot[1])*spec.handScale];
c.save();c.translate(...wrist);c.rotate(angle);adjust(c,getPartAdjustment(state.config,getRigPartKey(equipment,'farHand')));heldShield(c,...offset,135,equipment.shield);c.restore()
}
if(side==='near'&&showWeapon){
const hand=parts.nearHand,offset=[(hand.grip[0]-hand.pivot[0])*spec.handScale,(hand.grip[1]-hand.pivot[1])*spec.handScale];
const w=PORTRAIT_WEAPON_ART[equipment.weapon],sword=w?asset(w.src):null;
c.save();c.translate(...wrist);c.rotate(angle);adjust(c,getPartAdjustment(state.config,getRigPartKey(equipment,'nearHand')));
if(sword){const s={rect:[0,0,sword.naturalWidth,sword.naturalHeight],pivot:w.pivot};beginPart(c,state,'weapon',offset,w.scale*.75*HERO_WEAPON_SCALE,spec.weaponRotation,s);c.drawImage(sword,-w.pivot[0],-w.pivot[1])}
else{beginPart(c,state,'weapon',offset,.75*HERO_WEAPON_SCALE,spec.weaponRotation,{rect:[-35,-50,310,100],pivot:[0,0]});fallbackWeapon(c,equipment.weapon)}c.restore();c.restore()
}
stamp(c,images,parts,`${side}Hand`,wrist,spec.handScale,angle,state)
}

export function hasRigEquipment(equipment){return Boolean(FULL_BODY_IDLE_ART[equipment.armor]||MODULAR_EQUIPMENT_ART[equipment.armor]||SHIELD_ART[equipment.shield])}

export function drawRigHero(c,x,y,height,equipment,time=0,options={}){
const images=Object.fromEntries(Object.entries(A.sources).map(([name,src])=>[name,asset(src)])),parts={...A.parts};
const gear=MODULAR_EQUIPMENT_ART[equipment.armor];
if(gear){images.armor=asset(gear.src);images.armorBottoms=asset(gear.bottomsSrc);for(const [name,part] of Object.entries(gear.parts))parts[name]={...part,sheet:part.sheet||'armor'}}
if(Object.values(images).some(image=>!image))return false;
const config=options.config||getAppliedRigConfig(),state={equipment,config,inspect:options.inspect,shield:options.shield};
const p=options.pose&&typeof options.pose==='object'?options.pose:rigPose(options.pose,time,options.animated!==false&&options.motion!==false,config),scale=height/500;
c.save();c.translate(x,y);c.scale(scale*config.facing,scale);c.translate(0,-A.body.floor);
if(options.shadow!==false)ellipse(c,10,A.body.floor,89,12,'#183c4833');
const hip=[p.hipX,p.hipY],local=q=>{const r=rotate(q,p.lean);return [hip[0]+r[0],hip[1]+r[1]]};
for(const side of ['far','near']){
const b=A.body[side],top=[hip[0]+b.hip[0],hip[1]+b.hip[1]],ankle=[p[`${side}FootX`],p[`${side}FootY`]],joint=knee(top,ankle,b.thigh,b.shin);
stamp(c,images,parts,`${side}Foot`,ankle,b.footScale,p[`${side}FootAngle`],state);ellipse(c,...joint,12,12,gear?.joint||'#f8bd88');segment(c,images,parts,`${side}Thigh`,top,joint,state);segment(c,images,parts,`${side}Shin`,joint,ankle,state)
}
stamp(c,images,parts,'pelvis',hip,A.body.pelvisScale,0,state);
arm(c,images,parts,'far',local(A.body.far.shoulder),p.farArm-p.lean,p.farForearm-p.lean,state,p.farWrist||0);
if(images.armor)stamp(c,images,parts,'neck',local(A.body.neckAttachment),A.body.torsoScale,p.lean,state);
stamp(c,images,parts,'torso',hip,A.body.torsoScale,p.lean,state);
const head=local(A.body.neck),headAngle=p.head+p.lean;
stamp(c,images,parts,'head',head,A.body.headScale,headAngle,state);
arm(c,images,parts,'near',local(A.body.near.shoulder),p.nearArm-p.lean,p.nearForearm-p.lean,state,p.nearWrist,options.weapon!==false);
if(options.hit>0){c.globalAlpha*=options.hit*.35;ellipse(c,0,-50,95,180,'#fff7df')}
c.restore();return true
}

export function rigPreview(c,width,height,equipment,time=0,options={}){
const scale=Math.min((height-34)/A.view.height,(width-40)/A.view.width);
if(FULL_BODY_IDLE_ART[equipment.armor]&&options.pose==='standing'&&fullBodyIdle(c,width*.45,height-28,500*scale,equipment,time,{...options,facing:(options.config||getAppliedRigConfig()).facing}))return true;
if(FULL_BODY_ATTACK_ART[equipment.armor]&&['attack','raised'].includes(options.pose)&&fullBodyAttack(c,width*.45,height-28,500*scale,equipment,time,{...options,facing:(options.config||getAppliedRigConfig()).facing}))return true;
if(FULL_BODY_JUMP_ART[equipment.armor]&&['airborne','landing'].includes(options.pose)){
let frame=options.pose,lift=frame==='airborne'?1:0;
if(options.animated&&options.motion!==false){
const clip=FULL_BODY_JUMP_ART[equipment.armor].preview,duration=clip.reduce((sum,step)=>sum+step[1],0);
let phase=Math.max(0,time)%duration;
for(const [name,hold,from,to] of clip){frame=name;lift=mix(from,to,smooth(Math.min(1,phase/hold)));if(phase<hold)break;phase-=hold}
}
const x=width*.45,y=height-28,size=500*scale;
const sources=[...FULL_BODY_JUMP_ART[equipment.armor].sources,FULL_BODY_IDLE_ART[equipment.armor].src];
if(sources.map(src=>asset(src)).every(Boolean)){
ellipse(c,x,y,size*(.18-lift*.05),size*(.022-lift*.005),'#183c4833');
if(fullBodyJump(c,x,y-lift*85*scale,size,equipment,time,{...options,frame,animated:false,shadow:false,facing:(options.config||getAppliedRigConfig()).facing}))return true
}
}
return equipment.armor==='armor_t1'?false:drawRigHero(c,width*.45,height-28,500*scale,equipment,time,{...options,animated:options.animated&&options.motion})
}

export function rigPortrait(c,width,height,equipment,time=0,options={}){
const x=width*.46,y=height-15,size=Math.min(300,height-25);
return fullBodyIdle(c,x,y,size,equipment,time,{...options,facing:(options.config||getAppliedRigConfig()).facing})||(equipment.armor==='armor_t1'?false:drawRigHero(c,x,y,size,equipment,time,options))
}

export function equipmentIllustration(c,width,height,id){
if(id==='shield_t1'){
const scale=Math.min(width*.3,height*.37);
c.clearRect(0,0,width,height);c.save();c.translate(width/2,height/2);c.scale(scale,scale);c.lineWidth=.1;c.lineJoin='round';c.strokeStyle='#77918d';c.fillStyle='#77918d1f';
c.beginPath();c.moveTo(0,-1);c.lineTo(.78,-.7);c.lineTo(.67,.24);c.quadraticCurveTo(.5,.77,0,1);c.quadraticCurveTo(-.5,.77,-.67,.24);c.lineTo(-.78,-.7);c.closePath();c.fill();c.stroke();
c.beginPath();c.moveTo(-.95,.95);c.lineTo(.95,-.95);c.stroke();c.restore();return true
}
const full=FULL_BODY_IDLE_ART[id],gear=full?{src:full.src,icon:full.rect}:MODULAR_EQUIPMENT_ART[id]||SHIELD_ART[id]||(PORTRAIT_WEAPON_ART[id]?.icon?PORTRAIT_WEAPON_ART[id]:null);
if(!gear)return false;
const img=asset(gear.src);if(!img)return false;
const [sx,sy,sw,sh]=gear.icon,scale=Math.min(width*.72/sw,height*.82/sh);
c.clearRect(0,0,width,height);c.drawImage(img,sx,sy,sw,sh,(width-sw*scale)/2,(height-sh*scale)/2,sw*scale,sh*scale);return true
}
