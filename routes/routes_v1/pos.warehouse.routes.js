/**
 * Club Card Routes
 */

// Import Package
const {
  Router
} = require('express');

// Controllers (route handlers).
const PosWarehouseApiController = require('../../controllers/request.pos.warehouse.controller');


// Api Key Auth
const {
  apiKeyAuth
} = require('../../services/api.key.auth');


const routes = new Router();

// Get Warehouse Static Data
routes.post('/static', PosWarehouseApiController.requestGetWarehouseStaticData);

// Keep Warehouse User And Employee Detail
routes.post('/critical', PosWarehouseApiController.requestKeepCriticalData);

// Keep Warehouse Stores Detail
routes.post('/stores', apiKeyAuth, PosWarehouseApiController.requestKeepStoreDetail);


module.exports = routes;