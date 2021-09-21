'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  history.init({
    id_user: DataTypes.INTEGER,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    status: DataTypes.STRING,
    foto_selfie: DataTypes.STRING,
    foto_ttd: DataTypes.STRING,
    catatan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'history',
  });
  return history;
};