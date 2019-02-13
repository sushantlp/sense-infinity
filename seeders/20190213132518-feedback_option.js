"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "feedback_options", [{
        option_value: "Once a week",
        feed_ques_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        option_value: "Twice a week",
        feed_ques_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        option_value: "Thrice a week",
        feed_ques_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        option_value: "Very Often",
        feed_ques_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        option_value: "Yes",
        feed_ques_id: 8,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        option_value: "No",
        feed_ques_id: 8,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("feedback_options", null, {});
  }
};