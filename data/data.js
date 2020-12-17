
// Parsing data from Data.csv for preprocess of chartjs using papaparse

/* 
In this file, we will try to do the preprocessing of 
data for machine learning. After predicting the values,
we will parse them to the website using jQuery
*/

const fs = require('fs');
const Papa = require('papaparse');
const Chartist = require('chartist');
const file = fs.createReadStream('data.csv');
var count = 0; // cache the running count

Papa.parse(file, {
    worker: true, // Don't bog down the main thread if its a big file
    step: function(result) {

        // The preprocessed data is given by 'var data'
        var Data = result.data;
        var Date = Data[0];
        var Consumption = Data[1];
        
    },

    complete: function(results, file) {
        console.log('parsing complete read', count, 'records.'); 
    }
});

var chart = new Chartist.Line('.ct-chart', {
    labels: [1, 2, 3, 4, 5],
    series: [
      [1, 5, 10, 0, 1],
      [10, 15, 0, 1, 2]
    ]
  }, {
    // Remove this configuration to see that chart rendered with cardinal spline interpolation
    // Sometimes, on large jumps in data values, it's better to use simple smoothing.
    lineSmooth: Chartist.Interpolation.simple({
      divisor: 2
    }),
    fullWidth: true,
    chartPadding: {
      right: 20
    },
    low: 0
  });