const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const auth = require("../middlewares/authMiddleware");

router.post("/login", UserController.login);
router.post("/create", UserController.create);
router.get("/get/:id", auth.verifyToken, UserController.getById);
router.get("/getall", UserController.getAll);
router.get("/get/users/:page", UserController.getAllPaginated);
router.put("/edit/:id", auth.verifyToken, UserController.updateById);
router.delete("/delete/:id", auth.verifyToken, UserController.deleteById);
router.post("/recoverpassword", UserController.mailRecoverPassword);
router.put("/resetpassword", UserController.resetPassword);

module.exports = router;
