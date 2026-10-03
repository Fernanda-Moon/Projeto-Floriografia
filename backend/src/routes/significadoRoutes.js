const express = require("express");
const {
  listarSignificados,
  criarSignificado,
  atualizarSignificado,
  excluirSignificado
} = require("../controllers/significadoController");
const { autenticar, autorizar } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/significados", listarSignificados);

router.post("/significados",   autenticar, autorizar("admin"), criarSignificado);
router.put("/significados/:id", autenticar, autorizar("admin"), atualizarSignificado);
router.delete("/significados/:id", autenticar, autorizar("admin"), excluirSignificado);

module.exports = router;