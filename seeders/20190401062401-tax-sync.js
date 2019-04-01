'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "tax_syncs", [{
        partner_id: 1,
        attributes: '{"hsn":[{"tax_id":1,"status":"PUBLISH"},{"tax_id":2,"status":"UNPUBLISH"},{"tax_id":3,"status":"PUBLISH"},{"tax_id":4,"status":"PUBLISH"},{"tax_id":5,"status":"PUBLISH"}]}',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tax_syncs", null, {});
  }
};