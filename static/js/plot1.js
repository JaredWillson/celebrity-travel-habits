// Store our API endpoint as queryUrl to Flight Data
let queryUrl = "http://127.0.0.1:5000/flight_data";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function (data) {

  createMap(data);

});

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


  for (let i=0; i<flightsData.length; i++){   // iterate each object of the flight_data array
      let depLat = flightsData[i].dep_latitude;   
      let depLon = flightsData[i].dep_longitude; 
      let arrLat = flightsData[i].arr_latitude;
      let arrLon = flightsData[i].arr_longitude; 
      console.log(depLat, depLon, arrLat, arrLon);

      var airportDep = { lat: depLat, lng: depLon };
      var airportArr = { lat: arrLat, lng: arrLon };
      const geodesic10 = new L.Geodesic([airportDep, airportArr]).addTo(myMap);

      // magnitude = quakeData[i].properties.mag;
      // circleMarker = L.circle([lat,long], {
      //   stroke: true,
      //   fillOpacity: 1,
      //   weight: 1,
      //   color: 'black',
      //   fillColor: getColor(depth),
      //   radius: magnitude * 15000   // radius of marker is proportional to magnitude;
      //                               // multiplier 15,000 provides a nice, non-overwhelming visual presentation
      // })
      //   // Marker info about the earthquake has been selected to include the place (properties.place), 
      //   // magnitude (properties.mag), depth, and time (properties.time)

      // .bindPopup    // info window appears pops up upon click of marker
      // (`<h3>${quakeData[i].properties.place}</h3>
      // <p>
      // Magnitude: ${magnitude}<br> 
      // Depth: ${depth}<br>
      // Time: ${Date(quakeData[i].properties.time)}<br>
      // </p>`)
      // .addTo(myMap);  // adding markers
  };
};



  // Function to run on page load
    //// Called by "init()"; appearing below
    function init() {
      d3.json("http://127.0.0.1:5000/flight_data").then((data) => {
    
        // Get the names field
        let names = data.celebrity_name;
    
        // Use d3 to select the dropdown with id of `#selCelebrityData`
          //// The <select id="selCelebrityData" onchange="optionChanged(this.value)"></select>
          //// onChange is a function called when a user changed the selected option
          //// of a <select> element.
          //// optionChanged is a function defined below.
        let selector = d3.select("#selCelebrityData");  // select 
    
        // Use the list of sample names to populate the select options
        // Hint: Inside a loop, you will need to use d3 to append a new
        // option for each sample name.
  
        // names.forEach((sample) => {
        //  selector
        //    .append("option")
        //    .text(sample)
        //    .property("value", sample);
        //});
    
        // Get the first celebrity name from the list
          //// This is the initial sample shown in the "Test Subject ID Number"
          //// when webpage initially displayed.
        let firstCelebrity = celebrity_name[0];
    
        // Build flightDataPanel panel with the first sample
          //// These are the initial bar and bubble charts shown 
          //// when webpage initially displayed.    
        flightDataPanel(firstCelebrity);
      });
    }
    
    // Function for event listener
    function optionChanged(selectedCelebrity) {
      // Build metadata panel each time a new celebrity is selected
      flightDataPanel(selectedCelebrity);
    }
    
    // Initialize the dashboard
      //// Calls the "init" function defined above
    init();



////////////////////////  MY INITIAL CODE WITH TYPED-IN DATA ///////////////////////


// // The airports array
// let airports = [{
//   airport_code: "LGA",
//   airport_name: "LaGuardia Airport",  
//   latitude: 40.775,
//   longitude: -73.875,
//   airport_city: "New York City"
// },
// {
//   airport_code: "ORD",
//   airport_name: "Chicago O'Hare International Airport",  
//   latitude: 41.9786,
//   longitude: -87.9047,
//   airport_city: "Chicago"
// },
// {
//   airport_code: "IAH",
//   airport_name: "George Bush Intercontinental Airport",  
//   latitude: 29.9844,
//   longitude: -95.3414,
//   airport_city: "Houston"
// },
// {
//   airport_code: "LAX",
//   airport_name: "Los Angeles International Airport",  
//   latitude: 33.9425,
//   longitude: -118.408,
//   airport_city: "Los Angeles"
// },
// {
//   airport_code: "OMA",
//   airport_name: "Eppley Airfield",  
//   latitude: 41.3032,
//   longitude: -95.8941,
//   airport_city: "Omaha"
// },
// {
//   airport_code: "TEB",
//   airport_name: "Teterboro Airport",  
//   latitude: 40.8501,
//   longitude: -74.0608,
//   airport_city: "Teterboro"
// },
// {
//   airport_code: "LFQI",
//   airport_name: "Maubeuge Elesmes Airport",  
//   latitude: 50.350,
//   longitude: 4.168,
//   airport_city: "Maubeuge"
// },
// ];

// // marker for each airport
// console.log(airports.length)
// for (i=0;i<airports.length;i++){   // iterate for each airport on which to place a marker
//   lat = airports[i].latitude;   
//   long = airports[i].longitude;  
//   circleMarker = L.circle([lat,long], {
//     stroke: true,
//     fillOpacity: .5,
//     weight: 1,
//     color: 'black',
//     fillColor: 'rgb(255,0,0)',
//     radius: 10000
// })  

// .bindPopup    // info window appears pops up upon click of marker
// (`<h3>${airports[i].airport_name}</h3>
// <p>
// Latitude: ${lat} <br> 
// Longitude: ${long}<br>
// </p>`)
// .addTo(myMap);  // adding markers
// };


// // The aircraft array 
// let aircraft = [{
//   tail_number: "N313AR",
//   celebrity_id: "1" 
// },
// {
//   tail_number: "N887WM",
//   celebrity_id: "2" 
// },
// {
//   tail_number: "N194WM",
//   celebrity_id: "3" 
// },
// {
//   tail_number: "N1111E",
//   celebrity_id: "4" 
// },
// {
//   tail_number: "N958TB",
//   celebrity_id: "5" 
// },
// {
//   tail_number: "N898CE",
//   celebrity_id: "6" 
// },
// {
//   tail_number: "N444SC",
//   celebrity_id: "17" 
// },
// ];

// // The flights array 
// let flights = [{
//   dep_airport: "TEB",
//   arr_airport: "OMA",
//   dep_date_time: "TBD",
//   fuel: "TBD",
//   tail_number: "N313AR"
// },
// {
//   dep_airport: "ORD",
//   arr_airport: "IAH",
//   dep_date_time: "TBD",
//   fuel: "TBD",
//   tail_number: "N898CE"
// },
// {
//   dep_airport: "IAH",
//   arr_airport: "LAX",
//   dep_date_time: "TBD",
//   fuel: "TBD",
//   tail_number: "N1111E"
// },
// {
//   dep_airport: "LAX",
//   arr_airport: "OMA",
//   dep_date_time: "TBD",
//   fuel: "TBD",
//   tail_number: "N887WM"
// },
// {
//   dep_airport: "LGA",
//   arr_airport: "IAH",
//   dep_date_time: "TBD",
//   fuel: "TBD",
//   tail_number: "N958TB"
// },
// {
//   dep_airport: "TEB",
//   arr_airport: "LFQI",
//   dep_date_time: "TBD",
//   fuel: "TBD",
//   tail_number: "N444SC"
// },
// ];


// actual_dep_airport_code = 'placeholder'
// actual_arr_airport_code = 'placeholder'
// for (j = 0; j < flights.length; j++) {              // loop each flight
//   for (let i = 0; i < airports.length; i++) {       // determine departure airport for the flight
//     if (airports[i].airport_code == flights[j].dep_airport) {     
//       actual_dep_airport_code = airports[i].airport_code,
//       console.log("Actual Departure Code", actual_dep_airport_code), 

//       actual_dep_airport_name = airports[i].airport_name,
//       console.log("Actual Departure Name", actual_dep_airport_name),  

//       actual_dep_latitude = airports[i].latitude,
//       actual_dep_longitude = airports[i].longitude,
//       console.log(actual_dep_latitude,actual_dep_longitude )

//       actual_arr_airport_code = flights[j].arr_airport,
//       console.log("Actual Arrival Code", actual_arr_airport_code)  


//       for (k = 0; k < airports.length; k++) {                 // determine arrival airport for the flight
//         if(airports[k].airport_code == flights[j].arr_airport) {
//           actual_arr_airport_name = airports[k].airport_name,
//           actual_arr_latitude = airports[k].latitude,
//           actual_arr_longitude = airports[k].longitude
//         }
//       }
//       console.log("Actual Arrival Name", actual_arr_airport_name),
//       console.log(actual_arr_latitude,actual_arr_longitude )  

//       if(actual_dep_airport_code === 'placeholder') {
//         print("");
//         console.log("Unable to identify departure airport from information provided.");
//       } else {
//         console.log("The plane departed from :", actual_dep_airport_name, ".");
//       } 

//       if(actual_arr_airport_code === 'placeholder') {
//         print("");
//         console.log("Unable to identify arrival airport from information provided.");
//       } else {
//         console.log("The plane arrived in :", actual_arr_airport_name, ".");
//       } 
    
//       actual_tail_number = flights[j].tail_number
//       console.log("Actual tail number is", actual_tail_number)

//       for (k = 0; k < aircraft.length; k++) {           // determine celebrity of the tail number
//         if(aircraft[k].tail_number == actual_tail_number) {
//           actual_celebrity = aircraft[k].celebrity_id
//         }
        
//       console.log("The aircraft has the tail number", actual_tail_number, "belonging to celebrity number", actual_celebrity)
      
//       var airportDep = { lat: actual_dep_latitude, lng: actual_dep_longitude };
//       var airportArr = { lat: actual_arr_latitude, lng: actual_arr_longitude };
//       const geodesic10 = new L.Geodesic([airportDep, airportArr]).addTo(myMap);
      
//     }
//   }
// }
// };    // move to very end to get a marker at every airport from which there's a departure or
//       // to which there's an arrival

// // marker for departure airport of last flight
// lat1 = actual_dep_latitude;   
// long1 = actual_dep_longitude;  
// circleMarker = L.circle([lat1,long1], {
//     stroke: true,
//     fillOpacity: .5,
//     weight: 1,
//     color: 'black',
//     fillColor: 'rgb(0,255,0)',
//     radius: 10000
// }
// )  

// .bindPopup    
// (`<h3>${actual_dep_airport_name}</h3>
// <p>
// Latitude: ${lat1} <br> 
// Longitude: ${long1}<br>
// Tail Number: ${actual_tail_number}<br>
// Celebrity: ${actual_celebrity}<br>
// </p>`)
// .addTo(myMap);  // add markers on top of existing marker

// // marker for arrival airport of last flight
// lat2 = actual_arr_latitude;   
// long2 = actual_arr_longitude;  
// circleMarker = L.circle([lat2,long2], {
//   stroke: true,
//   fillOpacity: .5,
//   weight: 1,
//   color: 'black',
//   fillColor: 'rgb(0,255,0)',
//   radius: 10000
// }
// )  

// .bindPopup    
// (`<h3>${actual_arr_airport_name}</h3>
// <p>
// Latitude: ${lat2} <br> 
// Longitude: ${long2}<br>
// Tail Number: ${actual_tail_number}<br>
// Celebrity: ${actual_celebrity}<br>
// </p>`)
// .addTo(myMap);  // add markers on top of existing marker
