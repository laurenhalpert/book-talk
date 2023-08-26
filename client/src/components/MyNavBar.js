import React from "react";
import ReactDOM from "react-dom";
import { useHistory, BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import LogOut from "./LogOut";


function MyNavBar({ onLogOut, user }){

    

    return (
        <div>
            <LogOut onLogOut={onLogOut} user={user} />
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