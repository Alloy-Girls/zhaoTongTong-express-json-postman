var fs = require('fs');
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var express = require('express');
var app = express();
app.listen(3000);
//
var routes = require('./routes/find');
routes(app);

//fs.readFile('./data.json', function(err, data) {
//    if(err) {
//        console.error(err);
//        return;
//    }
//    var jsonObj = JSON.parse(data);
//    //console.log(jsonObj[0]);
//    var x;
//    for(x in jsonObj) {
//        //console.log(jsonObj[x]);
//        //fs.writeFile('./data.json', {"id":x}, function(err) {
//        //    if(err) {}
//        //    console.error(err);
//        //});
//      console.log(jsonObj[x]);
//    }
//});


module.exports = app;



