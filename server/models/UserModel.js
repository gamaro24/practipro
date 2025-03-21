const { DataTypes } = require("sequelize");
const db = require('../database/database');
const RoleModel = require("./RoleModel");
const UniversityModel = require("./UniversityModel");
const CarrerModel = require("./CarrerModel");

const UserModel = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  universityId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  carrerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dni: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  realaddress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cellphone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

UserModel.belongsTo(RoleModel, {foreignKey: 'roleId'});
RoleModel.hasOne(UserModel, {
  foreignKey: "roleId",
});
UserModel.belongsTo(UniversityModel, {foreignKey: 'universityId'});
UniversityModel.hasOne(UserModel, {
  foreignKey: "universityId",
});
UserModel.belongsTo(CarrerModel, {foreignKey: 'carrerId'});
CarrerModel.hasOne(UserModel, {
  foreignKey: "carrerId",
});


module.exports = UserModel;