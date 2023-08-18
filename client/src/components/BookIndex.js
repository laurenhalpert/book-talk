import React, { useEffect, useState } from "react";
import Book from "./Book";
import Header from "./Header";

function BookIndex({ books, onAdd, user }){
    return(
        <div>
            <Header />
            <p>{user.id}</p>
            {books.map(book=><Book key={book.id} book={book} onAdd={onAdd} user={user}/>)
            }
        </div>
    )
}
export default BookIndex