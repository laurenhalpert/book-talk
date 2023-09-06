import React, { useEffect, useState } from "react";

function NewPostForm({ user, book, onAddPost, posts }) {
    const [formData, setFormData] = useState({
        user_id: user.id,
        book_id: book.id,
        likes: 0,
        post_content: ""
    })
    
    const handleChange = e => {
        console.log(e.target.name)
        setFormData({
            ...formData,
            post_content: e.target.value,
            likes: 0
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
        .then (newPost => {
            onAddPost([...posts, newPost]);
            setFormData({
                ...formData,
                post_content: ""
            })
        })

        // .then set posts to add in new post

    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="newPost">New Post: </label>
                <textarea id="newPost" name="newPost" placeholder="Thoughts..." onChange={handleChange} value={formData.post_content}></textarea>
                <button id="submitBtn" type="submit" >Post</button>
            </form>
        </div>
    )
}

export default NewPostForm