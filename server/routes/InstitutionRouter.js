const express = require("express");
const router = express.Router();
const InstitutionController = require("../controllers/InstitutionController");
const auth = require("../middlewares/authMiddleware");

router.put("/edit/:id", auth.verifyToken, InstitutionController.updateById);
router.post("/create", InstitutionController.create);
router.get("/get/:id", auth.verifyToken, InstitutionController.getById);
router.get("/getall", InstitutionController.getAll);
router.get("/get/institutions/:page", InstitutionController.getAllPaginated);
router.delete("/delete/:id", auth.verifyToken, InstitutionController.deleteById);

module.exports = router;