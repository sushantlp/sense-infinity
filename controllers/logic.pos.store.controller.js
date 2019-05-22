"use strict";

// Import Controller
const shareController = require("./share.controller");
const databaseController = require("./database.controller");

// Import Model
const partnerStoreModel = require("../models/partner_store");
const warehouseInformationModel = require("../models/warehouse_information_list");
const userEmployeeConnectModel = require("../models/warehouse_user_employee_connect");
const warehouseUserModel = require("../models/warehouse_user_list");
const storeProductSyncModel = require("../models/store_product_sync");
const partnerProductSyncModel = require("../models/partner_product_sync");
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

// Logic Warehouse Store List
module.exports.logicWarehouseStoreList = async id => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Read Partner Store Record
    const storeRecord = await partnerStoreModel.readStoreRecord(
      "store_code AS branch_code, store_name AS branch_name, address_one, address_two, landmark, city_id AS city_unique, locality_id AS locality_unique, store_mobile AS mobile, store_email AS email, refund_on_discount, refund_policy, invoice_format",
      partnerRecord[0].partner_id,
      1
    );

    return {
      success: true,
      data: storeRecord,
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Store List
module.exports.logicStoreList = async (id, code) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Read Partner Store Record By Store Code
    let storeRecord = await partnerStoreModel.readStoreByCode(
      "store_code AS branch_code, store_name AS branch_name, address_one, address_two, landmark, city_id AS city_unique, locality_id AS locality_unique, store_mobile AS mobile, store_email AS email, refund_on_discount, refund_policy, invoice_format",
      code,
      partnerRecord[0].partner_id,
      1
    );

    // Parse
    storeRecord = JSON.stringify(storeRecord);
    storeRecord = JSON.parse(storeRecord);

    if (storeRecord.length === 0)
      return {
        success: true,
        data: {},
        msg: "Succesful"
      };
    else
      return {
        success: true,
        data: storeRecord[0],
        msg: "Succesful"
      };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Warehouse Record
module.exports.logicWarehouseRecord = async id => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Read Warehouse Data By Code
    let warehouseRecord = await warehouseInformationModel.readWarehouseByPartner(
      "warehouse_information_id AS warehouse_unique, business_name, address_one, address_two, landmark, city_id AS city_unique, locality_id AS locality_unique, gstin, cin, pan, mobile, email",
      partnerRecord[0].partner_id,
      1
    );

    // Parse
    warehouseRecord = JSON.stringify(warehouseRecord);
    warehouseRecord = JSON.parse(warehouseRecord);

    if (warehouseRecord.length === 0)
      return {
        success: true,
        data: {},
        msg: "Succesful"
      };
    else
      return {
        success: true,
        data: warehouseRecord[0],
        msg: "Succesful"
      };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Employee Record
module.exports.logicEmployeeRecord = async (id, code) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Read Partner Store Record By Store Code
    let storeRecord = await partnerStoreModel.readStoreByCode(
      "store_id",
      code,
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
        msg: "Unknown store"
      };

    let parallel = await Promise.all([
      warehouseUserModel.readBillerByJoin(
        "warehouse_user_lists.warehouse_user_id, warehouse_user_lists.warehouse_role_id, warehouse_user_lists.password, warehouse_employee_lists.warehouse_employe_id, warehouse_employee_lists.store_id, warehouse_employee_lists.first_name, warehouse_employee_lists.last_name, warehouse_employee_lists.birth_date, warehouse_employee_lists.mobile, warehouse_employee_lists.email, warehouse_employee_lists.dept_name, warehouse_employee_lists.gender_id, warehouse_employee_lists.status AS employee_status, warehouse_user_lists.status AS user_status",
        partnerRecord[0].partner_id,
        storeRecord[0].store_id,
        1
      ),
      warehouseUserModel.readWarehouseUserRoleId(
        "warehouse_user_id,warehouse_role_id,password,status",
        2,
        1
      )
    ]);

    // // Join Warehouse Biller Data
    // let connectRecord = await warehouseUserModel.readBillerByJoin('warehouse_user_lists.warehouse_user_id, warehouse_user_lists.warehouse_role_id, warehouse_user_lists.password, warehouse_employee_lists.warehouse_employe_id, warehouse_employee_lists.store_id, warehouse_employee_lists.first_name, warehouse_employee_lists.last_name, warehouse_employee_lists.birth_date, warehouse_employee_lists.mobile, warehouse_employee_lists.email, warehouse_employee_lists.dept_name, warehouse_employee_lists.gender_id, warehouse_employee_lists.status AS employee_status, warehouse_user_lists.status AS user_status', partnerRecord[0].partner_id, storeRecord[0].store_id, 1);

    // Parse
    parallel = JSON.stringify(parallel);
    parallel = JSON.parse(parallel);

    if (parallel.length === 0)
      return {
        success: true,
        data: [],
        msg: "Succesful"
      };
    else
      return {
        success: true,
        data: billerJoinJson(parallel, storeRecord[0].store_id),
        msg: "Succesful"
      };
  } catch (error) {
    return Promise.reject(error);
  }
};

const billerJoinJson = (records, storeId) => {
  try {
    // Variable
    let arr = [];

    // Array Merge
    records = records[0].concat(records[1]);

    records.map(async (record, index) => {
      let obj = {};

      obj.user_id = record.warehouse_user_id;
      obj.role_id = record.warehouse_role_id;
      obj.password = record.password;

      if (obj.role_id === 2) {
        obj.employe_id = 0;
        obj.gender_id = 0;
        obj.user_status = record.status;
        obj.employee_status = 0;
        obj.first_name = null;
        obj.last_name = null;
        obj.birth_date = null;
        obj.mobile = null;
        obj.email = null;
        obj.dept_name = null;

        // Array Push
        arr.push(obj);
      } else {
        obj.employe_id = record.warehouse_employe_id;
        obj.gender_id = record.gender_id;
        obj.user_status = record.user_status;
        obj.employee_status = record.employee_status;

        if (record.first_name === "NULL") obj.first_name = null;
        else obj.first_name = record.first_name;

        if (record.last_name === "NULL") obj.last_name = null;
        else obj.last_name = record.last_name;

        if (record.birth_date === "NULL") obj.birth_date = null;
        else obj.birth_date = record.birth_date;

        if (record.mobile === "NULL") obj.mobile = null;
        else obj.mobile = record.mobile;

        if (record.email === "NULL") obj.email = null;
        else obj.email = record.email;

        if (record.dept_name === "NULL") obj.dept_name = null;
        else obj.dept_name = record.dept_name;

        // Push Array
        if (record.store_id === storeId) arr.push(obj);
      }
    });

    return arr;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Store Product Record
module.exports.logicStoreProduct = async (id, code) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Read Partner Store Record By Store Code
    let storeRecord = await partnerStoreModel.readStoreByCode(
      "store_id",
      code,
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
        msg: "Unknown store"
      };

    // Read Store Product Sync Record By Store Id
    let syncRecord = await storeProductSyncModel.readProductSyncById(
      "id, sync_id",
      storeRecord[0].store_id,
      1
    );

    // Parse
    syncRecord = JSON.stringify(syncRecord);
    syncRecord = JSON.parse(syncRecord);

    // Record Length
    const syncLength = syncRecord.length;

    if (syncLength === 0)
      return {
        success: true,
        data: {
          products: [],
          api_call: "NO",
          return_id: 0
        },
        msg: "Succesful"
      };

    // Logic Warehouse Product
    const products = await getWarehouseProduct(
      syncRecord[0],
      partnerRecord[0].mobile
    );

    if (products.success)
      return {
        success: true,
        data: {
          products: products.data,
          api_call: syncLength > 1 ? "YES" : "NO",
          return_id: syncRecord[0].id
        },
        msg: products.msg
      };
    else
      return {
        success: false,
        data: {
          products: [],
          api_call: "NO",
          return_id: 0
        },
        msg: products.msg
      };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Warehouse Product
const getWarehouseProduct = async (sync, mobile) => {
  try {
    // Read Stores Product By Sync Id Record
    let barcodeArray = await partnerProductSyncModel.readProductBySyncId(
      "attributes",
      sync.sync_id
    );

    // Parse
    barcodeArray = JSON.stringify(barcodeArray);
    barcodeArray = JSON.parse(barcodeArray);

    if (barcodeArray === 0)
      return {
        success: false,
        data: [],
        msg: "Empty barcode sync"
      };
    let attribute = [];
    if (Array.isArray(barcodeArray)) attribute = barcodeArray[0].attributes;
    else attribute = barcodeArray.attributes;

    // then, create a dynamic list of comma-separated question marks
    const quesmarks = new Array(attribute.length).fill("?").join(",");

    // Read Warehouse Product Record By Array
    const productRecord = await databaseController.readWarehouseProductArray(
      `product_barcode AS barcode, IFNULL(product_name,'') as product_name, IFNULL(brand_name,'') as brand_name, IFNULL(description,'') as description, global_category_id AS category_id, global_sub_category_id AS sub_category_id, global_sub_sub_category_id AS sub_sub_category_id, product_unit_id AS unit_id, product_sub_unit_id AS sub_unit_id, product_size, selling_price, product_margin, actual_price, sgst, cgst, igst, hsn, sodexo, status`,
      mobile,
      quesmarks,
      attribute
    );

    if (productRecord === 0)
      return {
        success: false,
        data: [],
        msg: "Empty warehouse product"
      };
    else
      return {
        success: true,
        data: productRecord,
        msg: "Succesful"
      };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Store Product Sync
module.exports.logicStoreProductSync = async id => {
  try {
    // Update Status Store Product Sync Record
    storeProductSyncModel.updateStatusSync(0, id);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Store Discount Record
module.exports.logicStoreDiscount = async (id, code) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Read Partner Store Record By Store Code
    let storeRecord = await partnerStoreModel.readStoreByCode(
      "store_id",
      code,
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
        msg: "Unknown store"
      };

    return await readDiscount(partnerRecord, storeRecord);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Store Discount
const readDiscount = async (partnerRecord, storeRecord) => {
  try {
    const parallel = await Promise.all([
      billDiscountModel.readBillDiscount(
        "id AS key_id, discount_base_id AS discount_base_key, store_id AS branch_id, name AS discount_name, start_date, end_date, start_time, end_time, min_amount AS minimum_amount, max_discount_amount AS Maximum_amount, bill_offer_value AS value, status",
        storeRecord[0].store_id,
        1
      ),
      discountTrackModel.readDiscountTrackByStatus(
        "product_discount_id",
        storeRecord[0].store_id,
        1
      )
    ]);

    // Change Track Status
    billDiscountModel.updateBillTrack(0, storeRecord[0].store_id);

    let id = parallel[1].map(discount => {
      // Change Track Status
      discountTrackModel.updateProductDiscountTrack(
        0,
        discount.product_discount_id,
        storeRecord[0].store_id
      );
      return discount.product_discount_id;
    });

    // then, create a dynamic list of comma-separated question marks
    const marks = new Array(id.length).fill("?").join(",");

    let discountRecord = await productDiscountModel.readProductDiscountArray(
      "id, discount_base_id, name, start_date, end_date, start_time, end_time, status",
      marks,
      id
    );

    // Parse
    discountRecord = JSON.stringify(discountRecord);
    discountRecord = JSON.parse(discountRecord);

    if (discountRecord.length === 0 && parallel[0].length === 0) {
      return {
        success: true,
        data: {
          bill_discounts: [],
          product_discounts: []
        },
        msg: "Successful",
        count: {
          bill_discount_count: 0,
          product_discount_count: 0
        }
      };
    } else if (discountRecord.length !== 0 && parallel[0].length !== 0) {
      const json = await createDiscountJson(discountRecord);
      return {
        success: true,
        data: {
          bill_discounts: parallel[0],
          product_discounts: json
        },
        msg: "Successful",
        count: {
          bill_discount_count: parallel[0].length,
          product_discount_count: json.length
        }
      };
    } else if (parallel[0].length !== 0) {
      return {
        success: true,
        data: {
          bill_discounts: parallel[0],
          product_discounts: []
        },
        msg: "Successful",
        count: {
          bill_discount_count: parallel[0].length,
          product_discount_count: 0
        }
      };
    } else if (discountRecord.length !== 0) {
      const json = await createDiscountJson(discountRecord);
      return {
        success: true,
        data: {
          bill_discounts: [],
          product_discounts: json
        },
        msg: "Successful",
        count: {
          bill_discount_count: 0,
          product_discount_count: json.length
        }
      };
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create Discount Json
const createDiscountJson = async json => {
  try {
    let bunch = json
      .filter(
        discount =>
          discount.discount_base_id === 5 ||
          discount.discount_base_id === 3 ||
          discount.discount_base_id === 4
      )
      .map(async (discount, index) => {
        let obj = {};
        obj.key_id = discount.id;
        obj.discount_base_key = discount.discount_base_id;
        obj.discount_name = discount.name;
        obj.start_date = discount.start_date;
        obj.end_date = discount.end_date;
        obj.start_time = discount.start_time;
        obj.end_time = discount.end_time;
        obj.status = discount.status;

        if (discount.discount_base_id === 5) {
          obj.free_products = await freeDiscountModel.readFreeOffer(
            "id AS key_id, buy_product_barcode AS buy_barcode, buy_product_quantity AS buy_quantity, free_product_barcode AS free_barcode, free_product_quantity AS free_quantity, status",
            discount.id
          );

          obj.value_products = [];
        } else if (
          discount.discount_base_id === 3 ||
          discount.discount_base_id === 4
        ) {
          obj.value_products = await valueDiscountModel.readValueOffer(
            "id AS key_id, product_barcode AS barcode, buy_product_quantity AS buy_quantity, offer_value AS value, status",
            discount.id
          );

          obj.free_products = [];
        }

        return obj;
      });

    return await Promise.all(bunch);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Store Invoice Record
module.exports.logicStoreInvoice = async (
  id,
  code,
  invoices,
  returnInvoices
) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Read Partner Store Record By Store Code
    let storeRecord = await partnerStoreModel.readStoreByCode(
      "store_id",
      code,
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
        msg: "Unknown store"
      };

    logicInvoice(partnerRecord, storeRecord, invoices);
    logicReturnInvoice(partnerRecord, storeRecord, returnInvoices);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Keep Invoice
const logicInvoice = async (partnerRecord, storeRecord, invoices) => {
  try {
    return invoices.map(async (invoice, index) => {
      let invoiceId = 0;
      const customerName =
        invoice.customer_name === "" || invoice.customer_name === null
          ? undefined
          : invoice.customer_name.replace(/\b[a-z]/g, function(f) {
              return f.toUpperCase();
            });

      const gstinName =
        invoice.gstin_name === "" || invoice.gstin_name === null
          ? undefined
          : invoice.gstin_name;

      const gstinNumber =
        invoice.gstin_number === "" || invoice.gstin_number === null
          ? undefined
          : invoice.gstin_number;

      let invoiceRecord = await invoiceModel.readInvoice(
        "id",
        partnerRecord[0].partner_id,
        storeRecord[0].store_id,
        invoice.invoice_number
      );

      // Parse
      invoiceRecord = JSON.stringify(invoiceRecord);
      invoiceRecord = JSON.parse(invoiceRecord);

      if (invoiceRecord.length === 0) {
        const recentInsert = await invoiceModel.keepInvoice(
          invoice.invoice_number,
          invoice.counter_key,
          invoice.user_key,
          storeRecord[0].store_id,
          partnerRecord[0].partner_id,
          customerName,
          invoice.customer_mobile,
          invoice.membership_code,
          invoice.total_amount,
          invoice.cashback,
          invoice.total_saving,
          invoice.loyalty_used,
          invoice.invoice_total_amount,
          invoice.sodexo_amount,
          gstinName,
          gstinNumber,
          invoice.round_off_amount,
          invoice.return_status,
          invoice.status,
          1
        );

        if (Array.isArray(recentInsert)) invoiceId = recentInsert[0].insertId;
        else invoiceId = recentInsert.insertId;
      } else {
        invoiceId = invoiceRecord[0].id;

        invoiceModel.updateInvoice(
          invoice.return_status,
          invoice.status,
          1,
          invoiceId
        );
      }

      logicInvoiceCoupon(invoice.invoice_coupon, invoiceId);
      logicInvoicePayment(invoice.invoice_payment, invoiceId);
      logicInvoiceProduct(invoice.invoice_product, invoiceId);
      logicManualDiscount(invoice.manual_discount, invoiceId, invoice.user_key);
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

const logicInvoiceCoupon = async (invoiceCoupon, invoiceId) => {
  try {
    return invoiceCoupon.map(async (coupon, index) => {
      const applicable =
        coupon.applicable === null || coupon.applicable === ""
          ? undefined
          : coupon.applicable;

      invoiceCouponModel.keepInvoiceCoupon(
        invoiceId,
        coupon.barcode,
        applicable,
        coupon.discount,
        coupon.cashback,
        coupon.status
      );
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

const logicInvoicePayment = async (invoicePayment, invoiceId) => {
  try {
    return invoicePayment.map(async (payment, index) => {
      const transaction =
        payment.transaction === null || payment.transaction === ""
          ? undefined
          : payment.transaction;

      const card =
        payment.card === null || payment.card === "" ? undefined : payment.card;

      invoicePaymentModel.keepInvoicePayment(
        invoiceId,
        payment.type,
        payment.amount,
        transaction,
        card,
        payment.status
      );
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

const logicInvoiceProduct = async (invoiceProduct, invoiceId) => {
  try {
    return invoiceProduct.map(async (product, index) => {
      const productName =
        product.name === "" || product.name === null
          ? undefined
          : product.name.replace(/\b[a-z]/g, function(f) {
              return f.toUpperCase();
            });

      const productUnit =
        product.unit === "" || product.unit === null ? undefined : product.unit;

      let productRecord = await invoiceProductModel.readInvoiceProduct(
        "id",
        invoiceId,
        product.barcode
      );

      // Parse
      productRecord = JSON.stringify(productRecord);
      productRecord = JSON.parse(productRecord);

      if (productRecord.length === 0)
        invoiceProductModel.keepInvoiceProduct(
          invoiceId,
          productName,
          product.barcode,
          productUnit,
          product.quantity,
          product.sgst,
          product.cgst,
          product.igst,
          product.price,
          product.discount,
          product.discount_price,
          product.sub_total,
          product.return_status,
          product.status
        );
      else
        invoiceProductModel.updateInvoiceProduct(
          product.return_status,
          product.status,
          productRecord[0].id
        );
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

const logicManualDiscount = async (manualDiscount, invoiceId, userId) => {
  try {
    return manualDiscount.map(async (discount, index) => {
      manualDiscountModel.keepManualDiscount(
        userId,
        invoiceId,
        discount.amount,
        discount.status
      );
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Keep Return Invoice
const logicReturnInvoice = async (
  partnerRecord,
  storeRecord,
  returnInvoices
) => {
  try {
    return returnInvoices.map(async (invoice, index) => {
      const reason =
        invoice.reason === "" || invoice.reason === null
          ? undefined
          : invoice.reason.replace(/\b[a-z]/g, function(f) {
              return f.toUpperCase();
            });

      // let returnRecord = await returnInvoiceModel.readReturnInvoice(
      //   "id",
      //   invoice.invoice_number,
      //   invoice.new_invoice_number,
      //   partnerRecord[0].partner_id,
      //   storeRecord[0].store_id
      // );

      // // Parse
      // returnRecord = JSON.stringify(returnRecord);
      // returnRecord = JSON.parse(returnRecord);

      // if (returnRecord.length === 0)
      returnInvoiceModel.keepReturnInvoice(
        invoice.invoice_number,
        invoice.new_invoice_number,
        invoice.user_key,
        partnerRecord[0].partner_id,
        storeRecord[0].store_id,
        reason,
        invoice.status,
        1
      );
      // else console.log("Logic keep return invoice duplicate record");
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Pos Store Login History
module.exports.logicStoreLoginHistory = async (id, code, historyJson) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Read Partner Store Record By Store Code
    let storeRecord = await partnerStoreModel.readStoreByCode(
      "store_id",
      code,
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
        msg: "Unknown store"
      };

    // Write Login History
    shareController.writeLoginHistory(partnerRecord, storeRecord, historyJson);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Pos Store Error Log
module.exports.logicStoreErrorLog = async (id, code, errorJson) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: [],
        msg: "Unknown partner"
      };

    // Read Partner Store Record By Store Code
    let storeRecord = await partnerStoreModel.readStoreByCode(
      "store_id",
      code,
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
        msg: "Unknown store"
      };

    // Write Login History
    shareController.writeErrorLog(partnerRecord, storeRecord, errorJson);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
