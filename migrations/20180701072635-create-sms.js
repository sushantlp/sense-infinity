"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("sms", {
      sms_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      otp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gateway_status: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
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
    return queryInterface.dropTable("sms");
  }
};