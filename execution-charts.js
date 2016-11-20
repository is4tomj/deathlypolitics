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

$(function() {

  if(executionData.length > 0) {
    showTotalExecuted(executionData);
    showLastExecuted(executionData);
  }

  var stats = {};
  for(var i=0; i<executionData.length; i++) {
    var record = executionData[i];
    var race = record.race;
    incrementStats(stats, "executed_race_", record.race.toLowerCase());
  }
  console.log(stats);

  var totalExecutedDiv = $("#total-executed-in-us");
  if(totalExecutedDiv.length > 0) {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {

      // Create the data table.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Race');
      data.addColumn('number', 'Executed');
      data.addRows([
        ['Asian', stats.executed_race_asian],
        ['Black', stats.executed_race_black],
        ['Latino', stats.executed_race_latino],
        ['Other', stats.executed_race_other],
        ['White', stats.executed_race_white]
      ]);

      // Set chart options
      var options = {'title':'How Much Pizza I Ate Last Night',
                      'width':400,
                      'height':300};

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
  }
});
