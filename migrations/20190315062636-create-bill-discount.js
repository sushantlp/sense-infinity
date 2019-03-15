'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bill_discounts', {
      bill_discount_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'partner_stores',
          key: 'store_id'
        }
      },
      discount_base_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'discount_bases',
          key: 'discount_base_id'
        }
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      min_discount_amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      max_discount_amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      bill_offer_value: {
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
    return queryInterface.dropTable('bill_discounts');
  }
};