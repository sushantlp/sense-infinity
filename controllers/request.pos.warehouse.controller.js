"use strict";

// Import Controller
const posWarehouseController = require("./logic.pos.warehouse.controller");
const validateController = require("./validate.controller");
const shareController = require("./share.controller");

// Request Get Warehouse Static Data
module.exports.requestGetWarehouseStaticData = (req, res) => {
  if (
    req.body.version !== undefined &&
    req.body.version !== "" &&
    res.userKey !== undefined &&
    res.userKey !== ""
  ) {
    // Validate Warehouse Static Version
    const validate = validateController.warehouseStaticVersion(
      req.body.version
    );

    if (!validate.success) return res.status(400).send(validate.msg);

    // Logic Pos Warehouse Controller
    return posWarehouseController
      .logicWarehouseStaticData(req.body.version, res.userKey)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/warehouses/static",
              200,
              response.success,
              response.version
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");
};

// Request Keep Warehouse User Employee Data
module.exports.requestKeepSecretData = (req, res) => {
  if (
    req.body.secrets !== undefined &&
    req.body.secrets !== "" &&
    res.userKey !== undefined &&
    res.userKey !== ""
  ) {
    // Validate Warehouse Secrets
    const validate = validateController.warehouseSecrets(req.body.secrets);

    if (!validate.success) return res.status(400).send(validate.msg);

    // Logic Keep Secret Data
    return posWarehouseController
      .logicKeepSecretData(req.body.secrets, res.userKey)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/warehouses/secrets",
              200,
              response.success,
              {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");
};

// Request Keep Warehouse Stores Detail
module.exports.requestKeepStoreDetail = (req, res) => {
  if (
    req.body.stores !== undefined &&
    req.body.stores !== "" &&
    res.userKey !== undefined &&
    res.userKey !== ""
  ) {
    // Validate Warehouse Stores Parameter
    const validate = validateController.warehouseStores(req.body.stores);

    if (!validate.success) return res.status(400).send(validate.msg);

    // Logic Keep Warehouse Stores
    return posWarehouseController
      .logicKeepStoreDetail(req.body.stores, res.userKey)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/warehouses/stores",
              200,
              response.success,
              {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");
};

// Request Keep Warehouse Detail
module.exports.requestKeepWarehouseDetail = (req, res) => {
  if (
    req.body.warehouses !== undefined &&
    req.body.warehouses !== "" &&
    res.userKey !== undefined &&
    res.userKey !== ""
  ) {
    // Validate Warehouse Detail Parameter
    const validate = validateController.warehouseDetail(req.body.warehouses);

    if (!validate.success) return res.status(400).send(validate.msg);

    // Logic Keep Warehouse Detail
    return posWarehouseController
      .logicKeepWarehouseDetail(req.body.warehouses, res.userKey)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/warehouses/information",
              200,
              response.success,
              {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");
};

// Request Keep Warehouse Products Detail
module.exports.requestKeepWarehouseProduct = (req, res) => {
  if (
    res.userKey !== undefined &&
    res.userKey !== "" &&
    req.body.products !== undefined &&
    req.body.products !== ""
  ) {
    // Validate Warehouse Product Detail Parameter
    const validate = validateController.warehouseProductDetail(
      req.body.products
    );

    if (!validate.success) return res.status(400).send(validate.msg);

    // Logic Get Staple Master Product
    return posWarehouseController
      .logicKeepWarehouseProduct(res.userKey, req.body.products)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/warehouses/products",
              200,
              response.success,
              {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");
};

// Request Keep Staple Master Product
module.exports.requestKeepStapleProduct = (req, res) => {
  if (
    res.userKey !== undefined &&
    res.userKey !== "" &&
    req.body.products !== undefined &&
    req.body.products !== ""
  ) {
    // Validate Staple Product Detail Parameter
    const validate = validateController.stapleProductDetail(req.body.products);

    if (!validate.success) return res.status(400).send(validate.msg);

    // Logic Keep Staple Master Product
    return posWarehouseController
      .logicKeepStapleProduct(res.userKey, req.body.products)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/warehouses/staple",
              200,
              response.success,
              {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");
};

// Request Keep Warehouse Discount
module.exports.requestKeepDiscount = (req, res) => {
  if (
    res.userKey !== undefined &&
    res.userKey !== "" &&
    req.body.bill_discounts !== undefined &&
    req.body.bill_discounts !== "" &&
    req.body.product_discounts !== undefined &&
    req.body.product_discounts !== ""
  ) {
    // Validate Warehouse Bill And Product Discount
    const validate = validateController.warehouseDiscount(
      req.body.bill_discounts,
      req.body.product_discounts
    );

    if (!validate.success) return res.status(400).send(validate.msg);

    // Logic Keep Warehouse Discount
    return posWarehouseController
      .logicKeepDiscount(
        res.userKey,
        req.body.bill_discounts,
        req.body.product_discounts
      )
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/warehouses/discounts",
              200,
              response.success,
              {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");
};

// Request Get Stores Invoice
module.exports.requestStoresInvoice = (req, res) => {
  if (res.userKey !== undefined && res.userKey !== "") {
    // Logic Get Stores Invoice
    return posWarehouseController
      .logicGetInvoice(res.userKey)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/warehouses/invoices",
              200,
              response.success,
              response.count
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");
};

// Request Warehouse Login History
module.exports.requestWarehouseLoginHistory = (req, res) => {
  if (
    res.userKey !== undefined &&
    res.userKey !== "" &&
    req.body.history !== undefined &&
    req.body.history !== ""
  ) {
    // Validate Login History Parameter
    const validate = validateController.validateLoginHistory(req.body.history);

    if (!validate.success) return res.status(400).send(validate.msg);

    // Logic Warehouse Login History
    return posWarehouseController
      .logicWarehouseLoginHistory(res.userKey, req.body.history)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              `/api/v1/warehouse/login-history`,
              200,
              response.success,
              {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");
};

// Request Write Warehouse Error Log
module.exports.requestWarehouseErrorLog = (req, res) => {
  if (
    res.userKey !== undefined &&
    res.userKey !== "" &&
    req.body.errors !== undefined &&
    req.body.errors !== ""
  ) {
    // Validate Warehouse Error Log
    const validate = validateController.validateErrorLog(req.body.errors);

    if (!validate.success) return res.status(400).send(validate.msg);

    // Logic Warehouse Error Log
    return posWarehouseController
      .logicWarehouseErrorLog(res.userKey, req.body.errors)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              `/api/v1/warehouse/error-log`,
              200,
              response.success,
              {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");
};

// Request Track Status Change
module.exports.requestUpdateInvoice = (req, res) => {
  if (res.userKey !== undefined && res.userKey !== "") {
    // Logic Track Status Change
    return posWarehouseController
      .logicUpdateInvoice(res.userKey)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              `/api/v1/warehouse/invoices`,
              200,
              response.success,
              {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");
};

// Request Get Store Stocks
module.exports.requestStoreStocks = (req, res) => {
  if (res.userKey !== undefined && res.userKey !== "") {
    // Logic Get Store Stocks
    return posWarehouseController
      .logicStoreStocks(res.userKey)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              `/api/v1/warehouse/stocks`,
              200,
              response.success,
              response.count
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");
};

// Update Track Status Store Stocks Record
module.exports.updateTrackStatusStocks = (req, res) => {
  if (res.userKey !== undefined && res.userKey !== "") {
    // Logic Track Status Store Stocks Record
    return posWarehouseController
      .logicTrackStatusStocks(res.userKey)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              `/api/v1/warehouse/stocks`,
              200,
              response.success,
              response.count
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");
};
