var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.delete('/:id', function(req, res) {

    var url = req.params;
    var id = parseInt(url.id);
    deleteInfo(id, res);

});

function deleteInfo(id, res) {

    fs.readFile('./data.json', 'utf8', function (err, data) {
        if(err || !data) {
            res.status(404);
            return;
        }

        var newData = [];
        var isNotExist = 1;

        data = JSON.parse(data);
        data.forEach(function(element) {
            if(element.id === id) {
                isNotExist = 0;
            }else {
                newData.push(element);
                return;
            }
        });

        if(isNotExist) {
            res.status(404).send('this ID is wrong');
            return;
        }

        fs.writeFile('./data.json', JSON.stringify(newData), function(err) {
            if(err) {
                res.status(404);
                return;
            }

            res.status(204).send('success');

        });
    });
}

module.exports = router;