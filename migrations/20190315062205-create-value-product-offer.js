"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("value_product_offers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value_product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: "actions_unique"
      },
      product_discount_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "product_discounts",
          key: "id"
        }
      },
      product_barcode: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      buy_product_quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      offer_value: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
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
    return queryInterface.dropTable("value_product_offers");
  }
};
