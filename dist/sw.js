const CACHE_NAME='obo-game-2026-09-16-4';
const FILES=['./','index.html','style.css','game.js','core.js','art.js','portrait-art.js','action-art.js','rig-art.js','hero-art.js','training.js','battle.js','strength-layout.js','strength-art.js','dodge-art.js','block-art.js','critical-art.js','mobile.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png','assets/hero-idle/idle.png','assets/hero-idle/wayfarer-upgrade-iii.png','assets/hero-actions/jump-land.png','assets/hero-actions/attack.png','assets/hero-rig/upper.png','assets/hero-rig/lower.png','assets/hero-equipment/set-a-armor.png','assets/hero-equipment/set-b-armor.png','assets/hero-equipment/set-a-helmet.png','assets/hero-equipment/set-b-helmet.png','assets/hero-equipment/set-a-bottoms.png','assets/hero-equipment/set-b-bottoms.png'];
const localPreview=['localhost','127.0.0.1','[::1]'].includes(new URL(self.registration.scope).hostname);
const urls=FILES.map(file=>new URL(file,self.registration.scope).href);
self.addEventListener('install',event=>event.waitUntil((async()=>{
try{
const responses=await Promise.all(urls.map(async url=>{
const response=await fetch(new Request(url,{cache:'reload',credentials:'same-origin',redirect:'error'}));
if(!response.ok)throw Error('Offline file unavailable');
const type=response.headers.get('content-type')||'';
if(url.endsWith('.js')&&!/(javascript|ecmascript)/.test(type))throw Error('Invalid game script');
if((url===urls[0]||url.endsWith('index.html'))&&!(await response.clone().text()).includes('id="world"'))throw Error('Game page unavailable');
return response
}));
const cache=await caches.open(CACHE_NAME);
await Promise.all(urls.map((url,i)=>cache.put(url,responses[i])))
}catch(error){await caches.delete(CACHE_NAME);throw error}
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
for(const name of await caches.keys())if(name.startsWith('obo-game-')&&name!==CACHE_NAME)await caches.delete(name);
await self.clients.claim()
})()));
self.addEventListener('fetch',event=>{
if(event.request.method!=='GET')return;
const requested=new URL(event.request.url);requested.search='';requested.hash='';
if(!urls.includes(requested.href))return;
event.respondWith((async()=>{
if(localPreview){try{return await fetch(new Request(event.request,{cache:'no-store'}))}catch{}}
const cached=await (await caches.open(CACHE_NAME)).match(requested.href);
return cached||fetch(event.request)
})())
});
self.addEventListener('message',event=>{
if(event.data?.type==='OFFLINE_STATUS')event.waitUntil((async()=>{
const cache=await caches.open(CACHE_NAME),keys=await cache.keys();
event.ports[0]?.postMessage({ready:urls.every(url=>keys.some(key=>key.url===url))})
})());
if(event.data?.type==='APPLY_UPDATE')event.waitUntil((async()=>{
const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
const other=windows.some(client=>client.id!==event.source?.id&&client.url.startsWith(self.registration.scope));
event.ports[0]?.postMessage({ok:!other});
if(!other)await self.skipWaiting()
})())
});
