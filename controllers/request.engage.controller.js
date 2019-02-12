"use strict";

// Import Controller
const engageController = require("./logic.engage.controller");
const shareController = require("./share.controller");
const validateController = require("./validate.controller");

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

    // Variable
    let token = undefined;

    if (process.env.NODE_ENV !== "development") token = req.headers["authorization"];
    else token = req.body.token || req.query.token || req.headers["authorization"];

    // Logic Device Data
    return engageController
      .logicDeviceData(req.body.device, req.query.mobile, req.query.store_id)
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
              response.success, {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");

};

// Request Sense Infinity Static Data
module.exports.requestSenseStatic = (req, res) => {
  if (
    req.query.static_app_version !== undefined &&
    req.query.static_app_version !== ""
  ) {

    // Variable
    let token = undefined;

    if (process.env.NODE_ENV !== "development") token = req.headers["authorization"];
    else token = req.body.token || req.query.token || req.headers["authorization"];


    // Logic Sense Static
    return engageController
      .logicSenseStatic(parseFloat(req.query.static_app_version))
      .then(response => {

        // Variable
        let flag = false;

        if (response.hasOwnProperty("version")) flag = true;

        // Jwt Token Pass in Header
        res.header("token", token);

        // Intialize
        const metadata = {
          static_version: flag ? response.version : req.query.static_app_version,
          count: Object.keys(response.data).length
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
  } else return res.status(400).send("Not a good api call");

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

    // Variable
    let token = undefined;

    if (process.env.NODE_ENV !== "development") token = req.headers["authorization"];
    else token = req.body.token || req.query.token || req.headers["authorization"];


    // Validate Customer Detail
    const validate = validateController.validateCustomerDetail(
      req.body.complain,
      false
    );

    if (!validate.success) return res.status(400).send(validate.msg);

    // Request Logic Keep Complain
    return engageController
      .requestLogicKeepComplain(req.body.complain, req.query.mobile, req.query.store_id)
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
              response.success, {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");

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

    // Variable
    let token = undefined;

    if (process.env.NODE_ENV !== "development") token = req.headers["authorization"];
    else token = req.body.token || req.query.token || req.headers["authorization"];

    // Validate Customer Detail
    const validate = validateController.validateCustomerDetail(req.body.customer, true);
    if (!validate.success) return res.status(400).send(validate.msg);

    // Request Logic Keep Customer
    return engageController
      .requestLogicKeepCustomer(req.body.customer, req.query.mobile, req.query.store_id)
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
              response.success, {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");

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

    // Variable
    let token = undefined;

    if (process.env.NODE_ENV !== "development") token = req.headers["authorization"];
    else token = req.body.token || req.query.token || req.headers["authorization"];

    // Validate Customer Detail
    const validate = validateController.validateCustomerDetail(
      req.body.feedback_survey,
      false
    );
    if (!validate.success) return res.status(400).send(validate.msg);

    // Request Logic Keep Feedback Survey
    return engageController
      .requestLogicFeedbackSurvey(req.body.feedback_survey, req.query.mobile, req.query.store_id)
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
              response.success, {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else return res.status(400).send("Not a good api call");

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

    // Variable
    let token = undefined;

    if (process.env.NODE_ENV !== "development") token = req.headers["authorization"];
    else token = req.body.token || req.query.token || req.headers["authorization"];

    // Logic Get Feedback Data
    return engageController
      .logicGetFeedback(parseFloat(req.query.merchant_feed_version), parseFloat(req.query.sense_feed_version), req.query.mobile, req.query.store_id)
      .then(response => {

        // Variable
        let flag = false;

        if (response.hasOwnProperty("sense_version")) flag = true;

        // Jwt Token Pass in Header
        res.header("token", token);

        // Intialize
        const metadata = {
          sense_feedback_version: flag ? response.sense_version : req.query.sense_feed_version,
          merchant_feedback_version: flag ?
            response.merchant_version : req.query.merchant_feed_version,
          count: Object.keys(response.data).length
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
  } else return res.status(400).send("Not a good api call");

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

    // Variable
    let token = undefined;

    if (process.env.NODE_ENV !== "development") token = req.headers["authorization"];
    else token = req.body.token || req.query.token || req.headers["authorization"];

    // Logic Get Survey Data
    return engageController
      .logicGetSurvey(parseFloat(req.query.merchant_survey_version), parseFloat(req.query.sense_survey_version), req.query.mobile, req.query.store_id)
      .then(response => {

        // Variable
        let flag = false;

        if (response.hasOwnProperty("sense_version")) flag = true;

        // Jwt Token Pass in Header
        res.header("token", token);

        // Intialize
        const metadata = {
          sense_survey_version: flag ? response.sense_version : req.query.sense_survey_version,
          merchant_survey_version: flag ?
            response.merchant_version : req.query.merchant_survey_version,
          count: Object.keys(response.data).length
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
  } else return res.status(400).send("Not a good api call");

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

    // Variable
    let token = undefined;

    // If Production then Execute
    if (process.env.NODE_ENV !== "development") token = req.headers["authorization"];
    else token = req.body.token || req.query.token || req.headers["authorization"];

    // Logic Customer Data
    return engageController
      .logicCustomerData(parseFloat(req.query.customer_version), req.query.mobile, req.query.store_id)
      .then(response => {

        // Variable
        let flag = false;

        if (response.hasOwnProperty("customer_version")) flag = true;

        // Jwt Token Pass in Header
        res.header("token", token);

        // Intialize
        const metadata = {
          customer_version: flag ? response.customer_version : req.query.customer_version,
          count: Object.keys(response.data).length
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
  } else return res.status(400).send("Not a good api call");

};