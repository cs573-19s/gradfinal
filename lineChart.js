
function createLineChart(id, data, lat1, lat2, long1, long2){

	// set the dimensions and margins of the graph
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    width = 300 - margin.left - margin.right,
	    height = 300 - margin.top - margin.bottom;

	// set the ranges
	var x = d3.scaleLinear().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	// define the line
	var valueline = d3.line()
	    .x(function(d) { return x(d.Longitude); })
	    .y(function(d) { return y(d.Latitude); });

	// append the svg obgect to the body of the page
	// appends a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	var svg = d3.select(id).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  	.append("g")
	    .attr("transform",
	          "translate(" + margin.left + "," + margin.top + ")");

	console.log(lat1)
        console.log(lat2)
        console.log(long1)
        console.log(long2)


	  // Scale the range of the data
	  x.domain([long1, long2]);
	  y.domain([lat2, lat1]);

	  // Add the valueline path.
	  // svg.append("path")
	  //     .data([data])
	  //     .attr("class", "line")
	  //     .attr("d", valueline);

	  // Add the X Axis
	  svg.append("g")
	      .attr("transform", "translate(0," + height + ")")
	      .call(d3.axisBottom(x));

	  // Add the Y Axis
	  svg.append("g")
	      .call(d3.axisLeft(y));

}