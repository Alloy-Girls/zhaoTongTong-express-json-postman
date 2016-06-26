var express = require('express');
var models = require('./products-handler');
var _ = require('lodash');
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

function updateProduct(input, id, callback) {

    fs.readFile(models.fileName, 'utf-8', function(err, data) {
       if(err) {
           callback(404, err);
       }

        var jsonData = JSON.parse(data);
        var value = _.find(jsonData, {'id': id});

        if(value) {
            var flag = _.findIndex(jsonData, value);
            jsonData = models.getNewProduct(jsonData, input, flag);

            fs.writeFile(models.fileName, JSON.stringify(jsonData), function(fd){});
            callback(200, 'update succeed');

            return;
        }

        callback(404, "update failed");
    });
}

module.exports = router;