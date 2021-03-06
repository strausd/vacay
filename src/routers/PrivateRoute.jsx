import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';


export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
    return (
        <Route {...rest} component={(props) => {
            if (isAuthenticated) {
                return <Component {...props} />;
            } else {
                return <Redirect to="/login" />;
            }
        }} />
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.jwt ? true : false
    };
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));