const express = require("express");
const router = express.Router();
const CarrerController = require("../controllers/CarrerController");
const auth = require("../middlewares/authMiddleware");

//router.post("/create", auth.verifyToken, CarrerController.create);
router.put("/edit/:id", auth.verifyToken, CarrerController.updateById);
router.post("/create", CarrerController.create);
router.get("/get/:id", auth.verifyToken, CarrerController.getById);
router.get("/getall", CarrerController.getAll);
router.get("/get/carrers/:page", CarrerController.getAllPaginated);
router.delete("/delete/:id", auth.verifyToken, CarrerController.deleteById);

module.exports = router;