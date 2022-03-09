// Add GeoJSON data.
let sanFranAirport = 
{ "type": "FeatureCollection", "features": [{
    "type": "Feature",
    "properties": {
        "id": "3469",
        "name": "San Francisco International Airport",
        "city": "San Francisco",
        "country": "United States",
        "faa": "SFO",
        "icao": "KSFO",
        "alt": "13",
        "tz-offset": "-8",
        "dst": "A",
        "tz": "America/Los_Angeles"},
        "geometry": {
            "type": "Point",
            "coordinates": [-122.375,37.61899948120117]}}
]};


// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.5, -122.5], 11);

// Grabbing our GeoJSON data.
L.geoJson(sanFranAirport, {
    // We turn each feature into a marker on the map.
    pointToLayer: function(feature, latlng) {
        console.log(feature);
        return L.marker(latlng)
        .bindPopup("<h2>" + feature.properties.name + "</h2> <hr>" +
            "<h3>" + feature.properties.city +", " + feature.properties.country + "</h3>");
    }
    
}).addTo(map);

/*pseudo-code:
L.geoJSON(data, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup();
    }
});
*/

// Skill-drill: changing the map to outdoor styling and having the popup display
// faa along with the airport name.
L.geoJson(sanFranAirport, {
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup("<h2> Airport code: " + feature.properties.faa + "</h2> <hr>" +
            "<h3> Airport name: " + feature.properties.name + "</h3>");
    }
}).addTo(map);


// We create the tile layer that will be the background of our map. https://api.mapbox.com/styles/v1/mapbox/streets-v11
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
Satellite Streets: styles/mapbox/satellite-streets-v11
Navigation Day: styles/mapbox/navigation-day-v1
Navigation Night: styles/mapbox/navigation-night-v1

Left off on: 13.5.3

*/