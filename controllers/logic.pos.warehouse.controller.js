"use strict";

// Import Controller
const shareController = require("./share.controller");
const databaseController = require("./database.controller");

// Import Config
const constants = require("../config/constants");

// Import Model
const warehouseStaticModel = require("../models/warehouse_static_version");
const localityModel = require("../models/locality");
const cityModel = require("../models/city");
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
const taxModel = require("../models/tax_table");
const taxSyncModel = require("../models/tax_sync");
const stapleSyncModel = require("../models/staple_product_sync");
const partnerSyncModel = require("../models/partner_product_sync");
const storeSyncModel = require("../models/store_product_sync");
const userEmployeeConnectModel = require("../models/warehouse_user_employee_connect");
const billDiscountModel = require("../models/bill_discount");
const productDiscountModel = require("../models/product_discount");
const discountTrackModel = require("../models/product_discount_track");
const freeDiscountModel = require("../models/free_product_offer");
const valueDiscountModel = require("../models/value_product_offer");
const invoiceModel = require("../models/invoice");
const invoiceCouponModel = require("../models/invoice_coupon");
const invoicePaymentModel = require("../models/invoice_payment");
const invoiceProductModel = require("../models/invoice_product");
const manualDiscountModel = require("../models/manual_discount");
const returnInvoiceModel = require("../models/return_invoice");
const storeStockModel = require("../models/store_stock");
const warehouseStockModel = require("../models/warehouse_stock");
const warehouseStockLogModel = require("../models/warehouse_stock_log");
const warehouseSupplierModel = require("../models/warehouse_supplier_detail");

// Logic Get Warehouse Static Data
module.exports.logicWarehouseStaticData = async (version, id) => {
  try {
    // Variable
    let dataObj = {};
    let versionObj = {};

    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Read Sense Constant Record
    let warehouseStatic = await warehouseStaticModel.readAllWarehouseVersion(
      "*",
      1
    );

    // Parse
    warehouseStatic = JSON.stringify(warehouseStatic);
    warehouseStatic = JSON.parse(warehouseStatic);

    // Zero Means Empty Record
    if (warehouseStatic.length === 0)
      return {
        success: false,
        data: {},
        msg: "Empty warehouse static version"
      };

    const promises = warehouseStatic.map(async (staticVersion, index) => {
      if (staticVersion.warehouse_static_name === "City Version") {
        if (
          parseFloat(staticVersion.warehouse_static_version) !==
          parseFloat(version.city_version)
        ) {
          let city = await cityModel.readCityRecord(
            "city_id AS city_unique, city_name AS city, currency_hex_code AS currency_code, currency_text AS currency",
            1
          );

          // Parse
          city = JSON.stringify(city);
          city = JSON.parse(city);

          // Object Push
          dataObj.city = city;
          versionObj.city_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          // Object Push
          dataObj.city = [];
          versionObj.city_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        }
      } else if (staticVersion.warehouse_static_name === "Locality Version") {
        if (
          parseFloat(staticVersion.warehouse_static_version) !==
          parseFloat(version.locality_version)
        ) {
          let locality = await localityModel.readLocalityRecord(
            "locality_id AS locality_unique, city_id AS city_unique, locality_name AS locality, pincode",
            1
          );

          // Parse
          locality = JSON.stringify(locality);
          locality = JSON.parse(locality);

          // Object Push
          dataObj.locality = locality;
          versionObj.locality_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          // Object Push
          dataObj.locality = [];
          versionObj.locality_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        }
      } else if (
        staticVersion.warehouse_static_name === "Discount Type Version"
      ) {
        if (
          parseFloat(staticVersion.warehouse_static_version) !==
          parseFloat(version.discount_type_version)
        ) {
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
          versionObj.discount_type_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          // Object Push
          dataObj.discount_type = [];
          versionObj.discount_type_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        }
      } else if (
        staticVersion.warehouse_static_name === "Discount Base Version"
      ) {
        if (
          parseFloat(staticVersion.warehouse_static_version) !==
          parseFloat(version.discount_base_version)
        ) {
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
          versionObj.discount_base_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          // Object Push
          dataObj.discount_base = [];
          versionObj.discount_base_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        }
      } else if (staticVersion.warehouse_static_name === "Gender Version") {
        if (
          parseFloat(staticVersion.warehouse_static_version) !==
          parseFloat(version.gender_version)
        ) {
          let gender = await genderModel.readGenderRecord(
            "gender_id AS gender_unique, name AS gender_name",
            1
          );

          // Parse
          gender = JSON.stringify(gender);
          gender = JSON.parse(gender);

          // Object Push
          dataObj.gender = gender;
          versionObj.gender_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          // Object Push
          dataObj.gender = [];
          versionObj.gender_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        }
      } else if (
        staticVersion.warehouse_static_name === "Warehouse Payment Version"
      ) {
        if (
          parseFloat(staticVersion.warehouse_static_version) !==
          parseFloat(version.warehouse_payment_version)
        ) {
          let paymentType = await warehousePaymentModel.readPaymentType(
            "warehouse_payment_id AS warehouse_payment_unique, payment_name AS payment",
            1
          );

          // Parse
          paymentType = JSON.stringify(paymentType);
          paymentType = JSON.parse(paymentType);

          // Object Push
          dataObj.payment_type = paymentType;
          versionObj.warehouse_payment_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          // Object Push
          dataObj.payment_type = [];
          versionObj.warehouse_payment_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        }
      } else if (
        staticVersion.warehouse_static_name === "Global Category Version"
      ) {
        if (
          parseFloat(staticVersion.warehouse_static_version) !==
          parseFloat(version.global_category_version)
        ) {
          const object = {};
          object.global_category_unique = 0;
          object.category_name = "NA";

          // Read Global Category
          let globalCategory = await globalCategoryModel.readGlobalCategory(
            "global_category_id AS global_category_unique, global_category_name AS category_name",
            1
          );

          // Parse
          globalCategory = JSON.stringify(globalCategory);
          globalCategory = JSON.parse(globalCategory);

          // Object Push
          globalCategory.push(object);
          dataObj.global_category = globalCategory;
          versionObj.global_category_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          // Object Push
          dataObj.global_category = [];
          versionObj.global_category_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        }
      } else if (
        staticVersion.warehouse_static_name === "Global Sub Category Version"
      ) {
        if (
          parseFloat(staticVersion.warehouse_static_version) !==
          parseFloat(version.global_sub_category_version)
        ) {
          const object = {};
          object.global_sub_category_unique = 0;
          object.sub_category_name = "NA";
          object.global_category_unique = 0;

          // Read Global Category
          let globalSubCategory = await globalSubCategoryModel.readSubGlobalCategory(
            "global_sub_category_id AS global_sub_category_unique, global_sub_category_name AS sub_category_name, global_category_id AS global_category_unique",
            1
          );

          // Parse
          globalSubCategory = JSON.stringify(globalSubCategory);
          globalSubCategory = JSON.parse(globalSubCategory);

          // Object Push
          globalSubCategory.push(object);
          dataObj.global_sub_category = globalSubCategory;
          versionObj.global_sub_category_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          // Object Push
          dataObj.global_sub_category = [];
          versionObj.global_sub_category_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        }
      } else if (
        staticVersion.warehouse_static_name ===
        "Global Sub Sub Category Version"
      ) {
        if (
          parseFloat(staticVersion.warehouse_static_version) !==
          parseFloat(version.global_sub_sub_category_version)
        ) {
          const object = {};
          object.global_sub_sub_category_unique = 0;
          object.sub_sub_category_name = "NA";
          object.global_sub_category_unique = 0;

          // Read Global Category
          let globalSubSubCategory = await globalSubSubCategoryModel.readSubSubGlobalCategory(
            "global_sub_sub_category_id AS global_sub_sub_category_unique, global_sub_sub_category_name AS sub_sub_category_name, global_sub_category_id AS global_sub_category_unique",
            1
          );

          // Parse
          globalSubSubCategory = JSON.stringify(globalSubSubCategory);
          globalSubSubCategory = JSON.parse(globalSubSubCategory);

          // Object Push
          globalSubSubCategory.push(object);
          dataObj.global_sub_sub_category = globalSubSubCategory;
          versionObj.global_sub_sub_category_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          // Object Push
          dataObj.global_sub_sub_category = [];
          versionObj.global_sub_sub_category_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        }
      } else if (
        staticVersion.warehouse_static_name === "Warehouse Role Version"
      ) {
        if (
          parseFloat(staticVersion.warehouse_static_version) !==
          parseFloat(version.warehouse_role_version)
        ) {
          // Read Warehouse Role List
          let roleList = await roleModel.readWarehouseRoleList(
            "warehouse_role_id AS role_unique, name AS role_name",
            1
          );

          // Parse
          roleList = JSON.stringify(roleList);
          roleList = JSON.parse(roleList);

          // Object Push
          dataObj.warehouse_role_list = roleList;
          versionObj.warehouse_role_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          // Object Push
          dataObj.warehouse_role_list = [];
          versionObj.warehouse_role_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        }
      } else if (
        staticVersion.warehouse_static_name === "Coupon Type Version"
      ) {
        if (
          parseFloat(staticVersion.warehouse_static_version) !==
          parseFloat(version.coupon_type_version)
        ) {
          // Read Coupon Type List
          let couponType = await couponTypeModel.readCouponType(
            "coupon_type_id AS coupon_type_unique, coupon_type_name",
            1
          );

          // Parse
          couponType = JSON.stringify(couponType);
          couponType = JSON.parse(couponType);

          // Object Push
          dataObj.coupon_type_list = couponType;
          versionObj.coupon_type_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          // Object Push
          dataObj.coupon_type_list = [];
          versionObj.coupon_type_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        }
      } else if (
        staticVersion.warehouse_static_name === "Coupon Sub Type Version"
      ) {
        if (
          parseFloat(staticVersion.warehouse_static_version) !==
          parseFloat(version.coupon_sub_type_version)
        ) {
          // Read Sub Coupon Type List
          let couponSubType = await couponSubTypeModel.readSubCouponType(
            "coupon_sub_type_id AS coupon_sub_type_unique, coupon_type_id AS coupon_type_unique, coupon_sub_type_name AS coupon_name",
            1
          );

          // Parse
          couponSubType = JSON.stringify(couponSubType);
          couponSubType = JSON.parse(couponSubType);

          // Object Push
          dataObj.coupon_sub_type_list = couponSubType;
          versionObj.coupon_sub_type_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          // Object Push
          dataObj.coupon_sub_type_list = [];
          versionObj.coupon_sub_type_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        }
      } else if (
        staticVersion.warehouse_static_name === "Item Condition Version"
      ) {
        if (
          parseFloat(staticVersion.warehouse_static_version) !==
          parseFloat(version.item_condition_version)
        ) {
          // Read Item Condition List
          let itemCondition = await itemConditionModel.readItemCondition(
            "item_condition_id AS item_condition_unique, item_condition_name",
            1
          );

          // Parse
          itemCondition = JSON.stringify(itemCondition);
          itemCondition = JSON.parse(itemCondition);

          // Object Push
          dataObj.item_condition_list = itemCondition;
          versionObj.item_condition_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          // Object Push
          dataObj.item_condition_list = [];
          versionObj.item_condition_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        }
      } else if (
        staticVersion.warehouse_static_name === "Order Status Version"
      ) {
        if (
          parseFloat(staticVersion.warehouse_static_version) !==
          parseFloat(version.order_status_version)
        ) {
          // Read Order Status List
          let orderStatus = await orderStatusModel.readOrderStatus(
            "order_status_id AS order_status_unique, order_status_name",
            1
          );

          // Parse
          orderStatus = JSON.stringify(orderStatus);
          orderStatus = JSON.parse(orderStatus);

          // Object Push
          dataObj.order_status_list = orderStatus;
          versionObj.order_status_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          // Object Push
          dataObj.order_status_list = [];
          versionObj.order_status_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        }
      } else if (
        staticVersion.warehouse_static_name === "Product Unit Version"
      ) {
        if (
          parseFloat(staticVersion.warehouse_static_version) !==
          parseFloat(version.product_unit_version)
        ) {
          const object = {};
          object.unit_unique = 0;
          object.unit_name = "NA";
          object.unit_value = "NA";

          // Read Product Unit List
          let productUnit = await productUnitModel.readProductUnit(
            "product_unit_id AS unit_unique, product_unit_name AS unit_name, product_unit_value AS unit_value",
            1
          );

          // Parse
          productUnit = JSON.stringify(productUnit);
          productUnit = JSON.parse(productUnit);

          productUnit.push(object);

          // Object Push
          dataObj.product_unit_list = productUnit;
          versionObj.product_unit_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          // Object Push
          dataObj.product_unit_list = [];
          versionObj.product_unit_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        }
      } else if (
        staticVersion.warehouse_static_name === "Product Sub Unit Version"
      ) {
        if (
          parseFloat(staticVersion.warehouse_static_version) !==
          parseFloat(version.product_sub_unit_version)
        ) {
          const object = {};
          object.sub_unit_unique = 0;
          object.unit_unique = 0;
          object.sub_unit_name = "NA";
          object.sub_unit_value = "NA";

          // Read Product Sub Unit List
          let productSubUnit = await productSubUnitModel.readProductSubUnit(
            "product_sub_unit_id AS sub_unit_unique, product_unit_id AS unit_unique, product_sub_unit_name AS sub_unit_name, product_sub_unit_value AS sub_unit_value",
            1
          );

          // Parse
          productSubUnit = JSON.stringify(productSubUnit);
          productSubUnit = JSON.parse(productSubUnit);

          productSubUnit.push(object);

          // Object Push
          dataObj.product_sub_unit_list = productSubUnit;
          versionObj.product_sub_unit_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          // Object Push
          dataObj.product_sub_unit_list = [];
          versionObj.product_sub_unit_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        }
      } else if (
        staticVersion.warehouse_static_name === "System Administrator Version"
      ) {
        if (
          parseFloat(staticVersion.warehouse_static_version) !==
          parseFloat(version.system_administrator_version)
        ) {
          // Read System Password Administrator
          let systemPassword = await systemPasswordModel.readSystemPassword(
            "warehouse_role_id AS role_unique, password",
            1
          );

          // Parse
          systemPassword = JSON.stringify(systemPassword);
          systemPassword = JSON.parse(systemPassword);

          // Object Push
          dataObj.system_administrator_list = systemPassword;
          versionObj.system_administrator_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          // Object Push
          dataObj.system_administrator_list = [];
          versionObj.system_administrator_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        }
      } else if (staticVersion.warehouse_static_name === "Tax Version") {
        // Read Tax Sync Record
        let taxSyncRecord = await taxSyncModel.readTaxSync(
          "*",
          partnerRecord[0].partner_id,
          1
        );

        // Parse
        taxSyncRecord = JSON.stringify(taxSyncRecord);
        taxSyncRecord = JSON.parse(taxSyncRecord);

        if (taxSyncRecord.length > 0) {
          // Logic Tax Sync Data
          const taxSync = await taxSyncData(taxSyncRecord[0].attributes.hsn);

          // Update Status Tax Sync Record
          taxSyncModel.updateStatusTaxSync(0, taxSyncRecord[0].tax_sync_id);

          // Object Push
          dataObj.tax_list = taxSync;
          versionObj.tax_version = parseFloat(
            staticVersion.warehouse_static_version
          );
        } else {
          //   // Object Push
          dataObj.tax_list = [];
          versionObj.tax_version = parseFloat(
            staticVersion.warehouse_static_version
          );
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

// Logic Tax Sync Data
const taxSyncData = async values => {
  try {
    let arr = [];

    values.map(async value => {
      arr.push(value.tax_id);
    });

    // then, create a dynamic list of comma-separated question marks
    const marks = new Array(arr.length).fill("?").join(",");

    //  Read Tax Table Record By Array
    let tax = await taxModel.readTaxByArray(
      "tax_id AS tax_unique, hsn, sgst, cgst, igst, description, status",
      marks,
      arr
    );

    // Parse
    tax = JSON.stringify(tax);
    tax = JSON.parse(tax);

    return tax;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Keep Warehouse Stores
module.exports.logicKeepStoreDetail = async (stores, id) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Iterate Keep Store Detail
    iterateKeepStoreDetail(stores, partnerRecord);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Iterate Keep Store Detail
const iterateKeepStoreDetail = async (stores, partner) => {
  try {
    stores.map(async (store, index) => {
      const reform = shareController.reformStoresDetail(
        store.store_name,
        store.address_one,
        store.address_two,
        store.landmark,
        store.store_email,
        store.refund_on_discount,
        store.refund_policy
      );

      // Read Partner Store Record By Store Code
      let storeCode = await partnerStoreModel.readStoreByCode(
        "*",
        store.store_code,
        partner[0].partner_id,
        1
      );

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
          store.invoice_format,
          store.status
        );
      } else {
        // Update Partner Store Data
        partnerStoreModel.updateStoreData(
          storeCode[0].store_id,
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
          store.invoice_format,
          store.status
        );
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Keep Warehouse Detail
module.exports.logicKeepWarehouseDetail = async (warehouses, id) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Object Keep Warehouse Detail
    objectKeepWarehouseDetail(warehouses, partnerRecord);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Object Keep Warehouse Detail
const objectKeepWarehouseDetail = async (warehouses, partner) => {
  try {
    // Reform Warehouse Detail
    const reform = shareController.reformWarehouseDetail(
      warehouses.business_name,
      warehouses.address_one,
      warehouses.address_two,
      warehouses.landmark,
      warehouses.gstin,
      warehouses.cin,
      warehouses.pan,
      warehouses.email
    );

    // Read Warehouse Data By Code
    let warehouseRecord = await warehouseInformationModel.readWarehouseDataByCode(
      "*",
      warehouses.warehouse_unique,
      partner[0].partner_id,
      1
    );

    // Parse
    warehouseRecord = JSON.stringify(warehouseRecord);
    warehouseRecord = JSON.parse(warehouseRecord);

    if (warehouseRecord.length === 0) {
      // Keep Customer Information Data
      warehouseInformationModel.keepWarehouseData(
        warehouses.warehouse_unique,
        partner[0].partner_id,
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
        1
      );
    } else {
      // Update Customer Information Data
      warehouseInformationModel.updateWarehouseData(
        warehouseRecord[0].id,
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
        reform.email
      );
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Keep Secret Data
module.exports.logicKeepSecretData = async (secrets, id) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Json Keep Secret Data
    jsonKeepSecretData(secrets, partnerRecord);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Json Keep Secret Data
const jsonKeepSecretData = async (secrets, partner) => {
  try {
    secrets.map(async (secret, index) => {
      /** Role 1 (System Administrator) Password (HASH) And Other Role Password (SHA-1) **/

      let user = undefined;
      let employee = undefined;

      // Reform Secret Detail
      const reform = shareController.reformSecretDetail(
        secret.first_name,
        secret.last_name,
        secret.birth_date,
        secret.department_name,
        secret.email
      );

      if (
        parseInt(secret.warehouse_user_unique, 10) > 0 &&
        parseInt(secret.employe_unique, 10) > 0 &&
        parseInt(secret.branch_unique, 10) > 0
      ) {
        let parallel = await Promise.all([
          warehouseUserModel.readWarehouseUserByUserId(
            "id",
            secret.warehouse_user_unique,
            partner[0].partner_id,
            1
          ),
          partnerStoreModel.readStoreByCode(
            "store_id",
            parseInt(secret.branch_unique, 10),
            partner[0].partner_id,
            1
          )
        ]);

        // Parse
        parallel = JSON.stringify(parallel);
        parallel = JSON.parse(parallel);

        if (parallel[1].length !== 0) {
          if (parallel[0].length === 0) {
            const recentId = await warehouseUserModel.keepWarehouseUserData(
              secret.warehouse_user_unique,
              parseInt(secret.role_unique, 10),
              partner[0].partner_id,
              secret.password,
              secret.user_status
            );

            // Intialize Recent User Id
            user = recentId[0].insertId;
          } else {
            // Intialize User Id
            user = parallel[0][0].id;

            warehouseUserModel.updateWarehouseUserPassword(
              secret.password,
              secret.user_status,
              user
            );
          }

          // Read Warehouse Employee By Employee Id
          let employeeRecord = await employeeListModel.readEmployeeByEmployeeId(
            "id",
            parseInt(secret.employe_unique, 10),
            parallel[1][0].store_id,
            1
          );

          // Parse
          employeeRecord = JSON.stringify(employeeRecord);
          employeeRecord = JSON.parse(employeeRecord);

          if (employeeRecord.length === 0) {
            const recentId = await employeeListModel.keepEmployeeData(
              parseInt(secret.employe_unique, 10),
              reform.firstName,
              reform.lastName,
              reform.birthDate,
              secret.mobile,
              reform.email,
              reform.departmentName,
              parseInt(secret.gender_id, 10),
              parallel[1][0].store_id,
              secret.employee_status
            );

            // Intialize Recent Employee Id
            employee = recentId[0].insertId;
          } else {
            // Intialize Recent Employee Id
            employee = employeeRecord[0].id;

            employeeListModel.updateEmployeeData(
              reform.firstName,
              reform.lastName,
              reform.birthDate,
              secret.mobile,
              reform.email,
              reform.departmentName,
              parseInt(secret.gender_id, 10),
              parallel[1][0].store_id,
              secret.employee_status,
              employee
            );
          }

          // Read Warehouse User And Employee Connect
          let connectRecord = await userEmployeeConnectModel.readUserEmployeeConnect(
            "user_employee_id",
            user,
            employee
          );

          // Parse
          connectRecord = JSON.stringify(connectRecord);
          connectRecord = JSON.parse(connectRecord);

          if (connectRecord.length === 0)
            userEmployeeConnectModel.keepUserEmployeeConnect(user, employee, 1);
          else if (connectRecord[0].status === 0)
            userEmployeeConnectModel.updateUserEmployeeConnect(
              1,
              connectRecord[0].user_employee_id
            );
        }
      } else if (parseInt(secret.warehouse_user_unique, 10) > 0) {
        // Read Warehouse User By User Id
        let userRecord = await warehouseUserModel.readWarehouseUserByUserId(
          "id",
          secret.warehouse_user_unique,
          partner[0].partner_id,
          1
        );

        // Parse
        userRecord = JSON.stringify(userRecord);
        userRecord = JSON.parse(userRecord);

        if (userRecord.length === 0)
          warehouseUserModel.keepWarehouseUserData(
            secret.warehouse_user_unique,
            parseInt(secret.role_unique, 10),
            partner[0].partner_id,
            secret.password,
            secret.user_status
          );
        else
          warehouseUserModel.updateWarehouseUserPassword(
            secret.password,
            secret.user_status,
            userRecord[0].id
          );
      } else if (
        parseInt(secret.employe_unique, 10) > 0 &&
        parseInt(secret.branch_unique, 10) > 0
      ) {
        // Read Partner Store Record By Store Code
        let storeRecord = await partnerStoreModel.readStoreByCode(
          "store_id",
          parseInt(secret.branch_unique, 10),
          partner[0].partner_id,
          1
        );

        // Parse
        storeRecord = JSON.stringify(storeRecord);
        storeRecord = JSON.parse(storeRecord);

        if (storeRecord.length !== 0) {
          // Read Warehouse Employee By Employee Id
          let employeeRecord = await employeeListModel.readEmployeeByEmployeeId(
            "id",
            secret.employe_unique,
            storeRecord[0].store_id,
            1
          );

          // Parse
          employeeRecord = JSON.stringify(employeeRecord);
          employeeRecord = JSON.parse(employeeRecord);

          if (employeeRecord.length === 0)
            employeeListModel.keepEmployeeData(
              parseInt(secret.employe_unique, 10),
              reform.firstName,
              reform.lastName,
              reform.birthDate,
              secret.mobile,
              reform.email,
              reform.departmentName,
              parseInt(secret.gender_id, 10),
              storeRecord[0].store_id,
              secret.employee_status
            );
          else
            employeeListModel.updateEmployeeData(
              reform.firstName,
              reform.lastName,
              reform.birthDate,
              secret.mobile,
              reform.email,
              reform.departmentName,
              parseInt(secret.gender_id, 10),
              storeRecord[0].store_id,
              secret.employee_status,
              employeeRecord[0].id
            );
        }
      } else console.log("Else secret");
    });

    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Keep Warehouse Product
module.exports.logicKeepWarehouseProduct = async (id, products) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    let storeRecord = await partnerStoreModel.readStoreRecord(
      "store_id",
      partnerRecord[0].partner_id,
      1
    );

    // Parse
    storeRecord = JSON.stringify(storeRecord);
    storeRecord = JSON.parse(storeRecord);

    if (storeRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Empty warehouse stores"
      };

    // Json Keep Warehouse Product
    jsonKeepWarehouseProduct(products, partnerRecord, storeRecord);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Json Keep Warehouse Product
const jsonKeepWarehouseProduct = async (
  products,
  partnerRecord,
  storeRecord
) => {
  try {
    let count = 0;
    let syncArray = [];
    let max = products.length;
    let packageStatus = "INSERT";

    // Check or Create Warehouse and Store Product Tables
    await Promise.all([
      databaseController.createWarehouseProductTable(partnerRecord[0].mobile),
      checkStoreProductTable(partnerRecord[0].mobile, storeRecord)
    ]);

    // Read Partner Product Sync Record
    let syncModel = await partnerSyncModel.readProductSync(
      "*",
      partnerRecord[0].partner_id,
      "DESC"
    );

    // Parse
    syncModel = JSON.stringify(syncModel);
    syncModel = JSON.parse(syncModel);

    if (syncModel.length > 0) {
      if (syncModel[0].attributes.length < max) {
        count = syncModel[0].attributes.length;
        syncArray = syncModel[0].attributes;
        packageStatus = "UPDATE";
      }
    } else {
      count = 0;
      packageStatus = "INSERT";
    }

    return products.map(async (product, index) => {
      logicStoreProduct(
        partnerRecord[0].mobile,
        storeRecord,
        product.product_barcode,
        product.product_quantity,
        product.status
      );

      // Read Warehouse Product By Barcode
      let productRecord = await databaseController.readWarehouseProduct(
        "*",
        partnerRecord[0].mobile,
        product.product_barcode
      );

      // Parse
      productRecord = JSON.stringify(productRecord);
      productRecord = JSON.parse(productRecord);

      // Reform Warehouse Product
      const reform = shareController.reformWarehouseProduct(
        product.product_name,
        product.brand_name,
        product.description
      );

      if (productRecord.length === 0) {
        databaseController.keepWarehouseProduct(
          partnerRecord[0].mobile,
          product.product_barcode,
          reform.productName,
          reform.brandName,
          reform.description,
          product.category_unique,
          product.sub_category_unique,
          product.sub_sub_category_unique,
          product.unit_unique,
          product.unit_sub_unique,
          product.product_size,
          product.selling_price,
          product.product_margin,
          product.product_price,
          product.product_quantity,
          product.sgst,
          product.cgst,
          product.igst,
          product.hsn,
          product.sodexo,
          product.staple,
          product.status
        );
        syncArray.push(product.product_barcode);
        count = count + 1;
      } else {
        databaseController.updateWarehouseProduct(
          partnerRecord[0].mobile,
          reform.productName,
          reform.brandName,
          reform.description,
          product.category_unique,
          product.sub_category_unique,
          product.sub_sub_category_unique,
          product.unit_unique,
          product.unit_sub_unique,
          product.product_size,
          product.selling_price,
          product.product_margin,
          product.product_price,
          product.product_quantity,
          product.sgst,
          product.cgst,
          product.igst,
          product.hsn,
          product.sodexo,
          product.staple,
          product.status,
          productRecord[0].product_id
        );
        syncArray.push(product.product_barcode);
        count = count + 1;
      }

      if (packageStatus === "UPDATE") {
        if (count === max) {
          count = 0;
          packageStatus = "INSERT";
          partnerSyncModel.updateAttributesSync(
            JSON.stringify(syncArray),
            syncModel[0].sync_id
          );
          logicSyncBundleInStore(storeRecord, syncModel[0].sync_id);
          syncArray = [];
        }
      } else {
        if (count === max) {
          count = 0;
          const copyArray = syncArray;
          syncArray = [];
          packageStatus = "INSERT";
          const lastId = await partnerSyncModel.keepProductSync(
            partnerRecord[0].partner_id,
            JSON.stringify(copyArray)
          );
          if (Array.isArray(lastId))
            logicSyncBundleInStore(storeRecord, lastId[0].insertId);
          else logicSyncBundleInStore(storeRecord, lastId.insertId);
        }
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

const logicStoreProduct = async (
  partnerMobile,
  storeRecord,
  barcode,
  quantity,
  status
) => {
  try {
    return storeRecord.map(async (store, index) => {
      await databaseController.createStoreProductTable(
        partnerMobile,
        store.store_id
      );
      let productRecord = await databaseController.readStoreProduct(
        "product_id",
        partnerMobile,
        store.store_id,
        barcode
      );

      // Parse
      productRecord = JSON.stringify(productRecord);
      productRecord = JSON.parse(productRecord);

      if (productRecord.length === 0)
        databaseController.keepStoreProduct(
          partnerMobile,
          store.store_id,
          barcode,
          quantity,
          status
        );
      else
        databaseController.updateStoreProduct(
          partnerMobile,
          store.store_id,
          status,
          productRecord[0].product_id
        );
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Check or Create Store Product Table
const checkStoreProductTable = async (partnerMobile, storeRecord) => {
  try {
    const promises = storeRecord.map(async (store, index) => {
      await databaseController.createStoreProductTable(
        partnerMobile,
        store.store_id
      );
    });

    await Promise.all(promises);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Warehouse Product Attribute Link With Store
const logicSyncBundleInStore = async (storeRecord, id) => {
  try {
    return storeRecord.map(async (store, index) => {
      const record = await storeSyncModel.readProductSync(
        "id",
        store.store_id,
        id,
        1
      );
      if (record.length === 0)
        storeSyncModel.keepProductSync(store.store_id, id, 1);
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Keep Staple Master Product
module.exports.logicKeepStapleProduct = async (id, products) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Json Keep Staple Product
    jsonKeepStapleProduct(products, partnerRecord);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Json Keep Staple Product
const jsonKeepStapleProduct = async (products, partners) => {
  try {
    return products.map(async (product, index) => {
      let parallel = await Promise.all([
        globalCategoryModel.readGlobalCategoryName(
          "global_category_id",
          product.category_name,
          1
        ),
        globalSubCategoryModel.readSubGlobalCategoryName(
          "global_sub_category_id",
          product.sub_category_name,
          1
        ),
        globalSubSubCategoryModel.readSubSubGlobalCategoryName(
          "global_sub_sub_category_id",
          product.sub_sub_category_name,
          1
        )
      ]);
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Keep Warehouse Discount
module.exports.logicKeepDiscount = async (id, billJson, productJson) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Bill Json Logic
    billJsonLogic(partnerRecord, billJson);

    // Product Json Logic
    productJsonLogic(partnerRecord, productJson);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Bill Json Logic
const billJsonLogic = async (partnerRecord, billJson) => {
  try {
    return billJson.map(async (bill, index) => {
      //  Reform Discount Data
      const reform = shareController.reformDiscountData(
        bill.name,
        bill.start_date,
        bill.end_date,
        bill.start_time,
        bill.end_time
      );

      let storeRecord = await partnerStoreModel.readStoreByCode(
        "store_id",
        bill.branch_id,
        partnerRecord[0].partner_id,
        1
      );

      // Parse
      storeRecord = JSON.stringify(storeRecord);
      storeRecord = JSON.parse(storeRecord);

      if (storeRecord.length === 0)
        return {
          success: false,
          data: [],
          msg: "Empty warehouse stores"
        };

      let billRecord = await billDiscountModel.readBillDiscountById(
        "id",
        bill.id,
        storeRecord[0].store_id
      );

      // Parse
      billRecord = JSON.stringify(billRecord);
      billRecord = JSON.parse(billRecord);

      if (billRecord.length === 0)
        billDiscountModel.keepBillDiscount(
          bill.id,
          storeRecord[0].store_id,
          bill.base_id,
          reform.name,
          reform.startDate,
          reform.endDate,
          bill.start_time,
          bill.end_time,
          bill.minimum_amount,
          bill.maximum_amount,
          bill.offer_value,
          bill.status,
          1
        );
      else
        billDiscountModel.updateBillDiscount(bill.status, 1, billRecord[0].id);
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Product Json Logic
const productJsonLogic = async (partnerRecord, productJson) => {
  try {
    let storeRecord = await partnerStoreModel.readStoreRecord(
      "store_id",
      partnerRecord[0].partner_id,
      1
    );

    // Parse
    storeRecord = JSON.stringify(storeRecord);
    storeRecord = JSON.parse(storeRecord);

    if (storeRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Empty warehouse stores"
      };

    return productJson.map(async (product, index) => {
      //  Reform Discount Data
      const reform = shareController.reformDiscountData(
        product.name,
        product.start_date,
        product.end_date,
        product.start_time,
        product.end_time
      );

      let productDiscountRecord = await productDiscountModel.readProductDiscount(
        "id",
        product.id,
        partnerRecord[0].partner_id
      );

      // Parse
      productDiscountRecord = JSON.stringify(productDiscountRecord);
      productDiscountRecord = JSON.parse(productDiscountRecord);

      if (productDiscountRecord.length === 0) {
        const lastKey = await productDiscountModel.keepProductDiscount(
          partnerRecord[0].partner_id,
          product.id,
          product.base_id,
          reform.name,
          reform.startDate,
          reform.endDate,
          product.start_time,
          product.end_time,
          product.status
        );

        freeProductJson(lastKey[0].insertId, product.free_products, true);
        valueProductJson(lastKey[0].insertId, product.value_products, true);
        productDiscountTrack(lastKey[0].insertId, storeRecord, true);
      } else {
        productDiscountModel.updateProductDiscount(
          product.status,
          1,
          productDiscountRecord[0].id
        );

        freeDiscountModel.updateFreeOffer(
          product.status,
          productDiscountRecord[0].id
        );

        valueDiscountModel.updateValueOffer(
          product.status,
          productDiscountRecord[0].id
        );

        productDiscountTrack(productDiscountRecord[0].id, storeRecord, false);
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Free Product Json
const freeProductJson = (lastKey, freeJson, bool) => {
  return freeJson.map((free, index) => {
    freeDiscountModel.keepFreeOffer(
      free.id,
      lastKey,
      free.buy_product,
      free.buy_quantiy,
      free.free_product,
      free.free_quantity,
      free.status
    );
  });
};

// Logic Value Product Json
const valueProductJson = (lastKey, valueJson, bool) => {
  return valueJson.map((value, index) => {
    valueDiscountModel.keepValueOffer(
      value.id,
      lastKey,
      value.barcode,
      value.minimum_quantiy,
      value.offer_value,
      value.status
    );
  });
};

// Logic Product Discount Track Json
const productDiscountTrack = (lastKey, storeJson, bool) => {
  return storeJson.map((store, index) => {
    if (bool)
      discountTrackModel.keepProductDiscountTrack(store.store_id, lastKey, 1);
    else
      discountTrackModel.updateProductDiscountTrack(1, lastKey, store.store_id);
  });
};

// Logic Get Stores Invoice
module.exports.logicGetInvoice = async id => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Read Invoices
    return await readInvoices(partnerRecord);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Invoices
const readInvoices = async partnerRecord => {
  try {
    let parallel = await Promise.all([
      invoiceModel.readInvoiceByPartner(
        "invoices.id, invoices.invoice_no, invoices.store_counter_id, invoices.warehouse_user_id, partner_stores.store_id, CASE WHEN invoices.customer_name <> 'NULL' THEN invoices.customer_name ELSE '' END AS customer_name, invoices.customer_mobile, invoices.membership_code, invoices.total_amount, invoices.invoice_cashback, invoices.invoice_total_saving, invoices.invoice_loyalty_used, invoices.invoice_sodexo_amount, invoices.invoice_total_amount, CASE WHEN invoices.gstin_name <> 'NULL' THEN invoices.gstin_name ELSE '' END AS gstin_name, CASE WHEN invoices.gstin_number <> 'NULL' THEN invoices.gstin_number ELSE '' END AS gstin_number, invoices.invoice_created_date, invoices.invoice_updated_date, invoices.home_delivery,invoices.round_off_amount, invoices.return_status, invoices.status",
        partnerRecord[0].partner_id,
        1
      ),
      returnInvoiceModel.readReturnInvoiceByPartner(
        "return_invoices.invoice_no AS invoice_number, return_invoices.new_invoice_no AS new_invoice_number, CASE WHEN return_invoices.reason <> 'NULL' THEN return_invoices.reason ELSE '' END AS return_invoices, return_invoices.warehouse_user_id AS user_key, partner_stores.store_id",
        partnerRecord[0].partner_id,
        1
      )
    ]);

    // Parse
    parallel = JSON.stringify(parallel);
    parallel = JSON.parse(parallel);

    if (parallel[0].length === 0 && parallel[1].length === 0) {
      return {
        success: true,
        data: {
          invoices: [],
          return_invoices: []
        },
        msg: "Successful",
        count: {
          invoice_count: 0,
          return_invoice_count: 0
        }
      };
    } else if (parallel[0].length !== 0 && parallel[1].length !== 0) {
      const json = await createInvoiceJson(parallel[0]);

      return {
        success: true,
        data: {
          invoices: json,
          return_invoices: parallel[1]
        },
        msg: "Successful",
        count: {
          invoice_count: json.length,
          return_invoice_count: parallel[1].length
        }
      };
    } else if (parallel[0].length !== 0) {
      const json = await createInvoiceJson(parallel[0]);

      return {
        success: true,
        data: {
          invoices: json,
          return_invoices: []
        },
        msg: "Successful",
        count: {
          invoice_count: json.length,
          return_invoice_count: 0
        }
      };
    } else if (parallel[1].length !== 0) {
      return {
        success: true,
        data: {
          invoices: [],
          return_invoices: parallel[1]
        },
        msg: "Successful",
        count: {
          invoice_count: [],
          return_invoice_count: parallel[1].length
        }
      };
    } else {
      return {
        success: true,
        data: {
          invoices: [],
          return_invoices: []
        },
        msg: "Successful",
        count: {
          invoice_count: 0,
          return_invoice_count: 0
        }
      };
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create Invoice Json
const createInvoiceJson = async invoiceJson => {
  try {
    let bunch = invoiceJson.map(async (invoice, index) => {
      let obj = {};
      obj.invoice_number = invoice.invoice_no;
      obj.counter_key = invoice.store_counter_id;
      obj.user_key = invoice.warehouse_user_id;
      obj.branch_key = invoice.store_id;
      obj.customer_name = invoice.customer_name;
      obj.customer_mobile = invoice.customer_mobile;
      obj.membership_code = invoice.membership_code;
      obj.total_amount = invoice.total_amount;
      obj.cashback = invoice.invoice_cashback;
      obj.total_saving = invoice.invoice_total_saving;
      obj.loyalty_used = invoice.invoice_loyalty_used;
      obj.sodexo_amount = invoice.invoice_sodexo_amount;
      obj.invoice_total_amount = invoice.invoice_total_amount;
      obj.gstin_name = invoice.gstin_name;
      obj.gstin_number = invoice.gstin_number;

      obj.created_date = invoice.invoice_created_date;
      obj.updated_date = invoice.invoice_updated_date;

      obj.home_delivery = invoice.home_delivery;
      obj.round_off_amount = invoice.round_off_amount;
      obj.return_status = invoice.return_status;
      obj.status = invoice.status;

      let parallel = await Promise.all([
        invoiceCouponModel.readInvoiceCoupon(
          "coupon_code AS code, CASE WHEN applicable_on <> 'NULL' THEN applicable_on ELSE '' END AS applicable, discount, cashback, status",
          invoice.id
        ),
        invoicePaymentModel.readInvoicePayment(
          "payment_amount AS amount, CASE WHEN transaction_id <> 'NULL' THEN transaction_id ELSE '' END AS transaction, card_no AS card, warehouse_payment_id AS payment_id, status",
          invoice.id
        ),
        invoiceProductModel.readInvoiceProductByNo(
          "CASE WHEN product_name <> 'NULL' THEN product_name ELSE '' END AS name, product_barcode AS barcode, CASE WHEN product_unit <> 'NULL' THEN product_unit ELSE '' END AS unit, product_quantity AS quantity, product_sgst AS sgst, product_cgst AS cgst, product_igst AS igst, product_price AS price, product_discount AS discount, product_discount_price AS discount_price, product_sub_total AS sub_total, hsn_code, return_status, status",
          invoice.id
        ),
        manualDiscountModel.readManualDiscountByNo(
          "warehouse_user_id AS user_key, discount_amount, status",
          invoice.id
        )
      ]);

      // Parse
      parallel = JSON.stringify(parallel);
      parallel = JSON.parse(parallel);

      obj.invoice_coupon = parallel[0];
      obj.invoice_payment = parallel[1];
      obj.invoice_product = parallel[2];
      obj.manual_discount = parallel[3];

      return obj;
    });

    return await Promise.all(bunch);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Pos Warehouse Login History
module.exports.logicWarehouseLoginHistory = async (id, historyJson) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Write Login History
    shareController.writeLoginHistory(
      partnerRecord[0].partner_id,
      0,
      historyJson
    );

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Pos Warehouse Error Log
module.exports.logicWarehouseErrorLog = async (id, errorJson) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Write Login History
    shareController.writeErrorLog(partnerRecord[0].partner_id, 0, errorJson);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Track Status Change
module.exports.logicUpdateInvoice = async id => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    invoiceModel.invoiceTrackStatus(0, partnerRecord[0].partner_id);
    returnInvoiceModel.returnInvoiceTrackStatus(0, partnerRecord[0].partner_id);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Get Store Stocks
module.exports.logicStoreStock = async id => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner",
        count: 0
      };

    const stocks = await getStoreStock(partnerRecord);

    return {
      success: true,
      data: stocks,
      msg: "Succesful",
      count: stocks.length
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Get Store Stocks
const getStoreStock = async partnerRecord => {
  try {
    // Variable
    let stop = true;
    let stock = [];
    let lowerLimit = 0;
    const upperLimit = 1000;

    while (stop) {
      let store = await storeStockModel.readStockForWarehouse(
        "store_stocks.barcode, store_stocks.quantity, store_stocks.status, partner_stores.store_code AS branch_store",
        partnerRecord[0].partner_id,
        1,
        lowerLimit,
        upperLimit
      );

      // Parse
      store = JSON.stringify(store);
      store = JSON.parse(store);

      // Increase Lower Limit
      lowerLimit = lowerLimit + upperLimit;

      if (store.length === 0) stop = false;
      else if (store.length < upperLimit) {
        stock.push(store);
        stop = false;
      } else stock.push(store);
    }

    if (!stop) return stock.length >= 1 ? stock[0] : stock;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Track Status Store Stocks Record
module.exports.logicTrackStatusStock = async id => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    storeStockModel.stockTrackStatus(0, partnerRecord[0].partner_id);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Post Warehouse Stock
module.exports.logicWarehouseStock = async (id, stocks) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    postWarehouseStock(partnerRecord, stocks);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Post Warehouse Stock Detail
const postWarehouseStock = async (partnerRecord, stocks) => {
  try {
    return stocks.map(async (stock, index) => {
      let stockRecord = await warehouseStockModel.readWarehouseStockByBarcode(
        "id",
        partnerRecord[0].partner_id,
        stock.barcode
      );

      // Parse
      stockRecord = JSON.stringify(stockRecord);
      stockRecord = JSON.parse(stockRecord);

      if (stockRecord.length === 0)
        warehouseStockModel.keepWarehouseStock(
          partnerRecord[0].partner_id,
          stock.barcode,
          parseInt(stock.quantity, 10),
          1,
          stock.status
        );
      else
        warehouseStockModel.updateWarehouseStock(
          parseInt(stock.quantity, 10),
          stock.status,
          1,
          stockRecord[0].id
        );
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Warehouse Stocks Log Record
module.exports.logicWarehouseStockLog = async (id, stocks) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    postWarehouseStockLog(partnerRecord, stocks);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Post Warehouse Stock Log
const postWarehouseStockLog = async (partnerRecord, stocks) => {
  try {
    return stocks.map(async (stock, index) => {
      warehouseStockLogModel.keepWarehouseStockLog(
        partnerRecord[0].partner_id,
        stock.barcode,
        parseInt(stock.quantity, 10),
        1,
        stock.status
      );
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Warehouse Supplier Detail
module.exports.logicWarehouseSupplierDetail = async (id, suppliers) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    warehouseSupplierDetail(partnerRecord, suppliers);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Post Warehouse Supplier Detail
const warehouseSupplierDetail = async (partnerRecord, suppliers) => {
  try {
    return suppliers.map(async (supplier, index) => {
      // warehouseSupplierModel
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
