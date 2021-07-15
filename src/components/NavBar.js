import React from 'react';
import {NavLink} from 'react-router-dom'


const NavBar = () => {
  return(
    <div className="nav-bar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>  
            <NavLink to="/Profile">Profile</NavLink>
    </div>

  )
};

export default NavBar;
