var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function (req, res) {
    res.render('map', { title: "Welcome"});
});

router.get('/report',function (req, res) {
    // request({ url: 'http://api.civicapps.org/restaurant-inspections?since=2014-01-01'}, function(err, response, body) {
    request({ url: 'http://api.civicapps.org/restaurant-inspections'}, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            var data = JSON.parse(body);
            var results = data['results'];
            var badscores = [];
            for (i in results) {
                inspection = results[i];
                if (inspection.score < 100 && inspection.score > 0) {
                    badscores.push(inspection);
                }
            }
            console.log(badscores);
            console.log('results:', results.length);
            console.log('results:', badscores.length);
            res.json(badscores);
        }
    });
});

router.get('/inspection/:id',function (req, res) {
    request({ url: 'http://api.civicapps.org/restaurant-inspections/inspection/' + req.params.id}, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            var data = JSON.parse(body);
            var results = data['results'];
            console.log(results);
            res.json(results);
        }
    });
});

module.exports = router;

