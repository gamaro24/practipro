const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const auth = require("../middlewares/authMiddleware");

//router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/create", UserController.create);
router.get("/get/:id", auth.verifyToken, UserController.getById);
router.get("/getall", UserController.getAll);
router.get("/get/users/:page", UserController.getAllPaginated);
//router.get("/getall", auth.verifyToken, UserController.getAll);
router.put("/edit/:id",auth.verifyToken, auth.verifyToken, UserController.updateById);
router.delete("/delete/:id", auth.verifyToken, UserController.deleteById);

module.exports = router;
