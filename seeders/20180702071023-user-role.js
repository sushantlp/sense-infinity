"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "user_roles", [{
          role_name: "Partner",
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        }, {
          role_name: "Administrator",
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        }, {
          role_name: "Customer",
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },

      ], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user_roles", null, {});
  }
};