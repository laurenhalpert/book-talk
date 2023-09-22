import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function NewPostForm({ user, book, onAddPost, posts }) {
   


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
        
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch(`/book_index/${book.id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          }).then((res) => {
            if (res.status === 201) {
                
                fetch(`/book_index/${book.id}`)
                .then(r=>r.json())
                .then(posts => {
                onAddPost(posts)
                
                })
                
            }
          });
        },
    });







   
    
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