'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "customer_reward_questions", [{
        reward_question: "How often do you meet in person with teachers at your child's school?",
        input_id: 1,
        reward_point: 100,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        reward_question: "How confident are you that you can help your child develop good friendships?",
        input_id: 1,
        reward_point: 200,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        reward_question: "How confident are you in your ability to help your child deal with his or her emotions appropriately?",
        input_id: 2,
        reward_point: 500,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        reward_question: "Do you have any comments about any of your answers to the questions in this section?",
        input_id: 5,
        reward_point: 300,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        reward_question: "How happy are you with our product range and varieties?",
        input_id: 3,
        reward_point: 400,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        reward_question: "How clean and hygienic you think this store is?",
        input_id: 4,
        reward_point: 50,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, ], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("customer_reward_questions", null, {});
  }
};