const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const Schema = mongoose.Schema;


const userNotFoundError = () => {
    const err = new Error('User not found.');
    err.status = 401;
    return err;
};

const incorrectComboError = () => {
    const err = new Error('Incorrect email/password combination.');
    err.status = 401;
    return err;
};

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        trim: true,
        validate: {
            validator: v => /\S+@\S+\.\S{2,}/.test(v),
            message: '{VALUE} is not a valid email address'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: v => /\S{6,}/.test(v),
            message: 'Password must be at least 6 characters.'
        }
    },
    forgot_password_token: String,
    forgot_password_expires: Date
});

UserSchema.plugin(uniqueValidator, {
    message: 'Error: the {PATH} {VALUE} is already in use.'
});

UserSchema.pre('save', function(next) {
    const user = this;
    user.email = user.email.toLowerCase();
    const SALT_FACTOR = 10;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.statics.authenticate = function(email, password, callback) {
    this.findOne({ email: email.toLowerCase() }).then(user => {
        if (!user) {
            return callback(userNotFoundError());
        }
        bcrypt.compare(password, user.password).then(result => {
            if (!result) {
                return callback(incorrectComboError());
            }
            return callback(null, user);
        }).catch(e => console.log(e))
    }).catch(err => callback(err));
};

UserSchema.statics.change_password = function(email, old_password, new_password, callback) {
    this.findOne({ email: email.toLowerCase() }).then(user => {
        if (!user) {
            return callback(userNotFoundError());
        }
        bcrypt.compare(old_password, user.password).then(result => {
            if (!result) {
                return callback(incorrectComboError());
            }
            user.password = new_password;
            user.save().then(user => {
                return callback(null, user);
            });
        }).catch(e => console.log(e))
    }).catch(err => callback(err));
};

UserSchema.statics.forgot_password_start = function(email, callback) {
    this.findOne({ email: email.toLowerCase() }).then(user => {
        if (!user) {
            return callback(userNotFoundError());
        }
        const expires_date = new Date();
        expires_date.setHours(expires_date.getHours() + 1);
        user.forgot_password_token = uuidv4();
        user.forgot_password_expires = expires_date;
        user.save().then(user => {
            return callback(null, user);
        }).catch(err => callback(err));
    }).catch(err => callback(err));
};

UserSchema.statics.reset_password = function (email, new_password, token, callback) {
    this.findOne({ email: email.toLowerCase(), forgot_password_token: token }).then(user => {
        const now = new Date();
        if (!user) {
            return callback(userNotFoundError());
        }
        if (user.forgot_password_expires && now > user.forgot_password_expires) {
            const err = new Error('Invalid password reset token.');
            err.status = 401;
            return callback(err);
        }
        user.password = new_password;
        user.forgot_password_token = null;
        user.forgot_password_expires = null;
        user.save().then(user => {
            return callback(null, user);
        }).catch(err => callback(err));
    }).catch(err => callback(err));
};

const User = mongoose.model('User', UserSchema);

module.exports = {
    UserModel: User,
    UserSchema: UserSchema
};