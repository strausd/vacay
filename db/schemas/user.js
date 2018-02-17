const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


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
    age: String,
    email: {
        type: String,
        required: true,
        unique: true,
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
    id: ObjectId
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {
    const user = this;
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
})

UserSchema.statics.authenticate = function(email, password, callback) {
    this.findOne({ email }).then(user => {
        if (!user) {
            const err = new Error('User not found.');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.password).then(result => {
            if (!result) {
                return callback('Incorrect email/password combination.');
            }
            return callback(null, user);
        }).catch(e => console.log(e))
    }).catch(err => callback(err));
}

const User = mongoose.model('User', UserSchema);

module.exports = User;