import React, { useEffect, useState } from "react";
function Book({ book, user, onAdd }) {
    function handleClick() {
        console.log('clicked')
        console.log(book)
        console.log(user)
        const myBookObj ={
            book_id: book.id,
            user_id: user.id
        }
        console.log(myBookObj)
        fetch("/my_book_index", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(myBookObj),
        } ) .then(r=>r.json())
        .then(book=> onAdd(book))
        // set state here of having been added to my books...make a POST to MyBook
    }
    return (
        <div>
            <img className="bookCover" src={book.book_image} alt="book cover"></img>
            <h2>{book.title}</h2>
            <h3>By: {book.author_first_name} {book.author_last_name}</h3>
            <button id="addBookBtn" onClick={handleClick}>Add to My Books</button>
        </div>
    )
}

export default Book