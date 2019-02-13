/**
 * Club Card Routes
 */

// Import Package
const {
  Router
} = require('express');

// Controllers (route handlers).
const SignupApiController = require('../../controllers/signup.controller');
const EngageApiController = require('../../controllers/request.engage.controller');

// Jwt Auth
const {
  authJwt
} = require('../../services/jwt.auth');

const routes = new Router();

// Merchant Verify
routes.post('/signup', SignupApiController.requestAppSignup);

// Keep Device Information
routes.post('/keep/device', authJwt, EngageApiController.requestKeepDeviceData);

// Keep Merchant Store Complain
routes.post('/keep/complain', authJwt, EngageApiController.requestKeepStoreComplain);

// Keep Customer Detail
routes.post('/keep/customer/detail', authJwt, EngageApiController.requestKeepCustomerDetail);

// Keep Feedback Survey
routes.post('/keep/feedback/survey', authJwt, EngageApiController.requestKeepFeedbackSurvey);

// Get Static Data
routes.get('/get/static', authJwt, EngageApiController.requestSenseStatic);

// Get Feedback
routes.get('/get/feedback', authJwt, EngageApiController.requestReadFeedbackData);

// Get Survey
routes.get('/get/survey', authJwt, EngageApiController.requestReadSurveyData);

// Get Customer Data
routes.get('/get/customer', authJwt, EngageApiController.requestReadCustomerData);


module.exports = routes;