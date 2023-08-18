import React, { useEffect, useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";

// make user home page and create nav links for books, my books
function UserHome(){
    return(
        <div>
            <h1>Hello</h1>
            <NavLink to="/book_index" exact>
                All Books
            </NavLink>
            <NavLink to="/my_book_index" exact>
                My Books
            </NavLink>
        </div>
    )
}

export default UserHome