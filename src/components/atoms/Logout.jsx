import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions'


export class Logout extends React.Component {

    handleLogout = (e) => {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        return (
            <div>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: data => dispatch(logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);