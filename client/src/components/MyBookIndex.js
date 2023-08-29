import React, { useEffect, useState } from "react";
import Header from "./Header";
import Book from "./Book";
import MyNavBar from "./MyNavBar";

function MyBookIndex({ books, user, onAdd, onLogOut }) {
    return(
        <div>
            <Header />
            <MyNavBar onLogOut={onLogOut} user={user} />
            {/* {books.map(book=><Book key={book.id} book={book} user={user} onAdd={onAdd}/>)} */}
            {/* get books whose ids match those associated with user id */}
            {/* do i need to fetch from my books or do i do a filter to get only the books whose ids match the book ids associated with the user id? */}
        </div>
    )
}

export default MyBookIndex