const mongoose = require("mongoose");

const florSchema = new mongoose.Schema(
  {
    nome:      { type: String, required: true, trim: true },
    especie:   { type: String, required: true, trim: true },
    cor:       { type: String, required: true, trim: true },

    // Campos ricos usados pelo frontend
    emoji:     { type: String, default: "🌸" },
    file:      { type: String, default: "" },
    feelings:  { type: [String], default: [] },
    meanings:  { type: [String], default: [] },
    colors:    { type: [String], default: [] },
    category:  { type: String, default: "" },
    origin:    { type: String, default: "" },
    season:    { type: String, default: "" },
    occasions: { type: [String], default: [] },

    descricao: { type: String, default: "" },
    preco:     { type: Number, required: true, min: 0, default: 0 },
    estoque:   { type: Number, required: true, min: 0, default: 0 },

    significados: [{ type: mongoose.Schema.Types.ObjectId, ref: "Significado" }],
    ocasioes:     [{ type: mongoose.Schema.Types.ObjectId, ref: "Ocasiao" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flor", florSchema);