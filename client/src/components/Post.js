import React from "react";

function Post({ post, user, book, onLike, onDelete }) {

    

    function handleClick(e){
      
        
        if (e.target.id === "likeBtn") {
            
            fetch(`/book_index/${book.id}/${post.id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({likes: post.likes +1})
            })
            .then(r=>r.json())
            .then(updatedPost => onLike(updatedPost))


            
            
        }
        else {
            console.log('deleted')
            fetch(`/book_index/${book.id}/${post.id}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            .then(() => onDelete(post.id))
        }
        
    }

  
    return (
        <div className="post">
            <p>{post.post_content}</p>
            <button id="likeBtn" onClick={handleClick}>{post.likes} Like</button>
            {user.id === post.user_id ? <button id="delBtn" onClick={handleClick}>Delete</button> : null}
        </div>
    )
}

export default Post;