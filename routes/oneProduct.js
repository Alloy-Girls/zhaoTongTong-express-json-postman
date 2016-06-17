var express = require('express');
var models = require('./common');
var file = require('../app');
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

    if(models.isExist(id)) {
        fs.readFile(file.name, 'utf8', function(err, data) {
            if(err) {
                callback(404, err);
            }

            var jsonData = JSON.parse(data);

            jsonData.forEach(function(element) {
                if(element.id === id) {
                    callback(200, element);
                }
            });
        });
        return;
    }

    callback(404, 'this ID is not exist');

}

module.exports = router;