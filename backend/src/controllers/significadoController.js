const Significado = require("../models/Significado");

const listarSignificados = async (req, res) => {
  try { res.status(200).json(await Significado.find()); }
  catch (e) { res.status(500).json({ mensagem: "Erro ao listar significados.", erro: e.message }); }
};

const criarSignificado = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    if (!nome || !descricao)
      return res.status(400).json({ mensagem: "Nome e descrição são obrigatórios." });
    const significado = await Significado.create({ nome, descricao });
    res.status(201).json(significado);
  } catch (e) {
    res.status(500).json({ mensagem: "Erro ao criar significado.", erro: e.message });
  }
};

const atualizarSignificado = async (req, res) => {
  try {
    const significado = await Significado.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!significado)
      return res.status(404).json({ mensagem: "Significado não encontrado." });
    res.status(200).json(significado);
  } catch (e) {
    res.status(500).json({ mensagem: "Erro ao atualizar significado.", erro: e.message });
  }
};

const excluirSignificado = async (req, res) => {
  try {
    const significado = await Significado.findByIdAndDelete(req.params.id);
    if (!significado)
      return res.status(404).json({ mensagem: "Significado não encontrado." });
    res.status(200).json({ mensagem: "Significado excluído com sucesso." });
  } catch (e) {
    res.status(500).json({ mensagem: "Erro ao excluir significado.", erro: e.message });
  }
};

module.exports = {
  listarSignificados,
  criarSignificado,
  atualizarSignificado,
  excluirSignificado
};