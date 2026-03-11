const map = L.map('map').setView([35.3367,139.4045],14);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{maxZoom:19}
).addTo(map);

const icon=L.icon({
iconUrl:'bus.png',
iconSize:[32,32]
});

let markers={};

const routes=[
"辻12",
"辻13",
"辻02",
"J2"
];

// APIキーをここに入れる
const APIKEY="ここにAPIキー";

async function loadBus(){

const url=
`https://api-public.odpt.org/api/v4/odpt:Bus?acl:consumerKey=${APIKEY}`;

const res=await fetch(url);
const data=await res.json();

data.forEach(bus=>{

const route=bus["odpt:busroute"];

if(!routes.includes(route)) return;

const lat=bus["geo:lat"];
const lon=bus["geo:long"];

if(!lat) return;

const id=bus["@id"];

const dest=bus["odpt:destinationBusstop"]||"不明";

const text=
`神奈中バス<br>
系統:${route}<br>
行先:${dest}`;

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
