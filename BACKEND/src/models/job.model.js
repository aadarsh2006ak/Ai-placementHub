const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String
    }],
    salary: {
        type: String,
        default: 'Not Specified'
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        default: 'Full-time'
    },
    experienceLevel: {
        type: String,
        default: 'Entry Level'
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companyProfile',
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const jobModel = mongoose.model('job', jobSchema);

module.exports = jobModel;
