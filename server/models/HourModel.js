const { DataTypes } = require("sequelize");
const db = require('../database/database');
const InstitutionModel = require("./InstitutionModel");
const UniversityModel = require("./UniversityModel");
const CarrerModel = require("./CarrerModel");

const HourModel = db.define("hours", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  dateFrom: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dateTo: {
    type: DataTypes.DATE,
    allowNull: false
  },
  institutionId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  universityId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  carrerId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

HourModel.belongsTo(InstitutionModel, {foreignKey: 'institutionId'});
InstitutionModel.hasOne(HourModel, {
  foreignKey: "institutionId",
});
HourModel.belongsTo(UniversityModel, {foreignKey: 'universityId'});
UniversityModel.hasOne(HourModel, {
  foreignKey: "universityId",
});
HourModel.belongsTo(CarrerModel, {foreignKey: 'carrerId'});
CarrerModel.hasOne(HourModel, {
  foreignKey: "carrerId",
});

module.exports = HourModel;