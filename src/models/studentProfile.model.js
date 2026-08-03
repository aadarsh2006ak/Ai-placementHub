const mongoose = require('mongoose');


const studentProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    bio: {
        type: String,
        maxlength: 200
    },
    skills: [{
        type: String
    }],
    education: [{
        institution: {
            type: String
        },
        degree: {
            type: String
        },
        fieldOfStudy: {
            type: String
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        }
    }],
    experience: [{
        company: {
            type: String
        },
        position: {
            type: String
        },
        description: {
            type: String
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        }
    }],
    resume: {
        type: String,
        default: ''
    },
    github: {
        type: String,
        match: [/^https?:\/\/.+/, 'Please enter a valid URL'],
    },
}, { timestamps: true });

const studentProfileModel = mongoose.model('studentProfile', studentProfileSchema);

module.exports = studentProfileModel;