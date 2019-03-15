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
      product_barcode: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      product_brand_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      global_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'global_categories',
          key: 'global_category_id'
        }
      },
      global_sub_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'global_sub_categories',
          key: 'global_sub_category_id'
        }
      },
      global_sub_sub_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'global_sub_sub_categories',
          key: 'global_sub_sub_category_id'
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
      product_description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image_url: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('staple_products');
  }
};