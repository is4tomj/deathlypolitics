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

function showExecutionByRacePieChart(stats, canvas, title) {

  var colors = []
  for(var i=0; i<stats.keys.length; i++) {
    var key = stats.keys[i];
    switch(key.toLowerCase()) {
      case 'asian':
        colors.push("#222222");
        break;
      case 'black':
        colors.push("#555555");
        break;
      case 'latino':
        colors.push("#888888");
        break;
      case 'native american':
        colors.push("#aaaaaa");
        break;
      case 'white':
        colors.push("#dddddd");
        break;
    }
  }
  
  var labels = [];
  for (var i=0; i<stats.dataArray.length; i++) {
    var percentage = Math.floor(100 * stats.dataArray[i]/stats.total);
    labels.push(`${stats.keys[i]} (${percentage}%)`);
  }

  if($(canvas).length > 0) {
    var ctx = canvas;
    var myPieChart = new Chart(ctx,{
      type: 'pie',
      data: {
          labels: labels,
          datasets: [{
              data: stats.dataArray,
              backgroundColor: colors
          }]
      },
      options: {
          title: {
            display: true,
            text: title
          },
          legend: {
            display: true
          }
      }
    });
  }
}

function showExecutionByRacePieCharts(data, dataForYear) {
  var canvases = $(".executions-by-race-pie-chart");
  for(var i=0; i<canvases.length; i++) {
    var canvas = $(canvases[i]);
    var year = canvas.attr("data-year");

    if(dataForYear[year] == null || dataForYear[year] === undefined) {
      dataForYear[year] = getExecutionStats(data, { year: year});
    }
    
    var stats = compileStats(dataForYear[year], ['race']);
    showExecutionByRacePieChart(stats, canvas[0], `${year} Executions by Race`);
  }
}

function showBarChart(stats, title, canvas, graphMax=false) {
  var ctx = canvas;
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

function showExecutionsPerStatePerYear(data, dataForYear) {
  var canvases = $(".executions-per-state");
  for(var i=0; i<canvases.length; i++) {
    var canvas = $(canvases[i]);
    var year = canvas.attr("data-year");

    if(dataForYear[year] == null || dataForYear[year] === undefined) {
      dataForYear[year] = getExecutionStats(data, { year: year});
    }
    
    var stats = compileStats(dataForYear[year], ['state']);
    showBarChart(stats, `${stats.total} executions in ${stats.keys.length} states in ${year}`, canvas[0], 20);
  }
}

$(function() {

  if(executionData.length > 0) {
    showTotalExecuted(executionData);
    showLastExecuted(executionData);

    var dataForYear = {};
    showExecutionByRacePieCharts(executionData, dataForYear);
    showExecutionsPerStatePerYear(executionData, dataForYear);

    var stats = compileStats(executionData, ['year']);
    showBarChart(stats, '', 'executions-per-year');
  }
});
