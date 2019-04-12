"use strict";

// Import Controller
const posWarehoseController = require("./logic.pos.warehouse.controller");
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
    return posWarehoseController
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
              response.success, response.version
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
    const validate = validateController.warehouseSecrets(
      req.body.secrets
    );

    if (!validate.success) return res.status(400).send(validate.msg);

    // Logic Keep Secret Data
    return posWarehoseController
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
              response.success, {}
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
    const validate = validateController.warehouseStores(
      req.body.stores
    );

    if (!validate.success) return res.status(400).send(validate.msg);

    // Logic Keep Warehouse Stores
    return posWarehoseController
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
              response.success, {}
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
    const validate = validateController.warehouseDetail(
      req.body.warehouses
    );

    if (!validate.success) return res.status(400).send(validate.msg);

    // Logic Keep Warehouse Detail
    return posWarehoseController
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
              response.success, {}
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
  if (res.userKey !== undefined &&
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
    return posWarehoseController
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
              response.success, {}
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
  if (res.userKey !== undefined &&
    res.userKey !== "" &&
    req.body.products !== undefined &&
    req.body.products !== ""
  ) {

    // Validate Staple Product Detail Parameter
    const validate = validateController.stapleProductDetail(
      req.body.products
    );

    if (!validate.success) return res.status(400).send(validate.msg);

    // Logic Keep Staple Master Product
    return posWarehoseController
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
              response.success, {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");
};