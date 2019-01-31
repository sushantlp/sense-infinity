/**
 * Infinity Reward Routes
 */

// Import Package
const {
  Router
} = require("express");

// Controllers (route handlers).
const rewardController = require("../../controllers/request.reward.controller");

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

module.exports = routes;