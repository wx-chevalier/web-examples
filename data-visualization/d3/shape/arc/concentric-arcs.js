var width = window.innerWidth,
  height = window.innerHeight;

// append svg to the DIV
d3.select('.chart')
  .append('svg:svg')
  .attr('width', width)
  .attr('height', height);

var render = function(dataset) {
  console.log(dataset);

  // select the svg
  vis = d3.select('svg');

  // set constants
  var PI = Math.PI;
  var arcMin = window.width * 0.4; // inner radius of the first arc
  var arcWidth = 15; // width
  var arcPad = 1; // padding between arcs

  // arc accessor
  //  d and i are automatically passed to accessor functions,
  //  with d being the data and i the index of the data
  var drawArc = d3.svg
    .arc()
    .innerRadius(function(d, i) {
      return arcMin + i * arcWidth + arcPad;
    })
    .outerRadius(function(d, i) {
      return arcMin + (i + 1) * arcWidth;
    })
    .startAngle(0 * (PI / 180))
    .endAngle(function(d, i) {
      return d * 6 * (PI / 180);
    });

  // bind the data
  var arcs = vis.selectAll('path.arc-path').data(dataset);

  // *** update existing arcs -- redraw them ***
  arcs.attr('d', drawArc).attr('fill', function(d) {
    // we need to redefine the fills as well since we have new data,
    //  otherwise the colors would no longer be relative to the data
    //  values (and arc length). if your fills weren't relative to
    //  the data, this would not be necessary
    var grn = Math.floor((1 - d / 60) * 255);
    return 'rgb(0, ' + grn + ', 0)';
  });

  // draw arcs for new data
  arcs
    .enter()
    .append('svg:path')
    .attr('class', 'arc-path') // assigns a class for easier selecting
    .attr('transform', `translate(${window.width / 2}, ${window.height / 2})`) // sets position--easier than setting x's and y's
    .attr('fill', function(d) {
      // fill is an rgb value with the green value determined by the data
      // smaller numbers result in a higher green value (1 - d/60)
      // you should also look into using d3 scales to create gradients
      var grn = Math.floor((1 - d / 60) * 255);
      return 'rgb(0, ' + grn + ', 0)';
    })
    .attr('d', drawArc); // draw the arc
};

// you can safely ignore the code below.
//  the code is used to create a click area for people to regenerate
//  arcs by generating a new data set and calling render on that set

// for generating a random array of times
var generateTimes = function(quantity) {
  var i,
    times = [];

  for (i = 0; i < quantity; i++) {
    times.push(Math.round(Math.random() * 60));
  }

  return times;
};

// drawing the click area
var initialize = function() {
  var arcMin = 75; // this should match the arcMin in render()
  var times = generateTimes(6);

  render(times);

  // making the click circle
  if (!d3.selectAll('circle.click-circle')[0].length) {
    // if there is no click area..
    d3.select('svg')
      .append('circle')
      .attr('class', 'click-circle')
      .attr('transform', `translate(${window.width / 2}, ${window.height / 2})`)
      .attr('r', arcMin * 0.85)
      .attr('fill', 'rgba(201, 201, 201, 0.5)')
      .on('click', function(d) {
        times = generateTimes(6);
        render(times);
      });
  }
};

initialize();
