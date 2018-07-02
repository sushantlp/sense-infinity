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

// Read Store Complain Record
module.exports.readStoreComplain = async (
  select,
  storeId,
  merchantId,
  customerId,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT ${select} FROM store_complains store_id=? AND cust_identity_id=? AND merchant_id=? AND status=? ORDER BY created_at DESC LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      storeId,
      customerId,
      merchantId,
      status
    ]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

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
//
//
//
// };

// Keep Merchant Store Complain
module.exports.keepStoreComplain = async (
  customerId,
  merchantId,
  storeId,
  desc,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query =
      "INSERT INTO `store_complains` (`cust_identity_id`,`merchant_id`,`store_id`,`complain`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.execute(query, [
      customerId,
      merchantId,
      storeId,
      desc,
      status,
      now,
      now
    ]);

    connection.close();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

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

// Update Merchant Store Complain
module.exports.updateStoreComplain = async (
  complainId,
  description,
  status
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query =
      "UPDATE `store_complains` SET `complain`=?,`status`=?,`updated_at`=? WHERE `complain_id`=?";

    // Query Database
    const row = await connection.execute(query, [
      complainId,
      description,
      status,
      now,
      now
    ]);

    connection.close();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};
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
