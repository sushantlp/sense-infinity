'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "api_keys", [{
        user_id: 1,
        api_name: "Warehouse Api Key",
        key_prefix: "zaCELgL",
        api_key: "0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx",
        rate_limit: 20,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        user_id: 2,
        api_name: "Warehouse Api Key",
        key_prefix: "qwCELgL",
        api_key: "0imfnc8mVLWwsAawjYr4Rx-Af50DDqtxl",
        rate_limit: 20,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("api_keys", null, {});
  }
};