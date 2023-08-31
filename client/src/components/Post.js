import React, { useEffect, useState } from "react";

function Post({ post, user, book }) {

    const [formData, setFormData] = useState({
        user_id: user.id,
        book_id: book.id,
        post_content: ""
    })

    function handleClick(e){
        if (e.target.id === "likeBtn") {
            console.log('liked')
            // set likes state, patch post, add like column to Post in backend
        }
        console.log('deleted')
        // delete post, set posts 
    }

    const handleChange = e => {
        console.log(e.target.name)
        setFormData({
            ...formData,
            post_content: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/book_index/${book.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then (r => r.json())
        .then (newPost => console.log(newPost))

    }

    return (
        <div>
            <p>{post.post_content}</p>
            <button id="likeBtn" onClick={handleClick}>Like</button>
            {user.id === post.user_id ? <button id="delBtn" onClick={handleClick} /> : null}
            <br></br>
            <form onSubmit={handleSubmit}>
                <label htmlFor="newPost">New Post: </label>
                <textarea id="newPost" name="newPost" placeholder="Thoughts..." onChange={handleChange} value={formData.post_content}></textarea>
                <button id="submitBtn" type="submit" >Submit</button>
            </form>
        </div>
    )
}

export default Post;