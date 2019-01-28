/**
 * Infinity Reward Routes
 */

// Import Package
const { Router } = require('express');

// Controllers (route handlers).
const signupController = require('../../controllers/signup.controller');
const engageController = require('../../controllers/request.engage.controller');

// Jwt Auth
const { authJwt } = require('../../services/jwt.auth');

const routes = new Router();

// Merchant Verify
routes.post('/signup', signupController.requestAppSignup);

// Keep Device Information
routes.post('/keep/device', authJwt, engageController.requestKeepDeviceData);



// Get Static Data
routes.get('/get/static', authJwt, engageController.requestSenseStatic);


module.exports = routes;
