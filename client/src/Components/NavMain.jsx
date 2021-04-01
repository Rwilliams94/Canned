import React from 'react';
import { NavLink } from 'react-router-dom';
import withUser from "./Auth/withUser";
import "../Styles/NavMain.css";

const Navbar = (props) => {
    const { context } = props

    
    return (
        <nav className="navbar">

            {context.isLoggedIn && (
        <ul className="nav__list">
            <li>
                    <NavLink exact to="/beer" className="nav__link">
                        <div className="midthin">
                            Beers
                        </div>
                    </NavLink>
            </li>   
            <li>
                <NavLink exact to="/map" className="nav__link middle">
                    <div className="midthin">
                        Map
                    </div>
                </NavLink>
            </li>  
            <li>
                <NavLink exact to="/profile" className="nav__link">
                    <div className="midthin">
                        Profile
                    </div>
                </NavLink>
            </li>    
        </ul>
                )}

                {!context.isLoggedIn && (
        <ul className="nav__list">
            <li >
                <NavLink exact to="/signin" className="nav__link-half left">
                <div>
                 Sign In
                </div>
                </NavLink> 
            </li>
            <li >
                <NavLink exact to="/signup" className="nav__link-half">
                <div>
                 Sign Up
                </div>
                </NavLink> 
            </li>
        </ul>

                )}
        </nav>
    )
}

export default withUser(Navbar)
