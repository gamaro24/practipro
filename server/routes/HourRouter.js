const express = require("express");
const router = express.Router();
const HourController = require("../controllers/HourController");
const auth = require("../middlewares/authMiddleware");

router.put("/edit/:id", auth.verifyToken, HourController.updateById);
router.post("/create", HourController.create);
router.get("/get/:id", auth.verifyToken, HourController.getById);
router.get("/getall", HourController.getAll);
router.get("/get/getHours/:page", HourController.getHours);
router.get("/get/getHoursAdmin/:page", HourController.getHoursAdmin);
//router.get("/get/hours/:page", HourController.getAllPaginated);
router.delete("/delete/:id", auth.verifyToken, HourController.deleteById);

module.exports = router;