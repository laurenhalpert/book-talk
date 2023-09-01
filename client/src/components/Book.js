import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Book({ book, user, onAdd, onPostsClick, inMyBooks }) {
    const history = useHistory();
    
    console.log(inMyBooks)
    function handleClick(e) {
        console.log('clicked')
        console.log(e.target.id)
        console.log(book)
        console.log(user)
        if (e.target.id === 'addBookBtn'){

            const myBookObj ={
                book_id: book.id,
                user_id: user.id
            }
            console.log(myBookObj)

            fetch("/my_book_index", {
                method: "POST",
                headers: {
                    
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(myBookObj),
            } ) 
            .then(r=>r.json())
            .then(myBookObj => onAdd(myBookObj))
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
        

        // set state here of having been added to my books...make a POST to MyBook
    }
    function removeClick(){
        console.log('remove clicked')
    }
    return (
        <div>
            <img className="bookCover" src={book.book_image} alt="book cover"></img>
            <h2>{book.title}</h2>
            <h3>By: {book.author_first_name} {book.author_last_name}</h3>
            {/* included in mybooks? removebookbtn: addbookbtn */}
            {/* to do this make state for inMyBooks */}
            {console.log(inMyBooks)}
            {inMyBooks? <button id="removeBookBtn" onClick={removeClick}>Remove from My Books</button>:<button id="addBookBtn" onClick={handleClick}>Add to My Books</button>}
            <button id="postsBtn" onClick={handleClick}>View Posts</button>
        </div>
    )
}

export default Book

// Add in posts for each book available to view by clicking on a button
// User should be able to edit and delete posts they made
// User should be able to create posts