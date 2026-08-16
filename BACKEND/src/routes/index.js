const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const studentRoutes = require('./student.routes');
const companyRoutes = require('./company.routes');
const adminRoutes = require('./admin.routes');
const jobRoutes = require('./job.routes');
const aiRoutes = require('./ai.routes');

// Healthcheck & Ping
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Placement Hub API v1 is healthy and running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Mount Sub-routers
router.use('/auth', authRoutes);
router.use('/students', studentRoutes);
router.use('/companies', companyRoutes);
router.use('/admins', adminRoutes);
router.use('/jobs', jobRoutes);
router.use('/ai', aiRoutes);

module.exports = router;
