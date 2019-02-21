"use strict";

// Validate Merchant SignUp
module.exports.validateSignUpRequest = (req, res) => {
  req.assert("mobile", "mobile can be 10 characters long").len(10);
  const errors = req.validationErrors();
  if (errors) return errors;
  return 1;
};


// Validate Survey Feedback
module.exports.validateSurveyFeedback = (json) => {
  for (let i = 0; i < json.length; i++) {

    // Survey
    if (json[i].customer_survey !== null) {
      for (let j = 0; j < json[i].customer_survey.length; j++) {
        if (!json[i].customer_survey[j].hasOwnProperty('question_id') || json[i].customer_survey[j]['question_id'] === '') return {
          success: false,
          msg: 'Survey question id should not be empty or null'
        };

        if (!json[i].customer_survey[j].hasOwnProperty('option_id') || json[i].customer_survey[j]['option_id'] === '') return {
          success: false,
          msg: 'Survey option id should not be empty or null'
        };

        if (!json[i].customer_survey[j].hasOwnProperty('role_id') || json[i].customer_survey[j]['role_id'] === '') return {
          success: false,
          msg: 'Survey role id should not be empty or null'
        };
      }
    }

    // Feedback
    if (json[i].customer_feedback !== null) {
      for (let j = 0; j < json[i].customer_feedback.length; j++) {
        if (!json[i].customer_feedback[j].hasOwnProperty('question_id') || json[i].customer_feedback[j]['question_id'] === '') return {
          success: false,
          msg: 'Feedback question id should not be empty or null'
        };

        if (!json[i].customer_feedback[j].hasOwnProperty('option_id') || json[i].customer_feedback[j]['option_id'] === '') return {
          success: false,
          msg: 'Feedback option id should not be empty or null'
        };

        if (!json[i].customer_feedback[j].hasOwnProperty('role_id') || json[i].customer_feedback[j]['role_id'] === '') return {
          success: false,
          msg: 'Feedback role id should not be empty or null'
        };
      }
    }
  }

  return {
    success: true,
    msg: 'Succesful'
  };
};

// Validate Customer Detail
module.exports.validateCustomerDetail = (loop, bool) => {
  for (let i = 0; i < loop.length; i++) {
    // Customer Mobile Parameter Validate
    if (!loop[i].hasOwnProperty('customer_mobile') || loop[i]['customer_mobile'] === '') return {
      success: false,
      msg: 'Customer mobile number should not be empty or null'
    };


    // Customer First Name Parameter Validate
    if (!loop[i].hasOwnProperty('first_name') || loop[i]['first_name'] === '') return {
      success: false,
      msg: 'Customer first name should be valid'
    };


    // Customer Last Name Parameter Validate
    if (!loop[i].hasOwnProperty('last_name') || loop[i]['last_name'] === '') return {
      success: false,
      msg: 'Customer last name should be valid'
    };


    // Customer Dob Parameter Validate
    if (!loop[i].hasOwnProperty('dob') || loop[i]['dob'] === '') return {
      success: false,
      msg: 'Customer dob should be valid'
    };


    // Customer Email Parameter Validate
    if (!loop[i].hasOwnProperty('email') || loop[i]['email'] === '') return {
      success: false,
      msg: 'Customer email should be valid'
    };


    // Customer Gender Id Parameter Validate
    if (!loop[i].hasOwnProperty('gender_id') || loop[i]['gender_id'] === '') return {
      success: false,
      msg: 'Gender should be valid'
    };


    // Customer Gender Id Is Numeric
    if (loop[i]['gender_id'] !== parseInt(loop[i]['gender_id'], 10)) return {
      success: false,
      msg: 'Gender should be numeric'
    };


    // If True then Execute
    if (bool) {
      // Customer Married Parameter Validate
      if (!loop[i].hasOwnProperty('married')) return {
        success: false,
        msg: 'Married parameter missing'
      };


      // Married Numeric
      if (loop[i]['married'] !== parseInt(loop[i]['married'], 10)) return {
        success: false,
        msg: 'Married should be numeric'
      };


      // Customer Spouse Name Parameter Validate
      if (!loop[i].hasOwnProperty('spouse_name')) return {
        success: false,
        msg: 'Spouse name parameter missing'
      };


      // Customer Anniversary Parameter Validate
      if (!loop[i].hasOwnProperty('anniversary')) return {
        success: false,
        msg: 'Anniversary parameter missing'
      };


      // Customer Address One Parameter Validate
      if (!loop[i].hasOwnProperty('address_one')) return {
        success: false,
        msg: 'Address one parameter missing'
      };


      // Customer Address Two Parameter Validate
      if (!loop[i].hasOwnProperty('address_two')) return {
        success: false,
        msg: 'Address two parameter missing'
      };


      // Customer Landmark Parameter Validate
      if (!loop[i].hasOwnProperty('landmark')) return {
        success: false,
        msg: 'Landmark parameter missing'
      };


      // Customer City Parameter Validate
      if (!loop[i].hasOwnProperty('city_id') ||
        loop[i]['city_id'] === '' ||
        loop[i]['city_id'] === undefined ||
        loop[i]['city_id'] !== parseInt(loop[i]['city_id'], 10)
      ) return {
        success: false,
        msg: 'City parameter missing'
      };


      // Customer Locality Parameter Validate
      if (!loop[i].hasOwnProperty('locality_id') ||
        loop[i]['locality_id'] === '' ||
        loop[i]['locality_id'] === undefined ||
        loop[i]['locality_id'] !== parseInt(loop[i]['locality_id'], 10)
      ) return {
        success: false,
        msg: 'Locality parameter missing'
      };

    }
  }

  return {
    success: true,
    msg: 'Succesful'
  };
};

// Validate Reward Question Response
module.exports.validateRewardResponse = (json) => {
  for (let i = 0; i < json.length; i++) {
    const instanceArray = json[i].option instanceof Array;

    if (!json[i].hasOwnProperty('question_id')) return {
      success: false,
      msg: 'Missing question id'
    };


    if (!json[i].hasOwnProperty('option')) return {
      success: false,
      msg: 'Missing option'
    };


    if (!instanceArray) return {
      success: false,
      msg: 'Option value should be array'
    };


    if (json[i].option.length === 0) return {
      success: false,
      msg: 'Option should not be empty'
    };

  }

  if (json.length !== 0) return {
    success: true,
    msg: 'Succesful'
  };
  else return {
    success: false,
    msg: 'Empty json'
  };

}