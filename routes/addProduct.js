var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());

router.post('/', function(req, res) {

    var input = req.body;

    addProduct(input, function(err){
        if(err) {
            res.status(404).send(err);
            return;
        }
    });
});

function addProduct(input, callback) {
    fs.readFile('./data.json', 'utf-8', function (err, data) {
        if(err) {
            callback(err);
        }
        if(data) {
            var jsonData = JSON.parse(data);
        }else {
            var jsonData = [];
        }

        if(isRightType(input)) {
            var newInput = addId(input);
            jsonData.push(newInput);
        }else {
            return;
        }

        fs.writeFile('./data.json', JSON.stringify(jsonData), function(err, fd) {
            if(err) {
                callback(err);
            }

            callback('200');
        });

    });
}

function getMaxId() {
    var result = fs.existsSync('./maxId.json');
        if(result) {
            var data = fs.readFileSync('./maxId.json', 'utf-8');
            var maxId = JSON.parse(data);
        }else {
            var maxId = {"maxId": 0};
            fs.writeFileSync('./maxId.json', JSON.stringify(maxId));
        }

        return maxId.maxId;
}

function addId(input) {
    var newInput = {};
    var maxId = getMaxId();
    maxId += 1;

    newInput.id = maxId;
    newInput.barcode = input.barcode;
    newInput.name = input.name;
    newInput.unit = input.unit;
    newInput.price = input.price;

    fs.writeFileSync('./maxId.json', JSON.stringify({"maxId": maxId}));

    return newInput;
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

module.exports = router;