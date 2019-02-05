"use strict";

// Import Package
const moment = require('moment');

// Import Config
const {
  EMAIL_REG,
  Gateway
} = require("../config/constants");

// Import Model
const customerDataModel = require("../models/customer_information_data");
const customerTrackModel = require("../models/customer_information_track");
const cardModel = require("../models/customer_membership_card");
const smsModel = require('../models/sms');
const rewardQuestion = require('../models/customer_reward_question');
const rewardOption = require('../models/customer_reward_option');
const responseOption = require('../models/reward_question_response');

// Import Controller
const shareController = require("./share.controller");


// Logic Verify Memebership Card and Mobile
module.exports.logicVerifyMemberMobile = async(card, mobile, code) => {
  try {

    // Variable
    let responsedata = {};

    // Replace + 
    code = code.replace(/\+/g, '');

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
        Gateway.INFINITY_REWARD,
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
        Gateway.INFINITY_REWARD,
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
        Gateway.INFINITY_REWARD,
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

// Logic Register Email
module.exports.logicRegisterEmail = async(email, mobile, code) => {
  try {

    // Variable
    let responsedata = {};

    // Replace + 
    code = code.replace(/\+/g, '');

    if (!EMAIL_REG.test(email)) {
      return (responsedata = {
        success: false,
        data: [],
        msg: "Invalid email"
      });
    }

    // Read Customer Information Data by Mobile and Country Code
    const customerRecord = await customerDataModel.readDataMobileCode(
      "*",
      mobile,
      code,
      1
    );

    // Parse
    const customerStringify = JSON.stringify(customerRecord);
    const customerParse = JSON.parse(customerStringify);

    if (customerParse.length === 0) {
      return (responsedata = {
        success: false,
        data: [],
        msg: "Wrong user"
      });
    }

    // Update Customer Information Data
    customerDataModel.updateCustomerData(
      customerParse[0].first_name,
      customerParse[0].last_name,
      email,
      customerParse[0].dob,
      customerParse[0].gender_id,
      customerParse[0].city_id,
      customerParse[0].locality_id,
      customerParse[0].married,
      customerParse[0].address_one,
      customerParse[0].address_two,
      customerParse[0].landmark,
      customerParse[0].spouse_name,
      customerParse[0].anniversary_date,
      customerParse[0].customer_information_id);

    // Keep Information Track
    customerTrackModel.keepInformationTrack(
      customerParse[0].first_name,
      customerParse[0].last_name,
      email,
      customerParse[0].mobile,
      customerParse[0].country_code,
      customerParse[0].dob,
      customerParse[0].gender_id,
      customerParse[0].city_id,
      customerParse[0].locality_id,
      0,
      0,
      customerParse[0].married,
      customerParse[0].address_one,
      customerParse[0].address_two,
      customerParse[0].landmark,
      customerParse[0].spouse_name,
      customerParse[0].anniversary_date,
      Gateway.INFINITY_REWARD,
      1);

    // Generate OTP
    const random = shareController.generateRandomNumber(4);

    // Concate
    mobile = code + mobile

    // Update Sms Record
    await smsModel.updateSmsOtp(mobile, null, 0);

    // Keep Sms Record
    smsModel.keepSmsOtp(mobile, random, 1);

    // Send Mail
    shareController.sendMail(email, "contact@sense8.tech", "OTP", "", random);

    return (responsedata = {
      success: true,
      data: [],
      msg: "Succesful"
    });

  } catch (error) {
    return Promise.reject(error);
  }
}

// Logic Verify Otp
module.exports.logicVerifyOtp = async(password, mobile, code, otp) => {
  try {

    // Variable
    let responsedata = {};

    // Replace + 
    code = code.replace(/\+/g, '');

    // Concate
    const newMobile = code + mobile

    // Validate Password
    const passwordValidate = shareController.passwordAlgorthim(mobile, password);
    if (!passwordValidate.success) {
      return passwordValidate;
    }

    // Validate Otp
    const validate = await shareController.validateOtp(newMobile, otp);
    if (!validate.success) {
      return validate;
    }

    // Read Customer Information Data by Mobile and Country Code
    const record = await customerDataModel.readDataMobileCode(
      "*",
      mobile,
      code,
      1
    );

    // Parse
    const recordStringify = JSON.stringify(record);
    const recordParse = JSON.parse(recordStringify);

    // Generate JWT Token
    const token = shareController.generateToken(recordParse);

    // Update Sms Record
    smsModel.updateSmsOtp(newMobile, null, 0);

    return (responsedata = {
      success: true,
      data: {
        token: token,
      },
      msg: 'Successful'
    });

  } catch (error) {
    return Promise.reject(error);
  }
}

// Logic Keep Customer Data
module.exports.logicKeepCustomerData = async(email, mobile, code, card, firstName, lastName, dob, gender, married, spouse, anniversary, addressOne, addressTwo, landmark, city, locality) => {
  try {

    // Intialize
    let responsedata = {};

    // Replace + 
    code = code.replace(/\+/g, '');

    if (!EMAIL_REG.test(email)) {
      return (responsedata = {
        success: false,
        data: [],
        msg: "Invalid email"
      });
    }

    // Reform Customer Detail
    const reform = shareController.reformCustomerDetail(
      firstName,
      lastName,
      spouse,
      dob,
      married,
      anniversary,
      addressOne,
      addressTwo,
      landmark,
      true
    );


    // Read Customer Information Data by Mobile and Country Code
    const record = await customerDataModel.readDataMobileCode("customer_information_id", mobile, code, 1);

    // Parse
    const recordStringify = JSON.stringify(record);
    const recordParse = JSON.parse(recordStringify);

    if (recordParse.length === 0) {
      return (responsedata = {
        success: false,
        data: {},
        msg: "Unknown user"
      });
    }

    // Update Customer Information Data
    customerDataModel.updateCustomerData(
      reform.first_name,
      reform.last_name,
      email,
      reform.dob,
      parseInt(gender, 10),
      parseInt(city, 10),
      parseInt(locality, 10),
      parseInt(married, 10),
      reform.address_one,
      reform.address_two,
      reform.landmark,
      reform.spouse_name,
      reform.anniversary,
      recordParse[0].customer_information_id
    );

    // Keep Information Track
    customerTrackModel.keepInformationTrack(
      reform.first_name,
      reform.last_name,
      email,
      mobile,
      code,
      reform.dob,
      parseInt(gender, 10),
      parseInt(city, 10),
      parseInt(locality, 10),
      0,
      0,
      parseInt(married, 10),
      reform.address_one,
      reform.address_two,
      reform.landmark,
      reform.spouse_name,
      reform.anniversary,
      Gateway.INFINITY_REWARD,
      1
    );

    return (responsedata = {
      success: true,
      data: [],
      msg: "Succesful"
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

// Logic Get All Coupon Customer Reward
module.exports.logicGetAllData = async(mobile, code) => {
  try {

    // Variable
    let responsedata = {};
    let rewardPoint = 0;

    // Replace + 
    code = code.replace(/\+/g, '');

    // Read Customer Information Data by Mobile and Country Code
    const customerRecord = await customerDataModel.readDataMobileCode(
      "*",
      mobile,
      code,
      1
    );

    // Parse
    const customerStringify = JSON.stringify(customerRecord);
    const customerParse = JSON.parse(customerStringify);

    if (customerParse.length === 0) {
      return (responsedata = {
        success: false,
        data: {},
        msg: "Unknown user"
      });
    }

    // Customer Record Json
    const customerJson = customerRecordJson(customerParse);

    const list = await Promise.all([

      // Get Reward Question List
      logicRewardQuestionList(),

      // Get User Reward Question Response List
      logicUserQuestionResponse(customerParse[0].id),

    ]);

    return (responsedata = {
      success: true,
      data: {
        reward_point: customerParse[0].reward_point,
        customer_record: customerJson[0],
        reward_question: list[0],
        customer_reward_response: list[1]
      },
      msg: "Succesful"
    });

  } catch (error) {
    return Promise.reject(error);
  }
}

// Get Reward Question List
const logicRewardQuestionList = async() => {
  try {

    // Read All Reward Question List
    const question = await rewardQuestion.readRewardQuestionList("customer_reward_questions.reward_question_id, customer_reward_questions.reward_question, customer_reward_questions.input_id, customer_reward_questions.reward_point, input_types.input_name", 1);

    // Parse
    const questionStringify = JSON.stringify(question);
    const questionParse = JSON.parse(questionStringify);
    if (questionParse.length === 0) {
      return [];
    }

    return await creatRewardQuestionJson(questionParse)

  } catch (error) {
    return Promise.reject(error);
  }
}

// Create Feedback Json
const creatRewardQuestionJson = async(json) => {
  try {

    // Variable
    let optionList = [];
    let questionParse = [];

    const jsonArray = json.map(async(list, index) => {

      // Block Variable
      let object = {};

      // Read Reward Option List
      optionList = await rewardOption.readRewardOptionList(
        "*",
        list.reward_question_id,
        1
      );

      object.question_id = list.reward_question_id;
      object.question = list.reward_question;
      object.question_input_id = list.input_id;
      object.question_input_name = list.input_name;
      object.reward_point = list.reward_point;

      // Parse
      questionParse = JSON.stringify(optionList);
      questionParse = JSON.parse(questionParse);

      // Zero Means No Record
      if (questionParse.length === 0) {
        object.option_list = [];
      } else {

        // Create Option Json
        object.option_list = createRewardOptionJson(optionList);
      }

      return object;
    });

    return await Promise.all(jsonArray);
  } catch (error) {

    return Promise.reject(error);
  }
};

// Create Option Json
const createRewardOptionJson = (json) => {
  // Variable
  let array = [];
  json.map(async(option, index) => {
    // Block Variable
    let object = {};

    object.option_id = option.reward_option_id;
    object.option_value = option.option_value;

    // Push Array
    array.push(object);
  });

  return array;
}


const logicUserQuestionResponse = async() => {
  return [];
}


// Customer Record Json
const customerRecordJson = (json) => {

  // Variable
  let array = [];

  json.map((customer, index) => {
    // Block Variable
    let object = {};

    // object.id = customer.customer_information_id;
    object.mobile = customer.mobile;
    object.code = customer.country_code;
    object.gender = customer.gender_id;
    object.city = customer.city_id;
    object.locality = customer.locality_id;
    object.married = customer.married;

    if (customer.first_name === 'NULL') {
      object.first_name = null;
    } else {
      object.first_name = customer.first_name;
    }

    if (customer.last_name === 'NULL') {
      object.last_name = null;
    } else {
      object.last_name = customer.last_name;
    }

    if (customer.email === 'NULL') {
      object.email = null;
    } else {
      object.email = customer.email;
    }

    if (customer.dob === 'NULL') {
      object.dob = null;
    } else {
      object.dob = customer.dob;
    }

    if (customer.address_one === 'NULL') {
      object.address_one = null;
    } else {
      object.address_one = customer.address_one;
    }

    if (customer.address_two === 'NULL') {
      object.address_two = null;
    } else {
      object.address_two = customer.address_two;
    }

    if (customer.landmark === 'NULL') {
      object.landmark = null;
    } else {
      object.landmark = customer.landmark;
    }

    if (customer.spouse_name === 'NULL') {
      object.spouse_name = null;
    } else {
      object.spouse_name = customer.spouse_name;
    }

    if (customer.anniversary_date === 'NULL') {
      object.anniversary_date = null;
    } else {
      object.anniversary_date = customer.anniversary_date;
    }

    // Push Array
    array.push(object);
  });

  return array;
}

module.exports.logicRewardResponse = async(mobile, code, json) => {
  try {

    // Variable
    let responsedata = {};

    // Replace + 
    code = code.replace(/\+/g, '');

    // Read Customer Information Data by Mobile and Country Code
    const customerRecord = await customerDataModel.readDataMobileCode(
      "*",
      mobile,
      code,
      1
    );

    // Parse
    const customerStringify = JSON.stringify(customerRecord);
    const customerParse = JSON.parse(customerStringify);

    if (customerParse.length === 0) {
      return (responsedata = {
        success: false,
        data: {},
        msg: "Unknown user"
      });
    }

    // Iterate Question Reward Response
    iterateRewardResponse(customerParse[0].customer_information_id, json);

    return (responsedata = {
      success: true,
      data: {},
      msg: "Succesful"
    });

  } catch (error) {
    return Promise.reject(error);
  }
}

// Iterate Question Reward Response
const iterateRewardResponse = async(id, json) => {
  try {
    json.map(async(reward, index) => {

      // Block Variable
      let response = undefined;
      let optionId = 0;
      if (reward.question_input_id !== 1 && reward.question_input_id !== 2) {
        response = reward.question_response;
      } else {
        optionId = reward.option_id;
      }

      // Keep Question Reward Response
      await responseOption.keepRewardResponse(parseInt(reward.question_id, 10), parseInt(optionId, 10), id, response, 1);
    });

    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
}