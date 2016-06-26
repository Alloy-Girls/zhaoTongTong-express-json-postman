var express = require('express');
var models = require('./products-handler');
var _ = require('lodash');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {

    getAllProducts(function (httpCode, data) {
        res.status(httpCode).send(data);
        return;
    });
});

function getAllProducts(callback) {
    fs.readFile(models.fileName, function(err, data) {
        if(err) {
            callback(404, err);
        }

        if( !_.isEmpty(data)) {
            var jsonData = JSON.parse(data);
            callback(200, jsonData);
            return;
        }

        callback(404, 'fail to read allProducts');
    });
}

module.exports = router;