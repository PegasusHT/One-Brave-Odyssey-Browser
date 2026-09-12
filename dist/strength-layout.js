export const STRENGTH_LAYOUT={
version:1,
hero:{x:.225,y:.68,scale:.972},
partner:{x:.66,y:.68,scale:.72},
controls:{kick:{x:.105,y:.80,width:68,height:54},high:{x:.83,y:.68,width:62,height:52},low:{x:.83,y:.80,width:62,height:52},mid:{x:.915,y:.80,width:62,height:52}}
};
export function cloneStrengthLayout(){return JSON.parse(JSON.stringify(STRENGTH_LAYOUT))}
export function strengthPoint(x,y,layout=STRENGTH_LAYOUT){
const h=layout.hero,p=layout.partner,a=h.scale/1.35,b=p.scale;
if(x<=430)return{x:h.x*1400+(x-335)*a,y:h.y*700+(y-510)*a,scale:a};
if(x>=1110)return{x:p.x*1400+(x-1190)*b,y:p.y*700+(y-510)*b,scale:b};
const u=(x-430)/680,scale=a+(b-a)*u;
return{x:h.x*1400+95*a+(p.x*1400-80*b-h.x*1400-95*a)*u,y:(h.y+(p.y-h.y)*u)*700+(y-510)*scale,scale}
}
export function strengthControlRects(width,height,layout=STRENGTH_LAYOUT){
const result={};
for(const [key,value] of Object.entries(layout.controls)){
const w=Math.max(52,Math.min(value.width,width-16)),h=Math.max(52,Math.min(value.height,height-16));
result[key]={x:Math.max(8,Math.min(width-w-8,value.x*width-w/2)),y:Math.max(8,Math.min(height-h-8,value.y*height-h/2)),width:w,height:h}
}
const {high,low,mid}=result;
if(Math.abs(low.x-mid.x)<(low.width+mid.width)/2+8&&Math.abs(low.y-mid.y)<(low.height+mid.height)/2+8){const stacked=Math.abs(high.x-low.x)<1;low.x=Math.max(8,mid.x-low.width-8);if(stacked)high.x=low.x}
if(Math.abs(high.x-low.x)<high.width&&low.y-high.y<high.height+8)high.y=Math.max(8,low.y-high.height-8);
return result
}
export function placeStrengthControls(root,layout=STRENGTH_LAYOUT){
const width=root.clientWidth,height=root.clientHeight,rects=strengthControlRects(width,height,layout);
for(const [key,rect] of Object.entries(rects)){
const el=root.querySelector(`[data-layout="${key}"]`);
if(el)Object.assign(el.style,{left:rect.x+'px',top:rect.y+'px',width:rect.width+'px',height:rect.height+'px'})
}
}
