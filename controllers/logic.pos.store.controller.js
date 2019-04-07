"use strict";

// Import Controller
const shareController = require("./share.controller");

// Import Model
const partnerStoreModel = require("../models/partner_store");
const warehouseInformationModel = require("../models/warehouse_information_list");

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
    const storeRecord = await partnerStoreModel.readStoreRecord("store_code AS branch_code, store_name AS branch_name, address_one, address_two, landmark, city_id AS city_unique, locality_id AS locality_unique, store_mobile AS mobile, store_email AS email, refund_on_discount, refund_policy",
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

// Logic Store List
module.exports.logicStoreList = async(id, code) => {
  try {

    // Read Partner Store Record By Store Code
    let storeRecord = await partnerStoreModel.readStoreByCode("store_code AS branch_code, store_name AS branch_name, address_one, address_two, landmark, city_id AS city_unique, locality_id AS locality_unique, store_mobile AS mobile, store_email AS email, refund_on_discount, refund_policy",
      code, 1);

    // Parse
    storeRecord = JSON.stringify(storeRecord);
    storeRecord = JSON.parse(storeRecord);

    if (storeRecord.length === 0) return {
      success: true,
      data: {},
      msg: 'Succesful'
    };
    else return {
      success: true,
      data: storeRecord[0],
      msg: 'Succesful'
    };

  } catch (error) {
    return Promise.reject(error);
  }
}

// Logic Warehouse Record
module.exports.logicWarehouseRecord = async(id) => {
  try {

    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0) return {
      success: false,
      data: [],
      msg: 'Unknown partner'
    };

    // Read Warehouse Data By Code
    let warehouseRecord = await warehouseInformationModel.readWarehouseByPartner("warehouse_information_id AS warehouse_unique, business_name, address_one, address_two, landmark, city_id AS city_unique, locality_id AS locality_unique, gstin, cin, pan, mobile, email", partnerRecord[0].partner_id, 1);

    // Parse
    warehouseRecord = JSON.stringify(warehouseRecord);
    warehouseRecord = JSON.parse(warehouseRecord);

    if (warehouseRecord.length === 0) return {
      success: true,
      data: {},
      msg: 'Succesful'
    };
    else return {
      success: true,
      data: warehouseRecord[0],
      msg: 'Succesful'
    };

  } catch (error) {
    return Promise.reject(error);
  }
}