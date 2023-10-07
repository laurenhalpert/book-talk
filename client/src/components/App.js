import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import HomePage from "./HomePage";

import SignUp from "./SignUp";
import UserHome from "./UserHome";
import BookIndex from "./BookIndex";
import MyBookIndex from "./MyBookIndex";
import ThisBook from "./ThisBook";
import MyThisBook from "./MyThisBook";

import { useDispatch, useSelector } from 'react-redux';
import { logIn, logOut, getBooks, getMyBooks, getMyBookObj, getThisBook, getMyThisBook } from "../actions";

function App() {
  const dispatch = useDispatch()
  const history = useHistory();
  
 
  useEffect(()=>{
    
    fetch("/book_index")
    .then(r=>r.json())
    .then(books => {
      console.log(books)
      dispatch(getBooks(books))
      
    })
    
  }, [])
 

  const books= useSelector(state => state.books)
  
  const myBookObj = useSelector(state => state.myBookObj)
  useEffect(()=>{
    fetch("/my_book_index")
    .then(r=>r.json())
    .then(bookObj => {
      dispatch(getMyBookObj(bookObj))
     
      
      let filteredMyBookObjs = myBookObj.map(obj=> obj.book_id)
      
      let filteredMyBooks = books.filter((book) => {
        return filteredMyBookObjs.includes(book.id)
      })
      
      dispatch(getMyBooks(filteredMyBooks))
    })
  }, [])


  function handleLogin(activeUser){
    
    
    fetch('/log_in')
    .then(r=> r.json())
    .then(user=>dispatch(logIn(user)))
    
    
    
  }
  function handleSignUp(user){
    
    dispatch(logIn(user))
  }
  const myBooks= useSelector(state=>state.myBooks)
  function handleAdd(bookObj) {
    
    const book = books.filter(book=> book.id === bookObj.book_id)
    
    dispatch(getMyBooks([
      ...myBooks,
      book[0]
    ]))
    
  }

  function handleLogOut() {
    
    dispatch(logOut())
    history.push('/')
  }

 
  function handleNewBook(book) {
    fetch('/book_index')
    .then(r=>r.json())
    .then(books => dispatch(getBooks(books)))
    
  }

  function handleRemove(id) {
    
    const updatedMyBooks = myBooks.filter(book => book.id !== id)
    
    dispatch(getMyBooks(updatedMyBooks))
    history.push('/my_book_index')
  }
  function handlePostsClick(bookObj) {
    console.log(bookObj)
    dispatch(getThisBook(bookObj))
  }

  function handleOnPicture(bookObj) {
    dispatch(getMyThisBook(bookObj))
  }
  
 
  
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <HomePage onLogin={handleLogin}/>
        </Route>
        <Route path="/home">
          <UserHome  onLogOut={handleLogOut} />
        </Route>
        <Route path="/signup">
          <SignUp onSignUp={handleSignUp}/>
        </Route>
        <Route exact path="/book_index">
          <BookIndex  onAdd={handleAdd}  onPostsClick={handlePostsClick} onLogOut={handleLogOut} addNewBook={handleNewBook} />
        </Route>
        <Route exact path="/my_book_index">
          <MyBookIndex  onLogOut={handleLogOut} onPicture={handleOnPicture} />
        </Route>
        <Route exact path="/book_index/:id">
          <ThisBook onLogOut={handleLogOut} />
        </Route>
        <Route exact path ="/my_book_index/:my_id">
          <MyThisBook onLogOut={handleLogOut} onRemove={handleRemove} />
        </Route>
      </Switch>
      
      
    </div>
  )
  
}

export default App;
