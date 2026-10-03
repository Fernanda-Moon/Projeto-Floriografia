const Flor = require("../models/Flor");
const Significado = require("../models/Significado");
const Ocasiao = require("../models/Ocasiao");

function exigirAdmin(context){
  if(!context.usuario) throw new Error("Não autenticado.");
  if(context.usuario.perfil !== "admin")
    throw new Error("Acesso negado. Apenas administradores.");
}

const resolvers = {
  Query: {
    // ⭐ await / async OBRIGATÓRIO para evitar o bug "Query was already executed"
    flores:        async ()          => await Flor.find(),
    flor:          async (_, { id }) => await Flor.findById(id),
    floresPorCor:  async (_, { cor }) =>
      await Flor.find({ cor: { $regex: cor, $options: "i" } }),

    significados:  async ()          => await Significado.find(),
    ocasioes:      async ()          => await Ocasiao.find()
  },

  Mutation: {
    /* ---------- FLORES ---------- */
    cadastrarFlor: async (_, args, ctx) => {
      exigirAdmin(ctx);
      return await Flor.create(args);
    },
    atualizarFlor: async (_, { id, ...dados }, ctx) => {
      exigirAdmin(ctx);
      return await Flor.findByIdAndUpdate(id, dados, {
        new: true,
        runValidators: true
      });
    },
    excluirFlor: async (_, { id }, ctx) => {
      exigirAdmin(ctx);
      const r = await Flor.findByIdAndDelete(id);
      return !!r;
    },

    /* ---------- SIGNIFICADOS ---------- */
    cadastrarSignificado: async (_, args, ctx) => {
      exigirAdmin(ctx);
      return await Significado.create(args);
    },
    atualizarSignificado: async (_, { id, ...dados }, ctx) => {
      exigirAdmin(ctx);
      return await Significado.findByIdAndUpdate(id, dados, { new: true });
    },
    excluirSignificado: async (_, { id }, ctx) => {
      exigirAdmin(ctx);
      const r = await Significado.findByIdAndDelete(id);
      return !!r;
    },

    /* ---------- OCASIÕES ---------- */
    cadastrarOcasiao: async (_, args, ctx) => {
      exigirAdmin(ctx);
      return await Ocasiao.create(args);
    },
    atualizarOcasiao: async (_, { id, ...dados }, ctx) => {
      exigirAdmin(ctx);
      return await Ocasiao.findByIdAndUpdate(id, dados, { new: true });
    },
    excluirOcasiao: async (_, { id }, ctx) => {
      exigirAdmin(ctx);
      const r = await Ocasiao.findByIdAndDelete(id);
      return !!r;
    }
  }
};

module.exports = resolvers;