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
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM item_conditions WHERE status = ?`;

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