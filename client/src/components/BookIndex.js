import React, { useEffect, useState } from "react";
import Book from "./Book";

function BookIndex({ books }){
    return(
        <div>
            <p>books here</p>
            {books.map(book=><Book book={book}/>)
            }
        </div>
    )
}
export default BookIndex