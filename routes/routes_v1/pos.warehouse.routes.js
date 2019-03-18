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
routes.get('/static', PosWarehouseApiController.requestGetWarehouseStaticData);


module.exports = routes;