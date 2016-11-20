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

function getExecutionStats(stats, criteria) {

  var filteredStats = [];

  for(var i=0; i<stats.length; i++) {
    var record = stats[i];
    var keys = Object.keys(criteria);
    var shouldAddToResults = true;

    for(var j=0; j<keys.length; j++) {
      var key = keys[j];

      if(record[key].toString().match(criteria[key]) === null) {
        shouldAddToResults = false;
      }
    }

    if(shouldAddToResults) {
      filteredStats.push(record);
    }
  }

  return filteredStats;
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

$(function() {

  if(executionData.length > 0) {
    showTotalExecuted(executionData);
    showLastExecuted(executionData);

    var dataForYear = getExecutionStats(executionData, { date: new RegExp('2016', 'i')});
    showExecutionByRacePieChart(dataForYear, "2016-executions-by-race-chart", '2016 Executions by Race');

    var dataForYear = getExecutionStats(executionData, { date: new RegExp('2015', 'i')});
    showExecutionByRacePieChart(dataForYear, "2015-executions-by-race-chart", '2015 Executions by Race');
  }

  // const element = <h1>Hello, world</h1>;
  // ReactDOM.render(
  //   element,
  //   document.getElementById('root')
  // );
});
