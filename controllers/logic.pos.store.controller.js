"use strict";

// Import Controller
const shareController = require("./share.controller");

// Import Model
const partnerStoreModel = require("../models/partner_store");
const warehouseInformationModel = require("../models/warehouse_information_list");
const userEmployeeConnectModel = require("../models/warehouse_user_employee_connect");

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

// Logic Employee Record
module.exports.logicEmployeeRecord = async(id, code) => {
  try {

    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0) return {
      success: false,
      data: [],
      msg: 'Unknown partner'
    };

    // Read Partner Store Record By Store Code
    let storeRecord = await partnerStoreModel.readStoreByCode("store_id",
      code, 1);

    // Parse
    storeRecord = JSON.stringify(storeRecord);
    storeRecord = JSON.parse(storeRecord);

    if (storeRecord.length === 0) return {
      success: false,
      data: [],
      msg: 'Unknown store'
    };

    // Join Warehouse Biller Data
    let connectRecord = await userEmployeeConnectModel.readBillerByJoin('warehouse_user_lists.warehouse_user_id, warehouse_user_lists.warehouse_role_id, warehouse_user_lists.password, warehouse_employee_lists.warehouse_employe_id, warehouse_employee_lists.store_id, warehouse_employee_lists.first_name, warehouse_employee_lists.last_name, warehouse_employee_lists.birth_date, warehouse_employee_lists.mobile, warehouse_employee_lists.email, warehouse_employee_lists.dept_name, warehouse_employee_lists.gender_id', partnerRecord[0].partner_id, storeRecord[0].store_id, 1);

    // Parse
    connectRecord = JSON.stringify(connectRecord);
    connectRecord = JSON.parse(connectRecord);

    if (connectRecord.length === 0) return {
      success: true,
      data: [],
      msg: 'Succesful'
    };
    else return {
      success: true,
      data: billerJoinJson(connectRecord, storeRecord[0].store_id),
      msg: 'Succesful'
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

const billerJoinJson = (records, storeId) => {
  try {
    // Variable
    let arr = [];
    records.map(async(record, index) => {
      let obj = {};

      obj.user_id = record.warehouse_user_id;
      obj.role_id = record.warehouse_role_id;
      obj.password = record.password;
      obj.employe_id = record.warehouse_employe_id;
      obj.gender_id = record.gender_id;

      if (record.first_name === 'NULL') obj.first_name = null;
      else obj.first_name = record.first_name;

      if (record.last_name === 'NULL') obj.last_name = null;
      else obj.last_name = record.last_name;

      if (record.birth_date === 'NULL') obj.birth_date = null;
      else obj.birth_date = record.birth_date;

      if (record.mobile === 'NULL') obj.mobile = null;
      else obj.mobile = record.mobile;

      if (record.email === 'NULL') obj.email = null;
      else obj.email = record.email;

      if (record.dept_name === 'NULL') obj.dept_name = null;
      else obj.dept_name = record.dept_name;

      // Push Array
      if (record.store_id === storeId) arr.push(obj);
    });

    return arr;
  } catch (error) {
    return Promise.reject(error);
  }
}