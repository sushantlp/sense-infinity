'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "tax_syncs", [{
        partner_id: 1,
        attributes: '{"product":[{"product_id":1,"status":"PUBLISH","sub_product":[{"barcode":123456,"status":"PUBLISH"},"barcode":123456,"status":"PUBLISH"}]}]}',
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