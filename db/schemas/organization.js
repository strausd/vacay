const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slugify = require('slugify');

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
    joined_date: {
        type: Date,
        default: Date.now
    },
    confirm_by: {
        type: Date,
        required: false
    }
});

OrganizationSchema.virtual('members', {
    ref: 'User',
    localField: '_id',
    foreignField: 'organization'
});

OrganizationSchema.plugin(uniqueValidator, {
    message: 'Error: the {PATH} {VALUE} is already in use.'
});

OrganizationSchema.pre('save', function(next) {
    if (this.isNew) {
        const now = new Date();
        now.setDate(now.getDate() + 3);
        this.confirm_by = now;
    }
    next();
})

OrganizationSchema.pre('validate', function(next) {
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