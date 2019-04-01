'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "tax_tables", [{
        hsn: 1234,
        sgst: 2.5,
        cgst: 2.5,
        igst: 2.5,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        hsn: 1235,
        sgst: 2.5,
        cgst: 2.5,
        igst: 2.5,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        hsn: 1236,
        sgst: 2.5,
        cgst: 2.5,
        igst: 2.5,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        hsn: 1237,
        sgst: 2.5,
        cgst: 2.5,
        igst: 2.5,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        hsn: 1238,
        sgst: 2.5,
        cgst: 2.5,
        igst: 2.5,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tax_tables", null, {});
  }
};