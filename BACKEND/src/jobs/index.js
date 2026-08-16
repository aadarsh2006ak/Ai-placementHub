const scheduleInterviewReminders = require('./interviewRemiander.job');
const scheduleJobAlerts = require('./jobAlert.job');
const scheduleTokenCleanup = require('./tokenCleanup.job');

module.exports = () => {
    scheduleInterviewReminders();
    scheduleJobAlerts();
    scheduleTokenCleanup();
};
