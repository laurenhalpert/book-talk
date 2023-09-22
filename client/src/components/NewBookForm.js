import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function NewBookForm({ addNewBook }) {
    
    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title"),
        author_first_name: yup.string().required("Must enter author's first name"),
        author_last_name: yup.string().required("Must enter author's last name"),
        genre: yup.string().required("Must enter a genre"),
        book_image: yup.string().required("Must enter book cover image"),
        description: yup.string().required("Must enter book description")
    });
    const formik = useFormik({
        initialValues: {
            title: "",
            author_first_name:"",
            author_last_name:"",
            genre: "",
            book_image:"",
            description:""
        },
        
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch("/book_index", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          }).then((res) => {
            if (res.status === 201) {
        
                addNewBook(values)
                
                


            
            }
          });
        },
    });

    

    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="titleField" >Title: </label>
                <input id="titleField" type="text" name="title" value={formik.values.title} onChange={formik.handleChange}></input> 
                <br></br>
                <label htmlFor="authorFirstNameField">Author's First Name: </label>
                <input id="authorFirstNameField" type="text" name="author_first_name" value={formik.values.author_first_name} onChange={formik.handleChange}></input>
                <label htmlFor="authorLastNameField">Author's Last Name: </label>
                <input id="authorLastNameField" type="text" name="author_last_name" value={formik.values.author_last_name} onChange={formik.handleChange}></input>
                <br></br>
                <label htmlFor="genreField">Genre: </label>
                <input id="genreField" type="text" name="genre" value={formik.values.genre} onChange={formik.handleChange} ></input>
                <br></br>
                <label htmlFor="bookImageField">Book Cover Image URL: </label>
                <input id="bookImageField" type="text" name="book_image" value={formik.values.book_image} onChange={formik.handleChange}></input>
                <br></br>
                <label htmlFor="descriptionField">Description: </label>
                <textarea id="descriptionField" name="description" value={formik.values.description} onChange={formik.handleChange}></textarea>
                <br></br>
                <button id="submitNewBookBtn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewBookForm