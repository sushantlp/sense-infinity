'use strict';

// Import Controller
const shareController = require('./share.controller');

// Import Model
const smsModel = require('../models/sms');
const errorModel = require('../models/error_log');
const userModel = require('../models/user');
const partnerModel = require('../models/partner');
const storeModel = require('../models/partner_store');

// Request Merchant Signup
module.exports.requestAppSignup = (req, res) => {
  if (req.query.mobile !== undefined && req.query.mobile !== '') {

    // Logic App Signup
    return logicAppSignup(req.query.mobile)
      .then(response => {
        // Intialize
        const metadata = {
          type: req.query.mobile
        };

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              '/api/v1/merchant/signup',
              200,
              response.success,
              metadata
            )
          );
      })
      .catch(error => {
        return res.status(500).send('Oops our bad!!!');
      });
  } else {
    return res.status(400).send('Not a good api call');
  }
};

// Request Otp Verify
module.exports.requestOtpVerify = (req, res) => {
  if (
    req.query.mobile !== undefined &&
    req.query.mobile !== '' &&
    req.query.otp !== undefined &&
    req.query.otp !== '' &&
    req.query.password !== undefined &&
    req.query.password !== ''
  ) {

    // Logic Otp Verify
    return logicOtpVerify(req.query.mobile, req.query.otp, req.query.password)
      .then(response => {
        // Intialize
        const metadata = {
          type: req.query.mobile
        };
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              '/api/v1/otp/verify',
              200,
              response.success,
              metadata
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send('Oops our bad!!!');
      });
  } else {
    return res.status(400).send('Not a good api call');
  }
};

// Request Refresh Token
module.exports.requestRefreshToken = async(req, res) => {
  if (req.headers['authorization'] !== undefined && req.headers['authorization'] !== '') {
    // Refresh JWT Token
    const token = shareController.refreshToken(req.headers['authorization']);
    return res
      .status(200)
      .send(shareController.createJsonObject({
        token: token
      }, 'Successful', '/refresh/token', 200, true, null));
  } else {
    return res.status(400).send('Not a good api call');
  }
};

// Logic App Signup
const logicAppSignup = async mobile => {
  try {


    // Read Partner Record
    const merchant = await partnerModel.readPartnerByMobile('*', mobile, 1);

    // Check Sms Limit Per Day
    if (merchant.length < 1) return {
      success: false,
      data: [],
      msg: 'Unknown merchant'
    };


    // Read Daily Sms Limit
    const limit = await smsModel.dailySmsLimit('*', mobile);

    // Check Sms Limit Per Day
    if (limit.length > 3) return {
      success: false,
      data: [],
      msg: 'You have exceeded your OTP request limit, please try again 24 hour'
    };


    // Generate OTP
    const random = shareController.generateRandomNumber(4);

    // Update Sms Record
    await smsModel.updateSmsOtp(mobile, null, 0);

    // Keep Sms Record
    smsModel.keepSmsOtp(mobile, random, 1);

    return {
      success: true,
      data: [],
      msg: 'Otp send respective user mobile number'
    };
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

// Logic Otp Verify
const logicOtpVerify = async(mobile, otp, password) => {
  try {


    // Validate Password
    const passwordValidate = shareController.passwordAlgorthim(mobile, password);
    if (!passwordValidate.success) return passwordValidate;


    // Parallel Read User Table Record And Validate Otp
    const parallel = await Promise.all([
      shareController.validateOtp(mobile, otp),
      userModel.readUserRecord('user_id, name, mobile, email, password', mobile, 1, 1),
      partnerModel.readPartnerByMobile('*', mobile, 1)
    ]);

    if (parallel.length > 0) {
      if (!parallel[0].success) return parallel[0];

      const merchantStore = await storeModel.readStoreRecord(
        'store_id AS store_unique, store_name AS name',
        parallel[2][0].partner_id,
        1
      );

      // Generate JWT Token
      const token = shareController.generateToken(parallel[1]);

      // Update Sms Record
      smsModel.updateSmsOtp(mobile, null, 0);

      return {
        success: true,
        data: {
          token: token,
          store: merchantStore
        },
        msg: 'Successful'
      };
    } else {
      return Promise.reject('Oops our bad!!!');
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};