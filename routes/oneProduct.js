var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/:id', function(req, res) {
    var url = req.params;

    fs.readFile('./data.json', 'utf8', function(err, data) {
        if(err) {
            console.error(err);
            return;
        }
        var jsonData = JSON.parse(data);

        jsonData.forEach(function(element) {
            if(element.id === parseInt(url.id)) {
                res.json(element);
            }
        });
    });
});

module.exports = router;