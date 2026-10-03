const typeDefs = `#graphql
  type Significado { id: ID!, nome: String!, descricao: String! }
  type Ocasiao    { id: ID!, nome: String!, descricao: String }

  type Flor {
    id: ID!
    nome: String!
    especie: String!
    cor: String!
    emoji: String
    file: String
    feelings: [String]
    meanings: [String]
    colors: [String]
    category: String
    origin: String
    season: String
    occasions: [String]
    descricao: String
    preco: Float!
    estoque: Int!
    significados: [Significado]
    ocasioes: [Ocasiao]
  }

  type Query {
    flores: [Flor]
    flor(id: ID!): Flor
    floresPorCor(cor: String!): [Flor]
    significados: [Significado]
    ocasioes: [Ocasiao]
  }

  type Mutation {
    cadastrarFlor(
      nome: String!, especie: String!, cor: String!,
      emoji: String, file: String,
      feelings: [String], meanings: [String], colors: [String],
      category: String, origin: String, season: String,
      occasions: [String], descricao: String,
      preco: Float!, estoque: Int!
    ): Flor

    atualizarFlor(
      id: ID!, nome: String, especie: String, cor: String,
      emoji: String, descricao: String,
      preco: Float, estoque: Int
    ): Flor

    excluirFlor(id: ID!): Boolean

    cadastrarSignificado(nome: String!, descricao: String!): Significado
    atualizarSignificado(id: ID!, nome: String, descricao: String): Significado
    excluirSignificado(id: ID!): Boolean

    cadastrarOcasiao(nome: String!, descricao: String): Ocasiao
    atualizarOcasiao(id: ID!, nome: String, descricao: String): Ocasiao
    excluirOcasiao(id: ID!): Boolean
  }
`;

module.exports = typeDefs;