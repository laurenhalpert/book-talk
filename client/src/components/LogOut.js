import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function LogOut({ onLogOut, user }) {

    function handleClick(e) {
        // console.log("log out clicked")
        // console.log(user)
        fetch(`/log_out`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(() => onLogOut())
        // console.log(user)
        // review if this is right for delete and also want to useHistory back to homepage
    }

    return (
        <div>
            <button id='logoutBtn' onClick={handleClick}>Log Out
            </button>
        </div>
    )
}

export default LogOut