import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { loadLocalJWT, verifyLocalJWT } from '../../actions/authActions';
import UserMenu from './UserMenu';
import HeaderAnonymous from './HeaderAnonymous';
import HeaderLoggedIn from './HeaderLoggedIn';


class Header extends React.Component {

    componentWillMount() {
        this.props.loadLocalJWT();
        this.props.verifyLocalJWT();
    }

    render() {
        return (
            <div>
                <div className="header">
                    <div className="header__content">
                        {this.props.isAuthenticated ? <HeaderLoggedIn /> : <HeaderAnonymous />}
                    </div>
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

const mapDispatchToProps = dispatch => {
    return {
        loadLocalJWT: () => dispatch(loadLocalJWT()),
        verifyLocalJWT: () => dispatch(verifyLocalJWT())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));