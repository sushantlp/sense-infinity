"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "membership_cards",
      [
        {
          membership_card_number: 1234567891234567,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          membership_card_number: 1234567891234568,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          membership_card_number: 1234567891234569,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          membership_card_number: 1234567891234579,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          membership_card_number: 1234567891234589,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("membership_cards", null, {});
  }
};
