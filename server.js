require("dotenv").config();
const http = require('http');
const app = require('./src/app');
const connectDB = require('./src/config/db');
const { initSocket } = require('./src/sockets');
const startJobs = require('./src/jobs');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// Initialize Sockets
initSocket(server);

// Start Cron background jobs
startJobs();

connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to the database', err);
        process.exit(1);
    });

