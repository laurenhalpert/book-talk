import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";

import SignUp from "./SignUp";
import UserHome from "./UserHome";
import BookIndex from "./BookIndex";
import MyBookIndex from "./MyBookIndex";

function App() {
  // Code goes here!
  const [books, setBooks] = useState([])
  const [myBooks, setMyBooks] = useState([])

  useEffect(()=>{
      fetch("/my_book_index")
      .then(r=>r.json())
      .then(books => {
        setMyBooks(books)
        
      })
    }, [])

  useEffect(()=>{
    fetch("/book_index")
    .then(r=>r.json())
    .then(books => {
      setBooks(books)
      
    })
  }, [])

  function handleLogin(){
    console.log('logged in')
  }
  function handleSignUp(){
    console.log('sign up time')
  }
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <HomePage onLogin={handleLogin}/>
        </Route>
        <Route path="/home">
          <UserHome />
        </Route>
        <Route path="/signup">
          <SignUp onSignUp={handleSignUp}/>
        </Route>
        <Route exact path="/book_index">
          <BookIndex books={books}/>
        </Route>
        <Route exact path="/my_book_index">
          <MyBookIndex books={myBooks}/>
        </Route>
      </Switch>
      
      
    </div>
  )
  
}

export default App;
