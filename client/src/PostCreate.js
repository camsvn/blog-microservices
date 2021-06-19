import React, { useState } from 'react';
import axios from 'axios';

function PostCreate () {
    const [title, setTitle] = useState('');

    const submitPost = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/posts', {
            title
        });

        setTitle('');
    };

    return (
        <div>
            <form onSubmit={submitPost}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary my-3">Submit</button>
            </form>
        </div>
    )
}

export default PostCreate;