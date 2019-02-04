'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "customer_reward_options", [{
        option_value: "Almost never",
        reward_question_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        option_value: "Monthly",
        reward_question_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        option_value: "Once or twice per year",
        reward_question_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        option_value: "Weekly or more",
        reward_question_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        option_value: "Not confident at all",
        reward_question_id: 2,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        option_value: "Quite confident",
        reward_question_id: 2,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        option_value: "Extremely confident",
        reward_question_id: 2,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        option_value: "Extremely confident",
        reward_question_id: 2,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        option_value: "Extremely confident",
        reward_question_id: 3,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        option_value: "Extremely confident",
        reward_question_id: 3,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        option_value: "Extremely confident",
        reward_question_id: 3,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        option_value: "Extremely confident",
        reward_question_id: 3,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, ], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("customer_reward_options", null, {});
  }
};