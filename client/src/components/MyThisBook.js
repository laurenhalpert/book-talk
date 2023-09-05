import React, { useEffect, useState } from "react";
import Post from "./Post";
import Header from "./Header";
import MyNavBar from "./MyNavBar";
import NewPostForm from "./NewPostForm";

function MyThisBook({ book, user, onLogOut, onRemove }) {
    const [posts, setPosts] =useState([])
    
    useEffect(()=>{
        fetch(`/book_index/${book.id}`)
        .then(r=>r.json())
        .then(posts => {
          setPosts(posts)
          
        })
      }, [])
    console.log(book)

    function handleClick(e) {
        console.log('clicked')
        console.log(e.target.id)
        console.log(book)
        console.log(user)
    

        const myBookObj ={
            book_id: book.id,
            user_id: user.id
        }
        console.log(myBookObj)
        console.log(book.id)
        fetch(`/my_book_index/${book.id}`, {
            method: "DELETE",
            headers: {
                
                "Content-Type": "application/json",
            }
        } ) 
        
        .then(() => onRemove(book.id))
    }

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
            <button id="removeBtn" onClick={handleClick}>Remove from My Books</button>
            <div>
                <h2>What people are saying...</h2>
                {console.log(posts)}
                {posts? posts.map(post => <Post key={post.id} post={post} user={user} book={book} onLike={handleLike} onDelete={handleDelete} />): console.log('no posts here') }
                <NewPostForm user={user} book={book} onAddPost={setPosts} posts={posts}/>
            </div>
            

        </div>
    )
}

export default MyThisBook;