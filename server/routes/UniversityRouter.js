const express = require("express");
const router = express.Router();
const UniversityController = require("../controllers/UniversityController");
const auth = require("../middlewares/authMiddleware");

//router.post("/create", auth.verifyToken, UniversityController.create);
router.put("/edit/:id", auth.verifyToken, UniversityController.updateById);
router.post("/create", UniversityController.create);
router.get("/get/:id", auth.verifyToken, UniversityController.getById);
router.get("/getall", UniversityController.getAll);
router.get("/get/universities/:page", UniversityController.getAllPaginated);
router.delete("/delete/:id", auth.verifyToken, UniversityController.deleteById);

module.exports = router;