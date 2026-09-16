import {RIG_HERO_ART,MODULAR_EQUIPMENT_ART,PORTRAIT_WEAPON_ART,ellipse} from './art.js';
import {asset,fallbackWeapon} from './portrait-art.js';

const A=RIG_HERO_ART;
const mix=(a,b,t)=>a+(b-a)*t;
const smooth=t=>t*t*(3-2*t);
const point=(p,a,d)=>[p[0]+Math.sin(a)*d,p[1]+Math.cos(a)*d];
const rotate=(p,a)=>[p[0]*Math.cos(a)-p[1]*Math.sin(a),p[0]*Math.sin(a)+p[1]*Math.cos(a)];

export function sampleRigPose(keys,t){
let i=1;while(i<keys.length-1&&t>keys[i][0])i++;
const [start,from]=keys[i-1],[end,to]=keys[i],f=smooth(Math.max(0,Math.min(1,(t-start)/(end-start))));
const pose={};for(const k of Object.keys(A.poses.standing)){const a=A.poses[from][k],b=A.poses[to][k],angular=!/^(hip|nearFoot[XY]|farFoot[XY])/.test(k)&&!A.directedAngles.includes(k);pose[k]=angular?a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*f:mix(a,b,f)}return pose
}

export function rigPose(name='standing',time=0,animated=false){
const p=A.poses[name]||A.poses.standing;
if(!animated)return {...p};
if(name==='standing')return {...p,hipY:p.hipY+Math.sin(time*2)*1.5,lean:Math.sin(time*2)*.008,head:Math.sin(time*1.5)*.012,nearArm:p.nearArm+Math.sin(time*2)*.018,farArm:p.farArm-Math.sin(time*2)*.018};
const clip=A.clips[name];return sampleRigPose(clip.keys,(time%clip.duration)/clip.duration)
}

function stamp(c,images,parts,name,at,scale,angle=0){
const s=parts[name],[x,y,w,h]=s.rect;scale=s.scale??scale;
c.save();c.translate(...at);c.rotate(angle);c.scale(scale*(s.mirror?-1:1),scale);
if(s.clip){c.beginPath();s.clip.forEach(([px,py],i)=>i?c.lineTo(px-s.pivot[0],py-s.pivot[1]):c.moveTo(px-s.pivot[0],py-s.pivot[1]));c.closePath();c.clip()}
c.drawImage(images[s.sheet],x,y,w,h,x-s.pivot[0],y-s.pivot[1],w,h);c.restore()
}

function segment(c,images,parts,name,from,to,sleeve=false){
const s=parts[name],dx=s.tip[0]-s.pivot[0],dy=s.tip[1]-s.pivot[1],tx=to[0]-from[0],ty=to[1]-from[1];
const sourceLength=Math.hypot(dx,dy),scale=Math.hypot(tx,ty)/sourceLength,[x,y,w,h]=s.rect;
c.save();c.translate(...from);c.rotate(Math.atan2(ty,tx));c.scale(scale,scale);c.beginPath();c.rect(sleeve?-100:-5,-1000,sourceLength+(sleeve?98:10),2000);c.clip();c.rotate(-Math.atan2(dy,dx));c.drawImage(images[s.sheet],x,y,w,h,x-s.pivot[0],y-s.pivot[1],w,h);c.restore()
}

function knee(hip,ankle,upper,lower){
const dx=ankle[0]-hip[0],dy=ankle[1]-hip[1],d=Math.max(.01,Math.hypot(dx,dy)),reach=Math.min(upper+lower-.01,Math.max(Math.abs(upper-lower)+.01,d));
const along=(upper*upper-lower*lower+reach*reach)/(2*reach),side=Math.sqrt(Math.max(0,upper*upper-along*along));
return [hip[0]+dx/d*along+dy/d*side,hip[1]+dy/d*along-dx/d*side]
}

function arm(c,images,parts,side,shoulder,upperAngle,lowerAngle,equipment,wristAngle=0){
const spec=A.body[side],elbow=point(shoulder,upperAngle,spec.upperArm),wrist=point(elbow,lowerAngle,spec.forearm),angle=.18-lowerAngle+wristAngle;
ellipse(c,...elbow,9,9,'#f8bd88');
segment(c,images,parts,`${side}UpperArm`,shoulder,elbow);segment(c,images,parts,`${side}Forearm`,elbow,wrist);
if(parts[`${side}Sleeve`])segment(c,images,parts,`${side}Sleeve`,shoulder,elbow,true);
if(side==='near'){
const hand=A.parts.nearHand,offset=rotate([(hand.grip[0]-hand.pivot[0])*spec.handScale,(hand.grip[1]-hand.pivot[1])*spec.handScale],angle);
const w=PORTRAIT_WEAPON_ART[equipment.weapon],sword=w?asset(w.src):null;
c.save();c.translate(wrist[0]+offset[0],wrist[1]+offset[1]);c.rotate(angle+spec.weaponRotation);
if(sword){c.scale(w.scale*.75,w.scale*.75);c.drawImage(sword,-w.pivot[0],-w.pivot[1])}else{c.scale(.75,.75);fallbackWeapon(c,equipment.weapon)}c.restore()
}
stamp(c,images,parts,`${side}Hand`,wrist,spec.handScale,angle)
}

export function hasRigEquipment(equipment){return ['armor','helmet','bottoms'].some(slot=>MODULAR_EQUIPMENT_ART[equipment[slot]])}

export function drawRigHero(c,x,y,height,equipment,time=0,options={}){
const images={upper:asset(A.sources.upper),lower:asset(A.sources.lower)},parts={...A.parts};
for(const slot of ['armor','helmet','bottoms']){const gear=MODULAR_EQUIPMENT_ART[equipment[slot]];if(!gear)continue;images[slot]=asset(gear.src);for(const [name,part] of Object.entries(gear.parts))parts[name]={...part,sheet:slot}}
if(Object.values(images).some(image=>!image))return false;
const p=typeof options.pose==='object'?options.pose:rigPose(options.pose,time,options.animated!==false&&options.motion!==false),scale=height/500;
c.save();c.translate(x,y);c.scale(scale,scale);c.translate(0,-A.body.floor);
if(options.shadow!==false)ellipse(c,10,A.body.floor,89,12,'#183c4833');
const hip=[p.hipX,p.hipY],local=q=>{const r=rotate(q,p.lean);return [hip[0]+r[0],hip[1]+r[1]]};
for(const side of ['far','near']){
const b=A.body[side],top=[hip[0]+b.hip[0],hip[1]+b.hip[1]],ankle=[p[`${side}FootX`],p[`${side}FootY`]],joint=knee(top,ankle,b.thigh,b.shin);
stamp(c,images,parts,`${side}Foot`,ankle,b.footScale,p[`${side}FootAngle`]);ellipse(c,...joint,12,12,MODULAR_EQUIPMENT_ART[equipment.bottoms]?.joint||'#f8bd88');segment(c,images,parts,`${side}Thigh`,top,joint);segment(c,images,parts,`${side}Shin`,joint,ankle)
}
stamp(c,images,parts,'pelvis',hip,A.body.pelvisScale);
arm(c,images,parts,'far',local(A.body.far.shoulder),p.farArm-p.lean,p.farForearm-p.lean,equipment,0);
if(images.armor){const neckParts={neck:{...A.parts.torso,rect:[587,105,138,121],clip:[[604,105],[704,130],[710,176],[724,204],[678,224],[596,172]]}};stamp(c,images,neckParts,'neck',hip,A.body.torsoScale,p.lean)}
stamp(c,images,parts,'torso',hip,A.body.torsoScale,p.lean);
const head=local(A.body.neck),headAngle=p.head+p.lean;
stamp(c,images,parts,'head',head,A.body.headScale,headAngle);
if(parts.helmet)stamp(c,images,parts,'helmet',head,1,headAngle);
arm(c,images,parts,'near',local(A.body.near.shoulder),p.nearArm-p.lean,p.nearForearm-p.lean,equipment,p.nearWrist);
if(options.hit>0){c.globalAlpha*=options.hit*.35;ellipse(c,0,-50,95,180,'#fff7df')}
c.restore();return true
}

export function rigPreview(c,width,height,equipment,time=0,options={}){
const scale=Math.min((height-34)/A.view.height,(width-40)/A.view.width);
return drawRigHero(c,width*.45,height-28,500*scale,equipment,time,{...options,animated:options.animated&&options.motion})
}

export function rigPortrait(c,width,height,equipment,time=0){return drawRigHero(c,width*.46,height-15,Math.min(300,height-25),equipment,time)}

export function equipmentIllustration(c,width,height,id){
const gear=MODULAR_EQUIPMENT_ART[id];
if(!gear&&id!=='helmet_t1'&&id!=='bottoms_t1')return false;
if(id==='helmet_t1'){c.clearRect(0,0,width,height);c.save();c.fillStyle='#355e61';c.font='700 48px sans-serif';c.textAlign='center';c.fillText('—',width/2,height*.6);c.restore();return true}
const src=gear?.src||A.sources.upper,img=asset(src);if(!img)return false;
const [sx,sy,sw,sh]=gear?.icon||A.parts.pelvis.rect,scale=Math.min(width*.72/sw,height*.82/sh);
c.clearRect(0,0,width,height);c.drawImage(img,sx,sy,sw,sh,(width-sw*scale)/2,(height-sh*scale)/2,sw*scale,sh*scale);return true
}
