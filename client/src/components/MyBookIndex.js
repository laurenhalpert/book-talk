import React from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";

import MyNavBar from "./MyNavBar";

import { useSelector } from "react-redux";


function MyBookIndex({ onLogOut, onPicture }) {
    const history = useHistory()
   
    const books = useSelector(state=> state.myBooks)

    function handleClick(e) {
        
        const eventId = parseInt(e.target.id)
        
        history.push(`/my_book_index/${e.target.id}`)
        const book = books.filter(book => book.id === eventId)[0]
        
        onPicture(book)
        
    }
    return(
        <div>
            <Header />
            <MyNavBar onLogOut={onLogOut} />
            <br></br>
            {books.map(book=><img className="bookCover" key={book.id} id={book.id} src={book.book_image} alt="book cover" onClick={handleClick}></img>)}
        </div>
    )
}

export default MyBookIndex