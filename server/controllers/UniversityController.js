const UniversityModel = require("../models/UniversityModel");
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

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const university = await UniversityModel.findByPk(id);

    if (university) {
      res.status(200).json({ university });
    } else {
      res.status(500).json({ msg: "Error al obtener la universidad." });
    }
  } catch (error) {
    console.log("Error al obtener la universidad." + error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const universities = await UniversityModel.findAll();
    if (universities) {
      res.status(200).json({ universities });
    } else {
      res.status(500).json({ msg: "Error al obtener las universidades." });
    }
  } catch (error) {
    console.log("Error al obtener las universidades." + error);
  }
};

exports.create = async (req, res) => {
  const {
    name,
    address,
  } = req.body;

  try {
    //inputs validate
    if (
      !(
        name &&
        address
      )
    ) {
      return res.status(400).json({ msg: "Todos los campos son requeridos." });
    }
    //password validate

    //validate username
    const checkName = await UniversityModel.findOne({
      where: { name },
    });

    if (checkName) {
      return res
        .status(500)
        .json({ msg: "Este nombre ya esta registrado" });
    };

    //registra al usuario en la base de datos
    const university = await UniversityModel.create({
      name: name,
      address: address,
    });

    if (university) {
      return res.status(200).json({ response: "Universidad registrada exitosamente." });
    } else {
      return res.status(500).json({ msg: "Error al registrar el universidad" });
    }
  } catch (error) {
    return res.status(500).send({
      msg: "Error al registrar la universidad. " + error,
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const university = await UniversityModel.destroy({
      where: { id: id },
    });

    if (university) {
      res.status(200).json({ msg: "Universidad eliminada correctamente!" });
    } else {
      res.status(500).json({ msg: "Error al eliminar la universidad." });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar la universidad." });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      address,
    } = req.body;

    const nameUniversity = await UniversityModel.findAll({
      where: { name },
    });

    if (
      nameUniversity.length > 1 ||
      (nameUniversity.length === 1 && Number(id) !== nameUniversity[0].id)
    ) {
      return res
        .status(500)
        .json({ msg: "El nombre de la universidad ya esta registrado!" });
    }


    const university = await UniversityModel.update(
      {
        name: name,
        address: address,
      },
      { where: { id: id } }
    );
  
  return res.status(200).json({ msg: "Universidad editada correctamente!" });

  } catch (error) {
    console.log("La universidad no existe!" + error);
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

    const { count, rows } = await UniversityModel.findAndCountAll(options);
    const cantPages = calcTotalPages(count);

    if (rows) {
      res.status(200).json({ pages: cantPages, response: rows });
    } else {
      res.status(500).json({ msg: "Los universidades no existen." });
    }
  } catch (error) {
    console.log("Las universidades no existen." + error);
  }
};
