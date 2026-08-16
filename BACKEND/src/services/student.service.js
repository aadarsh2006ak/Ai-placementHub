const studentProfileModel = require('../models/studentProfile.model');

async function getProfile(userId) {
    const profile = await studentProfileModel.findOne({ user: userId }).populate('user', 'name email role');
    if (!profile) {
        // Automatically create blank profile if not yet created
        const newProfile = new studentProfileModel({ user: userId });
        await newProfile.save();
        return await newProfile.populate('user', 'name email role');
    }
    return profile;
}

async function updateProfile(userId, data = {}) {
    let profile = await studentProfileModel.findOne({ user: userId });
    if (!profile) {
        profile = new studentProfileModel({ user: userId });
    }

    const {
        bio,
        skills,
        education,
        experience,
        github,
        phone,
        department,
        cgpa,
        graduationYear,
        atsScore,
        placementStatus
    } = data;

    if (phone !== undefined) profile.phone = phone;
    if (department !== undefined) profile.department = department;
    if (cgpa !== undefined) profile.cgpa = cgpa;
    if (graduationYear !== undefined) profile.graduationYear = graduationYear;
    if (atsScore !== undefined) profile.atsScore = atsScore;
    if (placementStatus !== undefined) profile.placementStatus = placementStatus;
    if (bio !== undefined) profile.bio = bio;
    if (github !== undefined) profile.github = github;
    if (education !== undefined) profile.education = education;
    if (experience !== undefined) profile.experience = experience;

    if (skills !== undefined) {
        if (Array.isArray(skills)) {
            profile.skills = skills;
        } else if (typeof skills === 'string') {
            profile.skills = skills.split(',').map((s) => s.trim()).filter(Boolean);
        } else {
            profile.skills = [String(skills)];
        }
    }

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
