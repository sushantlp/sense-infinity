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
const rewardResponse = require('../models/reward_question_response');

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
    let customerParse = await customerDataModel.readDataMobileCode(
      "*",
      mobile,
      code,
      1
    );

    // Parse
    customerParse = JSON.stringify(customerParse);
    customerParse = JSON.parse(customerParse);

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
    let recordParse = await customerDataModel.readDataMobileCode(
      "*",
      mobile,
      code,
      1
    );

    // Parse
    recordParse = JSON.stringify(recordParse);
    recordParse = JSON.parse(recordParse);

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
    const recordParse = await customerDataModel.readDataMobileCode("customer_information_id", mobile, code, 1);

    // Parse
    recordParse = JSON.stringify(recordParse);
    recordParse = JSON.parse(recordParse);

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
    let customerParse = await customerDataModel.readDataMobileCode(
      "*",
      mobile,
      code,
      1
    );

    // Parse
    customerParse = JSON.stringify(customerParse);
    customerParse = JSON.parse(customerParse);

    if (customerParse.length === 0) {
      return (responsedata = {
        success: false,
        data: {},
        msg: "Unknown user"
      });
    }

    // Customer Record Json
    const customerJson = customerRecordJson(customerParse);

    // Get Reward Question List
    const list = await logicRewardQuestionList(customerParse[0].customer_information_id)

    // Logic Coupon List
    const couponList = logicCouponList(customerParse[0].customer_information_id);

    return (responsedata = {
      success: true,
      data: {
        reward_point: customerParse[0].reward_point,
        customer_record: customerJson[0],
        reward_question: list,
        coupon_list: couponList,
      },
      msg: "Succesful"
    });

  } catch (error) {
    return Promise.reject(error);
  }
}

// Logic Coupon List
const logicCouponList = customerId => {
  try {

    return ([{
      "code": "123456789123456789",
      "valid_until": "2019-02-28",
      "merchant_name": "Robert Downey, Jr",
      "place": "Manhattan, New York City",
      "offer": "Free",
      "value": 0,
      "detail": "This is best strategy to get free stuff on Amazon, as fast as possible, and with the least amount of effort required too. All you need to do is sign up for an account at the website and then click to view and then “buy” the product",

    }, {
      "code": "123456789123456788",
      "valid_until": "2019-01-01",
      "merchant_name": "Tom Hanks",
      "place": "Concord, California",
      "offer": "Percent",
      "value": 10,
      "detail": "This is best strategy to get free stuff on Amazon, as fast as possible, and with the least amount of effort required too. All you need to do is sign up for an account at the website and then click to view and then “buy” the product"

    }, {
      "code": "123456789123456787",
      "valid_until": "2019-04-28",
      "merchant_name": "Leonardo DiCaprio",
      "place": " Hollywood, Los Angeles",
      "offer": "Price",
      "value": 50,
      "detail": "This is best strategy to get free stuff on Amazon, as fast as possible, and with the least amount of effort required too. All you need to do is sign up for an account at the website and then click to view and then “buy” the product"

    }, {
      "code": "123456789123456786",
      "valid_until": "2019-03-12",
      "merchant_name": "Matt Damon",
      "place": "Cambridge, Massachusetts",
      "offer": "Free",
      "value": 0,
      "detail": "This is best strategy to get free stuff on Amazon, as fast as possible, and with the least amount of effort required too. All you need to do is sign up for an account at the website and then click to view and then “buy” the product"

    }, {
      "code": "123456789123456785",
      "valid_until": "2020-08-05",
      "merchant_name": "Tom Cruise",
      "place": "Syracuse, New York",
      "offer": "Free",
      "value": 0,
      "detail": "This is best strategy to get free stuff on Amazon, as fast as possible, and with the least amount of effort required too. All you need to do is sign up for an account at the website and then click to view and then “buy” the product"

    }, {
      "code": "123456789123456784",
      "valid_until": "2014-02-28",
      "merchant_name": "Brad Pitt",
      "place": "Shawnee, Oklahoma",
      "offer": "Percent",
      "value": 0,
      "detail": "This is best strategy to get free stuff on Amazon, as fast as possible, and with the least amount of effort required too. All you need to do is sign up for an account at the website and then click to view and then “buy” the product"
    }]);

  } catch (error) {
    return Promise.reject(error);
  }
}

// Get Reward Question List
const logicRewardQuestionList = async(customerId) => {
  try {

    // Read All Reward Question List
    let questionParse = await rewardQuestion.readRewardQuestionList("customer_reward_questions.reward_question_id, customer_reward_questions.reward_question, customer_reward_questions.input_id, customer_reward_questions.reward_point, input_types.input_name", 1);

    // Parse
    questionParse = JSON.stringify(questionParse);
    questionParse = JSON.parse(questionParse);
    if (questionParse.length === 0) {
      return [];
    }

    return await creatRewardQuestionJson(questionParse, customerId)

  } catch (error) {
    return Promise.reject(error);
  }
}

// Create Feedback Json
const creatRewardQuestionJson = async(json, customerId) => {
  try {

    const jsonArray = json.map(async(list) => {

      // Block Variable
      let object = {};
      let customerRewardResponse = [];

      // Read All Reward Response by Question Id and Customer Id 
      let rewardResponseParse = await rewardResponse.readRewardResponse("*", list.reward_question_id, customerId, 1);

      // Parse
      rewardResponseParse = JSON.stringify(rewardResponseParse);
      rewardResponseParse = JSON.parse(rewardResponseParse);

      if (rewardResponseParse.length !== 0) {
        if (rewardResponseParse[0].reward_option_id === 0) {
          customerRewardResponse.push(rewardResponseParse[0].question_response);
        } else {
          rewardResponseParse.map((x) => {
            customerRewardResponse.push(x.reward_option_id.toString());
            return;
          });
        }
      }

      object.question_id = list.reward_question_id;
      object.question = list.reward_question;
      object.question_input_id = list.input_id;
      object.question_input_name = list.input_name;
      object.reward_point = list.reward_point;
      object.customer_reward_response = customerRewardResponse;

      // Read Reward Option List
      let optionList = await rewardOption.readRewardOptionList(
        "*",
        list.reward_question_id,
        1
      )

      // Parse
      optionList = JSON.stringify(optionList);
      optionList = JSON.parse(optionList);

      // Zero Means No Record
      if (optionList.length === 0) {
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
    let customerRecord = await customerDataModel.readDataMobileCode(
      "*",
      mobile,
      code,
      1
    );

    // Parse
    customerRecord = JSON.stringify(customerRecord);
    customerRecord = JSON.parse(customerRecord);

    if (customerRecord.length === 0) {
      return (responsedata = {
        success: false,
        data: {},
        msg: "Unknown user"
      });
    }

    // Iterate Question Reward Response
    iterateRewardResponse(customerRecord[0].customer_information_id, customerRecord[0].reward_point, json);

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
const iterateRewardResponse = async(id, rewardPoint, json) => {
  try {

    // Variable
    let point = rewardPoint;


    json.map(async(reward, index) => {

      // Read Reward Question
      let questionParse = await rewardQuestion.readRewardQuestion("*", parseInt(reward.question_id, 10), 1);

      // Parse
      questionParse = JSON.stringify(questionParse);
      questionParse = JSON.parse(questionParse);

      // Read All Reward Response by Question Id and Customer Id 
      let rewardParse = await rewardResponse.readRewardResponse("*", reward.question_id, id, 1);

      // Parse
      rewardParse = JSON.stringify(rewardParse);
      rewardParse = JSON.parse(rewardParse);

      if (questionParse.length !== 0) {

        if (questionParse[0].input_id === 1) { // Radio
          if (reward.option.length === 1) {
            if (rewardParse.length === 0) {
              // Keep Question Reward Response
              rewardResponse.keepRewardResponse(parseInt(reward.question_id, 10), parseInt(reward.option[0], 10), id, undefined, 1);

              // Add Reward Point
              point = point + questionParse[0].reward_point;
            } else {
              if (reward.option[0] !== rewardParse[0].reward_option_id) {
                // Update Reward Response 
                await rewardResponse.updateRewardResponse(rewardParse[0].question_response_id, 0);

                // Keep Question Reward Response
                rewardResponse.keepRewardResponse(parseInt(reward.question_id, 10), parseInt(reward.option[0], 10), id, undefined, 1);
              }
            }
          } else {
            console.log("Else 1")
          }
        } else if (questionParse[0].input_id === 2) { // Checkbox
          if (rewardParse.length === 0) {
            reward.option.map((x) => {
              // Keep Question Reward Response
              rewardResponse.keepRewardResponse(parseInt(reward.question_id, 10), parseInt(x, 10), id, undefined, 1);
              return;
            });

            // Add Reward Point
            point = point + questionParse[0].reward_point;

          } else {

            // Check Reward Response Duplicate
            const object = rewardResponseDuplicate(reward, rewardParse);

            // Soft Delete
            object.softDelete.map((x) => {

              // Update Reward Response By Question Id and Option Id
              rewardResponse.updateResponseByOption(parseInt(reward.question_id, 10), parseInt(x, 10), 0);
              return;
            });

            // Insert
            object.insert.map((x) => {
              // Keep Question Reward Response
              rewardResponse.keepRewardResponse(parseInt(reward.question_id, 10), parseInt(x, 10), id, undefined, 1);
              return;
            });

          }

        } else if (questionParse[0].input_id === 3) { // 5 Star

          if (reward.option.length === 1 && reward.option[0] <= 5) {
            if (rewardParse.length === 0) {
              // Keep Question Reward Response
              rewardResponse.keepRewardResponse(parseInt(reward.question_id, 10), 0, id, reward.option[0], 1);

              // Add Reward Point
              point = point + questionParse[0].reward_point;
            } else {
              if (reward.option[0] !== rewardParse[0].question_response) {
                // Update Reward Response 
                await rewardResponse.updateRewardResponse(rewardParse[0].question_response_id, 0);

                // Keep Question Reward Response
                rewardResponse.keepRewardResponse(parseInt(reward.question_id, 10), 0, id, reward.option[0], 1);
              }
            }
          } else {
            console.log("Else 3")
          }
        } else if (questionParse[0].input_id === 4) { // 10 Star

          if (reward.option.length === 1 && reward.option[0] <= 10) {
            if (rewardParse.length === 0) {
              // Keep Question Reward Response
              rewardResponse.keepRewardResponse(parseInt(reward.question_id, 10), 0, id, reward.option[0], 1);

              // Add Reward Point
              point = point + questionParse[0].reward_point;
            } else {
              if (reward.option[0] !== rewardParse[0].question_response) {
                // Update Reward Response 
                await rewardResponse.updateRewardResponse(rewardParse[0].question_response_id, 0);

                // Keep Question Reward Response
                rewardResponse.keepRewardResponse(parseInt(reward.question_id, 10), 0, id, reward.option[0], 1);
              }
            }
          } else {
            console.log("Else 4")
          }

        } else { // Text
          if (reward.option.length === 1) {
            if (rewardParse.length === 0) {
              // Keep Question Reward Response
              rewardResponse.keepRewardResponse(parseInt(reward.question_id, 10), 0, id, reward.option[0], 1);

              // Add Reward Point
              point = point + questionParse[0].reward_point;
            } else {
              // Update Reward Response 
              await rewardResponse.updateRewardResponse(rewardParse[0].question_response_id, 0);

              // Keep Question Reward Response
              rewardResponse.keepRewardResponse(parseInt(reward.question_id, 10), 0, id, reward.option[0], 1);
            }
          } else {
            console.log("Else 5")
          }
        }
      }

      // Last Execute
      if ((json.length - 1) === index) {
        customerDataModel.updateCustomerRewardPoint(point, id);
      }
    });

    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
}


// Check Reward Response Duplicate
const rewardResponseDuplicate = (x, y) => {

  // Variable
  let insert = [];
  let softDelete = [];
  let common = [];

  for (let i = 0; i < x.option.length; i++) {
    let flag = false;
    for (let j = 0; j < y.length; j++) {
      if (parseInt(x.option[i], 10) === y[j].reward_option_id) {
        flag = true;
        common.push(x.option[i]);
      }
    }

    if (!flag) {
      insert.push(x.option[i]);
      common.push(x.option[i]);
    }
  }

  for (let i = 0; i < y.length; i++) {
    let flag = true;
    for (let j = 0; j < common.length; j++) {
      if (y[i].reward_option_id === parseInt(common[j], 10)) {
        flag = false;
      }
    }

    if (flag) softDelete.push(y[i].reward_option_id);
  }

  return {
    insert: insert,
    softDelete: softDelete
  }
}