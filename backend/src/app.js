const express = require('express');
const userRouter = require('./routers/user.route');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());


app.use('/api/users', userRouter);

module.exports = app;
