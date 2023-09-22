import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LogIn from "./LogIn";
import Header from "./Header";


function HomePage({ onLogin }) {
    const history=useHistory();
    function handleClick(e) {
        history.push("/signup");
    }
    return (
        <div id="home">
            <Header />
            <p>Welcome to Book Talk! A place for book lovers to socialize with others who love the same book. Log in, or sign up to get started!</p>
            <div id="login">
                <LogIn onLogin={onLogin}/>
            </div>
            <br></br>
            <div id="signup">
                <p>Don't have an account? Sign up below.</p>
                <button onClick={handleClick}>Sign Up</button>
            </div>
        </div>
       
    )
}

export default HomePage