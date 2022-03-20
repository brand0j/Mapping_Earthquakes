# Mapping Earthquakes

## Description
The objective of this project was to gather GeoJSON earthquake data and visualize it in an HTML webpage using Leaflet. Our goal is to plot earthquake data, major earthquakes within the past week, along with the tectonic plate outlines to see where they are most active (where earthquakes are the most frequent).

## Results

Below is a preview of the webpage displaying everything that was mentioned above with some minor tweaks to the code which were not specified within the assignment rubric (these were mostly stylistic choices that I made sense to me).

![Mapping_Earthquakes](https://github.com/brand0j/Mapping_Earthquakes/blob/main/Resources/Mapping_Earthquakes.png)

## Summary 
Looking at the webpage you can see there are three different stylings for our mapbox (light, dark & satellite). Initially the streets view was used, but I felt this didn't offer anything to the user that the light mapbox style didn't offer as well and I felt it was just a more crisp representation overall. For the fault line I set the color to white since it stands out surprisingly well in all of the available mapbox styles. Another choice I made was to shift the starting coordinates to [40.7, 25] since this is more centered for the entire map. The final aesthetic choice that was made was when displaying the Major Earthquakes layer, I wanted there to be a distinction for earthquakes with a magnitude greater than six. The coloring for these earthquakes was set to a dark-red color so the difference is apparent and was also added to the legend in the bottom-right corner of the page.

