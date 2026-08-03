const jobModel = require('../models/job.model');
const companyProfileModel = require('../models/companyProfile.model');

async function createJob(userId, { title, description, requirements, salary, location, jobType, experienceLevel }) {
    const companyProfile = await companyProfileModel.findOne({ user: userId });
    if (!companyProfile) {
        const error = new Error('Please complete your company profile before posting a job');
        error.statusCode = 400;
        throw error;
    }

    const newJob = new jobModel({
        title,
        description,
        requirements: Array.isArray(requirements) ? requirements : requirements.split(',').map(r => r.trim()),
        salary,
        location,
        jobType,
        experienceLevel,
        company: companyProfile._id,
        postedBy: userId
    });

    await newJob.save();
    return newJob;
}

async function getJobs({ search, location, jobType, experienceLevel }) {
    let query = { active: true };

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { requirements: { $regex: search, $options: 'i' } }
        ];
    }

    if (location) {
        query.location = { $regex: location, $options: 'i' };
    }

    if (jobType) {
        query.jobType = jobType;
    }

    if (experienceLevel) {
        query.experienceLevel = experienceLevel;
    }

    return await jobModel.find(query)
        .populate({
            path: 'company',
            select: 'companyName logo website industry location'
        })
        .sort({ createdAt: -1 });
}

async function getJobById(id) {
    const job = await jobModel.findById(id)
        .populate({
            path: 'company',
            select: 'companyName description website industry location logo'
        });

    if (!job) {
        const error = new Error('Job not found');
        error.statusCode = 404;
        throw error;
    }

    return job;
}

async function updateJob(id, userId, role, data) {
    const job = await jobModel.findById(id);
    if (!job) {
        const error = new Error('Job not found');
        error.statusCode = 404;
        throw error;
    }

    if (job.postedBy.toString() !== userId.toString() && role !== 'admin') {
        const error = new Error('Not authorized to update this job listing');
        error.statusCode = 403;
        throw error;
    }

    const { title, description, requirements, salary, location, jobType, experienceLevel, active } = data;

    if (title !== undefined) job.title = title;
    if (description !== undefined) job.description = description;
    if (requirements !== undefined) job.requirements = Array.isArray(requirements) ? requirements : requirements.split(',').map(r => r.trim());
    if (salary !== undefined) job.salary = salary;
    if (location !== undefined) job.location = location;
    if (jobType !== undefined) job.jobType = jobType;
    if (experienceLevel !== undefined) job.experienceLevel = experienceLevel;
    if (active !== undefined) job.active = active;

    await job.save();
    return job;
}

async function deleteJob(id, userId, role) {
    const job = await jobModel.findById(id);
    if (!job) {
        const error = new Error('Job not found');
        error.statusCode = 404;
        throw error;
    }

    if (job.postedBy.toString() !== userId.toString() && role !== 'admin') {
        const error = new Error('Not authorized to delete this job listing');
        error.statusCode = 403;
        throw error;
    }

    await jobModel.findByIdAndDelete(id);
}

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob
};
