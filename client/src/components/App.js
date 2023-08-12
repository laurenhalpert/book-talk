import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
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
      </Switch>
      
      
    </div>
  )
  
}

export default App;
