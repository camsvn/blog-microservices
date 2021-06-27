const express = require('express');
const cors = require('cors');
const { Console } = require('console');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    switch (type) {
        case 'PostCreated': 
            onPostCreate(data);
            break;
        case 'CommentCreated':
            onCommentCreate(data);
            break;
    }

    console.log(posts);
    res.send({});
});

const onPostCreate = (data) => {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
};

const onCommentCreate = (data) => {
    const { id, content, postId } = data;

    const post = posts[postId];
    post?.comments.push({ id, content });
};

app.listen(4002, () => {
    console.log('Listening on 4002');
})