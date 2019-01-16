"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "sense_constants",
      [
        {
          name: "CUSTOMER_FEEDBACK_APP_VERSION",
          value: "1.0",
          comment: "",
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: "CUSTOMER_SURVEY_APP_VERSION",
          value: "1.0",
          comment: "",
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: "STATIC_APP_VERSION",
          value: "1.0",
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
