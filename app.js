const map = L.map('map').setView([35.3367,139.4045],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);

const busIcon=L.icon({
iconUrl:'bus.png',
iconSize:[30,30]
});

let busMarkers=[];
let stopMarkers=[];

async function loadBus(){

const res=await fetch('busdata.json');
const data=await res.json();

busMarkers.forEach(m=>map.removeLayer(m));
busMarkers=[];

data.buses.forEach(bus=>{

const m=L.marker(
[bus.lat,bus.lng],
{icon:busIcon}
).addTo(map);

m.bindPopup("神奈中 "+bus.route);

busMarkers.push(m);

});

}

async function loadStops(){

const res=await fetch('busstop.json');
const data=await res.json();

data.stops.forEach(stop=>{

const m=L.circleMarker(
[stop.lat,stop.lng],
{
radius:6,
color:"blue"
}
).addTo(map);

m.bindPopup(stop.name);

stopMarkers.push(m);

});

}

loadBus();
loadStops();

setInterval(loadBus,5000);
