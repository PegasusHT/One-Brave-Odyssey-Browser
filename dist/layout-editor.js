import {cloneStrengthLayout,placeStrengthControls} from './strength-layout.js';
import {drawWorld} from './art.js';
import {drawStrength} from './strength-art.js';
import {freshPlayer} from './core.js';
import {Training} from './training.js';
const $=s=>document.querySelector(s),stage=$('#stage'),canvas=$('#preview'),ctx=canvas.getContext('2d');
const draftKey='one-brave-odyssey.strength-layout-draft.v1';
let layout=cloneStrengthLayout(),selected='hero',viewport=[844,390],drag=null,previous=0;
const history=[];
function status(text){$('#status').textContent=text}
function checkedLayout(raw){
if(!raw||raw.version!==1)throw Error('Use a version 1 Strength layout.');
const result=cloneStrengthLayout();
for(const key of ['hero','partner','kick','high','low','mid']){
const source=key==='hero'||key==='partner'?raw[key]:raw.controls?.[key],target=key==='hero'||key==='partner'?result[key]:result.controls[key];
for(const field of Object.keys(target)){
const value=source?.[field];
const [min,max]=field==='scale'?[.4,2]:field==='width'?[52,180]:field==='height'?[52,120]:[.03,.97];
if(!Number.isFinite(value)||value<min||value>max)throw Error('Invalid '+key+' '+field+': use '+min+'–'+max+'.');
target[field]=value
}
}
return result
}
try{const saved=localStorage.getItem(draftKey);if(saved)layout=checkedLayout(JSON.parse(saved))}catch{status('Stored draft could not be loaded. Showing the game layout.')}
const training=new Training('strength',freshPlayer(),()=>{});
training.countdown=0;training.nextSpawn=999;
function sample(){training.objects.clear();training.effects.clear();training.lastTextLife=0;training.attack=0;training.hit=0;training.elapsed=0;const o=training.spawnStrength(0);training.step(o.duration*.48)}
sample();
function record(){history.push(JSON.stringify(layout));if(history.length>50)history.shift();$('#undo').disabled=false}
function saveDraft(){try{localStorage.setItem(draftKey,JSON.stringify(layout));status('Draft saved here. Copy or download it to share with an agent.')}catch{status('Browser storage is unavailable. Copy or download the layout to keep it.')}}
function item(){return layout[selected]||layout.controls[selected]}
function syncInspector(){
const data=item(),actor=selected==='hero'||selected==='partner';
$('#selection').value=selected;
for(const key of ['x','y','scale','width','height'])$('#'+key).value=data[key]===undefined?'':Math.round(data[key]*(key==='x'||key==='y'?100:1)*100)/100;
$('#scale-field').hidden=!actor;$('#width-field').hidden=actor;$('#height-field').hidden=actor;
$('#json').value=JSON.stringify(layout,null,2);
for(const el of stage.querySelectorAll('[data-layout]'))el.classList.toggle('selected',el.dataset.layout===selected)
}
function position(){
const [w,h]=viewport;placeStrengthControls(stage,layout);
for(const key of ['hero','partner']){
const actor=layout[key],s=actor.scale,left=key==='hero'?75:88,right=key==='hero'?95:140,top=key==='hero'?173:245;
Object.assign(stage.querySelector('[data-layout="'+key+'"]').style,{left:(actor.x*w-left*s*w/1400)+'px',top:(actor.y*h-top*s*h/700)+'px',width:((left+right)*s*w/1400)+'px',height:((top+8)*s*h/700)+'px'})
}
}
function resize(){const [w,h]=viewport;stage.style.width=w+'px';stage.style.height=h+'px';$('#preview-shell').style.maxWidth=w+'px';const scale=Math.min(1,$('#preview-shell').clientWidth/w);stage.style.transform='scale('+scale+')';$('#preview-shell').style.height=h*scale+'px';canvas.width=w*2;canvas.height=h*2;position()}
new ResizeObserver(resize).observe($('#preview-shell'));
$('#viewport').addEventListener('change',()=>{viewport=$('#viewport').value.split(',').map(Number);resize()});
$('#selection').addEventListener('change',()=>{selected=$('#selection').value;syncInspector()});
for(const field of ['x','y','scale','width','height'])$('#'+field).addEventListener('change',()=>{
const input=$('#'+field);if(!input.reportValidity()||input.value===''){syncInspector();return}
record();item()[field]=Number(input.value)/(field==='x'||field==='y'?100:1);position();syncInspector();saveDraft()
});
stage.addEventListener('pointerdown',e=>{
const target=e.target.closest('[data-layout]');if(!target||e.button!==0)return;
e.preventDefault();selected=target.dataset.layout;record();syncInspector();target.focus({preventScroll:true});
const r=stage.getBoundingClientRect(),data=item();drag={id:e.pointerId,target,clientX:e.clientX,clientY:e.clientY,x:data.x,y:data.y,width:r.width,height:r.height};target.setPointerCapture(e.pointerId)
});
stage.addEventListener('pointermove',e=>{
if(!drag||e.pointerId!==drag.id)return;
item().x=Math.max(.03,Math.min(.97,drag.x+(e.clientX-drag.clientX)/drag.width));item().y=Math.max(.03,Math.min(.97,drag.y+(e.clientY-drag.clientY)/drag.height));position();syncInspector()
});
function endDrag(e){if(!drag||e.pointerId!==drag.id)return;drag=null;saveDraft()}
stage.addEventListener('pointerup',endDrag);stage.addEventListener('pointercancel',endDrag);stage.addEventListener('lostpointercapture',endDrag);
stage.addEventListener('keydown',e=>{
if(!e.target.closest('[data-layout]')||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;
e.preventDefault();selected=e.target.closest('[data-layout]').dataset.layout;record();const field=e.key==='ArrowLeft'||e.key==='ArrowRight'?'x':'y',sign=e.key==='ArrowLeft'||e.key==='ArrowUp'?-1:1;item()[field]=Math.max(.03,Math.min(.97,item()[field]+sign*(e.shiftKey?.01:.002)));position();syncInspector();saveDraft()
});
$('#undo').addEventListener('click',()=>{if(!history.length)return;layout=JSON.parse(history.pop());$('#undo').disabled=!history.length;position();syncInspector();saveDraft()});
$('#reset').addEventListener('click',()=>{record();layout=cloneStrengthLayout();position();syncInspector();saveDraft()});
$('#import').addEventListener('click',()=>{try{const next=checkedLayout(JSON.parse($('#json').value));record();layout=next;position();syncInspector();saveDraft()}catch(error){status(error.message)}});
$('#copy').addEventListener('click',async()=>{syncInspector();try{await navigator.clipboard.writeText($('#json').value);status('Layout copied. Paste it into your agent conversation.')}catch{$('details').open=true;$('#json').focus();$('#json').select();status('Select and copy the JSON below; clipboard access was unavailable.')}});
$('#download').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(layout,null,2)],{type:'application/json'})),link=document.createElement('a');link.href=url;link.download='strength-layout.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status('Layout downloaded. Share strength-layout.json with an agent.')});
$('#animate').addEventListener('change',sample);
function draw(timestamp){
const dt=previous?Math.min((timestamp-previous)/1000,.05):0;previous=timestamp;
if($('#animate').checked){training.step(dt);if(!training.objects.items.some(o=>o.active)){training.elapsed=0;training.lastTextLife=0;training.effects.clear();training.spawnStrength(Math.floor(Math.random()*3));training.throwPose=1}}
const [w,h]=viewport;ctx.setTransform(2,0,0,2,0,0);drawWorld(ctx,w,h,0,'training');ctx.save();ctx.scale(w/1400,h/700);drawStrength(ctx,training,0,layout);ctx.restore();requestAnimationFrame(draw)
}
resize();syncInspector();requestAnimationFrame(draw);
