import React, { useEffect, useState } from "react";

function NewBookForm(props) {
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

    return(
        <div>
            <form>
                <label htmlFor="titleField" >Title: </label>
                <input id="titleField" type="text" name="title" value={formData.title} onChange={handleChange}></input> 
                <br></br>
                <label htmlFor="authorFirstNameField">Author's First Name: </label>
                <input id="authorFirstNameField" type="text" name="author_first_name"></input>
                <label htmlFor="authorLastNameField">Author's Last Name: </label>
                <input id="authorLastNameField" type="text" name="author_last_name"></input>
                <br></br>
                <label htmlFor="genreField">Genre: </label>
                <input id="genreField" type="text" name="genre"></input>
                <br></br>
                <label htmlFor="bookImageField">Book Cover Image URL: </label>
                <input id="bookImageField" type="text" name="book_image"></input>
                <br></br>
                <label htmlFor="descriptionField">Description: </label>
                <textarea id="descriptionField" name="description"></textarea>
                <br></br>
                <button id="submitNewBookBtn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewBookForm