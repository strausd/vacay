import React from 'react';
import { connect } from 'react-redux';

import { verifyLocalJWT } from '../actions/authActions';


class UserMenu extends React.Component {

    componentWillMount() {
        this.props.verifyLocalJWT();
    }

    render() {
        if (this.props.user) {
            return (
                <div>
                    Logged in - {this.props.user.first_name}
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
        verifyLocalJWT: () => dispatch(verifyLocalJWT())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);