"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("coupon_offers", {
      coupon_offer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      offer_static_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "offer_static_data",
          key: "offer_static_id"
        }
      },
      coupon_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "coupon_lists",
          key: "coupon_id"
        }
      },
      customer_information_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "customer_information_data",
          key: "customer_information_id"
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
    return queryInterface.dropTable("coupon_offers");
  }
};
