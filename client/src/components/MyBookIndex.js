import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import MyBookCard from "./MyBookCard";
import MyNavBar from "./MyNavBar";


function MyBookIndex({ books, onAdd, user, onPostsClick, onLogOut, onRemove, onPicture }) {
    const history = useHistory()
    console.log(books)

    function handleClick(e) {
        console.log(e.target.id)
        const eventId = parseInt(e.target.id)
        console.log(typeof(eventId))
        history.push(`/my_book_index/${e.target.id}`)
        const book = books.filter(book => book.id === eventId)[0]
        console.log(book)
        onPicture(book)
        
    }
    return(
        <div>
            <Header />
            <MyNavBar onLogOut={onLogOut} user={user} />
            <br></br>
            {books.map(book=><img className="bookCover" key={book.id} id={book.id} src={book.book_image} alt="book cover" onClick={handleClick}></img>)}
            {/* {books.map(book=><MyBookCard key={book.id} book={book} onAdd={onAdd} user={user} onPostsClick={onPostsClick} onRemove={onRemove} />) */}
            {/* {books.map(book=><Book key={book.id} book={book} user={user} onAdd={onAdd}/>)} */}
            {/* get books whose ids match those associated with user id */}
            {/* do i need to fetch from my books or do i do a filter to get only the books whose ids match the book ids associated with the user id? */}
        </div>
    )
}

export default MyBookIndex