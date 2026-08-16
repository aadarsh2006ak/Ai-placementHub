const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    phone: {
        type: String,
        trim: true,
        default: ''
    },
    department: {
        type: String,
        trim: true,
        default: ''
    },
    cgpa: {
        type: String,
        trim: true,
        default: ''
    },
    graduationYear: {
        type: String,
        trim: true,
        default: ''
    },
    bio: {
        type: String,
        maxlength: 500,
        default: ''
    },
    skills: [{
        type: String
    }],
    atsScore: {
        type: Number,
        min: 0,
        max: 100,
        default: null
    },
    placementStatus: {
        type: String,
        default: 'Active Applicant'
    },
    education: [{
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startDate: Date,
        endDate: Date
    }],
    experience: [{
        company: String,
        position: String,
        description: String,
        startDate: Date,
        endDate: Date
    }],
    resume: {
        type: String,
        default: ''
    },
    github: {
        type: String,
        default: ''
    },
}, { timestamps: true });

const studentProfileModel = mongoose.model('studentProfile', studentProfileSchema);

module.exports = studentProfileModel;