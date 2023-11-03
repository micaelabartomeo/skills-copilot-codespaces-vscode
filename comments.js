// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create data store
const posts = {};

// Create event handler for post created
const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};

// Fetch all posts
app.get('/posts', (req, res) => {
  res.send(posts);
});

// Handle event
app.post('/events', (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);

  res.send({});
});

// Start server
app.listen(4002, async () => {
  console.log('Listening on 4002');

  // Fetch all events from event bus
  const res = await axios.get('http://event-bus-srv:4005/events');

  // Replay events from event bus
  for (let event of res.data) {
    console.log('Processing event:', event.type);

    handleEvent(event.type, event.data);
  }
});