const userModel = require('../models/user.model');
const jobModel = require('../models/job.model');
const applicationModel = require('../models/application.model');
const studentProfileModel = require('../models/studentProfile.model');
const companyProfileModel = require('../models/companyProfile.model');

async function getDashboardStats() {
    const totalStudents = await userModel.countDocuments({ role: 'student' });
    const totalCompanies = await userModel.countDocuments({ role: 'company' });
    const totalJobs = await jobModel.countDocuments();
    const totalApplications = await applicationModel.countDocuments();

    // Application status breakdown
    const statusBreakdown = await applicationModel.aggregate([
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ]);

    // Jobs by type breakdown
    const jobTypeBreakdown = await jobModel.aggregate([
        {
            $group: {
                _id: '$jobType',
                count: { $sum: 1 }
            }
        }
    ]);

    // Recent job postings
    const recentJobs = await jobModel.find()
        .populate('company', 'companyName')
        .sort({ createdAt: -1 })
        .limit(5);

    // Recent applications
    const recentApplications = await applicationModel.find()
        .populate('student', 'name email')
        .populate({
            path: 'job',
            select: 'title',
            populate: { path: 'company', select: 'companyName' }
        })
        .sort({ createdAt: -1 })
        .limit(5);

    return {
        counts: {
            students: totalStudents,
            companies: totalCompanies,
            jobs: totalJobs,
            applications: totalApplications
        },
        applicationsStatus: statusBreakdown,
        jobTypes: jobTypeBreakdown,
        recentJobs,
        recentApplications
    };
}

async function getAllUsers({ search, role, page = 1, limit = 10 }) {
    let query = {};

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }

    if (role) {
        query.role = role;
    }

    const skip = (page - 1) * limit;

    const users = await userModel.find(query)
        .select('-passwordHash')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await userModel.countDocuments(query);

    return {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        users
    };
}

async function deleteUser(id, currentUserId) {
    const user = await userModel.findById(id);
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    if (user._id.toString() === currentUserId.toString()) {
        const error = new Error('Admin cannot delete their own account');
        error.statusCode = 400;
        throw error;
    }

    const userId = user._id;

    if (user.role === 'student') {
        await studentProfileModel.deleteOne({ user: userId });
        await applicationModel.deleteMany({ student: userId });
    } else if (user.role === 'company') {
        const companyProfile = await companyProfileModel.findOne({ user: userId });
        if (companyProfile) {
            const jobs = await jobModel.find({ company: companyProfile._id });
            const jobIds = jobs.map(j => j._id);
            
            await jobModel.deleteMany({ company: companyProfile._id });
            await applicationModel.deleteMany({ job: { $in: jobIds } });
            await companyProfileModel.deleteOne({ user: userId });
        }
    }

    await userModel.findByIdAndDelete(userId);
}

module.exports = {
    getDashboardStats,
    getAllUsers,
    deleteUser
};
