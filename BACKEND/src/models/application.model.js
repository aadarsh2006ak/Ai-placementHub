const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['applied', 'reviewing', 'shortlisted', 'rejected', 'accepted', 'selected', 'hired'],
        default: 'applied'
    },
    notes: {
        type: String,
        default: ''
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    interviewDate: {
        type: Date
    }
}, { timestamps: true });

const applicationModel = mongoose.model('application', applicationSchema);

module.exports = applicationModel;
