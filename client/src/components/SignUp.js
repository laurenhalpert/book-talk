import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Header from "./Header";

function SignUp({ onSignUp }) {
    const history=useHistory();
    // const [formData, setFormData] = useState({
    //     username: "",
    //     password: "",
    //     image_url: "",
    //     bio: ""
    // })
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username"),
        password: yup.string().required("Must enter a valid password").min(3),
        image_url: yup.string().required("Must enter an image URL"),
        bio: yup.string().required("Must enter a bio")
    });
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            image_url: "",
            bio: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch("/sign_up", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          }).then((res) => {
            if (res.status == 201) {
                console.log(res);
                onSignUp(values)
                history.push('/home')


            //   setRefreshPage(!refreshPage)
            }
            else if (res.status == 422) {
               
                alert('Username already taken.')
            }
          });
        },
    });
    // const handleChange = e => {
    //     console.log(e.target.name)
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value
    //     })
    // }
    // function handleSubmit(e){
    //     e.preventDefault();
    //     fetch("/sign_up", {
    //         method: "POST",
    //         headers: {
    //           "Access-Control-Allow-Origin": "*",
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(formData),
    //       })
    //         .then((r) => {
    //           if (r.ok){
    //               r.json().then(user=> {
    //                   onSignUp(user);
    //                   history.push("/home");
    //               })
    //           }
    //           else {
    //               r.json().then((err) => alert("401 Unauthorized. Please enter a valid username and password or sign up for an account."));
    //           }
    //         })
    //     history.push("/home")
    // }
    return (
        <div>
            <Header />
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input 
                    id="username" 
                    type="text" 
                    name="username"
                    placeholder="Username..."
                    value={formik.values.username}
                    onChange={formik.handleChange}>
                </input>
                <p style={{ color: "red" }}> {formik.errors.username}</p>
                <br></br>
                <label htmlFor="password">Password: </label>
                <input 
                    id="password" 
                    type="text" 
                    name="password"
                    placeholder="Password..."
                    value={formik.values.password}
                    onChange={formik.handleChange}>
                </input>
                <p style={{ color: "red" }}> {formik.errors.password}</p>
                <br></br>
                <label htmlFor="image_url">Image URL: </label>
                <input
                    id="image_url"
                    type="text"
                    name="image_url"
                    placeholder="Image URL..."
                    value={formik.values.image_url}
                    onChange={formik.handleChange}>
                </input>
                <p style={{ color: "red" }}> {formik.errors.image_url}</p>
                <br></br>
                <label htmlFor="bio">Bio: </label>
                <input
                    id="bio"
                    type="text"
                    name="bio"
                    placeholder="bio"
                    value={formik.values.bio}
                    onChange={formik.handleChange}>
                </input>
                <p style={{ color: "red" }}> {formik.errors.bio}</p>
                <br></br>
                <button id="subBtn" type="submit">Sign Up</button>
            </form>
        </div>
    )
    
}

export default SignUp