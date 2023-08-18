import React, { useEffect, useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Header from "./Header";

// make user home page and create nav links for books, my books
function UserHome(props){

    const [myBooks, setMyBooks] = useState([])

    useEffect(()=>{
        fetch("/my_book_index")
        .then(r=>r.json())
        .then(books => {
          setMyBooks(books)
          
        })
      }, [])

    return(
        <div>
            <Header />
            {console.log(user.id)}
            <NavLink to="/book_index" exact>
                All Books
            </NavLink>
            <NavLink to="/my_book_index" exact>
                My Books
            </NavLink>
        </div>
    )
}

export default UserHome