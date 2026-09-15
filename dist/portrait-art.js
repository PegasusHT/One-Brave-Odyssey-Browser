import {EQUIPMENT_ART,IDLE_PORTRAIT_ART,PORTRAIT_WEAPON_ART,ellipse,poly} from './art.js';

const images=new Map();
export function asset(src){
if(!images.has(src)){const image=new Image();image.src=new URL(src,import.meta.url).href;images.set(src,image)}
const image=images.get(src);return image.complete&&image.naturalWidth?image:null
}

export function fallbackWeapon(c,id){
const w=EQUIPMENT_ART[id]||EQUIPMENT_ART.weapon_t1;
c.save();c.scale(2,2);c.rotate(Math.PI/2);c.translate(-12,12);
c.fillStyle='#725541';c.beginPath();c.roundRect(8,-51,8,50,3);c.fill();
c.fillStyle='#dfb464';c.beginPath();c.roundRect(-4,-38,32,7,2);c.fill();
poly(c,[[8,-38],[5,-w.length-25],[12,-w.length-46],[21,-w.length-25],[17,-38]],w.blade,'#345867');
poly(c,[[12,-w.length-46],[12,-40],[17,-40],[21,-w.length-25]],w.edge);c.restore()
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
c.save();c.translate((hand.x-ox)*normal,(hand.y-oy)*normal);c.rotate(hand.rotation);c.scale(hand.scale,hand.scale);
if(sword){c.scale(weapon.scale,weapon.scale);c.drawImage(sword,-weapon.pivot[0],-weapon.pivot[1])}else fallbackWeapon(c,equipment.weapon);
c.restore();
c.save();c.beginPath();
art.handMask.forEach(([x,y],i)=>{const px=(hand.x+x-ox)*normal,py=(hand.y+y-oy)*normal;i?c.lineTo(px,py):c.moveTo(px,py)});
c.closePath();c.clip();c.drawImage(sheet,sx,sy,sw,sh,dx,dy,dw,dh);c.restore();c.restore();return true
}
