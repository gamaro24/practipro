const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

exports.transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_APP,
    pass: process.env.PASSWORD_EMAIL_APP,
  },
});