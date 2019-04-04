'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var itemCondition = sequelize.define('item_condition', {
    item_condition_name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  itemCondition.associate = function(models) {
    // associations can be defined here
  };
  return itemCondition;
};


/**
 * Start Database Read and Write
 */


// Read Item Condition List
module.exports.readItemCondition = async(select, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM item_conditions WHERE status = ?`;

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