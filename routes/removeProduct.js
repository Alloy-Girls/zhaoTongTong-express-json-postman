var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.json());

router.delete('/:id', function(req, res) {

    var url = req.params;
    var urlId = parseInt(url.id);

    removeProduct(urlId, function(err) {
        if(err) {
            res.status(404).send(err);
        }
    });

});

function removeProduct(urlId, callback) {
    fs.readFile('./data.json', 'utf-8', function (err, data) {
        if(err) {
            callback(err);
        }

        if(isExist(urlId)) {

            var jsonData = JSON.parse(data);
            var startIndex = idIndex(urlId);

            jsonData.splice(startIndex, 1);
            fs.writeFile('./data.json', JSON.stringify(jsonData), function(fd){});

            return;
        }

        callback('this ID is not exist');

    });
}

function syncReadFile() {
    var data = fs.readFileSync('./data.json', 'utf-8');
    var jsonData = JSON.parse(data);

    return jsonData;
}

function idIndex(urlId) {

    var jsonData = syncReadFile();

    for(var i = 0; i < jsonData.length; i++){
        if(jsonData[i].id === urlId) {
            return i;
        }
    }
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