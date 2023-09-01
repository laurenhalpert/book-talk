import React, { useEffect, useState } from "react";

function Post({ post, user, book }) {

    

    function handleClick(e){
        if (e.target.id === "likeBtn") {
            console.log('liked')
            // set likes state, patch post, add like column to Post in backend
        }
        console.log('deleted')
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