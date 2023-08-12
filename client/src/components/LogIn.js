import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function LogIn({ onLogin }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
      });
    
      function handleChange(e) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    
      function handleSubmit(e) {
        e.preventDefault();
        fetch("http://127.0.0.1:5555/api/log_in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((r) => r.json())
          .then((user) => {
            onLogin(user);
            // after logging the user in, redirect to the home page!
            history.push("/home");
          });
      }
    return (
        <div id="logInForm">
            <form>
                <label htmlFor="usernameField">Username: </label>
                <input id="usernameField" type="text" placeholder="Username..." value={formData.username} onChange={handleChange}></input>
                <br></br>
                <label htmlFor="passwordField">Password: </label>
                <input id="passwordField" type="text" placeholder="Password..." value={formData.password} onChange={handleChange}></input>
                <br></br>
                <button id="submitBtn" type="submit">Log In</button>
                {/* set up routing so that when "Log In" is clicked the username and password are authenticated and the user is redirected to their user homepage if authenticated, if not they receive an error message */}
            </form>
        </div>

    )
    
}

export default LogIn