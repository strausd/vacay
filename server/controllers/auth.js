const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const UserModel = require('../../db/schemas/user');
const sendEmail = require('../config/nodemailer');


const setUserInfo = user => {
    return {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    }
};

const generateToken = user => {
    return jwt.sign(user, process.env.SECRET, {
        expiresIn: 86400
    });
};

//========================================
// Login Route
//========================================
exports.login = (req, res, next) => {
    const userInfo = setUserInfo(req.user);
    const token = 'JWT ' + generateToken(userInfo)

    res.status(200).send({
        token: token,
        user: userInfo
    });
}

exports.verify = (req, res, next) => {
    res.status(200).send({
        success: true,
        user: req.user
    });
}

exports.sendEmail = (req, res, next) => {
    mailOptions = {
        toAddress: req.body.toAddress,
        replyTo: req.body.replyTo || null,
        subject: req.body.subject,
        html: req.body.html
    };
    console.log(mailOptions);
    sendEmail(mailOptions).then(info => {
        console.log(info);
        res.status(200).send({
            success: true
        });
    }).catch(err => {
        console.log(err);
        res.status(200).send({
            success: false
        });
    });
}

exports.changePassword = (req, res, next) => {
    UserModel.change_password(req.user.email, req.body.old_password, req.body.new_password, (err, user) => {
        if (err) {
            return res.status(400).send({
                success: false,
                error: err
            });
        }
        return res.status(200).send({
            success: true
        });
    });
};

exports.forgotPasswordStart = (req, res, next) => {
    UserModel.forgot_password_start(req.body.email, (err, user) => {
        if (err) {
            return res.status(400).send({
                success: false,
                error: err
            });
        }
        return res.status(200).send({
            success: true,
            user
        });
    });
};

exports.resetPassword = (req, res, next) => {
    UserModel.reset_password(req.body.email, req.body.password, req.body.token, (err, user) => {
        if (err) {
            return res.status(400).send({
                success: false,
                error: err
            });
        }
        return res.status(200).send({
            success: true,
            user
        });
    });
};

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
    const userData = {
        email,
        password,
        first_name,
        last_name
    };
    const newUserPromise = UserModel.create(userData);
    newUserPromise.then((newUser) => {
        const userInfo = setUserInfo(newUser);
        return res.status(201).send({
            token: 'JWT ' + generateToken(userInfo),
            user: userInfo
        });
    }).catch(error => res.status(422).send(error));
}