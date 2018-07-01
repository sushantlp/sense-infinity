"use strict";
module.exports = (sequelize, DataTypes) => {
  var locality = sequelize.define(
    "locality",
    {
      city_id: DataTypes.INTEGER,
      locality_name: DataTypes.STRING,
      pincode: DataTypes.INTEGER,
      longitude: DataTypes.DOUBLE,
      latitude: DataTypes.DOUBLE,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  locality.associate = function(models) {
    // associations can be defined here
  };
  return locality;
};

/**
 * Start Database Read and Write
 */

// // Get All Locality Record
// module.exports.getAllLocality = status => {
//   // Query
//   const query =
//     "SELECT locality_id AS locality_unique, city_id AS city_unique, locality_name AS locality, pincode, longitude AS lon, latitude AS lat FROM `Localities` WHERE `status`=?";

//   return new Promise(function(resolve, reject) {
//     mysqlObject.execute(query, [status], function(err, row) {
//       if (err) {
//         return reject(err);
//       }
//       return resolve(row);
//     });
//   });
// };

// Read Locality Record
module.exports.readLocalityRecord = async (select, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT ${select} FROM localities WHERE status=?`;

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
