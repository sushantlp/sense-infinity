'use strict';
module.exports = (sequelize, DataTypes) => {
  var productSubUnit = sequelize.define('product_sub_unit', {
    product_sub_unit_name: DataTypes.STRING,
    product_sub_unit_value: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  productSubUnit.associate = function(models) {
    // associations can be defined here
  };
  return productSubUnit;
};


/**
 * Start Database Read and Write
 */


// Read Product Sub Unit List
module.exports.readProductSubUnit = async(select, status) => {
  try {
    // Create Mysql Connection
    const connection = await constants.createMysqlConnection();

    // Query
    const query = `SELECT ${select} FROM product_sub_units WHERE status = ?`;

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