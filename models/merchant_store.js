"use strict";

const mysql = require("mysql2/promise");

module.exports = (sequelize, DataTypes) => {
  var merchant_store = sequelize.define(
    "merchant_store",
    {
      merchant_id: DataTypes.INTEGER,
      store_name: DataTypes.STRING,
      address: DataTypes.TEXT,
      address_op1: DataTypes.TEXT,
      landmark: DataTypes.TEXT,
      city_id: DataTypes.INTEGER,
      locality_id: DataTypes.INTEGER,
      pincode: DataTypes.INTEGER,
      longitude: DataTypes.DOUBLE,
      latitude: DataTypes.DOUBLE,
      status: DataTypes.BOOLEAN,
      sense: DataTypes.BOOLEAN
    },
    {}
  );
  merchant_store.associate = function(models) {
    // associations can be defined here
  };
  return merchant_store;
};

/**
 * Start Database Read and Write
 */

// Read Merchant Store Record
module.exports.readStoreRecord = async (select, merchantId, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT ${select} FROM merchant_stores WHERE merchant_id = ? AND status = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      merchantId,
      status
    ]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
