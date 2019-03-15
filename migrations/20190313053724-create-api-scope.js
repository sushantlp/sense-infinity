'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('api_scopes', {
      api_scope_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      api_key_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'api_keys',
          key: 'api_key_id'
        }
      },
      scope_list_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'scope_lists',
          key: 'scope_list_id'
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
    return queryInterface.dropTable('api_scopes');
  }
};