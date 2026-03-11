const map = L.map('map').setView([35.3367,139.4045],14);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{maxZoom:19}
).addTo(map);

const icon = L.icon({
iconUrl:'bus.png',
iconSize:[32,32]
});

let markers={};

const targetRoutes=[
"辻12",
"辻13",
"辻02",
"J2"
];

// 茅ヶ崎〜辻堂の範囲
const bounds={
minLat:35.31,
maxLat:35.35,
minLon:139.38,
maxLon:139.45
};

async function loadBus(){

const url="https://api-public.odpt.org/api/v4/odpt:Bus";

const res=await fetch(url);
const data=await res.json();

data.forEach(bus=>{

const route=bus["odpt:busroute"];

if(!targetRoutes.includes(route)) return;

if(!bus["geo:lat"]) return;

const lat=bus["geo:lat"];
const lon=bus["geo:long"];

if(
lat<bounds.minLat ||
lat>bounds.maxLat ||
lon<bounds.minLon ||
lon>bounds.maxLon
){
return;
}

const id=bus["@id"];

const dest=bus["odpt:destinationBusstop"] || "不明";

const text=`
<b>神奈中バス</b><br>
系統: ${route}<br>
行き先: ${dest}
`;

if(markers[id]){

markers[id].setLatLng([lat,lon]);

}else{

markers[id]=L.marker([lat,lon],{icon})
.addTo(map)
.bindPopup(text);

}

});

}

loadBus();
setInterval(loadBus,10000);
