var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.put('/:id', function(req, res) {

    var input = req.body;

    var url = req.params;
    var id = parseInt(url.id);

    updateInfo(input, id, res);

});

function updateInfo(input, id, res) {

    fs.readFile('./data.json', 'utf8', function(err, data) {
        if(err || !data){
            res.status(404).send("error");
            return;
        }

        var isNotExist = 0;
        var newData = [];
        data = JSON.parse(data);

        data.forEach(function(element) {
            console.log(typeof (element.id));
           if(element.id === id){
                console.log(1);
               isNotExist = 0;

               if(input[0].barcode && input[0].name && input[0].unit && input[0].price) {
                   console.log(1);
                   element.barcode = input[0].barcode;
                   element.name = input[0].name;
                   element.unit = input[0].unit;
                   element.price = input[0].price;
               }
           }
            newData.push(element);
        });
        if(isNotExist) {
            res.status(404).send('this ID is wrong');
            return;
        }


        fs.writeFile('./data.json', JSON.stringify(newData), function(err) {
            if(err) {
                res.status(404).send('error');
                return;
            }

        });

    });

}

module.exports = router;