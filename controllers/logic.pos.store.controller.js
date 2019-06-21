"use strict";

// Import Controller
const shareController = require("./share.controller");
const databaseController = require("./database.controller");

// Import Config
const { Gateway } = require("../config/constants");

// Import Model
const partnerStoreModel = require("../models/partner_store");
const warehouseInformationModel = require("../models/warehouse_information_list");
// const userEmployeeConnectModel = require("../models/warehouse_user_employee_connect");
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
const membershipSyncModel = require("../models/membership_sync");
const membershipCardModel = require("../models/membership_card");
const customerModel = require("../models/customer_information_data");
const customerDataModel = require("../models/customer_information_data");
const customerTrackModel = require("../models/customer_information_track");
const cityModel = require("../models/city");
const linkModel = require("../models/partner_link_customer");
const cardModel = require("../models/membership_card");
const cardLinkCustomerModel = require("../models/customer_link_membership_card");
const storeStockModel = require("../models/store_stock");
const storeStockLogModel = require("../models/store_stock_log");
const storeSupplierModel = require("../models/store_supplier_detail");
const storeSupplierInvoiceModel = require("../models/store_supplier_invoice");
const storeSupplierInvoiceProductModel = require("../models/store_supplier_invoice_product");

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

    let productRecord = [];

    if (attribute.length !== 0) {
      // Read Warehouse Product Record By Array
      productRecord = await databaseController.readWarehouseProductArray(
        `product_barcode AS barcode, IFNULL(product_name,'') as product_name, IFNULL(brand_name,'') as brand_name, IFNULL(description,'') as description, global_category_id AS category_id, global_sub_category_id AS sub_category_id, global_sub_sub_category_id AS sub_sub_category_id, product_unit_id AS unit_id, product_sub_unit_id AS sub_unit_id, product_size, selling_price, product_margin, actual_price, sgst, cgst, igst, hsn, sodexo, status`,
        mobile,
        quesmarks,
        attribute
      );
    }
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

    let discountRecord = [];

    if (id.length !== 0) {
      discountRecord = await productDiscountModel.readProductDiscountArray(
        "id, discount_base_id, name, start_date, end_date, start_time, end_time, status",
        marks,
        id
      );

      // Parse
      discountRecord = JSON.stringify(discountRecord);
      discountRecord = JSON.parse(discountRecord);
    }
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

      const invoiceCreatedDate =
        invoice.created_date === "" || invoice.created_date === null
          ? undefined
          : invoice.created_date;

      const invoiceUpdatedDate =
        invoice.updated_date === "" || invoice.updated_date === null
          ? undefined
          : invoice.updated_date;

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
          invoiceCreatedDate,
          invoiceUpdatedDate,
          invoice.home_delivery,
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
      logicManualDiscount(invoice.manual_discount, invoiceId);
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
          product.hsn_code,
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

const logicManualDiscount = async (manualDiscount, invoiceId) => {
  try {
    return manualDiscount.map(async (discount, index) => {
      manualDiscountModel.keepManualDiscount(
        discount.user_key,
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
    shareController.writeLoginHistory(
      partnerRecord[0].partner_id,
      storeRecord[0].store_id,
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
    shareController.writeErrorLog(
      partnerRecord[0].partner_id,
      storeRecord[0].store_id,
      errorJson
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

// Logic Get New Membership Card
module.exports.logicMembershipCard = async (id, code) => {
  try {
    // Call User Partner Data
    const partnerRecord = await shareController.userPartnerData(id);

    if (partnerRecord.length === 0)
      return {
        success: false,
        data: {},
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
        data: {},
        msg: "Unknown store"
      };

    const cards = await checkNewCardGeneration(partnerRecord, storeRecord);

    if (cards.data.length === 0)
      return {
        success: true,
        data: {
          membership_card: cards.data,
          next: cards.next,
          id: cards.id
        },
        msg: "Successful",
        count: cards.data.length
      };
    else
      return {
        success: true,
        data: {
          membership_card: cards.data,
          next: cards.next,
          id: cards.id
        },
        msg: "Successful",
        count: cards.length
      };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Check New Membership Card Generation
const checkNewCardGeneration = async (partnerRecord, storeRecord) => {
  try {
    let syncRecord = await membershipSyncModel.readMembershipSync(
      partnerRecord[0].partner_id,
      storeRecord[0].store_id,
      1,
      1
    );

    // Parse
    syncRecord = JSON.stringify(syncRecord);
    syncRecord = JSON.parse(syncRecord);

    if (syncRecord.length === 0)
      return {
        success: true,
        data: syncRecord,
        next: false,
        id: 0
      };

    let cardRecord = await membershipCardModel.readMembershipBetween(
      "membership_card_number AS card_number",
      syncRecord[0].membership_start_id,
      syncRecord[0].membership_end_id,
      1
    );

    // Parse
    cardRecord = JSON.stringify(cardRecord);
    cardRecord = JSON.parse(cardRecord);

    if (cardRecord.length === 0)
      return {
        success: true,
        data: cardRecord,
        next: false,
        id: 0
      };
    else
      return {
        success: true,
        data: cardRecord,
        next: syncRecord.length > 1 ? true : false,
        id: syncRecord[0].id
      };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Deactivated Membership Sync
module.exports.logicMembershipSync = async (id, code, syncId) => {
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

    membershipSyncModel.updateMembershipSync(0, 1, syncId);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Get Customer Detail
module.exports.logicGetCustomers = async (id, code) => {
  try {
    return {
      success: true,
      data: await getCustomerDetail(),
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Get All Customer Detail
const getCustomerDetail = async () => {
  try {
    // Variable
    let stop = true;
    let customer = [];
    let lowerLimit = 0;
    const upperLimit = 1000;

    while (stop) {
      let record = await customerModel.readCustomerByLimit(
        "CASE WHEN customer_information_data.first_name <> 'fake' THEN customer_information_data.first_name ELSE '' END AS first_name, CASE WHEN customer_information_data.last_name <> 'fake' THEN customer_information_data.last_name ELSE '' END AS last_name, CASE WHEN customer_information_data.email <> 'NULL' THEN customer_information_data.email ELSE '' END AS email, customer_information_data.mobile, IFNULL(membership_cards.membership_card_number, 0) AS card_number",
        lowerLimit,
        upperLimit,
        1
      );

      // Parse
      record = JSON.stringify(record);
      record = JSON.parse(record);

      // Increase Lower Limit
      lowerLimit = lowerLimit + upperLimit;

      if (record.length === 0) stop = false;
      else if (record.length < upperLimit) {
        customer.push(record);
        stop = false;
      } else customer.push(record);
    }

    if (!stop) return customer.length >= 1 ? customer[0] : customer;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Post Customer Detail
module.exports.logicPostCustomers = async (id, code, customers) => {
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

    postCustomerDetail(partnerRecord, storeRecord, customers);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Customer Detail
const postCustomerDetail = async (partnerRecord, storeRecord, customers) => {
  try {
    // Partner Constant Table Exist
    const senseConstant = await databaseController.showConstantTable(
      partnerRecord[0].mobile,
      storeRecord[0].store_id
    );

    // Zero Means Empty Record
    if (senseConstant.length === 0) {
      // Create Partner Constant Store Table
      await databaseController.createConstantTable(
        partnerRecord[0].mobile,
        storeRecord[0].store_id
      );

      // Logic Keep Partner Constant
      await shareController.logicMerchantConstant(
        partnerRecord[0].mobile,
        storeRecord[0].store_id
      );
    }

    // Read Constant Record
    const constant = await databaseController.readConstantRecordName(
      "*",
      partnerRecord[0].mobile,
      storeRecord[0].store_id,
      "CUSTOMER_IDENTITY_APP_VERSION",
      1
    );

    return customers.map(async (customer, index) => {
      // Block Variable
      let cityCode = 0;
      let customerId = undefined;

      // Reform Customer Detail
      const reform = shareController.reformCustomerDetail(
        customer.first_name,
        customer.last_name,
        undefined,
        customer.birth,
        undefined,
        undefined,
        customer.address_one,
        customer.address_two,
        customer.landmark,
        true
      );

      // Read Customer Information Data By Mobile
      let customerRecord = await customerDataModel.readCustomerDataMobile(
        "*",
        customer.mobile,
        1
      );

      // Parse
      customerRecord = JSON.stringify(customerRecord);
      customerRecord = JSON.parse(customerRecord);

      // Read City Record By City Id
      let cityRecord = await cityModel.readCityBYId("*", customer.city, 1);

      // Parse
      cityRecord = JSON.stringify(cityRecord);
      cityRecord = JSON.parse(cityRecord);

      if (cityRecord.length !== 0) cityCode = cityRecord[0].country_code;

      if (customerRecord.length === 0) {
        // Keep Customer Information Data
        let lastRecord = await customerDataModel.keepCustomerData(
          reform.first_name,
          reform.last_name,
          customer.email,
          customer.mobile,
          cityCode,
          reform.dob,
          parseInt(customer.gender, 10),
          parseInt(customer.city, 10),
          parseInt(customer.locality, 10),
          0,
          reform.address_one,
          reform.address_two,
          reform.landmark,
          reform.spouse_name,
          reform.anniversary,
          customer.status
        );

        // Parse
        lastRecord = JSON.stringify(lastRecord);
        lastRecord = JSON.parse(lastRecord);

        if (Array.isArray(lastRecord)) customerId = lastRecord[0].insertId;
        else customerId = lastRecord.insertId;
      } else {
        // ReIntialize
        customerId = customerRecord[0].customer_information_id;

        // Update Customer Information Data
        customerDataModel.updateCustomerData(
          reform.first_name,
          reform.last_name,
          customer.email,
          reform.dob,
          parseInt(customer.gender, 10),
          parseInt(customer.city, 10),
          parseInt(customer.locality, 10),
          0,
          reform.address_one,
          reform.address_two,
          reform.landmark,
          reform.spouse_name,
          reform.anniversary,
          customerId
        );
      }

      // Read Merchant Link Customer
      const linkValue = await linkModel.readMerchantLinkCustomer(
        "*",
        partnerRecord[0].partner_id,
        storeRecord[0].store_id,
        customerId,
        1
      );

      if (linkValue.length === 0)
        linkModel.keepMerchantLinkCustomer(
          partnerRecord[0].partner_id,
          storeRecord[0].store_id,
          customerId,
          1
        );

      if (linkValue.length === 0)
        linkModel.keepMerchantLinkCustomer(
          partnerRecord[0].partner_id,
          storeRecord[0].store_id,
          customerId,
          1
        );

      // Logic Membership Card
      if (customer.card !== 0) {
        // Read Membership Card
        let cardRecord = await cardModel.readMembershipCard(
          "id",
          customer.card,
          1
        );

        // Parse
        cardRecord = JSON.stringify(cardRecord);
        cardRecord = JSON.parse(cardRecord);

        if (cardRecord.length === 0) console.log("Card not found");
        else {
          let linkRecord = await cardLinkCustomerModel.readCardOwner(
            "*",
            cardRecord[0].id,
            1
          );

          // Parse
          linkRecord = JSON.stringify(linkRecord);
          linkRecord = JSON.parse(linkRecord);

          if (linkRecord.length === 0)
            cardLinkCustomerModel.keepLinkCustomerMembershipCard(
              customerId,
              cardRecord[0].id,
              1
            );
          else {
            // One Membership Card to One Customer
            if (linkRecord[0].customer_information_id !== customerId)
              console.log("Alert");
            // Send Admin Mail
          }
        }
      }

      // Keep Information Track
      customerTrackModel.keepInformationTrack(
        reform.first_name,
        reform.last_name,
        customer.email,
        customer.mobile,
        cityCode,
        reform.dob,
        parseInt(customer.gender, 10),
        parseInt(customer.city, 10),
        parseInt(customer.locality, 10),
        partnerRecord[0].partner_id,
        storeRecord[0].store_id,
        0,
        reform.address_one,
        reform.address_two,
        reform.landmark,
        reform.spouse_name,
        reform.anniversary,
        Gateway.POS,
        1
      );
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Store Stocks Record
module.exports.logicStoreStock = async (id, code, stocks) => {
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

    postStoreStock(partnerRecord, storeRecord, stocks);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Post Store Stock Detail
const postStoreStock = async (partnerRecord, storeRecord, stocks) => {
  try {
    return stocks.map(async (stock, index) => {
      let stockRecord = await storeStockModel.readStockSearchByBarcode(
        "id",
        partnerRecord[0].partner_id,
        storeRecord[0].store_id,
        stock.barcode
      );

      // Parse
      stockRecord = JSON.stringify(stockRecord);
      stockRecord = JSON.parse(stockRecord);

      if (stockRecord.length === 0)
        storeStockModel.keepStoreStock(
          partnerRecord[0].partner_id,
          storeRecord[0].store_id,
          stock.barcode,
          parseInt(stock.quantity, 10),
          1,
          stock.status
        );
      else
        storeStockModel.updateStoreStock(
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

// Logic Store Stocks Log Record
module.exports.logicStoreStockLog = async (id, code, stocks) => {
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

    postStoreStockLog(partnerRecord, storeRecord, stocks);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Post Store Stock Log
const postStoreStockLog = async (partnerRecord, storeRecord, stocks) => {
  try {
    return stocks.map(async (stock, index) => {
      storeStockLogModel.keepStoreStockLog(
        stock.user_key,
        partnerRecord[0].partner_id,
        storeRecord[0].store_id,
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

// Logic Store Supplier Detail
module.exports.logicStoreSupplierDetail = async (id, code, suppliers) => {
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

    storeSupplierDetail(storeRecord, suppliers);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Post Store Supplier Detail
const storeSupplierDetail = async (storeRecord, suppliers) => {
  try {
    return suppliers.map(async (supplier, index) => {
      const reform = shareController.reformSupplierRecord(
        supplier.supplier_name,
        supplier.address_one,
        supplier.address_two,
        supplier.landmark,
        supplier.state,
        supplier.city,
        supplier.country,
        supplier.email,
        supplier.gstin,
        supplier.cin,
        supplier.pan,
        supplier.note
      );

      let supplierRecord = await storeSupplierModel.readStoreSupplier(
        "id",
        storeRecord[0].store_id,
        supplier.supplier_id
      );

      // Parse
      supplierRecord = JSON.stringify(supplierRecord);
      supplierRecord = JSON.parse(supplierRecord);

      if (supplierRecord.length === 0)
        storeSupplierModel.keepStoreSupplier(
          supplier.supplier_id,
          storeRecord[0].store_id,
          reform.supplierName,
          reform.addressOne,
          reform.addressTwo,
          reform.landmark,
          reform.state,
          reform.city,
          reform.country,
          supplier.pincode,
          supplier.mobile,
          reform.email,
          reform.gstin,
          reform.cin,
          reform.pan,
          reform.note,
          supplier.status
        );
      else
        storeSupplierModel.updateStoreSupplier(
          reform.supplierName,
          reform.addressOne,
          reform.addressTwo,
          reform.landmark,
          reform.state,
          reform.city,
          reform.country,
          supplier.pincode,
          supplier.mobile,
          reform.email,
          reform.gstin,
          reform.cin,
          reform.pan,
          reform.note,
          supplier.status,
          supplierRecord[0].id
        );
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Store Supplier Invoice
module.exports.logicStoreSupplierInvoice = async (id, code, invoices) => {
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

    storeSupplierInvoice(storeRecord, invoices);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Store Supplier Invoice
const storeSupplierInvoice = async (storeRecord, invoices) => {
  try {
    return invoices.map(async (invoice, index) => {
      const reform = shareController.reformSupplierInvoiceRecord(
        invoice.supplier_name,
        invoice.address_one,
        invoice.address_two,
        invoice.landmark,
        invoice.state,
        invoice.city,
        invoice.country,
        invoice.email,
        invoice.gstin,
        invoice.cin,
        invoice.pan,
        invoice.note,
        invoice.sn_name,
        invoice.rt_name,
        invoice.payment_type,
        invoice.payment_date,
        invoice.reference_number,
        invoice.eway_bill,
        invoice.s_note
      );

      let invoiceRecord = await storeSupplierInvoiceModel.readStoreSupplierInvoice(
        "id",
        storeRecord[0].store_id,
        parseInt(invoice.invoice_number, 10),
        1
      );

      // Parse
      invoiceRecord = JSON.stringify(invoiceRecord);
      invoiceRecord = JSON.parse(invoiceRecord);

      if (invoiceRecord.length === 0) {
        let recentKey = await storeSupplierInvoiceModel.keepStoreSupplierInvoice(
          storeRecord[0].store_id,
          parseInt(invoice.invoice_number, 10),
          reform.supplierName,
          reform.addressOne,
          reform.addressTwo,
          reform.landmark,
          reform.state,
          reform.city,
          reform.country,
          parseInt(invoice.pincode, 10),
          parseInt(invoice.mobile, 10),
          reform.email,
          reform.gstin,
          reform.cin,
          reform.pan,
          reform.note,
          invoice.inv_no,
          invoice.invoice_date,
          reform.snName,
          reform.rtName,
          parseInt(invoice.sm_phone, 10),
          invoice.del_date,
          parseFloat(invoice.total_amount),
          parseInt(invoice.payment_status, 10),
          reform.paymentType,
          reform.paymentDate,
          reform.paymentReference,
          reform.eWayBill,
          reform.sNote,
          parseInt(invoice.user_id, 10),
          1
        );

        if (Array.isArray(recentKey)) recentKey = recentKey[0].insertId;
        else recentKey = recentKey.insertId;

        storeSupplierInvoiceProduct(recentKey, invoice.invoice_product);
      } else {
        await storeSupplierInvoiceModel.updateStoreSupplierInvoice(
          0,
          storeRecord[0].store_id,
          parseInt(invoice.invoice_number, 10)
        );

        storeSupplierInvoiceProductModel.updateStoreSupplierInvoiceProduct(
          0,
          invoiceRecord[0].id
        );

        let recentKey = await storeSupplierInvoiceModel.keepStoreSupplierInvoice(
          storeRecord[0].store_id,
          parseInt(invoice.invoice_number, 10),
          reform.supplierName,
          reform.addressOne,
          reform.addressTwo,
          reform.landmark,
          reform.state,
          reform.city,
          reform.country,
          parseInt(invoice.pincode, 10),
          parseInt(invoice.mobile, 10),
          reform.email,
          reform.gstin,
          reform.cin,
          reform.pan,
          reform.note,
          invoice.inv_no,
          invoice.invoice_date,
          reform.snName,
          reform.rtName,
          parseInt(invoice.sm_phone, 10),
          invoice.del_date,
          parseFloat(invoice.total_amount),
          parseInt(invoice.payment_status, 10),
          reform.paymentType,
          reform.paymentDate,
          reform.paymentReference,
          reform.eWayBill,
          reform.sNote,
          parseInt(invoice.user_id, 10),
          1
        );

        if (Array.isArray(recentKey)) recentKey = recentKey[0].insertId;
        else recentKey = recentKey.insertId;

        storeSupplierInvoiceProduct(recentKey, invoice.invoice_product);
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Store Supplier Invoice Product
const storeSupplierInvoiceProduct = async (key, products) => {
  try {
    return products.map(async (product, index) => {
      let productName = undefined;
      let unit = undefined;

      if (
        product.product_name !== "" &&
        product.product_name !== null &&
        typeof product.product_name !== "undefined"
      )
        productName = product.product_name.replace(/\b[a-z]/g, function(f) {
          return f.toUpperCase();
        });

      if (
        product.unit !== "" &&
        product.unit !== null &&
        typeof product.unit !== "undefined"
      )
        unit = product.unit;

      storeSupplierInvoiceProductModel.keepStoreSupplierInvoiceProduct(
        key,
        parseInt(product.product_code, 10),
        parseInt(product.product_type, 10),
        productName,
        parseInt(product.hsn_code, 10),
        parseFloat(product.mrp),
        parseFloat(product.quantity),
        parseFloat(product.free_quantity),
        parseFloat(product.rate),
        parseFloat(product.unit_value),
        unit,
        parseFloat(product.pri_sch),
        parseFloat(product.sec_sch),
        parseFloat(product.spl_disc),
        parseFloat(product.cgst),
        parseFloat(product.sgst),
        parseFloat(product.igst),
        parseFloat(product.margin),
        parseFloat(product.total_amount),
        1
      );
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
