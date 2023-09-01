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
    console.log(book)

    function handleLike(updatedPost) {
        console.log(updatedPost)
        setPosts((posts)=>posts.map(post => post.id === updatedPost.id? updatedPost: post))

    }
    function handleDelete(id){
        const updatedPostsArray = posts.filter(post=> post.id !== id)
        setPosts(updatedPostsArray)
    }
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
                {console.log(posts)}
                {posts? posts.map(post => <Post key={post.id} post={post} user={user} book={book} onLike={handleLike} onDelete={handleDelete} />): console.log('no posts here') }
                <NewPostForm user={user} book={book} onAddPost={setPosts} posts={posts}/>
            </div>
            

        </div>
    )
}

export default ThisBook;