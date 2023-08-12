import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


function SignUp(props) {
    const history=useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        history.push("/home")
    }
    return (
        <div>
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
                <button id="subBtn" type="submit">Sign Up</button>
            </form>
        </div>
    )
    
}

export default SignUp