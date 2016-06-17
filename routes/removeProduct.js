var express = require('express');
var models = require('./common');
var file = require('../app');
var fs = require('fs');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());
router.delete('/:id', function(req, res) {
    var url = req.params;
    var urlId = parseInt(url.id);

    removeProduct(urlId, function(httpCode, data) {
        res.status(httpCode).send(data);
        return;
    });

});

function removeProduct(urlId, callback) {
    fs.readFile(file.name, 'utf-8', function (err, data) {
        if(err) {
            callback(404, err);
        }

        if(models.isExist(urlId)) {

            var jsonData = JSON.parse(data);
            var startIndex = idIndex(urlId);

            jsonData.splice(startIndex, 1);
            fs.writeFile(file.name, JSON.stringify(jsonData), function(fd){});

            callback(200, "remove succedd");

            return;
        }

        callback(404, 'this ID is not exist');

    });
}

function idIndex(urlId) {

    var data = fs.readFileSync(file.name, 'utf-8');
    var jsonData = JSON.parse(data);

    for(var i = 0; i < jsonData.length; i++){
        if(jsonData[i].id === urlId) {
            return i;
        }
    }
}

module.exports = router;