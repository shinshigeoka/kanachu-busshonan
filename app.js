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

async function loadBus(){

const url="https://loc.bus-vision.jp/kanachu/gtfsrt/vehicle_position.pb";

const res=await fetch(url);
const buffer=await res.arrayBuffer();

const data=new Uint8Array(buffer);

// 仮のダミー表示（神奈中はprotobufなので簡易表示）
const buses=[
{lat:35.336,lon:139.404,route:"辻12"},
{lat:35.332,lon:139.412,route:"辻13"},
{lat:35.339,lon:139.398,route:"辻02"},
{lat:35.334,lon:139.420,route:"J2"}
];

buses.forEach(bus=>{

if(!routes.includes(bus.route))return;

const id=bus.route;

const text=
`神奈中バス<br>
系統:${bus.route}`;

if(markers[id]){

markers[id].setLatLng([bus.lat,bus.lon]);

}else{

markers[id]=L.marker([bus.lat,bus.lon],{icon})
.addTo(map)
.bindPopup(text);

}

});

}

loadBus();
setInterval(loadBus,5000);
