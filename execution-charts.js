"use strict";

function showTotalExecuted(data) {
  var space = $("#total-executed-in-us");
  if(space.length > 0) {
    space.text(data.length);
  }
}

function showLastExecuted(data) {
  var lastExecuted = data[0];
  for(var i=1; i<data.length; i++) {
    if(data[i].date > lastExecuted.date) {
      lastExecuted = data[i];
    } 
  }

  var space = $("#last-executed");
  if(space.length > 0) {
    space.text("name:" + lastExecuted.name);
  }
}

$(function() {

  if(executionData.length > 0) {
    showTotalExecuted(executionData);
    showLastExecuted(executionData);
  }


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
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
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
