/**
 * API Routes
 */

// Import Package
const {
  Router
} = require('express');

// Import Route
const clubCard = require('./card.routes.js');
const reward = require('./reward.routes.js');
const warehouse = require('./pos.warehouse.routes.js');
// const store = require('./pos.store.routes.js');

// Controllers (route handlers).
const signupController = require('../../controllers/signup.controller');

const routes = new Router();

routes.use('/cards', clubCard);
routes.use('/rewards', reward);
routes.use('/warehouses', warehouse);
// routes.use('/stores', store);

// Verify Otp
routes.get('/otp/verify', signupController.requestOtpVerify);

// Refresh Token
routes.post('/refresh/token', signupController.requestRefreshToken);

module.exports = routes;