"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "membership_syncs",
      [
        {
          partner_id: 1,
          store_id: 1,
          membership_start_id: 1,
          membership_end_id: 5,
          sync_status: 1,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("membership_syncs", null, {});
  }
};
