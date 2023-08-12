import React, { useEffect, useState } from "react";
import LogIn from "./LogIn"


function HomePage({ onLogin }) {
    return (
        <div>
            <header>
                <h1>Book Talk</h1>
            </header>
            <p>Welcome to Book Talk! A place for book lovers to socialize with others who love the same book. Log in, or sign up to get started!</p>
            <div>
                <LogIn onLogin={onLogin}/>
            </div>
            <div>
                <p>Don't have an account? Sign up below.</p>
                <button>Sign Up</button>
                {/* set up routing so that when "Sign Up" is clicked, the user is routed to the Sign Up page */} 
            </div>
        </div>
       
    )
}

export default HomePage