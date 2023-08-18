import React, { useEffect, useState } from "react";
import Header from "./Header";
import Book from "./Book";

function MyBookIndex({ books, user, onAdd }) {
    return(
        <div>
            <Header />
            {/* {books.map(book=><Book key={book.id} book={book} user={user} onAdd={onAdd}/>)} */}
            {/* get books whose ids match those associated with user id */}
        </div>
    )
}

export default MyBookIndex