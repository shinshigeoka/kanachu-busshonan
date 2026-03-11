const map = L.map('map').setView([35.3367,139.4045],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);

const busIcon=L.icon({
iconUrl:'bus.png',
iconSize:[30,30]
});

let markers=[];

async function loadBus(){

const res=await fetch('busdata.json');
const data=await res.json();

markers.forEach(m=>map.removeLayer(m));
markers=[];

data.buses.forEach(bus=>{

const m=L.marker(
[bus.lat,bus.lng],
{icon:busIcon}
).addTo(map);

m.bindPopup("神奈中 "+bus.route);

markers.push(m);

});

}

loadBus();
setInterval(loadBus,5000);
