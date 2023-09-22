import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function LogIn({ onLogin }) {
    const history = useHistory();
    
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username"),
        password: yup.string().required("Must enter a valid password").max(15)
    });
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch("/log_in", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          }).then((res) => {
            if (res.status == 200) {
               
                onLogin(values)
                history.push('/home')


            
            }
            else {
                alert("error 401: unauthorized")
            }
          });
        },
    });
    
    
    
    return (
        <div id="logInForm">
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="usernameField">Username: </label>
                <input 
                    id="usernameField" 
                    type="text" 
                    name="username"
                    placeholder="Username..." 
                    value={formik.values.username}
                    onChange={formik.handleChange}>
                </input>
                <br></br>
                <p style={{ color: "red" }}> {formik.errors.username}</p>
                <label htmlFor="passwordField">Password: </label>
                <input 
                    id="passwordField" 
                    type="password" 
                    name="password"
                    placeholder="Password..." 
                    value={formik.values.password} 
                    onChange={formik.handleChange}>
                </input>
                <br></br>
                <p style={{ color: "red" }}> {formik.errors.password}</p>
                <button id="submitBtn" type="submit">Log In</button>
            </form>
            
        </div>

    )
    
}

export default LogIn