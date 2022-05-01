(function() { 
        //DATASOURCE: eMarketer, March 2018
        var data = [
            { year: 2016, name: "Joel Embiid", spending: 36.7 },
            { year: 2017, name: "Joel Embiid", spending: 31.0 },
            { year: 2018, name: "Joel Embiid", spending: 30.0 },
            { year: 2019, name: "Joel Embiid", spending: 33.1 },
            { year: 2020, name: "Joel Embiid", spending: 37.7 },
            { year: 2021, name: "Joel Embiid", spending: 38.6 },
            { year: 2022, name: "Joel Embiid", spending: 38.2 },
            { year: 2016, name: "Center Avg", spending: 32.6 },
            { year: 2017, name: "Center Avg", spending: 34.8 },
            { year: 2018, name: "Center Avg", spending: 35.7 },
            { year: 2019, name: "Center Avg", spending: 33.2 },
            { year: 2020, name: "Center Avg", spending: 32.8 },
            { year: 2021, name: "Center Avg", spending: 34.2 },
            { year: 2022, name: "Center Avg", spending: 33.6 }
        ];
        
        
        //set canvas margins
        leftMargin=70
        topMargin=30
        
        
        //format the year data
        
        var parseTime = d3.timeParse("%Y");
        
        data.forEach(function (d) {
            d.year = parseTime(d.year);
        });
        
        //scale xAxis 
        var xExtent = d3.extent(data, d => d.year);
        xScale = d3.scaleTime().domain(xExtent).range([leftMargin, 900])
        
        
        //scale yAxis
        var yMax=d3.max(data,d=>d.spending)
        yScale = d3.scaleLinear().domain([0, yMax+topMargin]).range([600, 0])
        
        
        
        //draw xAxis and xAxis label
        xAxis = d3.axisBottom()
            .scale(xScale)
        
        d3.select("#lineChartSVG")
            .append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0,620)")
            .call(xAxis)
            .append("text")
            .attr("x", (900+70)/2) //middle of the xAxis
            .attr("y", "50") // a little bit below xAxis
            .text("Year")
        
        //yAxis and yAxis label
        
        yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(10)
        
        d3.select('svg')
            .append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${leftMargin},20)`) //use variable in translate
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", "-150")
            .attr("y", "-50")
            .attr("text-anchor", "end")
            .text("3pt Percentage")
        
        //use .nest()function to group data
        
        var sumstat = d3.nest() 
            .key(d => d.name)
            .entries(data);
        
        console.log(sumstat)
        
        //set color pallete for different vairables
        var mediaName = sumstat.map(d => d.key) 
        var color = d3.scaleOrdinal().domain(mediaName).range(colorbrewer.Set2[6])
        
        
        //select path
        //three types: curveBasis,curveStep, curveCardinal
        d3.select("svg")
            .selectAll(".line")
            .append("g")
            .attr("class", "line")
            .data(sumstat)
            .enter()
            .append("path")
            .attr("d", function (d) {
                return d3.line()
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.spending)).curve(d3.curveCardinal)
                    (d.values)
            })
            .attr("fill", "none")
            .attr("stroke", d => color(d.key))
            .attr("stroke-width", 2)
        
        
        //append circle 
        d3.select("svg")
            .selectAll("circle")
            .append("g")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 6)
            .attr("cx", d => xScale(d.year))
            .attr("cy", d => yScale(d.spending))
            .style("fill", d => color(d.name))
        
        
        //append legends
        
        var legend = d3.select("svg")
            .selectAll('g.legend')
            .data(sumstat)
            .enter()
            .append("g")
            .attr("class", "legend");
        
        legend.append("circle")
            .attr("cx", 1000)
            .attr('cy', (d, i) => i * 30 + 350)
            .attr("r", 6)
            .style("fill", d => color(d.key))
        
        legend.append("text")
            .attr("x", 1020)
            .attr("y", (d, i) => i * 30 + 355)
            .text(d => d.key)
        
        
        
        //append title
        d3.select("svg")
            .append("text")
            .attr("x", 485)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .text("Joel Embiid 3pt % vs All Centers Avg, 2016-2022")
            .style("fill", "black")
            .style("font-size", 28)
            .style("font-family", "Arial Black")
        
        //apend source
        d3.select("svg")
            .append("text")
            .attr("x", 70)
            .attr("y", 700)
            .text("Source: BasketBallReference.com")
            .style("fill", "black")
            .style("font-size", 14)
            .style("font-family", "Arial Black")
        
        
})();