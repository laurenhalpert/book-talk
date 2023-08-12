import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


function SignUp(props) {
    const history=useHistory();
    function handleSubmit(e){
        e.preventDefault();
        history.push("/home")
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
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