import React from 'react';
import { connect } from 'react-redux';

import Logout from './Logout';


class UserMenu extends React.Component {

    render() {
        if (this.props.user) {
            return (
                <div className="usermenu">
                    Hi, {this.props.user.first_name}
                    <Logout />
                </div>
            );
        } else {
            return (
                <div className="usermenu">
                    Not Logged In
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(UserMenu);