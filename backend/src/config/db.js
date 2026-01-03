const mongoose = require('mongoose');
const logger = require('../utils/logger');
const env = require('./environment');

const MONGODB_URI = env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        logger.error('MongoDB connection failed:', error);
    }
}

module.exports = connectDB;