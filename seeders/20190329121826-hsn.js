'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "tax_tables", [{
        hsn: 1234,
        sgst: 2.5,
        cgst: 2.5,
        igst: 2.5,
        change_status: 1,
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