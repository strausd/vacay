import React from 'react';
import { connect } from 'react-redux';

import { loadLocalJWT, verifyLocalJWT } from '../../actions/authActions';
import Logout from './Logout';


class UserMenu extends React.Component {

    componentWillMount() {
        this.props.loadLocalJWT();
        this.props.verifyLocalJWT();
    }

    render() {
        if (this.props.user) {
            return (
                <div>
                    Hi, {this.props.user.first_name}
                    <Logout />
                </div>
            );
        } else {
            return (
                <div>
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

const mapDispatchToProps = dispatch => {
    return {
        loadLocalJWT: () => dispatch(loadLocalJWT()),
        verifyLocalJWT: () => dispatch(verifyLocalJWT())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);