const mongoose = require("mongoose");

const conectarBanco = async () => {
  console.log("⏳ Conectando ao MongoDB em:", process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error.message);
    throw error;
  }
};

module.exports = conectarBanco;