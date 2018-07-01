"use strict";

const moment = require("moment");
const mysql = require("mysql2/promise");
const dotEnv = require("dotenv");

module.exports = (sequelize, DataTypes) => {
  var store_complain = sequelize.define(
    "store_complain",
    {
      cust_identity_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
      merchant_id: DataTypes.INTEGER,
      complain: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  store_complain.associate = function(models) {
    // associations can be defined here
  };
  return store_complain;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Get Store Complain
// module.exports.getStoreComplain = (storeId, merchantId, customerId, status) => {
//   // Query
//   const query =
//     "SELECT * FROM `StoreComplains` WHERE `store_id` = ? AND `cust_identity_id` = ? AND `merchant_id = ? `AND `status` = ? ORDER BY `created_at` DESC LIMIT 1";

//   return new Promise(function(resolve, reject) {
//     mysqlObject.execute(
//       query,
//       [storeId, customerId, merchantId, status],
//       function(err, row) {
//         if (err) {
//           return reject(err);
//         }
//         return resolve(row);
//       }
//     );
//   });
// };

// // Keep Merchant Store Complain
// module.exports.keepMerchantStoreComplain = (
//   customerId,
//   merchantId,
//   storeId,
//   desc
// ) => {
//   // Query
//   const query =
//     "INSERT INTO `StoreComplains` (`cust_identity_id`, `merchant_id`, `store_id`, `complain`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?)";

//   return new Promise(function(resolve, reject) {
//     mysqlObject.execute(
//       query,
//       [customerId, merchantId, storeId, desc, 1, now, now],
//       function(err, row) {
//         if (err) {
//           return reject(err);
//         }
//         return resolve(row);
//       }
//     );
//   });
// };

// // Get Only One Record Merchant Store Complain
// module.exports.limitMerchantStoreComplain = (
//   customerId,
//   merchantId,
//   storeId,
//   status
// ) => {
//   // Query
//   const query =
//     "SELECT * FROM `StoreComplains` WHERE `cust_identity_id` = ? AND `merchant_id` = ? AND `store_id` = ? AND `status` = ? ORDER BY `created_at` DESC LIMIT 1";

//   return new Promise(function(resolve, reject) {
//     mysqlObject.execute(
//       query,
//       [customerId, merchantId, storeId, status],
//       function(err, row) {
//         if (err) {
//           return reject(err);
//         }
//         return resolve(row);
//       }
//     );
//   });
// };

// // Update Merchant Store Complain
// module.exports.updateMerchantStoreComplain = (
//   complainId,
//   description,
//   status
// ) => {
//   // Query
//   const query =
//     "UPDATE `StoreComplains` SET `complain` = ?, `status` = ?, `created_at` = ? WHERE `complain_id` = ?";

//   return new Promise(function(resolve, reject) {
//     mysqlObject.execute(query, [description, status, now, complainId], function(
//       err,
//       row
//     ) {
//       if (err) {
//         return reject(err);
//       }
//       return resolve(row);
//     });
//   });
// };

/**
 * End Database Read and Write
 */
