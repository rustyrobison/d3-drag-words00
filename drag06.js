// still trying to add force to word positions
// it might have something to do with using groups

var margin = {top: 10, right: 10, bottom: 30, left: 10},
    width = window.innerWidth,
    height = window.innerHeight;

var locations = d3.range(10).map(function() {
  return {
    x: Math.round(Math.random() * (width)),
    y: Math.round(Math.random() * (height)),
  };
});
console.log(locations[0]);
var simulation = d3.forceSimulation(locations);

// simulation.force("xAxis",d3.forceX(function(d) { return d.fx; }))
//           .force("yAxis",d3.forceY(function(d) { return d.fy; }));

simulation.force("xAxis",d3.forceX(width/2))
          .force("yAxis",d3.forceY(height/2));

// var color = d3.scaleOrdinal(d3.schemeCategory20);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var words = svg.selectAll('g')
  .data(locations)
  .enter().append("g")
  // .attr("transform",
  //       "translate(" + margin.left + "," + margin.top + ")")
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
group.append("text")
     .attr("x", function(d) { return d.x; })
     .attr("y", function(d) { return d.y; })
       .attr("text-anchor", "start")
       .text(function(d,i){ return textArray[i]});


function dragstarted(d) {
  d3.select(this).raise().classed("active", true);
  simulation.restart();
  simulation.alpha(1.0);
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {

  d.fx = d3.event.x;
  d.fy = d3.event.y;

  // d3.select(this).select("text")
  //   .attr("x", d.fx = d3.event.x)
  //   .attr("y", d.fy = d3.event.y);
}

function dragended(d) {
  d.fx = null;
  d.fy = null;
  simulation.alphaTarget(0.1);
  d3.select(this).classed("active", false);
}

 function ticked(){
     group.attr("x", function(d){ return d.x;})
          .attr("y", function(d){ return d.y;})
 }

 simulation.on("tick",ticked);
