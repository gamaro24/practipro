const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/RoleController");
const auth = require("../middlewares/authMiddleware");

router.post("/create", auth.verifyToken, RoleController.create);
router.put("/edit/:id", auth.verifyToken, RoleController.updateById);
router.get("/get/:id", auth.verifyToken, RoleController.getById);
router.get("/getall", RoleController.getAll);
router.delete("/delete/:id", auth.verifyToken, RoleController.deleteById);

module.exports = router;
