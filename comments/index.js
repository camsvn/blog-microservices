const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

comments4Posts = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(comments4Posts[req.params.id] || []);
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    
    const comments = comments4Posts[req.params.id] || [];

    comments.push({id: commentId, content});

    comments4Posts[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {...comments[comments.length-1], postId: req.params.id}
    })

    res.status(201).send([comments[comments.length-1]]);
});

app.post('/events', (req, res) => {
    console.log('Event Received: ',req.body.type);

    res.send({});
});

app.listen(4001, () => {
    console.log('Listening on port 4001');
})