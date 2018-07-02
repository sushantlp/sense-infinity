"use strict";

// Import Controller
const validateController = require("./validateController");
const shareController = require("./shareController");

// Import Model
const smsModel = require("../models/sms");
const errorModel = require("../models/error_log");
const userModel = require("../models/user");

// Request Merchant Signup
module.exports.requestAppSignup = (req, res) => {
  if (req.query.mobile !== undefined && req.query.mobile !== "") {
    // Extract Parameter
    const mobile = req.query.mobile;

    // Validate Merchant SignUp
    const validate = validateController.validateSignUpRequest(req, res);

    // Check Response Code
    if (isNaN(validate)) {
      return res.status(400).send(validate[0].msg);
    }

    // Logic App Signup
    return logicAppSignup(mobile)
      .then(response => {
        // Intialize
        const metadata = { type: mobile };

        return res
          .status(200)
          .send(
            createJsonObject(
              response.msg,
              "/api/v1/merchant/signup",
              200,
              response.sucess,
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

// Logic App Signup
const logicAppSignup = async mobile => {
  try {
    // Intialize
    let responsedata = {};

    // Read Youtube Playlist All Data
    const limit = await smsModel.dailySmsLimit("*", mobile);

    // Check Sms Limit Per Day
    if (limit.length > 3) {
      return (responsedata = {
        sucess: false,
        msg:
          "You have exceeded your OTP request limit, please try again 24 hour"
      });
    }

    // Generate OTP
    const random = shareController.generateRandomNumber(4);

    // Update Sms Record
    await smsModel.updateSmsOtp(mobile, null, 0);

    // Keep Sms Record
    await smsModel.keepSmsOtp(mobile, random, 1);

    return (responsedata = {
      sucess: true,
      msg: "Otp send respective user mobile number"
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Request Otp Verify
module.exports.requestOtpVerify = (res, req) => {
  if (
    req.query.mobile !== undefined &&
    req.query.mobile !== "" &&
    req.query.otp !== undefined &&
    req.query.otp !== "" &&
    req.query.password !== undefined &&
    req.query.password !== ""
  ) {
    // Extract Parameter
    const mobile = req.query.mobile;
    const otp = req.query.otp;
    const password = req.query.password;

    // Logic Otp Verify
    return logicOtpVerify(mobile, otp, password)
      .then(response => {
        // Intialize
        const metadata = { type: mobile };

        return res
          .status(200)
          .send(
            createJsonObject(
              response.msg,
              "/api/v1/otp/verify",
              200,
              response.sucess,
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

// Logic Otp Verify
const logicOtpVerify = async (mobile, otp, password) => {};
// Create Json Object
const createJsonObject = (data, location, code, bool, metadata) => {
  return JSON.stringify({
    results: data,
    requestLocation: location,
    status: code,
    bool: bool,
    metadata: metadata
  });
};
