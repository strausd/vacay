import React from 'react';
import { NavLink } from 'react-router-dom';

import UserMenu from './UserMenu';


const HeaderLoggedIn = () => {
    return (
        <div>
            <ul>
                <li><NavLink exact to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
                <li><NavLink exact to="/requests" activeClassName="active">Requests</NavLink></li>
                <li><NavLink exact to="/calendar" activeClassName="active">Calendar</NavLink></li>
            </ul>
            <UserMenu />
        </div>
    );
};


export default HeaderLoggedIn;