const mongoose = require('mongoose');

const dbURI = 'mongodb://loc8r:loc8rpass@localhost:27017/loc8tr?authSource=admin';
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

const gracefulShutdown = async (msg, callback) => {
    try {
        await mongoose.connection.close();
    } catch (e) {
        // ignore close errors
    }
    console.log(`Mongoose disconnected through ${msg} `);
    callback();
};

// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app termination', () => {
        process.exit(0);
    });
});

// For uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception:', err.message);
    gracefulShutdown('uncaught exception', () => {
        process.exit(1);
    });
});

require('./locations');
