var fs = require('fs');
const FILENAME = './data.json';
const maxIdFileName = './max-id.json';

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

exports.addId = function addId(input) {
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

exports.getNewProduct = function getNewProduct(jsonData, input, flag) {

    jsonData[flag].name = input.name;
    jsonData[flag].unit = input.unit;
    jsonData[flag].price = input.price;
    jsonData[flag].barcode = input.barcode;

    return jsonData;
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
exports.fileName = FILENAME;