'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var globalSubSubCategory = sequelize.define('global_sub_sub_category', {
    global_sub_sub_category_name: DataTypes.STRING,
    global_sub_category_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  globalSubSubCategory.associate = function(models) {
    // associations can be defined here
  };
  return globalSubSubCategory;
};


/**
 * Start Database Read and Write
 */


// Read Sub Sub Global Category
module.exports.readSubSubGlobalCategory = async(select, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM global_sub_sub_categories WHERE status = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Sub Sub Global Category By Name
module.exports.readSubSubGlobalCategoryName = async(select, name, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM global_sub_sub_categories WHERE global_sub_sub_category_name = ? AND status = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [name, status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};


/**
 * End Database Read and Write
 */