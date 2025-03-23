const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transporter } = require("../utils/utils");
const path = require("path");
const Sequelize = require("sequelize");
const { PAGE_LIMIT } = process.env;
const { calcNumOffset, calcTotalPages } = require("../helpers/helpers");

//NODEMAILER
const hbs = require("nodemailer-express-handlebars");
const { response } = require("express");
const RoleModel = require("../models/RoleModel");


transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".handlebars",
  })
);


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).json({
        msg: "El usuario y constraseña son requeridos",
      });
    }
    // Validate if user exist in our database
    const user = await UserModel.findOne({
      where: { username: username },
    });

    if (user) {

      const isMatch = await bcrypt.compare(password, user.password);

      const token = jwt.sign(
        {
          username,
          password,
        },
        process.env.JWT_ACOUNT_ACTIVE,
        { expiresIn: "10h" }
      );

      jwt.verify(
        token,
        process.env.JWT_ACOUNT_ACTIVE,
        async (err, decoded) => {
          if (err) {
            return res
              .status(401)
              .json({ msg: "Token incorrecto o el tiempo expiró." });
          }
          //cambiar por is match
          if (true) {
            return res
              .status(200)
              .json({ msg: "Inicio de sesión exitoso", user: user, token });
          } else {
            return res.status(401).json({ msg: "Id o contraseña incorrecta" });
          }
        }
      );
    } else {
      return res
        .status(400)
        .json({ msg: "No existe ningún usuario con ese ID." });
    }
  } catch (error) {
    console.log("No existe ningún usuario con ese ID." + error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const user = await UserModel.findAll({
      include: [{ model: RoleModel }],
    });
    if (user) {
      res.status(200).json({ response: user });
    } else {
      res.status(500).json({ msg: "Error al obtener los usuarios." });
    }
  } catch (error) {
    console.log("Error al obtener los usuarios.");
  }
};



exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (user) {
      return res.status(200).json({ user })
    } else {
      res.status(400).json({ msg: "No existe el usuario." });
    }
  } catch (error) {
    console.log("No existe el usuario.");
  }
};

exports.getAllPaginated = async (req, res) => {
  try {
    const { name, id, roleIdLogged, universityId, roleId } = req.query;
    console.log(req.query);
    const { page } = req.params;
    const Op = Sequelize.Op;
    const offsetIns = calcNumOffset(page);
    let options = {
      where: {},
      include: [{ model: RoleModel }],
      offset: offsetIns,
      limit: Number(PAGE_LIMIT),
    };

    if (name) {
      options.where.name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (id) {
      options.where.id = id;
    }
    if (roleIdLogged == 2) {
      options.where.universityId = universityId;
      options.where.roleId = 3;
    }
    if (roleIdLogged == 1 && roleId) {
      options.where.roleId = roleId;
    }
    const { count, rows } = await UserModel.findAndCountAll(options);
    const cantPages = calcTotalPages(count);

    if (rows) {
      res.status(200).json({ pages: cantPages, response: rows });
    } else {
      res.status(500).json({ msg: "Los usuarios no existen." });
    }
  } catch (error) {
    console.log("Los usuarios no existen." + error);
  }
};

exports.create = async (req, res) => {
  const {
    username,
    roleId,
    name,
    lastname,
    email,
    universityId,
    carrerId,
    dni,
    address,
    realaddress,
    cellphone,
    password,
    confirmPassword,
  } = req.body;

  try {
    //inputs validate
    if (
      !(
        username &&
        roleId &&
        name &&
        lastname &&
        email &&
        dni &&
        password
      )
    ) {
      return res.status(400).json({ msg: "Todos los campos son requeridos." });
    }
    //password validate
    if (password !== confirmPassword) {
      return res.json({
        msg: "Las contraseñas ingresadas no son iguales.",
      });
    }

    //validate username
    const checkUsername = await UserModel.findOne({
      where: { username },
    });

    if (checkUsername) {
      return res
        .status(500)
        .json({ msg: "Este nombre de usuario ya esta registrado!" });
    }

    //check email, pretty self-explanatory
    const checkEmail = await UserModel.findOne({
      where: { email },
    });

    if (checkEmail) {
      return res
        .status(500)
        .json({ msg: "El Email ya está registrado!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //registra al usuario en la base de datos
    const user = await UserModel.create({
      username: username,
      roleId: roleId,
      name: name,
      lastname: lastname,
      password: hashedPassword,
      email: email,
      universityId: universityId,
      carrerId: carrerId,
      dni: dni,
      address: address,
      realaddress: realaddress,
      cellphone: cellphone,
    });


    if (user) {

      /* Comentado por que no enviarmail
      var mailOptions = {
        from: process.env.EMAIL_APP,
        to: "gr.l33t@gmail.com", //remember to change this mail to the variable email
        subject: "Practi",
        template: "mailRegister",
        attachments: [
          {
            filename: "appLogo.jpg",
            path: "./public/logos/logo.jpg",
            cid: "logo", //my mistake was putting "cid:logo@cid" here!
          },
        ],
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ msg: error });
        } else {
          console.log("Email enviado!");
          res.end();
        }
      });
      */
      return res.status(200).json({ response: "Usuario registrado exitosamente." });
    } else {
      return res.status(500).json({ msg: "Error al registrar el usuario" });
    }
  } catch (error) {
    return res.status(500).send({
      msg: "Error al registrar el usuario. " + error,
    });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      username,
      name,
      lastname,
      email,
      roleId,
      universityId,
      dni,
      address,
      realaddress,
      cellphone,
    } = req.body;

    const registeredUser = await UserModel.findAll({
      where: { dni },
    });

    if (
      registeredUser.length > 1 ||
      (registeredUser.length === 1 && Number(id) !== registeredUser[0].id)
    ) {
      return res
        .status(500)
        .json({ msg: "El DNI ya está registrado!" });
    }


    const user = await UserModel.update(
      {
        username: username,
        name: name,
        lastname: lastname,
        email: email,
        roleId: roleId,
        universityId: universityId,
        dni: dni,
        address: address,
        realaddress: realaddress,
        cellphone: cellphone
      },
      { where: { id: id } }
    );

    return res.status(200).json({ msg: "Usuario editado correctamente!" });

  } catch (error) {
    console.log("El usuario no existe!" + error);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.destroy({
      where: { id: id },
    });

    if (user) {
      res.status(200).json({ msg: "Usuario eliminado correctamente!" });
    } else {
      res.status(500).json({ msg: "Error al eliminar el usuario." });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar el usuario." });
  }
};