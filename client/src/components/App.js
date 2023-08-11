import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header"

function App() {
  // Code goes here!
  return (
    <div>
      <Header />
      <p>Welcome to Book Talk! A place for book lovers to socialize with others who love the same book. Log in, or sign up to get started!</p>
      <img src="https://www.gandydancer.org/wp-content/uploads/2016/02/blog-image.jpg" alt="book"></img>
    </div>
  )
  
}

export default App;
