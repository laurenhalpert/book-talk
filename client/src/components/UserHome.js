import React from "react";

import Header from "./Header";
import MyNavBar from "./MyNavBar";

function UserHome({ user, onLogOut }){
    
    
  
    return(
        <div>
            <Header />
            <MyNavBar onLogOut={onLogOut} user={user} />
            <h2>Welcome {user.username}!</h2>
            <img className="userPic" src={user.image_url} alt='user'></img>
        </div>
    )
}

export default UserHome