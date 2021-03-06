'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('store_order_details', {
      store_order_detail_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      store_order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'store_orders',
          key: 'id'
        }
      },
      barcode: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: true
      },
      request_quantity: {
        type: Sequelize.STRING,
        allowNull: true
      },
      received_quantity: {
        type: Sequelize.STRING,
        allowNull: true
      },
      order_status: {
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
    return queryInterface.dropTable('store_order_details');
  }
};