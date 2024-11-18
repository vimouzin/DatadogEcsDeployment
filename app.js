// Load Datadog tracing before any other modules
const tracer = require('dd-trace').init({
    service: process.env.DD_SERVICE || 'default-service-name',
    env: process.env.DD_ENV || 'development',
    version: process.env.DD_VERSION || '1.0.0',
    logInjection: process.env.DD_LOGS_INJECTION === 'true',
    analytics: true, // Optional: Enable trace analytics
  });
  
  
  // Import the necessary libraries
  const express = require('express');
  const winston = require('winston');
  
  // Initialize the application
  const app = express();
  const PORT = process.env.PORT || 3000;
  
  // Configure Winston logger with Datadog log injection
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.json()  // Format logs as JSON
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.json(), // Use JSON format for console output
      }),
    ],
  })
  
  
  // Sample route for testing logs and traces
  app.get('/', (req, res) => {
    logger.info('Root route accessed', { route: '/', method: 'GET' });
    logger.info("test vitor");
  
    // Simulating a traced operation
    tracer.trace('sample.operation', () => {
      // Perform some operation here
      logger.info('Operation within trace', { operation: 'sample.operation' });
    });
  
    res.send('Hello from Datadog-traced Node app!');
  });
  
  // Route to simulate an error log and trace
  app.get('/error', (req, res) => {
    logger.error('Error route accessed', { route: '/error', method: 'GET' });
    tracer.trace('error.operation', () => {
      throw new Error('Simulated error for tracing');
    });
    res.status(500).send('Error route triggered');
  });
  
  // Start the server
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
  