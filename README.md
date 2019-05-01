# The Map-based Airlines’ Visualization with Twitter Sentiment Analysis

Demo link: (https://lionandbull.github.io/gradfinal/)

## Introduction
The goal of this web-based consulting interactive visualization is mainly to display statistic inform for the past airlines by combining three kinds of visualization patterns, and it provides a chance for audiences to explore the potential useful inform throughout the vis patterns. At the meantime, we combined the advantage of the React.js with D3 to creative interactive visualizations and using the Amazon Website Service to deal with big data problem (instead of uploading the whole large dataset along with website, we store the data into MongoDB and transport information via AWS). This vis is consisted of a US national map, of which circles represent different airports that are distributed across the entire country. The position of each airport is located according to the longitude and latitude data coming from us.json file. While the users move the mouse over the map, the chosen state or airport will be highlight and the more corresponding detail inform will pop up. As a extend practice of assignment 4, there are another two coordinated views sited beside the main map view—a stack bar chart and a word cloud. The stack bar chart is used to display the statistical data of the degree of flight delays among six different airline companies. Since the passengers’ feedback is the second half of the vis topic, the word cloud will present those key words of which the appearance has highest frequency.

## Data
Tweeter Sentiment data: https://www.kaggle.com/crowdflower/twitter-airline-sentiment.
2015 Flight Delays and Cancellations: https://www.kaggle.com/usdot/flight-delays#airports.csv.

## Design Achievements
From this visualization, we can discover the dataset more efficiently and throughly.

- Use US Map to show all airports
- Use Bar chart to show the average departure delay time and arrival delay time of each airline.
- Use Word Cloud to present Tweeter User's atiitute. We extract all the emoji in the text and count the frequency to map them in the Word Cloud view.
- Dynamiclly show Tweeter User's tweet at the top of visualization.

## Technical Achievements

- Making use of D3 enter, update and exit features to develop a good visualization transition. 
- Combine React and D3 to create an interactive data visualization.
- Stroing dataset into MongoDB and transporting via Amazon Website Service.
- Using Bootstrap to improve the performance.
