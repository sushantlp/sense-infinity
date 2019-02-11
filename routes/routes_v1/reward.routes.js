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
routes.post('/customer/data', authJwt, rewardController.requestKeepCustomerData);

// Keep Reward Question Response
routes.post('/response', authJwt, rewardController.requestRewardResponse);

// Get Static Data
routes.get('/static', authJwt, engageController.requestSenseStatic);

// Get All Reward Question and Customer Data 
routes.get('/all/data', authJwt, rewardController.requestGetAllData);


module.exports = routes;