var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.put('/:id', function(req, res) {

    var input = req.body;
    var url = req.params;
    var urlId = parseInt(url.id);

    updateProduct(input, urlId, function(err) {
        if(err) {
            res.status(404).send(err);
        }
    });
});

function updateProduct(input, urlId, callback) {
    if(isExist(urlId)) {
        fs.readFile('./data.json', 'utf-8', function(err, data) {
            if(err) {
                callback(err);
            }

            var jsonData = newProduct(urlId, input);
            fs.writeFile('./data.json', JSON.stringify(jsonData), function(fd){});

            callback('200');

        });
    }
}

function syncReadFile() {
    var data = fs.readFileSync('./data.json', 'utf-8');
    var jsonData = JSON.parse(data);

    return jsonData;
}

function isRightType(input) {
    if(typeof (input.barcode) === 'string' &&
        typeof (input.name) === 'string' &&
        typeof (input.unit) === 'string' &&
        typeof (input.price) === 'number') {

        return true;
    }

    return false;
}

function newProduct(urlId, input) {

    if(isRightType(input)) {
        var jsonData = syncReadFile();

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
    return;

}

function isExist(urlId) {

    var jsonData = syncReadFile();

    for(var i = 0; i < jsonData.length; i++) {
        if(jsonData[i].id === urlId) {
            return true;
        }
    }

    return false;
}

module.exports = router;