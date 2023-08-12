import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function LogIn({ onLogin }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    
    const handleChange=(e) =>{

        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
        
    }
    
      function handleSubmit(e) {
        e.preventDefault();
        fetch("/log_in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((r) => r.json())
          .then((user) => {
            onLogin(user);
            history.push("/home");
          });
      }
    return (
        <div id="logInForm">
            <form onSubmit={handleSubmit}>
                <label htmlFor="usernameField">Username: </label>
                <input 
                    id="usernameField" 
                    type="text" 
                    name="username"
                    placeholder="Username..." 
                    value={formData.username}
                    onChange={handleChange}>
                </input>
                <br></br>
                <label htmlFor="passwordField">Password: </label>
                <input 
                    id="passwordField" 
                    type="text" 
                    name="password"
                    placeholder="Password..." 
                    value={formData.password} 
                    onChange={handleChange}>
                </input>
                <br></br>
                <button id="submitBtn" type="submit">Log In</button>
            </form>
        </div>

    )
    
}

export default LogIn