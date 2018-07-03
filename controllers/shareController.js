"use strict";

// Import Package
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");

// Import Model
const smsModel = require("../models/sms");

// Load Environment Variables.
dotEnv.load({ path: ".env" });

// Generate Random Number
module.exports.generateRandomNumber = (length = 10) => {
  let characters = "123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return randomString;
};

// Generate JWT Token
module.exports.generateToken = payload => {
  return jwt.sign(
    {
      data: payload
    },
    process.env.JWT_SECRET,
    { expiresIn: 1500 }
  ); // Expiry time in second
};

// Refresh JWT Token
module.exports.refreshToken = token => {
  const originalDecoded = jwt.decode(token, { complete: true });
  return jwt.refresh(originalDecoded, 1500, process.env.JWT_SECRET);
};

// Validate Password
module.exports.passwordAlgorthim = (mobile, password) => {
  // Intialize
  let responsedata = {};

  // Split String Into Array
  const mobileSplit = mobile.split("");

  // Array Length
  const length = mobileSplit.length;

  // Variable Declaration
  let pair1 = "";
  let pair2 = 0;

  // Loop
  for (let i = 0; i < length; i++) {
    //
    if (i % 2 == 0) {
      // Concat
      pair1 = pair1.concat(mobileSplit[i]);

      // Addition
      pair2 = parseInt(pair2) + parseInt(mobileSplit[i]);
    }
  }

  // Concat
  pair1 = pair1.concat(pair2);

  // Validate Password
  if (pair1 == password) {
    return (responsedata = {
      success: true,
      msg: "Succesful"
    });
  } else {
    return (responsedata = {
      success: false,
      msg: "Wrong password"
    });
  }
};

// Validate Otp
module.exports.validateOtp = async (mobile, otp) => {
  try {
    // Intialize
    let responsedata = {};

    // Read Sms Record
    const record = await smsModel.readSmsRecord("*", mobile, 1);

    // Check Result Length
    if (record.length > 0) {
      // Validate OTP
      if (parseInt(record[0].otp, 10) === parseInt(otp, 10)) {
        return (responsedata = {
          success: true,
          msg: "Succesful"
        });
      } else {
        return (responsedata = {
          success: false,
          msg: "Wrong otp"
        });
      }
    } else {
      return (responsedata = {
        success: false,
        msg: "Empty record"
      });
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
