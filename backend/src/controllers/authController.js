const authService = require("../services/authService");
const Usuario = require("../models/Usuario");

const cadastrarUsuario = async (req, res) => {
  try {
    const usuario = await authService.registrar(req.body);
    return res.status(201).json({ mensagem: "Usuário cadastrado!", usuario });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const login = async (req, res) => {
  try {
    const dados = await authService.login(req.body);
    return res.status(200).json({ mensagem: "Login realizado!", ...dados });
  } catch (error) {
    return res.status(401).json({ mensagem: error.message });
  }
};

/* ⭐ Restaura a sessão — retorna perfil para o frontend */
const me = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-senha");
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    console.log("[me] Devolvendo usuário:", usuario.email, "perfil:", usuario.perfil);

    res.status(200).json({
      id:     usuario._id,
      nome:   usuario.nome,
      email:  usuario.email,
      perfil: usuario.perfil       // ⭐ ESSENCIAL
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar usuário.",
      erro: error.message
    });
  }
};

module.exports = { cadastrarUsuario, login, me };