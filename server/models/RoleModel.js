const { DataTypes } = require("sequelize");
const db = require('../database/database');

const RoleModel = db.define("role", {
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
});

module.exports = RoleModel;