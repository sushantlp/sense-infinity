'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "order_statuses", [{
        order_status_name: "Pending",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        order_status_name: "Delivered",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        order_status_name: "Cancelled",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("order_statuses", null, {});
  }
};