var map = L.map('map').setView([35.3365,139.4047],13)

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map)

var busIcon = L.icon({
iconUrl:"bus.png",
iconSize:[32,32]
})

var buses={}

function updateBus(){

var data=[
{id:1,lat:35.336,lng:139.404},
{id:2,lat:35.333,lng:139.410}
]

data.forEach(b=>{

if(!buses[b.id]){

buses[b.id]=
L.marker([b.lat,b.lng],{icon:busIcon}).addTo(map)

}else{

buses[b.id].setLatLng([b.lat,b.lng])

}

})

}

setInterval(updateBus,5000)