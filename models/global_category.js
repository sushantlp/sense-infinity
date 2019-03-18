'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var globalCategory = sequelize.define('global_category', {
    global_category_name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  globalCategory.associate = function(models) {
    // associations can be defined here
  };
  return globalCategory;
};


/**
 * Start Database Read and Write
 */


// Read Global Category
module.exports.readGlobalCategory = async(select, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM global_categories WHERE status = ?`;

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