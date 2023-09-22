import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function MyBookCard ({ book, user, onAdd, onPostsClick, onRemove }) {
    const history = useHistory();
    
    
    function handleClick(e) {
        
        if (e.target.id === 'removeBtn'){

            const myBookObj ={
                book_id: book.id,
                user_id: user.id
            }
           
            fetch(`/my_book_index/${book.id}`, {
                method: "DELETE",
                headers: {
                    
                    "Content-Type": "application/json",
                }
            } ) 
            .then(() => onRemove(book.id))
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
        <div>
            <img className="bookCover" src={book.book_image} alt="book cover"></img>
            <h2>{book.title}</h2>
            <h3>By: {book.author_first_name} {book.author_last_name}</h3>
            
            <button id="removeBtn" onClick={handleClick}>Remove from My Books</button>
            <button id="postsBtn" onClick={handleClick}>View Posts</button>
        </div>
    )
}

export default MyBookCard;

