const Flor = require("../models/Flor");

class FlorService {
  async listarTodas() {
    return await Flor.find()
      .populate("significados")
      .populate("ocasioes");
  }

  async buscarPorId(id) {
    const flor = await Flor.findById(id)
      .populate("significados")
      .populate("ocasioes");
    if (!flor) throw new Error("Flor não encontrada.");
    return flor;
  }

  async buscarPorCor(cor) {
    return await Flor.find({ cor: { $regex: cor, $options: "i" } });
  }

  async criar(dados) {
    return await Flor.create(dados);
  }
}

module.exports = new FlorService();