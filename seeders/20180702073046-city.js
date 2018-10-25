"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "cities",
      [
        {
          city_name: "Bengaluru",
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          city_name: "New Delhi",
          status: 0,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("cities", null, {});
  }
};
