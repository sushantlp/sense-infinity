'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var merchantStore = sequelize.define(
    'merchant_store',
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
  merchantStore.associate = function(models) {
    // associations can be defined here
  };
  return merchantStore;
};

/**
 * Start Database Read and Write
 */

// Read Merchant Store Record
module.exports.readStoreRecord = async (select, merchantId, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM merchant_stores WHERE merchant_id = ? AND status = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [merchantId, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
