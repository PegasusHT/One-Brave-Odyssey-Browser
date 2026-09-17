export function setupMobile(onChange){
const state={ready:false,updateReady:false,status:'Preparing offline play…',registration:null,applying:false,checking:false};
const change=()=>onChange(state);
if(['localhost','127.0.0.1','[::1]'].includes(window.location.hostname)){
state.status='Local preview · Keep the game server running.';
state.applyUpdate=async()=>'Refresh this page after finishing your run.';
state.checkForUpdates=async()=>{state.status='Finish your run, then refresh to load local changes.';change()};
if('serviceWorker' in navigator){
const scope=new URL('./',import.meta.url).href,script=new URL('./sw.js',import.meta.url).href;
navigator.serviceWorker.getRegistration(scope).then(registration=>{
if(registration?.scope===scope&&[registration.active,registration.waiting,registration.installing].some(worker=>worker?.scriptURL===script))return registration.unregister()
}).catch(()=>{state.status='Close this local game tab and reopen it with the server running.';change()})
}
queueMicrotask(change);return state
}
const message=(worker,type)=>new Promise(resolve=>{
if(!worker){resolve(null);return}
const channel=new MessageChannel(),timer=setTimeout(()=>{channel.port1.close();resolve(null)},4000);
channel.port1.onmessage=event=>{clearTimeout(timer);channel.port1.close();resolve(event.data)};
worker.postMessage({type},[channel.port2])
});
const refresh=async()=>{
const result=await message(navigator.serviceWorker.controller||state.registration?.active,'OFFLINE_STATUS');
state.ready=result?.ready===true;state.status=state.ready?'Ready for offline play':'Open online to prepare offline play';
state.updateReady=Boolean(state.registration?.waiting);change()
};
state.applyUpdate=async()=>{
if(!state.registration?.waiting)return 'No update is waiting.';
state.applying=true;
const result=await message(state.registration.waiting,'APPLY_UPDATE');
if(!result?.ok){state.applying=false;return result?'Close other game windows, then try again.':'The update could not start. Try again when online.'}
return ''
};
state.checkForUpdates=async()=>{
if(state.checking)return;
if(!navigator.onLine){state.status='Go online to check for an update.';change();return}
if(!state.registration){state.status='Offline updates are unavailable here. Reopen the hosted game online.';change();return}
state.checking=true;state.status='Checking for an update…';change();
try{
await state.registration.update();
state.updateReady=Boolean(state.registration.waiting);
state.status=state.updateReady?'An update is ready to install.':state.registration.installing?'Downloading the update…':'No newer published version was found.'
}catch{state.status='The update check could not finish. Try again online.'}
finally{state.checking=false;change()}
};
if(!('serviceWorker' in navigator)||!window.isSecureContext){state.status='Offline play needs the installed HTTPS version';queueMicrotask(change);return state}
navigator.serviceWorker.addEventListener('controllerchange',()=>{if(state.applying)location.reload();else refresh()});
navigator.serviceWorker.register(new URL('./sw.js',import.meta.url),{updateViaCache:'none'}).then(async registration=>{
state.registration=registration;
const watch=worker=>worker?.addEventListener('statechange',()=>{
if(worker.state==='installed'||worker.state==='redundant')refresh()
});
watch(registration.installing);registration.addEventListener('updatefound',()=>watch(registration.installing));
if(registration.active)await refresh();
navigator.serviceWorker.ready.then(refresh);
registration.update().catch(()=>{})
}).catch(()=>{state.status='Online play available; offline setup could not finish';change()});
window.addEventListener('online',()=>{state.registration?.update().catch(()=>{});refresh()});
return state
}
