'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class mst_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  mst_user.init({
    nik_user: {
      type:DataTypes.STRING
    },
    nama_user: {
      type:DataTypes.STRING
    },
    password: {
      type:DataTypes.STRING
    },
    img_url: {
      type:DataTypes.STRING
    },
    is_active: {
      require:true,
      type:DataTypes.BOOLEAN,
      defaultValue:true
    },
    email: {
      type:DataTypes.STRING
    },
    status: {
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'mst_user',
  });
  return mst_user;
};