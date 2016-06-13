var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/:id', function(req, res) {
    var url = req.params;
    var id = parseInt(url.id);

    fs.readFile('./data.json', 'utf8', function(err, data) {
        if(err) {
            console.error(err);
            return;
        }
        var jsonObj = JSON.parse(data);

        jsonObj.forEach(function(element) {
            if(element.id === id) {
                res.json(element);
            }
        });

    });
});

module.exports = router;