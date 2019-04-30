# The Map-based Airlines’ Visualization with Twitter Sentiment Analysis

Demo link: (https://lionandbull.github.io/gradfinal/)

## Abstract
The goal of this web-based consulting interactive visualization is mainly to display statistic inform for the past airlines by combining three kinds of visualization patterns, and it provides a chance for audiences to explore the potential useful inform throughout the vis patterns. This vis is consisted of a US national map, of which circles represent different airports that are distributed across the entire country. The position of each airport is located according to the longitude and latitude data coming from us.json file. While the users move the mouse over the map, the chosen state or airport will be highlight and the more corresponding detail inform will pop up. As a extend practice of assignment 4, there are another two coordinated views sited beside the main map view—a stack bar chart and a word cloud. The stack bar chart is used to display the statistical data of the degree of flight delays among six different airline companies. Since the passengers’ feedback is the second half of the vis topic, the word cloud will present those key words of which the appearance has highest frequency. 

## Introduction
As a major public transportation, airline market has been ushering a booming development. On a global scale, a continuous world-wide growth of air traffic could be observed, and according to several market researches, the growth is expected to maintain positive rates up to 2030.

However, there are many factors that affect the performance of the commercial aviation system, which can lead to annoying results to their passengers sometimes. Given the uncertain factors of the whole aviation system, passengers usually have to plan their travel many days or even months before the departure date. Meanwhile, in order to decrease the trip costs, avoid the rush traffic hours, and then obtain a relaxed travel experience, travelers also hope to gain as more detailed information as possible.

Converting the traditional numeric information into a more vivid visualization form, could help the viewers gain their desired information efficiently and easily. So, we intend to build a map based interactive consulting visualization, which combines two date sets coming from the US Department of Transportations Bureau of Transportation Statistics. We hope this application can reveal some potential patterns under the ﬂight records and display them to the viewers

## Background
As the time goes by, the use of coordinated multiple views has been changing and expanding a lot, in addition it also becomes part of larger sensemaking environments where the techniques are being used to analyze large datasets, integrate alternate viewpoints, and generate nuggets of information. (1) Nowadays, D3.js library is one of the most popular tools to implement the coordinated multiple views and then analysis large data set. It is worth and quite practical to apply these ideas and tools while building the final project. 
Meanwhile, data visualization is not just a way that simply transforms the data into several tables or charts, instead, it also involves pre-processing on data such as clearing, filtering, mapping or other aggregation operation. The process that chose appropriate visualization pattern with the dataset is challenging, but on the other hand, a good vis always provides its audiences an intuitive and logical experience. Utilizing all the handy techniques we have to develop an extension of the previous project, is a good study path for our future work.

## Method/Implementation
We apply `D3.js` library to build the whole data visualization including one map view which is used to depict the airports and the airlines. While users move the mouse over an area belonged to a specific state, the area will highlight of which the color change and the name of that state will pop up. Once users click the state, it will filter out other states, that only displays the airports sited inside the chosen state. For sure, we also provide a button placed at the top middle of the web page, to reset the map view to its original status. Correspondingly, the right-side bar chart will change once users click a specific state. The bar chart we use here is to display a comparison of fight delay period among at most six airline companies. This bar chart is a variety of the plain bar, which is divided horizontally into upper and lower part, each of them present the degree of departure and arrival delay respectively. Initially, this stack bar chart will display average delay time across all the flight data. Of course, to make the bar chart more practical, we also append the numeric value of the flight delay time while users move the mouse over a specific part of the bar chart.
Meanwhile, the word cloud view will change as a reaction of the click action on the stack bar chart, the key words it shows every time will change correspond with the content of passengers’ tweets. Most of the words are the reflection of the feel of the passengers, either is positive or negative. 

## Results

## Discussion

## Conclusion


## Related Research Papers:
It gives an idea that how to depict a visualization of adjacency relations in hierarchical data, especially with a huge dataset [6].

They presented a visual analysis of Twitter time-series, which combines sentiment and stream analysis with geoand time-based interactive visualizations for the exploration of real-world Twitter data streams [3].

It introduced a novel visualization called NodeTrix [5].
It restyles many useful and powerful d3 data visualizations [4].

Elijah combined d3 with React which makes use of both two advantages to improve performance, and It’s also a good way to deal with interactive visualizations. [2]

References
(1)	State of the Art: Coordinated & Multiple Views in Exploratory Visualization
(7) User-directed Sentiment Analysis: Visualizing the Affective Content of Documents
(8) A Review of Uncertainty in Data Visualization
(9) Toward a Deeper Understanding of the Role of Interaction in Information Visualization

