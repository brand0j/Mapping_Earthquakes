// Add GeoJSON data.

// We create the tile layer that will be the background of our map. https://api.mapbox.com/styles/v1/mapbox/streets-v11
let dayNAV = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Creating a second layer that the user can toggle between on our webpage
let nightNAV = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
    "Day Navigation": dayNAV,
    "Night Navigation": nightNAV
};

// Create the map object with center, zoom level and default layer
let map = L.map('mapid', {
    center: [44.0,-80.0],
    zoom: 2,
    layers: [dayNAV]
});

L.control.layers(baseMaps).addTo(map);


// Then we add our 'graymap' tile layer to the map.
//streets.addTo(map);

// Accessing the GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/brand0j/Mapping_Earthquakes/main/torontoRoutes.json";

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data)
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data).addTo(map);
});


//Grabbing our GeoJSON data
d3.json(torontoData).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        color: "#ffffa1",
        weight: 2,
        onEachFeature: function(features, layer) {
            // To know the key names of the properties we want in our popup use console.log(layer)
            // console.log(layer);
            // adding the popup with the airline and destination
            layer.bindPopup("<h2> Airline: " + features.properties.airline + "</h2> <hr>" +
                "<h3> Destination: " + features.properties.dst + "</h3>");
        }
    }).addTo(map);
});

/* 
Different tile layer styling (copy & paste these right into the L.tileLayer(url) after https://api.mapbox.com/{styling}):
Default: styles/v1/mapbox/streets-v11
Outdoors: styles/mapbox/outdoors-v11
Light: styles/mapbox/light-v10
Dark: styles/mapbox/dark-v10
Satellite: styles/mapbox/satellite-v9 
Satellite Streets: styles/mapbox/satellite-streets-v11
Navigation Day: styles/mapbox/navigation-day-v1
Navigation Night: styles/mapbox/navigation-night-v1
*/