const EvaluationModel = require("../models/EvaluationModel");
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
const CycleModel = require("../models/CycleModel");

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluation = await EvaluationModel.findByPk(id);
    if (evaluation) {
      return res.status(200).json({ evaluation })
    } else {
      res.status(400).json({ msg: "No existe la evaluación." });
    }
  } catch (error) {
    console.log("No existe el evaluación.");
  }
};

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
          model: CycleModel,
          as: "cycle",
          required: true,
          include: [
            {
            model: UserModel,
            as: "user",
            required: true,
            },
          ]
        },
      ],
      //include: [{ model: RoleModel }],
      offset: offsetIns,
      limit: Number(PAGE_LIMIT),
    };

    if (userId) {
      options.where.userId = {
        [Op.eq]: userId,
      };
    }

    if (id) {
      options.where.cycleId = id;
    }
    const { count, rows } = await EvaluationModel.findAndCountAll(options);
    const cantPages = calcTotalPages(count);

    if (rows) {
      res.status(200).json({ pages: cantPages, response: rows });
    } else {
      res.status(500).json({ msg: "Los notas no existen." });
    }
  } catch (error) {
    console.log("Las notas no existen." + error);
  }
};
exports.getNotebook = async (req, res) => {
  try {
    const { userId } = req.query;
    const Op = Sequelize.Op;
    
    let options = {
      where: {},
      include: [
        {
          model: CycleModel,
          as: "cycle",
          required: true,
          include: [
            {
              model: UserModel,
              as: "user",
              required: true,
            },
          ],
        },
      ],
    };

    if (userId) {
      options.include[1].where.userId = { [Op.eq]: userId };
    }

    const evaluations = await EvaluationModel.findAll(options);

    if (evaluations.length > 0) {
      res.status(200).json({ response: evaluations });
    } else {
      res.status(404).json({ msg: "No hay evaluaciones disponibles." });
    }
  } catch (error) {
    console.error("Error obteniendo evaluaciones:", error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      criteria,
      note,
    } = req.body;

    const criteriaCheck = await EvaluationModel.findAll({
      where: { id, criteria },
    });

    if (
      criteriaCheck.length > 1 ||
      (criteriaCheck.length === 1 && Number(id) !== criteriaCheck[0].id)
    ) {
      return res
        .status(500)
        .json({ msg: "La descripción ya está generada!" });
    }


    const evaluation = await EvaluationModel.update(
      {
        criteria: criteria,
        note: note,
      },
      { where: { id: id } }
    );

    return res.status(200).json({ msg: "Evaluación editada correctamente!" });

  } catch (error) {
    console.log("La evaluación no existe!" + error);
  }
};