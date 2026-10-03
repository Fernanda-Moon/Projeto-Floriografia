const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

class AuthService {
  async registrar({ nome, email, senha }) {
    if (senha.length < 6) throw new Error("A senha deve ter pelo menos 6 caracteres.");

    const usuarioExistente = await Usuario.findOne({ email: email.toLowerCase() });
    if (usuarioExistente) throw new Error("Este email já está cadastrado.");

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.create({
      nome,
      email: email.toLowerCase(),
      senha: senhaCriptografada
    });

    // ⭐ Retorna perfil também
    return {
      id:     usuario._id,
      nome:   usuario.nome,
      email:  usuario.email,
      perfil: usuario.perfil
    };
  }

  async login({ email, senha }) {
    const usuario = await Usuario.findOne({ email: email.toLowerCase() });
    if (!usuario) throw new Error("Email ou senha inválidos.");

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) throw new Error("Email ou senha inválidos.");

    // ⭐ Inclui perfil no token E na resposta
    const token = jwt.sign(
      {
        id:     usuario._id,
        email:  usuario.email,
        perfil: usuario.perfil
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }   // ⭐ 7 dias para não cair toda hora
    );

    return {
      token,
      usuario: {
        id:     usuario._id,
        nome:   usuario.nome,
        email:  usuario.email,
        perfil: usuario.perfil       // ⭐ ESSENCIAL
      }
    };
  }
}

module.exports = new AuthService();