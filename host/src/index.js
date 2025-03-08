require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const validateFirebaseToken = require('./middleware/auth');

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Request logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Import routes
const signinRouter = require('./routes/api/signin');
const inituserRouter = require('./routes/api/inituser');

// Public routes
app.use('/api/signin', signinRouter);
app.use('/api/inituser', inituserRouter);

// Protected routes - Apply auth middleware
app.use('/api', validateFirebaseToken);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found'
  });
});

;(async () => {
  const gameService = require('./services/game')
  await gameService.loadGameState()
  const PORT = 3001;
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})()