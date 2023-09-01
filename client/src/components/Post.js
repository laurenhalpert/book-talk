import React, { useEffect, useState } from "react";

function Post({ post, user, book, onLike }) {

    

    function handleClick(e){
        let updatedPost = {
            ...post,
            likes: post.likes + 1
        }
        console.log(updatedPost)
        if (e.target.id === "likeBtn") {
            console.log('liked')
            fetch(`/book_index/${book.id}/${post.id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({likes: 20})
            })
            .then(r=>r.json())
            .then(post => console.log(post))


            onLike(book)
            // set likes state, patch post, add like column to Post in backend
        }
        else {
            console.log('deleted')
        }
        // delete post, set posts 
    }

  
    return (
        <div>
            <p>{post.post_content}</p>
            <button id="likeBtn" onClick={handleClick}>{post.likes} Like</button>
            {user.id === post.user_id ? <button id="delBtn" onClick={handleClick}>Delete</button> : null}
            
        </div>
    )
}

export default Post;