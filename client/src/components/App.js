import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import SignUp from "./SignUp";
import UserHome from "./UserHome";

function App() {
  // Code goes here!
  function handleLogin(){
    console.log('logged in')
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
          <SignUp />
        </Route>
      </Switch>
      
      
    </div>
  )
  
}

export default App;
