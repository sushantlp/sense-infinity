/**
 * Pos Store Routes
 */

// Import Package
const {
  Router
} = require('express');

// Controllers (route handlers).
const PosStoreApiController = require('../../controllers/request.pos.store.controller');
const PosWarehouseApiController = require('../../controllers/request.pos.warehouse.controller');


// Api Key Auth
const {
  apiKeyAuth
} = require('../../services/api.key.auth');


const routes = new Router();

// Get Store Static Data
routes.post('/static', apiKeyAuth, PosWarehouseApiController.requestGetWarehouseStaticData);

// Get Stores Record
routes.get('/stores', apiKeyAuth, PosStoreApiController.requestWarehouseStoreList);


module.exports = routes;