import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Header from '../components/Header';
import HomePage from '../components/pages/HomePage';
import PricingPage from '../components/pages/PricingPage';
import ContactPage from '../components/pages/ContactPage';
import SignupPage from '../components/pages/SignupPage';
import LoginPage from '../components/pages/LoginPage';
import DashboardPage from '../components/pages/DashboardPage';


const AppRouter = () => {
    return (
        <Router>
            <div>
                <Header />

                <Route exact path="/" component={HomePage} />
                <Route path="/pricing" component={PricingPage} />
                <Route path="/contact" component={ContactPage} />
                <Route path="/signup" component={SignupPage} />
                <Route path="/login" component={LoginPage} />
                <PrivateRoute path="/dashboard" component={DashboardPage} />
            </div>
        </Router>
    );
};

export default AppRouter;