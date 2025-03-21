const { DataTypes } = require("sequelize");
const db = require('../database/database');
const CycleModel = require("./CycleModel");

const EvaluationModel = db.define("evaluation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  cycleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  criteria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  note: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  observations: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

EvaluationModel.belongsTo(CycleModel, {foreignKey: 'cycleId'});
CycleModel.hasMany(EvaluationModel, {
  foreignKey: "cycleId",
});

module.exports = EvaluationModel;