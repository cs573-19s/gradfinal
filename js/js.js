



let arr = [];

// 添加csv
arr.push(d3.csv('data/states_all_extended.csv', row=>{
    row.YEAR = +row.YEAR;
    row.ENROLL = +row.ENROLL;
    row.TOTAL_REVENUE = +row.TOTAL_REVENUE;
    row.FEDERAL_REVENUE = +row.FEDERAL_REVENUE;
    row.STATE_REVENUE = +row.STATE_REVENUE;
    row.LOCAL_REVENUE = +row.LOCAL_REVENUE;
    row.TOTAL_EXPENDITURE = +row.TOTAL_EXPENDITURE;
    row.INSTRUCTION_EXPENDITURE = +row.INSTRUCTION_EXPENDITURE;
    row.SUPPORT_SERVICES_EXPENDITURE = +row.SUPPORT_SERVICES_EXPENDITURE;
    row.OTHER_EXPENDITURE = +row.OTHER_EXPENDITURE;
    row.CAPITAL_OUTLAY_EXPENDITURE = +row.CAPITAL_OUTLAY_EXPENDITURE;

    return row;
}));
arr.push(d3.csv('data/Math.csv', row=>{
    row.AverageScaleScore = +row.AverageScaleScore;
    row.YEAR = +row.YEAR;
    return row;
}));

let mymap = null;


// 加载geojson数据
arr.push(d3.json('data/gz_2010_us_040_00_20m.json'));

arr.push(d3.csv('data/states.csv'));

Promise.all(arr)
    .then(([csv,math, us, states])=>{
        math.sort((a,b)=>a.YEAR - b.YEAR);
        let groupByYear = d3.nest().key(d=>d.YEAR).entries(csv);
        console.log(groupByYear);

        let idx = 0;
        let flag = 'TOTAL_REVENUE';

        //region 时间轴
        let timeLineSvg = d3.select("#timeline");
        timeLineSvg.html("");
        let timeLineRootG = timeLineSvg.append('g');
        timeLineRootG.append('line')
            .attr('x1',0)
            .attr('y1',100)
            .attr('x2',1200)
            .attr('y2',100)
            .style("stroke-width",2)
            .style('stroke','#00A2E8');

        let years = groupByYear.map(g=>g.key);

        let scale_loc = d3.scaleBand().domain(years).range([0,1200]);

        const r = 15;

        timeLineRootG.selectAll('.timeNode').data(years)
            .enter().append('circle')
            .attr('class','timeNode')
            .attr('cx',d=>scale_loc(d)+scale_loc.bandwidth()/2)
            .attr('cy',100)
            .attr('r',r)
            .attr('data-time', d=>d)
            .on('click', function () {
                let time = d3.select(this).attr('data-time');
                idx = groupByYear.findIndex(d=>d.key == time );
                d3.selectAll('.timeNode').style('fill','#0070C0');
                d3.select(this).style('fill','#FF7F27');

                create();

            })
            .attr('fill','#0070C0');

        timeLineRootG.selectAll('.timeNodeText').data(years)
            .enter().append('text')
            .attr('class','timeNodeText')
            .attr('x',d=>scale_loc(d)+scale_loc.bandwidth()/2)
            .attr('y',100+r+20)
            .attr('fill','#000')
            .style('text-anchor','middle')
            .html(d=>d);
        //endregion

        let usGeoJson = null;

        d3.selectAll('.page2-category')
            .on('click',function () {
                let category = d3.select(this).attr('data-v');

                if (category === 'REVENUE') {
                    flag = 'TOTAL_REVENUE';
                }else {
                    flag = 'TOTAL_EXPENDITURE'
                }

                create();
            });

        function create() {
            d3.select('circle[data-time="'+groupByYear[idx].key+'"]').style('fill','#FF7F27');
            if (mymap === null) {
                mymap = L.map('mapid').setView([42.940339, -102.380219], 4);

                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    id: 'mapbox.streets'
                }).addTo(mymap);
            }

            const data = groupByYear[idx];

            console.log(d3.extent(data.values, d=>d[flag]));

            let color_scale = d3.scaleLinear().domain(d3.extent(data.values, d=>d[flag])).range(['#C8EFD4', '#085820']);
            // console.log(color_scale(2827391));

            if (usGeoJson) {
                mymap.removeLayer(usGeoJson);
            }

            usGeoJson = L.geoJSON(us,{
                style: function (feature) {
                    // console.log(feature);
                    let name = feature.properties.NAME;
                    let target = data.values.find(d=>d.STATE === name.toUpperCase()) || {[flag]: 0};
                    let color = color_scale(target[flag]);
                    return {weight:1, fillColor: `${color}`, fillOpacity: 0.8};
                }
            });

            usGeoJson
                .bindPopup(function (layer) {
                    console.log('layer',layer);
                    let name = layer.feature.properties.NAME.toUpperCase();
                    console.log('data',data);
                    let target = data.values.find(value=>value.STATE.toUpperCase() === name);
                    if (target) {
                        return "<div>" +
                            "<p>YEAR:"+target.YEAR+"</p>"+
                            "<p>ENROLL:"+target.ENROLL+"</p>"+
                            "<p>TOTAL_REVENUE:"+target.TOTAL_REVENUE+"</p>"+
                            "<p>FEDERAL_REVENUE:"+target.FEDERAL_REVENUE+"</p>"+
                            "<p>STATE_REVENUE:"+target.STATE_REVENUE+"</p>"+
                            "<p>LOCAL_REVENUE:"+target.LOCAL_REVENUE+"</p>"+
                            "<p>TOTAL_EXPENDITURE:"+target.TOTAL_EXPENDITURE+"</p>"+
                        "</div>"
                    }else {
                        return null;
                    }
                })
                .addTo(mymap);

            function onMapClick(e) {
                console.log(e);
                let name = e.layer.feature.properties.NAME;
                let target = data.values.find(d=>d.STATE === name.toUpperCase()) || {};

                drawArc(target);


            }
            usGeoJson.on('click',onMapClick);



            function drawArc(data) {
                const keys = ['OTHER_EXPENDITURE', 'INSTRUCTION_EXPENDITURE', 'CAPITAL_OUTLAY_EXPENDITURE', 'SUPPORT_SERVICES_EXPENDITURE'];
                var colors = [
                    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
                    "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
                ];
                const _data = [];
                // keys.map(key=>data[key]);
                let legend = d3.select(".pie .legend").html("");
                keys.forEach((key,i)=>{
                    _data.push(data[key]);
                    legend.append('span').html(key);
                    legend.append('div').style('background',colors[i])

                });


                const radius = 150;

                let svg = d3.select("#page2-arc");
                svg.html("");
                let root = svg.append('g')
                    .attr('transform','translate(195,300)');


                var arc = d3.arc()
                    .outerRadius(radius)
                    .innerRadius(0);

                var pie = d3.pie();

                var arcs = pie(_data);

                let arcs_update = root.selectAll('.arc').data(arcs);

                arcs_update.transition().duration(4000).attr('d',arc);

                arcs_update.enter().append('path')
                    .attr('class', 'arc')
                    .attr('d',arc)
                    .style('fill',(d,i)=>colors[i]);

                arcs_update.exit().remove();
            }
        }

        //create();

        d3.select(".page1-footer input")
            .on('click',function () {
                d3.selectAll('.page1,.page3,.page4,.page5').style('display', 'none');
                d3.select('.page2').style('display', 'block');
                create();
                d3.select(".btn").style('display','block');
            });

        d3.select("#opt_map")
            .on('click',function () {
                d3.selectAll('.page1,.page3,.page4,.page5').style('display', 'none');
                d3.select('.page2').style('display', 'block');
                create();


            });
        d3.select("#opt_sc")
            .on('click',function () {
                d3.selectAll('.page1,.page2,.page4,.page5').style('display', 'none');
                d3.select('.page3').style('display', 'block');
            });
        d3.select("#opt_bc")
            .on('click',function () {
                d3.selectAll('.page1,.page2,.page3,.page5').style('display', 'none');
                d3.select('.page4').style('display', 'block');
                create2();
            });
        d3.select("#opt_team")
            .on('click',function () {
                d3.selectAll('.page1,.page2,.page3,.page4').style('display', 'none');
                d3.select('.page5').style('display', 'block');
            });

        /*d3.select("#page4-back")
            .on('click',function () {
                d3.selectAll('.page1,.page2,.page4').style('display', 'none');
                d3.select('.page3').style('display', 'block');
            });
        d3.select("#page3-back")
            .on('click',function () {
                d3.selectAll('.page1,.page3,.page4').style('display', 'none');
                d3.select('.page2').style('display', 'block');
                create();
            });*/


        function step3(csv, field) {
            /// const field = 'TOTAL_REVENUE';

            let groupByYear = d3.nest().key(d=>d.YEAR).entries(csv);
            let years = groupByYear.map(g=>g.key);


            let svg = d3.select("#page3-svg");

            svg.html("");

            let root = svg.append('g')
                .attr('transform','translate(100,100)');

            let width = +svg.attr('width') - 200;
            let height = +svg.attr('height') - 200;

            let scales = groupByYear.map(g=>{
                let extent = d3.extent(g.values, d=>d[field]);
                let delta = (extent[1]-extent[0])/10;
                return d3.scaleLinear().domain([extent[0]-delta , extent[1]+delta]).range([0,height])
            });
            let scale_x = d3.scaleBand().domain(years).range([0,width]);

            scales.forEach((scale,i)=>{
                root.append('g')
                    .attr('transform',`translate(${scale_x(years[i])+scale_x.bandwidth()/2},0)`)
                    .call(d3.axisLeft(scale).ticks(5))

            });

            let lines = [];
            let groupByState = d3.nest().key(d=>d.STATE).entries(csv);
            const color = d3.scaleSequential(d3.interpolateRainbow).domain([0, groupByState.length-1]);
            console.log('groupByState',groupByState);
            groupByState.forEach(g=>{
                let line= scales.map((scale,i)=>([scale_x(years[i])+scale_x.bandwidth()/2, scale(g.values[i][field])]));
                line.name = g.key;
                lines.push(line);
            });

            root.selectAll('.time').data(years)
                .enter().append('text')
                .attr('x',d=>(scale_x(d)+scale_x.bandwidth()/2))
                .attr('y', -10)
                .style('text-anchor', 'middle')
                .html(d=>d);

            var line = d3.line()
                .x(function(d) { return d[0]; })
                .y(function(d) { return d[1]; });

            root.selectAll('.line').data(lines)
                .enter().append('path')
                .attr('class','line')
                .attr('d', line)
                .attr('data-name',d=>d.name.toUpperCase())
                .style('stroke', (d,i)=>color(i))
                //.style('stroke-width',2)
                .style('fill','none')
                .on('mouseover',function () {
                    let coord = d3.mouse(document.body);
                    d3.select("#info")
                        .style('left', (coord[0]+20)+'px')
                        .style('top', coord[1]+'px')
                        .html(d3.select(this).attr('data-name'))
                })
                .on('mouseout',function () {
                    d3.select("#info")
                        .style('left', '-1000px')
                });

            d3.select("#btn_search_state")
                .on('click',function () {
                    let stateName = d3.select("#search_state").property('value').toUpperCase();
                    if (stateName.length > 0 ) {
                        d3.selectAll('.line').style('stroke-opacity',0.2);
                        d3.selectAll('.line').filter(`path[data-name="${stateName}"]`).style('stroke-opacity',1);
                    }else {
                        d3.selectAll('.line').style('stroke-opacity',1);
                    }
                });
            d3.select("#reset")
                .on('click',function () {
                    d3.selectAll('.line').style('stroke-opacity',1);
                })



        }

        /*csv = csv.filter(d=>(d.YEAR===1993 || d.YEAR===2001 || d.YEAR===2009 || d.YEAR===2016));
        math = math.filter(d=>(d.YEAR===1996 || d.YEAR===2000 || d.YEAR===2009 || d.YEAR===2017));*/
        step3(csv.filter(d=>(d.YEAR===1993 || d.YEAR===2001 || d.YEAR===2009 || d.YEAR===2016)),
            'TOTAL_REVENUE');

        d3.selectAll('.page3_btn')
            .on('click',function () {
                let data_v = d3.select(this).attr('data-v');
                if (data_v === 'MATH') {
                    step3(math.filter(d=>(d.YEAR===1996 || d.YEAR===2000 || d.YEAR===2009 || d.YEAR===2017)),
                        'AverageScaleScore');
                }else {
                    step3(csv.filter(d=>(d.YEAR===1993 || d.YEAR===2001 || d.YEAR===2009 || d.YEAR===2016)),
                        'TOTAL_REVENUE');
                }
            });


        let create2 = null;
        (function () {
            let years = [1996, 2000, 2003, 2005, 2007, 2009, 2011, 2013, 2015];
           let svg = d3.select("#page4_svg");
           let margin = {
               left: 50,
               top: 50,
               right: 50,
               bottom: 50
           };
           let w = +svg.attr('width') - margin.left - margin.right;
           let h = +svg.attr('height')-margin.top - margin.bottom;
           let root = svg.append('g').attr('transform',`translate(${margin.left}, ${margin.top})`);
           let textG_inner = root.append('g').attr('transform',`translate(${w/2}, ${h/2})`);
           textG_inner.append('text')
               .attr('y',-20)
               .html('Education');
            textG_inner.append('text')
                .html('and');
            textG_inner.append('text')
                .attr('y',20)
                .html('Revenue');

            let circle_inner = root.append('g').attr('transform',`translate(${w/2}, ${h/2})`);
            let circle_inner2 = root.append('g').attr('transform',`translate(${w/2}, ${h/2})`);

            let groupByYear_math = d3.nest().key(d=>d.YEAR).entries(math.filter(d=>years.includes(d.YEAR)));
            let groupByYear_csv = d3.nest().key(d=>d.YEAR).entries(csv.filter(d=>years.includes(d.YEAR)));


            let idx = 0;
            let flag = 'TOTAL_REVENUE';

            var tool_tip = d3.tip()
                .attr("class", "d3-tip")
                .offset([-8, 0])
                .html(function(d) { return "value: " + ((d.TOTAL_REVENUE || 0) + (d.AverageScaleScore|| 0)); });

            svg.call(tool_tip);

            create2 = ()=>{
                console.log(d3.select('.t2[data-time="'+years[idx]+'"]'));
                d3.select('.t2[data-time="'+years[idx]+'"]').style('fill','#FF7F27');
                let per_PI = Math.PI * 2 / 20;
                circle_inner.html("");
                circle_inner2.html("");
                let math_data = groupByYear_math[idx];
                let csv_data = groupByYear_csv[idx];

                let math_data_pre20 = math_data.values.sort((a,b)=>b.AverageScaleScore-a.AverageScaleScore).slice(0,20);
                let math_csv_pre20 = csv_data.values.sort((a,b)=>b.TOTAL_REVENUE-a.TOTAL_REVENUE).slice(0,20);

                let scale_math_r = d3.scaleLinear().domain(d3.extent(math_data_pre20, d=>d.AverageScaleScore)).range([15, 40]);
                let scale_csv_r = d3.scaleLinear().domain(d3.extent(math_csv_pre20, d=>d.TOTAL_REVENUE)).range([20, 50]);

                console.log(math_data_pre20, math_csv_pre20);

                circle_inner.append('circle')
                    .attr('r', h/2/3*2)
                    .style('stroke', 'red')
                    .style('stroke-width',2)
                    .style('fill', 'none');
                circle_inner2.append('circle')
                    .attr('r', h/2)
                    .style('stroke', 'red')
                    .style('stroke-width',2)
                    .style('fill', 'none');

                d3.range(0,20).forEach(i=>{
                    circle_inner.append('circle')
                        .attr('cx', h/2/3*2 * Math.cos(i*per_PI))
                        .attr('cy', h/2/3*2 * Math.sin(i*per_PI))
                        .attr('r',scale_math_r(math_data_pre20[i].AverageScaleScore))
                        .style('fill','red')
                        .on('mouseover', _=>tool_tip.show(math_data_pre20[i]))
                        .on('mouseout', tool_tip.hide);

                    let name = math_data_pre20[i].STATE;
                    let t1 = states.find(d=>d.State.toUpperCase() === name.toUpperCase());
                    circle_inner.append('text')
                        .attr('x', h/2/3*2 * Math.cos(i*per_PI))
                        .attr('y', h/2/3*2 * Math.sin(i*per_PI))
                        .html(t1.Abbreviation);



                    circle_inner2.append('circle')
                        .attr('cx', h/2 * Math.cos(i*per_PI))
                        .attr('cy', h/2 * Math.sin(i*per_PI))
                        .attr('r',scale_csv_r(math_csv_pre20[i].TOTAL_REVENUE))
                        .style('fill','red')
                        .on('mouseover', _=>tool_tip.show(math_csv_pre20[i]))
                        .on('mouseout', tool_tip.hide);

                    let name_csv = math_csv_pre20[i].STATE;
                    let t2 = states.find(d=>d.State.toUpperCase() === name_csv.toUpperCase()) || {Abbreviation: name_csv};
                    circle_inner2.append('text')
                        .attr('x', h/2 * Math.cos(i*per_PI))
                        .attr('y', h/2 * Math.sin(i*per_PI))
                        .html(t2.Abbreviation);
                })

            };



            //region 时间轴
            let timeLineSvg = d3.select("#timeline2");
            timeLineSvg.html("");
            let timeLineRootG = timeLineSvg.append('g');
            timeLineRootG.append('line')
                .attr('x1',0)
                .attr('y1',100)
                .attr('x2',1200)
                .attr('y2',100)
                .style("stroke-width",2)
                .style('stroke','#00A2E8');


            let scale_loc = d3.scaleBand().domain(years).range([0,1200]);

            const r = 30;

            timeLineRootG.selectAll('.timeNode').data(years)
                .enter().append('circle')
                .attr('class','timeNode t2')
                .attr('cx',d=>scale_loc(d)+scale_loc.bandwidth()/2)
                .attr('cy',100)
                .attr('r',r)
                .attr('data-time', d=>d)
                .on('click', function () {
                    let time = d3.select(this).attr('data-time');
                    // idx = groupByYear.findIndex(d=>d.key == time );
                    idx = years.findIndex(d=>d==time);
                    d3.selectAll('.timeNode').style('fill','#0070C0');
                    d3.select(this).style('fill','#FF7F27');

                    create2();

                })
                .attr('fill','#0070C0');

            timeLineRootG.selectAll('.timeNodeText').data(years)
                .enter().append('text')
                .attr('class','timeNodeText')
                .attr('x',d=>scale_loc(d)+scale_loc.bandwidth()/2)
                .attr('y',100+r+20)
                .attr('fill','#000')
                .style('text-anchor','middle')
                .html(d=>d);
            //endregion

        }());


    });
