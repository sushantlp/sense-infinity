"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("device_details", {
      device_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mobile: {
        type: Sequelize.STRING(10)
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "merchant_stores", key: "store_id" }
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: true
      },
      device: {
        type: Sequelize.STRING,
        allowNull: true
      },
      model: {
        type: Sequelize.STRING,
        allowNull: true
      },
      app_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      version_sdk: {
        type: Sequelize.STRING,
        allowNull: true
      },
      version_release: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sense_version_number: {
        type: Sequelize.STRING,
        allowNull: true
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
    return queryInterface.dropTable("device_details");
  }
};
