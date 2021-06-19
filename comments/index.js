const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

comments4Posts = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(comments4Posts[req.params.id] || []);
})

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    
    const comments = comments4Posts[req.params.id] || [];

    comments.push({id: commentId, content});

    comments4Posts[req.params.id] = comments;

    res.status(201).send([comments[comments.length-1]]);
});

app.listen(4001, () => {
    console.log('Listening on port 4001');
})