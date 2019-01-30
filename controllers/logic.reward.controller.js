"use strict";

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

    // Check Empty
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
        undefined,
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
        undefined,
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


    }


  } catch (error) {
    return Promise.reject(error);
  }
};