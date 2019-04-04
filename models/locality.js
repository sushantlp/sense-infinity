'use strict';

// Import Config
const constants = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  var locality = sequelize.define(
    'locality', {
      city_id: DataTypes.INTEGER,
      locality_name: DataTypes.STRING,
      pincode: DataTypes.INTEGER,
      longitude: DataTypes.DOUBLE,
      latitude: DataTypes.DOUBLE,
      status: DataTypes.BOOLEAN
    }, {}
  );
  locality.associate = function(models) {
    // associations can be defined here
  };
  return locality;
};

/**
 * Start Database Read and Write
 */

// Read Locality Record
module.exports.readLocalityRecord = async(select, status) => {
  try {

    // Get Pool Object
    const pool = constants.createMysqlConnection();

    // Create Connection
    const connection = await pool.getConnection();

    // Query
    const query = `SELECT ${select} FROM localities WHERE status=?`;

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