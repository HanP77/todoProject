/* infos
https://docs.mongodb.com/manual/reference/method/ObjectId.getTimestamp/
*/

var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = "mongodb://localhost:27017";
const nameDb = 'mongol';
const namecolUsers = 'UlanBator';
const nameColNotes = 'notes';
var _client = "";
var username= "";
var password= "";
var ourUserId ="";
var tokenList = [];

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
  var db = _client.db(nameDb);

    return db.collection(namecolUsers).find({username: usernameToFind}).limit(1).toArray(function(err, docs){
      // console.log(docs);
      console.log(docs[0].username);
  
    return docs[0].username;
  });
  return 'Bonjour';
};

function getDate(){
  var todayDate = new Date();
  // jour
  var day = todayDate.toLocaleDateString();
  var dayList = day.split ('/');
  if (dayList[0] <10) dayList[0] = '0'+ dayList[0];
  if (dayList[1] <10) dayList[1] = '0'+ dayList[1];
  dayList.reverse();
  day = dayList.join ('-');
  var hour = todayDate.toLocaleTimeString();
  var hourList = hour.split (':');
  hour = hourList.join ('-');
  var today = day +'-'+ hour;
  return today;
}

app.post('/login', function (req, res) {
  var body = req.body;
  if (body.username && body.password) {
    var db = _client.db(nameDb);
    db.collection(namecolUsers).find({username : body.username}).toArray(function(err, docs){
      if (docs.length >0) {
        doc = docs[0];
        if(doc.password == body.password) {
          tokenList.push(randomToken());
          var ourUserId = doc._id.toString();
          console.log ('user id= '+ doc._id);
          var today = doc._id.getTimestamp();
          res.status(200).send({message: 'Valid user', token: tokenList, userId: ourUserId, date: today });
          console.log('ok')
        }
        else res.status(412).send({message: 'Wrong password'});
      } 
      else res.status(404).send({message: 'This username does not exist'}); 
    });
  }
  else res.status(412).send({message: 'You should provide an username AND a password'});
});

app.post ('/create-account', function (req, res){
  console.log ('Try creating a new account');
  var body = req.body;
  if (body.username && body.password){
    console.log ('All datas are given');
    var db = _client.db(nameDb);
    db.collection(namecolUsers).find({username : body.username}).toArray(function(err, docs){
      console.log ('Getting db datas');
      if (docs.length >0){
        console.log ('An older profile with the same name was found');
        doc = docs[0];
        if(doc.password == body.password){
          res.status(409).send ('This profile already exist !');
          console.log ('This profile already exist !');
        }
        else{
          res.status(409).send ('An user already use this name');
          console.log ('An user already use this name');
        }
      }
      else {
        console.log ('Creating the new user');
        var newUser = {
          username: body.username,
          password: body.password,
        };
        var myDb = _client.db(nameDb);
        var collection = myDb.collection (namecolUsers);
        collection.insertOne (newUser, function(error, result){
          if (error){
            console.log ("This profile cannot be stored in the database");
            res.status(404).send ('This profile cannot be stored in the database');
          }
          else{
            console.log ("Profile stored in database");
            res.status(200).send ('Profile created');
          }
        });
      }
    });
  }
  else res.status(404).send ("You should enter a password and an username");
});

app.get ('/notepad/:author', function(req, res){
  /* { author: localStorage.getItem ('author') }
  { author: req.body.author }
  */
  var db = _client.db(nameDb);
  db.collection(nameColNotes).find ({ author: req.params.author }).toArray (function(err, docs){
    console.log (docs.length +' notes for this user');
    if (docs.length >0){
      res.status (200).send ({ message:'Here is the list of notes for this user', notes: docs });
      docs.forEach (function (doc){
        console.log ('title: '+ doc.title);
      });
    }
    else res.status(404).send({message: "This user don't have writen notes yet", notes: docs });
  });
});
app.post ('/notepad/search', function(req, res){
  var keyWord = 'a';
});

app.post ('/notepad/new', function(req, res){
  var today = getDate();
  var myDb = _client.db(nameDb);
  var myCollection = myDb.collection (nameColNotes);
  if (req.body.noteId){
	  var idd = new objectId (req.body.noteId);
	  console.log('id= '+ idd);
    var noteId = { _id: idd };
    if (req.body.title){
      myCollection.updateOne (noteId, { $set: { title: req.body.title }}, function (error){
        if (error) console.log ('The title was not updated');
        else console.log ('The title was successfully updated');
      });
    }
    if (req.body.content){
      myCollection.updateOne (noteId, { $set: { content: req.body.content }}, function (error){
        if (error) console.log ('The content was not updated');
        else console.log ('The content was successfully updated');
      });
    }
    if (req.body.title && req.body.content){
      var today = getDate();
      myCollection.updateOne (noteId, { $set: { dateUpdate: today }}, function (error){
        if (error){
          console.log ('The date was not updated');
          res.status(404).send ('The note was not updated');
        }
        else{
          console.log ('The date was successfully updated');
          res.status(200).send ('The note was successfully updated');
        }
      });
    }
  }
  else{
    var newNote = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      dateCreation: today,
      dateUpdate: today
    };
    myCollection.insertOne (newNote, function (error, result){
      if (error){
        console.log ('This note was not stored in the database');
        res.status(404).send ('This note was not stored in the database');
      }
      else{
        console.log ('This note was successfully stored in the database');
        res.status(200).send ('This note was successfully stored in the database');
      }
    });
  }
});
app.post ('/notepad/delete', function(req, res){
  console.log('paquet reçu');
  var myDb = _client.db(nameDb);
  var myCollection = myDb.collection (nameColNotes);
  var idd = new objectId(req.body.noteId);
  console.log(idd);
  myCollection.deleteOne ({ "_id":  idd }, function (error){
    if (error){
      console.log ('This note was not erased from the database');
      res.status(404).send ('This note was not erased from the database');
    }
    else{
      console.log ('This note was successfully erased from the database');
      res.status(200).send ('This note was successfully erased from the database');
    }
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