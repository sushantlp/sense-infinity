"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("localities", {
      locality_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cities",
          key: "city_id"
        }
      },
      locality_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pincode: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: true
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
    return queryInterface.dropTable("localities");
  }
};