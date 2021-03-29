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
            <li className="nav__link">
                    <NavLink exact to="/beer" className="nav__link">
                        <div>
                            Beers
                        </div>
                    </NavLink>
            </li>   
            <li className="nav__link">
                <NavLink exact to="/map">
                    <div >
                        Map
                    </div>
                </NavLink>
            </li>  
            <li className="nav__link">
                <NavLink exact to="/profile" className="nav__link">
                    <div>
                        Profile
                    </div>
                </NavLink>
            </li>    
        </ul>
                )}

                {!context.isLoggedIn && (
        <ul className="nav__list">
            <li className="nav__link">
                <NavLink exact to="/signin">
                <div>
                 Sign In
                </div>
                </NavLink> 
            </li>
        </ul>

                )}
        </nav>
    )
}

export default withUser(Navbar)
