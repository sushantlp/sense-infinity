"use strict";

// Validate Merchant SignUp
module.exports.validateSignUpRequest = (req, res) => {
  req.assert("mobile", "mobile can be 10 characters long").len(10);
  const errors = req.validationErrors();
  if (errors) return errors;
  return 1;
};

// Validate Survey Feedback
module.exports.validateSurveyFeedback = json => {
  try {
    for (let i = 0; i < json.length; i++) {
      // Survey
      if (json[i].customer_survey !== null) {
        for (let j = 0; j < json[i].customer_survey.length; j++) {
          if (
            !json[i].customer_survey[j].hasOwnProperty("question_id") ||
            json[i].customer_survey[j]["question_id"] === ""
          )
            return {
              success: false,
              msg: "Survey question id should not be empty or null"
            };

          if (
            !json[i].customer_survey[j].hasOwnProperty("option_id") ||
            json[i].customer_survey[j]["option_id"] === ""
          )
            return {
              success: false,
              msg: "Survey option id should not be empty or null"
            };

          if (
            !json[i].customer_survey[j].hasOwnProperty("role_id") ||
            json[i].customer_survey[j]["role_id"] === ""
          )
            return {
              success: false,
              msg: "Survey role id should not be empty or null"
            };
        }
      }

      // Feedback
      if (json[i].customer_feedback !== null) {
        for (let j = 0; j < json[i].customer_feedback.length; j++) {
          if (
            !json[i].customer_feedback[j].hasOwnProperty("question_id") ||
            json[i].customer_feedback[j]["question_id"] === ""
          )
            return {
              success: false,
              msg: "Feedback question id should not be empty or null"
            };

          if (
            !json[i].customer_feedback[j].hasOwnProperty("option_id") ||
            json[i].customer_feedback[j]["option_id"] === ""
          )
            return {
              success: false,
              msg: "Feedback option id should not be empty or null"
            };

          if (
            !json[i].customer_feedback[j].hasOwnProperty("role_id") ||
            json[i].customer_feedback[j]["role_id"] === ""
          )
            return {
              success: false,
              msg: "Feedback role id should not be empty or null"
            };
        }
      }
    }

    return {
      success: true,
      msg: "Succesful"
    };
  } catch (error) {
    return {
      success: false,
      msg: "Wrong json"
    };
  }
};

// Validate Customer Detail
module.exports.validateCustomerDetail = (loop, bool) => {
  try {
    for (let i = 0; i < loop.length; i++) {
      // Customer Mobile Parameter Validate
      if (
        !loop[i].hasOwnProperty("customer_mobile") ||
        loop[i]["customer_mobile"] === ""
      )
        return {
          success: false,
          msg: "Customer mobile number should not be empty or null"
        };

      // Customer First Name Parameter Validate
      if (!loop[i].hasOwnProperty("first_name") || loop[i]["first_name"] === "")
        return {
          success: false,
          msg: "Customer first name should be valid"
        };

      // Customer Last Name Parameter Validate
      if (!loop[i].hasOwnProperty("last_name") || loop[i]["last_name"] === "")
        return {
          success: false,
          msg: "Customer last name should be valid"
        };

      // Customer Dob Parameter Validate
      if (!loop[i].hasOwnProperty("dob") || loop[i]["dob"] === "")
        return {
          success: false,
          msg: "Customer dob should be valid"
        };

      // Customer Email Parameter Validate
      if (!loop[i].hasOwnProperty("email") || loop[i]["email"] === "")
        return {
          success: false,
          msg: "Customer email should be valid"
        };

      // Customer Gender Id Parameter Validate
      if (!loop[i].hasOwnProperty("gender_id") || loop[i]["gender_id"] === "")
        return {
          success: false,
          msg: "Gender should be valid"
        };

      // Customer Gender Id Is Numeric
      if (loop[i]["gender_id"] !== parseInt(loop[i]["gender_id"], 10))
        return {
          success: false,
          msg: "Gender should be numeric"
        };

      // If True then Execute
      if (bool) {
        // Customer Married Parameter Validate
        if (!loop[i].hasOwnProperty("married"))
          return {
            success: false,
            msg: "Married parameter missing"
          };

        // Married Numeric
        if (loop[i]["married"] !== parseInt(loop[i]["married"], 10))
          return {
            success: false,
            msg: "Married should be numeric"
          };

        // Customer Spouse Name Parameter Validate
        if (!loop[i].hasOwnProperty("spouse_name"))
          return {
            success: false,
            msg: "Spouse name parameter missing"
          };

        // Customer Anniversary Parameter Validate
        if (!loop[i].hasOwnProperty("anniversary"))
          return {
            success: false,
            msg: "Anniversary parameter missing"
          };

        // Customer Address One Parameter Validate
        if (!loop[i].hasOwnProperty("address_one"))
          return {
            success: false,
            msg: "Address one parameter missing"
          };

        // Customer Address Two Parameter Validate
        if (!loop[i].hasOwnProperty("address_two"))
          return {
            success: false,
            msg: "Address two parameter missing"
          };

        // Customer Landmark Parameter Validate
        if (!loop[i].hasOwnProperty("landmark"))
          return {
            success: false,
            msg: "Landmark parameter missing"
          };

        // Customer City Parameter Validate
        if (
          !loop[i].hasOwnProperty("city_id") ||
          loop[i]["city_id"] === "" ||
          loop[i]["city_id"] === undefined ||
          loop[i]["city_id"] !== parseInt(loop[i]["city_id"], 10)
        )
          return {
            success: false,
            msg: "City parameter missing"
          };

        // Customer Locality Parameter Validate
        if (
          !loop[i].hasOwnProperty("locality_id") ||
          loop[i]["locality_id"] === "" ||
          loop[i]["locality_id"] === undefined ||
          loop[i]["locality_id"] !== parseInt(loop[i]["locality_id"], 10)
        )
          return {
            success: false,
            msg: "Locality parameter missing"
          };
      }
    }

    return {
      success: true,
      msg: "Succesful"
    };
  } catch (error) {
    return {
      success: false,
      msg: "Wrong json"
    };
  }
};

// Validate Reward Question Response
module.exports.validateRewardResponse = json => {
  try {
    for (let i = 0; i < json.length; i++) {
      const instanceArray = json[i].option instanceof Array;

      if (!json[i].hasOwnProperty("question_id"))
        return {
          success: false,
          msg: "Missing question id"
        };

      if (!json[i].hasOwnProperty("option"))
        return {
          success: false,
          msg: "Missing option"
        };

      if (!instanceArray)
        return {
          success: false,
          msg: "Option value should be array"
        };

      if (json[i].option.length === 0)
        return {
          success: false,
          msg: "Option should not be empty"
        };
    }

    if (json.length !== 0)
      return {
        success: true,
        msg: "Succesful"
      };
    else
      return {
        success: false,
        msg: "Empty json"
      };
  } catch (error) {
    return {
      success: false,
      msg: "Wrong json"
    };
  }
};

// Validate Warehouse Static Version
module.exports.warehouseStaticVersion = version => {
  try {
    if (!version.hasOwnProperty("city_version"))
      return {
        success: false,
        msg: "Missing city version"
      };

    if (!version.hasOwnProperty("locality_version"))
      return {
        success: false,
        msg: "Missing locality version"
      };

    if (!version.hasOwnProperty("discount_type_version"))
      return {
        success: false,
        msg: "Missing discount type version"
      };

    if (!version.hasOwnProperty("discount_base_version"))
      return {
        success: false,
        msg: "Missing discount base version"
      };

    if (!version.hasOwnProperty("gender_version"))
      return {
        success: false,
        msg: "Missing locality version"
      };

    if (!version.hasOwnProperty("warehouse_role_version"))
      return {
        success: false,
        msg: "Missing warehouse role version"
      };

    if (!version.hasOwnProperty("warehouse_payment_version"))
      return {
        success: false,
        msg: "Missing gender version"
      };

    if (!version.hasOwnProperty("global_category_version"))
      return {
        success: false,
        msg: "Missing category version"
      };

    if (!version.hasOwnProperty("global_sub_category_version"))
      return {
        success: false,
        msg: "Missing sub category version"
      };

    if (!version.hasOwnProperty("global_sub_sub_category_version"))
      return {
        success: false,
        msg: "Missing sub sub category version"
      };

    if (!version.hasOwnProperty("coupon_type_version"))
      return {
        success: false,
        msg: "Missing coupon type version"
      };

    if (!version.hasOwnProperty("coupon_sub_type_version"))
      return {
        success: false,
        msg: "Missing coupon sub type version"
      };

    if (!version.hasOwnProperty("item_condition_version"))
      return {
        success: false,
        msg: "Missing item condition version"
      };

    if (!version.hasOwnProperty("order_status_version"))
      return {
        success: false,
        msg: "Missing order status version"
      };

    if (!version.hasOwnProperty("product_unit_version"))
      return {
        success: false,
        msg: "Missing product unit version"
      };

    if (!version.hasOwnProperty("product_sub_unit_version"))
      return {
        success: false,
        msg: "Missing product sub unit version"
      };

    if (!version.hasOwnProperty("system_administrator_version"))
      return {
        success: false,
        msg: "Missing system administrator version"
      };

    if (!version.hasOwnProperty("tax_version"))
      return {
        success: false,
        msg: "Missing tax version"
      };

    return {
      success: true,
      msg: "Succesful"
    };
  } catch (error) {
    return {
      success: false,
      msg: "Wrong json"
    };
  }
};

// Validate Warehouse Stores Parameter
module.exports.warehouseStores = stores => {
  try {
    for (let i = 0; i < stores.length; i++) {
      if (!stores[i].hasOwnProperty("store_code"))
        return {
          success: false,
          msg: "Missing store code parameter"
        };

      if (
        !stores[i].hasOwnProperty("store_name") ||
        stores[i].store_name === undefined ||
        stores[i].store_name === "" ||
        Number.isInteger(stores[i].store_name)
      )
        return {
          success: false,
          msg: "Missing store name parameter"
        };

      if (
        !stores[i].hasOwnProperty("address_one") ||
        Number.isInteger(stores[i].address_one)
      )
        return {
          success: false,
          msg: "Missing address one parameter"
        };

      if (
        !stores[i].hasOwnProperty("address_two") ||
        Number.isInteger(stores[i].address_two)
      )
        return {
          success: false,
          msg: "Missing address two parameter"
        };

      if (
        !stores[i].hasOwnProperty("landmark") ||
        Number.isInteger(stores[i].landmark)
      )
        return {
          success: false,
          msg: "Missing landmark parameter"
        };

      if (
        !stores[i].hasOwnProperty("city_id") ||
        !Number.isInteger(stores[i].city_id)
      )
        return {
          success: false,
          msg: "Missing city id parameter"
        };

      if (
        !stores[i].hasOwnProperty("locality_id") ||
        !Number.isInteger(stores[i].locality_id)
      )
        return {
          success: false,
          msg: "Missing locality id parameter"
        };

      if (
        !stores[i].hasOwnProperty("store_mobile") ||
        stores[i].store_mobile === undefined ||
        stores[i].store_mobile === ""
      )
        return {
          success: false,
          msg: "Missing store mobile parameter"
        };

      if (!stores[i].hasOwnProperty("store_email"))
        return {
          success: false,
          msg: "Missing store email parameter"
        };

      if (!stores[i].hasOwnProperty("refund_on_discount"))
        return {
          success: false,
          msg: "Missing refund on discount parameter"
        };

      if (
        !stores[i].hasOwnProperty("refund_policy") ||
        Number.isInteger(stores[i].refund_policy)
      )
        return {
          success: false,
          msg: "Missing refund policy parameter"
        };

      if (
        !stores[i].hasOwnProperty("invoice_format") ||
        !Number.isInteger(stores[i].invoice_format)
      )
        return {
          success: false,
          msg: "Missing invoice format parameter"
        };

      if (
        !stores[i].hasOwnProperty("status") ||
        (stores[i].status !== 0 && stores[i].status !== 1)
      )
        return {
          success: false,
          msg: "Missing warehouse stores json status parameter"
        };
    }

    if (stores.length !== 0)
      return {
        success: true,
        msg: "Succesful"
      };
    else
      return {
        success: false,
        msg: "Empty json"
      };
  } catch (error) {
    return {
      success: false,
      msg: "Wrong json"
    };
  }
};

// Validate Warehouse Detail
module.exports.warehouseDetail = warehouses => {
  try {
    if (
      !warehouses.hasOwnProperty("warehouse_unique") ||
      !Number.isInteger(warehouses.warehouse_unique)
    )
      return {
        success: false,
        msg: "Missing warehouse unique"
      };

    if (
      !warehouses.hasOwnProperty("business_name") ||
      Number.isInteger(warehouses.business_name)
    )
      return {
        success: false,
        msg: "Missing business name"
      };

    if (
      !warehouses.hasOwnProperty("address_one") ||
      Number.isInteger(warehouses.address_one)
    )
      return {
        success: false,
        msg: "Missing address one"
      };

    if (
      !warehouses.hasOwnProperty("address_two") ||
      Number.isInteger(warehouses.address_two)
    )
      return {
        success: false,
        msg: "Missing address two"
      };

    if (
      !warehouses.hasOwnProperty("landmark") ||
      Number.isInteger(warehouses.landmark)
    )
      return {
        success: false,
        msg: "Missing landmark"
      };

    if (
      !warehouses.hasOwnProperty("city_id") ||
      !Number.isInteger(warehouses.city_id)
    )
      return {
        success: false,
        msg: "Missing city"
      };

    if (
      !warehouses.hasOwnProperty("locality_id") ||
      !Number.isInteger(warehouses.locality_id)
    )
      return {
        success: false,
        msg: "Missing locality"
      };

    if (!warehouses.hasOwnProperty("gstin"))
      return {
        success: false,
        msg: "Missing gstin"
      };

    if (!warehouses.hasOwnProperty("cin"))
      return {
        success: false,
        msg: "Missing cin"
      };

    if (!warehouses.hasOwnProperty("pan"))
      return {
        success: false,
        msg: "Missing pan"
      };

    if (!warehouses.hasOwnProperty("mobile"))
      return {
        success: false,
        msg: "Missing mobile"
      };

    if (!warehouses.hasOwnProperty("email"))
      return {
        success: false,
        msg: "Missing email"
      };

    return {
      success: true,
      msg: "Succesful"
    };
  } catch (error) {
    return {
      success: false,
      msg: "Wrong json"
    };
  }
};

// Validate Warehouse Secrets
module.exports.warehouseSecrets = secrets => {
  try {
    for (let i = 0; i < secrets.length; i++) {
      if (
        !secrets[i].hasOwnProperty("warehouse_user_unique") ||
        !Number.isInteger(secrets[i].warehouse_user_unique)
      )
        return {
          success: false,
          msg: "Missing warehouse user unique"
        };

      if (!secrets[i].hasOwnProperty("password"))
        return {
          success: false,
          msg: "Missing password"
        };

      if (
        !secrets[i].hasOwnProperty("role_unique") ||
        !Number.isInteger(secrets[i].role_unique)
      )
        return {
          success: false,
          msg: "Missing role unique"
        };

      if (
        !secrets[i].hasOwnProperty("branch_unique") ||
        !Number.isInteger(secrets[i].branch_unique)
      )
        return {
          success: false,
          msg: "Missing branch unique"
        };

      if (
        !secrets[i].hasOwnProperty("employe_unique") ||
        !Number.isInteger(secrets[i].employe_unique)
      )
        return {
          success: false,
          msg: "Missing employe unique"
        };

      if (
        parseInt(secrets[i].warehouse_user_unique, 10) > 0 &&
        parseInt(secrets[i].employe_unique, 10) > 0
      ) {
        if (
          secrets[i].password === null ||
          secrets[i].password === undefined ||
          secrets[i].password === ""
        )
          return {
            success: false,
            msg: "Password should not be empty or null"
          };

        if (parseInt(secrets[i].role_unique, 10) === 0)
          return {
            success: false,
            msg: "Role should not be empty or null"
          };

        if (parseInt(secrets[i].branch_unique, 10) === 0)
          return {
            success: false,
            msg: "Branch should not be zero"
          };
      } else if (parseInt(secrets[i].warehouse_user_unique, 10) > 0) {
        if (
          secrets[i].password === null ||
          secrets[i].password === undefined ||
          secrets[i].password === ""
        )
          return {
            success: false,
            msg: "Password should not be empty or null"
          };

        if (parseInt(secrets[i].role_unique, 10) === 0)
          return {
            success: false,
            msg: "Role should not be empty or null"
          };
      } else if (parseInt(secrets[i].employe_unique, 10) > 0) {
        if (parseInt(secrets[i].branch_unique, 10) === 0)
          return {
            success: false,
            msg: "Branch should not be zero"
          };
      }

      if (
        !secrets[i].hasOwnProperty("first_name") ||
        Number.isInteger(secrets[i].first_name)
      )
        return {
          success: false,
          msg: "Missing first name"
        };

      if (
        !secrets[i].hasOwnProperty("last_name") ||
        Number.isInteger(secrets[i].last_name)
      )
        return {
          success: false,
          msg: "Missing last name"
        };

      if (
        !secrets[i].hasOwnProperty("gender_id") ||
        !Number.isInteger(secrets[i].gender_id)
      )
        return {
          success: false,
          msg: "Missing gender id"
        };

      if (!secrets[i].hasOwnProperty("birth_date"))
        return {
          success: false,
          msg: "Missing birth date"
        };

      if (!secrets[i].hasOwnProperty("mobile"))
        return {
          success: false,
          msg: "Missing mobile"
        };

      if (!secrets[i].hasOwnProperty("email"))
        return {
          success: false,
          msg: "Missing email"
        };

      if (!secrets[i].hasOwnProperty("department_name"))
        return {
          success: false,
          msg: "Missing department name"
        };

      if (
        !secrets[i].hasOwnProperty("employee_status") ||
        (secrets[i].employee_status !== 0 && secrets[i].employee_status !== 1)
      )
        return {
          success: false,
          msg: "Missing employee status"
        };

      if (
        !secrets[i].hasOwnProperty("user_status") ||
        (secrets[i].user_status !== 0 && secrets[i].user_status !== 1)
      )
        return {
          success: false,
          msg: "Missing user status"
        };
    }

    if (secrets.length !== 0)
      return {
        success: true,
        msg: "Succesful"
      };
    else
      return {
        success: false,
        msg: "Empty json"
      };
  } catch (error) {
    return {
      success: false,
      msg: "Wrong json"
    };
  }
};

// Validate Warehouse Secrets
module.exports.warehouseProductDetail = products => {
  try {
    for (let i = 0; i < products.length; i++) {
      if (
        !products[i].hasOwnProperty("product_barcode") ||
        isNaN(products[i].product_barcode) ||
        products[i].product_name === null ||
        products[i].product_name === ""
      )
        return {
          success: false,
          msg: "Missing product barcode"
        };

      if (!products[i].hasOwnProperty("product_name"))
        return {
          success: false,
          msg: "Missing product name"
        };

      if (!products[i].hasOwnProperty("brand_name"))
        return {
          success: false,
          msg: "Missing brand name"
        };

      if (!products[i].hasOwnProperty("description"))
        return {
          success: false,
          msg: "Missing description"
        };

      if (
        !products[i].hasOwnProperty("category_unique") ||
        isNaN(products[i].category_unique) ||
        products[i].category_unique === "" ||
        products[i].category_unique === null
      )
        return {
          success: false,
          msg: "Missing category unique"
        };

      if (
        !products[i].hasOwnProperty("sub_category_unique") ||
        isNaN(products[i].sub_category_unique) ||
        products[i].sub_category_unique === "" ||
        products[i].sub_category_unique === null
      )
        return {
          success: false,
          msg: "Missing sub category unique"
        };

      if (
        !products[i].hasOwnProperty("sub_sub_category_unique") ||
        isNaN(products[i].sub_sub_category_unique) ||
        products[i].sub_sub_category_unique === "" ||
        products[i].sub_sub_category_unique === null
      )
        return {
          success: false,
          msg: "Missing sub sub category unique"
        };

      if (
        !products[i].hasOwnProperty("unit_unique") ||
        isNaN(products[i].unit_unique) ||
        products[i].unit_unique === "" ||
        products[i].unit_unique === null
      )
        return {
          success: false,
          msg: "Missing unit unique"
        };

      if (
        !products[i].hasOwnProperty("unit_sub_unique") ||
        isNaN(products[i].unit_sub_unique) ||
        products[i].unit_sub_unique === "" ||
        products[i].unit_sub_unique === null
      )
        return {
          success: false,
          msg: "Missing unit sub unique"
        };

      if (
        !products[i].hasOwnProperty("product_size") ||
        isNaN(products[i].product_size) ||
        products[i].product_size === "" ||
        products[i].product_size === null
      )
        return {
          success: false,
          msg: "Missing product size"
        };

      if (
        !products[i].hasOwnProperty("selling_price") ||
        isNaN(products[i].selling_price) ||
        products[i].selling_price === "" ||
        products[i].selling_price === null
      )
        return {
          success: false,
          msg: "Missing selling price"
        };

      if (
        !products[i].hasOwnProperty("product_margin") ||
        isNaN(products[i].product_margin) ||
        products[i].product_margin === "" ||
        products[i].product_margin === null
      )
        return {
          success: false,
          msg: "Missing product margin"
        };

      if (
        !products[i].hasOwnProperty("sgst") ||
        isNaN(products[i].sgst) ||
        products[i].sgst === "" ||
        products[i].sgst === null
      )
        return {
          success: false,
          msg: "Missing sgst"
        };

      if (
        !products[i].hasOwnProperty("cgst") ||
        isNaN(products[i].cgst) ||
        products[i].cgst === "" ||
        products[i].cgst === null
      )
        return {
          success: false,
          msg: "Missing cgst"
        };

      if (
        !products[i].hasOwnProperty("igst") ||
        isNaN(products[i].igst) ||
        products[i].igst === "" ||
        products[i].igst === null
      )
        return {
          success: false,
          msg: "Missing igst"
        };

      if (
        !products[i].hasOwnProperty("sodexo") ||
        isNaN(products[i].sodexo) ||
        products[i].sodexo === "" ||
        products[i].sodexo === null
      )
        return {
          success: false,
          msg: "Missing sodexo"
        };

      if (
        !products[i].hasOwnProperty("product_quantity") ||
        isNaN(products[i].product_quantity) ||
        products[i].product_quantity === "" ||
        products[i].product_quantity === null
      )
        return {
          success: false,
          msg: "Missing product quantity"
        };

      if (
        !products[i].hasOwnProperty("product_price") ||
        isNaN(products[i].product_price) ||
        products[i].product_price === "" ||
        products[i].product_price === null
      )
        return {
          success: false,
          msg: "Missing product price"
        };

      if (
        !products[i].hasOwnProperty("staple") ||
        (products[i].staple !== 0 && products[i].staple !== 1)
      )
        return {
          success: false,
          msg: "Missing staple"
        };

      if (
        !products[i].hasOwnProperty("hsn") ||
        isNaN(products[i].hsn) ||
        products[i].hsn === "" ||
        products[i].hsn === null
      )
        return {
          success: false,
          msg: "Missing hsn"
        };

      if (
        !products[i].hasOwnProperty("status") ||
        (products[i].status !== 0 && products[i].status !== 1)
      )
        return {
          success: false,
          msg: "Missing status"
        };
    }

    if (products.length !== 0)
      return {
        success: true,
        msg: "Succesful"
      };
    else
      return {
        success: false,
        msg: "Empty json"
      };
  } catch (error) {
    return {
      success: false,
      msg: "Wrong json"
    };
  }
};

// Validate Staple Product Detail Parameter
module.exports.stapleProductDetail = products => {
  try {
    for (let i = 0; i < products.length; i++) {
      if (
        !products[i].hasOwnProperty("product_barcode") ||
        isNaN(products[i].product_barcode) ||
        products[i].product_name === null ||
        products[i].product_name === ""
      )
        return {
          success: false,
          msg: "Missing product barcode"
        };

      if (!products[i].hasOwnProperty("product_name"))
        return {
          success: false,
          msg: "Missing product name"
        };

      if (!products[i].hasOwnProperty("brand_name"))
        return {
          success: false,
          msg: "Missing brand name"
        };

      if (!products[i].hasOwnProperty("description"))
        return {
          success: false,
          msg: "Missing description"
        };

      if (!products[i].hasOwnProperty("category_name"))
        return {
          success: false,
          msg: "Missing category name"
        };

      if (!products[i].hasOwnProperty("sub_category_name"))
        return {
          success: false,
          msg: "Missing sub category name"
        };

      if (!products[i].hasOwnProperty("sub_sub_category_name"))
        return {
          success: false,
          msg: "Missing sub sub category name"
        };

      if (!products[i].hasOwnProperty("unit_name"))
        return {
          success: false,
          msg: "Missing unit unique"
        };

      if (!products[i].hasOwnProperty("unit_sub_name"))
        return {
          success: false,
          msg: "Missing unit sub unique"
        };

      if (
        !products[i].hasOwnProperty("product_size") ||
        isNaN(products[i].product_size)
      )
        return {
          success: false,
          msg: "Missing product size"
        };

      if (
        !products[i].hasOwnProperty("selling_price") ||
        isNaN(products[i].selling_price)
      )
        return {
          success: false,
          msg: "Missing selling price"
        };

      if (
        !products[i].hasOwnProperty("product_margin") ||
        isNaN(products[i].product_margin)
      )
        return {
          success: false,
          msg: "Missing product margin"
        };

      if (
        !products[i].hasOwnProperty("product_price") ||
        isNaN(products[i].product_price)
      )
        return {
          success: false,
          msg: "Missing product price"
        };

      if (!products[i].hasOwnProperty("sgst") || isNaN(products[i].sgst))
        return {
          success: false,
          msg: "Missing sgst"
        };

      if (!products[i].hasOwnProperty("cgst") || isNaN(products[i].cgst))
        return {
          success: false,
          msg: "Missing cgst"
        };

      if (!products[i].hasOwnProperty("igst") || isNaN(products[i].igst))
        return {
          success: false,
          msg: "Missing igst"
        };

      if (!products[i].hasOwnProperty("hsn") || isNaN(products[i].hsn))
        return {
          success: false,
          msg: "Missing hsn"
        };

      if (
        !products[i].hasOwnProperty("status") ||
        (products[i].status !== 0 && products[i].status !== 1)
      )
        return {
          success: false,
          msg: "Missing status"
        };
    }

    if (products.length !== 0)
      return {
        success: true,
        msg: "Succesful"
      };
    else
      return {
        success: false,
        msg: "Empty json"
      };
  } catch (error) {
    return {
      success: false,
      msg: "Wrong json"
    };
  }
};

// Validate Warehouse Bill And Product Discount
module.exports.warehouseDiscount = (billJson, productJson) => {
  try {
    if (billJson.length === 0 && productJson.length === 0)
      return {
        success: false,
        msg: "Empty json"
      };

    // Bill Level Discount Json
    for (let i = 0; i < billJson.length; i++) {
      if (!billJson[i].hasOwnProperty("id") || isNaN(billJson[i].id))
        return {
          success: false,
          msg: "Missing bill json id parameter"
        };

      if (
        !billJson[i].hasOwnProperty("branch_id") ||
        isNaN(billJson[i].branch_id)
      )
        return {
          success: false,
          msg: "Missing bill json branch id parameter"
        };

      if (!billJson[i].hasOwnProperty("base_id") || isNaN(billJson[i].base_id))
        return {
          success: false,
          msg: "Missing bill json base id parameter"
        };

      if (
        !billJson[i].hasOwnProperty("name") ||
        billJson[i].name === null ||
        billJson[i].name === ""
      )
        return {
          success: false,
          msg: "Missing bill json name parameter"
        };

      if (
        !billJson[i].hasOwnProperty("start_date") ||
        billJson[i].start_date === null ||
        billJson[i].start_date === ""
      )
        return {
          success: false,
          msg: "Missing bill json start date parameter"
        };

      if (
        !billJson[i].hasOwnProperty("end_date") ||
        billJson[i].end_date === null ||
        billJson[i].end_date === ""
      )
        return {
          success: false,
          msg: "Missing bill json end date parameter"
        };

      if (
        !billJson[i].hasOwnProperty("start_time") ||
        billJson[i].start_time === null ||
        billJson[i].start_time === ""
      )
        return {
          success: false,
          msg: "Missing bill json start time parameter"
        };

      if (
        !billJson[i].hasOwnProperty("end_time") ||
        billJson[i].end_time === null ||
        billJson[i].end_time === ""
      )
        return {
          success: false,
          msg: "Missing bill json end time parameter"
        };

      if (
        !billJson[i].hasOwnProperty("minimum_amount") ||
        isNaN(billJson[i].minimum_amount)
      )
        return {
          success: false,
          msg: "Missing bill json minimum amount parameter"
        };

      if (
        !billJson[i].hasOwnProperty("maximum_amount") ||
        isNaN(billJson[i].maximum_amount)
      )
        return {
          success: false,
          msg: "Missing bill json maximum amount parameter"
        };

      if (
        !billJson[i].hasOwnProperty("offer_value") ||
        isNaN(billJson[i].offer_value)
      )
        return {
          success: false,
          msg: "Missing bill json offer value parameter"
        };

      if (
        !billJson[i].hasOwnProperty("status") ||
        (billJson[i].status !== 0 && billJson[i].status !== 1)
      )
        return {
          success: false,
          msg: "Missing bill json status parameter"
        };
    }

    // Product Level Discount Json
    for (let i = 0; i < productJson.length; i++) {
      if (
        productJson[i].value_products.length === 0 &&
        productJson[i].free_products.length === 0
      )
        return {
          success: false,
          msg:
            "Product json value products and free products json empty parameter"
        };

      if (
        productJson[i].value_products.length > 0 &&
        productJson[i].free_products.length > 0
      )
        return {
          success: false,
          msg:
            "Product json value products and free products only one full parameter"
        };

      if (!productJson[i].hasOwnProperty("id") || isNaN(productJson[i].id))
        return {
          success: false,
          msg: "Missing product json id parameter"
        };

      if (
        !productJson[i].hasOwnProperty("base_id") ||
        isNaN(productJson[i].base_id)
      )
        return {
          success: false,
          msg: "Missing product json base id parameter"
        };

      if (
        !productJson[i].hasOwnProperty("name") ||
        productJson[i].name === null ||
        productJson[i].name === ""
      )
        return {
          success: false,
          msg: "Missing product json name parameter"
        };

      if (
        !productJson[i].hasOwnProperty("start_date") ||
        productJson[i].start_date === null ||
        productJson[i].start_date === ""
      )
        return {
          success: false,
          msg: "Missing product json start date parameter"
        };

      if (
        !productJson[i].hasOwnProperty("end_date") ||
        productJson[i].end_date === null ||
        productJson[i].end_date === ""
      )
        return {
          success: false,
          msg: "Missing product json end date parameter"
        };

      if (
        !productJson[i].hasOwnProperty("start_time") ||
        productJson[i].start_time === null ||
        productJson[i].start_time === ""
      )
        return {
          success: false,
          msg: "Missing product json start time parameter"
        };

      if (
        !productJson[i].hasOwnProperty("end_time") ||
        productJson[i].end_time === null ||
        productJson[i].end_time === ""
      )
        return {
          success: false,
          msg: "Missing product json end time parameter"
        };

      // Value Product Json
      for (let j = 0; j < productJson[i].value_products.length; j++) {
        if (
          !productJson[i].value_products[j].hasOwnProperty("id") ||
          isNaN(productJson[i].value_products[j].id)
        )
          return {
            success: false,
            msg: "Missing product json value product json id parameter"
          };

        if (
          !productJson[i].value_products[j].hasOwnProperty("barcode") ||
          isNaN(productJson[i].value_products[j].barcode)
        )
          return {
            success: false,
            msg: "Missing product json value product json barcode parameter"
          };

        if (
          !productJson[i].value_products[j].hasOwnProperty("minimum_quantiy") ||
          isNaN(productJson[i].value_products[j].minimum_quantiy)
        )
          return {
            success: false,
            msg:
              "Missing product json value product json minimum quantiy parameter"
          };

        if (
          !productJson[i].value_products[j].hasOwnProperty("offer_value") ||
          isNaN(productJson[i].value_products[j].offer_value)
        )
          return {
            success: false,
            msg: "Missing product json value product json offer value parameter"
          };

        if (
          !productJson[i].value_products[j].hasOwnProperty("status") ||
          (productJson[i].value_products[j].status !== 0 &&
            productJson[i].value_products[j].status !== 1)
        )
          return {
            success: false,
            msg: "Missing product json value product json status parameter"
          };
      }

      // Free Product Json
      for (let j = 0; j < productJson[i].free_products.length; j++) {
        if (
          !productJson[i].free_products[j].hasOwnProperty("id") ||
          isNaN(productJson[i].free_products[j].id)
        )
          return {
            success: false,
            msg: "Missing product json free product json id parameter"
          };

        if (
          !productJson[i].free_products[j].hasOwnProperty("buy_product") ||
          isNaN(productJson[i].free_products[j].buy_product)
        )
          return {
            success: false,
            msg: "Missing product json free product json buy product parameter"
          };

        if (
          !productJson[i].free_products[j].hasOwnProperty("buy_quantiy") ||
          isNaN(productJson[i].free_products[j].buy_quantiy)
        )
          return {
            success: false,
            msg: "Missing product json free product json buy quantiy parameter"
          };

        if (
          !productJson[i].free_products[j].hasOwnProperty("free_product") ||
          isNaN(productJson[i].free_products[j].free_product)
        )
          return {
            success: false,
            msg: "Missing product json free product json free product parameter"
          };

        if (
          !productJson[i].free_products[j].hasOwnProperty("free_quantity") ||
          isNaN(productJson[i].free_products[j].free_quantity)
        )
          return {
            success: false,
            msg: "Missing product json free product json free quantiy parameter"
          };

        if (
          !productJson[i].free_products[j].hasOwnProperty("status") ||
          (productJson[i].free_products[j].status !== 0 &&
            productJson[i].free_products[j].status !== 1)
        )
          return {
            success: false,
            msg: "Missing product json status parameter"
          };
      }
    }

    return {
      success: true,
      msg: "Succesful"
    };
  } catch (error) {
    return {
      success: false,
      msg: "Wrong json"
    };
  }
};

// Validate Invoice And Return Invoice Parameter
module.exports.storeInvoice = (invoiceJson, returnInvoiceJson) => {
  try {
    if (invoiceJson.length === 0 && returnInvoiceJson.length === 0)
      return {
        success: false,
        msg: "Empty invoice and return invoice parameter json"
      };

    // Validate Return Invoice Parameter
    for (let i = 0; i < returnInvoiceJson.length; i++) {
      if (
        !returnInvoiceJson[i].hasOwnProperty("user_key") ||
        isNaN(returnInvoiceJson[i].user_key) ||
        returnInvoiceJson[i].user_key === null ||
        returnInvoiceJson[i].user_key === ""
      )
        return {
          success: false,
          msg: "Missing return invoice json user key parameter"
        };

      if (
        !returnInvoiceJson[i].hasOwnProperty("status") ||
        (returnInvoiceJson[i].status !== 0 && returnInvoiceJson[i].status !== 1)
      )
        return {
          success: false,
          msg: "Missing return invoice json status parameter"
        };

      if (!returnInvoiceJson[i].hasOwnProperty("reason"))
        return {
          success: false,
          msg: "Missing return invoice json reason parameter"
        };

      if (
        !returnInvoiceJson[i].hasOwnProperty("invoice_number") ||
        isNaN(returnInvoiceJson[i].invoice_number) ||
        returnInvoiceJson[i].invoice_number === null ||
        returnInvoiceJson[i].invoice_number === ""
      )
        return {
          success: false,
          msg: "Missing return invoice json invoice number parameter"
        };

      if (
        !returnInvoiceJson[i].hasOwnProperty("new_invoice_number") ||
        isNaN(returnInvoiceJson[i].new_invoice_number) ||
        returnInvoiceJson[i].new_invoice_number === null ||
        returnInvoiceJson[i].new_invoice_number === ""
      )
        return {
          success: false,
          msg: "Missing return invoice json new invoice number parameter"
        };
    }

    // Validate Invoice Parameter
    for (let i = 0; i < invoiceJson.length; i++) {
      if (
        !invoiceJson[i].hasOwnProperty("invoice_number") ||
        isNaN(invoiceJson[i].invoice_number) ||
        invoiceJson[i].invoice_number === null ||
        invoiceJson[i].invoice_number === ""
      )
        return {
          success: false,
          msg: "Missing invoice json invoice number parameter"
        };

      if (
        !invoiceJson[i].hasOwnProperty("counter_key") ||
        isNaN(invoiceJson[i].counter_key) ||
        invoiceJson[i].counter_key === null ||
        invoiceJson[i].counter_key === ""
      )
        return {
          success: false,
          msg: "Missing invoice json counter key parameter"
        };

      if (
        !invoiceJson[i].hasOwnProperty("user_key") ||
        isNaN(invoiceJson[i].user_key) ||
        invoiceJson[i].user_key === null ||
        invoiceJson[i].user_key === ""
      )
        return {
          success: false,
          msg: "Missing invoice json user key parameter"
        };

      if (!invoiceJson[i].hasOwnProperty("customer_name"))
        return {
          success: false,
          msg: "Missing invoice json customer name parameter"
        };

      if (
        !invoiceJson[i].hasOwnProperty("customer_mobile") ||
        isNaN(invoiceJson[i].customer_mobile)
      )
        return {
          success: false,
          msg: "Missing invoice json customer mobile parameter"
        };

      if (
        !invoiceJson[i].hasOwnProperty("membership_code") ||
        isNaN(invoiceJson[i].membership_code)
      )
        return {
          success: false,
          msg: "Missing invoice json membership code parameter"
        };

      if (
        !invoiceJson[i].hasOwnProperty("total_amount") ||
        isNaN(invoiceJson[i].total_amount) ||
        invoiceJson[i].total_amount === null ||
        invoiceJson[i].total_amount === ""
      )
        return {
          success: false,
          msg: "Missing invoice json total amount parameter"
        };

      if (
        !invoiceJson[i].hasOwnProperty("cashback") ||
        isNaN(invoiceJson[i].cashback) ||
        invoiceJson[i].cashback === null ||
        invoiceJson[i].cashback === ""
      )
        return {
          success: false,
          msg: "Missing invoice json cashback parameter"
        };

      if (
        !invoiceJson[i].hasOwnProperty("loyalty_used") ||
        isNaN(invoiceJson[i].loyalty_used) ||
        invoiceJson[i].loyalty_used === null ||
        invoiceJson[i].loyalty_used === ""
      )
        return {
          success: false,
          msg: "Missing invoice json loyalty used parameter"
        };

      if (
        !invoiceJson[i].hasOwnProperty("total_saving") ||
        isNaN(invoiceJson[i].total_saving) ||
        invoiceJson[i].total_saving === null ||
        invoiceJson[i].total_saving === ""
      )
        return {
          success: false,
          msg: "Missing invoice json total saving parameter"
        };

      if (
        !invoiceJson[i].hasOwnProperty("sodexo_amount") ||
        isNaN(invoiceJson[i].sodexo_amount) ||
        invoiceJson[i].sodexo_amount === null ||
        invoiceJson[i].sodexo_amount === ""
      )
        return {
          success: false,
          msg: "Missing invoice json sodexo amount parameter"
        };

      if (
        !invoiceJson[i].hasOwnProperty("invoice_total_amount") ||
        isNaN(invoiceJson[i].invoice_total_amount) ||
        invoiceJson[i].invoice_total_amount === null ||
        invoiceJson[i].invoice_total_amount === ""
      )
        return {
          success: false,
          msg: "Missing invoice json invoice total amount parameter"
        };

      if (!invoiceJson[i].hasOwnProperty("gstin_name"))
        return {
          success: false,
          msg: "Missing invoice json gstin name parameter"
        };

      if (!invoiceJson[i].hasOwnProperty("gstin_number"))
        return {
          success: false,
          msg: "Missing invoice json gstin number parameter"
        };

      if (!invoiceJson[i].hasOwnProperty("created_date"))
        return {
          success: false,
          msg: "Missing invoice json created date parameter"
        };

      if (!invoiceJson[i].hasOwnProperty("updated_date"))
        return {
          success: false,
          msg: "Missing invoice json updated date parameter"
        };

      if (
        !invoiceJson[i].hasOwnProperty("home_delivery") ||
        (invoiceJson[i].home_delivery !== 0 &&
          invoiceJson[i].home_delivery !== 1)
      )
        return {
          success: false,
          msg: "Missing invoice json home delivery parameter"
        };

      if (
        !invoiceJson[i].hasOwnProperty("return_status") ||
        (invoiceJson[i].return_status !== 0 &&
          invoiceJson[i].return_status !== 1)
      )
        return {
          success: false,
          msg: "Missing invoice json return status parameter"
        };

      if (
        !invoiceJson[i].hasOwnProperty("status") ||
        (invoiceJson[i].status !== 0 && invoiceJson[i].status !== 1)
      )
        return {
          success: false,
          msg: "Missing invoice json status parameter"
        };

      if (
        !invoiceJson[i].hasOwnProperty("round_off_amount") ||
        isNaN(invoiceJson[i].round_off_amount) ||
        invoiceJson[i].round_off_amount === null ||
        invoiceJson[i].round_off_amount === ""
      )
        return {
          success: false,
          msg: "Missing invoice json round off amount parameter"
        };

      if (!invoiceJson[i].hasOwnProperty("invoice_coupon"))
        return {
          success: false,
          msg: "Missing invoice json invoice coupon parameter"
        };

      const invoiceCoupon = validateInvoiceCoupon(
        invoiceJson[i].invoice_coupon
      );

      if (!invoiceCoupon.success) return invoiceCoupon;

      if (!invoiceJson[i].hasOwnProperty("invoice_payment"))
        return {
          success: false,
          msg: "Missing invoice json invoice payment parameter"
        };

      const invoicePayment = validateInvoicePayment(
        invoiceJson[i].invoice_payment
      );

      if (!invoicePayment.success) return invoicePayment;

      if (!invoiceJson[i].hasOwnProperty("invoice_product"))
        return {
          success: false,
          msg: "Missing invoice json invoice product parameter"
        };

      const invoiceProduct = validateInvoiceProduct(
        invoiceJson[i].invoice_product
      );

      if (!invoiceProduct.success) return invoiceProduct;

      if (!invoiceJson[i].hasOwnProperty("manual_discount"))
        return {
          success: false,
          msg: "Missing invoice json manual discount parameter"
        };

      const manualDiscount = validateManualDiscount(
        invoiceJson[i].manual_discount
      );

      if (!manualDiscount.success) return manualDiscount;
    }

    return {
      success: true,
      msg: "Succesful"
    };
  } catch (error) {
    return {
      success: false,
      msg: "Wrong json"
    };
  }
};

// Validate Manual Discount
const validateManualDiscount = json => {
  try {
    for (let i = 0; i < json.length; i++) {
      if (
        !json[i].hasOwnProperty("status") ||
        (json[i].status !== 0 && json[i].status !== 1)
      )
        return {
          success: false,
          msg: "Missing invoice manual discount json status parameter"
        };

      if (
        !json[i].hasOwnProperty("amount") ||
        isNaN(json[i].amount) ||
        json[i].amount === null ||
        json[i].amount === ""
      )
        return {
          success: false,
          msg: "Missing invoice manual discount json amount parameter"
        };

      if (
        !json[i].hasOwnProperty("user_key") ||
        isNaN(json[i].user_key) ||
        json[i].user_key === null ||
        json[i].user_key === ""
      )
        return {
          success: false,
          msg: "Missing invoice json user key parameter"
        };
    }

    return {
      success: true,
      msg: "Succesful"
    };
  } catch (error) {
    return {
      success: false,
      msg: "Wrong validate manual discount json"
    };
  }
};

// Validate Invoice Product
const validateInvoiceProduct = json => {
  try {
    for (let i = 0; i < json.length; i++) {
      if (
        !json[i].hasOwnProperty("status") ||
        (json[i].status !== 0 && json[i].status !== 1)
      )
        return {
          success: false,
          msg: "Missing invoice product json status parameter"
        };

      if (
        !json[i].hasOwnProperty("return_status") ||
        (json[i].return_status !== 0 && json[i].return_status !== 1)
      )
        return {
          success: false,
          msg: "Missing invoice product json return status parameter"
        };

      if (
        !json[i].hasOwnProperty("barcode") ||
        isNaN(json[i].barcode) ||
        json[i].barcode === null ||
        json[i].barcode === ""
      )
        return {
          success: false,
          msg: "Missing invoice product json barcode parameter"
        };

      if (!json[i].hasOwnProperty("name"))
        return {
          success: false,
          msg: "Missing invoice product json name parameter"
        };

      if (!json[i].hasOwnProperty("unit"))
        return {
          success: false,
          msg: "Missing invoice product json unit parameter"
        };

      if (
        !json[i].hasOwnProperty("quantity") ||
        isNaN(json[i].quantity) ||
        json[i].quantity === null ||
        json[i].quantity === ""
      )
        return {
          success: false,
          msg: "Missing invoice product json quantity parameter"
        };

      if (
        !json[i].hasOwnProperty("sgst") ||
        isNaN(json[i].sgst) ||
        json[i].sgst === null ||
        json[i].sgst === ""
      )
        return {
          success: false,
          msg: "Missing invoice product json sgst parameter"
        };

      if (
        !json[i].hasOwnProperty("cgst") ||
        isNaN(json[i].cgst) ||
        json[i].cgst === null ||
        json[i].cgst === ""
      )
        return {
          success: false,
          msg: "Missing invoice product json cgst parameter"
        };

      if (
        !json[i].hasOwnProperty("igst") ||
        isNaN(json[i].igst) ||
        json[i].igst === null ||
        json[i].igst === ""
      )
        return {
          success: false,
          msg: "Missing invoice product json igst parameter"
        };

      if (
        !json[i].hasOwnProperty("price") ||
        isNaN(json[i].price) ||
        json[i].price === null ||
        json[i].price === ""
      )
        return {
          success: false,
          msg: "Missing invoice product json price parameter"
        };

      if (
        !json[i].hasOwnProperty("discount") ||
        isNaN(json[i].discount) ||
        json[i].discount === null ||
        json[i].discount === ""
      )
        return {
          success: false,
          msg: "Missing invoice product json discount parameter"
        };

      if (
        !json[i].hasOwnProperty("discount_price") ||
        isNaN(json[i].discount_price) ||
        json[i].discount_price === null ||
        json[i].discount_price === ""
      )
        return {
          success: false,
          msg: "Missing invoice product json discount price parameter"
        };

      if (
        !json[i].hasOwnProperty("sub_total") ||
        isNaN(json[i].sub_total) ||
        json[i].sub_total === null ||
        json[i].sub_total === ""
      )
        return {
          success: false,
          msg: "Missing invoice product json sub total parameter"
        };

      if (
        !json[i].hasOwnProperty("hsn_code") ||
        isNaN(json[i].hsn_code) ||
        json[i].hsn_code === null ||
        json[i].hsn_code === ""
      )
        return {
          success: false,
          msg: "Missing invoice product json hsn code parameter"
        };
    }

    return {
      success: true,
      msg: "Succesful"
    };
  } catch (error) {
    return {
      success: false,
      msg: "Wrong validate manual discount json"
    };
  }
};

// Validate Invoice Payment
const validateInvoicePayment = json => {
  try {
    for (let i = 0; i < json.length; i++) {
      if (
        !json[i].hasOwnProperty("status") ||
        (json[i].status !== 0 && json[i].status !== 1)
      )
        return {
          success: false,
          msg: "Missing invoice payment json status parameter"
        };

      if (
        !json[i].hasOwnProperty("type") ||
        isNaN(json[i].type) ||
        json[i].type === null ||
        json[i].type === ""
      )
        return {
          success: false,
          msg: "Missing invoice payment json type parameter"
        };

      if (
        !json[i].hasOwnProperty("amount") ||
        isNaN(json[i].amount) ||
        json[i].amount === null ||
        json[i].amount === ""
      )
        return {
          success: false,
          msg: "Missing invoice payment json amount parameter"
        };

      if (!json[i].hasOwnProperty("transaction"))
        return {
          success: false,
          msg: "Missing invoice payment json transaction parameter"
        };

      if (
        !json[i].hasOwnProperty("card") ||
        isNaN(json[i].card) ||
        json[i].card === null ||
        json[i].card === ""
      )
        return {
          success: false,
          msg: "Missing invoice payment json card parameter"
        };
    }

    return {
      success: true,
      msg: "Succesful"
    };
  } catch (error) {
    return {
      success: false,
      msg: "Wrong validate manual discount json"
    };
  }
};

// Validate Invoice Coupon
const validateInvoiceCoupon = json => {
  try {
    for (let i = 0; i < json.length; i++) {
      if (
        !json[i].hasOwnProperty("status") ||
        (json[i].status !== 0 && json[i].status !== 1)
      )
        return {
          success: false,
          msg: "Missing invoice coupon json status parameter"
        };

      if (
        !json[i].hasOwnProperty("cashback") ||
        isNaN(json[i].cashback) ||
        json[i].cashback === null ||
        json[i].cashback === ""
      )
        return {
          success: false,
          msg: "Missing invoice coupon json cashback parameter"
        };

      if (
        !json[i].hasOwnProperty("discount") ||
        isNaN(json[i].discount) ||
        json[i].discount === null ||
        json[i].discount === ""
      )
        return {
          success: false,
          msg: "Missing invoice coupon json discount parameter"
        };

      if (!json[i].hasOwnProperty("applicable"))
        return {
          success: false,
          msg: "Missing invoice coupon json applicable parameter"
        };
    }

    return {
      success: true,
      msg: "Succesful"
    };
  } catch (error) {
    return {
      success: false,
      msg: "Wrong validate manual discount json"
    };
  }
};

// Validate Login History Parameter
module.exports.validateLoginHistory = json => {
  try {
    for (let i = 0; i < json.length; i++) {
      if (
        !json[i].hasOwnProperty("counter_key") ||
        isNaN(json[i].counter_key) ||
        json[i].counter_key === null ||
        json[i].counter_key === ""
      )
        return {
          success: false,
          msg: "Missing login history json counter key parameter"
        };

      if (
        !json[i].hasOwnProperty("user_key") ||
        isNaN(json[i].user_key) ||
        json[i].user_key === null ||
        json[i].user_key === ""
      )
        return {
          success: false,
          msg: "Missing login history json user key parameter"
        };

      if (!json[i].hasOwnProperty("login_time"))
        return {
          success: false,
          msg: "Missing login history json login time parameter"
        };

      if (!json[i].hasOwnProperty("logout_time"))
        return {
          success: false,
          msg: "Missing login history json logout time parameter"
        };

      if (
        !json[i].hasOwnProperty("opening_amount") ||
        isNaN(json[i].opening_amount) ||
        json[i].opening_amount === null ||
        json[i].opening_amount === ""
      )
        return {
          success: false,
          msg: "Missing login history json opening amount parameter"
        };

      if (
        !json[i].hasOwnProperty("closing_amount") ||
        isNaN(json[i].closing_amount) ||
        json[i].closing_amount === null ||
        json[i].closing_amount === ""
      )
        return {
          success: false,
          msg: "Missing login history json closing amount parameter"
        };

      if (
        !json[i].hasOwnProperty("total_invoice") ||
        isNaN(json[i].total_invoice) ||
        json[i].total_invoice === null ||
        json[i].total_invoice === ""
      )
        return {
          success: false,
          msg: "Missing login history json total invoice parameter"
        };

      if (
        !json[i].hasOwnProperty("cash_amount") ||
        isNaN(json[i].cash_amount) ||
        json[i].cash_amount === null ||
        json[i].cash_amount === ""
      )
        return {
          success: false,
          msg: "Missing login history json cash amount parameter"
        };

      if (
        !json[i].hasOwnProperty("card_amount") ||
        isNaN(json[i].card_amount) ||
        json[i].card_amount === null ||
        json[i].card_amount === ""
      )
        return {
          success: false,
          msg: "Missing login history json card amount parameter"
        };

      if (
        !json[i].hasOwnProperty("sodexo_amount") ||
        isNaN(json[i].sodexo_amount) ||
        json[i].sodexo_amount === null ||
        json[i].sodexo_amount === ""
      )
        return {
          success: false,
          msg: "Missing login history json sodexo amount parameter"
        };

      if (
        !json[i].hasOwnProperty("total_amount") ||
        isNaN(json[i].total_amount) ||
        json[i].total_amount === null ||
        json[i].total_amount === ""
      )
        return {
          success: false,
          msg: "Missing login history json total amount parameter"
        };
    }

    return {
      success: true,
      msg: "Succesful"
    };
  } catch (error) {
    return {
      success: false,
      msg: "Wrong validate login history discount json"
    };
  }
};

// Validate Error Log Parameter
module.exports.validateErrorLog = json => {
  try {
    for (let i = 0; i < json.length; i++) {
      if (
        !json[i].hasOwnProperty("text") ||
        json[i].text === null ||
        json[i].text === ""
      )
        return {
          success: false,
          msg: "Missing error log json text parameter"
        };
    }

    return {
      success: true,
      msg: "Succesful"
    };
  } catch (error) {
    return {
      success: false,
      msg: "Wrong validate error log json"
    };
  }
};
