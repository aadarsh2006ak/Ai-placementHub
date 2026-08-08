const studentProfileModel = require('../models/studentProfile.model');

async function getProfile(userId) {
    const profile = await studentProfileModel.findOne({ user: userId }).populate('user', 'name email role');
    if (!profile) {
        const error = new Error('Student profile not found');
        error.statusCode = 404;
        throw error;
    }
    return profile;
}

async function updateProfile(userId, { bio, skills, education, experience, github }) {
    let profile = await studentProfileModel.findOne({ user: userId });
    if (!profile) {
        profile = new studentProfileModel({ user: userId });
    }

    if (bio !== undefined) profile.bio = bio;
    if (skills !== undefined) {
        if (Array.isArray(skills)) {
            profile.skills = skills;
        } else if (typeof skills === 'string') {
            profile.skills = skills.split(',').map(s => s.trim());
        } else {
            profile.skills = [String(skills)];
        }
    }
    if (education !== undefined) profile.education = education;
    if (experience !== undefined) profile.experience = experience;
    if (github !== undefined) profile.github = github;

    await profile.save();
    return profile;
}

async function setResume(userId, resumeUrl) {
    let profile = await studentProfileModel.findOne({ user: userId });
    if (!profile) {
        profile = new studentProfileModel({ user: userId });
    }
    profile.resume = resumeUrl;
    await profile.save();
    return profile;
}

module.exports = {
    getProfile,
    updateProfile,
    setResume
};
