<div align="center">

# 🌸 Floriografia

### A Linguagem das Flores

**Aplicação web completa que conecta cada flor a uma emoção, transmitindo mensagens que falam mais alto que palavras.**

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![GraphQL](https://img.shields.io/badge/GraphQL-Apollo-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://www.apollographql.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Docker](https://img.shields.io/badge/Docker-Container-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![PWA](https://img.shields.io/badge/PWA-Offline--First-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br>

<img width="1254" height="1254" alt="Floriografia_logo" src="https://github.com/user-attachments/assets/b5c5bf30-13dd-493f-a7be-950bec461451" />


</div>

---

<br>

## 📖 Sobre o Projeto

**Floriografia** é uma aplicação web full stack que explora a linguagem simbólica das flores. Através de um catálogo interativo com **70 espécies catalogadas**, o usuário pode:

- Descobrir o significado por trás de cada flor
- Filtrar por cor, sentimento ou ocasião
- Criar buquês personalizados com mensagens
- Salvar favoritos e histórico
- Fazer um quiz para descobrir qual flor combina com sua personalidade

O projeto foi desenvolvido como entrega final da disciplina **Integrar Interfaces e Serviços WEB**, aplicando na prática os conceitos de:
- Arquitetura MVC
- APIs RESTful **e** GraphQL
- Autenticação e autorização com JWT
- Containerização com Docker
- Progressive Web App (PWA)
- Refatoração e separação de responsabilidades

---

<br>

## 📸 Screenshots

<div align="center">

### 🏠 Tela Inicial
<img width="1620" height="875" alt="image" src="https://github.com/user-attachments/assets/aa5a3c2a-170f-4e66-baf4-eb2969bdf66e" />


### 🌸 Catálogo de Flores
<img width="1572" height="910" alt="image" src="https://github.com/user-attachments/assets/95664de4-a6f6-4641-9450-ed02b43b6ffd" />


### 💐 Criador de Buquês
<img width="1542" height="865" alt="image" src="https://github.com/user-attachments/assets/710fdb80-470b-402a-aead-2c5698fe5c0c" />


### 👑 Painel de Administração
<img width="1546" height="840" alt="image" src="https://github.com/user-attachments/assets/b047ed95-8c8d-4317-b2fa-249a4e144109" />


</div>

---

<br>

## ✨ Funcionalidades

### 👤 Usuário
- ✅ Cadastro e login com autenticação JWT
- ✅ Catálogo com 70 flores e busca em tempo real
- ✅ Filtros por cor, sentimento e ocasião
- ✅ Detalhes de cada flor (significados, origem, época, curiosidades)
- ✅ Favoritar flores (persistido no banco)
- ✅ Criar e salvar buquês com mensagens personalizadas
- ✅ Quiz floral com resultado personalizado
- ✅ Interface estilo Undertale (RPG pixel art)

### 👑 Administrador
- ✅ Painel exclusivo para perfil `admin`
- ✅ CRUD completo de flores
- ✅ CRUD completo de significados
- ✅ CRUD completo de ocasiões
- ✅ Proteção em **duas camadas**: backend (middleware) + frontend (UI)

### 🌐 Técnico
- ✅ API RESTful (`/auth`, `/flores`, `/favoritos`, `/buques`, etc.)
- ✅ API GraphQL (`/graphql`) para o catálogo
- ✅ Autenticação JWT com expiração de 7 dias
- ✅ PWA instalável (service worker + manifest)
- ✅ Interface 100% responsiva (mobile-first)
- ✅ Containerização com Docker Compose

---

<br>

## 🛠️ Tecnologias Utilizadas

### Backend
| Tecnologia | Uso |
|---|---|
| **Node.js 18+** | Runtime JavaScript |
| **Express 5** | Framework HTTP |
| **Apollo Server 5** | Servidor GraphQL |
| **MongoDB Atlas** | Banco de dados NoSQL |
| **Mongoose 9** | ODM para MongoDB |
| **JWT (jsonwebtoken)** | Autenticação stateless |
| **bcryptjs** | Hash de senhas |
| **CORS + dotenv** | Configuração e segurança |
| **Nodemon** | Hot reload em desenvolvimento |

### Frontend
| Tecnologia | Uso |
|---|---|
| **HTML5 + CSS3** | Estrutura e estilo |
| **JavaScript ES6+ (Módulos)** | Lógica da aplicação |
| **Fetch API** | Consumo de REST e GraphQL |
| **Service Worker** | Cache offline (PWA) |
| **Bootstrap 5** | Grid responsivo |
| **Fontes Google** | Press Start 2P, VT323, Cinzel |

### DevOps
| Tecnologia | Uso |
|---|---|
| **Docker** | Containerização |
| **Docker Compose** | Orquestração de 3 containers |
| **Git/GitHub** | Controle de versão |

---

<br>

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVEGADOR (PWA)                          │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐   │
│  │  HTML/CSS  │  │  app.js    │  │  Service Worker      │   │
│  │            │──│  api.js    │  │  (cache offline)     │   │
│  └────────────┘  └─────┬──────┘  └──────────────────────┘   │
└─────────────────────────┼───────────────────────────────────┘
                          │ HTTP/HTTPS
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                BACKEND (Node.js + Express)                  │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  REST API    │  │  GraphQL     │  │  Middlewares     │   │
│  │  /auth       │  │  /graphql    │  │  autenticar      │   │
│  │  /flores     │  │              │  │  autorizar       │   │
│  │  /favoritos  │  │              │  │                  │   │
│  │  /buques     │  │              │  │                  │   │
│  └──────┬───────┘  └──────┬───────┘  └──────────────────┘   │
│         │                 │                                 │
│         └────────┬────────┘                                 │
│                  ▼                                          │
│         ┌──────────────────┐                                │
│         │   Controllers    │  ← Recebem requisições         │
│         └────────┬─────────┘                                │
│                  ▼                                          │
│         ┌──────────────────┐                                │
│         │     Services     │  ← Regras de negócio           │
│         └────────┬─────────┘                                │
│                  ▼                                          │
│         ┌──────────────────┐                                │
│         │      Models      │  ← Schemas Mongoose            │
│         └────────┬─────────┘                                │
└──────────────────┼──────────────────────────────────────────┘
                   ▼
        ┌─────────────────────┐
        │   MongoDB Atlas     │
        │   (7 coleções)      │
        └─────────────────────┘
```

**Padrão MVC aplicado:** Controller → Service → Model

---

<br>

## 📂 Estrutura do Projeto

```
floriografia/
│
├── 📄 docker-compose.yml          # Orquestração dos containers
├── 📄 README.md                    # Este arquivo
├── 📄 .gitignore                   # Arquivos ignorados
│
├── 📁 frontend/                    # Aplicação cliente (PWA)
│   ├── 📄 Dockerfile
│   ├── 📄 index.html               # Estrutura HTML completa
│   ├── 📄 manifest.json            # Configuração PWA
│   ├── 📄 sw.js                    # Service Worker (cache)
│   │
│   ├── 📁 css/
│   │   └── 📄 style.css            # Estilos Undertale/RPG
│   │
│   ├── 📁 js/
│   │   ├── 📄 api.js               # Cliente HTTP (REST + GraphQL)
│   │   └── 📄 app.js               # Lógica principal da SPA
│   │
│   └── 📁 assets/                  # Imagens, ícones, fundos
│       ├── Florigrafia_logo.png
│       ├── fundos/
│       ├── personagens/
│       └── flores/
│
└── 📁 backend/                     # Servidor Node.js
    ├── 📄 Dockerfile
    ├── 📄 package.json
    ├── 📄 .env                     # Variáveis (não commitar)
    ├── 📄 .env.example             # Template
    │
    └── 📁 src/
        ├── 📄 server.js            # Entry point
        ├── 📄 database.js          # Conexão MongoDB
        │
        ├── 📁 models/              # Schemas Mongoose
        │   ├── Usuario.js
        │   ├── Flor.js
        │   ├── Favorito.js
        │   ├── Buque.js
        │   ├── Significado.js
        │   ├── Ocasiao.js
        │   └── Lembrete.js
        │
        ├── 📁 controllers/         # HTTP handlers
        │   ├── authController.js
        │   ├── florController.js
        │   ├── favoritoController.js
        │   ├── buqueController.js
        │   ├── significadoController.js
        │   ├── ocasiaoController.js
        │   └── usuarioController.js
        │
        ├── 📁 services/            # Regras de negócio
        │   └── authService.js
        │
        ├── 📁 routes/              # Definição de rotas REST
        │   ├── authRoutes.js
        │   ├── florRoutes.js
        │   ├── favoritoRoutes.js
        │   ├── buqueRoutes.js
        │   ├── significadoRoutes.js
        │   ├── ocasiaoRoutes.js
        │   └── usuarioRoutes.js
        │
        ├── 📁 middlewares/
        │   └── authMiddleware.js   # autenticar + autorizar
        │
        ├── 📁 graphql/
        │   ├── typeDefs.js         # Schema GraphQL
        │   └── resolvers.js        # Resolvers das queries/mutations
        │
        └── 📁 seeds/
            └── floresSeed.js       # Popula o banco com 70 flores
```

---

<br>

## 🚀 Como Executar

### Pré-requisitos

- **Node.js 18+** ([download](https://nodejs.org/))
- **MongoDB Atlas** (gratuito) **ou** MongoDB local
- **Docker Desktop** (opcional, para rodar containerizado)
- **Git**

### Rodando localmente (recomendado para desenvolvimento)

#### 1. Clone o repositório
```bash
git clone https://github.com/SEU-USUARIO/floriografia.git
cd floriografia
```

#### 2. Configure o backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` na pasta `backend/`:

```env
PORT=3000
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/floriografia?retryWrites=true&w=majority
JWT_SECRET=coloque-aqui-um-segredo-bem-grande-e-aleatorio
```

> 💡 **Como obter o `MONGO_URI`:** Crie um cluster gratuito em [MongoDB Atlas](https://cloud.mongodb.com/), crie um usuário e copie a connection string.

#### 3. Suba o servidor

```bash
npm run dev
```

Saída esperada:
```
✅ MongoDB conectado com sucesso!
[seed] ✅ 70 flores inseridas com sucesso.
🌸 Floriografia rodando!
   Frontend:  http://localhost:3000
   REST API:  http://localhost:3000/api
   GraphQL:   http://localhost:3000/graphql
```

#### 4. Acesse no navegador

```
http://localhost:3000
```

---

<br>

## 🔑 Credenciais de Teste

| Perfil | Email | Senha |
|---|---|---|
| **Admin** | `admin@floriografia.com` | `admin123` |
| **Usuário** | `user@floriografia.com` | `user123` |

> 💡 Para criar um usuário admin manualmente, edite o campo `perfil` de um usuário no MongoDB Atlas para `"admin"`.

---

<br>

## 📡 Documentação da API

### 🌐 REST Endpoints

#### Autenticação

| Método | Endpoint | Descrição | Auth |
|---|---|---|---|
| POST | `/auth/register` | Cria nova conta | ❌ |
| POST | `/auth/login` | Login (retorna JWT) | ❌ |
| GET | `/auth/me` | Dados do usuário logado | ✅ |

**Exemplo de login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@floriografia.com","senha":"admin123"}'
```

**Resposta:**
```json
{
  "mensagem": "Login realizado!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "6a9b05...",
    "nome": "Admin",
    "email": "admin@floriografia.com",
    "perfil": "admin"
  }
}
```

#### Flores

| Método | Endpoint | Descrição | Perfil |
|---|---|---|---|
| GET | `/flores` | Lista todas as flores | Público |
| GET | `/flores/:id` | Detalhes de uma flor | Público |
| POST | `/flores` | Criar flor | **admin** |
| PUT | `/flores/:id` | Atualizar flor | **admin** |
| DELETE | `/flores/:id` | Excluir flor | **admin** |

#### Favoritos (requer JWT)

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/favoritos` | Lista favoritos do usuário |
| POST | `/favoritos` | Adicionar favorito |
| DELETE | `/favoritos/:florId` | Remover favorito |

#### Buquês (requer JWT)

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/buques` | Lista buquês do usuário |
| POST | `/buques` | Criar novo buquê |
| GET | `/buques/:id` | Detalhes de um buquê |

#### Significados e Ocasiões

| Método | Endpoint | Perfil |
|---|---|---|
| GET | `/significados` | Público |
| POST | `/significados` | **admin** |
| PUT | `/significados/:id` | **admin** |
| DELETE | `/significados/:id` | **admin** |
| GET | `/ocasioes` | Público |
| POST | `/ocasioes` | **admin** |
| PUT | `/ocasioes/:id` | **admin** |
| DELETE | `/ocasioes/:id` | **admin** |

### 🔷 GraphQL

Endpoint: `POST /graphql`

**Query — listar flores:**
```graphql
query {
  flores {
    id
    nome
    especie
    emoji
    meanings
    occasions
    preco
    estoque
  }
}
```

**Mutation — criar flor (admin):**
```graphql
mutation {
  cadastrarFlor(
    nome: "Rosa Branca"
    especie: "Rosa spp."
    cor: "Branco"
    emoji: "🤍"
    preco: 16.00
    estoque: 50
  ) {
    id
    nome
  }
}
```

> ⚠️ Mutations exigem o header `Authorization: Bearer <TOKEN>` e perfil `admin`.

---

<br>

## 🔐 Segurança

A aplicação implementa **autorização em 2 camadas**:

### 1. Middleware de Autenticação
```javascript
router.get("/auth/me", autenticar, me);
```
Valida o JWT e injeta `req.usuario`.

### 2. Middleware de Autorização
```javascript
router.post("/flores", autenticar, autorizar("admin"), criarFlor);
```
Verifica se `req.usuario.perfil === "admin"`.

**Mesmo que o usuário burle o frontend**, o backend retorna:
- `401 Unauthorized` se o token for inválido/ausente
- `403 Forbidden` se o perfil não tiver permissão

### Boas práticas implementadas
- 🔒 Senhas com hash bcrypt (10 salt rounds)
- 🔒 JWT com expiração configurável
- 🔒 CORS habilitado apenas para origens confiáveis
- 🔒 Variáveis sensíveis em `.env` (não versionadas)

---

<br>

## 📄 Licença

Este projeto é de uso acadêmico e está sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<br>

## 🙏 Agradecimentos

- Inspirado no universo visual de **Undertale** (Toby Fox)
- Fontes gratuitas do **Google Fonts**
- Ícones emoji nativos
- Comunidade MongoDB Atlas pelo plano gratuito

---

<br>

<div align="center">

### 🌸 "Cada flor conta uma história. Qual será a sua?"

**Feito com 💜 e muito café**

⭐ Se este projeto te ajudou, deixe uma estrela no GitHub! ⭐

</div>
