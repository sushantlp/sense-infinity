/**
 * Infinity Reward Routes
 */

// Import Package
const {
  Router
} = require("express");

// Controllers (route handlers).
const RewardApiController = require("../../controllers/request.reward.controller");
const EngageApiController = require('../../controllers/request.engage.controller');

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
routes.post('/register/email', RewardApiController.requestRegisterEmail);

// Verify Otp
routes.post('/verify/otp', RewardApiController.requestVerifyOtp);

// Keep Customer Data
routes.post('/customer/data', authJwt, RewardApiController.requestKeepCustomerData);

// Keep Reward Question Response
routes.post('/response', RewardApiController.requestRewardResponse);

// Get Static Data
routes.get('/static', authJwt, EngageApiController.requestSenseStatic);

// Get All Reward Question and Customer Data 
routes.get('/all/data', authJwt, RewardApiController.requestGetAllData);


module.exports = routes;