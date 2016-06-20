var express = require('express');
var app = express();
const FILENAME = './data.json';

app.listen(3000);

var allProducts = require('./routes/getAllProducts');
var oneProduct = require('./routes/getOneProduct');
var addProduct = require('./routes/addProduct');
var removeProduct = require('./routes/removeProduct');
var updateProduct = require('./routes/updateProduct');

app.use('/getAllProducts', allProducts);
app.use('/getOneProduct', oneProduct);
app.use('/addProduct', addProduct);
app.use('/removeProduct', removeProduct);
app.use('/updateProduct', updateProduct);

exports.name = FILENAME;
module.exports = app;



