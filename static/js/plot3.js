// Store our API endpoint as queryUrl.
var query3Url = "http://127.0.0.1:5000/flight_data";

// Perform a GET request to the query URL/
d3.json(query3Url).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createMap(data);
  });

function markerSize (flight_count) {
  //console.log (`${flight_count}`);
  return flight_count * 2000;
}

function markerColor (flight_count) {

  if (flight_count <= 10) {
    return "#00ff00"
  } else if (flight_count <= 50) {
      return "#ccff00"
  } else if (flight_count <= 80) {
      return "#ffae42"
  } else if (flight_count <= 100) {
      return "#f58025"
  } else {
      return "#ff4500"
  }

}

function createMap (flightsData) {

  // Create a map object.
  let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });

  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  airport_dict = {};

  for (let i = 0; i < flightsData.length; i++) {
    let airport = flightsData[i].arr_airport;
    let airport_name = flightsData[i].arr_airport_name;
    let latitude = flightsData[i].arr_latitude;
    let longitude = flightsData[i].arr_longitude;
    
    //console.log (`${airport}`)

    if (airport_dict[airport] == null){
      airport_dict[airport] = {};
      airport_dict[airport]["name"] = airport_name;
      airport_dict[airport]["flight_count"] = 1;
      airport_dict[airport]["latitude"] = latitude;
      airport_dict[airport]["longitude"] = longitude;
    } else {
      airport_dict[airport]["flight_count"] = airport_dict[airport]["flight_count"] + 1
    }    
  }

  for (const key of Object.keys (airport_dict)) {
    let airport_name = airport_dict[key]["name"];
    let flight_count = airport_dict[key]["flight_count"];
    let latitude = airport_dict[key]["latitude"];
    let longitude = airport_dict[key]["longitude"];

    L.circle([latitude, longitude], {
      fillOpacity: 0.75,
      color: "black",
      weight: 0.8,
      fillColor: markerColor (flight_count),
      radius: markerSize(flight_count)
    }).bindPopup(`<h3>${airport_name} (${key})</h3> <hr> <h4>Flights ${flight_count}</h4>`)
      .addTo(myMap);
  }

}

