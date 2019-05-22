"use strict";

// Import Controller
const posStoreController = require("./logic.pos.store.controller");
const validateController = require("./validate.controller");
const shareController = require("./share.controller");

// Request Get Warehouse Stores List
module.exports.requestWarehouseStoreList = (req, res) => {
  if (res.userKey !== undefined && res.userKey !== "") {
    // Logic Pos Store Controller
    return posStoreController
      .logicWarehouseStoreList(res.userKey)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/stores/stores",
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

// Request Get Specific Store Record
module.exports.requestStoreRecord = (req, res) => {
  if (
    res.userKey !== undefined &&
    res.userKey !== "" &&
    req.params.hasOwnProperty("storeCode")
  ) {
    // Logic Pos Store Controller
    return posStoreController
      .logicStoreList(res.userKey, req.params.storeCode)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              `/api/v1/stores/stores/${req.params.storeCode}`,
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

// Request Warehouse Record
module.exports.requestWarehouseRecord = (req, res) => {
  if (res.userKey !== undefined && res.userKey !== "") {
    // Logic Warehouse Record Controller
    return posStoreController
      .logicWarehouseRecord(res.userKey)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/stores/warehouse",
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

// Request Employees Record
module.exports.requestEmployeeRecord = (req, res) => {
  if (
    res.userKey !== undefined &&
    res.userKey !== "" &&
    req.params.hasOwnProperty("storeCode")
  ) {
    // Logic Employees Record Controller
    return posStoreController
      .logicEmployeeRecord(res.userKey, req.params.storeCode)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              `/api/v1/stores/employees/${req.params.storeCode}`,
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

// Request Store Product Record
module.exports.requestStoreProduct = (req, res) => {
  if (
    res.userKey !== undefined &&
    res.userKey !== "" &&
    req.params.hasOwnProperty("storeCode")
  ) {
    // Logic Employees Record Controller
    return posStoreController
      .logicStoreProduct(res.userKey, req.params.storeCode)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              `/api/v1/stores/products/${req.params.storeCode}`,
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

// Request Store Product Record
module.exports.requestStoreProductSync = (req, res) => {
  if (
    res.userKey !== undefined &&
    res.userKey !== "" &&
    req.params.hasOwnProperty("id")
  ) {
    // Logic Employees Record Controller
    return posStoreController
      .logicStoreProductSync(req.params.id)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              `/api/v1/stores/products/${req.params.id}`,
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

// Request Store Discount Record
module.exports.requestStoreDiscount = (req, res) => {
  if (
    res.userKey !== undefined &&
    res.userKey !== "" &&
    req.params.hasOwnProperty("storeCode")
  ) {
    // Logic Store Discount Record
    return posStoreController
      .logicStoreDiscount(res.userKey, req.params.storeCode)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              `/api/v1/stores/discounts/${req.params.storeCode}`,
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

// Request Store Invoice Record
module.exports.requestStoreInvoice = (req, res) => {
  if (
    res.userKey !== undefined &&
    res.userKey !== "" &&
    req.body.invoices !== undefined &&
    req.body.invoices !== "" &&
    req.body.return_invoice !== undefined &&
    req.body.return_invoice !== "" &&
    req.params.hasOwnProperty("storeCode")
  ) {
    // Validate Invoice And Return Invoice Parameter
    const validate = validateController.storeInvoice(
      req.body.invoices,
      req.body.return_invoice
    );

    if (!validate.success) return res.status(400).send(validate.msg);

    // Logic Store Invoice Record
    return posStoreController
      .logicStoreInvoice(
        res.userKey,
        req.params.storeCode,
        req.body.invoices,
        req.body.return_invoice
      )
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              `/api/v1/stores/invoices/${req.params.storeCode}`,
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

// Request Store Login History
module.exports.requestStoreLoginHistory = (req, res) => {
  if (
    res.userKey !== undefined &&
    res.userKey !== "" &&
    req.body.history !== undefined &&
    req.body.history !== "" &&
    req.params.hasOwnProperty("storeCode")
  ) {
    // Validate Login History Parameter
    const validate = validateController.validateLoginHistory(req.body.history);

    if (!validate.success) return res.status(400).send(validate.msg);

    // Logic Store Login History
    return posStoreController
      .logicStoreLoginHistory(
        res.userKey,
        req.params.storeCode,
        req.body.history
      )
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              `/api/v1/stores/login-history/${req.params.storeCode}`,
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

// Request Write Store Error Log
module.exports.requestStoreErrorLog = (req, res) => {
  if (
    res.userKey !== undefined &&
    res.userKey !== "" &&
    req.body.errors !== undefined &&
    req.body.errors !== "" &&
    req.params.hasOwnProperty("storeCode")
  ) {
    // Validate Store Error Log
    const validate = validateController.validateErrorLog(req.body.errors);

    if (!validate.success) return res.status(400).send(validate.msg);

    // Logic Store Login History
    return posStoreController
      .logicStoreErrorLog(res.userKey, req.params.storeCode, req.body.errors)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              `/api/v1/stores/error-log/${req.params.storeCode}`,
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
