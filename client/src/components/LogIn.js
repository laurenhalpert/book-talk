import React, { useEffect, useState } from "react";


function LogIn(props) {
    
    return (
        <div id="logInForm">
            <form>
                <label htmlFor="usernameField">Username: </label>
                <input id="usernameField" type="text" placeholder="Username..."></input>
                <br></br>
                <label htmlFor="passwordField">Password: </label>
                <input id="passwordField" type="text" placeholder="Password..."></input>
                <br></br>
                <button id="submitBtn" type="submit">Log In</button>
                {/* set up routing so that when "Log In" is clicked the username and password are authenticated and the user is redirected to their user homepage if authenticated, if not they receive an error message */}
            </form>
            <p>Don't have an account? Sign up below.</p>
            <button>Sign Up</button>
            {/* set up routing so that when "Sign Up" is clicked, the user is routed to the Sign Up page */}
        </div>

    )
    
}

export default LogIn