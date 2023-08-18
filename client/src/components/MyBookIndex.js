import React, { useEffect, useState } from "react";
import Header from "./Header";
import Book from "./Book";

function MyBookIndex({ books }) {
    return(
        <div>
            <Header />
            {books.map(book=><Book key={book.id} book={book}/>)}
        </div>
    )
}

export default MyBookIndex