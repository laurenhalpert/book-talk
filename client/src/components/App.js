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
  

  function handleLogin(activeUser){
    console.log(user)
    // find a way to set user to user who matches activeUser.username
    // fetch users setUser(users.filter(user=> user.username === activeUser.username))
    fetch('/log_in')
    .then(r=> r.json())
    .then(user=>setUser(user))
    // setUser((user) => activeUser)
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
    fetch('/book_index')
    .then(r=>r.json())
    .then(books => setBooks(books))
    // setBooks([
    //   ...books,
    //   book
    // ])
  }

  function handleRemove(id) {
    console.log(id)
    console.log(myBooks)
    const updatedMyBooks = myBooks.filter(book => book.id !== id)
    console.log(updatedMyBooks)
    setMyBooks(updatedMyBooks)
    history.push('/my_book_index')
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
          <BookIndex books={books} myBooks={myBooks} onAdd={handleAdd} user={user} onPostsClick={setThisBook} onLogOut={handleLogOut} addNewBook={handleNewBook} />
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


// to dos:
// -make it pretty
// -make sure it's working correctly
// -make README
// -make walkthrough video
// -write blog