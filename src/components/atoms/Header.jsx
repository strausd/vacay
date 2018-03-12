import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import UserMenu from './UserMenu';


class Header extends React.Component {

    render() {
        return (
            <div>
                <div className="header">
                    <div className="header__content">
                        <ul>
                            <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                            <li><NavLink exact to="/pricing" activeClassName="active">Pricing</NavLink></li>
                            <li><NavLink exact to="/contact" activeClassName="active">Contact</NavLink></li>
                            {this.props.isAuthenticated ? null : <li><NavLink exact to="/signup" activeClassName="active">Signup</NavLink></li>}
                            {this.props.isAuthenticated ? null : <li><NavLink exact to="/login" activeClassName="active">Login</NavLink></li>}
                            {!this.props.isAuthenticated ? null : <li><NavLink exact to="/dashboard" activeClassName="active">Dashboard</NavLink></li>}
                        </ul>
                        <UserMenu />
                    </div>
                    <div className="header__transition"></div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.jwt ? true : false
    };
};

export default withRouter(connect(mapStateToProps)(Header));