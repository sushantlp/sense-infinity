'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customer_information_data', {
      customer_information_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mobile: {
        type: Sequelize.STRING,
        unique: true
      },
      dob: {
        type: Sequelize.STRING,
        allowNull: true
      },
      gender_id: {
        type: Sequelize.INTEGER,
        allowNull: true
        defaultValue: 0,
        references: { model: 'genders', key: 'gender_id' }
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: true
        defaultValue: 0,
        references: { model: 'cities', key: 'city_id' }
      },
      locality_id: {
        type: Sequelize.INTEGER,
        allowNull: true
        defaultValue: 0,
        references: { model: 'localities', key: 'locality_id' }
      },
      address_one: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address_two: {
        type: Sequelize.STRING,
        allowNull: true
      },
      landmark: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('customer_information_data');
  }
};
