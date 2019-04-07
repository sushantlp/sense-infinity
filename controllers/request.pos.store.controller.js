"use strict";

// Import Controller
const posStoreController = require("./logic.pos.store.controller");
const validateController = require("./validate.controller");
const shareController = require("./share.controller");


// Request Get Warehouse Stores List
module.exports.requestWarehouseStoreList = (req, res) => {
  if (
    res.userKey !== undefined && res.userKey !== "") {

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