const Ocasiao = require("../models/Ocasiao");

const listarOcasioes = async (req, res) => {
  try { res.status(200).json(await Ocasiao.find()); }
  catch (e) { res.status(500).json({ mensagem: "Erro ao listar ocasiões.", erro: e.message }); }
};

const criarOcasiao = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    if (!nome) return res.status(400).json({ mensagem: "Nome da ocasião é obrigatório." });
    const ocasiao = await Ocasiao.create({ nome, descricao });
    res.status(201).json(ocasiao);
  } catch (e) {
    res.status(500).json({ mensagem: "Erro ao criar ocasião.", erro: e.message });
  }
};

const atualizarOcasiao = async (req, res) => {
  try {
    const ocasiao = await Ocasiao.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!ocasiao) return res.status(404).json({ mensagem: "Ocasião não encontrada." });
    res.status(200).json(ocasiao);
  } catch (e) {
    res.status(500).json({ mensagem: "Erro ao atualizar ocasião.", erro: e.message });
  }
};

const excluirOcasiao = async (req, res) => {
  try {
    const ocasiao = await Ocasiao.findByIdAndDelete(req.params.id);
    if (!ocasiao) return res.status(404).json({ mensagem: "Ocasião não encontrada." });
    res.status(200).json({ mensagem: "Ocasião excluída com sucesso." });
  } catch (e) {
    res.status(500).json({ mensagem: "Erro ao excluir ocasião.", erro: e.message });
  }
};

module.exports = { listarOcasioes, criarOcasiao, atualizarOcasiao, excluirOcasiao };