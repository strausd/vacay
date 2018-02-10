const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
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

const User = mongoose.model('User', UserSchema);

module.exports = User;