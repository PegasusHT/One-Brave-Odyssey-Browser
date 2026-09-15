export function setupMobile(onChange){
const state={ready:false,updateReady:false,status:'Preparing offline play…',registration:null,applying:false};
const change=()=>onChange(state);
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
