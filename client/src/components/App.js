import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import HomePage from "./HomePage";

import SignUp from "./SignUp";
import UserHome from "./UserHome";
import BookIndex from "./BookIndex";
import MyBookIndex from "./MyBookIndex";
import ThisBook from "./ThisBook";
import MyThisBook from "./MyThisBook";

function App() {
  const history = useHistory();
  const [books, setBooks] = useState([])
  const [myBookObj, setMyBookObj] = useState([])
  const [myBooks, setMyBooks] = useState([])
  // const [posts, setPosts] =useState([])
  
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
      else {
        r.json().then(()=> <HomePage onLogin={handleLogin} />)
      }
    });
  }, []);

  // if (user.id !== "") {
  //   return <UserHome />
  // }
  // else {
  //   return <HomePage onLogin={handleLogin}/>
  // }
  

  // ^yellow isn't working properly

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
  if (user.id === ''){
    return (<HomePage onLogin={handleLogin} />)
  } 

  function handleLogin(activeUser){
    console.log(user)
    setUser((user) => activeUser)
    console.log(user)
    
  }
  function handleSignUp(user){
    setUser(user)
  }

  function handleAdd(bookObj) {
    console.log(bookObj.book_id)
    const book = books.filter(book=> book.id === bookObj.book_id)
    console.log(book)
    setMyBooks([
      ...myBooks,
      book[0]
    ])
    
  }

  function handleLogOut() {
    setUser({
      id: "",
      username: "",
      image_url: "",
      bio: ""
    })
    history.push('/')
  }

  // function handleNewPost(post) {
  //   setPosts({
  //     ...posts,
  //     post
  //   })
  // }
  function handleNewBook(book) {
    setBooks([
      ...books,
      book
    ])
  }

  function handleRemove(id) {
    console.log(id)
    const updatedMyBooks = myBooks.filter(book => book.book_id !== id)
    console.log(updatedMyBooks)
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
          <BookIndex books={books} onAdd={handleAdd} user={user} onPostsClick={setThisBook} onLogOut={handleLogOut} addNewBook={handleNewBook} />
        </Route>
        <Route exact path="/my_book_index">
          <MyBookIndex user={user} books={myBooks} onAdd={handleAdd} onLogOut={handleLogOut} onPostsClick={setThisBook}  onRemove={handleRemove} onPicture={setMyThisBook} />
        </Route>
        <Route exact path="/book_index/:id">
          <ThisBook book={thisBook} user={user} onLogOut={handleLogOut} />
        </Route>
        <Route exact path ="/my_book_index/:my_id">
          <MyThisBook book={myThisBook} user={user} onLogOut={handleLogOut} onRemove={handleRemove} />
        </Route>
      </Switch>
      
      
    </div>
  )
  
}

export default App;
