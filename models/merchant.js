"use strict";
module.exports = (sequelize, DataTypes) => {
  var merchant = sequelize.define(
    "merchant",
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      business_name: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.STRING,
      city_id: DataTypes.INTEGER,
      locality_id: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      longitude: DataTypes.DOUBLE,
      latitude: DataTypes.DOUBLE,
      category_id: DataTypes.INTEGER,
      manager_id: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  merchant.associate = function(models) {
    // associations can be defined here
  };
  return merchant;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Gender Record
module.exports.readMerchantByMobile = async (select, mobile, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT ${select} FROM merchants WHERE mobile=? AND status=? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Get Merchant Detail By Mobile
// module.exports.getMerchantByMobile = (mobile, status) => {
//   return new Promise(function(resolve, reject) {
//     mysqlObject.execute(
//       "SELECT * FROM `Merchants` WHERE `mobile` = ? AND `status` = ? LIMIT 1",
//       [mobile, status],
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
