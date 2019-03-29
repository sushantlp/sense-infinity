'use strict';

// Import Package
const moment = require("moment-timezone");

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var taxTable = sequelize.define('tax_table', {
    hsn: DataTypes.INTEGER,
    sgst: DataTypes.FLOAT,
    cgst: DataTypes.FLOAT,
    igst: DataTypes.FLOAT,
    change_status: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN
  }, {});
  taxTable.associate = function(models) {
    // associations can be defined here
  };
  return taxTable;
};


// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");


/**
 * Start Database Read and Write
 */


// Read Tax Table Record
module.exports.readTax = async(select, changeStatus) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM tax_tables WHERE change_status = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [changeStatus]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};


// Update Change Status Tax
module.exports.changeStatusTax = async(status) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = "UPDATE `tax_tables` SET `change_status` = ?, `updated_at` = ?";

    // Query Database
    const row = await connection.execute(query, [status, now]);

    connection.close();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */