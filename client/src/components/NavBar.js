import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";

function NavBar(){
    return (
        <div>
            <NavLink to="/" exact>
                Home
            </NavLink>
        </div>
    )
}

export default NavBar