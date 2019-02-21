'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var partnerStore = sequelize.define(
    'partner_store', {
      partner_id: DataTypes.INTEGER,
      store_name: DataTypes.STRING,
      address_one: DataTypes.TEXT,
      address_two: DataTypes.TEXT,
      landmark: DataTypes.TEXT,
      city_id: DataTypes.INTEGER,
      locality_id: DataTypes.INTEGER,
      pincode: DataTypes.INTEGER,
      longitude: DataTypes.DOUBLE,
      latitude: DataTypes.DOUBLE,
      status: DataTypes.BOOLEAN,
      sense: DataTypes.BOOLEAN
    }, {}
  );
  partnerStore.associate = function(models) {
    // associations can be defined here
  };
  return partnerStore;
};

/**
 * Start Database Read and Write
 */

// Read Merchant Store Record
module.exports.readStoreRecord = async(select, merchantId, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM partner_stores WHERE partner_id = ? AND status = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [merchantId, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Merchant Store Record By Store Id
module.exports.readStoreById = async(select, storeId, status) => {
  try {

    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM partner_stores WHERE store_id = ? AND status = ? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [storeId, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */