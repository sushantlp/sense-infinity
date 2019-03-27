'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "global_categories", [{
        global_category_name: "FOOD",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_category_name: "CLEANING",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_category_name: "PERSONAL CARE",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_category_name: "STATIONARY",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_category_name: "PET",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_category_name: "POOJA",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_category_name: "MISCELLANEOUS",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("global_categories", null, {});
  }
};