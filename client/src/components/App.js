import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import HomePage from "./HomePage";

import SignUp from "./SignUp";
import UserHome from "./UserHome";
import BookIndex from "./BookIndex";
import MyBookIndex from "./MyBookIndex";
import ThisBook from "./ThisBook";
import MyThisBook from "./MyThisBook";

import { useDispatch, useSelector } from 'react-redux';
import { logIn, logOut } from "../actions";

function App() {
  const dispatch = useDispatch()
  const history = useHistory();
  const [books, setBooks] = useState([])
  const [myBookObj, setMyBookObj] = useState([])
  const [myBooks, setMyBooks] = useState([])
  
  
  const [thisBook, setThisBook] = useState({
    id: "",
    title: "",
    author_first_name: "",
    author_last_name: "",
    genre: "",
    book_image: "",
    description: ""
  })

  const [myThisBook, setMyThisBook] = useState({
    id: "",
    title: "",
    author_first_name: "",
    author_last_name: "",
    genre: "",
    book_image: "",
    description: ""
  })

  // const [user, setUser] = useState({
  //   id: "",
  //   username: "",
  //   image_url: "",
  //   bio: ""
  // })
  
 
  
  // useEffect(() => {
    
  //   fetch(`/check_session`).then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //     else {
  //       r.json().then(()=> <HomePage onLogin={handleLogin} />)
  //     }
  //   });
  // }, []);

  

  useEffect(()=>{
    fetch("/book_index")
    .then(r=>r.json())
    .then(books => {
      setBooks(books)
      
    })
  }, [])


  

  useEffect(()=>{
    fetch("/my_book_index")
    .then(r=>r.json())
    .then(bookObj => {
      
      setMyBookObj(bookObj)
      let filteredMyBookObjs = myBookObj.map(obj=> obj.book_id)
      
      let filteredMyBooks = books.filter((book) => {
        return filteredMyBookObjs.includes(book.id)
      })
      
      setMyBooks(filteredMyBooks)
    })
  }, [])
  

  function handleLogin(activeUser){
    
    
    fetch('/log_in')
    .then(r=> r.json())
    .then(user=>dispatch(logIn(user)))
    
    
    
  }
  function handleSignUp(user){
    // setUser(user)
    dispatch(logIn(user))
  }

  function handleAdd(bookObj) {
    
    const book = books.filter(book=> book.id === bookObj.book_id)
    
    setMyBooks([
      ...myBooks,
      book[0]
    ])
    
  }

  function handleLogOut() {
    // setUser({
    //   id: "",
    //   username: "",
    //   image_url: "",
    //   bio: ""
    // })
    dispatch(logOut())
    history.push('/')
  }

 
  function handleNewBook(book) {
    fetch('/book_index')
    .then(r=>r.json())
    .then(books => setBooks(books))
    
  }

  function handleRemove(id) {
    
    const updatedMyBooks = myBooks.filter(book => book.id !== id)
    
    setMyBooks(updatedMyBooks)
    history.push('/my_book_index')
  }
  
  // const user=useSelector(state => state.user)
  
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
          <BookIndex books={books} myBooks={myBooks} onAdd={handleAdd}  onPostsClick={setThisBook} onLogOut={handleLogOut} addNewBook={handleNewBook} />
        </Route>
        <Route exact path="/my_book_index">
          <MyBookIndex  books={myBooks} onLogOut={handleLogOut} onPicture={setMyThisBook} />
        </Route>
        <Route exact path="/book_index/:id">
          <ThisBook book={thisBook}  onLogOut={handleLogOut} />
        </Route>
        <Route exact path ="/my_book_index/:my_id">
          <MyThisBook book={myThisBook}  onLogOut={handleLogOut} onRemove={handleRemove} />
        </Route>
      </Switch>
      
      
    </div>
  )
  
}

export default App;
