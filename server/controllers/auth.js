const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const UserModel = require('../../db/schemas/user');
const config = require('../config/main');


const setUserInfo = user => {
    return {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    }
};

const generateToken = user => {
    return jwt.sign(user, config.secret, {
        expiresIn: 10080
    });
};

//========================================
// Login Route
//========================================
exports.login = (req, res, next) => {
    const userInfo = setUserInfo(req.user);

    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
}

//========================================
// Registration Route
//========================================
exports.register = function (req, res, next) {
    // Check for registration errors
    const email = req.body.email;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const password = req.body.password;

    // Return error if no email provided
    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address.' });
    }

    // Return error if full name not provided
    if (!first_name || !last_name) {
        return res.status(422).send({ error: 'You must enter your full name.' });
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({ error: 'You must enter a password.' });
    }

    UserModel.findOne({ email }, (err, existingUser) => {
        if (err) { return next(err); }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(422).send({ error: 'That email address is already in use.' });
        }
        const newUserPromise = UserModel.create({
            email,
            password,
            first_name,
            last_name
        });
        newUserPromise.then((newUser) => {
            const userInfo = setUserInfo(newUser);
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            });
        }).catch(error => next(error));
    });
}