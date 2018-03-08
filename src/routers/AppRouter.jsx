import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Header from '../components/Header';
import HomePage from '../components/pages/HomePage';
import PricingPage from '../components/pages/PricingPage';
import ContactPage from '../components/pages/ContactPage';
import SignupPage from '../components/pages/SignupPage';
import LoginPage from '../components/pages/LoginPage';
import ForgotPasswordPage from '../components/pages/ForgotPasswordPage';
import ResetPasswordPage from '../components/pages/ResetPasswordPage';
import DashboardPage from '../components/pages/DashboardPage';


const AppRouter = () => {
    return (
        <Router>
            <div>
                <Header />

                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/pricing" component={PricingPage} />
                    <Route path="/contact" component={ContactPage} />
                    <PublicRoute path="/signup" component={SignupPage} />
                    <PublicRoute path="/login" component={LoginPage} />
                
                    <Route path="/forgotpassword" component={ForgotPasswordPage} />
                    <Route exact path="/resetpassword" component={() => <Redirect to="/forgotpassword" />} />
                    <Route path="/resetpassword/:uuid" component={ResetPasswordPage} />

                    <PrivateRoute path="/dashboard" component={DashboardPage} />
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;
