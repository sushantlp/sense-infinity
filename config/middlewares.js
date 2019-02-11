/**
 * Configuration of the server middlewares.
 */

// Import Package
// const express = require('express');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('errorhandler');
const cors = require('cors');

const isDev = process.env.NODE_ENV === 'development';

exports.default = app => {
  // Express configuration.
  app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
  app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

  if (isDev) app.use(morgan('dev'));

  app.use(cors());
  app.use(expressStatusMonitor());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(expressValidator());

  // Error Handler.
  app.use(errorHandler());
};
