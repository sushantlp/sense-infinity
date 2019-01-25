/**
 * Club Card Routes
 */

// Import Package
const { Router } = require('express');

// Controllers (route handlers).
const signup = require('../../controllers/signup.controller');
const requestEngage = require('../../controllers/request.engage.controller');

const routes = new Router();

/**
 * CRUD
 */
// routes.get('/', authJwt, PostController.getList);

module.exports = routes;
