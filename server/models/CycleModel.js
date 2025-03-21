const { DataTypes } = require("sequelize");
const db = require('../database/database');
const UserModel = require("./UserModel");
const CarrerModel = require("./CarrerModel");
const InstitutionModel = require("./InstitutionModel");

const CycleModel = db.define("cycle", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  numberCycle: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  carrerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  institutionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  observations: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

CycleModel.belongsTo(UserModel, {foreignKey: 'userId'});
UserModel.hasMany(CycleModel, {
  foreignKey: "userId",
});
CycleModel.belongsTo(CarrerModel, {foreignKey: 'carrerId'});
CarrerModel.hasMany(CycleModel, {
  foreignKey: "carrerId",
});
CycleModel.belongsTo(InstitutionModel, {foreignKey: 'institutionId'});
InstitutionModel.hasMany(CycleModel, {
  foreignKey: "institutionId",
});

module.exports = CycleModel;