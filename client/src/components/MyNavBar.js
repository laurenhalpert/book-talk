import React from "react";

import { NavLink } from "react-router-dom";
import LogOut from "./LogOut";


function MyNavBar({ onLogOut }){

    

    return (
        <div id="myNavBar" className="nav">
            <LogOut onLogOut={onLogOut} />
            <span><NavLink to="/book_index" exact>
                Book Index
            </NavLink></span>
            <span><NavLink to="/my_book_index" exact>
                My Book Index
            </NavLink></span>
        </div>
    )
}

export default MyNavBar