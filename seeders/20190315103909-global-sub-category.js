'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "global_sub_categories", [{
        global_sub_category_name: "GROCERY AND PULSES",
        global_category_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "FRUIT AND VEGETABLES",
        global_category_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "SNACK AND BISCUIT FOODS",
        global_category_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "INSTANT FOODS",
        global_category_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "FROZEN FOODS",
        global_category_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "BREAKFAST FOODS",
        global_category_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "DAIRY PRODUCT",
        global_category_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "BEVERAGES",
        global_category_id: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "KITCHEN CARE",
        global_category_id: 2,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "BATHROOM CARE",
        global_category_id: 2,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "HOUSEHOLD",
        global_category_id: 2,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "ROOM CARE",
        global_category_id: 2,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "NOTEBOOK AND DAYBOOK",
        global_category_id: 3,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "WRITING INSTRUMENT",
        global_category_id: 3,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "OFFICE SUPPLIES",
        global_category_id: 3,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "SCHOOL STATIONARY",
        global_category_id: 3,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "WOMAN NEEDS",
        global_category_id: 4,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "MEN NEEDS",
        global_category_id: 4,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "CHILD NEEDS",
        global_category_id: 4,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "DAILY NEEDS",
        global_category_id: 4,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "PET FOOD",
        global_category_id: 5,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        global_sub_category_name: "PET ACCESSIORIES",
        global_category_id: 5,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("global_sub_categories", null, {});
  }
};