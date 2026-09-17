import {RIG_HERO_ART,MODULAR_EQUIPMENT_ART,FULL_BODY_IDLE_ART,FULL_BODY_JUMP_ART,ellipse} from './art.js';
import {readSave,ARMORY_SETS} from './core.js';
import {drawRigHero} from './rig-art.js';
import {fullBodyIdle,fullBodyAttack,fullBodyJump} from './portrait-art.js';
import {createRigConfig,normalizeRigConfig,getPartAdjustment,getRigPartKey,getAppliedRigConfig,applyRigConfig,clearAppliedRigConfig,RIG_DRAFT_KEY,RIG_PART_LABELS,RIG_POSE_FIELDS} from './rig-config.js';

const $=selector=>document.querySelector(selector),canvas=$('#preview'),ctx=canvas.getContext('2d'),stage=$('#stage');
const clone=value=>JSON.parse(JSON.stringify(value)),serialized=value=>JSON.stringify(value),clamp=(value,min,max)=>Math.max(min,Math.min(max,value)),degrees=value=>value*180/Math.PI,radians=value=>value*Math.PI/180;
const limits={x:[-300,300],y:[-300,300],rotation:[-720,720],scale:[.25,3]};
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let storage=null,initialMessage='Choose an armory set to preview. Apply saves your adjustments on this device.';
try{storage=window.localStorage}catch{}
const player=readSave(storage||{getItem(){return null}}).player;
const initialSet=ARMORY_SETS.find(set=>set.equipment.armor===player.equipment.armor)||ARMORY_SETS[0],equipment={...initialSet.equipment};
let previewMode=FULL_BODY_IDLE_ART[equipment.armor]?'game':'rig';
let config=clone(getAppliedRigConfig());
try{const draft=storage?.getItem(RIG_DRAFT_KEY);if(draft){config=normalizeRigConfig(JSON.parse(draft));initialMessage='Your local draft is restored.'}}catch{initialMessage='The saved draft could not be read. Started from the applied fit.'}
let selected='nearHand',poseName='standing',playing=false,animated=false,time=0,lastTime=0,zoom=1,guides=true,records=[],recordSignature='',drag=null,saveTimer=0,motionPreference=player.settings.motion,history=[],future=[],draftSaved=true;

function status(message){$('#status').textContent=message}
function snapshot(){return clone(config)}
function currentSet(){return ARMORY_SETS.find(set=>set.equipment.armor===equipment.armor)||ARMORY_SETS[0]}
function fitting(){return previewMode==='rig'}
function canFit(){return Boolean(MODULAR_EQUIPMENT_ART[equipment.armor])}
function syncMode(){
const complete=Boolean(FULL_BODY_IDLE_ART[equipment.armor]),editable=canFit();
if(!editable)previewMode='game';else if(!complete)previewMode='rig';
const mode=$('#preview-mode');mode.value=previewMode;mode.disabled=!complete||!editable;mode.querySelector('[value="game"]').disabled=!complete;mode.querySelector('[value="rig"]').disabled=!editable;
$('#fit-section').hidden=!fitting();$('#pose-section').hidden=!fitting();$('#guides').hidden=!fitting();
for(const input of document.querySelectorAll('[data-fit],[data-pose-field],#part'))input.disabled=!fitting();
$('#canvas-hint').textContent=fitting()?'Drag a part to move it. Drag the round handle to rotate.':'Choose a pose, then Play to preview the complete outfit.';
$('#equipment-hint').textContent=fitting()?'Armor, sword and shield change together for this preview. Part fitting does not change the complete artwork.':'Armor, sword and shield change together for this preview. Complete artwork has no separate editable limbs.';
$('#apply-hint').textContent=fitting()?'Applies facing and separate-part fits in this browser. Complete artwork keeps its original proportions. Reload another open game tab.':'Applies facing on this device. Complete artwork keeps its original proportions. Reload another open game tab.';
canvas.dataset.editable=String(fitting());canvas.setAttribute('aria-label',fitting()?'Editable hero. Select a part, then drag to move or use its round rotation handle. Arrow keys nudge; brackets rotate.':'Armory set preview. Choose a set, pose, facing and zoom using the controls.');
records=[];recordSignature='';if(fitting())partOptions(availableParts());syncFit();syncPlayback()
}
function availableParts(){const names=new Set(Object.keys(RIG_HERO_ART.parts).filter(name=>name!=='neck'||MODULAR_EQUIPMENT_ART[equipment.armor]));for(const name of Object.keys(MODULAR_EQUIPMENT_ART[equipment.armor]?.parts||{}))names.add(name);names.add('weapon');return [...names].map(id=>({id,key:getRigPartKey(equipment,id),label:RIG_PART_LABELS[id]||id}))}
function currentRecord(){return records.find(part=>part.id===selected)}
function selectedKey(){return currentRecord()?.key||getRigPartKey(equipment,selected)}
function currentFit(){return getPartAdjustment(config,selectedKey())}
function playable(){return poseName==='standing'||Boolean(RIG_HERO_ART.clips[poseName])}
function motionAllowed(){return motionPreference&&!reducedMotion.matches}
function historyState(){$('#undo').disabled=!history.length||Boolean(drag);$('#redo').disabled=!future.length||Boolean(drag)}
function recordHistory(before){if(serialized(before)===serialized(config))return;history.push(before);if(history.length>50)history.shift();future=[];historyState()}
function saveDraft(){clearTimeout(saveTimer);try{if(!storage)throw Error('Storage unavailable');storage.setItem(RIG_DRAFT_KEY,serialized(config));draftSaved=true;$('#draft-state').textContent='Draft saved';$('#draft-state').classList.remove('unsaved')}catch{draftSaved=false;$('#draft-state').textContent='Draft not saved';$('#draft-state').classList.add('unsaved');status('Browser storage is unavailable. Download JSON to keep your draft.')}}
function scheduleSave(){clearTimeout(saveTimer);$('#draft-state').textContent='Saving draft…';saveTimer=setTimeout(saveDraft,180)}
function syncJson(){if(document.activeElement!==$('#json'))$('#json').value=JSON.stringify(config,null,2)}
function syncFit(){const fit=currentFit();for(const input of document.querySelectorAll('[data-fit]')){const value=fit[input.dataset.fit];if(input.type==='checkbox')input.checked=value;else input.value=Number(value.toFixed(3))}$('#selection-tag').textContent=fitting()?(RIG_PART_LABELS[selected]||currentRecord()?.label||selected):currentSet().name}
function syncPose(){const pose={...RIG_HERO_ART.poses[poseName],...config.poses[poseName]};for(const field of RIG_POSE_FIELDS){const input=$(`[data-pose-field="${field.key}"]`),value=field.kind==='angle'?degrees(pose[field.key]):pose[field.key];input.value=Number(value.toFixed(3))}}
function syncPlayback(){const button=$('#play'),allowed=motionAllowed();button.disabled=!playable()||!allowed||Boolean(drag);button.textContent=playing?'Ⅱ Pause':'▶ Play';button.setAttribute('aria-pressed',String(playing));button.setAttribute('aria-label',!playable()?'This pose is static':!allowed?'Animation disabled by motion preference':playing?'Pause animation':'Play animation')}
function syncAll(){syncFit();syncPose();syncJson();$('#facing').value=String(config.facing);historyState();syncPlayback()}
function stopForPose(){playing=false;animated=false;time=0;syncPlayback()}
function commit(change,message){const before=snapshot(),next=snapshot();try{change(next);config=normalizeRigConfig(next);recordHistory(before);saveDraft();syncAll();if(draftSaved&&message)status(message)}catch(error){config=before;syncAll();status(error.message)}}
function partOptions(parts){const unique=[...new Map(parts.map(part=>[part.id,part])).values()],order=Object.keys(RIG_PART_LABELS);unique.sort((a,b)=>{const ai=order.indexOf(a.id),bi=order.indexOf(b.id);return(ai<0?100:ai)-(bi<0?100:bi)});const signature=unique.map(part=>part.id+':'+part.key).join('|');if(signature===recordSignature)return;recordSignature=signature;const select=$('#part');select.replaceChildren(...unique.map(part=>{const option=document.createElement('option');option.value=part.id;option.textContent=part.label;return option}));if(!unique.some(part=>part.id===selected))selected=unique.find(part=>part.id==='head')?.id||unique[0]?.id||'head';select.value=selected;syncFit()}
function selectPart(id){selected=id;$('#part').value=id;syncFit()}
function replaceDraft(next,message){const before=snapshot();try{config=normalizeRigConfig(next);recordHistory(before);stopForPose();saveDraft();syncAll();if(draftSaved)status(message)}catch(error){config=before;status(error.message)}}
function undo(){if(!history.length||drag)return;future.push(snapshot());if(future.length>50)future.shift();config=history.pop();stopForPose();saveDraft();syncAll();if(draftSaved)status('Edit undone.')}
function redo(){if(!future.length||drag)return;history.push(snapshot());if(history.length>50)history.shift();config=future.pop();stopForPose();saveDraft();syncAll();if(draftSaved)status('Edit restored.')}

for(const field of RIG_POSE_FIELDS){const label=document.createElement('label');label.textContent=field.label+(field.kind==='angle'?' · °':'');const input=document.createElement('input');input.type='number';input.dataset.poseField=field.key;input.min=field.kind==='angle'?Math.round(degrees(field.min)):field.min;input.max=field.kind==='angle'?Math.round(degrees(field.max)):field.max;input.step=field.kind==='angle'?1:field.step;input.inputMode='decimal';label.append(input);$('#pose-fields').append(label)}
$('#armory-set').replaceChildren(...ARMORY_SETS.map(set=>{const option=document.createElement('option');option.value=set.id;option.textContent=set.name;return option}));
$('#armory-set').value=initialSet.id;
$('#armory-set').addEventListener('change',event=>{cancelDrag();const set=ARMORY_SETS.find(item=>item.id===event.target.value);Object.assign(equipment,set.equipment);previewMode=FULL_BODY_IDLE_ART[equipment.armor]?'game':'rig';stopForPose();syncMode();status(set.name+' preview selected. Your saved game equipment is unchanged.')});
$('#preview-mode').addEventListener('change',event=>{cancelDrag();previewMode=event.target.value;stopForPose();syncMode();status(fitting()?'Editing separate-part fits. Complete artwork is unchanged.':'Previewing the complete outfit with its matching sword and shield.')});
$('#pose').addEventListener('change',event=>{cancelDrag();poseName=event.target.value;stopForPose();syncPose();status((fitting()?'Editing the ':'Previewing the ')+event.target.selectedOptions[0].textContent.toLowerCase()+' pose.')});
$('#part').addEventListener('change',event=>{cancelDrag();selectPart(event.target.value)});
$('#zoom').addEventListener('change',event=>{cancelDrag();zoom=Number(event.target.value)});
$('#facing').addEventListener('change',event=>{cancelDrag();commit(next=>{next.facing=Number(event.target.value)},'Hero facing updated in this draft.')});
for(const input of document.querySelectorAll('[data-fit]'))input.addEventListener('change',()=>{const key=selectedKey(),field=input.dataset.fit,value=input.type==='checkbox'?input.checked:input.valueAsNumber;commit(next=>{next.parts[key]={...getPartAdjustment(next,key),[field]:value}},'Part fit updated across poses.')});
for(const input of document.querySelectorAll('[data-pose-field]'))input.addEventListener('change',()=>{const field=RIG_POSE_FIELDS.find(item=>item.key===input.dataset.poseField),value=field.kind==='angle'?radians(input.valueAsNumber):input.valueAsNumber;stopForPose();commit(next=>{next.poses[poseName]={...next.poses[poseName],[field.key]:value}},'Selected pose updated. Connected limbs follow these values.')});

async function action(name){
if(drag)return;
if(name==='play'){playing=!playing;animated=true;syncPlayback();if(playing)status('Playing '+$('#pose').selectedOptions[0].textContent.toLowerCase()+'.'+(fitting()?' Dragging a part pauses playback.':''));return}
if(name==='guides'){guides=!guides;$('#guides').setAttribute('aria-pressed',String(guides));return}
if(name==='undo'){undo();return}
if(name==='redo'){redo();return}
if(name==='reset-part'){const key=selectedKey();commit(next=>{delete next.parts[key]},'Selected part restored. Undo brings your fit back.');return}
if(name==='reset-pose'){stopForPose();commit(next=>{delete next.poses[poseName]},'Selected pose restored. Undo brings your pose back.');return}
if(name==='reset-all'){replaceDraft(createRigConfig(),'Draft reset to defaults. Undo restores your draft; applied game fit is unchanged.');return}
if(name==='apply'){try{applyRigConfig(config);status('Hero adjustments applied on this device. Your saved equipment is unchanged. Reload another open game tab.')}catch(error){status(error.message)}return}
if(name==='revert-applied'){try{clearAppliedRigConfig();status('Game fit restored to defaults. Your draft is unchanged and can be applied again.')}catch(error){status(error.message)}return}
if(name==='download'){const blob=new Blob([JSON.stringify(config,null,2)+'\n'],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='one-brave-odyssey-hero-fit.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);status('JSON downloaded. Share it with Codex to apply this fit for all players.');return}
if(name==='copy'){try{await navigator.clipboard.writeText(JSON.stringify(config,null,2));status('Hero JSON copied.')}catch{$('#transfer-section').open=true;$('#json').value=JSON.stringify(config,null,2);$('#json').focus();$('#json').select();status('Select and copy the JSON below.')}return}
if(name==='import-text'){try{replaceDraft(JSON.parse($('#json').value),'JSON imported into your draft. Apply it when ready.')}catch(error){status('Invalid JSON: '+error.message)}return}
if(name==='import-file')$('#file').click()
}
document.addEventListener('pointerdown',event=>{const button=event.target.closest('button[data-action]');if(!button||button.disabled||event.button!==0||event.isPrimary===false)return;event.preventDefault();button.focus({preventScroll:true});action(button.dataset.action)});
document.addEventListener('click',event=>{if(event.detail!==0)return;const button=event.target.closest('button[data-action]');if(button&&!button.disabled)action(button.dataset.action)});
$('#file').addEventListener('change',async event=>{const file=event.target.files?.[0];if(!file)return;try{if(file.size>512000)throw Error('Choose a hero JSON file smaller than 500 KB.');replaceDraft(JSON.parse(await file.text()),'File imported into your draft. Apply it when ready.')}catch(error){status('Could not import file: '+error.message)}event.target.value=''});

function pointer(event){const rect=canvas.getBoundingClientRect();return[(event.clientX-rect.left)*canvas.width/rect.width,(event.clientY-rect.top)*canvas.height/rect.height]}
function inside(point,bounds){let hit=false;for(let i=0,j=bounds.length-1;i<bounds.length;j=i++){const a=bounds[i],b=bounds[j];if((a[1]>point[1])!==(b[1]>point[1])&&point[0]<(b[0]-a[0])*(point[1]-a[1])/(b[1]-a[1])+a[0])hit=!hit}return hit}
function rotationHandle(part){const d=canvas.width/canvas.getBoundingClientRect().width,minY=Math.min(...part.bounds.map(point=>point[1]));return[clamp(part.origin[0],20*d,canvas.width-20*d),clamp(minY-28*d,20*d,canvas.height-20*d)]}
function inverseDelta(matrix,delta){const [a,b,c,d]=matrix,det=a*d-b*c;if(Math.abs(det)<1e-8)return[0,0];return[(d*delta[0]-c*delta[1])/det,(-b*delta[0]+a*delta[1])/det]}
function cancelDrag(){if(!drag)return;const active=drag;drag=null;config=active.before;delete canvas.dataset.dragging;if(canvas.hasPointerCapture(active.pointerId))canvas.releasePointerCapture(active.pointerId);saveDraft();syncAll()}
function finishDrag(event){if(!drag||event.pointerId!==drag.pointerId)return;const active=drag;drag=null;delete canvas.dataset.dragging;if(canvas.hasPointerCapture(active.pointerId))canvas.releasePointerCapture(active.pointerId);recordHistory(active.before);saveDraft();syncAll();if(draftSaved)status('Part fit updated. Use pose controls to move its connected limb.')}
canvas.addEventListener('pointerdown',event=>{
if(!fitting()||event.button!==0||event.isPrimary===false||drag)return;
const at=pointer(event),d=canvas.width/canvas.getBoundingClientRect().width,part=currentRecord(),handle=part&&guides?rotationHandle(part):null;
const rotate=handle&&Math.hypot(at[0]-handle[0],at[1]-handle[1])<=22*d;
let hit=rotate?part:[...records].reverse().find(record=>inside(at,record.bounds));
if(!hit)hit=[...records].reverse().find(record=>Math.hypot(at[0]-record.origin[0],at[1]-record.origin[1])<=18*d);
if(!hit)return;
event.preventDefault();selectPart(hit.id);playing=false;guides=true;$('#guides').setAttribute('aria-pressed','true');canvas.focus({preventScroll:true});
const fit=currentFit(),matrix=hit.editMatrix,det=matrix[0]*matrix[3]-matrix[1]*matrix[2];
drag={pointerId:event.pointerId,mode:rotate?'rotate':'move',start:at,origin:hit.origin.slice(),matrix:matrix.slice(),fit,key:hit.key,before:snapshot(),lastAngle:Math.atan2(at[1]-hit.origin[1],at[0]-hit.origin[0]),turn:0,sign:det<0?-1:1};
canvas.dataset.dragging='true';canvas.setPointerCapture(event.pointerId);syncPlayback();historyState()
});
canvas.addEventListener('pointermove',event=>{
if(!drag||event.pointerId!==drag.pointerId)return;event.preventDefault();const at=pointer(event),fit={...drag.fit};
if(drag.mode==='move'){const delta=inverseDelta(drag.matrix,[at[0]-drag.start[0],at[1]-drag.start[1]]);fit.x=clamp(drag.fit.x+delta[0],...limits.x);fit.y=clamp(drag.fit.y+delta[1],...limits.y)}
else{const angle=Math.atan2(at[1]-drag.origin[1],at[0]-drag.origin[0]),change=Math.atan2(Math.sin(angle-drag.lastAngle),Math.cos(angle-drag.lastAngle));drag.turn+=degrees(change)*drag.sign;drag.lastAngle=angle;fit.rotation=clamp(drag.fit.rotation+drag.turn,...limits.rotation)}
const next=snapshot();next.parts[drag.key]=fit;config=normalizeRigConfig(next);syncFit();syncJson();scheduleSave()
});
canvas.addEventListener('pointerup',finishDrag);
canvas.addEventListener('pointercancel',event=>{if(drag?.pointerId===event.pointerId)cancelDrag()});
canvas.addEventListener('lostpointercapture',event=>{if(drag?.pointerId===event.pointerId)cancelDrag()});
canvas.addEventListener('keydown',event=>{
if(!fitting())return;
if(event.key==='Escape'){if(drag){event.preventDefault();cancelDrag()}return}
const vectors={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]},step=event.shiftKey?10:1;
if(!(event.key in vectors)&&event.key!=='['&&event.key!==']')return;
event.preventDefault();if(drag)return;playing=false;syncPlayback();const key=selectedKey(),part=currentRecord();
commit(next=>{const fit=getPartAdjustment(next,key);if(vectors[event.key]){const d=canvas.width/canvas.getBoundingClientRect().width,vector=vectors[event.key],delta=part?inverseDelta(part.editMatrix,[vector[0]*step*d,vector[1]*step*d]):[vector[0]*step,vector[1]*step];fit.x=clamp(fit.x+delta[0],...limits.x);fit.y=clamp(fit.y+delta[1],...limits.y)}else fit.rotation=clamp(fit.rotation+(event.key==='['?-step:step),...limits.rotation);next.parts[key]=fit},'Part adjusted. Shift uses a larger step.')
});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&drag){event.preventDefault();cancelDrag();return}if(!event.metaKey&&!event.ctrlKey)return;if(event.target.closest('input,select,textarea'))return;if(event.key.toLowerCase()==='z'){event.preventDefault();event.shiftKey?redo():undo()}else if(event.key.toLowerCase()==='y'){event.preventDefault();redo()}});

function backdrop(width,height,d){const sky=ctx.createLinearGradient(0,0,0,height);sky.addColorStop(0,'#a3c8cb');sky.addColorStop(.75,'#d6e1cc');sky.addColorStop(1,'#a7c5ae');ctx.fillStyle=sky;ctx.fillRect(0,0,width,height);ctx.strokeStyle='#315d5d10';ctx.lineWidth=d;const grid=40*d;ctx.beginPath();for(let x=width/2%grid;x<width;x+=grid){ctx.moveTo(x,0);ctx.lineTo(x,height)}for(let y=height*.88%grid;y<height;y+=grid){ctx.moveTo(0,y);ctx.lineTo(width,y)}ctx.stroke();ctx.strokeStyle='#466f6533';ctx.beginPath();ctx.moveTo(0,height*.88);ctx.lineTo(width,height*.88);ctx.stroke()}
function overlay(d){const part=currentRecord();if(!part)return;const handle=rotationHandle(part);ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.beginPath();part.bounds.forEach((point,index)=>index?ctx.lineTo(...point):ctx.moveTo(...point));ctx.closePath();ctx.fillStyle='#fff2b30b';ctx.fill();ctx.strokeStyle='#173745';ctx.lineWidth=4*d;ctx.stroke();ctx.strokeStyle='#ffe4a8';ctx.lineWidth=2*d;ctx.stroke();ctx.setLineDash([4*d,4*d]);ctx.beginPath();ctx.moveTo(...part.origin);ctx.lineTo(...handle);ctx.strokeStyle='#183f4b';ctx.lineWidth=1.5*d;ctx.stroke();ctx.setLineDash([]);ctx.beginPath();ctx.arc(...part.origin,5*d,0,Math.PI*2);ctx.fillStyle='#ffe4a8';ctx.fill();ctx.lineWidth=2*d;ctx.strokeStyle='#173745';ctx.stroke();ctx.beginPath();ctx.arc(...handle,9*d,0,Math.PI*2);ctx.fillStyle='#173745';ctx.fill();ctx.lineWidth=2*d;ctx.strokeStyle='#ffe4a8';ctx.stroke();ctx.restore()}
function drawComplete(x,y,size,options){
const drawOptions={...options,facing:config.facing};
if(poseName==='standing')return fullBodyIdle(ctx,x,y,size,equipment,time,drawOptions);
if(['attack','raised','windup'].includes(poseName)){
if(poseName==='windup')drawOptions.frame=0;
return fullBodyAttack(ctx,x,y,size,equipment,time,drawOptions)
}
const jump=FULL_BODY_JUMP_ART[equipment.armor];
if(!jump)return fullBodyIdle(ctx,x,y,size,equipment,time,drawOptions);
let name=poseName==='reach'?'strike':poseName,lift=name==='airborne'||name==='strike'?1:0;
if(options.animated&&options.motion){
const duration=jump.preview.reduce((sum,step)=>sum+step[1],0);let phase=Math.max(0,time)%duration;
for(const [frame,hold,from,to] of jump.preview){const fraction=Math.min(1,phase/hold);name=frame;lift=from+(to-from)*fraction*fraction*(3-2*fraction);if(phase<hold)break;phase-=hold}
}
ellipse(ctx,x,y,size*(.18-lift*.05),size*(.022-lift*.005),'#183c4833');
return fullBodyJump(ctx,x,y-lift*size*.17,size,equipment,time,{...drawOptions,frame:name,animated:false,shadow:false})
}

function frame(timestamp){requestAnimationFrame(frame);const dt=lastTime?Math.min((timestamp-lastTime)/1000,.05):0;lastTime=timestamp;if(document.hidden)return;const rect=stage.getBoundingClientRect();if(!rect.width||!rect.height)return;const d=Math.min(window.devicePixelRatio||1,2),width=Math.round(rect.width*d),height=Math.round(rect.height*d);if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height}ctx.setTransform(1,0,0,1,0,0);backdrop(width,height,d);if(playing&&motionAllowed()&&!drag)time+=dt;const inspect=[],fitScale=Math.min((height-44*d)/RIG_HERO_ART.view.height,(width-35*d)/RIG_HERO_ART.view.width)*zoom;const options={pose:poseName,animated:animated&&playable(),motion:motionAllowed(),config,inspect},size=Math.max(.05,fitScale)*500,ready=fitting()?drawRigHero(ctx,width*.49,height*.88,size,equipment,time,options):drawComplete(width*.49,height*.88,size,options);records=inspect;$('#loading').hidden=ready;if(ready&&fitting())partOptions(records);if(guides&&ready&&fitting())overlay(d);syncPlayback()}
reducedMotion.addEventListener('change',()=>{lastTime=0;syncPlayback()});
document.addEventListener('visibilitychange',()=>{lastTime=0;if(document.hidden&&drag)cancelDrag()});
window.addEventListener('storage',event=>{if(event.key==='one-brave-odyssey.browser.v1'||event.key===null){motionPreference=readSave(storage||{getItem(){return null}}).player.settings.motion;syncPlayback()}});
window.addEventListener('pagehide',()=>{if(drag)cancelDrag();saveDraft()});
window.addEventListener('resize',()=>{if(drag)cancelDrag();lastTime=0});
syncMode();syncAll();status(initialMessage);requestAnimationFrame(frame);
