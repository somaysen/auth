require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const logger = require('./src/utils/logger');
const env = require('./src/config/environment');

const PORT = env.PORT;

// Improved error handling for database connection
const startServer = async () => {
  try {
    await connectDB();
    logger.info('Successfully connected to MongoDB');
    
    const server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });

    // Handle graceful shutdown
    const shutdown = async () => {
      logger.info('Received shutdown signal');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();