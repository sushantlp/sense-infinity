/**
 * Pos Warehouse Routes
 */

// Import Package
const { Router } = require("express");

// Controllers (route handlers).
const PosWarehouseApiController = require("../../controllers/request.pos.warehouse.controller");

// Api Key Auth
const { apiKeyAuth } = require("../../services/api.key.auth");

const routes = new Router();

// Get Warehouse Static Data
routes.post(
  "/static",
  apiKeyAuth,
  PosWarehouseApiController.requestGetWarehouseStaticData
);

// Keep Warehouse User And Employee Detail
routes.post(
  "/secrets",
  apiKeyAuth,
  PosWarehouseApiController.requestKeepSecretData
);

// Keep Warehouse Information
routes.post(
  "/information",
  apiKeyAuth,
  PosWarehouseApiController.requestKeepWarehouseDetail
);

// Keep Warehouse Stores Detail
routes.post(
  "/stores",
  apiKeyAuth,
  PosWarehouseApiController.requestKeepStoreDetail
);

// Get Staple Master Product
//routes.get('/products', apiKeyAuth, PosWarehouseApiController.requestGetMasterProduct);

// Keep Staple Products Detail
routes.post(
  "/staple",
  apiKeyAuth,
  PosWarehouseApiController.requestKeepStapleProduct
);

// Keep Warehouse Products Detail
routes.post(
  "/products",
  apiKeyAuth,
  PosWarehouseApiController.requestKeepWarehouseProduct
);

// Keep Warehouse Discounts
routes.post(
  "/discounts",
  apiKeyAuth,
  PosWarehouseApiController.requestKeepDiscount
);

// Get Stores Invoice
routes.get(
  "/invoices",
  apiKeyAuth,
  PosWarehouseApiController.requestStoresInvoice
);

// Put Stores Invoice
routes.put(
  "/invoices",
  apiKeyAuth,
  PosWarehouseApiController.requestUpdateInvoice
);

// Post Warehouse Login-History
routes.post(
  "/login-history",
  apiKeyAuth,
  PosWarehouseApiController.requestWarehouseLoginHistory
);

// Post Warehouse Error-Log
routes.post(
  "/error-log",
  apiKeyAuth,
  PosWarehouseApiController.requestWarehouseErrorLog
);

// Get Store Stocks Record
routes.get("/stocks", apiKeyAuth, PosWarehouseApiController.requestStoreStock);

// Update Track Status Store Stocks Record
routes.put(
  "/stocks",
  apiKeyAuth,
  PosWarehouseApiController.updateTrackStatusStock
);

// Post Warehouse Stocks Record
routes.post(
  "/stocks",
  apiKeyAuth,
  PosWarehouseApiController.requestWarehouseStock
);

// Post Warehouse Stocks Log Record
routes.post(
  "/stock/logs",
  apiKeyAuth,
  PosWarehouseApiController.requestWarehouseStockLog
);

// Post Warehouse Supplier Detail
routes.post(
  "/supplier/detail",
  apiKeyAuth,
  PosWarehouseApiController.requestSupplierDetail
);

module.exports = routes;
