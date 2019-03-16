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
        discount_type: "Locality Version",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        discount_type: "Discount Type",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        discount_type: "Discount Base",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        discount_type: "Gender",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        discount_type: "Warehouse Payment Type",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        discount_type: "Global Category",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        discount_type: "Global Category",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        discount_type: "Global Category",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        discount_type: "Global Sub Category",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        discount_type: "Global Sub Sub Category",
        warehouse_static_version: 1.0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        discount_type: "Global Category",
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