var fs = require('fs');
var file = require('../app');

exports.isExist = function isExist(id) {

    var data = fs.readFileSync(file.name, 'utf-8');
    var jsonData = JSON.parse(data);

    for(var i = 0; i < jsonData.length; i++) {
        if(jsonData[i].id === id) {
            return true;
        }
    }

    return false;
}

exports.type = function isRightType(input) {
    if(typeof (input.barcode) === 'string' &&
        typeof (input.name) === 'string' &&
        typeof (input.unit) === 'string' &&
        typeof (input.price) === 'number') {

        return true;
    }

    return false;
}
