'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reward_question_responses', {
      question_response_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reward_question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "customer_reward_questions",
          key: "reward_question_id"
        }
      },
      reward_option_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "customer_reward_options",
          key: "reward_option_id"
        }
      },
      customer_information_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "customer_information_data",
          key: "customer_information_id"
        }
      },
      text_question_response: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('reward_question_responses');
  }
};