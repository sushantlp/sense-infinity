'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "warehouse_static_versions", [{
        warehouse_static_name: "City Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        warehouse_static_name: "Locality Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        warehouse_static_name: "Discount Type Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        warehouse_static_name: "Discount Base Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        warehouse_static_name: "Gender Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        warehouse_static_name: "Warehouse Payment Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        warehouse_static_name: "Global Category Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        warehouse_static_name: "Global Sub Category Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        warehouse_static_name: "Global Sub Sub Category Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        warehouse_static_name: "Warehouse Role Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        warehouse_static_name: "Coupon Type Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        warehouse_static_name: "Coupon Sub Type Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        warehouse_static_name: "Item Condition Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        warehouse_static_name: "Order Status Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        warehouse_static_name: "Product Unit Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        warehouse_static_name: "Product Sub Unit Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        warehouse_static_name: "System Administrator Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        warehouse_static_name: "Tax Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("warehouse_static_versions", null, {});
  }
};