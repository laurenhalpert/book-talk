import React, { useEffect, useState } from "react";
function Book({ book }) {
    return (
        <div>
            <h2>{book.title}</h2>
            <h3>By: {book.author_first_name} {book.author_last_name}</h3>
        </div>
    )
}

export default Book