"use strict";

function showTotalExecuted(data) {
  var space = $("#total-executed-in-us");
  if(space.length > 0) {
    space.text(data.length);
  }
}

function prettyDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

function showLastExecuted(data) {
  var lastExecuted = $.extend({}, data[0]);
  for(var i=1; i<data.length; i++) {
    if(data[i].date > lastExecuted.date) {
      lastExecuted = $.extend({}, data[i]);
    } 
  }

  lastExecuted.date = prettyDate(lastExecuted.date);
  var space = $("#last-executed");
  if(space.length > 0) {
    var keys = Object.keys(lastExecuted);
    for(var i=0; i<keys.length; i++) {
      var key = keys[i];
      var entrySpace = $("#last-executed-"+key);
      if(entrySpace.length > 0) {
        entrySpace.text(lastExecuted[key]);
      }
    }
  }
}


function incrementStats(stats, keyBase, keyExtension) {
  var key = keyBase;
  if(keyExtension !== undefined || keyExtension !== null) {
    key += keyExtension;
  }

  if(stats[key] === undefined || stats[key] === null) {
    stats[key] = 0;
  }
  stats[key] += 1;

  return stats[key];
}

function showExecutionByRacePieChart(data, divId, title) {
  
  var stats = {};
  for(var i=0; i<data.length; i++) {
    var record = data[i];
    var race = record.race;
    incrementStats(stats, "executed_race_", record.race.toLowerCase());
  }

  var chartDiv = $("#" + divId);
  if(chartDiv.length > 0) {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {

      // Create the data table.
      var chartData = new google.visualization.DataTable();
      chartData.addColumn('string', 'Race');
      chartData.addColumn('number', 'Executed');
      chartData.addRows([
        ['Asian', stats.executed_race_asian],
        ['Black', stats.executed_race_black],
        ['Latino', stats.executed_race_latino],
        ['White', stats.executed_race_white],
        ['Other', stats.executed_race_other]
      ]);

      // Set chart options
      var options = {
        title: title,
        width:500,
        height:300,
        legend: {
          position: 'labeled'
        },
        slices: {
          0: { color: '#eee'},
          1: { color: '#aaa'},
          2: { color: '#777'},
          3: { color: '#333'},
          4: { color: '#000'}
        }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById(divId));
      chart.draw(chartData, options);
    }
  }
}

function showBarChart(stats, title, divId, graphMax=false) {
  var ctx = document.getElementById(divId);
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: stats.keys,
          datasets: [{
              data: stats.dataArray
          }]
      },
      options: {
          title: {
            display: true,
            text: title
          },
          legend: {
            display: false
          },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true,
                      fixedStepSize: 5,
                      max: graphMax || stats.max
                  }
              }]
          }
      }
  });
}

$(function() {

  if(executionData.length > 0) {
    showTotalExecuted(executionData);
    showLastExecuted(executionData);

    var dataFor2016 = getExecutionStats(executionData, { year: '2016'});
    showExecutionByRacePieChart(dataFor2016, "2016-executions-by-race-chart", '2016 Executions by Race');

    var dataFor2015 = getExecutionStats(executionData, { year: '2015'});
    showExecutionByRacePieChart(dataFor2015, "2015-executions-by-race-chart", '2015 Executions by Race');

    var dataFor2014 = getExecutionStats(executionData, { year: '2014'});
    showExecutionByRacePieChart(dataFor2014, "2014-executions-by-race-chart", '2014 Executions by Race');

    var dataFor2013 = getExecutionStats(executionData, { year: '2013'});
    showExecutionByRacePieChart(dataFor2013, "2013-executions-by-race-chart", '2013 Executions by Race');

    var dataFor2012 = getExecutionStats(executionData, { year: '2012'});
    showExecutionByRacePieChart(dataFor2012, "2012-executions-by-race-chart", '2012 Executions by Race');

    var dataFor2011 = getExecutionStats(executionData, { year: '2011'});
    showExecutionByRacePieChart(dataFor2011, "2011-executions-by-race-chart", '2011 Executions by Race');

    var dataFor2010 = getExecutionStats(executionData, { year: '2010'});
    showExecutionByRacePieChart(dataFor2010, "2010-executions-by-race-chart", '2010 Executions by Race');

    var dataFor2009 = getExecutionStats(executionData, { year: '2009'});
    showExecutionByRacePieChart(dataFor2009, "2009-executions-by-race-chart", '2009 Executions by Race');


    var stats = compileStats(executionData, ['year']);
    showBarChart(stats, '', 'executions-per-year');


    var stats = compileStats(dataFor2016, ['state']);
    showBarChart(stats, `${stats.total} executions in 2016`, '2016-executions-per-state', 20);

    var stats = compileStats(dataFor2015, ['state']);
    showBarChart(stats, `${stats.total} executions in 2015`, '2015-executions-per-state', 20);

    var stats = compileStats(dataFor2014, ['state']);
    showBarChart(stats, `${stats.total} executions in 2014`, '2014-executions-per-state', 20);

    var stats = compileStats(dataFor2013, ['state']);
    showBarChart(stats, `${stats.total} executions in 2013`, '2013-executions-per-state', 20);

  }
});
