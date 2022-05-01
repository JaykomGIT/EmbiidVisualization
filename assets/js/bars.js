
(function() { 
  
// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#barChart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("Embiid3pt.csv", function(data) {

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.player; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    svg.append("text")             
    .attr("transform",
          "translate(" + (width/2) + " ," + 
                          (height + margin.top + 40) + ")")
    .style("text-anchor", "middle")
    .text("Player Name");

var ordinal = d3.scaleOrdinal()
    .domain(data)
    .range(["#370617","#6a040f","#9d0208","#d00000","#dc2f02","#e85d04","#f48c06","#faa307", "#ffba08"]);


    
// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 0.7])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

   // text label for the y axis
   svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Three Point Percentage");  

      var div = d3.select("#barChart").append("div")
      .attr("class", "tooltip-bar")
      .style("opacity", 0);
// Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.player); })
    .attr("y", function(d) { return y(d.percentage); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.percentage); })
    .attr("fill", function(d){return ordinal(d.player) })
    .on('mouseover', function (d, i) {
      d3.select(this).transition()
           .duration('50')
           .attr('opacity', '0.80');

           div.transition()
           .duration(50)
           .style("opacity", 1);

      let num = d.player + " " + "</br>" + (Math.round(d.percentage * 100)).toString() + '%';   

           div.html(num)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 15) + "px");
    })

    .on('mouseout', function (d, i) {
      d3.select(this).transition()
           .duration('50')
           .attr('opacity', '1');

           div.transition()
               .duration('50')
               .style("opacity", 0);
    })

})

})();