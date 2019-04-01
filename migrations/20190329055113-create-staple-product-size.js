'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('staple_product_sizes', {
      staple_product_size_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_barcode: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      staple_product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'staple_products',
          key: 'staple_product_id'
        }
      },
      product_unit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'product_units',
          key: 'product_unit_id'
        }
      },
      product_sub_unit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'product_sub_units',
          key: 'product_sub_unit_id'
        }
      },
      product_unit_size: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      product_selling_mrp: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      product_margin: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      product_mrp: {
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
    return queryInterface.dropTable('staple_product_sizes');
  }
};