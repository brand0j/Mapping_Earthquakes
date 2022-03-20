// Add GeoJSON data.

// We create the tile layer that will be the background of our map. https://api.mapbox.com/styles/v1/mapbox/streets-v11
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Creating a second layer that the user can toggle between on our webpage
let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
    Street: streets,
    Satellite: satellite
};

// Create the map object with center, zoom level and default layer
let map = L.map('mapid', {
    center: [39.5,-98.5],
    zoom: 3,
    layers: [streets]
});

// Accessing the GeoJSON URL containing our data
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create earthquake layer for our map
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time
let overlays = {
    Earthquakes: earthquakes
};

// add a control to the map that will allow the user to change which layers are visible
L.control.layers(baseMaps, overlays).addTo(map);



//Grabbing our GeoJSON data
d3.json(earthquakeData).then(function(data) {

    // Plotting our GeoJSON earthquake points as circleMarkers
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        // set the style for each circleMarker using our styleInfo() function
        style: styleInfo,

        // We create a popup for each circleMarker to display the magnitude and location of the earthquake
        // after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br> Location: " + feature.properties.place) 
        }
       
      // Here we are adding all of the above to our earthquake layerGroup() from above  
    }).addTo(earthquakes);

    // Add the earthquake layer to the map
    earthquakes.addTo(map);
});

// This function returns the style data for each of the earthquakes we plot on the map
// We pass the magnitude of the earthquake into a function to calculate the radius
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true, 
        weight: 0.5
    };
}

// This function determines the radius of the earthquake marker based on its magnitude
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius (magnitude){
    if (magnitude===0){
        return 1;
    }
    return magnitude *4;
}

//  Give different magnitudes varying colors so they can be easily distinguished when plotted
function getColor(magnitude) {
    if (magnitude>5){
        return '#ea2c2c';
    }
    if (magnitude>4) {
        return '#ea822c';
    }
    if (magnitude>3){
        return '#ee9c00';
    }
    if (magnitude>2){
        return '#eecc00';
    }
    if (magnitude>1){
        return '#d4ee00';
    }
    return '#98ee00';

    return magnitude *4;
}
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