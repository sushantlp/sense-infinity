"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("customer_info_tracks", {
      track_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mobile: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.STRING,
        allowNull: true
      },
      gender_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      merchant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "merchants", key: "merchant_id" }
      },
      store_id: {
        type: Sequelize.INTEGER
      },
      offer_id: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable("customer_info_tracks");
  }
};
