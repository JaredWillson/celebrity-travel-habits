// Function to calculate the haversine distance between two points in miles
function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRadians = degrees => degrees * Math.PI / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 0.621371; // Convert km to miles
}

// Function to calculate total miles for each unique aircraft number
function calculateTotalMilesPerAircraft() {
    const flightsUrl = './data/flights.csv';
    const airportsUrl = './data/airports.csv';

    // Return a promise resolving to the flights and airports data
    return Promise.all([d3.csv(flightsUrl), d3.csv(airportsUrl)]);
}

// Function to build the bar chart
function buildCharts(selectedCelebrity, flights, airports, celebrities) {
    // Ensure data is available and is an array before proceeding
    if (!Array.isArray(flights) || !Array.isArray(airports) || !Array.isArray(celebrities)) {
        throw new Error('One of the data sources is not available or is not an array.');
    }

    // Create a lookup map for airport coordinates
    const airportMap = {};
    airports.forEach(airport => {
        airportMap[airport.airport_code] = {
            lat: parseFloat(airport.latitude),
            lon: parseFloat(airport.longitude)
        };
    });

    // Filter celebrities data for the selected celebrity
    const filteredCelebrity = celebrities.find(celebrity => celebrity.celebrity_name === selectedCelebrity);

    if (!filteredCelebrity) {
        console.error('Selected celebrity not found.');
        return;
    }

    // Log filtered celebrity information
    console.log('Selected Celebrity:', filteredCelebrity);

    // Calculate total miles traveled by the selected celebrity's aircraft
    let totalMiles = 0;
    flights.forEach(flight => {
        const depAirport = airportMap[flight.dep_airport];
        const arrAirport = airportMap[flight.arr_airport];

        if (depAirport && arrAirport) {
            const distance = haversineDistance(depAirport.lat, depAirport.lon, arrAirport.lat, arrAirport.lon);
            totalMiles += distance;
        }
    });

    // Log total miles to check if it's being calculated correctly
    console.log('Total miles for', selectedCelebrity, ':', totalMiles);

    // Average yearly mileage for an average traveler
    const averageMiles = 573;

    // Flight distance from LAX to NYC in miles
    const laxToNycDistance = 2469.45;

    // Prepare data for Plotly
    const barData = [{
        x: [selectedCelebrity, 'Average Traveler', 'Miles from LAX to NYC'],
        y: [totalMiles, averageMiles, laxToNycDistance],
        type: 'bar',
        marker: {
            color: ['#1f77b4', '#ff7f0e', '#2ca02c']  // Different colors for distinction
        },
        text: ['Total Miles', 'Total Miles (Average Traveler)', 'Total Miles (LAX to NYC)']
    }];

    const barLayout = {
        title: `${selectedCelebrity} Number of Miles Traveled Compared to Average US Traveler`,
        xaxis: { title: 'Category' },
        yaxis: { title: 'Miles Traveled' }
    };

    // Render the Bar Chart
    Plotly.newPlot('bar', barData, barLayout);
}

// Function to build the dropdown menu
function buildDropdown() {
    const celebritiesUrl = './data/celebrity.csv';

    // Fetch flights and airports data
    calculateTotalMilesPerAircraft().then(([flights, airports]) => {
        // Fetch celebrities data
        d3.csv(celebritiesUrl).then((celebrities) => {
            // Get unique celebrity names
            const uniqueCelebrityNames = Array.from(new Set(celebrities.map(celebrity => celebrity.celebrity_name)));

            // Use d3 to select the dropdown with id of `#selDataset`
            const dropdown = d3.select("#selDataset");

            // Use the list of unique celebrity names to populate the select options
            uniqueCelebrityNames.forEach((name) => {
                dropdown.append("option").text(name).property("value", name);
            });

            // Add event listener for dropdown change
            dropdown.on("change", function() {
                const selectedCelebrity = this.value;
                buildCharts(selectedCelebrity, flights, airports, celebrities);
            });

            // Get the first celebrity from the list
            const firstCelebrity = uniqueCelebrityNames[0];

            // Build charts with the first celebrity
            buildCharts(firstCelebrity, flights, airports, celebrities);
        }).catch((error) => {
            console.error('Error fetching or processing data:', error);
        });
    }).catch((error) => {
        console.error('Error fetching or processing data:', error);
    });
}

// Initialize the dashboard
function init() {
    buildDropdown();
}

// Call init to initialize the dashboard
init();
