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

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM global_categories WHERE status = ?`;

    // Query Database
    const [rows, fields] = await connection.query(query, [status]);

    connection.release();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Global Category By Name
module.exports.readGlobalCategoryName = async(select, name, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM global_categories WHERE global_category_name = ? AND status = ?`;

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