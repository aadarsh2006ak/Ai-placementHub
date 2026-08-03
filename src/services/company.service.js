const companyProfileModel = require('../models/companyProfile.model');

async function getProfile(userId) {
    const profile = await companyProfileModel.findOne({ user: userId }).populate('user', 'name email role');
    if (!profile) {
        const error = new Error('Company profile not found');
        error.statusCode = 404;
        throw error;
    }
    return profile;
}

async function updateProfile(userId, { description, website, location, industry }) {
    let profile = await companyProfileModel.findOne({ user: userId });
    if (!profile) {
        const error = new Error('Company profile not found. Complete registration first.');
        error.statusCode = 404;
        throw error;
    }

    if (description !== undefined) profile.description = description;
    if (website !== undefined) profile.website = website;
    if (location !== undefined) profile.location = location;
    if (industry !== undefined) profile.industry = industry;

    await profile.save();
    return profile;
}

async function setLogo(userId, logoUrl) {
    const profile = await companyProfileModel.findOne({ user: userId });
    if (!profile) {
        const error = new Error('Company profile not found');
        error.statusCode = 404;
        throw error;
    }
    profile.logo = logoUrl;
    await profile.save();
    return profile;
}

module.exports = {
    getProfile,
    updateProfile,
    setLogo
};
