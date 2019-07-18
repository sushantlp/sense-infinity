"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("survey_questions", {
      survey_ques_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      survey_question: {
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
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "category_id"
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
    return queryInterface.dropTable("survey_questions");
  }
};