const aiService = require('../services/ai.service');
const studentService = require('../services/student.service');
const jobService = require('../services/job.service');

async function analyzeResume(req, res, next) {
    try {
        let { resumeText, jobDescription, jobId } = req.body;

        // If no custom resumeText is supplied, try reading student's profile skills/bio
        if (!resumeText && req.user && req.user.role === 'student') {
            const profile = await studentService.getProfile(req.user._id);
            if (profile) {
                const skillsStr = (profile.skills || []).join(', ');
                const bioStr = profile.bio || '';
                resumeText = `Candidate: ${req.user.name}\nSkills: ${skillsStr}\nBio: ${bioStr}\nResume Document URL: ${profile.resume || 'Available'}`;
            }
        }

        // If jobId is provided, retrieve JD
        if (jobId && !jobDescription) {
            const job = await jobService.getJobById(jobId);
            if (job) {
                jobDescription = `Role: ${job.title}\nRequirements: ${(job.requirements || []).join(', ')}\nDescription: ${job.description}`;
            }
        }

        if (!jobDescription) {
            jobDescription = 'General Software Engineering / Full Stack Developer role requiring React, Node.js, REST APIs, Database Management, and Problem Solving skills.';
        }

        const result = await aiService.analyzeResume(resumeText || 'Software Developer with experience in web technologies.', jobDescription);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (err) {
        next(err);
    }
}

async function analyzeSkillGap(req, res, next) {
    try {
        let { skills, jobDescription, jobId } = req.body;

        if (!skills && req.user && req.user.role === 'student') {
            const profile = await studentService.getProfile(req.user._id);
            skills = profile?.skills || [];
        }

        if (jobId && !jobDescription) {
            const job = await jobService.getJobById(jobId);
            if (job) {
                jobDescription = `Role: ${job.title}\nRequirements: ${(job.requirements || []).join(', ')}\nDescription: ${job.description}`;
            }
        }

        if (!jobDescription) {
            jobDescription = 'Full Stack Developer with React, Node.js, Express, MongoDB, Docker, TypeScript, AWS, CI/CD pipelines.';
        }

        const result = await aiService.analyzeSkillGap(skills || [], jobDescription);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (err) {
        next(err);
    }
}

async function generateInterviewQuestions(req, res, next) {
    try {
        const { jobTitle = 'Software Engineer', jobDescription = 'Web Application Developer', numQuestions = 5 } = req.body;
        const result = await aiService.generateMockQuestions(jobTitle, jobDescription, numQuestions);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    analyzeResume,
    analyzeSkillGap,
    generateInterviewQuestions
};
