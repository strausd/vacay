import React from 'react';
import { NavLink } from 'react-router-dom';


const Header = () => {
    return (
        <div>
            <ul>
                <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
            </ul>
        </div>
    );
};

export default Header;