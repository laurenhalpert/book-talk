import React, { useEffect, useState } from "react";

function BookIndex({ books }){
    return(
        <div>
            <p>books here</p>
            {books.map(book=>{
                return (
                    <p>{book.title}</p>
                )
            })}
        </div>
    )
}
export default BookIndex