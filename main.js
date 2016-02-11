/**
 * Created by Samuel Gratzl on 11.02.2016.
 */

var svg = d3.select('body').append('svg').attr({
  width: 300,
  height: 300
});

var xscale = d3.scale.linear()
      .range([0,300]);

var yscale = d3.scale.ordinal()
      .rangeRoundBands([0, 300], 0.1, 0.1);


function update(data) {

  xscale.domain([0, d3.max(data)]);
  yscale.domain(d3.range(data.length));

  var rects = svg.selectAll('rect').data(data);
  rects.enter().append('rect');
  rects.attr({
    x : 0,
    y : function(d, i) { return yscale(i); },
    width: function(d) { return xscale(d); },
    height: yscale.rangeBand
  });
  rects.exit().remove();
}

//var data = [3, 4, 2, 5, 7];
//update(data);  

//external data
d3.csv('./data/dataset.csv', function(csv) {
  var data = csv.map(function(d) { return d.value; });
  update(data);  
})

