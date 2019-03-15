'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "warehouse_payment_types", [{
        payment_name: "Card",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        payment_name: "Sodexo",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        payment_name: "Cash",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("warehouse_payment_types", null, {});
  }
};