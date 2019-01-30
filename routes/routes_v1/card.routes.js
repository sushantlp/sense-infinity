/**
 * Club Card Routes
 */

// Import Package
const {
  Router
} = require('express');

// Controllers (route handlers).
const signupController = require('../../controllers/signup.controller');
const engageController = require('../../controllers/request.engage.controller');

// Jwt Auth
const {
  authJwt
} = require('../../services/jwt.auth');

const routes = new Router();

// Merchant Verify
routes.post('/signup', signupController.requestAppSignup);

// Keep Device Information
routes.post('/keep/device', authJwt, engageController.requestKeepDeviceData);

// Keep Merchant Store Complain
routes.post('/keep/complain', authJwt, engageController.requestKeepStoreComplain);

// Keep Customer Detail
routes.post('/keep/customer/detail', engageController.requestKeepCustomerDetail);

// Keep Feedback Survey
routes.post('/keep/feedback/survey', authJwt, engageController.requestKeepFeedbackSurvey);

// Get Static Data
routes.get('/get/static', authJwt, engageController.requestSenseStatic);

// Get Feedback
routes.get('/get/feedback', authJwt, engageController.requestReadFeedbackData);

// Get Survey
routes.get('/get/survey', authJwt, engageController.requestReadSurveyData);

// Get Customer Data
routes.get('/get/customer', authJwt, engageController.requestReadCustomerData);


module.exports = routes;