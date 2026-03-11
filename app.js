const map = L.map('map').setView([35.3367,139.4045],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);

const busIcon=L.icon({
iconUrl:'https://cdn-icons-png.flaticon.com/512/61/61231.png',
iconSize:[30,30]
});

let busMarkers=[];
let stops=[];

async function loadStops(){

const res=await fetch('busstop.json');
const data=await res.json();

stops=data.stops;

stops.forEach(stop=>{

L.circleMarker(
[stop.lat,stop.lng],
{radius:6,color:"blue"}
)
.addTo(map)
.bindPopup(stop.name);

});

}

function randomBus(){

return [
{
route:"辻12",
lat:35.33678+(Math.random()*0.01),
lng:139.40464+(Math.random()*0.03)
}
]

}

function loadBus(){

busMarkers.forEach(m=>map.removeLayer(m));
busMarkers=[];

const buses=randomBus();

buses.forEach(bus=>{

const marker=L.marker(
[bus.lat,bus.lng],
{icon:busIcon}
).addTo(map);

marker.bindPopup(
"神奈中 "+bus.route
);

busMarkers.push(marker);

});

}

loadStops();

setInterval(loadBus,5000);
