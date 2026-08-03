const adminService = require('../services/admin.service');

async function getDashboardStats(req, res, next) {
    try {
        const stats = await adminService.getDashboardStats();
        res.status(200).json({ success: true, stats });
    } catch (err) {
        next(err);
    }
}

async function getAllUsers(req, res, next) {
    try {
        const result = await adminService.getAllUsers(req.query);
        res.status(200).json({ success: true, ...result });
    } catch (err) {
        next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        await adminService.deleteUser(req.params.id, req.user._id);
        res.status(200).json({ success: true, message: 'User and all associated profile, jobs, and application data have been deleted.' });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getDashboardStats,
    getAllUsers,
    deleteUser
};
