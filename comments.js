// create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('node_modules'));

// create connection to database
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "comments"
});

// connect to database
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// create table in database
con.query("CREATE TABLE IF NOT EXISTS comments (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), comment VARCHAR(255))", function (err, result) {
  if (err) throw err;
  console.log("Table created");
});

// get comments from database
app.get('/comments', function (req, res) {
  con.query("SELECT * FROM comments", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

// post comments to database
app.post('/comments', function (req, res) {
  var name = req.body.name;
  var comment = req.body.comment;
  con.query("INSERT INTO comments (name, comment) VALUES (?, ?)", [name, comment], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// delete comments from database
app.delete('/comments/:id', function (req, res) {
  var id = req.params.id;
  con.query("DELETE FROM comments WHERE id = ?", [id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// start listening on port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
// Path: public/index.html
