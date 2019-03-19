'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "coupon_sub_types", [{
        coupon_type_id: 1,
        coupon_sub_type_name: "Cash",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        coupon_type_id: 1,
        coupon_sub_type_name: "Cashback",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        coupon_type_id: 1,
        coupon_sub_type_name: "Complementary Product",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        coupon_type_id: 2,
        coupon_sub_type_name: "Cash Discount On Product",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        coupon_type_id: 2,
        coupon_sub_type_name: "Cashback On Product",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        coupon_type_id: 2,
        coupon_sub_type_name: "Complementary On Product",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        coupon_type_id: 2,
        coupon_sub_type_name: "Cash Discount On Category",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        coupon_type_id: 2,
        coupon_sub_type_name: "Cashback On Category",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        coupon_type_id: 2,
        coupon_sub_type_name: "Complementary On Category",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        coupon_type_id: 2,
        coupon_sub_type_name: "Product Combo",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("coupon_sub_types", null, {});
  }
};