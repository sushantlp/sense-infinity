"use strict";

const moment = require("moment-timezone");
const mysql = require("mysql2/promise");

module.exports = (sequelize, DataTypes) => {
  var customerinfotrack = sequelize.define(
    "customer_info_track",
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.STRING,
      dob: DataTypes.STRING,
      gender_id: DataTypes.INTEGER,
      merchant_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
      offer_id: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  customerinfotrack.associate = function(models) {
    // associations can be defined here
  };
  return customerinfotrack;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Keep Customer Track Detail
module.exports.keepCustomerDetail = async (
  firstName,
  lastName,
  email,
  mobile,
  dob,
  genderId,
  merchantId,
  storeId,
  offerId,
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
      "INSERT INTO `customer_info_tracks` (`first_name`,`last_name`,`email`,`mobile`,`dob`,`gender_id`,`merchant_id`,`store_id`,`offer_id`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.execute(query, [
      firstName,
      lastName,
      email,
      mobile,
      dob,
      genderId,
      merchantId,
      storeId,
      offerId,
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

// // Keep Customer Track Detail
// module.exports.keepCustomerTrackDetail = (
//   firstName,
//   lastName,
//   email,
//   mobile,
//   dob,
//   genderId,
//   merchantId,
//   storeId,
//   offerId,
//   status
// ) => {
//   // Query
//   const query =
//     "INSERT INTO `CustomerInfoTracks` (`first_name`, `last_name`, `email`, `mobile`, `dob`, `gender_id`, `merchant_id`, `store_id`, `offer_id`, `status`, `created_at`, `updated_at`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";

//   return new Promise(function(resolve, reject) {
//     mysqlObject.execute(
//       query,
//       [
//         firstName,
//         lastName,
//         email,
//         mobile,
//         dob,
//         genderId,
//         merchantId,
//         storeId,
//         offerId,
//         status,
//         now,
//         now
//       ],
//       function(err, row) {
//         if (err) {
//           return reject(err);
//         }
//         return resolve(row);
//       }
//     );
//   });
// };
/**
 * End Database Read and Write
 */
