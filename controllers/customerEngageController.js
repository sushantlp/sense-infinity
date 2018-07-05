"use strict";

// Import Package
const dotEnv = require("dotenv");

const shareController = require("./shareController");
const databaseController = require("./databaseController");

// Import Model
const localityModel = require("../models/locality");
const cityModel = require("../models/city");
const genderModel = require("../models/gender");
const deviceModel = require("../models/device_detail");
const senseConstModel = require("../models/sense_constant");
const feedbackModel = require("../models/feedback_question");
const feedbackOption = require("../models/feedback_option");

// Request Sense Infinity Static Data
module.exports.requestSenseStatic = (req, res) => {
  if (
    req.query.static_app_version !== undefined &&
    req.query.static_app_version !== ""
  ) {
    // Extract Parameter
    const appVersion = parseFloat(req.query.static_app_version);
    let flag = false;

    // // If Production then Execute
    // if (process.env.APP_ENV.toUpperCase() == "PROD") {
    //   // Get Token In Header
    //   token = req.headers["authorization"];
    // } else {
    //   // Get Token In Query
    //   token = req.query.token;
    // }

    // Logic Sense Static
    return logicSenseStatic(appVersion)
      .then(response => {
        if (response.hasOwnProperty("version")) {
          flag = true;
        }

        // Intialize
        const metadata = {
          //   version: flag ? response.version.toFixed(1) : appVersion.toFixed(1),
          version: flag ? response.version : appVersion,
          count: flag ? Object.keys(response.msg).length : null
        };

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.msg,
              "/api/v1/merchant/get/static",
              200,
              response.success,
              metadata
            )
          );
      })
      .catch(error => {
        return res.status(500).send("Oops our bad!!!");
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Request Keep Device Data
module.exports.requestKeepDeviceData = (req, res) => {
  // Check Paramter
  if (
    req.query.mobile !== undefined &&
    req.query.mobile !== "" &&
    req.query.store_id !== undefined &&
    req.query.store_id !== "" &&
    req.body.device !== undefined &&
    req.body.device !== ""
  ) {
    // Extract Parameter
    const deviceJson = req.body.device;
    const mobile = req.query.mobile;
    const storeId = req.query.store_id;

    // Logic Device Data
    return logicDeviceData(deviceJson, mobile, storeId)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.msg,
              "/api/v1/merchant/keep/device/data",
              200,
              response.success,
              null
            )
          );
      })
      .catch(error => {
        return res.status(500).send("Oops our bad!!!");
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Request Feedback Data
module.exports.requestReadFeedbackData = (req, res) => {
  if (
    req.query.mobile !== undefined &&
    req.query.mobile !== "" &&
    req.query.store_id !== undefined &&
    req.query.store_id !== "" &&
    req.query.sense_feed_version !== undefined &&
    req.query.sense_feed_version !== "" &&
    req.query.merchant_feed_version !== undefined &&
    req.query.merchant_feed_version !== ""
  ) {
    // Extract Parameter
    const mobile = req.query.mobile;
    const storeId = req.query.store_id;
    const merchantVersion = parseFloat(req.query.merchant_feed_version);
    const senseVersion = parseFloat(req.query.sense_feed_version);

    // Variable
    let flag = false;

    // Logic Get Feedback Data
    return logicGetFeedback(merchantVersion, senseVersion, mobile, storeId)
      .then(response => {
        if (response.hasOwnProperty("sense_version")) {
          flag = true;
        }

        // Intialize
        const metadata = {
          sense_feedback_version: flag ? response.sense_version : senseVersion,
          merchant_feedback_version: flag
            ? response.merchant_version
            : merchantVersion,
          count: flag ? Object.keys(response.msg).length : null
        };

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.msg,
              "/api/v1/merchant/get/feedback",
              200,
              response.success,
              metadata
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else {
  }
};

// Logic Get Feedback Data
const logicGetFeedback = async (
  merchantVersion,
  senseVersion,
  mobile,
  storeId
) => {
  try {
    // Intialize
    let responsedata = {};
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
      databaseController.readConstantRecord(
        "*",
        mobile,
        storeId,
        "CUSTOMER_FEEDBACK_APP_VERSION",
        1
      ),
      senseConstModel.readSenseConstant("*", "CUSTOMER_FEEDBACK_APP_VERSION", 1)
    ]);

    if (parallel.length === 0) {
      return Promise.reject("Oops our bad!!!");
    }

    // Merchant app version
    if (merchantVersion === parseFloat(parallel[0][0].value)) {
      merchantFlag = true;
    } else {
      merchantVersion = parseFloat(parallel[0][0].value);
    }

    // Admin app version
    if (senseVersion === parseFloat(parallel[1][0].value)) {
      senseFlag = true;
    } else {
      senseVersion = parseFloat(parallel[1][0].value);
    }

    // Both flag true then return
    if (merchantFlag && senseFlag) {
      return (responsedata = {
        success: true,
        msg: "Upto date"
      });
    }

    // Logic Read Feedback
    const feedback = await logicReadFeedback(
      mobile,
      storeId,
      merchantFlag,
      senseFlag
    );

    return (responsedata = {
      success: true,
      msg: feedback,
      sense_version: senseVersion,
      merchant_version: merchantVersion
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Read Feedback
const logicReadFeedback = async (mobile, storeId, merchantFlag, senseFlag) => {
  try {
    // Variable
    let jsonArray = [];
    let merchantArray = [];

    // Parallel
    await Promise.all([
      databaseController.createFeedbackQuestionTable(mobile, storeId),
      databaseController.createFeedbackOptionTable(mobile, storeId),
      databaseController.createCustomerIdentityTable(mobile, storeId),
      databaseController.createCustomerAddressTable(mobile, storeId),
      databaseController.createFeedbackStoreTable(mobile, storeId)
    ]);

    // Merchant Version
    if (!merchantFlag) {
      const merchantFeed = await databaseController.readFeedbackQuestion(
        mobile,
        storeId,
        1
      );

      if (merchantFeed.length !== 0) {
        // Create Feedback Json
        merchantArray = await creatFeedbackJson(
          merchantFeed,
          1,
          mobile,
          storeId
        );
      }
    }

    // Admin Version
    if (!senseFlag) {
      const adminFeed = await feedbackModel.readAdminFeedbackQuestion(
        "feedback_questions.feed_ques_id, feedback_questions.feed_question, feedback_questions.input_id, input_types.input_name",
        mobile,
        1
      );

      if (adminFeed.length !== 0) {
        // Create Feedback Json
        const adminArray = await creatFeedbackJson(
          adminFeed,
          2,
          undefined,
          undefined
        );

        jsonArray = merchantArray.concat(adminArray);
      }
    }

    return jsonArray;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create Feedback Json
const creatFeedbackJson = async (json, role, mobile, storeId) => {
  try {
    // Variable
    let option = [];
    const jsonArray = json.map(async (feed, index) => {
      // Block
      let lowerObject = {};
      if (role === 1) {
        option = await databaseController.readFeedbackOption(
          mobile,
          storeId,
          feed.feed_ques_id,
          1
        );
      } else {
        option = await feedbackOption.readAdminFeedbackOption(
          "*",
          feed.feed_ques_id,
          1
        );
      }

      lowerObject.feedback_id = feed.feed_ques_id;
      lowerObject.feedback_question = feed.feed_question;
      lowerObject.feedback_input_id = feed.input_id;
      lowerObject.feedback_input_name = feed.input_name;
      lowerObject.role_id = role;

      // Zero Means No Record
      if (option.length === 0) {
        lowerObject.feedback_option = [];
      } else {
        // Create Feedback Option Json
        lowerObject.Feedback_Option = createFeedbackOptionJson(option);
      }

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
  json.map(async (option, index) => {
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

// Logic Keep Merchant Constant
const logicMerchantConstant = async (mobile, storeId) => {
  try {
    // Block Variable
    const seed = [];
    let responsedata = {};

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

    seed.map(async (json, index) => {
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

    return (responsedata = {
      success: true,
      msg: "Succesful"
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
// Logic Device Data
const logicDeviceData = async (deviceJson, mobile, storeId) => {
  try {
    // Intialize
    let responsedata = {};

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

    return (responsedata = {
      success: true,
      msg: "Succesful"
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Sense Static
const logicSenseStatic = async appVersion => {
  try {
    // Intialize
    let responsedata = {};

    // Read Sense Constant Record
    const senseConstant = await senseConstModel.readSenseConstant(
      "*",
      "STATIC_APP_VERSION",
      1
    );

    // Zero Means Empty Record
    if (senseConstant.length === 0) {
      return (responsedata = {
        success: false,
        msg: "Empty sense constant"
      });
    }

    // Check Sense Static App Version
    if (appVersion === parseFloat(senseConstant[0].value)) {
      return (responsedata = {
        success: true,
        msg: "Upto date"
      });
    } else {
      appVersion = parseFloat(senseConstant[0].value);
    }

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

    if (parallel.length === 0) {
      return Promise.reject("Oops our bad!!!");
    }

    return (responsedata = {
      success: true,
      msg: {
        city: parallel[0],
        locality: parallel[1],
        gender: parallel[2]
      },
      version: appVersion
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
