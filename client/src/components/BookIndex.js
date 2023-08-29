import React, { useEffect, useState } from "react";
import Book from "./Book";
import Header from "./Header";
import MyNavBar from "./MyNavBar";

function BookIndex({ books, onAdd, user, onPostsClick, onLogOut }){
    return(
        <div>
            <Header />
            <MyNavBar onLogOut={onLogOut} user={user} />
            {books.map(book=><Book key={book.id} book={book} onAdd={onAdd} user={user} onPostsClick={onPostsClick} />)
            }
        </div>
    )
}
export default BookIndex