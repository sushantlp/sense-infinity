/**
 * Infinity Reward Routes
 */

// Import Package
const {
  Router
} = require("express");

// Controllers (route handlers).
const rewardController = require("../../controllers/request.reward.controller");
const engageController = require('../../controllers/request.engage.controller');

// Jwt Auth
const {
  authJwt
} = require("../../services/jwt.auth");

const routes = new Router();

// Verify Membership Mobile
routes.post(
  "/verify/membership/mobile",
  rewardController.requestVerifyMemberMobile
);

// Register Membership Email
routes.post('/register/email', rewardController.requestRegisterEmail);

// Verify Otp
routes.post('/verify/otp', rewardController.requestVerifyOtp);

// Keep Customer Data
routes.post('/customer/data', rewardController.requestKeepCustomerData);

// Get Static Data
routes.get('/static', engageController.requestSenseStatic);

routes.get('/all/data', rewardController.requestGetAllData);

module.exports = routes;