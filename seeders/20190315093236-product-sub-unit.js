'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "product_sub_units", [{
        product_unit_id: 1,
        product_sub_unit_name: "Kg",
        product_sub_unit_value: "Kilograms",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        product_unit_id: 1,
        product_sub_unit_name: "Gm",
        product_sub_unit_value: "Grams",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        product_unit_id: 1,
        product_sub_unit_name: "Mg",
        product_sub_unit_value: "Milligrams",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        product_unit_id: 2,
        product_sub_unit_name: "Ltr",
        product_sub_unit_value: "Litres",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        product_unit_id: 2,
        product_sub_unit_name: "Ml",
        product_sub_unit_value: "Millilitres",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        product_unit_id: 3,
        product_sub_unit_name: "M",
        product_sub_unit_value: "Meters",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        product_unit_id: 3,
        product_sub_unit_name: "In",
        product_sub_unit_value: "Inches",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        product_unit_id: 3,
        product_sub_unit_name: "Cm",
        product_sub_unit_value: "Centimeters",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("product_sub_units", null, {});
  }
};