import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Book({ book, myBooks, user, onAdd, onPostsClick }) {
    const history = useHistory();
    
    
    function handleClick(e) {
        console.log('clicked')
        console.log(e.target)
        console.log(book === book)
        console.log(user)
        let myBook = myBooks.filter(item => item.title === book.title)[0]

        console.log(book === myBook)
        if (e.target.id === 'addBookBtn'&& book !== myBook ){

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
        else if (book === myBook) {
            alert("This book has already been added to your books.")
        }
        // onAdd, some kind of confirmation of successful add should be given
        // pop up error if book is already in myBooks
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
    
    return (
        <div>
            <img className="bookCover" src={book.book_image} alt="book cover"></img>
            <h2>{book.title}</h2>
            <h3>By: {book.author_first_name} {book.author_last_name}</h3>
            {/* included in mybooks? removebookbtn: addbookbtn */}
            {/* to do this make state for inMyBooks */}
            <button id="addBookBtn" onClick={handleClick}>Add to My Books</button>
            <button id="postsBtn" onClick={handleClick}>View Posts</button>
        </div>
    )
}

export default Book

// Add in posts for each book available to view by clicking on a button
// User should be able to edit and delete posts they made
// User should be able to create posts