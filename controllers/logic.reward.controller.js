"use strict";

// Import Package
const moment = require('moment');

// Import Config
const constants = require("../config/constants");

// Import Model
const customerDataModel = require("../models/customer_information_data");
const customerTrackModel = require("../models/customer_information_track");
const cardModel = require("../models/customer_membership_card");

// Logic Verify Memebership Card and Mobile
module.exports.logicVerifyMemberMobile = async(card, mobile, code) => {
  try {
    let responsedata = {};

    const recordList = await Promise.all([
      // Read Customer Information Data by Mobile and Country Code
      customerDataModel.readDataMobileCode(
        "customer_information_id",
        mobile,
        code,
        1
      ),

      // Read Membership Card Record By Number
      cardModel.readMembershipCardNumber("*", card, 1)
    ]);

    // Stringify
    const customerStringify = JSON.stringify(recordList[0]);
    const cardStringify = JSON.stringify(recordList[1]);

    // Parse
    const customerParse = JSON.parse(customerStringify);
    const cardParse = JSON.parse(cardStringify);


    if (customerParse.length === 0 && cardParse.length !== 0) {
      return (responsedata = {
        success: false,
        data: [],
        msg: "Memebership card already using other user"
      });
    } else if (customerParse.length === 0 && cardParse.length === 0) {

      // Keep Customer Information Data
      const lastRecord = await customerDataModel.keepCustomerData(
        undefined,
        undefined,
        undefined,
        mobile.toString(),
        code,
        moment(new Date('1949-08-15')).format('YYYY-MM-DD'),
        0,
        0,
        0,
        0,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        1
      );

      // Keep Information Track
      customerTrackModel.keepInformationTrack(
        undefined,
        undefined,
        undefined,
        mobile.toString(),
        code,
        moment(new Date('1949-08-15')).format('YYYY-MM-DD'),
        0,
        0,
        0,
        0,
        0,
        0,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        constants.gateway.INFINITY_REWARD,
        1
      );

      // Parse
      const lastStringify = JSON.stringify(lastRecord);
      const lastParse = JSON.parse(lastStringify);

      // Keep Customer Membership Card
      cardModel.keepCustomerMembershipCard(
        lastParse[0].insertId,
        card.toString(),
        1
      );


      return (responsedata = {
        success: true,
        data: [],
        msg: "Succesful"
      });
    } else if (customerParse.length !== 0 && cardParse.length === 0) {

      // Read Membership Card Record by Customer Information Id
      const customerCard = await cardModel.readMembershipCardId("*", customerParse[0].customer_information_id, 1);

      if (customerCard.length !== 0) {
        return (responsedata = {
          success: false,
          data: [],
          msg: "Wrong Membership card"
        });
      }

      // Keep Customer Membership Card
      cardModel.keepCustomerMembershipCard(
        customerParse[0].customer_information_id,
        card.toString(),
        1
      );

      // Keep Information Track
      customerTrackModel.keepInformationTrack(
        undefined,
        undefined,
        undefined,
        mobile.toString(),
        code,
        moment(new Date('1949-08-15')).format('YYYY-MM-DD'),
        0,
        0,
        0,
        0,
        0,
        0,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        constants.gateway.INFINITY_REWARD,
        1
      );


      return (responsedata = {
        success: true,
        data: [],
        msg: "Succesful"
      });
    } else {

      if (cardParse[0].customer_information_id !== customerParse[0].customer_information_id) {
        return (responsedata = {
          success: false,
          data: [],
          msg: "Wrong Membership card"
        });
      }

      // Keep Information Track
      customerTrackModel.keepInformationTrack(
        undefined,
        undefined,
        undefined,
        mobile.toString(),
        code,
        moment(new Date('1949-08-15')).format('YYYY-MM-DD'),
        0,
        0,
        0,
        0,
        0,
        0,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        constants.gateway.INFINITY_REWARD,
        1
      );

      return (responsedata = {
        success: true,
        data: [],
        msg: "Succesful"
      });
    }


  } catch (error) {
    return Promise.reject(error);
  }
};