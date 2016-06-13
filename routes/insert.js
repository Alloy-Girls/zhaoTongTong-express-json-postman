var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var router = express.Router();
var maxId = 0;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/', function(req, res) {
    var input = req.body;
    var newInput = addId(input);
    insertInfo(newInput, res);
});

function addId(input) {
    var i = 0, j = 0;
    var idChange = 0;
    var data = fs.readFileSync('./data.json', 'utf-8');

    if(data) {
        data = JSON.parse(data);
        j += data[data.length-1].id;
        if(j > maxId) {
            maxId = j;
        }
    }
    idChange = maxId;

    for(i; i < input.length; i++, idChange++) {
        input[i].id = idChange+1;
    }
    maxId = idChange;

    return input;
}

function insertInfo(newInput, res) {
    fs.readFile('./data.json', 'utf8', function(err, data) {
       if(err) {
           res.status(404);
           throw err;
       }
        if(data) {
            data = JSON.parse(data);

        }else {
            data = [];
        }

        newInput.forEach(function (element) {
            data.push(element);
        })

        fs.writeFile('./data.json', JSON.stringify(data), function(err) {
            if(err) {
                res.status(404);
                return;
            }
            res.status(200);
        });
    });
}

module.exports = router;