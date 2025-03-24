const CycleModel = require("../models/CycleModel");
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
const UserModel = require("../models/UserModel");
const CarrerModel = require("../models/CarrerModel");
const InstitutionModel = require("../models/InstitutionModel");
const EvaluationModel = require("../models/EvaluationModel");
const UniversityModel = require("../models/UniversityModel");

exports.getAllPaginated = async (req, res) => {
  try {
    const { id, userId, } = req.query;
    //console.log(req.query);
    const { page } = req.params;
    const Op = Sequelize.Op;
    const offsetIns = calcNumOffset(page);
    let options = {
      where: {},
      include: [
        {
          model: UserModel,
          as: "user",
          required: true,
        },
        {
          model: InstitutionModel,
          as: "institution",
          required: true,
        },
        {
          model: CarrerModel,
          as: "carrer",
          required: true,
        },
      ],
      offset: offsetIns,
      limit: Number(PAGE_LIMIT),
    };

    if (id) {
      options.where.userId = {
        [Op.eq]: id,
      };
    }

    const { count, rows } = await CycleModel.findAndCountAll(options);
    const cantPages = calcTotalPages(count);

    if (rows) {
      res.status(200).json({ pages: cantPages, response: rows });
    } else {
      res.status(500).json({ msg: "Las rotaciones no existen." });
    }
  } catch (error) {
    console.log("Las rotaciones no existen." + error);
  }
};
exports.getNotebook = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId);
    const Op = Sequelize.Op;

    let options = {
      include: [
        {
          model: UserModel,
          as: "user",
          required: true,
          include: [
            {
              model: UniversityModel,
              as: "university",  // Ensure alias matches the defined relationship in your models
              required: true,
            },
          ],
        },
        {
          model: EvaluationModel,
          as: "evaluations",
          required: true,
        },
      ],
    };

    if (userId) options.include[0].where = { id: userId };

    const notebook = await CycleModel.findAll(options);

    if (notebook.length > 0) {
      res.status(200).json({ response: notebook });
    } else {
      res.status(404).json({ msg: "No hay ciclos disponibles." });
    }
  } catch (error) {
    console.error("Error obteniendo ciclos:", error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};
