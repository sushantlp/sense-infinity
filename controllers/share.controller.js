"use strict";

// Import Controller
const databaseController = require("./database.controller");

// Import Package
const jwt = require("jsonwebtoken");
const jwtRefresh = require("jsonwebtoken-refresh");
const moment = require("moment");
const nodeMailer = require("nodemailer");

// Import Model
const smsModel = require("../models/sms");
const userModel = require("../models/user");
const partnerModel = require("../models/partner");
const historyModel = require("../models/login_history");
const posErrorModel = require("../models/pos_error_log");

// Import Config
const { Mail } = require("../config/constants");

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
    {
      expiresIn: 1500
    }
  ); // Expiry time in second
};

// Refresh JWT Token
module.exports.refreshToken = token => {
  const originalDecoded = jwt.decode(token, {
    complete: true
  });
  return jwtRefresh.refresh(originalDecoded, 1500, process.env.JWT_SECRET);
};

// Create Json Object
module.exports.createJsonObject = (
  data,
  msg,
  location,
  code,
  bool,
  metadata
) => {
  return JSON.stringify({
    results: data,
    message: msg,
    requestLocation: location,
    status: code,
    success: bool,
    metadata: metadata
  });
};

// Validate Password
module.exports.passwordAlgorthim = (mobile, password) => {
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
  if (pair1 == password)
    return {
      success: true,
      msg: "Succesful"
    };
  else
    return {
      success: false,
      msg: "Wrong password"
    };
};

// Validate Otp
module.exports.validateOtp = async (mobile, otp) => {
  try {
    // Read Sms Record
    const record = await smsModel.readSmsRecord("*", mobile, 1);

    // Check Result Length
    if (record.length > 0) {
      // Validate OTP
      if (parseInt(record[0].otp, 10) === parseInt(otp, 10))
        return {
          success: true,
          msg: "Succesful"
        };
      else
        return {
          success: false,
          msg: "Wrong otp"
        };
    } else
      return {
        success: false,
        msg: "Empty record"
      };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Reform Customer Detail
module.exports.reformCustomerDetail = (
  firstName,
  lastName,
  spouseName,
  dob,
  married,
  anniversary,
  addressOne,
  addressTwo,
  landmark,
  flag
) => {
  // Variable
  let reform = {
    anniversary: undefined,
    first_name: "fake",
    last_name: "fake",
    spouse_name: undefined,
    dob: moment(new Date("1949-08-15")).format("YYYY-MM-DD"),
    address_one: undefined,
    address_two: undefined,
    landmark: undefined,
    married: 0
  };

  // EMPTY || NULL || UNDEFINED
  if (
    firstName !== "" &&
    firstName !== null &&
    typeof firstName !== "undefined"
  )
    reform.first_name = firstName.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });

  if (lastName !== "" && lastName !== null && typeof lastName !== "undefined")
    reform.last_name = lastName.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });

  if (dob !== "" && dob !== null && typeof dob !== "undefined")
    reform.dob = moment(new Date(dob)).format("YYYY-MM-DD");

  if (flag) {
    if (
      spouseName !== "" &&
      spouseName !== null &&
      typeof spouseName !== "undefined"
    )
      reform.spouse_name = spouseName.replace(/\b[a-z]/g, function(f) {
        return f.toUpperCase();
      });

    if (
      anniversary !== "" &&
      anniversary !== null &&
      typeof anniversary !== "undefined"
    ) {
      reform.anniversary = moment(new Date(anniversary)).format("YYYY-MM-DD");
      if (isNaN(Date.parse(reform.anniversary)))
        reform.anniversary = moment(new Date("1949-08-15")).format(
          "YYYY-MM-DD"
        );
    }

    if (married !== "" && married !== null && typeof married !== "undefined")
      reform.married = married;

    if (
      addressOne !== "" &&
      addressOne !== null &&
      typeof addressOne !== "undefined"
    )
      reform.address_one = addressOne.replace(/\b[a-z]/g, function(f) {
        return f.toUpperCase();
      });

    if (
      addressTwo !== "" &&
      addressTwo !== null &&
      typeof addressTwo !== "undefined"
    )
      reform.address_two = addressTwo.replace(/\b[a-z]/g, function(f) {
        return f.toUpperCase();
      });

    if (landmark !== "" && landmark !== null && typeof landmark !== "undefined")
      reform.landmark = landmark.replace(/\b[a-z]/g, function(f) {
        return f.toUpperCase();
      });
  }

  return reform;
};

// Send Mail
module.exports.sendMail = (receiver, sender, subject, text, packages) => {
  const transporter = nodeMailer.createTransport({
    host: Mail.MAIL_HOST,
    port: Mail.MAIL_PORT,
    secure: false,
    auth: {
      user: Mail.MAIL_USERNAME,
      pass: Mail.MAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: sender, // sender address
    to: receiver, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: packages // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return Promise.reject(error);

    return Promise.resolve(
      "Message %s sent: %s",
      info.messageId,
      info.response
    );
  });
};

// Reform Stores Detail
module.exports.reformStoresDetail = (
  storeName,
  addressOne,
  addressTwo,
  landmark,
  storeEmail,
  refundDiscount,
  refundPolicy
) => {
  // Variable
  let reform = {
    storeName: undefined,
    addressOne: undefined,
    addressTwo: undefined,
    landmark: undefined,
    storeEmail: undefined,
    refundDiscount: 0,
    refundPolicy: undefined
  };

  // EMPTY || NULL || UNDEFINED
  if (
    storeName !== "" &&
    storeName !== null &&
    typeof storeName !== "undefined"
  )
    reform.storeName = storeName.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });

  if (
    addressOne !== "" &&
    addressOne !== null &&
    typeof addressOne !== "undefined"
  )
    reform.addressOne = addressOne.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });

  if (
    addressTwo !== "" &&
    addressTwo !== null &&
    typeof addressTwo !== "undefined"
  )
    reform.addressTwo = addressTwo.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });

  if (landmark !== "" && landmark !== null && typeof landmark !== "undefined")
    reform.landmark = landmark.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });

  if (
    storeEmail !== "" &&
    storeEmail !== null &&
    typeof storeEmail !== "undefined"
  )
    reform.storeEmail = storeEmail;

  if (
    refundDiscount !== "" &&
    refundDiscount !== null &&
    typeof refundDiscount !== "undefined"
  )
    reform.refundDiscount = refundDiscount;

  if (
    refundPolicy !== "" &&
    refundPolicy !== null &&
    typeof refundPolicy !== "undefined"
  )
    reform.refundPolicy = refundPolicy;

  return reform;
};

// Reform Warehouse Detail
module.exports.reformWarehouseDetail = (
  businessName,
  addressOne,
  addressTwo,
  landmark,
  gstin,
  cin,
  pan,
  email
) => {
  // Variable
  let reform = {
    businessName: undefined,
    addressOne: undefined,
    addressTwo: undefined,
    landmark: undefined,
    gstin: undefined,
    cin: undefined,
    pan: 0,
    email: undefined
  };

  // EMPTY || NULL || UNDEFINED
  if (
    businessName !== "" &&
    businessName !== null &&
    typeof businessName !== "undefined"
  )
    reform.businessName = businessName.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });

  if (
    addressOne !== "" &&
    addressOne !== null &&
    typeof addressOne !== "undefined"
  )
    reform.addressOne = addressOne.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });

  if (
    addressTwo !== "" &&
    addressTwo !== null &&
    typeof addressTwo !== "undefined"
  )
    reform.addressTwo = addressTwo.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });

  if (landmark !== "" && landmark !== null && typeof landmark !== "undefined")
    reform.landmark = landmark.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });

  if (gstin !== "" && gstin !== null && typeof gstin !== "undefined")
    reform.gstin = gstin;

  if (email !== "" && email !== null && typeof email !== "undefined")
    reform.email = email;

  if (cin !== "" && cin !== null && typeof cin !== "undefined")
    reform.cin = cin;

  if (pan !== "" && pan !== null && typeof pan !== "undefined")
    reform.pan = pan;

  return reform;
};

// Reform Secret Detail
module.exports.reformSecretDetail = (
  firstName,
  lastName,
  birthDate,
  departmentName,
  email
) => {
  // Variable
  let reform = {
    firstName: undefined,
    lastName: undefined,
    birthDate: undefined,
    departmentName: undefined,
    email: undefined
  };

  // EMPTY || NULL || UNDEFINED
  if (
    firstName !== "" &&
    firstName !== null &&
    typeof firstName !== "undefined"
  )
    reform.firstName = firstName.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });

  if (lastName !== "" && lastName !== null && typeof lastName !== "undefined")
    reform.lastName = lastName.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });

  if (
    birthDate !== "" &&
    birthDate !== null &&
    typeof birthDate !== "undefined"
  )
    reform.birthDate = moment(new Date(birthDate)).format("YYYY-MM-DD");

  if (
    departmentName !== "" &&
    departmentName !== null &&
    typeof departmentName !== "undefined"
  )
    reform.departmentName = departmentName.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });

  if (email !== "" && email !== null && typeof email !== "undefined")
    reform.email = email;

  return reform;
};

// Reform Warehouse Product
module.exports.reformWarehouseProduct = (
  productName,
  brandName,
  description
) => {
  // Variable
  let reform = {
    productName: undefined,
    brandName: undefined,
    description: undefined
  };

  // EMPTY || NULL || UNDEFINED
  if (!isNaN(productName)) reform.productName = productName;
  else if (
    productName !== "" &&
    productName !== null &&
    typeof productName !== "undefined"
  )
    reform.productName = productName.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });

  if (!isNaN(brandName)) reform.brandName = brandName;
  else if (
    brandName !== "" &&
    brandName !== null &&
    typeof brandName !== "undefined"
  )
    reform.brandName = brandName.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });

  if (!isNaN(description)) {
    reform.description = description;
  } else if (
    description !== "" &&
    description !== null &&
    typeof description !== "undefined"
  ) {
    reform.description = description.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });
  }

  return reform;
};

// Reform Discount Data
module.exports.reformDiscountData = (
  name,
  startDate,
  endDate,
  startTime,
  endTime
) => {
  // Variable
  let reform = {
    name: undefined,
    startDate: undefined,
    endDate: undefined,
    startTime: undefined,
    endTime: undefined
  };

  reform.name = name.replace(/\b[a-z]/g, function(f) {
    return f.toUpperCase();
  });
  reform.startDate = moment(new Date(startDate)).format("YYYY-MM-DD");
  reform.endDate = moment(new Date(endDate)).format("YYYY-MM-DD");
  // reform.startTime = moment(new Date(startTime)).format('YYYY-MM-DD');
  // reform.endTime = moment(new Date(endTime)).format('YYYY-MM-DD');

  return reform;
};

// Call User Partner Data
module.exports.userPartnerData = async id => {
  try {
    // Read User Record By Id
    let userRecord = await userModel.readUserById("*", id, 1);

    // Parse
    userRecord = JSON.stringify(userRecord);
    userRecord = JSON.parse(userRecord);

    // Read Partner Record
    let partnerRecord = await partnerModel.readPartnerByMobile(
      "*",
      userRecord[0].mobile,
      1
    );

    // Parse
    partnerRecord = JSON.stringify(partnerRecord);
    partnerRecord = JSON.parse(partnerRecord);

    return partnerRecord;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Write Login History
module.exports.writeLoginHistory = (partnerId, storeId, historyJson) => {
  try {
    return historyJson.map(async (history, index) => {
      const loginTime =
        history.login_time === "" || history.login_time === null
          ? undefined
          : history.login_time;
      const logoutTime =
        history.logout_time === "" || history.logout_time === null
          ? undefined
          : history.logout_time;

      historyModel.keepLoginHistory(
        partnerId,
        storeId,
        history.counter_key,
        history.user_key,
        loginTime,
        logoutTime,
        history.opening_amount,
        history.closing_amount,
        history.total_invoice,
        history.cash_amount,
        history.card_amount,
        history.sodexo_amount,
        history.total_amount,
        1
      );
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Write Error Log
module.exports.writeErrorLog = (partnerId, storeId, errorJson) => {
  try {
    return errorJson.map(async (error, index) => {
      posErrorModel.keepPosErrorLog(partnerId, storeId, error.text, 1);
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Keep Merchant Constant
module.exports.logicMerchantConstant = async (mobile, storeId) => {
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

    return {
      success: true,
      data: [],
      msg: "Succesful"
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Reform Supplier Record Date
module.exports.reformSupplierRecord = (
  supplierName,
  addressOne,
  addressTwo,
  landmark,
  state,
  city,
  country,
  email,
  gstin,
  cin,
  pan,
  note
) => {
  // Variable
  let reform = {
    supplierName: undefined,
    addressOne: undefined,
    addressTwo: undefined,
    landmark: undefined,
    state: undefined,
    city: undefined,
    country: undefined,
    email: undefined,
    gstin: undefined,
    cin: undefined,
    pan: undefined,
    note: undefined
  };

  reform.supplierName = supplierName.replace(/\b[a-z]/g, function(f) {
    return f.toUpperCase();
  });

  if (
    addressOne !== "" &&
    addressOne !== null &&
    typeof addressOne !== "undefined"
  )
    reform.addressOne = addressOne.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });

  if (
    addressTwo !== "" &&
    addressTwo !== null &&
    typeof addressTwo !== "undefined"
  ) {
    reform.addressTwo = addressTwo.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });
  }

  if (landmark !== "" && landmark !== null && typeof landmark !== "undefined") {
    reform.landmark = landmark.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });
  }

  if (state !== "" && state !== null && typeof state !== "undefined") {
    reform.state = state.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });
  }

  if (city !== "" && city !== null && typeof city !== "undefined") {
    reform.city = city.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });
  }

  if (country !== "" && country !== null && typeof country !== "undefined") {
    reform.country = country.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });
  }

  if (email !== "" && email !== null && typeof email !== "undefined") {
    reform.email = email;
  }

  if (gstin !== "" && gstin !== null && typeof gstin !== "undefined") {
    reform.gstin = gstin;
  }

  if (cin !== "" && cin !== null && typeof cin !== "undefined") {
    reform.cin = cin;
  }

  if (pan !== "" && pan !== null && typeof pan !== "undefined") {
    reform.pan = pan;
  }

  if (note !== "" && note !== null && typeof note !== "undefined") {
    reform.note = note.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });
  }

  return reform;
};
