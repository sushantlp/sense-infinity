"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "input_types",
      [
        {
          input_name: "Radio Button",
          min: 2,
          max: 6,
          comment: "Single Choice",
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          input_name: "Check Box",
          min: 2,
          max: 6,
          comment: "Multiple Choice",
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          input_name: "Rating (5 Star)",
          min: 1,
          max: 5,
          comment: "",
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          input_name: "Rating (10 Star)",
          min: 1,
          max: 10,
          comment: "",
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("input_types", null, {});
  }
};
