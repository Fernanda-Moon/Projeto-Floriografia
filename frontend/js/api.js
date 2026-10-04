/* ==========================================================================
   API — ponte entre o frontend e o backend Express/GraphQL
   ========================================================================== */
const API_URL = (() => {
  const h = window.location.hostname;
  // Desenvolvimento local
  if (h === "localhost" || h === "127.0.0.1") return "http://localhost:3000";
  // Produção — URL pública do backend hospedado
  return "https://SEU-BACKEND-AQUI.onrender.com";
})();

const TOKEN_KEY = "floriografia:token";
const getToken = () => localStorage.getItem(TOKEN_KEY);

async function request(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth && getToken()) headers.Authorization = `Bearer ${getToken()}`;

  const res = await fetch(API_URL + path, {
    method,
    headers,
    cache: "no-store",
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensagem || `Erro ${res.status}`);
  return data;
}

/* ---------- AUTH ---------- */
export const apiRegister = (nome, email, senha) =>
  request("/auth/register", { method: "POST", body: { nome, email, senha }, auth: false });
export const apiLogin = (email, senha) =>
  request("/auth/login", { method: "POST", body: { email, senha }, auth: false });
export const apiMe = () => request("/auth/me");

/* ---------- FAVORITOS ---------- */
export const apiListarFavoritos = () => request("/favoritos");
export const apiAddFavorito = (florId) =>
  request("/favoritos", { method: "POST", body: { flor: florId } });
export const apiRemFavorito = (florId) =>
  request(`/favoritos/${florId}`, { method: "DELETE" });

/* ---------- BUQUÊS ---------- */
export const apiListarBuques = () => request("/buques");
export const apiCriarBuque = (nome, flores, mensagem) =>
  request("/buques", { method: "POST", body: { nome, flores, mensagem } });

/* ---------- GRAPHQL — CATÁLOGO ---------- */
export async function apiListarFlores() {
  const query = `
    query {
      flores {
        id nome especie cor emoji file
        feelings meanings colors category origin season occasions
        descricao preco estoque
      }
    }`;
  const res = await fetch(API_URL + "/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data.flores;
}

/* ---------- ADMIN — FLORES ---------- */
export const apiAdminCriarFlor = (dados) =>
  request("/flores", { method: "POST", body: dados });
export const apiAdminAtualizarFlor = (id, dados) =>
  request(`/flores/${id}`, { method: "PUT", body: dados });
export const apiAdminExcluirFlor = (id) =>
  request(`/flores/${id}`, { method: "DELETE" });

/* ---------- ADMIN — SIGNIFICADOS ---------- */
export const apiAdminListarSignificados = () =>
  request("/significados", { auth: false });
export const apiAdminCriarSignificado = (dados) =>
  request("/significados", { method: "POST", body: dados });
export const apiAdminAtualizarSignificado = (id, dados) =>
  request(`/significados/${id}`, { method: "PUT", body: dados });
export const apiAdminExcluirSignificado = (id) =>
  request(`/significados/${id}`, { method: "DELETE" });

/* ---------- ADMIN — OCASIÕES ---------- */
export const apiAdminListarOcasioes = () =>
  request("/ocasioes", { auth: false });
export const apiAdminCriarOcasiao = (dados) =>
  request("/ocasioes", { method: "POST", body: dados });
export const apiAdminAtualizarOcasiao = (id, dados) =>
  request(`/ocasioes/${id}`, { method: "PUT", body: dados });
export const apiAdminExcluirOcasiao = (id) =>
  request(`/ocasioes/${id}`, { method: "DELETE" });
