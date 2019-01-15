"use strict";

// Import Controller
const engageController = require("./logicEngageController");
const shareController = require("./shareController");

// Request Keep Device Data
module.exports.requestKeepDeviceData = (req, res) => {
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

    // Variable
    let token = undefined;

    // If Production then Execute
    if (process.env.APP_ENV.toUpperCase() === "PROD") {
      // Get Token In Header
      token = req.headers["authorization"];
    } else {
      // Get Token In Query
      token = req.body.token || req.query.token || req.headers["authorization"];
    }

    // Logic Device Data
    return engageController
      .logicDeviceData(deviceJson, mobile, storeId)
      .then(response => {
        // Jwt Token Pass in Header
        res.header("token", token);

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/merchant/keep/device",
              200,
              response.success,
              null
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Request Sense Infinity Static Data
module.exports.requestSenseStatic = (req, res) => {
  if (
    req.query.static_app_version !== undefined &&
    req.query.static_app_version !== ""
  ) {
    // Extract Parameter
    const appVersion = parseFloat(req.query.static_app_version);

    // Variable
    let flag = false;
    let token = undefined;

    // If Production then Execute
    if (process.env.APP_ENV.toUpperCase() == "PROD") {
      // Get Token In Header
      token = req.headers["authorization"];
    } else {
      // Get Token In Query
      token = req.body.token || req.query.token || req.headers["authorization"];
    }

    // Logic Sense Static
    return engageController
      .logicSenseStatic(appVersion)
      .then(response => {
        if (response.hasOwnProperty("version")) {
          flag = true;
        }

        // Jwt Token Pass in Header
        res.header("token", token);

        // Intialize
        const metadata = {
          static_version: flag ? response.version : appVersion,
          count: flag ? Object.keys(response.msg).length : 0
        };

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/merchant/get/static",
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
    return res.status(400).send("Not a good api call");
  }
};

// Request Keep Merchant Store Specific Complain
module.exports.requestKeepStoreComplain = (req, res) => {
  if (
    req.query.mobile !== undefined &&
    req.query.mobile !== "" &&
    req.query.store_id !== undefined &&
    req.query.store_id !== "" &&
    req.body.complain !== undefined &&
    req.body.complain !== ""
  ) {
    // Extract Parameter
    const complainJson = req.body.complain;
    const mobile = req.query.mobile;
    const storeId = req.query.store_id;

    // Variable
    let token = undefined;

    // If Production then Execute
    if (process.env.APP_ENV.toUpperCase() == "PROD") {
      // Get Token In Header
      token = req.headers["authorization"];
    } else {
      // Get Token In Query
      token = req.body.token || req.query.token || req.headers["authorization"];
    }

    // Validate Customer Detail
    const validate = shareController.validateCustomerDetail(
      complainJson,
      false
    );

    if (!validate.success) {
      return res.status(400).send(validate.msg);
    }

    // Request Logic Keep Complain
    return engageController
      .requestLogicKeepComplain(complainJson, mobile, storeId)
      .then(response => {
        // Jwt Token Pass in Header
        res.header("token", token);

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/merchant/keep/complain",
              200,
              response.success,
              {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Request Keep Merchant Specific Customer Detail
module.exports.requestKeepCustomerDetail = (req, res) => {
  if (
    req.query.mobile !== undefined &&
    req.query.mobile !== "" &&
    req.query.store_id !== undefined &&
    req.query.store_id !== "" &&
    req.body.customer !== undefined &&
    req.body.customer !== ""
  ) {
    // Extract Parameter
    const customerJson = req.body.customer;
    const mobile = req.query.mobile;
    const storeId = req.query.store_id;

    // Variable
    let token = undefined;

    // If Production then Execute
    if (process.env.APP_ENV.toUpperCase() == "PROD") {
      // Get Token In Header
      token = req.headers["authorization"];
    } else {
      // Get Token In Query
      token = req.body.token || req.query.token || req.headers["authorization"];
    }

    // Validate Customer Detail
    const validate = shareController.validateCustomerDetail(customerJson, true);
    if (!validate.success) {
      return res.status(400).send(validate.msg);
    }

    // Request Logic Keep Customer
    return engageController
      .requestLogicKeepCustomer(customerJson, mobile, storeId)
      .then(response => {
        // Jwt Token Pass In Header
        res.header("token", token);

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/merchant/keep/customer/detail",
              200,
              response.success,
              {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Request Keep Merchant Feedback Survey
module.exports.requestKeepFeedbackSurvey = (req, res) => {
  if (
    req.query.mobile !== undefined &&
    req.query.mobile !== "" &&
    req.query.store_id !== undefined &&
    req.query.store_id !== "" &&
    req.body.feedback_survey !== undefined &&
    req.body.feedback_survey !== ""
  ) {
    // Extract Parameter
    const feedbackSurveyJson = req.body.feedback_survey;
    const mobile = req.query.mobile;
    const storeId = req.query.store_id;

    // Variable
    let token = undefined;

    // If Production then Execute
    if (process.env.APP_ENV.toUpperCase() == "PROD") {
      // Get Token In Header
      token = req.headers["authorization"];
    } else {
      // Get Token In Query
      token = req.body.token || req.query.token || req.headers["authorization"];
    }

    // Validate Customer Detail
    const validate = shareController.validateCustomerDetail(
      feedbackSurveyJson,
      false
    );

    if (!validate.success) {
      return res.status(400).send(validate.msg);
    }

    // Request Logic Keep Feedback Survey
    return engageController
      .requestLogicFeedbackSurvey(feedbackSurveyJson, mobile, storeId)
      .then(response => {
        // Jwt Token Pass in Header
        res.header("token", token);

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/merchant/keep/feedback/survey",
              200,
              response.success,
              {}
            )
          );
      })
      .catch(error => {
        console.log(error);
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
    let token = undefined;

    // If Production then Execute
    if (process.env.APP_ENV.toUpperCase() == "PROD") {
      // Get Token In Header
      token = req.headers["authorization"];
    } else {
      // Get Token In Query
      token = req.body.token || req.query.token || req.headers["authorization"];
    }

    // Logic Get Feedback Data
    return engageController
      .logicGetFeedback(merchantVersion, senseVersion, mobile, storeId)
      .then(response => {
        if (response.hasOwnProperty("sense_version")) {
          flag = true;
        }

        // Jwt Token Pass in Header
        res.header("token", token);

        // Intialize
        const metadata = {
          sense_feedback_version: flag ? response.sense_version : senseVersion,
          merchant_feedback_version: flag
            ? response.merchant_version
            : merchantVersion,
          count: flag ? Object.keys(response.msg).length : 0
        };

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
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
    return res.status(400).send("Not a good api call");
  }
};

// Request Survey Data
module.exports.requestReadSurveyData = (req, res) => {
  if (
    req.query.mobile !== undefined &&
    req.query.mobile !== "" &&
    req.query.store_id !== undefined &&
    req.query.store_id !== "" &&
    req.query.sense_survey_version !== undefined &&
    req.query.sense_survey_version !== "" &&
    req.query.merchant_survey_version !== undefined &&
    req.query.merchant_survey_version !== ""
  ) {
    // Extract Parameter
    const mobile = req.query.mobile;
    const storeId = req.query.store_id;
    const merchantVersion = parseFloat(req.query.merchant_survey_version);
    const senseVersion = parseFloat(req.query.sense_survey_version);

    // Variable
    let flag = false;
    let token = undefined;

    // If Production then Execute
    if (process.env.APP_ENV.toUpperCase() == "PROD") {
      // Get Token In Header
      token = req.headers["authorization"];
    } else {
      // Get Token In Query
      token = req.body.token || req.query.token || req.headers["authorization"];
    }

    // Logic Get Survey Data
    return engageController
      .logicGetSurvey(merchantVersion, senseVersion, mobile, storeId)
      .then(response => {
        if (response.hasOwnProperty("sense_version")) {
          flag = true;
        }

        // Jwt Token Pass in Header
        res.header("token", token);

        // Intialize
        const metadata = {
          sense_survey_version: flag ? response.sense_version : senseVersion,
          merchant_survey_version: flag
            ? response.merchant_version
            : merchantVersion,
          count: flag ? Object.keys(response.msg).length : null
        };

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/merchant/get/survey",
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
    return res.status(400).send("Not a good api call");
  }
};

// Request Read Customer Data
module.exports.requestReadCustomerData = (req, res) => {
  if (
    req.query.mobile !== undefined &&
    req.query.mobile !== "" &&
    req.query.store_id !== undefined &&
    req.query.store_id !== "" &&
    req.query.customer_version !== undefined &&
    req.query.customer_version !== ""
  ) {
    // Extract Parameter
    const mobile = req.query.mobile;
    const storeId = req.query.store_id;
    const customerVersion = parseFloat(req.query.customer_version);

    // Variable
    let flag = false;
    let token = undefined;

    // If Production then Execute
    if (process.env.APP_ENV.toUpperCase() == "PROD") {
      // Get Token In Header
      token = req.body.token || req.query.token || req.headers["authorization"];
    } else {
      // Get Token In Query
      token = req.query.token;
    }

    // Logic Customer Data
    return engageController
      .logicCustomerData(customerVersion, mobile, storeId)
      .then(response => {
        if (response.hasOwnProperty("customer_version")) {
          flag = true;
        }

        // Jwt Token Pass in Header
        res.header("token", token);

        // Intialize
        const metadata = {
          customer_version: flag ? response.customer_version : customerVersion,
          count: flag ? Object.keys(response.msg).length : 0
        };

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/merchant/get/customer",
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
    return res.status(400).send("Not a good api call");
  }
};
