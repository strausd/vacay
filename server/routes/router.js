const express = require('express');
const passport = require('passport');
const passportService = require('../config/passport');
const AuthController = require('../controllers/auth');


const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = app => {
    const apiRoutes = express.Router();
    const authRoutes = express.Router();

    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register/', AuthController.register);

    authRoutes.post('/login', requireLogin, AuthController.login);

    app.use('/api', apiRoutes);
};