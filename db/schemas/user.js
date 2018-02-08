const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    age: Number,
    location: String,
    id: ObjectId
});

const User = mongoose.model('User', UserSchema);

module.exports = User;