'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('staple_products', {
      staple_product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      product_brand_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      product_description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      global_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      global_sub_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      global_sub_sub_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sgst: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      cgst: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      igst: {
        type: Sequelize.FLOAT,
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
    return queryInterface.dropTable('staple_products');
  }
};