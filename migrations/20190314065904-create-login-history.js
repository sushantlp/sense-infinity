'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('login_histories', {
      login_history_id: {
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
      login_time: {
        type: Sequelize.TIME,
        allowNull: true
      },
      logout_time: {
        type: Sequelize.TIME,
        allowNull: true
      },
      opening_amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      closing_amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      total_invoice: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      cash_amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      card_amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      sodexo_amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      total_amount: {
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
    return queryInterface.dropTable('login_histories');
  }
};