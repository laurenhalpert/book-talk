import React, { useEffect, useState } from "react";

function Post({ post, user, book }) {

    const [formData, setFormData] = useState({
        user_id: user.id,
        book_id: book.id,
        post_content: ""
    })

    function handleClick(e){
        if (e.target.id == "likeBtn") {
            console.log('liked')
            // set likes state, patch post, add like column to Post in backend
        }
        console.log('deleted')
        // delete post, set posts 
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <p>{post.post_content}</p>
            <button id="likeBtn" onClick={handleClick} />
            {user.id == post.user_id ? <button id="delBtn" onClick={handleClick} /> : null}
            <label htmlFor="newPost">New Post: </label>
            <input type="textarea" id="newPost" name="newPost" onChange={handleChange} value={formData.post_content}></input>
        </div>
    )
}

export default Post;