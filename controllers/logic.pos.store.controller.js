"use strict";

// Import Controller
const shareController = require("./share.controller");

// Import Model
const partnerStoreModel = require("../models/partner_store");

// Logic Warehouse Store List
module.exports.logicWarehouseStoreList = async(id) => {
  try {

    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0) return {
      success: false,
      data: [],
      msg: 'Unknown partner'
    };

    // Read Partner Store Record
    let storeRecord = await partnerStoreModel.readStoreRecord("store_code AS branch_code, store_name AS branch_name, address_one, address_two, landmark, city_id AS city_unique, locality_id AS locality_unique, store_mobile AS mobile, store_email AS email, refund_on_discount, refund_policy",
      partnerRecord[0].partner_id, 1);

    return {
      success: true,
      data: storeRecord,
      msg: 'Succesful'
    };

  } catch (error) {
    return Promise.reject(error);
  }
}