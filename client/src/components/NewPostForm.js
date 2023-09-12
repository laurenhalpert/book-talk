import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
// NEEDS formik
function NewPostForm({ user, book, onAddPost, posts }) {
    // const [formData, setFormData] = useState({
    //     user_id: user.id,
    //     book_id: book.id,
    //     likes: 0,
    //     post_content: ""
    // })


    const formSchema = yup.object().shape({
        post_content: yup.string().required('must enter content'),
        likes: yup.number()
    });
    const formik = useFormik({
        initialValues: {
            post_content: "",
            likes: 0,
            user_id: user.id,
            book_id: book.id,
        },
        // change fetch URL
        // update html with formik.values and formik.handles
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch(`/book_index/${book.id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          }).then((res) => {
            if (res.status == 201) {
                console.log(res);
                console.log(values)
                fetch(`/book_index/${book.id}`)
                .then(r=>r.json())
                .then(posts => {
                onAddPost(posts)
                
                })
                // onAddPost([...posts, values])
                // Why key error?
                // fetch again fresh posts for thisBook
                


            //   setRefreshPage(!refreshPage)
            }
          });
        },
    });







    // const formSchema = yup.object().shape({
    //     post_content: yup.string().required("Must enter content"),
       
    // });
    // const formik = useFormik({
    //     initialValues: {
    //         post_content: "",
            
    //     },
    //     // change fetch URL
    //     // update html with formik.values and formik.handles
    //     validationSchema: formSchema,
    //     onSubmit: (values) => {
    //       fetch(`/book_index/${book.id}`, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(values, null, 2),
    //       }).then((res) => {
    //         if (res.status == 201) {
    //             console.log(res);
    //             console.log(values)
    //         }
    //       });
    //     },
    // });
    // const formSchema = yup.object().shape({
        
    //     post_content: yup.string().required("Must enter content"),
    // });
    // const formik = useFormik({
    //     initialValues: {
            
    //         post_content: ""
    //     },
    //     validationSchema: formSchema,
    //     onSubmit: (values) => {
    //       fetch(`/book_index/${book.id}`, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(values, null, 2),
    //       }).then((res) => {
    //         if (res.status == 201) {
    //             console.log(res);
    //             console.log(values)
                
                
                


    //         //   setRefreshPage(!refreshPage)
    //         }
    //       });
    //     },
    // });
    // const handleChange = e => {
    //     console.log(e.target.name)
    //     setFormData({
    //         ...formData,
    //         post_content: e.target.value,
    //         likes: 0
    //     })
    // }

    // function handleSubmit(e) {
    //     e.preventDefault()
    //     fetch(`/book_index/${book.id}`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(formData)
    //     })
    //     .then (r => r.json())
    //     .then (newPost => {
    //         onAddPost([...posts, newPost]);
    //         setFormData({
    //             ...formData,
    //             post_content: ""
    //         })
    //     })

        // .then set posts to add in new post

    
    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="newPost">New Post: </label>
                <textarea id="newPost" name="post_content" placeholder="Thoughts..." value={formik.values.post_content} onChange={formik.handleChange} ></textarea>
                <button id="submitBtn" type="submit" >Post</button>
            </form>
        </div>
    )
}

export default NewPostForm