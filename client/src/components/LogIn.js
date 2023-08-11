import React, { useEffect, useState } from "react";


function LogIn(props) {
    return (
        <div>
            <form>
                <label htmlFor="usernameField">Username: </label>
                <input id="usernameField" type="text" value="myUsername"></input>
                <br></br>
                <label htmlFor="passwordField">Password: </label>
                <input id="passwordField" type="text" value="myPassword"></input>
                <br></br>
                <input id="submitButton" type="submit">Log In</input>
            </form>
            <p>Don't have an account? Sign up below.</p>
            <button>Sign Up</button>
        </div>
    )
    
}

export default LogIn