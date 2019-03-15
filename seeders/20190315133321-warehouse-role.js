'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "warehouse_role_lists", [{
        name: "System Administrator",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: "Administrator",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: "Manager",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: "Biller",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("warehouse_role_lists", null, {});
  }
};