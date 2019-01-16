"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "feedback_questions",
      [
        {
          feed_question: "How often do you visit this store?",
          input_id: 1,
          category_id: 1000,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          feed_question: "How friendly is store staff?",
          input_id: 3,
          category_id: 1000,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          feed_question:
            "Do you think the store staff (including billing) is well trained?",
          input_id: 3,
          category_id: 1000,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          feed_question:
            "How often does this store have what you want in stock?",
          input_id: 3,
          category_id: 1000,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          feed_question:
            "How happy are you with our product range and varieties?",
          input_id: 3,
          category_id: 1000,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          feed_question: "How easy to find an item in a store?",
          input_id: 3,
          category_id: 1000,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          feed_question: "How clean and hygienic you think this store is?",
          input_id: 4,
          category_id: 1000,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          feed_question:
            "Would you recommend customizing offers based on individual instead of blanket discounts?",
          input_id: 1,
          category_id: 1000,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          feed_question:
            "Please rate us on value for money (interms of offers, savings and discounts)?",
          input_id: 3,
          category_id: 1000,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          feed_question:
            "Compare to similar stores, how fair are this store’s prices?",
          input_id: 3,
          category_id: 1000,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          feed_question: "How fair is this store’s return policy?",
          input_id: 3,
          category_id: 1000,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          feed_question:
            "Would you recommend buying from us to your friends and family?",
          input_id: 3,
          category_id: 1000,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          feed_question:
            "Overall, how satisfied or dissatisfied you are with this store?",
          input_id: 4,
          category_id: 1000,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("feedback_questions", null, {});
  }
};
