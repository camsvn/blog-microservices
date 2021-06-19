import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentList ({ postId }) {
    const [comments, setComments] = useState({});

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)

        setComments(res.data);
    }

    const renderedComments = Object.values(comments).map(comment => {
        return (
            <li key={comment.id}>{comment.content}</li>
        )
    });

    return  <>
        <p>{`${comments.length ? 
            ( comments.length === 1 ? comments.length+' Comment' : comments.length+' Comments' )
            : '0 Comments'}`}
        </p>
        <ul>{renderedComments}</ul>
    </>
}

export default CommentList;