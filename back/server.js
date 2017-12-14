var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var dbName = 'mongol';
var tokenList = [];
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

function randomToken() {
  var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = 0; i < 32; i++) {
    result += string[Math.floor(Math.random() * (string.length - 1))];
  }
  return result;
}

function tokenCheck(token) {
  var result = tokenList.find(function (element) {
    return element == token;
  });
  return result;
}

function findUser(name) {
	var db = client.db('mongol');
  	var result = db.collection('ulan').find().toArray(function(err, ulan){
    return result.name == username;
  });
  return result;
}

app.listen(1407, function () {
  console.log('The server is running on port 1407...');
});