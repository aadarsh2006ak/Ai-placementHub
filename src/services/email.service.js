const nodemailer = require('nodemailer');
const logger = require('../config/logger');

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT || 587;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

let transporter;

if (smtpHost && smtpUser && smtpPass) {
    transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort == 465,
        auth: {
            user: smtpUser,
            pass: smtpPass
        }
    });
    logger.info('SMTP Mail Transporter configured successfully.');
} else {
    logger.warn('SMTP credentials are not configured. Emails will be logged to console instead of sent.');
}

async function sendEmail({ to, subject, html, text }) {
    try {
        if (transporter) {
            const info = await transporter.sendMail({
                from: process.env.EMAIL_FROM || '"Placement Hub" <no-reply@placementhub.com>',
                to,
                subject,
                text,
                html
            });
            logger.info(`Email sent: ${info.messageId}`);
            return info;
        } else {
            logger.info(`[MOCK EMAIL] To: ${to} | Subject: ${subject}`);
            logger.debug(`[MOCK EMAIL CONTENT] text: ${text}`);
            return { messageId: 'mock-id-' + Date.now() };
        }
    } catch (err) {
        logger.error('Error sending email:', err);
        throw err;
    }
}

async function sendWelcomeEmail(user) {
    return await sendEmail({
        to: user.email,
        subject: 'Welcome to Placement Hub!',
        html: `<h1>Welcome, ${user.name}!</h1><p>Thank you for registering at Placement Hub. We are excited to help you find your dream career.</p>`,
        text: `Welcome, ${user.name}! Thank you for registering at Placement Hub.`
    });
}

async function sendInterviewReminder(student, company, job, interviewDate) {
    return await sendEmail({
        to: student.email,
        subject: `Reminder: Interview with ${company.companyName}`,
        html: `<h2>Interview Reminder</h2>
               <p>Hi ${student.name},</p>
               <p>This is a reminder that you have an upcoming interview with <strong>${company.companyName}</strong> for the <strong>${job.title}</strong> role.</p>
               <p><strong>Date & Time:</strong> ${new Date(interviewDate).toLocaleString()}</p>
               <p>Best of luck!</p>`,
        text: `Hi ${student.name}, this is a reminder that you have an upcoming interview with ${company.companyName} for the ${job.title} role on ${new Date(interviewDate).toLocaleString()}.`
    });
}

async function sendJobAlert(student, job, company) {
    return await sendEmail({
        to: student.email,
        subject: `New Job Match: ${job.title} at ${company.companyName}`,
        html: `<h2>New Job Alert Matching Your Profile</h2>
               <p>Hi ${student.name},</p>
               <p>A new job matching your skills has been posted:</p>
               <p><strong>${job.title}</strong> at <strong>${company.companyName}</strong> (${job.location})</p>
               <p>Salary: ${job.salary}</p>
               <p><a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/jobs/${job._id}">View and Apply Now</a></p>`,
        text: `Hi ${student.name}, a new job matching your skills has been posted: ${job.title} at ${company.companyName}.`
    });
}

module.exports = {
    sendEmail,
    sendWelcomeEmail,
    sendInterviewReminder,
    sendJobAlert
};
