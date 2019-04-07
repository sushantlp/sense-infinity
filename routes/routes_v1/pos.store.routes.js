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

// Get All Stores Record
routes.get('/stores', apiKeyAuth, PosStoreApiController.requestWarehouseStoreList);

// Get All Stores Record
routes.get('/stores/:storeCode([0-9]+)', apiKeyAuth, PosStoreApiController.requestStoreRecord);

// Get Warehouse Information Record
routes.get('/warehouse', apiKeyAuth, PosStoreApiController.requestWarehouseRecord);

// Get Stores Employee Record
routes.get('/employees/:storeCode([0-9]+)', apiKeyAuth, PosStoreApiController.requestEmployeeRecord);

module.exports = routes;