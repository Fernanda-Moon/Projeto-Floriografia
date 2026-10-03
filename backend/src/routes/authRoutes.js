const express = require("express");
const {
  cadastrarUsuario,
  login,
  me,
} = require("../controllers/authController");
const { autenticar } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", cadastrarUsuario);
router.post("/login", login);
router.get("/me", autenticar, me);

module.exports = router;