import React, { useEffect, useState } from "react";
import Post from "./Post";
import Header from "./Header";
import MyNavBar from "./MyNavBar";
import NewPostForm from "./NewPostForm";

function ThisBook({ book, setPosts, posts, user, onLogOut }) {
    useEffect(()=>{
        fetch(`/book_index/${book.id}`)
        .then(r=>r.json())
        .then(posts => {
          setPosts(posts)
          
        })
      }, [])
    console.log(book)
    return(
        <div>
            <Header />
            <MyNavBar onLogOut={onLogOut} user={user} />
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
                <NewPostForm user={user} book={book} />
            </div>
            

        </div>
    )
}

export default ThisBook;