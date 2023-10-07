import React from "react";

import Header from "./Header";
import MyNavBar from "./MyNavBar";

import { useSelector } from 'react-redux';

function UserHome({ onLogOut }){
    
    const user = useSelector((state) => state.user)
    
    return(
        <div>
            <Header />
            <MyNavBar onLogOut={onLogOut} />
            <h2>Welcome {user.username}!</h2>
            <img className="userPic" src={user.image_url} alt='user'></img>
        </div>
    )
}

export default UserHome