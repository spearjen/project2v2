// Store our API endpoint inside queryUrl
var queryUrl = "https://raw.githubusercontent.com/spearjen/project2v2/spearjay/Resources/sstAll.json";
var url = "https://raw.githubusercontent.com/spearjen/project2v2/master/Resources/hurricane23.json";

// Perform a GET request to the query URL
d3.json(queryUrl, function(sstRes) {
    console.log(sstRes);

    d3.json(url, function(landfallRes) {
        console.log(landfallRes);

        // Once we get a response, send the data.features object to the createFeatures function
        createFeatures(sstRes.features, landfallRes.features);
    )};
)};

// Once we get a response, send the data.features object to the createFeatures function
function createFeatures(sstData, landfallData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature1(feature, layer) {
        layer.bindPopup("<b>" + sstRes.feature.properties.year + "</b>" 
            + "<br>Max Temp: <br>" + sstRes.feature.properties.sea_surface_temp_max + " C"
            + "<br>Min Temp: <br>" +  sstRes.feature.properties.sea_surface_temp_min + " C"
            + "<br>Average Temp: <br>" +  sstRes.feature.properties.sea_surface_temp_mean + " C"
            + "<br>Median Temp: <br>" +  sstRes.feature.properties.sea_surface_temp_median + " C");               
    }

    function onEachFeature2(feature, layer) {
        layer.bindPopup(`<strong>Status:</strong> ${landfallRes.feature.properties.Status}<br><strong>Name:</strong> ${landfallRes.feature.properties.Name}<br><strong>Wind Speed:</strong> ${landfallRes.feature.properties.Wind_mph}`);
    }    

    function pointToLayer1(geoJsonPolygon, bounds) {
        // define rectangle geographical bounds
        var bounds = [[sstData.feature.geometry.coordinates[0][0]],[sstDataGeo.feature.geometry.coordinates[0][2]]];
        // create an orange rectangle
        return L.rectangle(bounds);
        // zoom the map to the rectangle bounds
        map.fitBounds(bounds);
    }

    function pointToLayer2(landfallData,latlng) {
        // create hurricance circles
        return L.circleMarker(latlng);
    }

    function style1 (landfallData {
        return{
            color: "black",
            fillColor: circleColor(landfallData.feature.properties.Wind_mph),
            fillOpacity: 0.65,
            weight: 0.5,
            radius: (landfallData.feature.properties.Wind_mph) /5
        }
    }

    function style2 (sstData) {
        return {
            color: "red",
            // fillColor: getColor(feature.properties.sea_surface_temp_mean),
            fillOpacity: .2,
            weight: 1,
        }
    }

    // Create a GeoJSON layer containing the features array on the sstData object
    // Run the onEachFeature function once for each piece of data in the array
    var sst = L.geoJSON(sstData, {
        onEachFeature: onEachFeature1, 
        pointToLayer: pointToLayer1,
        style: style2
    });

    var landfall = L.geoJSON(landfallData, {
        onEachFeature: onEachFeature2, 
        pointToLayer: pointToLayer2,
        style: style1
    });

    // Sending our sst layer to the createMap function
    createMap(sst,landfall);

    //Circle color switch
    // switch function for color of circle according too magnitude of quake
    function circleColor(Wind_mph){
        switch (true) {
            case Wind_mph < 95:
                return "green";
            case Wind_mph <111:
                return "lightgreen";
            case Wind_mph <130:
                return "yellow";
            case Wind_mph <157:
                return "orange";
            default:
                return "red";
        }    
    }
}

function createMap(sst,landfall) {

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
        Sea_Surface_Temperature: sst,
        Landfall: landfall
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
}


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
                
