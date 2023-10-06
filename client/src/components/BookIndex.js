import React from "react";
import Book from "./Book";
import Header from "./Header";
import MyNavBar from "./MyNavBar";
import NewBookForm from "./NewBookForm";

import { useSelector } from 'react-redux';

function BookIndex({  myBooks, onAdd, user, onPostsClick, onLogOut, addNewBook }){
    const books = useSelector(state => state.books)
    console.log(books)
    return(
        <div>
            <Header />
            <MyNavBar onLogOut={onLogOut} />
            <br></br>
            {books.map(book=><Book key={book.id} book={book} myBooks={myBooks} onAdd={onAdd} user={user} onPostsClick={onPostsClick} />)
            }
            <h3 id="newBookHeader">Don't see what you're looking for? Create a book!</h3>
            <NewBookForm addNewBook={addNewBook}/>
        </div>
    )
}
export default BookIndex