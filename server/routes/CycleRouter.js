const express = require("express");
const router = express.Router();
const CycleController = require("../controllers/CycleController");
const auth = require("../middlewares/authMiddleware");

router.get("/get/getCycles/:page", CycleController.getAllPaginated);
router.get("/get/getNotebook/", auth.verifyToken,CycleController.getNotebook);

module.exports = router;