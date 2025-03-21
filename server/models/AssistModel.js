const { DataTypes } = require("sequelize");
const db = require('../database/database');
const UserModel = require("./UserModel");
const HourModel = require("./HourModel");
const CycleModel = require("./CycleModel");

const AssistModel = db.define("assist", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  cycleId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hourId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  signProfessor: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  signSupervisor: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  observations: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

AssistModel.belongsTo(UserModel, {foreignKey: 'userId'});
UserModel.hasOne(AssistModel, {
  foreignKey: "userId",
});
AssistModel.belongsTo(HourModel, {foreignKey: 'hourId'});
HourModel.hasOne(AssistModel, {
  foreignKey: "hourId",
});
AssistModel.belongsTo(CycleModel, {foreignKey: 'cycleId'});
CycleModel.hasMany(AssistModel, {
  foreignKey: "cycleId",
});

module.exports = AssistModel;