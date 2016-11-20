$(function(){
  
  
  var tableBody = $("#number-dr-inmates-by-state");
  if(tableBody.length > 0) {
  	for(var i=0; i<stateStats.length; i++) {
  		var row = "<tr><td>" +
  			stateStats[i][0] +
  			"</td><td>" +
  			stateStats[i][1] +
  			"</td><td>" +
  			stateStats[i][2] +
  			"</td></tr>";
  		tableBody.append(row);
  	}
  	
  }
  
  
	var stateInmateGeoChart = $("#state-inmate-geochart");
  if(stateInmateGeoChart.length > 0) {
  
    google.charts.load('current', {'packages':['geochart']});
    google.charts.setOnLoadCallback(drawRegionsMap);
  
    function drawRegionsMap() {
      
      var numDeathRowInmates = stateStats.map(function(values) {
      	return [values[0], values[2]];
      });
      var tableData = [['State', 'People on Death Row']].concat(numDeathRowInmates);
      var data = google.visualization.arrayToDataTable(tableData);
  
      var options = {
        region: 'US',
        displayMode: 'regions',
        resolution: 'provinces',
        colorAxis: { colors: ["white", "black"] }
      };
  
      var chart = new google.visualization.GeoChart(document.getElementById('state-inmate-geochart'));
  
      chart.draw(data, options);
    }
  }
  
	var stateExecutionGeoChart = $("#state-execution-geochart");
  if(stateExecutionGeoChart.length > 0) {
  
    google.charts.load('current', {'packages':['geochart']});
    google.charts.setOnLoadCallback(drawRegionsMap);
  
    function drawRegionsMap() {
      
      var executions = stateStats.map(function(values) {
      	return [values[0], values[1]];
      });
      var tableData = [['State', 'Executions']].concat(executions);
      var data = google.visualization.arrayToDataTable(tableData);
  
      var options = {
        region: 'US',
        displayMode: 'regions',
        resolution: 'provinces',
        colorAxis: { colors: ["white", "black"] }
      };
  
      var chart = new google.visualization.GeoChart(document.getElementById('state-execution-geochart'));
  
      chart.draw(data, options);
    }
  }
});

var stateStats = [["Alabama", 57, 194], ["Alaska", 0, 0], ["Arizona", 37, 126], ["Arkansas", 27, 36], ["California", 13, 741], ["Colorado", 1, 3], ["Connecticut", 1, 0], ["Delaware", 16, 18], ["Florida", 92, 396], ["Georgia", 67, 68], ["Hawaii", 0, 0], ["Idaho", 3, 9], ["Illinois", 12, 0], ["Indiana", 20, 12], ["Iowa", 0, 0], ["Kansas", 0, 10], ["Kentucky", 3, 34], ["Louisiana", 28, 77], ["Maine", 0, 0], ["Maryland", 5, 0], ["Massachusetts", 0, 0], ["Michigan", 0, 0], ["Minnesota", 0, 0], ["Mississippi", 21, 48], ["Missouri", 87, 26], ["Montana", 3, 2], ["Nebraska", 3, 10], ["Nevada", 12, 80], ["New Hampshire", 0, 1], ["New Jersey", 0, 0], ["New Mexico", 1, 2], ["New York", 0, 0], ["North Carolina", 43, 155], ["North Dakota", 0, 0], ["Ohio", 53, 142], ["Oklahoma", 112, 47], ["Oregon", 2, 34], ["Pennsylvania", 3, 175], ["Rhode Island", 0, 0], ["South Carolina", 43, 43], ["South Dakota", 3, 3], ["Tennessee", 6, 69], ["Texas", 538, 254], ["Utah", 7, 9], ["Vermont", 0, 0], ["Virginia", 111, 7], ["Washington", 5, 9], ["West Virginia", 0, 0], ["Wisconsin", 0, 0], ["Wyoming", 1, 2], ["D.C.", 0, 0], ["U. S. Federal Gov't", 3, 62], ["U.S. Military", 0, 6], ["Guam", 0, 0], ["Northern Mariana Islands", 0, 0], ["Puerto Rico", 0, 0], ["U.S. Virigin Islands", 0, 0]];

// var stateStats = [
// 		["Alabama",194,57],
// 		["Arizona",126,37],
// 		["Arkansas",36,27],
// 		["California",741,13],
// 		["Colorado",3,1],
// 		["Connecticut",0,1],
// 		["Delaware",18,16],
// 		["Florida",396,92],
// 		["Georgia",68,67],
// 		["Idaho",9,3],
// 		["Illinois",0,12],
// 		["Indiana",12,20],
// 		["Kansas",10,0],
// 		["Kentucky",34,3],
// 		["Louisiana",77,28],
// 		["Maryland",0,5],
// 		["Mississippi",48,21],
// 		["Missouri",26,87],
// 		["Montana",2,3],
// 		["North Carolina",155,0],
// 		["Nebraska",10,3],
// 		["Nevada",80,12],
// 		["New Hampshire",1,0],
// 		["New Mexico",2,1],
// 		["North Carolina",0,43],
// 		["Ohio",142,53],
// 		["Oklahoma",47,112],
// 		["Oregon",34,2],
// 		["Pennsylvania",175,3],
// 		["South Carolina",43,43],
// 		["South Dakota",3,3],
// 		["Tennessee",69,6],
// 		["Texas",254,538],
// 		["Utah",9,7],
// 		["Virginia",7,111],
// 		["Washington",9,5],
// 		["Wyoming",2,1],
// 		["U. S. Federal Gov't",62,3],
// 		["U.S. Military",6,0]
//   ];