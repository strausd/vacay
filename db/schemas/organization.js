const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    maintainers: [],
    joined_date: {
        type: Date,
        default: Date.now
    }
});

OrganizationSchema.plugin(uniqueValidator, {
    message: 'Error: the {PATH} {VALUE} is already in use.'
});

const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;