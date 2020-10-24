# Hurricane Activity in the Atlantic Basin
## Frequency and Economic Impact

## Goal 
We set out on this project to show the increase in hurricane activity in the Atlantic Basin. Following landfall events and the increasing temperature of the surrounding ocean waters, the data shows more frequent hurricane storms. We aimed to visualize this by presenting the yearly data on a map that a user can toggle through by year. The user can filter in or out the data of their choosing by using the layover feature on our maps. We have also included the source data and the 

## Method
Data was gathered using Google's Big Query services to collect sea surface temperatures from 1851 - 2017. Hurricane data was collected through NCIES on hurricane history in the Atlantic Basin. The sea surface temperature(sst) data needed cleaned to represent the land area of interest. This involved dropping a massive amount of longitude/latitude points. The data then needed to be aggregated by the median temperature in a 10x10 degree grid. The historical hurricane data required thorough cleaning as well, including a reformatting of the lat/long coordinates. Once each database was cleaned, they needed to be converted to GeoJson formats for accurate representaion on our sites map. We used a Python script found here(https://geoffboeing.com/2015/10/exporting-python-data-geojson/) All thanks to Geoff Boeing for the brilliant code. Once the data was cleaned and formatted, we deployed the data using multiple web based librarys(Leaflet,Jquery,Bootstrap) to present a visualization app that users can navigate to different data sets and information. 

## Future Goals
To build on this project, we would like to incorporate the monetary costs that these hurricane events into our mapping visualization. Possibly deploying a Cloropleth layer on our map for the economic cost per state. This would require looking into FEMA data and seeing emergancy fund spending. We would also like to expand this type of visualization to other natural disasters, trying to showcase the total costs of these events. 
