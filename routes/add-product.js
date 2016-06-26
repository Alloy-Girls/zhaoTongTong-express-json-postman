var express = require('express');
var models = require('./products-handler');
var _ = require('lodash');
var fs = require('fs');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());
router.post('/', function(req, res) {
    var input = req.body;

    addProduct(input, function(httpCode, data){
            res.status(httpCode).send(data);
            return;
    });
});

function addProduct(input, callback) {
    fs.readFile(models.fileName, 'utf-8', function (err, data) {
        if(err) {
            callback(404, err);
        }

        if(_.isEmpty(data)) {
            var jsonData = [];
        }else {
            var jsonData = JSON.parse(data);
        }

        if(models.type(input)) {
            var newInput =models.addId(input);
            jsonData.push(newInput);

            fs.writeFile(models.fileName, JSON.stringify(jsonData), function(fd) {});

            callback(200, 'add succedd');
            return;
        }

        callback(404, "the input type is wrong");

    });
}

module.exports = router;