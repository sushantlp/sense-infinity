'use strict';
module.exports = (sequelize, DataTypes) => {
  var inputType = sequelize.define(
    'input_type',
    {
      input_name: DataTypes.STRING,
      min: DataTypes.STRING,
      max: DataTypes.STRING,
      comment: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  inputType.associate = function(models) {
    // associations can be defined here
  };
  return inputType;
};
