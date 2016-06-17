var express = require('express');
var models = require('./common');
var file = require('../app');
var fs = require('fs');
var bodyParser = require('body-parser');
var router = express.Router();
const maxIdFileName = './maxId.json';

router.use(bodyParser.json());
router.post('/', function(req, res) {
    var input = req.body;

    addProduct(input, function(httpCode, data){
            res.status(httpCode).send(data);
            return;
    });
});

function addProduct(input, callback) {
    fs.readFile(file.name, 'utf-8', function (err, data) {
        if(err) {
            callback(404, err);
        }
        if(data) {
            var jsonData = JSON.parse(data);
        }else {
            var jsonData = [];
        }

        if(models.type(input)) {
            var newInput = addId(input);
            jsonData.push(newInput);

            fs.writeFile(file.name, JSON.stringify(jsonData), function(err, fd) {
                if(err) {
                    callback(404, err);
                }

                callback(200, 'add succedd');
            });

            return;
        }

        callback(404, "wrong");

    });
}

function getMaxId() {
    var result = fs.existsSync(maxIdFileName);
        if(result) {
            var data = fs.readFileSync(maxIdFileName, 'utf-8');
            var maxId = JSON.parse(data);
        }else {
            var maxId = {"maxId": 0};
            fs.writeFileSync(maxIdFileName, JSON.stringify(maxId));
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

    fs.writeFileSync(maxIdFileName, JSON.stringify({"maxId": maxId}));

    return newInput;
}

module.exports = router;