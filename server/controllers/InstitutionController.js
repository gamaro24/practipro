const InstitutionModel = require("../models/InstitutionModel");
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transporter } = require("../utils/utils");
const Sequelize = require("sequelize");
//const excelJS = require("exceljs");
const { PAGE_LIMIT } = process.env;
//const EXCEL_CELL_WIDTH = 12;
//const RoleController = require("../controllers/RoleController");
const { calcNumOffset, calcTotalPages } = require("../helpers/helpers");

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const institution = await InstitutionModel.findByPk(id);

    if (institution) {
      res.status(200).json({ institution });
    } else {
      res.status(500).json({ msg: "Error al obtener institución." });
    }
  } catch (error) {
    console.log("Error al obtener institución." + error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const institutions = await InstitutionModel.findAll();
    if (institutions) {
      res.status(200).json({ institutions });
    } else {
      res.status(500).json({ msg: "Error al obtener las instituciones." });
    }
  } catch (error) {
    console.log("Error al obtener las instituciones." + error);
  }
};

exports.create = async (req, res) => {
  const { name, address, description } = req.body;

  try {
    // Validate inputs
    if (!name || !address || !description) {
      return res.status(400).json({ msg: "Todos los campos son requeridos." });
    }

    // Check if name is already registered
    const checkName = await InstitutionModel.findOne({ where: { name } });

    if (checkName) {
      return res.status(500).json({ msg: "Este nombre ya está registrado" });
    }

    // Create institution
    const institution = await InstitutionModel.create({
      name,
      address,
      description
    });

    if (!institution) {
      return res.status(500).json({ msg: "Error al registrar la institución" });
    }

    return res.status(200).json({
      response: "Institución registrada exitosamente."
    });

  } catch (error) {
    return res.status(500).send({
      msg: "Error al registrar la institución. " + error.message,
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const institution = await InstitutionModel.destroy({
      where: { id: id },
    });

    if (institution) {
      res.status(200).json({ msg: "Institución eliminada correctamente!" });
    } else {
      res.status(500).json({ msg: "Error al eliminar la institución." });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar la institución." });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      address,
      description,
    } = req.body;

    const nameInstitution = await InstitutionModel.findAll({
      where: { name },
    });

    if (
      nameInstitution.length > 1 ||
      (nameInstitution.length === 1 && Number(id) !== nameInstitution[0].id)
    ) {
      return res
        .status(500)
        .json({ msg: "El nombre de la institución ya esta registrado!" });
    }


    const institution = await InstitutionModel.update(
      {
        name: name,
        address: address,
        description: description,
      },
      { where: { id: id } }
    );
  
  return res.status(200).json({ msg: "Institución editada correctamente!" });

  } catch (error) {
    console.log("La institución no existe!" + error);
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

    const { count, rows } = await InstitutionModel.findAndCountAll(options);
    const cantPages = calcTotalPages(count);

    if (rows) {
      res.status(200).json({ pages: cantPages, response: rows });
    } else {
      res.status(500).json({ msg: "Las instituciones no existen." });
    }
  } catch (error) {
    console.log("Las instituciones no existen." + error);
  }
};

exports.seeQr