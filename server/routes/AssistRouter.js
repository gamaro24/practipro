const express = require("express");
const router = express.Router();
const AssistController = require("../controllers/AssistController");
const auth = require("../middlewares/authMiddleware");

router.put("/edit/:id", auth.verifyToken, AssistController.updateById);
router.post("/create/:id", AssistController.create);
router.post("/createAssistByQR/:institutionId", AssistController.createAssistByQR);
router.get("/get/:id", auth.verifyToken, AssistController.getById);
router.get("/getall", AssistController.getAll);
router.get("/get/getAssist/:page", AssistController.getAllPaginated);
router.delete("/delete/:id", auth.verifyToken, AssistController.deleteById);
router.put("/sign/:id", auth.verifyToken, AssistController.sign);

module.exports = router;