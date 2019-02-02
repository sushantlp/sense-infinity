'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customer_reward_questions', {
      reward_question_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reward_question: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      input_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "input_types",
          key: "input_id"
        }
      },
      reward_gift: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('customer_reward_questions');
  }
};