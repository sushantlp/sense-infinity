'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "cities", [{
        city_name: "Bengaluru",
        status: 1,
        country_code: 91,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_name: "New Delhi",
        status: 0,
        country_code: 91,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {

  }
};