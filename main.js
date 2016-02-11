/**
 * Created by Samuel Gratzl on 11.02.2016.
 */

var table1 = d3.select('body').append('table');
table1.append('thead').append('tr');
table1.append('tbody');
var table2 = d3.select('body').append('table');
table2.append('thead').append('tr');
table2.append('tbody');

var result_formatter = d3.time.format.utc('%H:%M:%S.%L');

function update(table, data) {
  var data_columns = Object.keys(data[0]);

  var columns = table.select('thead tr').selectAll('th').data(data_columns);
  columns.enter().append('th');
  columns.text(String);
  columns.exit().remove();

  var rows = table.select('tbody').selectAll('tr').data(data);
  rows.enter().append('tr');
  var cols = rows.selectAll('td').data(function(row) { return data_columns.map(function(d) { return row[d]; })});
  cols.enter().append('td');
  cols.text(function(d,i) {
    if (d instanceof Date) {
      return result_formatter(d);
    } else {
      return d;
    };
  });
  cols.exit().remove();

  rows.exit().remove();
}

//external data
d3.tsv('./data/MedalData1.csv', function(metaldata1) {
  metaldata1.forEach(function(d) {
     //convert to date
    d.Result = d.ResultInSeconds === 'No result' ? null : new Date(parseFloat(d.ResultInSeconds)*1000);
    delete d.ResultInSeconds;
  });
  update(table1, metaldata1.slice(0,10));
});

d3.tsv('./data/MedalData2.csv', function(metaldata2) {
  update(table2, metaldata2.slice(0,10));
});
