import React, { useEffect, useState } from "react";
import Post from "./Post";
import Header from "./Header";
import MyNavBar from "./MyNavBar";
import NewPostForm from "./NewPostForm";

function ThisBook({ book, user, onLogOut }) {
    const [posts, setPosts] =useState([])
    
    useEffect(()=>{
        fetch(`/book_index/${book.id}`)
        .then(r=>r.json())
        .then(posts => {
          setPosts(posts)
          
        })
      }, [])
  

    function handleLike(updatedPost) {
        
        setPosts((posts)=>posts.map(post => post.id === updatedPost.id? updatedPost: post))

    }
    function handleDelete(id){
        const updatedPostsArray = posts.filter(post=> post.id !== id)
        setPosts(updatedPostsArray)
    }
    return(
        <div className="bookMoreInfo">
            <Header />
            <MyNavBar onLogOut={onLogOut} />
            <div className="bookInfo">
                <img className="bookCover" src={book.book_image} alt="book cover"></img>
                <h2>{book.title}</h2>
                <h3>{book.author_first_name} {book.author_last_name}</h3>
                <h4>{book.genre}</h4>
                <p>{book.description}</p>
            </div>
            <div>
                <h2 className="postsHeader">What people are saying...</h2>
                
                {posts? posts.map(post => <Post key={post.id} post={post} user={user} book={book} onLike={handleLike} onDelete={handleDelete} />): alert('No posts here') }
                <br></br>
                <NewPostForm user={user} book={book} onAddPost={setPosts} />
            </div>
            

        </div>
    )
}

export default ThisBook;