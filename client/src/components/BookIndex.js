import React, { useEffect, useState } from "react";
import Book from "./Book";
import Header from "./Header";
import MyBookIndex from "./MyBookIndex";

function BookIndex({ books, onAdd, user }){
    return(
        <div>
            <Header />
            <MyBookIndex />
            {books.map(book=><Book key={book.id} book={book} onAdd={onAdd} user={user}/>)
            }
        </div>
    )
}
export default BookIndex