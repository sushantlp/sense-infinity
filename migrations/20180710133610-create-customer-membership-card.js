'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('customer_membership_cards', {
        membership_card_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        customer_mobile: {
          type: Sequelize.STRING
        },
        membership_card_number: {
          type: Sequelize.STRING
        },
        status: {
          type: Sequelize.BOOLEAN,
          defaultValue: 1
        },
        createdAt: {
          field: 'created_at',
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          field: 'updated_at',
          allowNull: false,
          type: Sequelize.DATE
        }
      })

      .then(function() {
        return queryInterface.sequelize.query(
          'ALTER TABLE `customer_membership_cards` ADD UNIQUE `unique_index`(`customer_mobile`, `status`)'
        );
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('customer_membership_cards');
  }
};
