import React, { useEffect } from "react";
import Post from "./Post";
import Header from "./Header";
import MyNavBar from "./MyNavBar";
import NewPostForm from "./NewPostForm";

import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions";

function MyThisBook({ onLogOut, onRemove }) {
    // const [posts, setPosts] =useState([])
    const dispatch = useDispatch()
    const user=useSelector(state => state.user)
    const book = useSelector(state=>state.myThisBook)
    const posts = useSelector(state => state.posts)
    useEffect(()=>{
        fetch(`/book_index/${book.id}`)
        .then(r=>r.json())
        .then(posts => {
          dispatch(getPosts(posts))
          
        })
      }, [])
    

    function handleClick(e) {
      
    

       
        
        fetch(`/my_book_index/${book.id}`, {
            method: "DELETE",
            headers: {
                
                "Content-Type": "application/json",
            }
        } ) 
        
        .then(() => onRemove(book.id))
    }

    function handleLike(updatedPost) {
        
        dispatch(getPosts((posts)=>posts.map(post => post.id === updatedPost.id? updatedPost: post)))

    }
    function handleDelete(id){
        const updatedPostsArray = posts.filter(post=> post.id !== id)
        dispatch(getPosts(updatedPostsArray))
    }
    function handleAddPost(posts) {
        dispatchEvent(getPosts(posts))
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
            <button id="removeBtn" onClick={handleClick}>Remove from My Books</button>
            <div>
                <h2>What people are saying...</h2>
                
                {posts? posts.map(post => <Post key={post.id} post={post} user={user} book={book} onLike={handleLike} onDelete={handleDelete} />): console.log('no posts here') }
                <br></br>
                <NewPostForm user={user} book={book} onAddPost={handleAddPost} />
            </div>
            

        </div>
    )
}

export default MyThisBook;