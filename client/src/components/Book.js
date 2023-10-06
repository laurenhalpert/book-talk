import React from "react";
import { useHistory } from "react-router-dom";

import { useSelector } from 'react-redux';

function Book({ book, myBooks, onAdd, onPostsClick }) {
    const history = useHistory();
    
    const user=useSelector(state => state.user)
    function handleClick(e) {
        
        let myBook = myBooks.filter(item => item.title === book.title)[0]

       
        if (e.target.id === 'addBookBtn'&& book !== myBook ){

            const myBookObj ={
                book_id: book.id,
                user_id: user.id
            }
            

            fetch("/my_book_index", {
                method: "POST",
                headers: {
                    
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(myBookObj),
            } ) 
            .then(r=>r.json())
            .then(myBookObj => {
                alert("This book has been successfully added to your books.")
                onAdd(myBookObj)
                
            })
        }
        else if (book === myBook && e.target.id !== "postsBtn") {
            alert("This book has already been added to your books.")
        }
        
        else {
            history.push(`/book_index/${book.id}`)
            onPostsClick({
                id: book.id,
                title: book.title,
                author_first_name: book.author_first_name,
                author_last_name: book.author_last_name,
                genre: book.genre,
                book_image: book.book_image,
                description: book.description
            })
        }
        

        
    }
    
    return (
        <div className="book">
            <img className="bookCover" src={book.book_image} alt="book cover"></img>
            <h2>{book.title}</h2>
            <h3>By: {book.author_first_name} {book.author_last_name}</h3>
            <button id="addBookBtn" onClick={handleClick}>Add to My Books</button>
            <button id="postsBtn" onClick={handleClick}>View Posts</button>
        </div>
    )
}

export default Book

