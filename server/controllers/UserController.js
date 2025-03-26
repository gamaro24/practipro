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
    // Validar campos requeridos
    if (!(username && roleId && name && lastname && email && dni && password)) {
      return res.status(400).json({ msg: "Todos los campos son requeridos." });
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Las contraseñas ingresadas no son iguales." });
    }

    // Validar si el nombre de usuario ya existe
    const checkUsername = await UserModel.findOne({ where: { username } });
    if (checkUsername) {
      return res.status(400).json({ msg: "Este nombre de usuario ya está registrado!" });
    }

    // Validar si el email ya está registrado
    const checkEmail = await UserModel.findOne({ where: { email } });
    if (checkEmail) {
      return res.status(400).json({ msg: "El Email ya está registrado!" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Registrar usuario
    const user = await UserModel.create({
      username,
      roleId,
      name,
      lastname,
      password: hashedPassword,
      email,
      universityId,
      carrerId,
      dni,
      address,
      realaddress,
      cellphone,
    });

    if (!user) {
      return res.status(500).json({ msg: "Error al registrar el usuario" });
    }

    // Configuración del correo
    const mailOptions = {
      from: process.env.EMAIL_APP,
      to: email,
      subject: "PractiPro - Cuenta Registrada",
      template: "mailRegister",
      attachments: [
        {
          filename: "logo.PNG",
          path: "./public/logos/logo.PNG",
          cid: "logo",
        },
      ],
    };

    // Enviar correo con `await`
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email enviado!");
    } catch (error) {
      console.error("Error al enviar email:", error);
      return res.status(500).json({ msg: "Usuario registrado, pero no se pudo enviar el email." });
    }

    // Enviar respuesta final solo una vez
    return res.status(200).json({ response: "Usuario registrado exitosamente." });

  } catch (error) {
    return res.status(500).json({ msg: "Error al registrar el usuario. " + error });
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
exports.mailRecoverPassword = async (req, res) => {
  try {
    const {
      email
    } = req.body;
    console.log(email);
    const user = await UserModel.findOne({
      where: { email: email },
    });


    const mailUser = user.email;
    const resetToken = jwt.sign({ mailUser }, process.env.RESET_PASSWORD_KEY, { expiresIn: '20m' });

    var mailOptions = {
      from: process.env.EMAIL_APP,
      to: email,
      subject: "PractiPro - Recuperar Contraseña",
      template: "recoverPassword",
      context: {
        resetToken: resetToken,
        clientUrl: process.env.VITE_CLIENT_URL,
      },
      attachments: [
        {
          filename: "logo.PNG",
          path: "./public/logos/logo.PNG",
          cid: "logo",
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ msg: error });
      } else {
        //console.log("Email enviado!");
        res.end();
      }
    });

    if (user) {
      res.status(200).json({ msg: "Email para modificar contraseña enviado correctamente!" });
    } else {
      res.status(500).json({ msg: "Error al enviar el email." });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al enviar el email." });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;

    let decoded;
    try {
      decoded = jwt.verify(resetToken, process.env.RESET_PASSWORD_KEY); // Use the same secret key for verification
    } catch (err) {
      return res.status(400).json({ message: "Token no válido o expirado." });
    }

    const { mailUser } = decoded;

    const user = await UserModel.findOne({ where: { email: mailUser } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);


    await user.update({ password: hashedPassword });

    res.status(200).json({ msg: "Su contraseña ha sido cambiada exitosamente!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Hubo un error al cambiar la contraseña." });
  }
};