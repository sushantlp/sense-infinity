'use strict';

// Import Package
const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "system_administrator_passwords", [{
        warehouse_role_id: 1,
        password: bcrypt.hashSync(process.env.SALT_KEY, 10),
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("system_administrator_passwords", null, {});
  }
};