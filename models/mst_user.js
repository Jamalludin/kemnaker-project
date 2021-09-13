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
    nik_user: DataTypes.STRING,
    nama_user: DataTypes.STRING,
    password: DataTypes.STRING,
    img_url: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'mst_user',
  });
  return mst_user;
};