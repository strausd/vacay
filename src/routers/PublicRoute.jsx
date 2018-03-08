import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


export const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => {
    return (
        <Route {...rest} component={(props) => {
            if (isAuthenticated) {
                return <Redirect to="/dashboard" />;
            } else {
                return <Component {...props} />;
            }
        }} />
    );
};

const mapStateToProps = ({ auth }) => {
    return {
        isAuthenticated: auth.jwt ? true : false
    };
};

export default connect(mapStateToProps)(PublicRoute);