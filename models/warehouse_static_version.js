'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var warehouseStaticVersion = sequelize.define('warehouse_static_version', {
    warehouse_static_name: DataTypes.STRING,
    warehouse_static_version: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {});
  warehouseStaticVersion.associate = function(models) {
    // associations can be defined here
  };
  return warehouseStaticVersion;
};



/**
 * Start Database Read and Write
 */

// Read All Warehouse Version
module.exports.readAllWarehouseVersion = async(select, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_static_versions WHERE status = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */