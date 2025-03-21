const { DataTypes } = require("sequelize");
const db = require('../database/database');

const UniversityModel = db.define("universities", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = UniversityModel;