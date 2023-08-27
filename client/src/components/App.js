import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";

import SignUp from "./SignUp";
import UserHome from "./UserHome";
import BookIndex from "./BookIndex";
import MyBookIndex from "./MyBookIndex";
import ThisBook from "./ThisBook";

function App() {
  
  const [books, setBooks] = useState([])
  const [myBookObj, setMyBookObj] = useState([])
  const [myBooks, setMyBooks] = useState([])
  const [posts, setPosts] =useState([])
  const [thisBook, setThisBook] = useState({
    id: "",
    title: "",
    author_first_name: "",
    author_last_name: "",
    genre: "",
    book_image: "",
    description: ""
  })
  const [user, setUser] = useState({
    id: "",
    username: "",
    image_url: "",
    bio: ""
  })

  useEffect(() => {
    
    fetch(`/check_session`).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
      
    });
  }, []);

  if (user) {
    return <UserHome />
  }
  else {
    return <HomePage />
  }

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
      console.log(bookObj)
      setMyBookObj(bookObj)
      let filteredMyBookObjs = myBookObj.map(obj=> obj.book_id)
      let filteredMyBooks = books.filter(book=>{
        for (let i=0; i< books.length; i++) {
          return filteredMyBookObjs.includes(book.id)
        }
        
      })
      console.log(filteredMyBooks)
      setMyBooks(filteredMyBooks)
    })
  }, [])

  function handleLogin(activeUser){
    console.log(user)
    setUser((user) => activeUser)
    console.log(user)
    
  }
  function handleSignUp(){
    console.log('sign up time')
  }

  function handleAdd(book) {
    console.log(book)
    setMyBookObj([
      ...myBookObj,
      book
    ])
    console.log(book)
  }

  function handleLogOut() {
    setUser({
      id: "",
      username: "",
      image_url: "",
      bio: ""
    })
    console.log(user)
  }

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <HomePage onLogin={handleLogin}/>
        </Route>
        <Route path="/home">
          <UserHome user={user} onLogOut={handleLogOut} />
        </Route>
        <Route path="/signup">
          <SignUp onSignUp={handleSignUp}/>
        </Route>
        <Route exact path="/book_index">
          <BookIndex books={books} onAdd={handleAdd} user={user} onPostsClick={setThisBook} />
        </Route>
        <Route exact path="/my_book_index">
          <MyBookIndex user={user} books={myBooks} onAdd={handleAdd}/>
        </Route>
        <Route exact path="/book_index/:id">
          <ThisBook book={thisBook} setPosts={setPosts} posts={posts} user={user} />
        </Route>
      </Switch>
      
      
    </div>
  )
  
}

export default App;
