
// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.6213, -122.3790], 5);


// Coordinates for each point to be used in the line.
let line = [
    // SFO airport
    [37.6213, -122.3790],
    // AUS airport
    [30.1975, -97.6664],
    // YYZ airport
    [43.6777, -79.6248],
    // JFK airport
    [40.6413, -73.7781]
];

// Create polyline using the line coordinates and make the line red
L.polyline(line, {
    color: "blue",
    dashArray: "8",
    weight: 4,
    opacity: 0.5
}).addTo(map);

// We create the tile layer that will be the background of our map. https://api.mapbox.com/styles/v1/mapbox/streets-v11
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);


/* Different tile layer styling (copy & paste these right into the L.tileLayer(url) after https://api.mapbox.com/{styling}):
Default: styles/v1/mapbox/streets-v11
Outdoors: styles/mapbox/outdoors-v11
Light: styles/mapbox/light-v10
Dark: styles/mapbox/dark-v10
Satellite: styles/mapbox/satellite-v9 
Satellite streets: styles/mapbox/satellite-streets-v11
*/