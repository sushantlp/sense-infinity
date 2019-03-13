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
          key: 'store_counter_id'
        }
      },
      warehouse_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'warehouse_user_lists',
          key: 'warehouse_user_id'
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
        allowNull: true
      },
      closing_amount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      total_invoice: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      cash_amount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      card_amount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      sodexo_amount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      total_amount: {
        type: Sequelize.FLOAT,
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
    return queryInterface.dropTable('login_histories');
  }
};