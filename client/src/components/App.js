import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import SignUp from "./SignUp";
import UserHome from "./UserHome";
import BookIndex from "./BookIndex";

function App() {
  // Code goes here!
  function handleLogin(){
    console.log('logged in')
  }
  function handleSignUp(){
    console.log('sign up time')
  }
  return (
    <div>
      <NavBar />
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
          <BookIndex />
        </Route>
        <Route exact path="/my_book_index">
          <MyBookIndex />
        </Route>
      </Switch>
      
      
    </div>
  )
  
}

export default App;
