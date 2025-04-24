  
  // Import the necessary libraries
  const express = require('express');  const winston = require('winston');
  
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
    res.send('Hello from Datadog-traced Node app!');
  });
  
  // Route to simulate an error log and trace
  app.get('/error', (req, res) => {
    logger.error('Error route accessed', { route: '/error', method: 'GET' });
    res.status(500).send('Error route triggered');
  });
  
  // Start the server
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
  