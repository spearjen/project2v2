
// Store our API endpoint inside queryUrl
var queryUrl = "https://raw.githubusercontent.com/spearjen/project2v2/spearjay/Resources/sstAll.json";
var url = "https://raw.githubusercontent.com/spearjen/project2v2/master/Resources/hurricane23.json";
var sstData;
var landfallData;

//Circle color switch
// switch function for color of circle according too magnitude of quake
function circleColor(Wind_mph) {
    switch (true) {
        case Wind_mph < 95:
            return "green";
        case Wind_mph < 111:
            return "lightgreen";
        case Wind_mph < 130:
            return "yellow";
        case Wind_mph < 157:
            return "orange";
        default:
            return "red";
    }
}

// Once we get a response, send the data.features object to the createFeatures function
function createFeatures(sst, landfall) {


    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature1(feature, layer) {
        layer.bindPopup("<b>" + feature.properties.year + "</b>"
            + "<br>Max Temp: <br>" + feature.properties.sea_surface_temp_max + " C"
            + "<br>Min Temp: <br>" + feature.properties.sea_surface_temp_min + " C"
            + "<br>Average Temp: <br>" + feature.properties.sea_surface_temp_mean + " C"
            + "<br>Median Temp: <br>" + feature.properties.sea_surface_temp_median + " C");
    }

    function onEachFeature2(feature, layer) {
        layer.bindPopup(`<strong>Status:</strong> ${feature.properties.Status}<br><strong>Name:</strong> ${feature.properties.Name}<br><strong>Month:</strong>${feature.properties.Month}<br><strong>Wind Speed:</strong> ${feature.properties.Wind_mph}`);
    }

    function pointToLayer1(geoJsonPolygon, sstGeo, bounds) {
        // define rectangle geographical bounds
        var bounds = [[sstGeo.coordinates[0][0]], [sstGeo.coordinates[0][2]]];
        // create an orange rectangle
        map.fitBounds(bounds);
        return L.rectangle(bounds);
    }

    function pointToLayer2(geoJsonPoint, latlng) {
        // create hurricance circles
        return L.circleMarker(latlng);
    }

    function style1(feature) {
        return {
            color: "black",
            fillColor: circleColor(feature.properties.Wind_mph),
            fillOpacity: 0.65,
            weight: 0.5,
            radius: (feature.properties.Wind_mph) / 8
        }
    }

    function style2(sstGeo) {
        return {
            color: "red",
            // fillColor: getColor
            fillOpacity: .2,
            weight: 1,
        }
    }

    // Create a GeoJSON layer containing the features array on the sstData object
    // Run the onEachFeature function once for each piece of data in the array
    var sst = L.geoJSON(sst, {
        onEachFeature: onEachFeature1,
        pointToLayer: pointToLayer1,
        style: style2
    });

    var landfall = L.geoJSON(landfall, {
        onEachFeature: onEachFeature2,
        pointToLayer: pointToLayer2,
        style: style1
    });

    createMap(sst, landfall);
}


function createMap(sst, landfall) {

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

    $("#mapid").html("<div id='map'></div>")

    // Create our map, giving it the satelitte and sst layers to display on load
    var myMap = L.map("map", {
        center: [25, -75],
        zoom: 4,
        layers: [satelitte, sst]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}
function init (years){
    var selector = d3.select("#yearSelect")
    years.map(y=>{
        selector
            .append("option")
            .property("value",y)
            .text(y)
    })
}

function onchange (event){
    var year = event.target.value
    var sst = sstData.features.filter(feature => feature.properties.year == year)
    var landfall = landfallData.features.filter(feature => feature.properties.Year == year)
    createFeatures(sst, landfall)    
}

$("#yearSelect").on("click",onchange)

// Perform a GET request to the query URL
d3.json(queryUrl, function (sstRes) {
    console.log(sstRes);

    // // Once we get a response, send the data.features object to the createFeatures function

    d3.json(url, function (landfallRes) {
        console.log(landfallRes);
        sstData = sstRes;
        landfallData = landfallRes;
        var years=[]

        sstData.features.map(x=>{
            if(!years.includes(x.properties.year)){
                years.push(x.properties.year)
            }
        })
        init(years)

        sstRes.features = sstRes.features.filter(feature => feature.properties.year == years[x])
        landfallRes.features = landfallRes.features.filter(feature => feature.properties.Year == years[x])

        // // Once we get a response, send the data.features object to the createFeatures function
        createFeatures(sstRes, landfallRes);
    });
});
