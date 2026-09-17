import {RIG_HERO_ART,MODULAR_EQUIPMENT_ART} from './art.js';

export const RIG_CONFIG_KEY='one-brave-odyssey.hero-fit.v1';
export const RIG_DRAFT_KEY='one-brave-odyssey.hero-fit-draft.v1';

export const RIG_PART_LABELS={head:'Head',neck:'Neck',torso:'Torso',pelvis:'Waist',nearUpperArm:'Near upper arm',nearForearm:'Near forearm',nearHand:'Near palm',farUpperArm:'Far upper arm',farForearm:'Far forearm',farHand:'Far palm',nearThigh:'Near thigh',nearShin:'Near shin',nearFoot:'Near foot',farThigh:'Far thigh',farShin:'Far shin',farFoot:'Far foot',nearSleeve:'Near sleeve',farSleeve:'Far sleeve',weapon:'Sword'};

const poseLabels={hipX:'Hip horizontal',hipY:'Hip vertical',lean:'Body lean',head:'Head angle',nearArm:'Near upper arm',nearForearm:'Near forearm',nearWrist:'Near wrist',farArm:'Far upper arm',farForearm:'Far forearm',farWrist:'Far wrist',nearFootX:'Near foot horizontal',nearFootY:'Near foot vertical',nearFootAngle:'Near foot angle',farFootX:'Far foot horizontal',farFootY:'Far foot vertical',farFootAngle:'Far foot angle'};
const positionFields=new Set(['hipX','hipY','nearFootX','nearFootY','farFootX','farFootY']);
export const RIG_POSE_FIELDS=Object.keys(RIG_HERO_ART.poses.standing).map(key=>{const position=positionFields.has(key);return{key,label:poseLabels[key]||key,kind:position?'position':'angle',min:position?-400:-Math.PI*4,max:position?400:Math.PI*4,step:position?1:Math.PI/180}});

const partDefaults={x:0,y:0,rotation:0,scale:1,flipX:false,flipY:false};
const partLimits={x:[-300,300],y:[-300,300],rotation:[-720,720],scale:[.25,3]};
const partKeys=new Set([...Object.keys(RIG_HERO_ART.parts).map(name=>'base:'+name),...Object.entries(MODULAR_EQUIPMENT_ART).flatMap(([id,gear])=>Object.keys(gear.parts).map(name=>id+':'+name)),'base:weapon','weapon_t1:weapon','weapon_t2:weapon','weapon_t3:weapon']);
const poseNames=new Set(Object.keys(RIG_HERO_ART.poses));
const poseFields=new Map(RIG_POSE_FIELDS.map(field=>[field.key,field]));

export function createRigConfig(){return{version:1,facing:1,parts:{},poses:{}}}

function object(value,path){if(value===null||typeof value!=='object'||Array.isArray(value)||![Object.prototype,null].includes(Object.getPrototypeOf(value)))throw Error(path+' must be an object.');return value}
function allowedKeys(value,allowed,path){for(const key of Object.keys(value))if(!allowed.has(key))throw Error(path+' contains an unknown key: '+key+'.')}
function number(value,min,max,path){if(typeof value!=='number'||!Number.isFinite(value))throw Error(path+' must be a finite number.');if(value<min||value>max)throw Error(path+' must be between '+min+' and '+max+'.');return value}

export function normalizeRigConfig(raw){
object(raw,'Hero configuration');
allowedKeys(raw,new Set(['version','facing','parts','poses']),'Hero configuration');
if(raw.version!==1)throw Error('Hero configuration version must be 1.');
const config=createRigConfig();
if(Object.hasOwn(raw,'facing')){if(raw.facing!==1&&raw.facing!==-1)throw Error('Hero facing must be 1 or -1.');config.facing=raw.facing}
if(Object.hasOwn(raw,'parts')){
object(raw.parts,'parts');allowedKeys(raw.parts,partKeys,'parts');
for(const [key,value] of Object.entries(raw.parts)){
const path='parts['+key+']';object(value,path);allowedKeys(value,new Set(Object.keys(partDefaults)),path);
const part={...partDefaults};
for(const [field,entry] of Object.entries(value)){if(field==='flipX'||field==='flipY'){if(typeof entry!=='boolean')throw Error(path+'.'+field+' must be true or false.');part[field]=entry}else part[field]=number(entry,...partLimits[field],path+'.'+field)}
config.parts[key]=part
}
}
if(Object.hasOwn(raw,'poses')){
object(raw.poses,'poses');allowedKeys(raw.poses,poseNames,'poses');
for(const [name,value] of Object.entries(raw.poses)){
const path='poses['+name+']';object(value,path);allowedKeys(value,new Set(poseFields.keys()),path);
const pose={};for(const [key,entry] of Object.entries(value)){const field=poseFields.get(key);pose[key]=number(entry,field.min,field.max,path+'.'+key)}config.poses[name]=pose
}
}
return config
}

export function getRigPartKey(equipment={},name){
if(name==='weapon')return(equipment.weapon||'weapon_t1')+':weapon';
const id=equipment.armor;
return id&&Object.hasOwn(MODULAR_EQUIPMENT_ART[id]?.parts||{},name)?id+':'+name:'base:'+name
}

export function getPartAdjustment(config,key){return{...partDefaults,...config?.parts?.[key]}}

let appliedConfig=null;
export function getAppliedRigConfig(){
if(appliedConfig)return appliedConfig;
try{const saved=globalThis.localStorage?.getItem(RIG_CONFIG_KEY);appliedConfig=saved?normalizeRigConfig(JSON.parse(saved)):createRigConfig()}catch{appliedConfig=createRigConfig()}
return appliedConfig
}

export function applyRigConfig(raw){
const config=normalizeRigConfig(raw);
try{if(!globalThis.localStorage)throw Error('Storage unavailable');globalThis.localStorage.setItem(RIG_CONFIG_KEY,JSON.stringify(config))}catch{throw Error('Hero adjustments could not be saved on this device. Check browser storage and try again.')}
appliedConfig=config;return config
}

export function clearAppliedRigConfig(){
try{if(!globalThis.localStorage)throw Error('Storage unavailable');globalThis.localStorage.removeItem(RIG_CONFIG_KEY)}catch{throw Error('Saved hero adjustments could not be cleared on this device. Check browser storage and try again.')}
appliedConfig=createRigConfig();return appliedConfig
}

if(typeof window!=='undefined')window.addEventListener('storage',event=>{if(event.key===RIG_CONFIG_KEY||event.key===null)appliedConfig=null});
