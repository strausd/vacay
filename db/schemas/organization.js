const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slugify = require('slugify');

const Schema = mongoose.Schema;
const UserSchema = require('./user').UserSchema;


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
    maintainers: [UserSchema],
    joined_date: {
        type: Date,
        default: Date.now
    }
});

OrganizationSchema.plugin(uniqueValidator, {
    message: 'Error: the {PATH} {VALUE} is already in use.'
});

OrganizationSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slug = slugify(this.name, { lower: true });
    }
    next();
});

const OrganizationModel = mongoose.model('Organization', OrganizationSchema);

module.exports = {
    OrganizationModel: OrganizationModel,
    OrganizationSchema: OrganizationSchema
};