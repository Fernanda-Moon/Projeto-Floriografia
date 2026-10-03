/* ==========================================================================
   FLORIOGRAFIA — Servidor Principal (Express 5 + Apollo + MongoDB)
   ========================================================================== */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");

// Apollo Server
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");

// Banco de dados
const conectarBanco = require("./database");
const seedFlores = require("./seeds/floresSeed");

// Rotas REST
const authRoutes        = require("./routes/authRoutes");
const florRoutes        = require("./routes/florRoutes");
const significadoRoutes = require("./routes/significadoRoutes");
const ocasiaoRoutes     = require("./routes/ocasiaoRoutes");
const favoritoRoutes    = require("./routes/favoritoRoutes");
const buqueRoutes       = require("./routes/buqueRoutes");
const lembreteRoutes    = require("./routes/lembreteRoutes");
const usuarioRoutes     = require("./routes/usuarioRoutes");

// GraphQL
const { typeDefs, resolvers } = require("./graphql/schema");

/* --------------------------------------------------------------------------
   1. EXPRESS
   -------------------------------------------------------------------------- */
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* --------------------------------------------------------------------------
   2. FRONTEND ESTÁTICO (PWA)
   -------------------------------------------------------------------------- */
app.use(express.static(path.join(__dirname, "..", "..", "frontend")));

/* --------------------------------------------------------------------------
   3. CONEXÃO COM MONGODB + SEED
   -------------------------------------------------------------------------- */
conectarBanco()
  .then(() => {
    console.log("✔ MongoDB conectado.");
    return seedFlores();
  })
  .catch((err) => {
    console.error("✖ Erro na inicialização do banco:", err.message);
  });

/* --------------------------------------------------------------------------
   4. HEALTH CHECK
   -------------------------------------------------------------------------- */
app.get("/api", (req, res) => {
  res.json({
    mensagem: "API Floriografia funcionando!",
    versao: "1.0.0",
    endpoints: {
      rest: ["/auth", "/flores", "/favoritos", "/buques", "/lembretes", "/usuarios"],
      graphql: "/graphql"
    }
  });
});

/* --------------------------------------------------------------------------
   5. ROTAS REST
   -------------------------------------------------------------------------- */
app.use("/auth", authRoutes);
app.use(florRoutes);
app.use(significadoRoutes);
app.use(ocasiaoRoutes);
app.use(favoritoRoutes);
app.use(buqueRoutes);
app.use(lembreteRoutes);
app.use(usuarioRoutes);

/* --------------------------------------------------------------------------
   6. APOLLO + FALLBACK SPA
   -------------------------------------------------------------------------- */
const iniciarServidor = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== "production"
  });

  await apolloServer.start();

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        let usuario = null;
        const authorization = req.headers.authorization;

        if (authorization) {
          try {
            const partes = authorization.split(" ");
            if (partes.length === 2 && partes[0] === "Bearer") {
              usuario = jwt.verify(partes[1], process.env.JWT_SECRET);
            }
          } catch (error) {
            usuario = null;
          }
        }
        return { usuario };
      }
    })
  );

  /* --------------------------------------------------------------------------
     7. FALLBACK SPA — Express 5 não aceita "*" — usamos app.use() sem path
     -------------------------------------------------------------------------- */
  app.use((req, res, next) => {
    // Não intercepta APIs
    if (req.path.startsWith("/api") || req.path.startsWith("/graphql")) {
      return next();
    }
    // Não intercepta o service worker e manifest (são servidos como arquivos estáticos)
    if (req.path === "/sw.js" || req.path === "/manifest.json") {
      return next();
    }
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "index.html"));
  });

  /* --------------------------------------------------------------------------
     8. MIDDLEWARE DE ERROS
     -------------------------------------------------------------------------- */
  app.use((err, req, res, next) => {
    console.error("✖ Erro não tratado:", err);
    res.status(err.status || 500).json({
      mensagem: err.message || "Erro interno do servidor.",
      ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
    });
  });

  /* --------------------------------------------------------------------------
     9. START
     -------------------------------------------------------------------------- */
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log("══════════════════════════════════════════════");
    console.log(`🌸 Floriografia rodando!`);
    console.log(`   Frontend:  http://localhost:${PORT}`);
    console.log(`   REST API:  http://localhost:${PORT}/api`);
    console.log(`   GraphQL:   http://localhost:${PORT}/graphql`);
    console.log("══════════════════════════════════════════════");
  });
};

iniciarServidor().catch((err) => {
  console.error("✖ Falha ao iniciar o servidor:", err);
  process.exit(1);
});