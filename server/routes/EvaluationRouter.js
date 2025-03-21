const express = require("express");
const router = express.Router();
const EvaluationController = require("../controllers/EvaluationController");
const auth = require("../middlewares/authMiddleware");

router.get("/get/:id", auth.verifyToken, EvaluationController.getById);
router.get("/get/getEvaluations/:page", auth.verifyToken,EvaluationController.getAllPaginated);
router.get("/get/getNotebook/", auth.verifyToken,EvaluationController.getNotebook);
router.put("/edit/:id",auth.verifyToken, auth.verifyToken, EvaluationController.updateById);


module.exports = router;