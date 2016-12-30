// Tried to make proper text out line; draw stroke on outside of path.


var margin = {top: 10, right: 10, bottom: 30, left: 10},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var rectangles = d3.range(10).map(function() {
  return {
    x: Math.round(Math.random() * (width)),
    y: Math.round(Math.random() * (height))
  };
});

var color = d3.scaleOrdinal(d3.schemeCategory20);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var groupStroke = svg.selectAll('g')
  .data(rectangles)
  .enter().append("g")
  .attr("class", "stroke")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

var groupFill = svg.selectAll('g')
  .data(rectangles)
  .enter().append("g")
  .attr("class", "fill")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

// group.append("rect")
//      .attr("x", function(d) { return d.x; })
//      .attr("y", function(d) { return d.y; })
//      .attr("height", 60)
//      .attr("width", 30)
//      .style("fill", function(d, i) { return color(i); });

var textArray = ["uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez"];

// var myText = "blueberry";
// console.log(myText);
// var bbox = myText.getComputedTextLength();
// console.log(bbox);


groupStroke.append("text")
     .attr("x", function(d) { return d.x; })
     .attr("y", function(d) { return d.y; })
       .attr("text-anchor", "start")
       .style("font-size", "30px")
       .style("fill", "steelblue")
       .style("stroke", "yellow")
       .style("stroke-alignment", "outside")
       .style("dominant-baseline", "hanging")
       .text(function(d,i){ return textArray[i]});

 groupFill.append("text")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
        .attr("text-anchor", "start")
        .style("font-size", "30px")
        .style("stroke-width", "0")
        .style("fill", "steelblue")
        .style("dominant-baseline", "hanging")
        .text(function(d,i){ return textArray[i]});


function dragstarted(d) {
  d3.select(this).raise().classed("active", true);
}

function dragged(d) {
  d3.select(this).select("text")
    .attr("x", d.x = d3.event.x)
    .attr("y", d.y = d3.event.y);
  d3.select(this).select("rect")
    .attr("x", d.x = d3.event.x)
    .attr("y", d.y = d3.event.y);
}

function dragended(d) {
  d3.select(this).classed("active", false);
}
