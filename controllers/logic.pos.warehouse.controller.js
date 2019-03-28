"use strict";

// Import Package
const bcrypt = require("bcrypt");

// Import Controller
const shareController = require("./share.controller");

// Import Model
const warehouseStaticModel = require("../models/warehouse_static_version");
const localityModel = require("../models/locality");
const cityModel = require("../models/city");
const userModel = require("../models/user");
const partnerModel = require("../models/partner");
const partnerStoreModel = require("../models/partner_store");
const genderModel = require("../models/gender");
const roleModel = require("../models/warehouse_role_list");
const productUnitModel = require("../models/product_unit");
const productSubUnitModel = require("../models/product_sub_unit");
const orderStatusModel = require("../models/order_status");
const couponTypeModel = require("../models/coupon_type");
const couponSubTypeModel = require("../models/coupon_sub_type");
const itemConditionModel = require("../models/item_condition");
const discountTypeModel = require("../models/discount_type");
const discountBaseModel = require("../models/discount_base");
const warehousePaymentModel = require("../models/warehouse_payment_type");
const globalCategoryModel = require("../models/global_category");
const globalSubCategoryModel = require("../models/global_sub_category");
const globalSubSubCategoryModel = require("../models/global_sub_sub_category");
const warehouseInformationModel = require("../models/warehouse_information_list");
const warehouseUserModel = require("../models/warehouse_user_list");
const employeeListModel = require("../models/warehouse_employee_list");
const systemPasswordModel = require("../models/system_administrator_password");
const userEmployeeConnectModel = require("../models/warehouse_user_employee_connect");


// Logic Get Warehouse Static Data
module.exports.logicWarehouseStaticData = async version => {
  try {

    // Variable
    let dataObj = {};
    let versionObj = {};

    // Read Sense Constant Record
    let warehouseStatic = await warehouseStaticModel.readAllWarehouseVersion(
      "*",
      1
    );

    // Parse
    warehouseStatic = JSON.stringify(warehouseStatic);
    warehouseStatic = JSON.parse(warehouseStatic);

    // Zero Means Empty Record
    if (warehouseStatic.length === 0) return {
      success: false,
      data: {},
      msg: "Empty warehouse static version"
    };

    // // System Administrator
    // dataObj.system_administrator = {
    //   // system_administrator_id: 1,
    //   system_role_id: 1,
    //   system_password: bcrypt.hashSync(process.env.SALT_KEY, 10),
    //   employee_id: null
    // }

    const promises = warehouseStatic.map(async(staticVersion, index) => {

      if (staticVersion.warehouse_static_name === 'City Version') {

        if (parseFloat(staticVersion.warehouse_static_version) !== parseFloat(version.city_version)) {

          let city = await cityModel.readCityRecord(
            "city_id AS city_unique, city_name AS city, currency_hex_code AS currency_code, currency_text AS currency",
            1
          );

          // Parse
          city = JSON.stringify(city);
          city = JSON.parse(city);

          // Object Push
          dataObj.city = city;
          versionObj.city_version = parseFloat(staticVersion.warehouse_static_version);

        } else {

          // Object Push
          dataObj.city = [];
          versionObj.city_version = parseFloat(staticVersion.warehouse_static_version);
        }
      } else if (staticVersion.warehouse_static_name === 'Locality Version') {

        if (parseFloat(staticVersion.warehouse_static_version) !== parseFloat(version.locality_version)) {

          let locality = await localityModel.readLocalityRecord(
            "locality_id AS locality_unique, city_id AS city_unique, locality_name AS locality, pincode",
            1
          );

          // Parse
          locality = JSON.stringify(locality);
          locality = JSON.parse(locality);

          // Object Push
          dataObj.locality = locality;
          versionObj.locality_version = parseFloat(staticVersion.warehouse_static_version);

        } else {

          // Object Push
          dataObj.locality = [];
          versionObj.locality_version = parseFloat(staticVersion.warehouse_static_version);
        }
      } else if (staticVersion.warehouse_static_name === 'Discount Type Version') {

        if (parseFloat(staticVersion.warehouse_static_version) !== parseFloat(version.discount_type_version)) {

          // Read Discount Type
          let discountType = await discountTypeModel.readDiscountType(
            "discount_id AS discount_unique_type, discount_type AS discount_type_name",
            1
          );

          // Parse
          discountType = JSON.stringify(discountType);
          discountType = JSON.parse(discountType);

          // Object Push
          dataObj.discount_type = discountType;
          versionObj.discount_type_version = parseFloat(staticVersion.warehouse_static_version);
        } else {

          // Object Push
          dataObj.discount_type = [];
          versionObj.discount_type_version = parseFloat(staticVersion.warehouse_static_version);
        }
      } else if (staticVersion.warehouse_static_name === 'Discount Base Version') {

        if (parseFloat(staticVersion.warehouse_static_version) !== parseFloat(version.discount_base_version)) {

          // Read Discount Type
          let discountBase = await discountBaseModel.readDiscountBase(
            "discount_base_id AS discount_unique_base, discount_base_type AS discount_base_name, discount_id AS discount_unique_type",
            1
          );

          // Parse
          discountBase = JSON.stringify(discountBase);
          discountBase = JSON.parse(discountBase);

          // Object Push
          dataObj.discount_base = discountBase;
          versionObj.discount_base_version = parseFloat(staticVersion.warehouse_static_version);
        } else {

          // Object Push
          dataObj.discount_base = [];
          versionObj.discount_base_version = parseFloat(staticVersion.warehouse_static_version);
        }
      } else if (staticVersion.warehouse_static_name === 'Gender Version') {

        if (parseFloat(staticVersion.warehouse_static_version) !== parseFloat(version.gender_version)) {

          let gender = await genderModel.readGenderRecord(
            "gender_id AS gender_unique, name AS gender_name",
            1
          )

          // Parse
          gender = JSON.stringify(gender);
          gender = JSON.parse(gender);

          // Object Push
          dataObj.gender = gender;
          versionObj.gender_version = parseFloat(staticVersion.warehouse_static_version);

        } else {

          // Object Push
          dataObj.gender = [];
          versionObj.gender_version = parseFloat(staticVersion.warehouse_static_version);
        }
      } else if (staticVersion.warehouse_static_name === 'Warehouse Payment Version') {

        if (parseFloat(staticVersion.warehouse_static_version) !== parseFloat(version.warehouse_payment_version)) {

          let paymentType = await warehousePaymentModel.readPaymentType(
            "warehouse_payment_id AS warehouse_payment_unique, payment_name AS payment",
            1
          )

          // Parse
          paymentType = JSON.stringify(paymentType);
          paymentType = JSON.parse(paymentType);

          // Object Push
          dataObj.payment_type = paymentType;
          versionObj.warehouse_payment_version = parseFloat(staticVersion.warehouse_static_version);

        } else {

          // Object Push
          dataObj.payment_type = [];
          versionObj.warehouse_payment_version = parseFloat(staticVersion.warehouse_static_version);
        }
      } else if (staticVersion.warehouse_static_name === 'Global Category Version') {

        if (parseFloat(staticVersion.warehouse_static_version) !== parseFloat(version.global_category_version)) {

          // Read Global Category
          let globalCategory = await globalCategoryModel.readGlobalCategory(
            "global_category_id AS global_category_unique, global_category_name AS category_name",
            1
          )

          // Parse
          globalCategory = JSON.stringify(globalCategory);
          globalCategory = JSON.parse(globalCategory);

          // Object Push
          dataObj.global_category = globalCategory;
          versionObj.global_category_version = parseFloat(staticVersion.warehouse_static_version);

        } else {

          // Object Push
          dataObj.global_category = [];
          versionObj.global_category_version = parseFloat(staticVersion.warehouse_static_version);
        }
      } else if (staticVersion.warehouse_static_name === 'Global Sub Category Version') {

        if (parseFloat(staticVersion.warehouse_static_version) !== parseFloat(version.global_sub_category_version)) {

          // Read Global Category
          let globalSubCategory = await globalSubCategoryModel.readSubGlobalCategory(
            "global_sub_category_id AS global_sub_category_unique, global_sub_category_name AS sub_category_name, global_category_id AS global_category_unique",
            1
          )

          // Parse
          globalSubCategory = JSON.stringify(globalSubCategory);
          globalSubCategory = JSON.parse(globalSubCategory);

          // Object Push
          dataObj.global_sub_category = globalSubCategory;
          versionObj.global_sub_category_version = parseFloat(staticVersion.warehouse_static_version);
        } else {

          // Object Push
          dataObj.global_sub_category = [];
          versionObj.global_sub_category_version = parseFloat(staticVersion.warehouse_static_version);
        }
      } else if (staticVersion.warehouse_static_name === 'Global Sub Sub Category Version') {

        if (parseFloat(staticVersion.warehouse_static_version) !== parseFloat(version.global_sub_sub_category_version)) {

          // Read Global Category
          let globalSubSubCategory = await globalSubSubCategoryModel.readSubSubGlobalCategory(
            "global_sub_sub_category_id AS global_sub_sub_category_unique, global_sub_sub_category_name AS sub_sub_category_name, global_sub_category_id AS global_sub_category_unique",
            1
          )

          // Parse
          globalSubSubCategory = JSON.stringify(globalSubSubCategory);
          globalSubSubCategory = JSON.parse(globalSubSubCategory);

          // Object Push
          dataObj.global_sub_sub_category = globalSubSubCategory;
          versionObj.global_sub_sub_category_version = parseFloat(staticVersion.warehouse_static_version);

        } else {

          // Object Push
          dataObj.global_sub_sub_category = [];
          versionObj.global_sub_sub_category_version = parseFloat(staticVersion.warehouse_static_version);
        }
      } else if (staticVersion.warehouse_static_name === 'Warehouse Role Version') {

        if (parseFloat(staticVersion.warehouse_static_version) !== parseFloat(version.warehouse_role_version)) {

          // Read Warehouse Role List
          let roleList = await roleModel.readWarehouseRoleList(
            "warehouse_role_id AS role_unique, name AS role_name",
            1
          )

          // Parse
          roleList = JSON.stringify(roleList);
          roleList = JSON.parse(roleList);

          // Object Push
          dataObj.warehouse_role_list = roleList;
          versionObj.warehouse_role_version = parseFloat(staticVersion.warehouse_static_version);

        } else {

          // Object Push
          dataObj.warehouse_role_list = [];
          versionObj.warehouse_role_version = parseFloat(staticVersion.warehouse_static_version);
        }
      } else if (staticVersion.warehouse_static_name === 'Coupon Type Version') {

        if (parseFloat(staticVersion.warehouse_static_version) !== parseFloat(version.coupon_type_version)) {

          // Read Coupon Type List
          let couponType = await couponTypeModel.readCouponType(
            "coupon_type_id AS coupon_type_unique, coupon_type_name",
            1
          )

          // Parse
          couponType = JSON.stringify(couponType);
          couponType = JSON.parse(couponType);

          // Object Push
          dataObj.coupon_type_list = couponType;
          versionObj.coupon_type_version = parseFloat(staticVersion.warehouse_static_version);

        } else {

          // Object Push
          dataObj.coupon_type_list = [];
          versionObj.coupon_type_version = parseFloat(staticVersion.warehouse_static_version);
        }

      } else if (staticVersion.warehouse_static_name === 'Coupon Sub Type Version') {

        if (parseFloat(staticVersion.warehouse_static_version) !== parseFloat(version.coupon_sub_type_version)) {

          // Read Sub Coupon Type List
          let couponSubType = await couponSubTypeModel.readSubCouponType(
            "coupon_sub_type_id AS coupon_sub_type_unique, coupon_type_id AS coupon_type_unique, coupon_sub_type_name AS coupon_name",
            1
          )

          // Parse
          couponSubType = JSON.stringify(couponSubType);
          couponSubType = JSON.parse(couponSubType);

          // Object Push
          dataObj.coupon_sub_type_list = couponSubType;
          versionObj.coupon_sub_type_version = parseFloat(staticVersion.warehouse_static_version);

        } else {

          // Object Push
          dataObj.coupon_sub_type_list = [];
          versionObj.coupon_sub_type_version = parseFloat(staticVersion.warehouse_static_version);
        }

      } else if (staticVersion.warehouse_static_name === 'Item Condition Version') {

        if (parseFloat(staticVersion.warehouse_static_version) !== parseFloat(version.item_condition_version)) {

          // Read Item Condition List
          let itemCondition = await itemConditionModel.readItemCondition(
            "item_condition_id AS item_condition_unique, item_condition_name",
            1
          )

          // Parse
          itemCondition = JSON.stringify(itemCondition);
          itemCondition = JSON.parse(itemCondition);

          // Object Push
          dataObj.item_condition_list = itemCondition;
          versionObj.item_condition_version = parseFloat(staticVersion.warehouse_static_version);

        } else {

          // Object Push
          dataObj.item_condition_list = [];
          versionObj.item_condition_version = parseFloat(staticVersion.warehouse_static_version);
        }

      } else if (staticVersion.warehouse_static_name === 'Order Status Version') {

        if (parseFloat(staticVersion.warehouse_static_version) !== parseFloat(version.order_status_version)) {

          // Read Order Status List
          let orderStatus = await orderStatusModel.readOrderStatus(
            "order_status_id AS order_status_unique, order_status_name",
            1
          )

          // Parse
          orderStatus = JSON.stringify(orderStatus);
          orderStatus = JSON.parse(orderStatus);

          // Object Push
          dataObj.order_status_list = orderStatus;
          versionObj.order_status_version = parseFloat(staticVersion.warehouse_static_version);

        } else {

          // Object Push
          dataObj.order_status_list = [];
          versionObj.order_status_version = parseFloat(staticVersion.warehouse_static_version);
        }

      } else if (staticVersion.warehouse_static_name === 'Product Unit Version') {

        if (parseFloat(staticVersion.warehouse_static_version) !== parseFloat(version.product_unit_version)) {

          // Read Product Unit List
          let productUnit = await productUnitModel.readProductUnit(
            "product_unit_id AS unit_unique, product_unit_name AS unit_name, product_unit_value AS unit_value",
            1
          )

          // Parse
          productUnit = JSON.stringify(productUnit);
          productUnit = JSON.parse(productUnit);

          // Object Push
          dataObj.product_unit_list = productUnit;
          versionObj.product_unit_version = parseFloat(staticVersion.warehouse_static_version);

        } else {

          // Object Push
          dataObj.product_unit_list = [];
          versionObj.product_unit_version = parseFloat(staticVersion.warehouse_static_version);
        }

      } else if (staticVersion.warehouse_static_name === 'Product Sub Unit Version') {

        if (parseFloat(staticVersion.warehouse_static_version) !== parseFloat(version.product_sub_unit_version)) {

          // Read Product Sub Unit List
          let productSubUnit = await productSubUnitModel.readProductSubUnit(
            "product_sub_unit_id AS sub_unit_unique, product_unit_id AS unit_unique, product_sub_unit_name AS sub_unit_name, product_sub_unit_value AS sub_unit_value",
            1
          )

          // Parse
          productSubUnit = JSON.stringify(productSubUnit);
          productSubUnit = JSON.parse(productSubUnit);

          // Object Push
          dataObj.product_sub_unit_list = productSubUnit;
          versionObj.product_sub_unit_version = parseFloat(staticVersion.warehouse_static_version);

        } else {

          // Object Push
          dataObj.product_sub_unit_list = [];
          versionObj.product_sub_unit_version = parseFloat(staticVersion.warehouse_static_version);
        }

      } else if (staticVersion.warehouse_static_name === 'System Administrator Version') {

        if (parseFloat(staticVersion.warehouse_static_version) !== parseFloat(version.system_administrator_version)) {

          // Read System Password Administrator
          let systemPassword = await systemPasswordModel.readSystemPassword(
            "warehouse_role_id AS role_unique, password", 1);

          // Parse
          systemPassword = JSON.stringify(systemPassword);
          systemPassword = JSON.parse(systemPassword);

          // Object Push
          dataObj.system_administrator_list = systemPassword;
          versionObj.system_administrator_version = parseFloat(staticVersion.warehouse_static_version);

        } else {

          // Object Push
          dataObj.system_administrator_list = [];
          versionObj.system_administrator_version = parseFloat(staticVersion.warehouse_static_version);
        }

      }
    });

    await Promise.all(promises);

    return {
      success: true,
      data: dataObj,
      msg: "Succesful",
      version: versionObj
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Call User Partner Data
const userPartnerData = async(id) => {
  try {
    // Read User Record By Id
    let userRecord = await userModel.readUserById("*", id, 1);

    // Parse
    userRecord = JSON.stringify(userRecord);
    userRecord = JSON.parse(userRecord);

    // Read Partner Record
    let partnerRecord = await partnerModel.readPartnerByMobile("*", userRecord[0].mobile, 1);

    // Parse
    partnerRecord = JSON.stringify(partnerRecord);
    partnerRecord = JSON.parse(partnerRecord);

    return partnerRecord;
  } catch (error) {
    return Promise.reject(error);
  }
}

// Logic Keep Warehouse Stores
module.exports.logicKeepStoreDetail = async(stores, id) => {
  try {

    // Call User Partner Data
    const partnerRecord = await userPartnerData(id);

    if (partnerRecord.length === 0) return {
      success: false,
      data: [],
      msg: 'Unknown partner'
    };

    // Iterate Keep Store Detail
    iterateKeepStoreDetail(stores, partnerRecord);

    return {
      success: true,
      data: [],
      msg: 'Succesful'
    };

  } catch (error) {
    return Promise.reject(error);
  }
}

// Iterate Keep Store Detail
const iterateKeepStoreDetail = async(stores, partner) => {
  try {
    stores.map(async(store, index) => {

      const reform = shareController.reformStoresDetail(store.store_name,
        store.address_one,
        store.address_two,
        store.landmark,
        store.store_email,
        store.refund_on_discount,
        store.refund_policy);

      // Read Partner Store Record By Store Code
      let storeCode = await partnerStoreModel.readStoreByCode("*", store.store_code, 1);

      // Parse
      storeCode = JSON.stringify(storeCode);
      storeCode = JSON.parse(storeCode);

      if (storeCode.length === 0) {
        // Keep Partner Stores Data
        partnerStoreModel.keepStoreData(
          store.store_code,
          partner[0].partner_id,
          reform.storeName,
          reform.addressOne,
          reform.addressTwo,
          reform.landmark,
          store.city_id,
          store.locality_id,
          store.store_mobile,
          reform.storeEmail,
          reform.refundDiscount,
          reform.refundPolicy,
          1
        );
      } else {

        // Update Partner Store Data
        partnerStoreModel.updateStoreData(storeCode[0].store_id,
          reform.storeName,
          reform.addressOne,
          reform.addressTwo,
          reform.landmark,
          store.city_id,
          store.locality_id,
          store.store_mobile,
          reform.storeEmail,
          reform.refundDiscount,
          reform.refundPolicy);
      }

    });
  } catch (error) {
    return Promise.reject(error);
  }
}


// Logic Keep Warehouse Detail
module.exports.logicKeepWarehouseDetail = async(warehouses, id) => {
  try {

    // Call User Partner Data
    const partnerRecord = await userPartnerData(id);

    if (partnerRecord.length === 0) return {
      success: false,
      data: [],
      msg: 'Unknown partner'
    };

    // Object Keep Warehouse Detail
    objectKeepWarehouseDetail(warehouses, partnerRecord);

    return {
      success: true,
      data: [],
      msg: 'Succesful'
    };

  } catch (error) {
    return Promise.reject(error);
  }
}

// Object Keep Warehouse Detail
const objectKeepWarehouseDetail = async(warehouses, partner) => {
  try {

    // Reform Warehouse Detail
    const reform = shareController.reformWarehouseDetail(warehouses.business_name,
      warehouses.address_one,
      warehouses.address_two,
      warehouses.landmark,
      warehouses.gstin,
      warehouses.cin,
      warehouses.pan,
      warehouses.email);

    // Read Warehouse Data By Code
    let warehouseRecord = await warehouseInformationModel.readWarehouseDataByCode("*", warehouses.warehouse_unique, 1);

    // Parse
    warehouseRecord = JSON.stringify(warehouseRecord);
    warehouseRecord = JSON.parse(warehouseRecord);

    if (warehouseRecord.length === 0) {

      // Keep Customer Information Data
      warehouseInformationModel.keepWarehouseData(warehouses.warehouse_unique, partner[0].partner_id,
        reform.businessName,
        reform.addressOne,
        reform.addressTwo,
        reform.landmark,
        warehouses.city_id,
        warehouses.locality_id,
        reform.gstin,
        reform.cin,
        reform.pan,
        warehouses.mobile,
        reform.email,
        1);
    } else {

      // Update Customer Information Data
      warehouseInformationModel.updateWarehouseData(warehouseRecord[0].id,
        reform.businessName,
        reform.addressOne,
        reform.addressTwo,
        reform.landmark,
        warehouses.city_id,
        warehouses.locality_id,
        reform.gstin,
        reform.cin,
        reform.pan,
        warehouses.mobile,
        reform.email);
    }

  } catch (error) {
    return Promise.reject(error);
  }
}


// Logic Keep Secret Data
module.exports.logicKeepSecretData = async(secrets, id) => {
  try {

    // Call User Partner Data
    const partnerRecord = await userPartnerData(id);

    if (partnerRecord.length === 0) return {
      success: false,
      data: [],
      msg: 'Unknown partner'
    };

    // Json Keep Secret Data
    jsonKeepSecretData(secrets, partnerRecord)

    return {
      success: true,
      data: [],
      msg: 'Succesful'
    };

  } catch (error) {
    return Promise.reject(error);
  }
}

// Json Keep Secret Data
const jsonKeepSecretData = async(secrets, partner) => {
  try {

    let user = undefined;
    let employee = undefined;

    secrets.map(async(secret, index) => {

      /** Role 1 (System Administrator) Password (HASH) And Other Role Password (SHA-1) **/

      // Reform Secret Detail
      const reform = shareController.reformSecretDetail(secret.first_name,
        secret.last_name, secret.birth_date, secret.department_name, secret.email);

      if (secret.warehouse_user_unique > 0 && secret.employe_unique > 0) {

        // Read Warehouse User By User Id
        let UserRecord = await warehouseUserModel.readWarehouseUserByUserId("*", secret.warehouse_user_unique, 1);

        // Parse
        UserRecord = JSON.stringify(UserRecord);
        UserRecord = JSON.parse(UserRecord);

        if (UserRecord.length === 0) {
          const recentId = await warehouseUserModel.keepWarehouseUserData(secret.warehouse_user_unique,
            secret.role_unique,
            partner[0].partner_id,
            secret.password,
            1);

          // Intialize Recent User Id
          user = recentId[0].insertId


        } else {
          warehouseUserModel.updateWarehouseUserPassword(secret.password, UserRecord[0].id);

          // Intialize User Id
          user = UserRecord[0].id
        }

        // Read Warehouse Employee By Employee Id
        let employeeRecord = await employeeListModel.readEmployeeByEmployeeId("*", secret.employe_unique, 1);

        // Parse
        employeeRecord = JSON.stringify(employeeRecord);
        employeeRecord = JSON.parse(employeeRecord);

        if (employeeRecord.length === 0) {
          const recentId = await employeeListModel.keepEmployeeData(secret.employe_unique,
            reform.firstName,
            reform.lastName,
            reform.birthDate,
            secret.mobile,
            reform.email,
            reform.departmentName,
            secret.gender_id,
            secret.branch_unique,
            1);

          // Intialize Recent Employee Id
          employee = recentId[0].insertId

        } else {
          employeeListModel.updateEmployeeData(reform.firstName,
            reform.lastName,
            reform.birthDate,
            secret.mobile,
            reform.email,
            reform.departmentName,
            secret.gender_id,
            secret.branch_unique,
            employeeRecord[0].id);

          // Intialize Recent Employee Id
          employee = employeeRecord[0].id
        }

        // Read Warehouse User And Employee Connect
        let connectRecord = await userEmployeeConnectModel.readUserEmployeeConnect("*", user, employee);

        // Parse
        connectRecord = JSON.stringify(connectRecord);
        connectRecord = JSON.parse(connectRecord);

        if (connectRecord.length === 0) userEmployeeConnectModel.keepUserEmployeeConnect(user, employee, 1);
        else
        if (connectRecord[0].status === 0)
          userEmployeeConnectModel.updateUserEmployeeConnect(1, connectRecord[0].user_employee_id);

      } else if (secret.warehouse_user_unique > 0) {

        // Read Warehouse User By User Id
        let UserRecord = await warehouseUserModel.readWarehouseUserByUserId("*", secret.warehouse_user_unique, 1);

        // Parse
        UserRecord = JSON.stringify(UserRecord);
        UserRecord = JSON.parse(UserRecord);

        if (UserRecord.length === 0) warehouseUserModel.keepWarehouseUserData(secret.warehouse_user_unique,
          secret.role_unique,
          partner[0].partner_id,
          secret.password,
          1);
        else warehouseUserModel.updateWarehouseUserPassword(secret.password, UserRecord[0].id);


      } else if (secret.employe_unique > 0) {

        // Read Warehouse Employee By Employee Id
        let employeeRecord = await employeeListModel.readEmployeeByEmployeeId("*", secret.employe_unique, 1);

        // Parse
        employeeRecord = JSON.stringify(employeeRecord);
        employeeRecord = JSON.parse(employeeRecord);

        if (employeeRecord.length === 0) employeeListModel.keepEmployeeData(secret.employe_unique,
          reform.firstName,
          reform.lastName,
          reform.birthDate,
          secret.mobile,
          reform.email,
          reform.departmentName,
          secret.gender_id,
          secret.branch_unique,
          1);
        else employeeListModel.updateEmployeeData(reform.firstName,
          reform.lastName,
          reform.birthDate,
          secret.mobile,
          reform.email,
          reform.departmentName,
          secret.gender_id,
          secret.branch_unique,
          employeeRecord[0].id);

      } else console.log("Else secret")
    });
  } catch (error) {
    return Promise.reject(error);
  }
}