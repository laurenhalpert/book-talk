import React, { useEffect, useState } from "react";

function NewBookForm({ addNewBook }) {
    const [formData, setFormData] = useState({
        title: "",
        author_first_name:"",
        author_last_name:"",
        genre: "",
        book_image:"",
        description:""
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
        console.log('submitted')
        fetch('/book_index', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(r=>r.json())
        .then(book => addNewBook(book))

        setFormData({
            title: "",
            author_first_name:"",
            author_last_name:"",
            genre: "",
            book_image:"",
            description:""
        })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="titleField" >Title: </label>
                <input id="titleField" type="text" name="title" value={formData.title} onChange={handleChange}></input> 
                <br></br>
                <label htmlFor="authorFirstNameField">Author's First Name: </label>
                <input id="authorFirstNameField" type="text" name="author_first_name" value={formData.author_first_name} onChange={handleChange}></input>
                <label htmlFor="authorLastNameField">Author's Last Name: </label>
                <input id="authorLastNameField" type="text" name="author_last_name" value={formData.author_last_name} onChange={handleChange}></input>
                <br></br>
                <label htmlFor="genreField">Genre: </label>
                <input id="genreField" type="text" name="genre" value={formData.genre} onChange={handleChange} ></input>
                <br></br>
                <label htmlFor="bookImageField">Book Cover Image URL: </label>
                <input id="bookImageField" type="text" name="book_image" value={formData.book_image} onChange={handleChange}></input>
                <br></br>
                <label htmlFor="descriptionField">Description: </label>
                <textarea id="descriptionField" name="description" value={formData.description} onChange={handleChange}></textarea>
                <br></br>
                <button id="submitNewBookBtn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewBookForm