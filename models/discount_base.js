'use strict';
module.exports = (sequelize, DataTypes) => {
  var discountBase = sequelize.define('discount_base', {
    discount_base_type: DataTypes.STRING,
    discount_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  discountBase.associate = function(models) {
    // associations can be defined here
  };
  return discountBase;
};