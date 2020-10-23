// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl, function(data) {
  console.log(data);

});
// Get JSON data
// d3.json(queryUrl, function(data) {
//   console.log(data.features);
// });
//   // Once we get a response, send the data.features object to the createFeatures function
//   // createFeatures(sstData.features);

//   function getColor(d) {
//     return d > 5 ? '#E31A1C' :
//            d > 4 ? '#FC4E2A' :
//            d > 3 ? '#FD8D3C' :
//            d > 4 ? '#FEB24C' :
//            d > 1 ? '#FED976' :
//                     '#FFEDA0';
//   }

//   function createFeatures(sstData) {

//     // Define a function we want to run once for each feature in the features array
//     // Give each feature a popup describing the place and time of the earthquake
//     function onEachFeature(feature, layer) {
//       layer.bindPopup("<h3>" + feature.properties.place +
//         "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//     }

//     function pointToLayer(geoJsonPoint, latlng) {
//       var bounds=[[latRangeLeft,latRangeRight],[longRangeLeft,longRangeRight]];
//       return L.Rectangle(bounds).addTo(myMap)
//     }

//     function style(feature) {
//       return {
//           color: "black",
//           fillColor: "red",
//           fillOpacity: .3,
//           weight: 1,
//       }
//     }
//     // Create a GeoJSON layer containing the features array on the earthquakeData object
//     // Run the onEachFeature function once for each piece of data in the array
//     var sst = L.geoJSON(sstData, {
//       onEachFeature: onEachFeature, 
//       pointToLayer: pointToLayer,
//       style: style
//     });

//     // Sending our earthquakes layer to the createMap function
//     createMap(sst);
//   }

//   function createMap(sst) {

//     // Define satelitte and lightmap layers
//     var satelitte = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         maxZoom: 18,
//         id: "satellite-streets-v9",
//         accessToken: api_key
//     });


//     var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//       maxZoom: 18,
//       id: "light-v10",
//       accessToken: api_key
//     });

//     // Define a baseMaps object to hold our base layers
//     var baseMaps = {
//       "Satellite Map": satelitte,
//       "Light Map": lightmap
//     };

//     // Create overlay object to hold our overlay layer
//     var overlayMaps = {
//       Sea_Surface_Temp: sst
//     };

//     // Create our map, giving it the satelitte and earthquakes layers to display on load
//     var myMap = L.map("mapid", {
//       center: [25,-25],
//       zoom: 2.5,
//       layers: [satelitte, sst]
//     });

//     // Create a layer control
//     // Pass in our baseMaps and overlayMaps
//     // Add the layer control to the map
//     L.control.layers(baseMaps, overlayMaps, {
//       collapsed: false
//     }).addTo(myMap);

//     var legend = L.control({position: 'bottomright'});

//     legend.onAdd = function (myMap) {

//         var div = L.DomUtil.create('div', 'info legend'),
//             category = [-.1,1,2,3,4,5];

//         // loop through our density intervals and generate a label with a colored square for each interval
//         for (var i = 0; i < category.length; i++) {
//             div.innerHTML +=
//                 '<i style="background:' + getColor(category[i] + 1) + '"></i> ' +
//                 category[i] + (category[i + 1] ? '&ndash;' + category[i + 1] + '<br>' : '+');
//         }

//         return div;
//     };
//     legend.addTo(myMap);
//   }
