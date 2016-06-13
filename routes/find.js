module.exports = function(app) {

    var fs = require('fs');
    var findOne = require('./findOne');
    var insert = require('./insert');
    var remove = require('./remove');
    var update = require('./update');

    app.use('/findOne', findOne);
    app.use('/insert', insert);
    app.use('/remove', remove);
    app.use('/update', update);


    app.get('/', function(req, res) {

        fs.readFile('./data.json', function(err, data) {
            if(err) {
                console.error(err);
                return;
            }
            var jsonObj = JSON.parse(data);
            console.log(data[data.length-1]);
            res.json(jsonObj);

        });
    })
}