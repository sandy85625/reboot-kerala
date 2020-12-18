
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
var count = 0; 
let date = [];
let consumption = [];

// cache the running count

Papa.parse(file, {
    worker: true, // Don't bog down the main thread if its a big file
    step: function(result) {
        // The preprocessed data is given by 'var data'
        var Data = result.data;
        date = Data[0];
        consumption = Data[1];
        return { date: date, consumption: consumption }
    },

    complete: function(results, file) {
        console.log('Parsing complete read', consumption[-1], 'records.'); 
    },
    
});