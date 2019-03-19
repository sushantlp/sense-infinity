/**
 * Club Card Routes
 */

// Import Package
const {
  Router
} = require('express');

// Controllers (route handlers).
const PosWarehouseApiController = require('../../controllers/request.pos.warehouse.controller');



const routes = new Router();

// Get Warehouse Static Data
routes.post('/static', PosWarehouseApiController.requestGetWarehouseStaticData);

// Keep Warehouse User And Employee Detail
// routes.post('/critical/detail', PosWarehouseApiController.requestKeepCriticalData);


module.exports = routes;