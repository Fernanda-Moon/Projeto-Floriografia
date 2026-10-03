const express = require("express");
const {
  listarOcasioes,
  criarOcasiao,
  atualizarOcasiao,
  excluirOcasiao
} = require("../controllers/ocasiaoController");
const { autenticar, autorizar } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/ocasioes", listarOcasioes);

router.post("/ocasioes",     autenticar, autorizar("admin"), criarOcasiao);
router.put("/ocasioes/:id",  autenticar, autorizar("admin"), atualizarOcasiao);
router.delete("/ocasioes/:id", autenticar, autorizar("admin"), excluirOcasiao);

module.exports = router;