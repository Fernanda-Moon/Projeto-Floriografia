/* ==========================================================================
   API — ponte entre o frontend e o backend Express/GraphQL
   ========================================================================== */
const BACKEND_URL_OVERRIDE = "";

const API_URL = (() => {
  // 1) Override manual (produção)
  if (BACKEND_URL_OVERRIDE) return BACKEND_URL_OVERRIDE;

  const h = window.location.hostname;
  const port = window.location.port;

  // 2) Ambiente local → backend local
  if (h === "localhost" || h === "127.0.0.1") {
    // Se o front JÁ está na porta 3000, ele é servido pelo backend
    if (port === "3000") return window.location.origin;
    // Caso contrário (Live Server, Vite, etc.), aponta pro backend local
    return "http://localhost:3000";
  }

  // 3) Produção → mesma origem (backend serve o front)
  return window.location.origin;
})();

// ⭐ DEBUG — mostra no console pra onde estamos apontando
console.log("[api] API_URL =", API_URL);

const TOKEN_KEY = "floriografia:token";
const getToken = () => localStorage.getItem(TOKEN_KEY);

/* --------------------------------------------------------------------------
   request — wrapper fetch com JSON + JWT + tratamento de erro
   -------------------------------------------------------------------------- */
async function request(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth && getToken()) headers.Authorization = `Bearer ${getToken()}`;

  let res;
  try {
    res = await fetch(API_URL + path, {
      method,
      headers,
      cache: "no-store",                     // ⭐ nunca cachear
      body: body ? JSON.stringify(body) : undefined
    });
  } catch (networkErr) {
    // Falha de rede (backend offline, CORS bloqueado, URL errada)
    console.error(`[api] ❌ Falha de rede em ${method} ${path}:`, networkErr);
    throw new Error(
      `Backend inacessível (${API_URL}). Verifique se o servidor está rodando.`
    );
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensagem || `Erro ${res.status}`);
  return data;
}

/* ---------- AUTH ---------- */
export const apiRegister = (nome, email, senha) =>
  request("/auth/register", { method:"POST", body:{ nome, email, senha }, auth:false });

export const apiLogin = (email, senha) =>
  request("/auth/login", { method:"POST", body:{ email, senha }, auth:false });

export const apiMe = () => request("/auth/me");

/* ---------- FAVORITOS ---------- */
export const apiListarFavoritos = ()       => request("/favoritos");
export const apiAddFavorito     = (florId) => request("/favoritos", { method:"POST", body:{ flor: florId } });
export const apiRemFavorito     = (florId) => request(`/favoritos/${florId}`, { method:"DELETE" });

/* ---------- BUQUÊS ---------- */
export const apiListarBuques = () => request("/buques");
export const apiCriarBuque   = (nome, flores, mensagem) =>
  request("/buques", { method:"POST", body:{ nome, flores, mensagem } });

/* ---------- GRAPHQL — CATÁLOGO ---------- */
export async function apiListarFlores(){
  const query = `
    query {
      flores {
        id nome especie cor emoji file
        feelings meanings colors category origin season occasions
        descricao preco estoque
      }
    }`;

  let res;
  try {
    res = await fetch(API_URL + "/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });
  } catch (networkErr) {
    console.error("[api] ❌ GraphQL inacessível:", networkErr);
    throw new Error(`Backend inacessível (${API_URL}).`);
  }

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data.flores;
}

/* ---------- ADMIN — FLORES ---------- */
export const apiAdminCriarFlor     = (dados)     => request("/flores", { method:"POST", body: dados });
export const apiAdminAtualizarFlor = (id, dados) => request(`/flores/${id}`, { method:"PUT", body: dados });
export const apiAdminExcluirFlor   = (id)        => request(`/flores/${id}`, { method:"DELETE" });

/* ---------- ADMIN — SIGNIFICADOS ---------- */
export const apiAdminListarSignificados    = ()          => request("/significados", { auth:false });
export const apiAdminCriarSignificado      = (dados)     => request("/significados", { method:"POST", body: dados });
export const apiAdminAtualizarSignificado  = (id, dados) => request(`/significados/${id}`, { method:"PUT", body: dados });
export const apiAdminExcluirSignificado    = (id)        => request(`/significados/${id}`, { method:"DELETE" });

/* ---------- ADMIN — OCASIÕES ---------- */
export const apiAdminListarOcasioes    = ()          => request("/ocasioes", { auth:false });
export const apiAdminCriarOcasiao      = (dados)     => request("/ocasioes", { method:"POST", body: dados });
export const apiAdminAtualizarOcasiao  = (id, dados) => request(`/ocasioes/${id}`, { method:"PUT", body: dados });
export const apiAdminExcluirOcasiao    = (id)        => request(`/ocasioes/${id}`, { method:"DELETE" });
