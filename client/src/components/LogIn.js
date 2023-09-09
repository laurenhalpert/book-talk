import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function LogIn({ onLogin }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username"),
        password: yup.string().required("Must enter a valid password").max(15)
    });
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            // image_url: "",
            // bio: ""
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
                console.log(res);
                console.log(values)
                onLogin(values)
                history.push('/home')


            //   setRefreshPage(!refreshPage)
            }
          });
        },
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
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((r) => {
            if (r.ok){
                r.json().then(user=> {
                    onLogin(user);
                    history.push("/home");
                })
            }
            else {
                r.json().then((err) => alert("401 Unauthorized. Please enter a valid username and password or sign up for an account."));
            }
          })
      }
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
                <button id="submitBtn" type="submit">Log In</button>
            </form>
            
        </div>

    )
    
}

export default LogIn