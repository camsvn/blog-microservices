import React from 'react';

function CommentList ({ comments }) {
   
    const renderedComments = comments.map(comment => {
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