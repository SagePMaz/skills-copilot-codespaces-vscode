// create web server
var express = require('express');
var app = express();

// allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// get comments
app.get('/comments', function (req, res) {
  var comments = [
    {name: 'John', content: 'This is a comment'},
    {name: 'Bob', content: 'This is another comment'},
  ];
  res.send(comments);
});

// start web server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```
This code creates a web server that listens on port 3000 and serves comments at the /comments endpoint. The comments are hard-coded in this example, but in a real application, you would fetch them from a database or another service. You can run this code by saving it to a file called comments.js and running node comments.js in your terminal. You should see the following output:
```
//Example app listening on port 3000!
```
Now that you have a server running, you can use the fetch API to get the comments from the server and render them to the page.

### Fetching Data with AJAX
The Fetch API is a modern interface that allows you to make HTTP requests to servers from web browsers. It is a replacement for the older XMLHttpRequest object. The Fetch API is built into the global window object, so you can access it from anywhere in your code. Here's an example of how you can use the Fetch API to get the comments from the server you created in the previous step:
```
// Path: index.html
// Path: app.js
// get comments
fetch('http://localhost:3000/comments')
  .then(function(response) {
    return response.json();
  })
  .then(function(comments) {
    console.log(comments);
  });
```
This code uses the fetch function to make a GET request to the server at http://localhost:3000/comments. It then uses the .then method to parse the response as JSON and log the comments to the console. You can run this code by saving it to a file called app.js and including it in your HTML file with a <script> tag. When you open your HTML file in a web browser, you should see the comments logged to the console.

### Rendering Data with React
Now that you have the comments from the server,
```