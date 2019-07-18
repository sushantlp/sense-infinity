"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("survey_options", {
      survey_option_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      option_value: {
        type: Sequelize.STRING
      },
      survey_ques_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "survey_questions",
          key: "survey_ques_id"
        }
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("survey_options");
  }
};