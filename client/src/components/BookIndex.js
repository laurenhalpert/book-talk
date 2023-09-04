import React, { useEffect, useState } from "react";
import Book from "./Book";
import Header from "./Header";
import MyNavBar from "./MyNavBar";
import NewBookForm from "./NewBookForm";

function BookIndex({ books, onAdd, user, onPostsClick, onLogOut, addNewBook }){
    
    return(
        <div>
            <Header />
            <MyNavBar onLogOut={onLogOut} user={user} />
            {books.map(book=><Book key={book.id} book={book} onAdd={onAdd} user={user} onPostsClick={onPostsClick} />)
            }
            <h3>Don't see what you're looking for? Create a book!</h3>
            <NewBookForm addNewBook={addNewBook}/>
        </div>
    )
}
export default BookIndex