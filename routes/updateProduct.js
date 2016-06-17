var express = require('express');
var models = require('./common');
var file = require('../app');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.put('/:id', function(req, res) {
    var input = req.body;
    var url = req.params;
    var urlId = parseInt(url.id);

    updateProduct(input, urlId, function(httpCode, data) {
        res.status(httpCode).send(data);
        return;
    });
});

function updateProduct(input, urlId, callback) {
    if(models.isExist(urlId)) {
        fs.readFile(file.name, 'utf-8', function(err, data) {
            if(err) {
                callback(404, err);
            }

            var jsonData = getNewProduct(urlId, input);
            fs.writeFile(file.name, JSON.stringify(jsonData), function(fd){});

            callback(200, 'updata succedd');

        });
        return;
    }

    callback(404, err);
}

function getNewProduct(urlId, input) {

    if(models.type(input)) {

        var data = fs.readFileSync(file.name, 'utf-8');
        var jsonData = JSON.parse(data);

        for(var i = 0; i < jsonData.length; i++){
            if(jsonData[i].id === urlId) {
                jsonData[i].barcode = input.barcode;
                jsonData[i].name = input.name;
                jsonData[i].unit = input.unit;
                jsonData[i].price = input.price;
            }
        }

        return jsonData;
    }
}

module.exports = router;