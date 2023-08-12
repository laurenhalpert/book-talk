import React, { useEffect, useState } from "react";



function SignUp(props) {
    
    return (
        <div>
            <form>
                <label htmlFor="username">Username: </label>
                <input id="username" type="text" placeholder="Username..."></input>
                <br></br>
                <label htmlFor="password">Password: </label>
                <input id="password" type="text" placeholder="Password..."></input>
                <br></br>
                <button id="subBtn" type="submit">Sign Up</button>
            </form>
        </div>
    )
    
}

export default SignUp