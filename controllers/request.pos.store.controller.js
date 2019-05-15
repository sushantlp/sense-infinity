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
              "/api/v1/pos/stores",
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
              `/api/v1/pos/stores/${req.params.storeCode}`,
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
              "/api/v1/pos/warehouse",
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
              `/api/v1/pos/employees/${req.params.storeCode}`,
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
              `/api/v1/pos/products/${req.params.storeCode}`,
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
              `/api/v1/pos/products/${req.params.id}`,
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
              `/api/v1/pos/discounts/${req.params.storeCode}`,
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
