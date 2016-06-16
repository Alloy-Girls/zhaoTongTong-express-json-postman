var express = require('express');
var app = express();

app.listen(3000);

var allProducts = require('./routes/allProducts');
var oneProduct = require('./routes/oneProduct');
var addProduct = require('./routes/addProduct');
var removeProduct = require('./routes/removeProduct');
var updateProduct = require('./routes/updateProduct');

app.use('/allProducts', allProducts);
app.use('/oneProduct', oneProduct);
app.use('/addProduct', addProduct);
app.use('/removeProduct', removeProduct);
app.use('/updateProduct', updateProduct);

module.exports = app;



