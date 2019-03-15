'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice_no: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'actions_unique'
      },
      store_counter_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'store_counters',
          foreignKey: 'store_counter_id'
        }
      },
      warehouse_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'warehouse_user_lists',
          foreignKey: 'warehouse_user_id'
        }
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'partner_stores',
          key: 'store_id'
        }
      },
      customer_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      customer_mobile: {
        type: Sequelize.STRING,
        allowNull: false
      },
      membership_code: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      total_amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      invoice_cashback: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      invoice_total_saving: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      invoice_loyalty_used: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      invoice_total_amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      gstin_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gstin_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      return_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      round_off_amount: {
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
    return queryInterface.dropTable('invoices');
  }
};