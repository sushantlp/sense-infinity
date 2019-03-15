"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "cities", [{
        city_name: "Bengaluru",
        country_code: "91",
        currency_hex_code: "&#8377;",
        currency_text: "INR",
        longitude: 77.5946,
        latitude: 12.9716,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_name: "New Delhi",
        country_code: "91",
        currency_hex_code: "&#8377;",
        currency_text: "INR",
        longitude: 77.2090,
        latitude: 28.6139,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_name: "Noida",
        country_code: "91",
        currency_hex_code: "&#8377;",
        currency_text: "INR",
        longitude: 77.3910,
        latitude: 28.5355,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_name: "Goa",
        country_code: "91",
        currency_hex_code: "&#8377;",
        currency_text: "INR",
        longitude: 74.1240,
        latitude: 15.2993,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_name: "Chandigarh",
        country_code: "91",
        currency_hex_code: "&#8377;",
        currency_text: "INR",
        longitude: 76.7794,
        latitude: 30.7333,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_name: "Chennai",
        country_code: "91",
        currency_hex_code: "&#8377;",
        currency_text: "INR",
        longitude: 80.2707,
        latitude: 13.0827,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("cities", null, {});
  }
};