// Create web server
// Use express
// Use body-parser
// Use mongoose
// Use cors
// Use path

// Import express
const express = require("express");

// Import body-parser
const bodyParser = require("body-parser");

// Import mongoose
const mongoose = require("mongoose");

// Import cors
const cors = require("cors");

// Import path
const path = require("path");

// Initialize app
const app = express();

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use cors
app.use(cors());

// Use path
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/comments", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create schema
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
});

// Create model
const Comment = mongoose.model("Comment", commentSchema);

// Create route
app.post("/api/comments", (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    comment: req.body.comment,
  });

  comment.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ message: "Data saved" });
    }
  });
});

// Get comments
app.get("/api/comments", (req, res) => {
  Comment.find((err, comments) => {
    if (err) {
      res.send(err);
    } else {
      res.send(comments);
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server started");
});