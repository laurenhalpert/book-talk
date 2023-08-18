import React, { useEffect, useState } from "react";
import Book from "./Book";
import Header from "./Header";

function BookIndex({ books }){
    return(
        <div>
            <Header />
            {books.map(book=><Book key={book.id} book={book}/>)
            }
        </div>
    )
}
export default BookIndex