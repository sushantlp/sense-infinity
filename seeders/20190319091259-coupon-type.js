'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "coupon_types", [{
        coupon_type_name: "Bill Level Discount",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        coupon_type_name: "Product Level Discount",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("coupon_types", null, {});
  }
};