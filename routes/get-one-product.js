var express = require('express');
var models = require('./products-handler');
var _ = require('lodash');
var fs = require('fs');
var router = express.Router();

router.get('/:id', function(req, res) {
    var url = req.params;
    var urlId = parseInt(url.id);

    getOneProduct(urlId, function(httpCode, data) {
        res.status(httpCode).send(data);
        return;
    });

});

function getOneProduct(id, callback) {

    fs.readFile(models.fileName, 'utf-8', function(err, data) {
       if(err) {
           callback(404, err);
       }

        var jsonData = JSON.parse(data);
        var value = _.find(jsonData, {"id": id});

        if(value) {
            callback(200, value);
            return;
        }

        callback(404, 'this ID is not exist');
    });
}

module.exports = router;