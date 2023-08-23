import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";

function MyNavBar(){
    return (
        <div>
            <NavLink to="/book_index" exact>
                Book Index
            </NavLink>
            <NavLink to="/my_book_index" exact>
                My Book Index
            </NavLink>
        </div>
    )
}
// make this proper links
export default MyNavBar