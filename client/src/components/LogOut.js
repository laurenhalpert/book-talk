import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function LogOut({ onLogOut, user }) {

    function handleClick(e) {
        
        fetch(`/log_out`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(() => onLogOut())
        
    }

    return (
        <div>
            <button id='logoutBtn' onClick={handleClick}>Log Out
            </button>
        </div>
    )
}

export default LogOut