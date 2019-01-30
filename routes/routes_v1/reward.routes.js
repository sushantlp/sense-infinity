/**
 * Infinity Reward Routes
 */

// Import Package
const { Router } = require("express");

// Controllers (route handlers).
const rewardController = require("../../controllers/request.reward.controller");

// Jwt Auth
const { authJwt } = require("../../services/jwt.auth");

const routes = new Router();

// Verify Membership Mobile
routes.post(
  "/verify/membership/mobile",
  rewardController.requestVerifyMemberMobile
);

// Verify Membership Email
// routes.post('/verify/email', authJwt, rewardController.requestVerifyEmail);

module.exports = routes;
