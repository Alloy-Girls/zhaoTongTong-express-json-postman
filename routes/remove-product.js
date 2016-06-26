var express = require('express');
var models = require('./products-handler');
var _ = require('lodash');
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

function removeProduct(id, callback) {
    fs.readFile(models.fileName, 'utf-8', function (err, data) {
        if(err) {
            callback(404, err);
        }

        var jsonData = JSON.parse(data);
        var value = _.find(jsonData, {'id': id});

        if(value) {
            jsonData.splice(_.findIndex(jsonData, {'id': id}), 1);

            fs.writeFile(models.fileName, JSON.stringify(jsonData), function(fd){});
            callback(200, "remove succeed");

            return;
        }

        callback(404, 'this ID is not exist');

    });
}

//function idIndex(urlId) {
//
//    var data = fs.readFileSync(models.fileName, 'utf-8');
//    var jsonData = JSON.parse(data);
//
//    for(var i = 0; i < jsonData.length; i++){
//        if(jsonData[i].id === urlId) {
//            return i;
//        }
//    }
//}

module.exports = router;