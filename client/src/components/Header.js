import React, { useEffect, useState } from "react";
import LogIn from "./LogIn"
import SignUp from "./SignUp"

function Header(props) {
    return (
        <header>
            <h1>Book Talk</h1>
            <LogIn />
            <SignUp />
        </header>
    )
}

export default Header