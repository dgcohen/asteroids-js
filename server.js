const {createServer} = require('http');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

const app = express();

// Determine environment
const dev = app.get('env') !== 'production';

if (!dev) {
  // Avoid security vulnerability
  app.disable('x-powered-by');
  app.use(compression());

  // Logging
  app.use(morgan('common'));

  // Default to index page
  app.use(express.static(path.resolve(__dirname, 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

if (dev) {
  app.use(morgan('dev'));
}

const server = createServer(app);

server.listen(PORT, err => {
  if (err) throw err;

  console.log('Server started');
});