/**
 * API Routes
 */

// Import Package
const { Router } = require('express');
const clubCard = require('./card.routes.js');

// Controllers (route handlers).
const signup = require('../../controllers/signup.controller');

const routes = new Router();

routes.use('/cards', clubCard);

// Verify Otp
routes.get('/otp/verify', signup.requestOtpVerify);

// Refresh Token
routes.post('/refresh/token', signup.requestRefreshToken);

module.exports = routes;
