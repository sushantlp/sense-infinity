'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "discount_types", [{
        discount_type: "Bill Level Discount",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        discount_type: "Product Level Discount",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("discount_types", null, {});
  }
};