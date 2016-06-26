var express = require('express');
var app = express();

app.listen(3000);

var allProducts = require('./routes/get-all-products');
var oneProduct = require('./routes/get-one-product');
var addProduct = require('./routes/add-product');
var removeProduct = require('./routes/remove-product');
var updateProduct = require('./routes/update-product');

app.use('/getAllProducts', allProducts);
app.use('/getOneProduct', oneProduct);
app.use('/addProduct', addProduct);
app.use('/removeProduct', removeProduct);
app.use('/updateProduct', updateProduct);

module.exports = app;



