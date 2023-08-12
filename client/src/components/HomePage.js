import React, { useEffect, useState } from "react";
import LogIn from "./LogIn"


function HomePage(props) {
    return (
        <div>
            <header>
                <h1>Book Talk</h1>
            </header>
            <p>Welcome to Book Talk! A place for book lovers to socialize with others who love the same book. Log in, or sign up to get started!</p>
            <div>
                <LogIn />
            </div>
        </div>
       
    )
}

export default HomePage