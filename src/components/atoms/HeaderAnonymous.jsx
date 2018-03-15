import React from 'react';
import { NavLink } from 'react-router-dom';


const HeaderAnonymous = () => {
    return (
        <div>
            <ul>
                <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                <li><NavLink exact to="/pricing" activeClassName="active">Pricing</NavLink></li>
                <li><NavLink exact to="/contact" activeClassName="active">Contact</NavLink></li>
                <li><NavLink exact to="/signup" activeClassName="active">Signup</NavLink></li>
                <li><NavLink exact to="/login" activeClassName="active">Login</NavLink></li>
            </ul>
        </div>
    );
};

export default HeaderAnonymous;