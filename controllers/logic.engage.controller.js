"use strict";

// Import Package
const moment = require("moment-timezone");

// Import Controller
const shareController = require("./share.controller");
const databaseController = require("./database.controller");

// Import Config
const {
  Gateway
} = require("../config/constants");

// Import Model
const localityModel = require("../models/locality");
const cityModel = require("../models/city");
const genderModel = require("../models/gender");
const deviceModel = require("../models/device_detail");
const senseConstModel = require("../models/sense_constant");
const feedbackModel = require("../models/feedback_question");
const feedbackOptionModel = require("../models/feedback_option");
const surveyModel = require("../models/survey_question");
const surveyOptionModel = require("../models/survey_option");
const complainModel = require("../models/store_complain");
const partnerModel = require("../models/partner");
const storeModel = require("../models/partner_store");
const cardModel = require("../models/customer_membership_card");
const customerDataModel = require("../models/customer_information_data");
const customerTrackModel = require("../models/customer_information_track");
const linkModel = require("../models/partner_link_customer");

// Current Date and Time
const todayDate = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD");

// Back Date -1 Convert
const backDate = moment()
  .subtract(1, "days")
  .format("YYYY-MM-DD");

// Logic Sense Static
module.exports.logicSenseStatic = async appVersion => {
  try {

    // Read Sense Constant Record
    const senseConstant = await senseConstModel.readSenseConstant(
      "*",
      "STATIC_APP_VERSION",
      1
    );

    // Zero Means Empty Record
    if (senseConstant.length === 0) return {
      success: false,
      data: {},
      msg: "Empty sense constant"
    };

    // Check Sense Static App Version
    if (appVersion === parseFloat(senseConstant[0].value)) return {
      success: true,
      data: {},
      msg: "Upto date"
    };
    else appVersion = parseFloat(senseConstant[0].value);

    // Parallel City Locality Gender Record
    const parallel = await Promise.all([
      cityModel.readCityRecord(
        "city_id AS city_unique, city_name AS city, longitude AS lon, latitude AS lat",
        1
      ),
      localityModel.readLocalityRecord(
        "locality_id AS locality_unique, city_id AS city_unique, locality_name AS locality, pincode, longitude AS lon, latitude AS lat",
        1
      ),
      genderModel.readGenderRecord(
        "gender_id AS gender_unique, name AS gender_name",
        1
      )
    ]);

    if (parallel.length === 0) return Promise.reject("Oops our bad!!!");

    return {
      success: true,
      data: {
        city: parallel[0],
        locality: parallel[1],
        gender: parallel[2]
      },
      msg: "Succesful",
      version: appVersion
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Request Logic Keep Complain
module.exports.requestLogicKeepComplain = async(
  complainJson,
  mobile,
  storeId
) => {
  try {

    // Read Partner Record
    const merchantRecord = await partnerModel.readPartnerByMobile(
      "partner_id",
      mobile,
      1
    );

    if (merchantRecord.length === 0) return {
      success: false,
      data: [],
      msg: "Empty merchant record"
    };


    // Merchant Constant Table Exist
    const senseConstant = await databaseController.showConstantTable(
      mobile,
      storeId
    );

    // Zero Means Empty Record
    if (senseConstant.length === 0) {
      // Create Merchant Constant Store Table
      await databaseController.createConstantTable(mobile, storeId);

      // Logic Keep Merchant Constant
      await logicMerchantConstant(mobile, storeId);
    }

    // Logic Read Complain
    await logicKeepComplain(mobile, storeId, complainJson, merchantRecord);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Read Complain
const logicKeepComplain = async(
  mobile,
  storeId,
  complainJson,
  merchantRecord
) => {
  try {
    let versionFlag = {
      customer: true
    };
    let cityCode = 0;
    let newDob = undefined;

    // Read Constant Record
    const constant = await databaseController.readConstantRecordName(
      "*",
      mobile,
      storeId,
      "CUSTOMER_IDENTITY_APP_VERSION",
      1
    );

    // Read Merchant Store Record By Store Id
    let storeRecord = await storeModel.readStoreById("city_id", storeId, 1);

    // Parse
    storeRecord = JSON.stringify(storeRecord);
    storeRecord = JSON.parse(storeRecord);

    if (storeRecord.length !== 0) {
      // Read City Record By City Id
      let cityRecord = await cityModel.readCityBYId(
        "*",
        storeRecord[0].city_id,
        1
      );

      // Parse
      cityRecord = JSON.stringify(cityRecord);
      cityRecord = JSON.parse(cityRecord);

      if (cityRecord.length !== 0) cityCode = cityRecord[0].country_code;

    }

    const promises = complainJson.map(async(json, index) => {
      // Variable Declare
      let customerId = undefined;

      // Read Customer Information Data By Mobile
      let customerRecord = await customerDataModel.readCustomerDataMobile(
        "*",
        json.customer_mobile,
        1
      );

      // Parse
      customerRecord = JSON.stringify(customerRecord);
      customerRecord = JSON.parse(customerRecord);

      // Reform Customer Detail
      const reform = shareController.reformCustomerDetail(
        json.first_name,
        json.last_name,
        undefined,
        json.dob,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        false
      );

      if (reform.dob === 'Invalid date') {
        newDob = moment(new Date('1949-08-15')).format('YYYY-MM-DD');
      } else {
        newDob = reform.dob;
      }

      if (customerRecord.length === 0) {
        // Keep Customer Information Data
        let lastRecord = await customerDataModel.keepCustomerData(
          reform.first_name,
          reform.last_name,
          json.email,
          json.customer_mobile.toString(),
          cityCode,
          newDob,
          parseInt(json.gender_id, 10),
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
          reform.first_name,
          reform.last_name,
          json.email,
          json.customer_mobile.toString(),
          cityCode,
          newDob,
          parseInt(json.gender_id, 10),
          0,
          0,
          merchantRecord[0].partner_id,
          parseInt(storeId, 10),
          0,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          Gateway.CLUB_CARD,
          1
        );

        // Parse
        lastRecord = JSON.stringify(lastRecord);
        lastRecord = JSON.parse(lastRecord);

        // ReIntialize
        customerId = lastRecord[0].insertId;

        // Keep Merchant Store Complain
        complainModel.keepStoreComplain(
          customerId,
          merchantRecord[0].partner_id,
          parseInt(storeId, 10),
          json.description,
          1
        );
      } else {
        // ReIntialize
        customerId = customerRecord[0].customer_information_id;

        // Update Customer Information Data
        customerDataModel.updateCustomerData(
          reform.first_name,
          reform.last_name,
          json.email,
          newDob,
          parseInt(json.gender_id, 10),
          customerRecord[0].city_id,
          customerRecord[0].locality_id,
          customerRecord[0].married,
          customerRecord[0].address_one,
          customerRecord[0].address_two,
          customerRecord[0].landmark,
          customerRecord[0].spouse_name,
          customerRecord[0].anniversary_date,
          customerId
        );

        // Keep Information Track
        customerTrackModel.keepInformationTrack(
          reform.first_name,
          reform.last_name,
          json.email,
          json.customer_mobile.toString(),
          cityCode,
          newDob,
          parseInt(json.gender_id, 10),
          customerRecord[0].city_id,
          customerRecord[0].locality_id,
          merchantRecord[0].partner_id,
          storeId,
          customerRecord[0].married,
          customerRecord[0].address_one,
          customerRecord[0].address_two,
          customerRecord[0].landmark,
          customerRecord[0].spouse_name,
          customerRecord[0].anniversary_date,
          Gateway.CLUB_CARD,
          1
        );

        // Read Store Complain Record
        const complainRecord = await complainModel.readStoreComplain(
          "*",
          storeId,
          merchantRecord[0].partner_id,
          customerId,
          1
        );

        if (complainRecord.length === 0) {
          // Keep Merchant Store Complain
          complainModel.keepStoreComplain(
            customerId,
            merchantRecord[0].partner_id,
            storeId,
            json.description,
            1
          );
        } else {
          // Complain Record CreatedAt Date Convert
          const createdDate = moment(complainRecord[0].created_at).format(
            "YYYY-MM-DD"
          );

          // Check Complain Keep or Update
          if (createdDate >= backDate && createdDate <= todayDate) complainModel.updateStoreComplain(
            complainRecord[0].complain_id,
            json.description,
            1
          );
          else complainModel.keepStoreComplain(
            customerId,
            merchantRecord[0].partner_id,
            parseInt(storeId, 10),
            json.description,
            1
          );
        }
      }

      // Read Merchant Link Customer
      const linkValue = await linkModel.readMerchantLinkCustomer(
        "*",
        merchantRecord[0].partner_id,
        parseInt(storeId, 10),
        customerId,
        1
      );

      if (linkValue.length === 0) linkModel.keepMerchantLinkCustomer(
        merchantRecord[0].partner_id,
        parseInt(storeId, 10),
        customerId,
        1
      );


      if (versionFlag.customer) {
        // Reintialize Variable
        versionFlag.customer = false;

        // Increment Constant Value
        const increment = parseFloat(constant[0].value) + parseFloat(0.1);

        // Update Constant Record
        databaseController.updateMerchantConstantTable(
          mobile,
          storeId,
          constant[0].constant_id,
          increment.toFixed(1),
          1
        );
      }
    });

    return await Promise.all(promises);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Request Logic Keep Customer
module.exports.requestLogicKeepCustomer = async(
  customerJson,
  mobile,
  storeId
) => {
  try {

    // Read Partner Record
    const merchantRecord = await partnerModel.readPartnerByMobile(
      "partner_id",
      mobile,
      1
    );

    if (merchantRecord.length === 0) return {
      success: false,
      data: [],
      msg: "Empty merchant record"
    };

    // Merchant Constant Table Exist
    const senseConstant = await databaseController.showConstantTable(
      mobile,
      storeId
    );

    // Zero Means Empty Record
    if (senseConstant.length === 0) {
      // Create Merchant Constant Store Table
      await databaseController.createConstantTable(mobile, storeId);

      // Logic Keep Merchant Constant
      await logicMerchantConstant(mobile, storeId);
    }

    // Logic Read Customer
    await logicKeepCustomer(mobile, storeId, customerJson, merchantRecord);

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Read Customer
const logicKeepCustomer = async(
  mobile,
  storeId,
  customerJson,
  merchantRecord
) => {
  // Variable
  let versionFlag = {
    customer: true
  };
  let newDob = undefined;

  // Read Constant Record
  const constant = await databaseController.readConstantRecordName(
    "*",
    mobile,
    storeId,
    "CUSTOMER_IDENTITY_APP_VERSION",
    1
  );

  const promises = customerJson.map(async(json, index) => {
    // Variable Declare
    let customerId = undefined;
    let cityCode = 0;

    // Reform Customer Detail
    const reform = shareController.reformCustomerDetail(
      json.first_name,
      json.last_name,
      json.spouse_name,
      json.dob,
      json.married,
      json.anniversary,
      json.address_one,
      json.address_two,
      json.landmark,
      true
    );

    if (reform.dob === 'Invalid date') {
      newDob = moment(new Date('1949-08-15')).format('YYYY-MM-DD');
    } else {
      newDob = reform.dob;
    }

    // Read Customer Information Data By Mobile
    let customerRecord = await customerDataModel.readCustomerDataMobile(
      "*",
      json.customer_mobile,
      1
    );

    // Parse
    customerRecord = JSON.stringify(customerRecord);
    customerRecord = JSON.parse(customerRecord);

    // Read City Record By City Id
    let cityRecord = await cityModel.readCityBYId("*", json.city_id, 1);

    // Parse
    cityRecord = JSON.stringify(cityRecord);
    cityRecord = JSON.parse(cityRecord);

    if (cityRecord.length !== 0) cityCode = cityRecord[0].country_code;


    if (customerRecord.length === 0) {

      // Keep Customer Information Data
      let lastRecord = await customerDataModel.keepCustomerData(
        reform.first_name,
        reform.last_name,
        json.email,
        json.customer_mobile.toString(),
        cityCode,
        newDob,
        parseInt(json.gender_id, 10),
        parseInt(json.city_id, 10),
        parseInt(json.locality_id, 10),
        parseInt(json.married, 10),
        reform.address_one,
        reform.address_two,
        reform.landmark,
        reform.spouse_name,
        reform.anniversary,
        1
      );

      // Parse
      lastRecord = JSON.stringify(lastRecord);
      lastRecord = JSON.parse(lastRecord);

      // ReIntialize
      customerId = lastRecord[0].insertId;
    } else {
      // ReIntialize
      customerId = customerRecord[0].customer_information_id;

      // Update Customer Information Data
      await customerDataModel.updateCustomerData(
        reform.first_name,
        reform.last_name,
        json.email,
        newDob,
        parseInt(json.gender_id, 10),
        parseInt(json.city_id, 10),
        parseInt(json.locality_id, 10),
        parseInt(json.married, 10),
        reform.address_one,
        reform.address_two,
        reform.landmark,
        reform.spouse_name,
        reform.anniversary,
        customerId
      );
    }

    // Read Merchant Link Customer
    const linkValue = await linkModel.readMerchantLinkCustomer(
      "*",
      merchantRecord[0].partner_id,
      parseInt(storeId, 10),
      customerId,
      1
    );

    if (linkValue.length === 0) linkModel.keepMerchantLinkCustomer(
      merchantRecord[0].partner_id,
      parseInt(storeId, 10),
      customerId,
      1
    );

    if (json.membership_number !== null && json.membership_number !== undefined && json.membership_number !== "") {

      // Read Membership Card Record
      const card = await cardModel.readMembershipCardNumber(
        "*",
        json.membership_number,
        1
      );

      if (card.length === 0) {
        // Keep Customer Membership Card
        cardModel.keepCustomerMembershipCard(
          customerId,
          json.membership_number.toString(),
          1
        );
      } else {
        // One Membership Card to One Customer
        if (card[0].customer_information_id !== customerId) {
          console.log("Alert");
          // Send Admin Mail
        }
      }

    }

    if (versionFlag.customer) {
      // Assign Value
      versionFlag.customer = false;

      // Increment Constant Value
      const increment = parseFloat(constant[0].value) + parseFloat(0.1);

      // Update Constant Record
      databaseController.updateMerchantConstantTable(
        mobile,
        storeId,
        constant[0].constant_id,
        increment.toFixed(1),
        1
      );
    }

    // Keep Information Track
    customerTrackModel.keepInformationTrack(
      reform.first_name,
      reform.last_name,
      json.email,
      json.customer_mobile,
      cityCode,
      newDob,
      parseInt(json.gender_id, 10),
      parseInt(json.city_id, 10),
      parseInt(json.locality_id, 10),
      merchantRecord[0].partner_id,
      parseInt(storeId, 10),
      parseInt(json.married, 10),
      reform.address_one,
      reform.address_two,
      reform.landmark,
      reform.spouse_name,
      reform.anniversary,
      Gateway.CLUB_CARD,
      1
    );
  });

  return await Promise.all(promises);
};

// Request Logic Keep Feedback Survey
module.exports.requestLogicFeedbackSurvey = async(
  feedbackSurveyJson,
  mobile,
  storeId
) => {
  try {

    // Merchant Constant Table Exist
    const senseConstant = await databaseController.showConstantTable(
      mobile,
      storeId
    );

    // Zero Means Empty Record
    if (senseConstant.length === 0) {
      // Create Merchant Constant Store Table
      await databaseController.createConstantTable(mobile, storeId);

      // Logic Keep Merchant Constant
      await logicMerchantConstant(mobile, storeId);
    }

    // Read Partner Record
    const merchantRecord = await partnerModel.readPartnerByMobile(
      "partner_id",
      mobile,
      1
    );

    if (merchantRecord.length === 0) return {
      success: false,
      data: [],
      msg: "Empty merchant record"
    };


    // Create Dynamic Feedback And Survey
    await databaseController.createFeedbackQuestionTable(mobile, storeId);
    await databaseController.createFeedbackOptionTable(mobile, storeId);
    await databaseController.createFeedbackStoreTable(mobile, storeId);
    await databaseController.createSurveyQuestionTable(mobile, storeId);
    await databaseController.createSurveyOptionTable(mobile, storeId);
    await databaseController.createSurveyStoreTable(mobile, storeId);

    // Logic Feedback Survey
    logicFeedbackSurvey(
      feedbackSurveyJson,
      mobile,
      storeId,
      merchantRecord
    );

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }

};

// Logic Feedback Survey
const logicFeedbackSurvey = async(
  feedbackSurveyJson,
  mobile,
  storeId,
  merchantRecord
) => {
  try {
    // Intialize
    let cityCode = 0;
    let surveyVersion = undefined;
    let feedbackVersion = undefined;
    let customerVersion = undefined;
    let versionFlag = {
      survey: true,
      feedback: true,
      customer: true
    };
    let newDob = undefined;

    // Read Constant Record
    const constant = await databaseController.readConstantRecord(
      "*",
      mobile,
      storeId,
      1
    );

    if (constant.length === 0) return Promise.reject("Oops our bad!!!");

    // Iterate
    constant.map((version, index) => {
      if (version.name === "CUSTOMER_SURVEY_APP_VERSION") surveyVersion = version;
      else if (version.name === "CUSTOMER_FEEDBACK_APP_VERSION") feedbackVersion = version;
      else if (version.name === "CUSTOMER_IDENTITY_APP_VERSION") customerVersion = version;
    });

    // Read Merchant Store Record By Store Id
    let storeRecord = await storeModel.readStoreById("city_id", storeId, 1);

    // Parse
    storeRecord = JSON.stringify(storeRecord);
    storeRecord = JSON.parse(storeRecord);

    if (storeRecord.length !== 0) {
      // Read City Record By City Id
      let cityRecord = await cityModel.readCityBYId(
        "*",
        storeRecord[0].city_id,
        1
      );

      // Parse
      cityRecord = JSON.stringify(cityRecord);
      cityRecord = JSON.parse(cityRecord);

      if (cityRecord.length !== 0) cityCode = cityRecord[0].country_code;

    }

    const promises = feedbackSurveyJson.map(async(json, index) => {
      // Read Customer Information Data By Mobile
      let customerRecord = await customerDataModel.readCustomerDataMobile(
        "*",
        json.customer_mobile,
        1
      );

      // Parse
      customerRecord = JSON.stringify(customerRecord);
      customerRecord = JSON.parse(customerRecord);

      // Declare
      let customerId = undefined;

      // Reform Customer Detail
      const reform = shareController.reformCustomerDetail(
        json.first_name,
        json.last_name,
        undefined,
        json.dob,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        false
      );

      if (reform.dob === 'Invalid date') {
        newDob = moment(new Date('1949-08-15')).format('YYYY-MM-DD');
      } else {
        newDob = reform.dob;
      }

      if (customerRecord.length === 0) {
        // Keep Customer Information Data
        let lastRecord = await customerDataModel.keepCustomerData(
          reform.first_name,
          reform.last_name,
          json.email,
          json.customer_mobile.toString(),
          cityCode,
          newDob,
          parseInt(json.gender_id, 10),
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

        // Parse
        lastRecord = JSON.stringify(lastRecord);
        lastRecord = JSON.parse(lastRecord);

        // ReInitialize
        customerId = lastRecord[0].insertId;

        // Keep Information Track
        customerTrackModel.keepInformationTrack(
          reform.first_name,
          reform.last_name,
          json.email,
          json.customer_mobile.toString(),
          cityCode,
          newDob,
          parseInt(json.gender_id, 10),
          0,
          0,
          merchantRecord[0].partner_id,
          parseInt(storeId, 10),
          0,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          Gateway.CLUB_CARD,
          1
        );
      } else {
        // Update Customer Information Data
        customerDataModel.updateCustomerData(
          reform.first_name,
          reform.last_name,
          json.email,
          newDob,
          parseInt(json.gender_id, 10),
          customerRecord[0].city_id,
          customerRecord[0].locality_id,
          customerRecord[0].married,
          customerRecord[0].address_one,
          customerRecord[0].address_two,
          customerRecord[0].landmark,
          customerRecord[0].spouse_name,
          customerRecord[0].anniversary_date,
          customerRecord[0].customer_information_id,
        );

        // ReInitialize
        customerId = customerRecord[0].customer_information_id;

        // Keep Information Track
        customerTrackModel.keepInformationTrack(
          reform.first_name,
          reform.last_name,
          json.email,
          json.customer_mobile,
          cityCode,
          newDob,
          parseInt(json.gender_id, 10),
          customerRecord[0].city_id,
          customerRecord[0].locality_id,
          merchantRecord[0].partner_id,
          parseInt(storeId, 10),
          customerRecord[0].married,
          customerRecord[0].address_one,
          customerRecord[0].address_two,
          customerRecord[0].landmark,
          customerRecord[0].spouse_name,
          customerRecord[0].anniversary_date,
          Gateway.CLUB_CARD,
          1
        );
      }

      if (versionFlag.customer) {
        // Customer flag
        versionFlag.customer = false;

        // Increment Constant Value
        const increment = parseFloat(customerVersion.value) + parseFloat(0.1);

        // Update Constant Record
        databaseController.updateMerchantConstantTable(
          mobile,
          storeId,
          customerVersion.constant_id,
          increment.toFixed(1),
          1
        );
      }

      // Read Merchant Link Customer
      const linkValue = await linkModel.readMerchantLinkCustomer(
        "*",
        merchantRecord[0].partner_id,
        parseInt(storeId, 10),
        customerId,
        1
      );

      if (linkValue.length === 0) linkModel.keepMerchantLinkCustomer(
        merchantRecord[0].partner_id,
        parseInt(storeId, 10),
        customerId,
        1
      );

      // Survey
      if (json.customer_survey != null) {
        json.customer_survey.map(async(survey, index) => {
          // Read One Record Merchant Store Survey
          let surveyRecord = await databaseController.readLimitMerchantSurvey(
            "*",
            mobile,
            storeId,
            customerId,
            parseInt(survey.question_id, 10),
            parseInt(survey.role_id, 10),
            1
          );

          // Parse
          surveyRecord = JSON.stringify(surveyRecord);
          surveyRecord = JSON.parse(surveyRecord);

          if (surveyRecord.length === 0) {
            // Keep Merchant Store Survey Table
            await databaseController.keepMerchantSurveyTable(
              mobile,
              storeId,
              parseInt(survey.question_id, 10),
              parseInt(survey.option_id, 10),
              customerId,
              parseInt(survey.role_id, 10),
              1
            );
          } else {
            // Survey Record CreatedAt Date Convert
            const createdDate = moment(surveyRecord[0].created_at).format(
              "YYYY-MM-DD"
            );

            // Check Survey Keep or Update
            if (createdDate >= backDate && createdDate <= todayDate) await databaseController.updateMerchantSurveyTable(
              mobile,
              storeId,
              surveyRecord[0].keep_survey_id,
              parseInt(survey.question_id, 10),
              parseInt(survey.option_id, 10),
              customerId,
              parseInt(survey.role_id, 10),
              1
            );
            else await databaseController.keepMerchantSurveyTable(
              mobile,
              storeId,
              parseInt(survey.question_id, 10),
              parseInt(survey.option_id, 10),
              customerId,
              parseInt(survey.role_id, 10),
              1
            );

          }

          if (versionFlag.survey) {
            // Survey flag
            versionFlag.survey = false;

            // Increment Constant Value
            const increment = parseFloat(surveyVersion.value) + parseFloat(0.1);

            databaseController.updateMerchantConstantTable(
              mobile,
              storeId,
              surveyVersion.constant_id,
              increment.toFixed(1),
              1
            );
          }
        });
      }

      // Feedback
      if (json.customer_feedback != null) {
        json.customer_feedback.map(async(feedback, index) => {
          // Read One Record Merchant Store Feedback
          let feedbackRecord = await databaseController.readLimitMerchantFeedback(
            "*",
            mobile,
            storeId,
            customerId,
            parseInt(feedback.question_id, 10),
            parseInt(feedback.role_id, 10),
            1
          );

          // Parse
          feedbackRecord = JSON.stringify(feedbackRecord);
          feedbackRecord = JSON.parse(feedbackRecord);

          if (feedbackRecord.length === 0) {
            // Keep Merchant Store Feedback Table
            await databaseController.keepMerchantFeedbackTable(
              mobile,
              storeId,
              parseInt(feedback.question_id, 10),
              parseInt(feedback.option_id, 10),
              customerId,
              parseInt(feedback.role_id, 10),
              1
            );
          } else {
            // Feedback Record CreatedAt Date Convert
            const createdDate = moment(feedbackRecord[0].created_at).format(
              "YYYY-MM-DD"
            );

            // Check Survey Keep or Update
            if (createdDate >= backDate && createdDate <= todayDate) await databaseController.updateMerchantFeedbackTable(
              mobile,
              storeId,
              feedbackRecord[0].keep_feed_id,
              parseInt(feedback.question_id, 10),
              parseInt(feedback.option_id, 10),
              customerId,
              parseInt(feedback.role_id, 10),
              1
            );
            else await databaseController.keepMerchantFeedbackTable(
              mobile,
              storeId,
              parseInt(feedback.question_id, 10),
              parseInt(feedback.option_id, 10),
              customerId,
              parseInt(feedback.role_id, 10),
              1
            );

          }

          if (versionFlag.feedback) {
            // Feedback flag
            versionFlag.feedback = false;
            // Increment Constant Value
            const increment =
              parseFloat(feedbackVersion.value) + parseFloat(0.1);

            // Update Constant Record
            databaseController.updateMerchantConstantTable(
              mobile,
              storeId,
              feedbackVersion.constant_id,
              increment.toFixed(1),
              1
            );
          }
        });
      }
    });

    return await Promise.all(promises);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Get Feedback Data
module.exports.logicGetFeedback = async(
  merchantVersion,
  senseVersion,
  mobile,
  storeId
) => {
  try {
    // Intialize
    let merchantFlag = false;
    let senseFlag = false;

    // Merchant Constant Table Exist
    const senseConstant = await databaseController.showConstantTable(
      mobile,
      storeId
    );

    // Zero Means Empty Record
    if (senseConstant.length === 0) {
      // Create Merchant Constant Store Table
      await databaseController.createConstantTable(mobile, storeId);

      // Logic Keep Merchant Constant
      await logicMerchantConstant(mobile, storeId);
    }

    // Parallel Merchant and Sense Constant
    const parallel = await Promise.all([
      databaseController.readConstantRecordName(
        "*",
        mobile,
        storeId,
        "CUSTOMER_FEEDBACK_APP_VERSION",
        1
      ),
      senseConstModel.readSenseConstant("*", "CUSTOMER_FEEDBACK_APP_VERSION", 1)
    ]);

    if (parallel.length === 0) return Promise.reject("Oops our bad!!!");


    // Merchant app version
    if (merchantVersion === parseFloat(parallel[0][0].value)) merchantFlag = true;
    else merchantVersion = parseFloat(parallel[0][0].value);


    // Admin app version
    if (senseVersion === parseFloat(parallel[1][0].value)) senseFlag = true;
    else senseVersion = parseFloat(parallel[1][0].value);


    // Both flag true then return
    if (merchantFlag && senseFlag) return {
      success: true,
      data: [],
      msg: "Upto date"
    };


    // Logic Read Feedback
    const feedback = await logicReadFeedback(
      mobile,
      storeId,
      merchantFlag,
      senseFlag
    );

    return {
      success: true,
      data: feedback,
      msg: "Successful",
      sense_version: senseVersion,
      merchant_version: merchantVersion
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Read Feedback
const logicReadFeedback = async(mobile, storeId, merchantFlag, senseFlag) => {
  try {
    // Variable
    let jsonArray = [];
    let merchantArray = [];
    let adminArray = [];

    // Create Dynamic Feedback
    await databaseController.createFeedbackQuestionTable(mobile, storeId);
    await databaseController.createFeedbackOptionTable(mobile, storeId);
    await databaseController.createFeedbackStoreTable(mobile, storeId);

    // Merchant Version
    if (!merchantFlag) {
      // Read Merchant Feedback Question Record
      const merchantFeed = await databaseController.readFeedbackQuestion(
        mobile,
        storeId,
        1
      );

      if (merchantFeed.length !== 0) merchantArray = await creatFeedbackJson(
        merchantFeed,
        1,
        mobile,
        storeId
      );
    }

    // Admin Version
    if (!senseFlag) {
      const adminFeed = await feedbackModel.readAdminFeedbackQuestion(
        "feedback_questions.feed_ques_id, feedback_questions.feed_question, feedback_questions.input_id, input_types.input_name",
        mobile,
        1
      );

      if (adminFeed.length !== 0) adminArray = await creatFeedbackJson(
        adminFeed,
        2,
        undefined,
        undefined
      );
    }
    return merchantArray.concat(adminArray);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create Feedback Json
const creatFeedbackJson = async(json, role, mobile, storeId) => {
  try {
    // Variable
    let option = [];
    const jsonArray = json.map(async(feed, index) => {
      // Block
      let lowerObject = {};
      if (role === 1) option = await databaseController.readFeedbackOption(
        mobile,
        storeId,
        feed.feed_ques_id,
        1
      );
      else option = await feedbackOptionModel.readAdminFeedbackOption(
        "*",
        feed.feed_ques_id,
        1
      );

      lowerObject.feedback_id = feed.feed_ques_id;
      lowerObject.feedback_question = feed.feed_question;
      lowerObject.feedback_input_id = feed.input_id;
      lowerObject.feedback_input_name = feed.input_name;
      lowerObject.role_id = role;

      // Zero Means No Record
      if (option.length === 0) lowerObject.option_json = [];
      else lowerObject.option_json = createFeedbackOptionJson(option);

      return lowerObject;
    });

    return await Promise.all(jsonArray);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create Feedback Option Json
const createFeedbackOptionJson = json => {
  // Variable
  let upperArray = [];
  json.map(async(option, index) => {
    // Block Variable Declaration
    let lowerobject = {};

    lowerobject.feedback_option_id = option.feed_option_id;
    lowerobject.feedback_option = option.option_value;
    lowerobject.feedback_id = option.feed_ques_id;

    // Push Array
    upperArray.push(lowerobject);
  });

  return upperArray;
};

// Logic Get Survey Data
module.exports.logicGetSurvey = async(
  merchantVersion,
  senseVersion,
  mobile,
  storeId
) => {
  try {
    // Intialize
    let merchantFlag = false;
    let senseFlag = false;

    // Merchant Constant Table Exist
    const senseConstant = await databaseController.showConstantTable(
      mobile,
      storeId
    );

    // Zero Means Empty Record
    if (senseConstant.length === 0) {
      // Create Merchant Constant Store Table
      await databaseController.createConstantTable(mobile, storeId);

      // Logic Keep Merchant Constant
      await logicMerchantConstant(mobile, storeId);
    }

    // Parallel Merchant and Sense Constant
    const parallel = await Promise.all([
      databaseController.readConstantRecordName(
        "*",
        mobile,
        storeId,
        "CUSTOMER_SURVEY_APP_VERSION",
        1
      ),
      senseConstModel.readSenseConstant("*", "CUSTOMER_SURVEY_APP_VERSION", 1)
    ]);

    if (parallel.length === 0) return Promise.reject("Oops our bad!!!");


    // Merchant app version
    if (merchantVersion === parseFloat(parallel[0][0].value)) merchantFlag = true;
    else merchantVersion = parseFloat(parallel[0][0].value);


    // Admin app version
    if (senseVersion === parseFloat(parallel[1][0].value)) senseFlag = true;
    else senseVersion = parseFloat(parallel[1][0].value);


    // Both flag true then return
    if (merchantFlag && senseFlag) return {
      success: true,
      data: [],
      msg: "Upto date"
    };


    // Logic Read Survey
    const survey = await logicReadSurvey(
      mobile,
      storeId,
      merchantFlag,
      senseFlag
    );

    return {
      success: true,
      data: survey,
      msg: "Sucessful",
      sense_version: senseVersion,
      merchant_version: merchantVersion
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Read Survey
const logicReadSurvey = async(mobile, storeId, merchantFlag, senseFlag) => {
  try {
    // Variable
    let jsonArray = [];
    let merchantArray = [];
    let adminArray = [];

    // Create Dynamic Survey
    await databaseController.createSurveyQuestionTable(mobile, storeId);
    await databaseController.createSurveyOptionTable(mobile, storeId);
    await databaseController.createSurveyStoreTable(mobile, storeId);

    // Merchant Version
    if (!merchantFlag) {
      // Read Merchant Survey Question Record
      const merchantFeed = await databaseController.readSurveyQuestion(
        mobile,
        storeId,
        1
      );

      if (merchantFeed.length !== 0) merchantArray = await creatSurveyJson(merchantFeed, 1, mobile, storeId);
    }

    // Admin Version
    if (!senseFlag) {
      // Read Admin Survey Option
      const adminFeed = await surveyModel.readAdminSurveyQuestion(
        "survey_questions.survey_ques_id, survey_questions.survey_question, survey_questions.input_id, input_types.input_name",
        mobile,
        1
      );

      if (adminFeed.length !== 0) adminArray = await creatSurveyJson(adminFeed, 2, undefined, undefined);

    }
    return merchantArray.concat(adminArray);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create Survey Json
const creatSurveyJson = async(json, role, mobile, storeId) => {
  try {
    // Variable
    let option = [];
    const jsonArray = json.map(async(survey, index) => {
      // Block
      let lowerObject = {};
      if (role === 1) option = await databaseController.readSurveyOption(
        mobile,
        storeId,
        survey.survey_ques_id,
        1
      );
      else option = await surveyOptionModel.readAdminSurveyOption(
        "*",
        survey.survey_ques_id,
        1
      );

      lowerObject.survey_id = survey.survey_ques_id;
      lowerObject.survey_question = survey.survey_question;
      lowerObject.survey_input_id = survey.input_id;
      lowerObject.survey_input_name = survey.input_name;
      lowerObject.role_id = role;

      // Zero Means No Record
      if (option.length === 0) lowerObject.option_json = [];
      else lowerObject.option_json = createSurveyOptionJson(option);

      return lowerObject;
    });

    return await Promise.all(jsonArray);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create Survey Option Json
const createSurveyOptionJson = json => {
  // Variable
  let upperArray = [];
  json.map(async(option, index) => {
    // Block Variable Declaration
    let lowerobject = {};

    lowerobject.survey_option_id = option.survey_option_id;
    lowerobject.survey_option = option.option_value;
    lowerobject.survey_id = option.survey_ques_id;

    // Push Array
    upperArray.push(lowerobject);
  });

  return upperArray;
};

// Logic Customer Data
module.exports.logicCustomerData = async(customerVersion, mobile, storeId) => {
  try {

    // Read Partner Record
    const merchantRecord = await partnerModel.readPartnerByMobile(
      "partner_id",
      mobile,
      1
    );

    // Merchant Constant Table Exist
    const senseConstant = await databaseController.showConstantTable(
      mobile,
      storeId
    );

    // Zero Means Empty Record
    if (senseConstant.length === 0) {
      // Create Merchant Constant Store Table
      await databaseController.createConstantTable(mobile, storeId);

      // Logic Keep Merchant Constant
      await logicMerchantConstant(mobile, storeId);
    }

    // Read Constant Record
    const constant = await databaseController.readConstantRecordName(
      "*",
      mobile,
      storeId,
      "CUSTOMER_IDENTITY_APP_VERSION",
      1
    );

    if (constant.length === 0) return Promise.reject("Oops our bad!!!");


    // Customer version
    if (customerVersion === parseFloat(constant[0].value)) return {
      success: true,
      data: [],
      msg: "Upto date"
    };
    else customerVersion = parseFloat(constant[0].value);


    // Read Merchant Customer Idenitity Record
    const record = await linkModel.readMerchantStoreCustomer(
      "customer_information_data.customer_information_id AS cust_identity_id, customer_information_data.first_name, customer_information_data.last_name, customer_information_data.email, customer_information_data.mobile, customer_information_data.dob, customer_information_data.married, customer_information_data.spouse_name, customer_information_data.anniversary_date, customer_information_data.address_one, customer_information_data.address_two, customer_information_data.landmark, customer_information_data.gender_id, customer_information_data.city_id AS city_unique, customer_information_data.locality_id AS locality_unique, cities.city_name, localities.locality_name, genders.name AS gender_name, customer_membership_cards.membership_card_number AS membership_card",
      merchantRecord[0].partner_id,
      storeId,
      1
    );

    return {
      success: true,
      data: record,
      msg: "Succesful",
      customer_version: customerVersion
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Device Data
module.exports.logicDeviceData = async(deviceJson, mobile, storeId) => {
  try {

    deviceJson.map((json, index) => {
      if (
        json.hasOwnProperty("latitude") &&
        json.hasOwnProperty("longitude") &&
        json.hasOwnProperty("brand") &&
        json.hasOwnProperty("device") &&
        json.hasOwnProperty("model") &&
        json.hasOwnProperty("app_id") &&
        json.hasOwnProperty("version_sdk") &&
        json.hasOwnProperty("version_release") &&
        json.hasOwnProperty("sense_version_number")
      ) {
        // Keep Device Detail
        deviceModel.keepDeviceDetail(
          mobile,
          storeId,
          json.latitude,
          json.longitude,
          json.brand,
          json.device,
          json.model,
          json.app_id,
          json.version_sdk,
          json.version_release,
          json.sense_version_number
        );
      }
    });

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };

  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Keep Merchant Constant
const logicMerchantConstant = async(mobile, storeId) => {
  try {
    // Block Variable
    const seed = [];

    seed.push({
      name: "CUSTOMER_FEEDBACK_APP_VERSION",
      value: "1.0",
      comment: null,
      status: 1
    });
    seed.push({
      name: "CUSTOMER_SURVEY_APP_VERSION",
      value: "1.0",
      comment: null,
      status: 1
    });
    seed.push({
      name: "CUSTOMER_IDENTITY_APP_VERSION",
      value: "1.0",
      comment: null,
      status: 1
    });

    seed.map(async(json, index) => {
      // Keep Merchant Constant Table
      await databaseController.keepMerchantConstantTable(
        mobile,
        storeId,
        json.name,
        json.value,
        json.comment,
        json.status
      );
    });

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};