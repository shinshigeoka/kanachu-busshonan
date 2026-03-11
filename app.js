const map = L.map('map').setView([35.3367,139.4045],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);

const busIcon=L.icon({
iconUrl:'bus.png',
iconSize:[30,30]
});

let busMarkers=[];
let stops=[];

const BUS_SPEED=20; // km/h 想定速度

function distance(lat1,lon1,lat2,lon2){

const R=6371;

const dLat=(lat2-lat1)*Math.PI/180;
const dLon=(lon2-lon1)*Math.PI/180;

const a=
Math.sin(dLat/2)*Math.sin(dLat/2)+
Math.cos(lat1*Math.PI/180)*
Math.cos(lat2*Math.PI/180)*
Math.sin(dLon/2)*Math.sin(dLon/2);

const c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

return R*c;

}

async function loadStops(){

const res=await fetch('busstop.json');
const data=await res.json();

stops=data.stops;

stops.forEach(stop=>{

L.circleMarker(
[stop.lat,stop.lng],
{
radius:6,
color:"blue"
}
).addTo(map)
.bindPopup(stop.name);

});

}

async function loadBus(){

const res=await fetch('busdata.json');
const data=await res.json();

busMarkers.forEach(m=>map.removeLayer(m));
busMarkers=[];

data.buses.forEach(bus=>{

let nearestStop=null;
let minDist=999;

stops.forEach(stop=>{

const d=distance(bus.lat,bus.lng,stop.lat,stop.lng);

if(d<minDist){
minDist=d;
nearestStop=stop;
}

});

const minutes=Math.round((minDist/BUS_SPEED)*60);

const marker=L.marker(
[bus.lat,bus.lng],
{icon:busIcon}
).addTo(map);

marker.bindPopup(
"神奈中 "+bus.route+
"<br>次の停留所: "+nearestStop.name+
"<br>約 "+minutes+" 分"
);

busMarkers.push(marker);

});

}

loadStops();

setTimeout(()=>{
loadBus();
setInterval(loadBus,5000);
},1000);
