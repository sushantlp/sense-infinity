'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('invoice_coupons', {
      invoice_coupon_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice_no: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'invoices',
          foreignKey: 'invoice_no'
        }
      },
      coupon_code: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      applicable_on: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      discount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      cashback: {
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
    return queryInterface.dropTable('invoice_coupons');
  }
};