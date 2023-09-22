import React from "react";
import NavBar from "./NavBar";

function Header(props) {
    return(
        <div>
            <header>
                <h1>Book Talk</h1>
                <NavBar />
            </header>
        </div>
    )
}

export default Header;