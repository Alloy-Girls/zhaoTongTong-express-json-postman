var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {
    fs.readFile('./data.json', function(err, data) {
        if(err) {
            res.status(404).send(err);
            return;
        }

        var jsonObj = JSON.parse(data);

        res.status(404).json(jsonObj);

    });
});

module.exports = router;