import React, { useEffect, useState } from "react";
import Post from "./Post";

function ThisBook({ book, setPosts, posts, user }) {
    useEffect(()=>{
        fetch(`/book_index/%{book.id}`)
        .then(r=>r.json())
        .then(posts => {
          setPosts(posts)
          
        })
      }, [])
    return(
        <div>
            <div>
                <img className="bookCover" src={book.book_image} alt="book cover"></img>
                <h2>{book.title}</h2>
                <h3>{book.author_first_name} {book.author_last_name}</h3>
                <h4>{book.genre}</h4>
                <p>{book.description}</p>
            </div>
            <div>
                <h2>What people are saying...</h2>
                {posts.map(post => <Post key={post.id} post={post} user={user} book={book} />)}
            </div>
            

        </div>
    )
}

export default ThisBook;