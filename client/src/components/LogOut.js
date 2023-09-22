import React from "react";


function LogOut({ onLogOut }) {

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