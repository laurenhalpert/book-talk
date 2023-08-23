import React, { useEffect, useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Header from "./Header";
import MyNavBar from "./MyNavBar";

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
            <MyNavBar />
        </div>
    )
}

export default UserHome