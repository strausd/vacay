import React from 'react';
import { connect } from 'react-redux';


class UserMenu extends React.Component {

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

// const mapDispatchToProps = dispatch => {
//     return {
//         loadUserData
//     };
// };

export default connect(mapStateToProps)(UserMenu);