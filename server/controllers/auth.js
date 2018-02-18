const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const UserModel = require('../../db/schemas/user');


const setUserInfo = user => {
    return {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    }
};

const generateToken = user => {
    return jwt.sign(user, String(process.env.SECRET), {
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
        success: true
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