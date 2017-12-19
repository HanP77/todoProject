var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;


var userDataSchema = new Schema({
  title: {type: String, required: true},
  content: String,
}, {collection: 'UlanBator'});

var UserData = mongoose.model('UlanBator', userDataSchema);
var url = "mongodb://localhost:27017";
var dbName = 'mongol';
var tokenList = [];

var _client = "";
var username= "";
var password= "";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(function(req, res, next) {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});

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

function findUser(usernameToFind) {
 var db = _client.db(dbName);

  db.collection('UlanBator').find({username: usernameToFind}).limit(1).toArray(function(err, docs){
  // console.log(docs);
  console.log(docs[0].username);
  return docs[0].username;
  
    });
  
};


app.post('/login', function (req, res) {
  var body = req.body;

  if (body.username && body.password) {
    var db = _client.db(dbName);
    db.collection('UlanBator').find({username : body.username}).toArray(function(err, docs) {
      console.log(docs);
      if (docs) {
        doc = docs[0];
        // console.log(doc.password, body.password)
        if(doc.password == body.password) {
          tokenList.push(randomToken());

          res.status(200).send({message: 'Valid user', token: tokenList});
          console.log('ok')
        } else {
          res.status(412).send({message: 'Wrong password'});
          }
        } 
      else {
          res.status(404).send({message: 'This username does not exist'}); 
        }
    });
  } else {
    res.status(412).send({message: 'You should provide an username AND a password'});
  }
});


app.post ('/create-account', function (req, res){
//create-account sert à intégrer de nouveaux users
    var Busername = req.body.username;
    var Bpassword = req.body.password;
  // si les parametres ont ete donne
  if (Busername && Bpassword){
    // findUser(Busername);
    console.log(findUser(Busername));
    
    if (findUser(Busername) == Busername){
    // Si le profil existe déjà
      res.status(409).send ('This profile already exist !');
    } else {
      // Si le profil n'existe pas
        var newUser = {
          //On créer un objet qui contient les paramètres
          username: Busername,
          password: Bpassword,
        };
            // mettre le profil sur la bdd
        function profilInBdd (bdd){
          var collection = bdd.collection ('UlanBator');
          collection.insertOne (newUser, function(error, result){
            if (error) console.log ("This profile cannot be stored in the database");
            else console.log ("Profile stored in database")
              res.status(200).send ('Profile created');
          });
        }
        //On appelle la fonction
        var myDb = _client.db(dbName);
        profilInBdd (myDb);
      }
  } else {
  // S'il manque une des deux infos requises
      res.status(404).send ("You should enter a password and an username");
    }
});


// app.post('/notepad', function (req, res) {
// })



app.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
  };
  console.log(item);
  var db = _client.db(dbName);
  db.collection('UlanBator').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      
    });

});

MongoClient.connect(url, function (err, client) {

  if (err) console.log('Erro! ', err);
  else {
    console.log("Connected successfully to server");
    app.listen(3000, function () {
      console.log('Listening on port 3000');
      });
    _client = client;
     }
});
module.exports = router;