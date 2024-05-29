// Store our API endpoint as queryUrl to Flight Data
let queryUrl = "http://127.0.0.1:5000/flight_data";
// Perform a GET request to the query URL
d3.json(queryUrl).then(function (data) {
  createMap(data);
});
function createMap (flightsData) {

  // Create a map object.
  let jhMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  // Add a tile layer.
  var baseLayer=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(jhMap);
  celebrity_dict ={};
  for (let i=0; i<flightsData.length; i++){   // iterate each object of the flight_data array
      let celebrity = flightsData[i].celebrity_name;
      let depLat = flightsData[i].dep_latitude;
      let depLon = flightsData[i].dep_longitude;
      let arrLat = flightsData[i].arr_latitude;
      let arrLon = flightsData[i].arr_longitude;
      console.log(depLat, depLon, arrLat, arrLon);
      var airportDep = { lat: depLat, lng: depLon };
      var airportArr = { lat: arrLat, lng: arrLon };
      const geodesic10 = new L.Geodesic([airportDep, airportArr])
      if (celebrity_dict[celebrity] == null) {
        // celebrity_dict[celebrity] = {};
        // celebrity_dict[celebrity]["name"] = celebrity;
        celebrity_dict[celebrity] = [geodesic10];
      } else {
        celebrity_dict[celebrity].push(geodesic10);
      }
  };
  console.log(celebrity_dict);
  var dropdown=d3.select('#selCelebrityData');
  Object.keys(celebrity_dict).forEach((name)=>{
    dropdown.append('option').text(name).property('value', name);
  })
  // Add event listener for dropdown change
  dropdown.on("change", function() {
    const selectedCelebrity = this.value;
    jhMap.eachLayer(function (layer) {
      if (layer==baseLayer){
      } else {
        jhMap.removeLayer(layer);
      }
    });
    
    celebrity_dict[selectedCelebrity].forEach((layer)=>{
      layer.addTo(jhMap);
    })
});

};