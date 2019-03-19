"use strict";

// Import Model
const warehouseStaticModel = require("../models/warehouse_static_version");
const localityModel = require("../models/locality");
const cityModel = require("../models/city");
const genderModel = require("../models/gender");
const roleModel = require("../models/warehouse_role_list");
const discountTypeModel = require("../models/discount_type");
const discountBaseModel = require("../models/discount_base");
const warehousePaymentModel = require("../models/warehouse_payment_type");
const globalCategoryModel = require("../models/global_category");
const globalSubCategoryModel = require("../models/global_sub_category");
const globalSubSubCategoryModel = require("../models/global_sub_sub_category");

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

    // Zero Means Empty Record
    if (warehouseStatic.length === 0) return {
      success: false,
      data: {},
      msg: "Empty warehouse static version"
    };

    // Parse
    warehouseStatic = JSON.stringify(warehouseStatic);
    warehouseStatic = JSON.parse(warehouseStatic);

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