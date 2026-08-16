const mongoose = require('mongoose');


const companyProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: 500
    },
    website: {
        type: String,
        match: [/^https?:\/\/.+/, 'Please enter a valid URL'],
    },
    location: {
        type: String
    },
    industry: {
        type: String
    },
    logo: {
        type: String,
        default: 'https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existing_id.png'
    },
}, { timestamps: true });

const companyProfileModel = mongoose.model('companyProfile', companyProfileSchema);

module.exports = companyProfileModel;