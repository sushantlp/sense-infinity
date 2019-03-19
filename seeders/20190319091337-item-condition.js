'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "item_conditions", [{
        item_condition_name: "Normal",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        item_condition_name: "Defective",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("item_conditions", null, {});
  }
};