function createDeathBarChart(svg, data){
	var margin = {top: 20, right: 50, bottom: 30, left: 60}
	var width = +svg.attr("width") - margin.left - margin.right
	var height = +svg.attr("height") - margin.top - margin.bottom;
	  
	var sum = 0;
	var cHurricane = ""

	data.forEach(function(d){
		if(cHurricane != d.SerialNum){
			cHurricane = d.SerialNum
			sum += parseInt(d.Deaths)
		}
	});

	sum = Math.ceil (sum / 10000) * 10000
	  
	x.range([0, width])
		.domain([0, sum]);

	y.range([height, 0])
		.domain(["Deaths"])
		.padding(0.1);
	

	var g = svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	  


	g.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x).ticks(8).tickSizeInner([-height]));

	g.append("g")
		.attr("class", "y axis")
		.call(d3.axisLeft(y));

	var bar = g.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", 0)
		.attr("height", y.bandwidth())
		.attr("y", y("Deaths"))
		.attr("width", x(0))
		.attr("fill", "red")

	return bar;
}



function createDamagesBarChart(svg, data){
	var margin = {top: 20, right: 50, bottom: 30, left: 60}
	var width = +svg.attr("width") - margin.left - margin.right
	var height = +svg.attr("height") - margin.top - margin.bottom;
	  
	var sum = 0;
	var cHurricane = ""

	data.forEach(function(d){
		if(cHurricane != d.SerialNum){
			cHurricane = d.SerialNum
			sum += parseInt(d.Damages) * 1000000
		}
	});

	sum = Math.ceil (sum / 50000000000) * 50000000000
	  
	x2.range([0, width])
		.domain([0, sum]);

	y2.range([height, 0])
		.domain(["Damages"])
		.padding(0.1);
	

	var g = svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	  


	g.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x2).ticks(8).tickSizeInner([-height]));

	g.append("g")
		.attr("class", "y axis")
		.call(d3.axisLeft(y2));

	var bar = g.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", 0)
		.attr("height", y2.bandwidth())
		.attr("y", y2("Damages"))
		.attr("width", x2(0))
		.attr("fill", "green")

	return bar;
}