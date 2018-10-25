"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "genders",
      [
        {
          name: "Male",
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: "Female",
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("genders", null, {});
  }
};
