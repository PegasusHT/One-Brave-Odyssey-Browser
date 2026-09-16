import {hero} from './art.js';
import {drawRigHero,hasRigEquipment,rigPose,sampleRigPose} from './rig-art.js';

export function equippedHero(c,x,y,scale=1,equipment={},time=0,attack=0,hit=0,scarf='#63dbc4',action=null,pose=null){
if(hasRigEquipment(equipment)){
const p=attack>0?sampleRigPose([[0,'standing'],[1,'attack']],Math.min(1,attack)):rigPose('standing',time,true);
if(action==='guard'){p.nearArm=.45;p.nearForearm=2;p.nearWrist=1.82}
if(action==='kick'&&attack>0){p.nearFootX=90*attack-30;p.nearFootY=153-90*attack;p.nearFootAngle=-.4*attack;p.nearArm=-.15;p.nearForearm=.14;p.nearWrist=0}
if(action==='0'&&attack>0){p.nearArm=1.7*attack;p.nearForearm=2.1*attack;p.nearWrist=1.9*attack}
if(action==='2'&&attack>0){p.nearArm=.5*attack;p.nearForearm=.9*attack;p.nearWrist=.75*attack}
if(drawRigHero(c,x,y,158*scale,equipment,time,{pose:p,shadow:pose?.shadow,hit}))return
}
hero(c,x,y,scale,equipment,time,attack,hit,scarf,action,pose)
}
