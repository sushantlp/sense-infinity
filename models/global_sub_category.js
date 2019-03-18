'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var globalSubCategory = sequelize.define('global_sub_category', {
    global_sub_category_name: DataTypes.STRING,
    global_category_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  globalSubCategory.associate = function(models) {
    // associations can be defined here
  };
  return globalSubCategory;
};


/**
 * Start Database Read and Write
 */


// Read Sub Global Category
module.exports.readSubGlobalCategory = async(select, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM global_sub_categories WHERE status = ?`;

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