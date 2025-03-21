const sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const {DATABASE,DATABASE_HOST,DATABASE_USER,DATABASE_PASSWORD,DATABASE_PORT} = process.env;

const db = new sequelize(DATABASE, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

module.exports = db;
