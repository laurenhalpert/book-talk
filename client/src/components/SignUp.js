import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";

function SignUp({ onSignUp }) {
    const history=useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        image_url: "",
        bio: ""
    })
    const handleChange = e => {
        console.log(e.target.name)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        fetch("/sign_up", {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((r) => {
              if (r.ok){
                  r.json().then(user=> {
                      onSignUp(user);
                      history.push("/home");
                  })
              }
              else {
                  r.json().then((err) => alert("401 Unauthorized. Please enter a valid username and password or sign up for an account."));
              }
            })
        history.push("/home")
    }
    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input 
                    id="username" 
                    type="text" 
                    name="username"
                    placeholder="Username..."
                    value={formData.username}
                    onChange={handleChange}>
                </input>
                <br></br>
                <label htmlFor="password">Password: </label>
                <input 
                    id="password" 
                    type="text" 
                    name="password"
                    placeholder="Password..."
                    value={formData.password}
                    onChange={handleChange}>
                </input>
                <br></br>
                <label htmlFor="image_url">Image URL: </label>
                <input
                    id="image_url"
                    type="text"
                    name="image_url"
                    placeholder="Image URL..."
                    value={formData.image_url}
                    onChange={handleChange}>
                </input>
                <br></br>
                <label htmlFor="bio">Bio: </label>
                <input
                    id="bio"
                    type="text"
                    name="bio"
                    placeholder="bio"
                    value={formData.bio}
                    onChange={handleChange}>
                </input>
                <br></br>
                <button id="subBtn" type="submit">Sign Up</button>
            </form>
        </div>
    )
    
}

export default SignUp