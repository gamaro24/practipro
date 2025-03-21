const CarrerModel = require("../models/CarrerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transporter } = require("../utils/utils");
const path = require("path");
const Sequelize = require("sequelize");
//const excelJS = require("exceljs");
const { PAGE_LIMIT } = process.env;
//const EXCEL_CELL_WIDTH = 12;
//const RoleController = require("../controllers/RoleController");
const { calcNumOffset, calcTotalPages } = require("../helpers/helpers");
const UniversityModel = require("../models/UniversityModel");

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const carrer = await CarrerModel.findByPk(id);

    if (carrer) {
      res.status(200).json({ carrer });
    } else {
      res.status(500).json({ msg: "Error al obtener la carrera." });
    }
  } catch (error) {
    console.log("Error al obtener la carrera." + error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const carrers = await CarrerModel.findAll();
    if (carrers) {
      res.status(200).json({ carrers });
    } else {
      res.status(500).json({ msg: "Error al obtener las carreras." });
    }
  } catch (error) {
    console.log("Error al obtener las carreras." + error);
  }
};

exports.create = async (req, res) => {
  const {
    universityId,
    name,
    code,
    description,
  } = req.body;

  try {
    //inputs validate
    if (
      !(
        universityId &&
        name &&
        code &&
        description
      )
    ) {
      return res.status(400).json({ msg: "Todos los campos son requeridos." });
    }
    //password validate

    //validate username
    const checkName = await CarrerModel.findOne({
      where: { name },
    });

    if (checkName) {
      return res
        .status(500)
        .json({ msg: "Este nombre ya esta registrado" });
    };

    //registra al usuario en la base de datos
    const carrer = await CarrerModel.create({
      universityId : universityId,
      name: name,
      code: code,
      description: description
    });

    if (carrer) {
      return res.status(200).json({ response: "Carrera registrada exitosamente." });
    } else {
      return res.status(500).json({ msg: "Error al registrar el carrera" });
    }
  } catch (error) {
    return res.status(500).send({
      msg: "Error al registrar la carrera. " + error,
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const carrer = await CarrerModel.destroy({
      where: { id: id },
    });

    if (carrer) {
      res.status(200).json({ msg: "Carrera eliminada correctamente!" });
    } else {
      res.status(500).json({ msg: "Error al eliminar la carrera." });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar la carrera." });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      code,
      description,
    } = req.body;

    const nameCarrer = await CarrerModel.findAll({
      where: { name },
    });

    if (
      nameCarrer.length > 1 ||
      (nameCarrer.length === 1 && Number(id) !== nameCarrer[0].id)
    ) {
      return res
        .status(500)
        .json({ msg: "El nombre de la carrera ya esta registrado!" });
    }


    const carrer = await CarrerModel.update(
      {
        name: name,
        code: code,
        description: description,
      },
      { where: { id: id } }
    );
  
  return res.status(200).json({ msg: "Carrera editada correctamente!" });

  } catch (error) {
    console.log("La carrera no existe!" + error);
  }
};


exports.getAllPaginated = async (req, res) => {
  try {
    const { name, id, } = req.query;
    //console.log(req.query);
    const { page } = req.params;
    const Op = Sequelize.Op;
    const offsetIns = calcNumOffset(page);
    let options = {
      where: {},
      include: [
        {
          model: UniversityModel, // Correctly associate AssistModel with UserModel
          as: "university",
          required: true,
        },
      ],
      //include: [{ model: RoleModel }],
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

    const { count, rows } = await CarrerModel.findAndCountAll(options);
    const cantPages = calcTotalPages(count);

    if (rows) {
      res.status(200).json({ pages: cantPages, response: rows });
    } else {
      res.status(500).json({ msg: "Las carerras no existen." });
    }
  } catch (error) {
    console.log("Las carreras no existen." + error);
  }
};
