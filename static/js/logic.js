// Store our API endpoint inside queryUrl
var queryUrl = "https://raw.githubusercontent.com/spearjen/project2/main/sstGeoJSON.json";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  console.log(data)
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

// function getColor(d) {
//     return d > 5 ? '#E31A1C' :
//            d > 4 ? '#FC4E2A' :
//            d > 3 ? '#FD8D3C' :
//            d > 2 ? '#FEB24C' :
//            d > 1 ? '#FED976' :
//                     '#FFEDA0';
// }

function createFeatures(sstData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup("<b>" + feature.properties.year + "</b>" 
            + "<br>Max Temp: <br>" + feature.properties.sea_surface_temp_max + " C"
            + "<br>Min Temp: <br>" +  feature.properties.sea_surface_temp_min + " C"
            + "<br>Average Temp: <br>" +  feature.properties.sea_surface_temp_mean + " C"
            + "<br>Median Temp: <br>" +  feature.properties.sea_surface_temp_median + " C");
    }

        // layer.bindPopup(("<h3>" `Year: ` + feature.properties.year "</br>") + (`Max Temp: ` feature.properties.sea_surface_temp_max "</br>") + (`Min Temp: `feature.sea_surface_temp_min "</br>") + (`Average Temp: `feature.sea_surface_temp_mean "</br>") + (`Median Temp: ` feature.sea_surface_temp_median) +
        //     ("</h3><hr><p>" + new Date(feature.properties.year) + "</p>"));
        // }

    function pointToLayer(geoJsonPolygon, bounds) {
        // define rectangle geographical bounds
        var bounds = [[feature.geometry.coordinates[0]],[feature.geometry.coordinates[2]]];

        // create an orange rectangle
        return L.rectangle(bounds);

        // zoom the map to the rectangle bounds
        map.fitBounds(bounds);
    }

    function style(feature) {
        return {
            color: "red",
            fillOpacity: .2,
            weight: 1,
        }
    }
    
    // Create a GeoJSON layer containing the features array on the sstData object
    // Run the onEachFeature function once for each piece of data in the array
    var sst = L.geoJSON(sstData, {
        onEachFeature: onEachFeature, 
        pointToLayer: pointToLayer,
        style: style
    });

    // Sending our sst layer to the createMap function
    createMap(sst);
}};

function createMap(sst) {

    // Define satelitte and lightmap layers
    var satelitte = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        maxZoom: 18,
        id: "satellite-streets-v9",
        accessToken: api_key
    });

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: api_key
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Satellite Map": satelitte,
        "Light Map": lightmap
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Sea_Surface_Temperature: sst
    };

    // Create our map, giving it the satelitte and sst layers to display on load
    var myMap = L.map("mapid", {
        center: [25, -25],
        zoom: 2.5,
        layers: [satelitte, sst]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    // var legend = L.control({position: 'bottomright'});

    //     legend.onAdd = function (myMap) {

    //         var div = L.DomUtil.create('div', 'info legend'),
    //             category = [-1,1,2,3,4,5];

    //         // loop through our density intervals and generate a label with a colored square for each interval
    //         for (var i = 0; i < category.length; i++) {
    //             div.innerHTML +=
    //                 '<i style="background:' + getColor(category[i] + 1) + '"></i> ' +
    //                 category[i] + (category[i + 1] ? '&ndash;' + category[i + 1] + '<br>' : '+');
    //         }

    //     return div;
    // };

    // legend.addTo(myMap);
}
