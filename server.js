'use strict';

require('dotenv').config();

// Module Dependencies.
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const dotEnv = require('dotenv');
const path = require('path');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const favicon = require('serve-favicon');
const robots = require('express-robots');
const CronJob = require('cron').CronJob;

const jsonWebToken = require('./middleware/jsonWebToken');

require('express-group-routes');

// Create Express server.
const app = express();

// Controllers (route handlers).
const database = require('./controllers/databaseController');
const signup = require('./controllers/signupController');
const requestEngage = require('./controllers/requestEngageController');

// Use morgan to log requests to the console
app.use(morgan('dev'));

// Express configuration.
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

app.use(expressStatusMonitor());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(
  sass({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public')
  })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(robots(path.join(__dirname, 'public', 'robots.txt')));
app.disable('etag');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Index Route
app.get('/', (req, res) => {
  return res.status(200).redirect('/index.html');
});

// app.use("/api", jsonWebToken.verifyJsonWebToken);

// Version 1 API
app.group('/api/v1', router => {
  // Verify Otp
  router.get('/otp/verify', signup.requestOtpVerify);

  // Refresh Token
  router.post('/refresh/token', signup.requestRefreshToken);

  // Club Card Route
  router.group('/cards', api => {
    // Merchant APP Signup
    api.post('/signup', signup.requestAppSignup);

    // Keep Device Information
    api.post('/keep/device', requestEngage.requestKeepDeviceData);

    // Keep Merchant Store Complain
    api.post('/keep/complain', requestEngage.requestKeepStoreComplain);

    // Keep Customer Detail
    api.post('/keep/customer/detail', requestEngage.requestKeepCustomerDetail);

    // Keep Feedback Survey
    api.post('/keep/feedback/survey', requestEngage.requestKeepFeedbackSurvey);

    // Get Static Data
    api.get('/get/static', requestEngage.requestSenseStatic);

    // Get Feedback
    api.get('/get/feedback', requestEngage.requestReadFeedbackData);

    // Get Survey
    api.get('/get/survey', requestEngage.requestReadSurveyData);

    // Get Customer Data
    api.get('/get/customer', requestEngage.requestReadCustomerData);
  });
});

// Call Sequelize Connection
database.sequelizeConnection();

// Error Handler.
app.use(errorHandler());

// Start Express server.
app.listen(app.get('port'), () => {
  console.log(
    chalk.green.bold(
      `
        Yep this is working 🍺
        App listen on port: ${process.env.PORT} 🍕
        Env: ${process.env.NODE_ENV} 🦄
      `
    )
  );
});

app.all('*', function(req, res) {
  res.redirect(process.env.BASE_URL);
});

// new CronJob(
//   "30 * * * * *",
//   function() {
//     // Execute code here
//     cron.logicCronScheduling();
//     console.log("Hello");
//   },
//   null,
//   true,
//   "Asia/Kolkata"
// );

// Export
module.exports = app;
