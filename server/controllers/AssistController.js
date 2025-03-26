const AssistModel = require("../models/AssistModel");
const HourModel = require("../models/HourModel");
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
const InstitutionModel = require("../models/InstitutionModel");
const UserModel = require("../models/UserModel");
const CarrerModel = require("../models/CarrerModel");
const CycleModel = require("../models/CycleModel");
const EvaluationModel = require("../models/EvaluationModel");

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const assist = await AssistModel.findByPk(id);

    if (assist) {
      res.status(200).json({ assist });
    } else {
      res.status(500).json({ msg: "Error al obtener la asistencia." });
    }
  } catch (error) {
    console.log("Error al obtener la asistencia." + error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const assists = await AssistModel.findAll();
    if (assists) {
      res.status(200).json({ assists });
    } else {
      res.status(500).json({ msg: "Error al obtener las asistencias." });
    }
  } catch (error) {
    console.log("Error al obtener las asistencias." + error);
  }
};

exports.create = async (req, res) => {
  try {
    const Op = Sequelize.Op;
    const currentTime = new Date();
    const minTime = new Date(currentTime.getTime() - 10 * 60000); // 10 minutos antes
    const maxTime = new Date(currentTime.getTime() + 10 * 60000); // 10 minutos después

    const userId = req.body.userId || req.query.userId;
    const hourId = req.body.hourId || req.query.hourId;

    if (!userId || !hourId) {
      return res.status(400).json({ msg: "Todos los campos son requeridos." });
    }

    // Verificar que la hora existe y está dentro del rango permitido
    const existingHour = await HourModel.findOne({
      where: {
        id: hourId,
        dateFrom: {
          [Op.between]: [minTime, maxTime], // Validación de tiempo
        },
      },
    });

    if (!existingHour) {
      return res.status(404).json({ msg: "Horario inválido, debe registrar su asistencia 10 minutos antes/despues." });
    }

    // Verificar si la asistencia ya está registrada
    const checkAssist = await AssistModel.findOne({
      where: { userId, hourId },
    });

    if (checkAssist) {
      return res.status(409).json({ msg: "Esta asistencia ya está registrada!" });
    }

    // Registrar la asistencia
    const assist = await AssistModel.create({
      userId,
      hourId,
    });

    return res.status(200).json({
      msg: "Asistencia registrada correctamente.",
      assist,
    });
  } catch (error) {
    console.error("Error en la creación de asistencia:", error);
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const assist = await AssistModel.destroy({
      where: { id: id },
    });

    if (assist) {
      res.status(200).json({ msg: "Asistencia eliminada correctamente!" });
    } else {
      res.status(500).json({ msg: "Error al eliminar la asistencia." });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar la asistencia." });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      userId,
      hourId,
      observations,
    } = req.body;

    const checkAssist = await AssistModel.findOne({
      where: { userId, hourId },
    });

    if (checkAssist) {
      return res
        .status(500)
        .json({ msg: "Esta asistencia ya esta registrada!" });
    }

    const assist = await AssistModel.update(
      {
        userId: userId,
        hourId: hourId,
        observations: observations,
      },
      { where: { id: id } }
    );

    return res.status(200).json({ msg: "Asistencia editada correctamente!" });

  } catch (error) {
    console.log("La assistencia no existe!" + error);
  }
};


exports.getAllPaginated = async (req, res) => {
  try {
    const { id, userId, roleId, universityId, carrerId } = req.query;
    console.log(req.query);
    //console.log(req.query);
    const { page } = req.params;
    const Op = Sequelize.Op;
    const offsetIns = calcNumOffset(page);
    let options = {
      where: {},
      include: [
        {
          model: UserModel, // Correctly associate AssistModel with UserModel
          as: "user",
          required: true,
        },
        {
          model: HourModel, // Correctly associate AssistModel with HourModel
          as: "hour",
          required: true,
          include: [
            {
              model: UniversityModel,
              as: "university",
              required: true,
            },
            {
              model: CarrerModel,
              as: "carrer",
              required: true,
            },
            {
              model: InstitutionModel,
              as: "institution",
              required: true,
            },
          ],
        },
      ],
      offset: offsetIns,
      limit: Number(PAGE_LIMIT),
    };

    if (roleId == 2 || roleId == 4) {
      if (universityId) options.include[1].where = { universityId: universityId };
      if (carrerId) options.include[1].where = { carrerId: carrerId };
    } else {
      if (userId) {
        options.where.userId = {
          [Op.eq]: userId,
        };
      }
    }

    const { count, rows } = await AssistModel.findAndCountAll(options);
    const cantPages = calcTotalPages(count);

    if (rows) {
      res.status(200).json({ pages: cantPages, response: rows });
    } else {
      res.status(500).json({ msg: "Los asistencias no existen." });
    }
  } catch (error) {
    console.log("Las asistencias no existen." + error);
  }
};

exports.sign = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleId } = req.query;
    const updateField = roleId == 2 ? { signProfessor: true } : { signSupervisor: true };

    // Update the assist (sign it)
    await AssistModel.update(updateField, { where: { id } });

    // Fetch the assist to get userId
    const assist = await AssistModel.findByPk(id);
    if (!assist) {
      return res.status(404).json({ msg: "Asistencia no encontrada." });
    }

    const userId = assist.userId;

    // Check if the user has exactly 3 signed assists without a cycle
    const signedAssists = await AssistModel.findAll({
      where: {
        userId,
        signProfessor: true,
        signSupervisor: true,
        cycleId: null, // Only count those that don't have a cycle yet
      },
    });

    if (signedAssists.length === 3) {
      // Get careerId and institutionId
      const user = await UserModel.findByPk(userId);
      const hour = await HourModel.findByPk(assist.hourId);

      if (!user || !hour) {
        return res.status(400).json({ msg: "Usuario o hora no encontrada." });
      }

      // Find the last cycle number
      const lastCycle = await CycleModel.findOne({
        where: { userId },
        order: [["numberCycle", "DESC"]],
      });

      const newCycleNumber = lastCycle ? lastCycle.numberCycle + 1 : 1;

      // Create the new cycle
      const newCycle = await CycleModel.create({
        userId,
        carrerId: user.carrerId,
        institutionId: hour.institutionId,
        observations: "Generado automáticamente",
        numberCycle: newCycleNumber,
      });

      // Insert evaluation records
      const criteriaList = [
        "Cumplimientos normales",
        "Conocimientos teóricos",
        "Habilidades y destrezas",
        "Comportamiento y actitud frente al paciente",
        "Capacidad de integración en equipo",
        "Relación con el contexto social y comunitario",
        "Puntajes totales",
        "Horas Totales",
      ];

      const evaluations = criteriaList.map(criteria => ({
        cycleId: newCycle.id,
        criteria,
        note: (criteria === "Horas Totales" ? 12 : null),
        observations: null
      }));

      await EvaluationModel.bulkCreate(evaluations);

      await AssistModel.update(
        { cycleId: newCycle.id },
        {
          where: {
            id: signedAssists.map(a => a.id),
          },
        }
      );
    }

    return res.status(200).json({ msg: "Asistencia firmada correctamente!" });
  } catch (error) {
    console.error("Error al firmar la asistencia:", error);
    return res.status(500).json({ msg: "Error al firmar la asistencia." });
  }
};

exports.createAssistByQR = async (req, res) => {
  try {
    const Op = Sequelize.Op;
    const currentTime = new Date();
    console.log(currentTime);
    const minTime = new Date(currentTime.getTime() - 10 * 60000); // 10 minutos antes
    const maxTime = new Date(currentTime.getTime() + 10 * 60000); // 10 minutes despues

    const userId = req.body.userId || req.query.userId;
    const institutionId = req.params.institutionId;

    if (!userId || !institutionId) {
      return res.status(400).json({ msg: "Todos los campos son requeridos." });
    }

    const user = await UserModel.findOne({
      where: { id: userId },
      attributes: ["universityId", "carrerId"],
    });

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado." });
    }
    const existingHour = await HourModel.findOne({
      where: {
        institutionId,
        universityId: user.universityId,
        carrerId: user.carrerId,
        dateFrom: {
          [Op.between]: [minTime, maxTime], // Chequear rango de tiempo
        },
      },
    });

    if (!existingHour) {
      return res.status(404).json({ msg: "No hay un horario válido dentro del rango permitido." });
    }

    // Verificar si existe la hora
    const checkAssist = await AssistModel.findOne({
      where: { userId, hourId: existingHour.id },
    });

    if (checkAssist) {
      return res.status(409).json({ msg: "Esta asistencia ya está registrada!" });
    }

    const assist = await AssistModel.create({
      userId,
      hourId: existingHour.id,
    });

    return res.status(200).json({
      msg: "Asistencia registrada correctamente.",
      assist,
    });
  } catch (error) {
    console.error("Error en la creación de asistencia:", error);
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};