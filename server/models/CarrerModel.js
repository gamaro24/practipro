const { DataTypes } = require("sequelize");
const db = require('../database/database');
const UniversityModel = require("./UniversityModel");

const CarrerModel = db.define("carrer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  universityId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

CarrerModel.belongsTo(UniversityModel, {foreignKey: 'universityId'});
UniversityModel.hasOne(CarrerModel, {
  foreignKey: "universityId",
});

module.exports = CarrerModel;