require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: ${envVar} is not set in environment variables`);
    process.exit(1);
  }
}

const PORT = process.env.PORT || 4000;

// Improved error handling for database connection
const startServer = async () => {
  try {
    await connectDB();
    console.log('Successfully connected to MongoDB');
    
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Handle graceful shutdown
    const shutdown = async () => {
      console.log('Received shutdown signal');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();