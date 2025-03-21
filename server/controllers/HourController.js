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
const UserModel = require("../models/UserModel");
const AssistModel = require("../models/AssistModel");
const UniversityModel = require("../models/UniversityModel");
const CarrerModel = require("../models/CarrerModel");

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const hour = await HourModel.findByPk(id);

    if (hour) {
      res.status(200).json({ hour });
    } else {
      res.status(500).json({ msg: "Error al obtener hora." });
    }
  } catch (error) {
    console.log("Error al obtener hora." + error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const hours = await HourModel.findAll();
    if (hours) {
      res.status(200).json({ hours });
    } else {
      res.status(500).json({ msg: "Error al obtener las horas." });
    }
  } catch (error) {
    console.log("Error al obtener las horas." + error);
  }
};

exports.create = async (req, res) => {
  const {
    dateFrom,
    dateTo,
    institutionId,
    universityId,
    carrerId,
  } = req.body;

  try {
    console.log("1", dateFrom, "2", dateTo, "3", institutionId, "4", universityId, "5", carrerId)
    //inputs validate
    if (
      !(
        dateFrom &&
        dateTo &&
        institutionId &&
        universityId &&
        carrerId
      )
    ) {
      return res.status(400).json({ msg: "Todos los campos son requeridos." });
    }
    //password validate

    //validate hour create
    const checkHour = await HourModel.findOne({
      where: { dateFrom, dateTo, institutionId, universityId, carrerId },
    });

    if (checkHour) {
      return res
        .status(500)
        .json({ msg: "No se puede crear una hora ya creada" });
    };

    //registra la hora en la base de datos
    const hour = await HourModel.create({
      dateFrom: dateFrom,
      dateTo: dateTo,
      institutionId: institutionId,
      universityId: universityId,
      carrerId: carrerId,
    });

    if (hour) {
      return res.status(200).json({ response: "Hora registrada exitosamente." });
    } else {
      return res.status(500).json({ msg: "Error al registrar la hora" });
    }
  } catch (error) {
    return res.status(500).send({
      msg: "Error al registrar la hora. " + error,
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const hour = await HourModel.destroy({
      where: { id: id },
    });

    if (hour) {
      res.status(200).json({ msg: "Hora eliminada correctamente!" });
    } else {
      res.status(500).json({ msg: "Error al eliminar la hora." });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar la hora." });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      dateFrom,
      dateTo,
      institutionId,
      universityId,
      carrerId
    } = req.body;

    const checkHour = await HourModel.findOne({
      where: { dateFrom, dateTo, institutionId, universityId, carrerId },
    });

    if (checkHour && (Number(id) !== checkHour.id)) {
      return res.status(500).json({ msg: "Esta hora ya está creada" });
    }

    const hour = await HourModel.update(
      {
        dateFrom: dateFrom,
        dateTo: dateTo,
        institutionId: institutionId,
        universityId: universityId,
        carrerId: carrerId,
      },
      { where: { id: id } }
    );

    return res.status(200).json({ msg: "Hora editada correctamente!" });

  } catch (error) {
    console.log("La hora no existe!" + error);
  }
};


exports.getHours = async (req, res) => {
  try {
    const { userId, institutionId } = req.query;
    console.log(req.query);
    const { page } = req.params;
    const Op = Sequelize.Op;
    const offsetIns = calcNumOffset(page);

    // Obtener el universityId y roleId del usuario
    const user = await UserModel.findOne({
      where: { id: userId },
      attributes: ["universityId", "roleId"],
    });

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const userUniversityId = user.universityId;
    const userRoleId = user.roleId;

    // Si el usuario tiene rol 3, no aplicar filtros
    let options = {
      offset: offsetIns,
      limit: Number(PAGE_LIMIT),
      include: [
        {
          model: AssistModel,
          as: "assist",
          required: false,
          include: [
            {
              model: UserModel,
              as: "user",
              required: true,
            },
          ],
        },
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
      ],
    };

    if (userRoleId === 3) {
      // Obtener las horas que ya tienen asistencia (solo si el rol NO es 3)
      const hoursWithAssist = await AssistModel.findAll({
        attributes: ["hourId"],
        raw: true,
      });

      const excludedHourIds = hoursWithAssist.map((assist) => assist.hourId);

      options.where = {
        id: { [Op.notIn]: excludedHourIds },
        universityId: userUniversityId, // Excluir horas que ya tienen asistencia
      };

      if (institutionId) {
        options.where.institutionId = { [Op.like]: `%${institutionId}%` };
      }
    } else {
      // Si el rol es 3, permitir todas las horas sin filtros
      options.where = {};
    }

    const { count, rows } = await HourModel.findAndCountAll(options);
    const cantPages = calcTotalPages(count);

    if (rows) {
      res.status(200).json({ pages: cantPages, response: rows });
    } else {
      res.status(500).json({ msg: "Las horas no existen." });
    }
  } catch (error) {
    console.log("Las horas no existen." + error);
  }
};

