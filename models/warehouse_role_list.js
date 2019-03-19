'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var warehouseRoleList = sequelize.define('warehouse_role_list', {
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  warehouseRoleList.associate = function(models) {
    // associations can be defined here
  };
  return warehouseRoleList;
};


/**
 * Start Database Read and Write
 */


// Read Warehouse Role List
module.exports.readWarehouseRoleList = async(select, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM warehouse_role_lists WHERE status = ?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};


/**
 * End Database Read and Write
 */