const express = require('express');
const passport = require('passport');
const passportService = require('../config/passport');
const AuthController = require('../controllers/auth');
const OrganizationController = require('../controllers/organization');


const requireAuth = passport.authenticate('jwt', { session: false, failWithError: true });
const requireLogin = passport.authenticate('local', { session: false, failWithError: true });

module.exports = app => {
    const apiRoutes = express.Router();
    const authRoutes = express.Router();
    const organizationRoutes = express.Router();

    apiRoutes.use('/auth', authRoutes);
    apiRoutes.use('/org', organizationRoutes);

    authRoutes.post('/register', AuthController.register);
    authRoutes.post('/login', requireLogin, AuthController.login);
    authRoutes.get('/verify', requireAuth, AuthController.verify);
    authRoutes.post('/sendEmail', AuthController.sendEmail);
    authRoutes.post('/changepassword', requireAuth, AuthController.changePassword);
    authRoutes.post('/forgotpassword', AuthController.forgotPasswordStart);
    authRoutes.post('/resetpassword', AuthController.resetPassword);

    organizationRoutes.post('/create', OrganizationController.createOrganization);

    app.use('/api', apiRoutes);
};