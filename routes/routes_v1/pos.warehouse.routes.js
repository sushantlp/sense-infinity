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
routes.post('/static', apiKeyAuth, PosWarehouseApiController.requestGetWarehouseStaticData);

// Keep Warehouse User And Employee Detail
routes.post('/secrets', apiKeyAuth, PosWarehouseApiController.requestKeepSecretData);

// Keep Warehouse Information
routes.post('/information', apiKeyAuth, PosWarehouseApiController.requestKeepWarehouseDetail);

// Keep Warehouse Stores Detail
routes.post('/stores', apiKeyAuth, PosWarehouseApiController.requestKeepStoreDetail);

// Get Staple Master Product
routes.get('/products', apiKeyAuth, PosWarehouseApiController.requestGetMasterProduct);

module.exports = routes;