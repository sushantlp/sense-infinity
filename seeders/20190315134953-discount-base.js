'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "discount_bases", [{
        discount_base_type: "Cash",
        discount_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        discount_base_type: "Percent",
        discount_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        discount_base_type: "Cash",
        discount_id: 2,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        discount_base_type: "Percent",
        discount_id: 2,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        discount_base_type: "Quantity",
        discount_id: 2,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("discount_bases", null, {});
  }
};