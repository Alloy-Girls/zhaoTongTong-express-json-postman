var express = require('express');
var file = require('../app');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {
    getAllProducts(function (httpCode, data) {

        res.status(httpCode).send(data);
        return;
    });
});

function getAllProducts(callback) {
    fs.readFile(file.name, function(err, data) {
        if(err) {
            callback(404, err);
        }

        if(isNotEmpty(data)) {
            var jsonData = JSON.parse(data);
            callback(200, jsonData);
            return;
        }

        callback(404, 'fail to read allProducts');
    });
}

function isNotEmpty() {

    var data = fs.readFileSync(file.name, 'utf-8');
    var jsonData = JSON.parse(data);

    if(jsonData.length === 0) {
        return false;
    }

    return true;
}

module.exports = router;