import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Header from '../components/atoms/Header';
import HomePage from '../components/pages/HomePage';
import PricingPage from '../components/pages/PricingPage';
import ContactPage from '../components/pages/ContactPage';
import RegisterPage from '../components/pages/RegisterPage';
import LoginPage from '../components/pages/LoginPage';
import ForgotPasswordPage from '../components/pages/ForgotPasswordPage';
import ResetPasswordPage from '../components/pages/ResetPasswordPage';
import DashboardPage from '../components/pages/DashboardPage';
import RequestsPage from '../components/pages/RequestsPage';
import CalendarPage from '../components/pages/CalendarPage';


const AppRouter = () => {
    return (
        <Router>
            <div>
                <Header />

                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/pricing" component={PricingPage} />
                    <Route path="/contact" component={ContactPage} />
                    <PublicRoute path="/register" component={RegisterPage} />
                    <PublicRoute path="/login" component={LoginPage} />
                
                    <Route path="/forgotpassword" component={ForgotPasswordPage} />
                    <Route exact path="/resetpassword" component={() => <Redirect to="/forgotpassword" />} />
                    <Route path="/resetpassword/:uuid" component={ResetPasswordPage} />

                    <Redirect exact from="/:org_id" to="/:org_id/dashboard" />
                    <PrivateRoute path="/:org_id/dashboard" component={DashboardPage} />
                    <PrivateRoute path="/:org_id/requests" component={RequestsPage} />
                    <PrivateRoute path="/:org_id/calendar" component={CalendarPage} />
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;
