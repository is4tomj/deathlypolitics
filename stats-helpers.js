"use strict";

function compileStats(data, keys) {
  var res = { keys: [], data: {}, dataArray: [], total: 0, min: 0, max: 0 };

  for(var i=0; i<data.length; i++) {
    var record = data[i];
    var keyValueArray = [];
    for(var j=0; j<keys.length; j++) {
      var key = keys[j];
      keyValueArray.push(record[key]);
    }

    var combinationKey = keyValueArray.join("_");
    if(res.keys.indexOf(combinationKey) < 0) {
      res.keys.push(combinationKey);
      res.data[combinationKey] = 0;
    }
    res.data[combinationKey] += 1;
  }

  res.keys = res.keys.sort();

  for(var i=0; i<res.keys.length; i++) {
    var key = res.keys[i];
    var value = res.data[key];
    res.dataArray.push(value);
    res.total += value;

    if(res.min > value) {
      res.min = value;
    }
    if(res.max < value) {
      res.max = value;
    }
  }

  return res;
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