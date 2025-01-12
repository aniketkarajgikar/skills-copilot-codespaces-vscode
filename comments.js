// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/comments');

// Get all comments
app.get('/comments', (req, res) => {
  Comment.find().then((comments) => {
    res.json(comments);
  });
});

// Create a new comment
app.post('/comments', (req, res) => {
  const comment = new Comment({
    text: req.body.text
  });
  comment.save().then(() => {
    res.json(comment);
  });
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});