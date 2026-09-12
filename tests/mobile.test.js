import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const source=await readFile(new URL('../dist/sw.js',import.meta.url),'utf8');
function worker({offline=false,failFile='',windows=[]}={}){
const listeners={},stores=new Map(),scope='https://example.test/game/',network=[];
let skipped=0,claimed=0;
const caches={
async open(name){if(!stores.has(name))stores.set(name,new Map());const store=stores.get(name);return{async put(key,response){store.set(key,response.clone())},async match(key){return store.get(key)?.clone()},async keys(){return [...store.keys()].map(url=>new Request(url))}}},
async keys(){return [...stores.keys()]},async delete(name){return stores.delete(name)}
};
const self={registration:{scope},addEventListener:(name,fn)=>listeners[name]=fn,clients:{async claim(){claimed++},async matchAll(){return windows}},async skipWaiting(){skipped++}};
const fetch=async request=>{
const url=typeof request==='string'?request:request.url;network.push(url);if(offline||url.endsWith(failFile)&&failFile)throw Error('Network unavailable');
const type=url.endsWith('.js')?'text/javascript':'text/html';return new Response(type==='text/html'?'<canvas id="world"></canvas>':'export const ok=true',{headers:{'content-type':type}})
};
vm.runInNewContext(source,{self,caches,fetch,Request,Response,URL});
async function event(name,data={}){let completion;listeners[name]({...data,waitUntil:promise=>completion=promise,respondWith:promise=>completion=promise});return completion}
return{event,stores,caches,network,setOffline:value=>offline=value,get skipped(){return skipped},get claimed(){return claimed}}
}

test('mobile manifest and precache include real local game files and appropriately sized icons',async()=>{
const manifest=JSON.parse(await readFile(new URL('../dist/manifest.webmanifest',import.meta.url),'utf8'));
assert.equal(manifest.display,'standalone');assert.equal(manifest.start_url,'./');assert.equal(manifest.orientation,'landscape');
const w=worker();await w.event('install');
for(const url of w.network){const name=new URL(url).pathname.replace('/game/','')||'index.html';assert.ok((await readFile(new URL('../dist/'+name,import.meta.url))).length>0,name)}
for(const [name,size] of [['icon-192.png',192],['icon-512.png',512],['apple-touch-icon.png',180]]){const bytes=await readFile(new URL('../dist/icons/'+name,import.meta.url));assert.equal(bytes.toString('hex',0,8),'89504e470d0a1a0a');assert.equal(bytes.readUInt32BE(16),size);assert.equal(bytes.readUInt32BE(20),size)}
});

test('complete game cache serves the app and modules offline, including launch query strings',async()=>{
const w=worker();await w.event('install');w.setOffline(true);
for(const pathname of ['?source=homescreen','index.html','game.js','training.js','critical-art.js','icons/icon-192.png']){
const response=await w.event('fetch',{request:new Request('https://example.test/game/'+pathname)});assert.equal(response.status,200);assert.ok(await response.text())
}
assert.equal(w.skipped,0);let status;await w.event('message',{data:{type:'OFFLINE_STATUS'},ports:[{postMessage:value=>status=value}]});assert.equal(status.ready,true);
});

test('failed offline installation leaves the previous cache intact and no incomplete new cache',async()=>{
const w=worker({failFile:'training.js'});await w.caches.open('obo-game-old');
await assert.rejects(w.event('install'));assert.deepEqual(await w.caches.keys(),['obo-game-old']);assert.equal(w.skipped,0);
});

test('updates wait for an explicit request and refuse to replace another open game window',async()=>{
const windows=[{id:'current',url:'https://example.test/game/'},{id:'other',url:'https://example.test/game/'}],w=worker({windows});await w.event('install');assert.equal(w.skipped,0);
let result;const message={data:{type:'APPLY_UPDATE'},source:{id:'current'},ports:[{postMessage:value=>result=value}]};
await w.event('message',message);assert.equal(result.ok,false);assert.equal(w.skipped,0);
windows.pop();await w.event('message',message);assert.equal(result.ok,true);assert.equal(w.skipped,1);
await w.caches.open('obo-game-old');await w.caches.open('unrelated-cache');await w.event('activate');assert.equal(w.claimed,1);assert.equal((await w.caches.keys()).includes('obo-game-old'),false);assert.equal((await w.caches.keys()).includes('unrelated-cache'),true);
});
