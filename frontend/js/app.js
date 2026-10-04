import {
  apiLogin, apiRegister, apiMe,
  apiAddFavorito, apiRemFavorito, apiListarFavoritos,
  apiListarBuques, apiCriarBuque,
  apiListarFlores,
  apiAdminCriarFlor, apiAdminAtualizarFlor, apiAdminExcluirFlor,
  apiAdminListarSignificados, apiAdminCriarSignificado,
  apiAdminAtualizarSignificado, apiAdminExcluirSignificado,
  apiAdminListarOcasioes, apiAdminCriarOcasiao,
  apiAdminAtualizarOcasiao, apiAdminExcluirOcasiao
} from "./api.js";

/* ==========================================================================
   1. DADOS ESTÁTICOS
   ========================================================================== */
const FEELINGS = [
  { id:'Amor',          label:'Amor',          emoji:'❤', color:'#ef4444', file:'amor.png',          desc:'Paixão, romance e entrega.' },
  { id:'Alegria',       label:'Alegria',       emoji:'⭐', color:'#fbbf24', file:'alegria.png',       desc:'Luz, energia e bons momentos.' },
  { id:'Amizade',       label:'Amizade',       emoji:'💚', color:'#22c55e', file:'amizade.png',       desc:'Lealdade, parceria e cuidado.' },
  { id:'Saudade',       label:'Saudade',       emoji:'💧', color:'#3b82f6', file:'saudade.png',       desc:'Memória, ausência e afeto.' },
  { id:'Tranquilidade', label:'Tranquilidade', emoji:'🟣', color:'#c084fc', file:'tranquilidade.png', desc:'Paz, equilíbrio e serenidade.' },
  { id:'Esperança',     label:'Esperança',     emoji:'🕊', color:'#f5f3ff', file:'esperanca.png',     desc:'Renovação, fé e recomeço.' },
  { id:'Gratidão',      label:'Gratidão',      emoji:'🙏', color:'#10b981', file:'gratidao.png',      desc:'Reconhecimento, obrigado e retribuição.' },
  { id:'Coragem',       label:'Coragem',       emoji:'🔥', color:'#dc2626', file:'coragem.png',       desc:'Força, bravura e determinação.' },
  { id:'Memória',       label:'Memória',       emoji:'🕯', color:'#6b7280', file:'memoria.png',       desc:'Lembrança, eternidade e homenagem.' },
  { id:'Renovação',     label:'Renovação',     emoji:'🌱', color:'#84cc16', file:'renovacao.png',     desc:'Recomeço, primavera e novo ciclo.' },
  { id:'Prosperidade',  label:'Prosperidade',  emoji:'🍀', color:'#eab308', file:'prosperidade.png',  desc:'Abundância, sorte e conquistas.' },
  { id:'Admiração',     label:'Admiração',     emoji:'✨', color:'#8b5cf6', file:'admiracao.png',     desc:'Respeito, encanto e reverência.' },
  { id:'Espiritualidade',label:'Espiritualidade',emoji:'🪷',color:'#a78bfa', file:'espiritualidade.png',desc:'Elevação, fé e conexão interior.' },
  { id:'Pureza',        label:'Pureza',        emoji:'🕊', color:'#f8fafc', file:'pureza.png',        desc:'Inocência, sinceridade e paz.' },
  { id:'Paixão',        label:'Paixão',        emoji:'💋', color:'#e11d48', file:'paixao.png',        desc:'Desejo, intensidade e fogo.' },
  { id:'Sorte',         label:'Sorte',         emoji:'🎲', color:'#22c55e', file:'sorte.png',         desc:'Fortuna, acaso e bons presságios.' },
  { id:'Resiliência',   label:'Resiliência',   emoji:'🪨', color:'#78716c', file:'resiliencia.png',   desc:'Superação, força e recomeço.' },
  { id:'Serenidade',    label:'Serenidade',    emoji:'🧘', color:'#67e8f9', file:'serenidade.png',    desc:'Calma profunda, paz interior.' },
  { id:'Encanto',       label:'Encanto',       emoji:'💫', color:'#f472b6', file:'encanto.png',       desc:'Fascínio, beleza e magia.' }
];

const COLORS = [
  { id:'Vermelho', label:'Vermelho', hex:'#ef4444' },
  { id:'Rosa',     label:'Rosa',     hex:'#ec4899' },
  { id:'Amarelo',  label:'Amarelo',  hex:'#fbbf24' },
  { id:'Laranja',  label:'Laranja',  hex:'#f97316' },
  { id:'Azul',     label:'Azul',     hex:'#3b82f6' },
  { id:'Roxo',     label:'Roxo',     hex:'#a855f7' },
  { id:'Lilás',    label:'Lilás',    hex:'#c084fc' },
  { id:'Branco',   label:'Branco',   hex:'#f5f3ff' },
  { id:'Preto',    label:'Preto',    hex:'#1a1a1a' },
  { id:'Verde',    label:'Verde',    hex:'#22c55e' },
  { id:'Dourado',  label:'Dourado',  hex:'#d4af37' },
  { id:'Bordô',    label:'Bordô',    hex:'#7f1d1d' },
  { id:'Coral',    label:'Coral',    hex:'#fb7185' },
  { id:'Pêssego',  label:'Pêssego',  hex:'#fdba74' },
  { id:'Turquesa', label:'Turquesa', hex:'#2dd4bf' },
  { id:'Cinza',    label:'Cinza',    hex:'#9ca3af' },
  { id:'Bege',     label:'Bege',     hex:'#fef3c7' },
  { id:'Salmão',   label:'Salmão',   hex:'#fda4af' },
  { id:'Púrpura',  label:'Púrpura',  hex:'#7e22ce' },
  { id:'Marrom',   label:'Marrom',   hex:'#78350f' }
];

const MEANING_FILTERS = FEELINGS.map(f => f.label);

const OCCASIONS = [
  { id:'namorados',    label:'Dia dos Namorados',      emoji:'💘', desc:'Para dizer "eu te amo" sem palavras.' },
  { id:'casamento',    label:'Casamento',              emoji:'💍', desc:'Celebre a união com elegância.' },
  { id:'aniversario',  label:'Aniversário',            emoji:'🎂', desc:'Um parabéns que floresce.' },
  { id:'desculpas',    label:'Pedido de Desculpas',    emoji:'🙏', desc:'Quando o coração pede recomeço.' },
  { id:'amizade',      label:'Amizade',                emoji:'🤝', desc:'Para quem caminha ao seu lado.' },
  { id:'gratidao',     label:'Gratidão',               emoji:'🌷', desc:'Obrigado por existir na minha vida.' },
  { id:'condolencias', label:'Condolências',           emoji:'🕯', desc:'Presença silenciosa em momento difícil.' },
  { id:'parabens',     label:'Parabéns',               emoji:'🎉', desc:'Conquistas merecem flores.' },
  { id:'maes',         label:'Dia das Mães',           emoji:'💐', desc:'Para quem te deu a vida e o cuidado.' },
  { id:'pais',         label:'Dia dos Pais',           emoji:'👔', desc:'Honre quem te ensinou a caminhar.' },
  { id:'formatura',    label:'Formatura',              emoji:'🎓', desc:'Celebre a conquista do conhecimento.' },
  { id:'nascimento',   label:'Nascimento',             emoji:'👶', desc:'Boas-vindas a uma nova vida.' },
  { id:'recomeco',     label:'Recomeço',               emoji:'🌅', desc:'Para novos começos e segundas chances.' },
  { id:'superacao',    label:'Superação',              emoji:'💪', desc:'Vitória sobre desafios e obstáculos.' },
  { id:'despedida',    label:'Despedida',              emoji:'👋', desc:'Até logo, com carinho e memória.' },
  { id:'boasvindas',   label:'Boas-vindas',            emoji:'🚪', desc:'Receba alguém especial com alegria.' },
  { id:'anonovo',      label:'Ano Novo',               emoji:'🎆', desc:'Renovação e esperança para o ciclo que começa.' },
  { id:'mulher',       label:'Dia da Mulher',          emoji:'♀',  desc:'Celebre a força e a beleza feminina.' },
  { id:'amigo',        label:'Dia do Amigo',           emoji:'🫂', desc:'Para celebrar a amizade verdadeira.' },
  { id:'pascoa',       label:'Páscoa',                 emoji:'🐣', desc:'Renascimento e renovação da fé.' },
  { id:'natal',        label:'Natal',                  emoji:'🎄', desc:'Celebre o amor e a união em família.' },
  { id:'pedido',       label:'Pedido de Casamento',    emoji:'💎', desc:'O momento mais importante da vida a dois.' },
  { id:'agradecimento',label:'Agradecimento',          emoji:'💌', desc:'Um obrigado especial e sincero.' },
  { id:'espiritual',   label:'Cerimônia Espiritual',   emoji:'🕉', desc:'Para momentos de fé e conexão interior.' },
  { id:'empresa',      label:'Homenagem Empresarial',  emoji:'🏆', desc:'Reconhecimento profissional e conquistas.' },
  { id:'solidariedade',label:'Solidariedade',          emoji:'🤲', desc:'Apoio em momentos de necessidade.' }
];

let FLOWERS = [
  { id:'rosa-vermelha', name:'Rosa Vermelha', sci:'Rosa spp.', emoji:'🌹', file:'rosa_vermelha.png',
    feelings:['Amor'], meanings:['Amor profundo','Paixão','Desejo','Romance'],
    colors:['Vermelho'], category:'Amor', origin:'Ásia', season:'Primavera / Verão',
    about:'A rosa vermelha é o símbolo máximo do amor e da paixão.',
    occasions:['Dia dos Namorados','Casamento','Aniversário','Pedido de Desculpas'],
    preco:15.90, estoque:100 },
  { id:'girassol', name:'Girassol', sci:'Helianthus annuus', emoji:'🌻', file:'girassol.png',
    feelings:['Alegria','Esperança'], meanings:['Alegria','Positividade','Vitalidade'],
    colors:['Amarelo'], category:'Alegria', origin:'América do Norte', season:'Verão',
    about:'O girassol gira em direção ao sol.',
    occasions:['Aniversário','Amizade','Parabéns','Gratidão'], preco:12.50, estoque:80 },
  { id:'tulipa-rosa', name:'Tulipa Rosa', sci:'Tulipa gesneriana', emoji:'🌷', file:'tulipa_rosa.png',
    feelings:['Amor','Amizade'], meanings:['Carinho','Cuidado','Afeto'],
    colors:['Rosa'], category:'Afeto', origin:'Ásia Central', season:'Primavera',
    about:'A tulipa rosa fala de afeto gentil.',
    occasions:['Amizade','Aniversário','Gratidão','Parabéns'], preco:18, estoque:60 },
  { id:'lavanda', name:'Lavanda', sci:'Lavandula angustifolia', emoji:'🪻', file:'lavanda.png',
    feelings:['Tranquilidade','Esperança'], meanings:['Tranquilidade','Equilíbrio','Paz'],
    colors:['Roxo','Lilás'], category:'Tranquilidade', origin:'Mediterrâneo', season:'Verão',
    about:'A lavanda acalma os sentidos.',
    occasions:['Condolências','Gratidão','Amizade','Dia dos Namorados'], preco:22, estoque:50 },
  { id:'lirio-branco', name:'Lírio Branco', sci:'Lilium candidum', emoji:'🌸', file:'lirio_branco.png',
    feelings:['Esperança','Tranquilidade'], meanings:['Pureza','Inocência','Renovação'],
    colors:['Branco'], category:'Pureza', origin:'Europa / Ásia', season:'Primavera / Verão',
    about:'O lírio branco simboliza pureza e recomeços.',
    occasions:['Casamento','Condolências','Gratidão','Aniversário'], preco:20, estoque:40 },
  { id:'peonia', name:'Peônia', sci:'Paeonia lactiflora', emoji:'🌺', file:'peonia.png',
    feelings:['Amor','Alegria'], meanings:['Prosperidade','Honra','Romance feliz'],
    colors:['Rosa','Branco'], category:'Prosperidade', origin:'Ásia', season:'Primavera',
    about:'A peônia é a rainha das flores.',
    occasions:['Casamento','Parabéns','Aniversário','Dia dos Namorados'], preco:25, estoque:45 }
];

/* ==========================================================================
   2. ESTADO
   ========================================================================== */
const STORAGE_KEY = 'floriografia:v15';
const TOKEN_KEY   = 'floriografia:token';

const state = {
  route:'inicio', query:'', colors:new Set(), meanings:new Set(),
  occasion:'Todas', page:1, perPage:8,
  favorites:new Set(), bouquet:{}, message:'', step:1,
  gardenTab:'todas', currentFlower:null,
  quizIndex:0, quizResult:null, quizScores:{},
  user:null, savedBouquets:[], history:[], adminTab:'flores'
};

window.state = state;
window.FLOWERS = FLOWERS;

/* ==========================================================================
   3. HELPERS
   ========================================================================== */
function getToken(){ return localStorage.getItem(TOKEN_KEY); }
function setToken(t){
  if(t) localStorage.setItem(TOKEN_KEY, t);
  else  localStorage.removeItem(TOKEN_KEY);
}

function saveState(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      favorites: [...state.favorites],
      history:   state.history,
      user:      state.user
    }));
  }catch(e){}
}
function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return;
    const d = JSON.parse(raw);
    if(d.favorites) state.favorites = new Set(d.favorites);
    if(d.history)   state.history   = d.history;
    if(d.user)      state.user      = d.user;
  }catch(e){}
}

const $  = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

const flowerById  = (id) => FLOWERS.find(f => f.id === id);
const feelingById = (id) => FEELINGS.find(f => f.id === id);

function flowerArt(flower, size = 60){
  return `
    <div class="flower-art" data-emoji="${flower.emoji}" style="--art-size:${size}px">
      <img src="assets/flores/${flower.file}" alt="${flower.name}" loading="lazy"
           onerror="this.closest('.flower-art').classList.add('fallback')">
    </div>`;
}

function showToast(message){
  const toast = $('#toast');
  const text  = $('#toastText');
  if(!toast || !text) return;
  text.textContent = message.replace(/^\*\s*/, '');
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2400);
}

function typewrite(el, text, opts = {}){
  if(!el) return;
  const speed = opts.speed || 28;
  const delay = opts.delay || 0;
  el.classList.add('typing');
  el.textContent = '';
  let i = 0, timer = null;
  const start = () => {
    const tick = () => {
      if(i >= text.length){
        el.classList.remove('typing');
        el.dispatchEvent(new CustomEvent('typed'));
        return;
      }
      const ch = text[i++];
      el.textContent += ch;
      let wait = speed;
      if('.!?'.includes(ch)) wait = speed * 9;
      else if(ch === ',')    wait = speed * 4;
      else if(ch === ' ')    wait = speed * 0.7;
      timer = setTimeout(tick, wait);
    };
    tick();
  };
  if(delay) setTimeout(start, delay); else start();
  const skip = () => {
    clearTimeout(timer);
    i = text.length;
    el.textContent = text;
    el.classList.remove('typing');
    el.removeEventListener('click', skip);
  };
  el.addEventListener('click', skip);
}

function typewriteAll(scope){
  $$('[data-typewrite]', scope).forEach(el => {
    const text = el.getAttribute('data-typewrite');
    if(!text || el.dataset.typed === text) return;
    el.dataset.typed = text;
    typewrite(el, text, { delay: Number(el.dataset.delay) || 0 });
  });
}

function popAt(el, text, color = '#d4af37'){
  if(!el) return;
  const rect = el.getBoundingClientRect();
  const pop = document.createElement('div');
  pop.className = 'dmg-pop';
  pop.textContent = text;
  pop.style.left = (rect.left + rect.width / 2) + 'px';
  pop.style.top  = (rect.top  + rect.height / 2) + 'px';
  pop.style.color = color;
  document.body.appendChild(pop);
  setTimeout(() => pop.remove(), 900);
}

const FLAVOR_LINES = [
  '* O cheiro de flores preenche o ar.',
  '* Você sente a determinação encher seu peito.',
  '* As pétalas caem devagar, como se soubessem de algo.',
  '* Alguém, em algum lugar, sorri com a sua chegada.',
  '* Uma leve brisa faz as folhas sussurrarem.',
  '* A noite está tranquila. Perfeita para pensar em quem você ama.',
  '* Seu coração está cheio de flores.',
  '* Que sentimento será que mora em você agora?'
];
const randomFlavor = () => FLAVOR_LINES[Math.floor(Math.random() * FLAVOR_LINES.length)];

function addHistory(text){
  state.history.unshift({ text, date:'Agora' });
  state.history = state.history.slice(0, 12);
  saveState();
}

/* ==========================================================================
   4. PRELOADER
   ========================================================================== */
function runPreloader(){
  const preloader = $('#preloader');
  if(!preloader) return Promise.resolve();
  return new Promise(resolve => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => { preloader.remove(); resolve(); }, 400);
    }, 600);
  });
}

/* ==========================================================================
   5. ROTEADOR
   ========================================================================== */
function go(route, params = {}){
  state.route = route;
  $$('.view').forEach(v => v.classList.toggle('active', v.id === `view-${route}`));
  $$('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.route === route));
  $$('.bottom-nav button').forEach(b => b.classList.toggle('active', b.dataset.route === route));

  switch(route){
    case 'inicio':       renderHome(); break;
    case 'flores':       renderCatalog(); break;
    case 'flor':         renderFlowerDetail(params.id || state.currentFlower); break;
    case 'significados': renderMeanings(); break;
    case 'ocasioes':     renderOccasions(); break;
    case 'buque':        renderBouquet(); break;
    case 'jardim':       renderGarden(); break;
    case 'quiz':         renderQuiz(); break;
    case 'admin':        renderAdmin(); break;
  }

  closeSidebar();
  closeMobileNav();

  const flavor = $('.view.active [data-flavor]');
  if(flavor) typewrite(flavor, randomFlavor());
  setTimeout(() => typewriteAll($('.view.active')), 60);
  resetSoulFocus();

  if(history.replaceState){
    history.replaceState(null, '', route === 'inicio' ? '#inicio' : `#${route}`);
  }
  window.scrollTo({ top:0, behavior:'smooth' });
}

/* ==========================================================================
   6. SOUL (navegação por teclado)
   ========================================================================== */
function soulTargets(){
  const view = $('.view.active');
  if(!view) return [];
  return $$('.ut-selectable', view).filter(el =>
    !el.disabled && el.offsetParent !== null && !el.classList.contains('no-soul'));
}
let soulIndex = 0;
function resetSoulFocus(){
  soulIndex = 0;
  $$('.soul-active').forEach(el => el.classList.remove('soul-active'));
}
function moveSoul(direction){
  const targets = soulTargets();
  if(!targets.length) return;
  const cur = targets.indexOf(document.activeElement);
  if(cur === -1) soulIndex = 0;
  else soulIndex = (cur + direction + targets.length) % targets.length;
  $$('.soul-active').forEach(el => el.classList.remove('soul-active'));
  const next = targets[soulIndex];
  next.classList.add('soul-active');
  next.focus({ preventScroll:false });
  next.animate(
    [{transform:'translateX(0)'},{transform:'translateX(3px)'},{transform:'translateX(0)'}],
    {duration:120, easing:'steps(2)'}
  );
}

document.addEventListener('keydown', (e) => {
  if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName) && e.key !== 'Escape') return;
  if(e.key === 'ArrowDown' || e.key === 'ArrowRight'){ e.preventDefault(); moveSoul(1); return; }
  if(e.key === 'ArrowUp'   || e.key === 'ArrowLeft'){  e.preventDefault(); moveSoul(-1); return; }
  if(e.key === 'z' || e.key === 'Z' || e.key === 'Enter'){
    const active = document.activeElement;
    if(active && active.classList.contains('ut-selectable')){ e.preventDefault(); active.click(); }
    return;
  }
  if(e.key === 'Escape'){
    closeSidebar();
    closeMobileNav();
  }
});

/* ==========================================================================
   7. HOME
   ========================================================================== */
function renderHome(){
  const stats = { flowers: FLOWERS.length, feelings: FEELINGS.length, occasions: OCCASIONS.length };
  document.querySelectorAll('[data-stat]').forEach(el => {
    const key = el.dataset.stat;
    if(stats[key] != null) el.textContent = stats[key];
  });

  const row = $('#feelingsRow');
  if(!row) return;

  row.innerHTML = FEELINGS.map(f => `
    <button class="feeling-card ut-selectable" type="button" data-feeling="${f.id}" title="${f.desc}">
      <span class="ico-wrap" style="color:${f.color}; text-shadow:0 0 14px ${f.color}">${f.emoji}</span>
      <strong>${f.label}</strong>
      <small>${f.desc}</small>
    </button>
  `).join('');
}

/* ==========================================================================
   8. CATÁLOGO
   ========================================================================== */
function matchesColor(flower){
  if(!state.colors.size) return true;
  return flower.colors.some(c => state.colors.has(c));
}
function matchesMeaning(flower){
  if(!state.meanings.size) return true;
  const pool = [...flower.feelings, ...flower.meanings, flower.category].join(' ').toLowerCase();
  return [...state.meanings].some(m => pool.includes(m.toLowerCase()));
}
function matchesOccasion(flower){
  if(state.occasion === 'Todas') return true;
  return flower.occasions.includes(state.occasion);
}
function getFilteredFlowers(){
  const q = state.query.trim().toLowerCase();
  return FLOWERS.filter(f => {
    if(q){
      const hay = `${f.name} ${f.sci} ${f.meanings.join(' ')} ${f.category} ${f.feelings.join(' ')}`.toLowerCase();
      if(!hay.includes(q)) return false;
    }
    return matchesColor(f) && matchesMeaning(f) && matchesOccasion(f);
  });
}

function renderCatalog(){
  renderColorFilters();
  renderMeaningFilters();
  renderOccasionSelect();
  renderCatalogResults();
}

function renderCatalogResults(){
  const list  = getFilteredFlowers();
  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / state.perPage));
  state.page = Math.min(state.page, pages);
  const start = (state.page - 1) * state.perPage;
  const slice = list.slice(start, start + state.perPage);

  const grid = $('#flowerGrid');
  if(!grid) return;
  grid.innerHTML = slice.length
    ? slice.map(flowerCardHTML).join('')
    : `<div class="empty-state" style="grid-column:1/-1">
         <span class="ico">✖</span>
         * Nenhuma flor encontrada.<br>Tente outros filtros.
       </div>`;

  const rc = $('#resultCount');
  if(rc) rc.textContent = `${total} flor${total === 1 ? '' : 'es'} encontrada${total === 1 ? '' : 's'}`;
  renderPagination(pages);
}

function flowerCardHTML(f){
  const isFav = state.favorites.has(f.id);
  return `
    <article class="flower-card ut-selectable" data-flower-open="${f.id}" tabindex="0"
             role="button" aria-label="Ver detalhes de ${f.name}">
      <button class="fav-btn ${isFav ? 'on' : ''}" type="button"
              data-fav="${f.id}" aria-label="Favoritar ${f.name}">♥</button>
      ${flowerArt(f, 56)}
      <h3>${f.name}</h3>
      <p class="flower-meanings">${f.meanings.join(' • ')}</p>
      <div class="flower-tags">
        ${f.feelings.slice(0, 2).map(x => `<span class="tag hot">${x}</span>`).join('')}
      </div>
    </article>`;
}

function renderColorFilters(){
  const wrap = $('#colorFilters');
  if(!wrap) return;

  const counts = {};
  COLORS.forEach(c => { counts[c.id] = FLOWERS.filter(f => f.colors.includes(c.id)).length; });

  const visibleColors = COLORS.filter(c => counts[c.id] > 0);
  const validIds = new Set(visibleColors.map(c => c.id));
  [...state.colors].forEach(id => { if(!validIds.has(id)) state.colors.delete(id); });

  wrap.innerHTML = visibleColors.map(c => {
    const on = state.colors.has(c.id);
    const n  = counts[c.id];
    return `
      <button class="color-chip ${on ? 'on' : ''}" type="button"
              data-color="${c.id}" aria-pressed="${on}"
              title="${c.label} (${n} flor${n === 1 ? '' : 'es'})"
              style="--chip-color:${c.hex}">
        <span>♥</span>
        <b>${n}</b>
      </button>`;
  }).join('');
}

function renderMeaningFilters(){
  const wrap = $('#meaningFilters');
  if(!wrap) return;
  wrap.innerHTML = MEANING_FILTERS.map(m => `
    <label class="check-item">
      <input type="checkbox" data-meaning="${m}" ${state.meanings.has(m) ? 'checked' : ''}>
      <i>♥</i> ${m}
    </label>
  `).join('');
}

function renderOccasionSelect(){
  const sel = $('#occasionFilter');
  if(!sel) return;
  sel.innerHTML = ['Todas', ...OCCASIONS.map(o => o.label)]
    .map(o => `<option value="${o}" ${state.occasion === o ? 'selected' : ''}>${o}</option>`)
    .join('');
}

function renderPagination(pages){
  const el = $('#pagination');
  if(!el) return;
  if(pages <= 1){ el.innerHTML = ''; return; }
  let html = `<button class="page-btn ut-selectable" data-page="${state.page - 1}" ${state.page === 1 ? 'disabled' : ''}>‹</button>`;
  for(let i = 1; i <= pages; i++){
    html += `<button class="page-btn ut-selectable ${i === state.page ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }
  html += `<button class="page-btn ut-selectable" data-page="${state.page + 1}" ${state.page === pages ? 'disabled' : ''}>›</button>`;
  el.innerHTML = html;
}

/* ==========================================================================
   9. DETALHE DA FLOR
   ========================================================================== */
function renderFlowerDetail(id){
  const f = flowerById(id);
  if(!f){ go('flores'); return; }
  state.currentFlower = id;
  const isFav = state.favorites.has(id);

  const occasionChips = f.occasions.map(label => {
    const occ = OCCASIONS.find(o => o.label === label);
    return `<button type="button" class="ut-selectable" data-occasion-open="${label}">
      <span aria-hidden="true">${occ ? occ.emoji : '🌸'}</span> ${label}
    </button>`;
  }).join('');

  $('#view-flor').innerHTML = `
    <nav class="breadcrumb" aria-label="Você está em">
      <button type="button" class="ut-selectable" data-route="flores">* Flores</button>
      <span>›</span>
      <span>${f.name}</span>
    </nav>

    <div class="detail-layout">
      <div class="detail-visual ut-box">${flowerArt(f, 170)}</div>

      <div class="detail-info">
        <div class="detail-header">
          <div>
            <h2>${f.name}</h2>
            <p class="sci">${f.sci}</p>
          </div>
          <button class="ut-btn ut-selectable ${isFav ? 'selected' : ''}" type="button" data-fav="${f.id}">
            <span class="heart">♥</span> ${isFav ? 'Favoritada' : 'Favoritar'}
          </button>
        </div>

        <section class="block">
          <h3>Significados</h3>
          <ul class="check-list">${f.meanings.map(m => `<li>${m}</li>`).join('')}</ul>
        </section>

        <section class="block">
          <h3>Cores</h3>
          <div class="color-dots">
            ${f.colors.map(c => {
              const col = COLORS.find(x => x.id === c);
              return `<span class="color-dot" style="background:${col ? col.hex : '#fff'}" title="${c}"></span>`;
            }).join('')}
          </div>
        </section>

        <section class="block">
          <h3>Informações</h3>
          <dl class="meta-grid">
            <div><dt>Categoria</dt><dd>${f.category}</dd></div>
            <div><dt>Origem</dt><dd>${f.origin}</dd></div>
            <div><dt>Época</dt><dd>${f.season}</dd></div>
            <div><dt>Preço</dt><dd>R$ ${(f.preco || 0).toFixed(2)}</dd></div>
          </dl>
        </section>

        <section class="block">
          <h3>Sobre a flor</h3>
          <p class="about-text">${f.about}</p>
        </section>

        <section class="block">
          <h3>Ocasiões ideais</h3>
          <div class="occasion-mini">${occasionChips}</div>
        </section>

        <div class="detail-actions">
          <button class="ut-btn ut-selectable" type="button" data-add-bouquet="${f.id}">
            <span class="heart">♥</span> ADICIONAR AO BUQUÊ
          </button>
          <button class="ut-btn ut-selectable" type="button" data-route="buque">
            IR PARA OFICINA →
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   10. SIGNIFICADOS
   ========================================================================== */
function renderMeanings(){
  const wrap = $('#meaningGroups');
  if(!wrap) return;
  wrap.innerHTML = FEELINGS.map(feel => {
    const flowers = FLOWERS.filter(f => f.feelings.includes(feel.id));
    if(!flowers.length) return '';
    return `
      <section class="meaning-block ut-box">
        <header>
          <span class="ico" style="color:${feel.color}">${feel.emoji}</span>
          <div>
            <h2>${feel.label}
              <small style="color:#d4b8c8;font-family:var(--font-dialogue);font-size:15px">
                (${flowers.length} flores)
              </small>
            </h2>
            <p>${feel.desc}</p>
          </div>
        </header>
        <div class="mini-flower-row">
          ${flowers.map(f => `
            <button class="mini-flower ut-selectable" type="button" data-flower-open="${f.id}">
              ${flowerArt(f, 32)}
              <span><strong>${f.name}</strong><small>${f.meanings[0] || ''}</small></span>
            </button>
          `).join('')}
        </div>
      </section>`;
  }).join('');
}

/* ==========================================================================
   11. OCASIÕES
   ========================================================================== */
function renderOccasions(){
  const wrap = $('#occasionGrid');
  if(!wrap) return;
  wrap.innerHTML = OCCASIONS.map(o => {
    const count = FLOWERS.filter(f => f.occasions.includes(o.label)).length;
    return `
      <button class="occasion-card ut-selectable" type="button" data-occasion-open="${o.label}">
        <span class="ico">${o.emoji}</span>
        <h3>${o.label}</h3>
        <p>${o.desc}</p>
        <span class="count">${count} flor${count === 1 ? '' : 'es'}</span>
      </button>`;
  }).join('');
}

/* ==========================================================================
   12. BUQUÊ
   ========================================================================== */
function bouquetItems(){
  return Object.entries(state.bouquet)
    .filter(([, q]) => q > 0)
    .map(([id, q]) => ({ flower: flowerById(id), qty: q }))
    .filter(x => x.flower);
}
const bouquetCount = () => Object.values(state.bouquet).reduce((a, b) => a + b, 0);

function bouquetFeelings(){
  const s = new Set();
  bouquetItems().forEach(({ flower }) => flower.feelings.forEach(f => s.add(f)));
  return [...s];
}

function bouquetVisualHTML(scale = 1){
  const items = bouquetItems();
  if(!items.length) return `<div class="bouquet-empty">* Nenhuma flor escolhida ainda.</div>`;
  const flat = [];
  items.forEach(({ flower, qty }) => { for(let i = 0; i < Math.min(qty, 12); i++) flat.push(flower); });
  const GOLDEN = 137.508;
  const total = flat.length;
  const spans = flat.map((f, i) => {
    const angle = i * GOLDEN;
    const radius = (i === 0 ? 0 : 22 + 12 * Math.sqrt(i)) * scale;
    const z = 100 - i;
    const fs = Math.max(0.7, 1 - (i / (total * 1.8)));
    return `<span style="--a:${angle}deg; --r:${radius}px; --z:${z}; --s:${fs.toFixed(2)}" title="${f.name}">${f.emoji}</span>`;
  }).join('');
  return `<div class="bouquet-visual">${spans}</div>`;
}

function renderStepper(){
  $$('#stepper li').forEach(li => {
    const n = Number(li.dataset.step);
    li.classList.toggle('active', n === state.step);
    li.classList.toggle('done', n < state.step);
  });
}

function renderBouquet(){
  renderStepper();
  const body = $('#bouquetBody');
  if(!body) return;
  if(state.step === 1) body.innerHTML = bouquetStepOne();
  if(state.step === 2) body.innerHTML = bouquetStepTwo();
  if(state.step === 3) body.innerHTML = bouquetStepThree();
}

function bouquetStepOne(){
  const rows = FLOWERS.map(f => {
    const qty = state.bouquet[f.id] || 0;
    return `
      <div class="picker-row">
        ${flowerArt(f, 28)}
        <div><strong>${f.name}</strong><small>${f.meanings[0] || ''}</small></div>
        <div class="qty">
          <button type="button" class="ut-selectable" data-qty="-1" data-id="${f.id}">−</button>
          <span>${qty}</span>
          <button type="button" class="ut-selectable" data-qty="1" data-id="${f.id}">＋</button>
        </div>
      </div>`;
  }).join('');
  const feelings = bouquetFeelings();
  return `
    <div class="bouquet-grid">
      <section class="builder-panel ut-box">
        <h3>Escolha as flores</h3>
        <div class="flower-picker">${rows}</div>
      </section>
      <section class="builder-panel ut-box bouquet-visual-wrap">
        <h3>Seu buquê</h3>
        ${bouquetVisualHTML(1)}
        <p class="bouquet-hint">* ${bouquetCount()} flor${bouquetCount() === 1 ? '' : 'es'} no buquê</p>
      </section>
      <section class="builder-panel ut-box">
        <h3>Significados do buquê</h3>
        <div class="tag-row">
          ${feelings.length ? feelings.map(f => `<span class="tag hot">${f}</span>`).join('') : '<span class="tag">—</span>'}
        </div>
        <div class="bouquet-total"><span>* Total</span><b>${bouquetCount()}</b></div>
        <div class="builder-actions">
          <button class="ut-btn ut-selectable" type="button" id="clearBouquet">♥ Limpar</button>
          <button class="ut-btn ut-selectable" type="button" id="nextStep"
                  ${bouquetCount() ? '' : 'disabled style="opacity:.4"'}>PRÓXIMO →</button>
        </div>
      </section>
    </div>`;
}

function bouquetStepTwo(){
  const len = (state.message || '').length;
  const SUGGESTIONS = [
    'Para você, com todo o meu carinho.',
    'Para você, com amor.',
    'Gratidão eterna.',
    'Que a vida te traga flores.',
    'Você faz meus dias mais leves.'
  ];
  return `
    <div class="message-layout">
      <section class="builder-panel ut-box">
        <h3>Mensagem</h3>
        <textarea class="message-area" id="bouquetMessage" maxlength="180"
          placeholder="Para você, com todo o meu carinho...">${state.message}</textarea>
        <div class="counter"><span id="msgCount">${len}</span> / 180</div>
      </section>
      <section class="builder-panel ut-box">
        <h3>Sugestões</h3>
        <div class="suggestion-list">
          ${SUGGESTIONS.map(s => `<button class="suggestion ut-selectable" type="button" data-suggestion="${s.replace(/"/g, '&quot;')}">* ${s}</button>`).join('')}
        </div>
      </section>
    </div>
    <div class="builder-actions">
      <button class="ut-btn ut-selectable" type="button" data-step-go="1">← VOLTAR</button>
      <button class="ut-btn ut-selectable" type="button" data-step-go="3">PRÓXIMO →</button>
    </div>`;
}

function bouquetStepThree(){
  const items = bouquetItems();
  const feelings = bouquetFeelings();
  const list = items.length
    ? items.map(({ flower, qty }) => `<span class="tag hot">${flower.name} × ${qty}</span>`).join('')
    : '<span class="tag">—</span>';
  return `
    <div class="summary-layout">
      <section class="summary-card ut-box">
        <h3>Seu buquê</h3>
        ${bouquetVisualHTML(1)}
        <div class="tag-row" style="justify-content:center;margin-top:14px">${list}</div>
      </section>
      <section class="summary-card ut-box">
        <h3>Resumo</h3>
        <div class="tag-row" style="margin-bottom:16px">
          ${feelings.length ? feelings.map(f => `<span class="tag hot">${f}</span>`).join('') : ''}
        </div>
        <div class="summary-message">${state.message || '* Sem mensagem escrita.'}</div>
        <div class="bouquet-total"><span>* Total</span><b>${bouquetCount()}</b></div>
        <div class="builder-actions">
          <button class="ut-btn ut-selectable" type="button" data-step-go="2">← VOLTAR</button>
          <button class="ut-btn ut-selectable" type="button" id="saveBouquet">♥ SALVAR</button>
        </div>
      </section>
    </div>`;
}

async function saveBouquet(){
  if(!bouquetCount()){ showToast('Escolha ao menos uma flor'); return; }
  const flores = Object.entries(state.bouquet)
    .filter(([, q]) => q > 0)
    .map(([florId, quantidade]) => ({ flor: florId, quantidade }));
  const nome = `Buquê ${new Date().toLocaleDateString('pt-BR')}`;
  if(state.user && getToken()){
    try{
      await apiCriarBuque(nome, flores, state.message || "Sem mensagem.");
      popAt($('#saveBouquet') || document.body, '♥♥', '#c9585a');
      showToast('Buquê salvo no seu jardim ♥');
      addHistory('Novo buquê criado com ' + bouquetCount() + ' flores');
      await sincronizarDadosUsuario();
      state.bouquet = {}; state.message = ''; state.step = 1;
      setTimeout(() => go('jardim'), 500);
      return;
    }catch(e){ showToast(`Erro: ${e.message}`); }
  }
  const date = new Date().toLocaleDateString('pt-BR');
  state.savedBouquets.unshift({
    id: 'b' + Date.now(),
    flowers: { ...state.bouquet },
    message: state.message || 'Sem mensagem.',
    date
  });
  addHistory('Novo buquê criado');
  saveState();
  popAt($('#saveBouquet') || document.body, '♥♥', '#c9585a');
  showToast('Buquê salvo localmente ♥');
  state.bouquet = {}; state.message = ''; state.step = 1;
  setTimeout(() => go('jardim'), 500);
}

/* ==========================================================================
   13. JARDIM
   ========================================================================== */
function renderGarden(){
  renderStats();
  renderGardenTabs();
  renderGardenBody();
  const greeting = $('#gardenGreeting');
  if(greeting){
    const lines = [
      '* Suas flores favoritas moram aqui.',
      '* Cada buquê guardado é uma memória viva.',
      '* Você regou bem o seu jardim.'
    ];
    typewrite(greeting, lines[Math.floor(Math.random() * lines.length)]);
  }
}

function renderStats(){
  const favCount  = state.favorites.size;
  const bouqCount = state.savedBouquets.length;
  const msgCount  = state.savedBouquets.filter(b => b.message && b.message !== 'Sem mensagem.').length;
  const el = $('#statsRow');
  if(!el) return;
  el.innerHTML = `
    <div class="stat-card"><span class="ico">♥</span><div><b>${favCount}</b><small>* favoritas</small></div></div>
    <div class="stat-card"><span class="ico">💐</span><div><b>${bouqCount}</b><small>* buquês</small></div></div>
    <div class="stat-card"><span class="ico">✉️</span><div><b>${msgCount}</b><small>* mensagens</small></div></div>`;
}

function renderGardenTabs(){
  const tabs = [
    { id: 'todas',     label: '* Meu Jardim' },
    { id: 'favoritos', label: '* Favoritos' },
    { id: 'buques',    label: '* Meus Buquês' },
    { id: 'historico', label: '* Histórico' }
  ];
  const el = $('#gardenTabs');
  if(!el) return;
  el.innerHTML = tabs.map(t => `
    <button type="button" class="ut-selectable ${state.gardenTab === t.id ? 'active' : ''}" data-garden-tab="${t.id}">${t.label}</button>
  `).join('');
}

function renderGardenBody(){
  const body = $('#gardenBody');
  if(!body) return;
  if(state.gardenTab === 'buques'){
    body.innerHTML = state.savedBouquets.length
      ? `<div class="bouquet-cards">${state.savedBouquets.map(bouquetCardHTML).join('')}</div>`
      : emptyState('💐', '* Você ainda não criou nenhum buquê.');
    return;
  }
  if(state.gardenTab === 'historico'){
    body.innerHTML = state.history.length
      ? `<div class="bouquet-cards">${state.history.map(h => `
          <div class="bouquet-card">
            <p class="ut-dialogue" style="font-size:20px">${h.text}</p>
            <time>${h.date}</time>
          </div>`).join('')}</div>`
      : emptyState('🕘', '* Sem histórico por enquanto.');
    return;
  }
  const list = state.gardenTab === 'favoritos'
    ? FLOWERS.filter(f => state.favorites.has(f.id))
    : FLOWERS.slice(0, 12);
  body.innerHTML = list.length
    ? `<div class="garden-grid">${list.map(f => `
        <button class="garden-item ut-selectable" type="button" data-flower-open="${f.id}">
          ${flowerArt(f, 56)}
          <strong>${f.name}</strong><small>${f.meanings[0] || ''}</small>
        </button>`).join('')}</div>`
    : emptyState('🌱', '* Nenhuma flor aqui ainda.');
}

function bouquetCardHTML(b){
  const items = Object.entries(b.flowers || {}).map(([id, qty]) => ({
    flower: flowerById(id), qty
  })).filter(x => x.flower);
  const flat = [];
  items.forEach(({ flower, qty }) => { for(let i = 0; i < Math.min(qty, 8); i++) flat.push(flower); });
  const GOLDEN = 137.508;
  const spans = flat.map((f, i) => {
    const angle = i * GOLDEN;
    const radius = (i === 0 ? 0 : 20 + 10 * Math.sqrt(i)) * 0.75;
    const z = 100 - i;
    const fs = Math.max(0.65, 1 - (i / (flat.length * 1.6)));
    return `<span style="--a:${angle}deg; --r:${radius}px; --z:${z}; --s:${fs.toFixed(2)}" title="${f.name}">${f.emoji}</span>`;
  }).join('');
  return `<article class="bouquet-card">
    <div class="bouquet-visual">${spans}</div>
    <blockquote>${b.message}</blockquote>
    <time>${b.date}</time>
  </article>`;
}

const emptyState = (ico, text) => `<div class="empty-state"><span class="ico">${ico}</span>${text}</div>`;

/* ==========================================================================
   14. QUIZ
   ========================================================================== */
const QUIZ = [
  { q:'O que te faz sorrir logo ao acordar?', options:[
    { t:'Uma mensagem de quem eu amo', f:'Amor' },
    { t:'A luz do sol entrando pela janela', f:'Alegria' },
    { t:'O silêncio tranquilo da manhã', f:'Tranquilidade' },
    { t:'Um novo plano para o dia', f:'Esperança' }]},
  { q:'Qual dessas cores mais combina com você?', options:[
    { t:'Vermelho intenso', f:'Amor' },
    { t:'Amarelo vibrante', f:'Alegria' },
    { t:'Verde suave', f:'Amizade' },
    { t:'Lilás calmo', f:'Tranquilidade' }]},
  { q:'Qual sentimento mais representa você?', options:[
    { t:'Amor', f:'Amor' },
    { t:'Alegria', f:'Alegria' },
    { t:'Tranquilidade', f:'Tranquilidade' },
    { t:'Esperança', f:'Esperança' }]},
  { q:'O que você faria por um amigo?', options:[
    { t:'Qualquer coisa, sem pensar', f:'Amizade' },
    { t:'Estaria ao lado em silêncio', f:'Tranquilidade' },
    { t:'Faria uma surpresa enorme', f:'Alegria' },
    { t:'Daria forças para recomeçar', f:'Esperança' }]},
  { q:'Qual lembrança você guarda com carinho?', options:[
    { t:'Um abraço apertado', f:'Amor' },
    { t:'Uma risada compartilhada', f:'Alegria' },
    { t:'Uma tarde sem pressa', f:'Tranquilidade' },
    { t:'Uma conversa que mudou tudo', f:'Amizade' }]},
  { q:'Que mensagem você gostaria de deixar?', options:[
    { t:'"Eu te amo mais do que consigo dizer."', f:'Amor' },
    { t:'"Obrigado(a) por existir."', f:'Amizade' },
    { t:'"Vai dar tudo certo."', f:'Esperança' },
    { t:'"Respire. Você está bem."', f:'Tranquilidade' }]}
];

function renderQuiz(){
  const wrap = $('#quizWrap');
  if(!wrap) return;
  if(state.quizResult){
    const feel = feelingById(state.quizResult) || FEELINGS[0];
    const flower = FLOWERS.find(f => f.feelings.includes(feel.id)) || FLOWERS[0];
    wrap.innerHTML = `
      <div class="quiz-result">
        ${flower ? flowerArt(flower, 96) : ''}
        <h2>RESULTADO: ${feel.label} ${feel.emoji}</h2>
        <p>${feel.desc}<br>A flor que combina é <strong style="color:#d4af37">${flower ? flower.name : '—'}</strong>.</p>
        ${flower ? `<button class="ut-btn ut-selectable" type="button" data-flower-open="${flower.id}">♥ VER ESSA FLOR</button>` : ''}
        <button class="ut-btn ut-selectable" type="button" id="restartQuiz" style="margin-top:12px">REFAZER</button>
      </div>`;
    return;
  }
  const q = QUIZ[state.quizIndex];
  const pct = (state.quizIndex / QUIZ.length) * 100;
  wrap.innerHTML = `
    <div class="quiz-progress">
      <span>* Pergunta ${state.quizIndex + 1} de ${QUIZ.length}</span>
      <div class="quiz-bar"><i style="width:${pct}%"></i></div>
    </div>
    <h2 class="quiz-question">${q.q}</h2>
    <div class="quiz-options">
      ${q.options.map(o => `<button class="quiz-option ut-selectable" type="button" data-quiz="${o.f}">${o.t}</button>`).join('')}
    </div>`;
}

function answerQuiz(feeling){
  state.quizScores[feeling] = (state.quizScores[feeling] || 0) + 1;
  if(state.quizIndex < QUIZ.length - 1){
    state.quizIndex++;
    renderQuiz();
    resetSoulFocus();
    return;
  }
  const winner = Object.entries(state.quizScores).sort((a, b) => b[1] - a[1])[0][0];
  state.quizResult = winner;
  addHistory('Quiz floral concluído');
  saveState();
  renderQuiz();
}

/* ==========================================================================
   15. FAVORITOS
   ========================================================================== */
async function toggleFavorite(id){
  const f = flowerById(id);
  if(!f) return;
  const btns = $$(`[data-fav="${id}"]`);
  const btn = btns[0] || null;
  const tinha = state.favorites.has(id);
  if(tinha) state.favorites.delete(id);
  else      state.favorites.add(id);
  btns.forEach(b => {
    if(b.classList.contains('fav-btn')) b.classList.toggle('on', state.favorites.has(id));
  });
  if(state.user && getToken()){
    try{
      if(tinha) await apiRemFavorito(id);
      else      await apiAddFavorito(id);
      showToast(`${f.name} ${tinha ? 'removida' : 'adicionada'} dos favoritos`);
      if(!tinha && btn) popAt(btn, '♥', '#c9585a');
    }catch(e){
      if(tinha) state.favorites.add(id);
      else      state.favorites.delete(id);
      showToast(`Erro: ${e.message}`);
    }
  }else{
    showToast(`${f.name} ${tinha ? 'removida' : 'adicionada'} dos favoritos`);
    if(!tinha && btn) popAt(btn, '♥', '#c9585a');
  }
  saveState();
  if(state.route === 'flor') renderFlowerDetail(id);
}

/* ==========================================================================
   16. SIDEBAR
   ========================================================================== */
const sidebar = $('#sidebar');
const sidebarBackdrop = $('#sidebarBackdrop');
const openSidebar = () => {
  if(sidebar){ sidebar.hidden = false; sidebarBackdrop.hidden = false; }
};
const closeSidebar = () => {
  if(sidebar){ sidebar.hidden = true; sidebarBackdrop.hidden = true; }
};
function closeMobileNav(){
  const nav = $('#mobileNav'), btn = $('#menuBtn');
  if(nav) nav.classList.remove('open');
  if(btn) btn.setAttribute('aria-expanded', 'false');
}

/* ==========================================================================
   17. LOGIN UI
   ========================================================================== */
function updateLoginUI(){
  const enterBtn = $('#enterBtn');
  const avatarBtn = $('#avatarBtn');
  const adminBtn = $('#adminBtn');
  const sidebarAdmin = $('#sidebarAdmin');
  const userName = $('#userName');
  const userLevel = $('#userLevel');

  if(state.user){
    if(enterBtn) enterBtn.hidden = true;
    if(avatarBtn) avatarBtn.hidden = false;
    if(userName) userName.textContent = (state.user.name || '').toUpperCase();
    const isAdmin = state.user.perfil === "admin";
    if(adminBtn) adminBtn.hidden = !isAdmin;
    if(sidebarAdmin) sidebarAdmin.hidden = !isAdmin;
    if(userLevel) userLevel.textContent = isAdmin ? '* LV 99 · Administrador' : '* LV 5 · Jardineira';
  }else{
    if(enterBtn) enterBtn.hidden = false;
    if(avatarBtn) avatarBtn.hidden = true;
    if(adminBtn) adminBtn.hidden = true;
    if(sidebarAdmin) sidebarAdmin.hidden = true;
    if(userName) userName.textContent = 'VISITANTE';
    if(userLevel) userLevel.textContent = '* LV 1 · Visitante';
  }
}

/* ==========================================================================
   18. AUTH
   ========================================================================== */
async function registerUser(name, email, password){
  try{
    await apiRegister(name, email, password);
    return await loginUser(email, password);
  }catch(e){ return { ok:false, msg:e.message }; }
}
async function loginUser(email, password){
  try{
    const data = await apiLogin(email, password);
    setToken(data.token);
    return {
      ok: true,
      user: {
        name:   data.usuario.nome,
        email:  data.usuario.email,
        perfil: data.usuario.perfil
      }
    };
  }catch(e){ return { ok:false, msg:e.message }; }
}
function logoutUser(){
  setToken(null);
  state.user = null;
  state.favorites = new Set();
  state.savedBouquets = [];
  saveState();
}
async function sincronizarDadosUsuario(){
  try{
    const [favs, buques] = await Promise.all([apiListarFavoritos(), apiListarBuques()]);
    state.favorites = new Set((favs || []).map(f => (f.flor && f.flor._id) ? f.flor._id : f.flor));
    state.savedBouquets = (buques || []).map(b => ({
      id: b._id,
      flowers: Object.fromEntries((b.flores || []).map(item => [
        (item.flor && item.flor._id) ? item.flor._id : item.flor,
        item.quantidade
      ])),
      message: b.mensagem || 'Sem mensagem.',
      date: b.createdAt ? new Date(b.createdAt).toLocaleDateString('pt-BR') : ''
    }));
  }catch(e){ console.warn('[sync] Erro:', e.message); }
}

/* ==========================================================================
   19. PORTAL — Grimório
   ========================================================================== */
function setupPortal(){
  const grimoire = $('#grimoire');
  const portal = $('#portal');
  if(!grimoire || !portal) return;
  portal.classList.remove('closing');
  grimoire.classList.remove('open');

  const openBtn = $('#grimoireOpenBtn');
  if(openBtn && !openBtn.dataset.bound){
    openBtn.dataset.bound = '1';
    openBtn.addEventListener('click', () => {
      grimoire.classList.add('open');
      setTimeout(() => { const f = $('#portalLoginEmail'); if(f) f.focus(); }, 1100);
    });
  }
  $$('[data-portal-tab]').forEach(tab => {
    if(tab.dataset.bound) return;
    tab.dataset.bound = '1';
    tab.addEventListener('click', () => {
      const which = tab.dataset.portalTab;
      $$('.page-tab').forEach(b => b.classList.toggle('active', b.dataset.portalTab === which));
      $$('.page-panel').forEach(p => p.hidden = p.dataset.portalPanel !== which);
    });
  });

  const loginBtn = $('#portalDoLogin');
  if(loginBtn && !loginBtn.dataset.bound){
    loginBtn.dataset.bound = '1';
    loginBtn.addEventListener('click', async () => {
      const email = $('#portalLoginEmail').value;
      const pass  = $('#portalLoginPass').value;
      const msg   = $('#portalLoginMsg');
      if(!email || !pass){ setPortalMsg(msg, 'Preencha e-mail e senha.', false); return; }
      loginBtn.disabled = true;
      const res = await loginUser(email, pass);
      loginBtn.disabled = false;
      if(!res.ok){ setPortalMsg(msg, res.msg, false); return; }
      state.user = res.user;
      await sincronizarDadosUsuario();
      updateLoginUI();
      saveState();
      setPortalMsg(msg, '', false);
      enterGarden(`Bem-vindo(a), ${state.user.name} ♥`);
    });
  }

  const regBtn = $('#portalDoRegister');
  if(regBtn && !regBtn.dataset.bound){
    regBtn.dataset.bound = '1';
    regBtn.addEventListener('click', async () => {
      const name  = $('#portalRegName').value;
      const email = $('#portalRegEmail').value;
      const pass  = $('#portalRegPass').value;
      const pass2 = $('#portalRegPass2').value;
      const msg   = $('#portalRegisterMsg');
      if(pass !== pass2){ setPortalMsg(msg, 'As senhas não coincidem.', false); return; }
      regBtn.disabled = true;
      const res = await registerUser(name, email, pass);
      regBtn.disabled = false;
      if(!res.ok){ setPortalMsg(msg, res.msg, false); return; }
      state.user = res.user;
      await sincronizarDadosUsuario();
      updateLoginUI();
      saveState();
      setPortalMsg(msg, '', true);
      enterGarden(`Conta criada. Bem-vindo(a), ${state.user.name} ♥`);
    });
  }

  ['portalLoginEmail','portalLoginPass','portalRegName','portalRegEmail','portalRegPass','portalRegPass2']
    .forEach(id => {
      const el = document.getElementById(id);
      if(!el || el.dataset.bound) return;
      el.dataset.bound = '1';
      el.addEventListener('keydown', e => {
        if(e.key === 'Enter'){
          e.preventDefault();
          const isLogin = id.startsWith('portalLogin');
          const btn = isLogin ? $('#portalDoLogin') : $('#portalDoRegister');
          if(btn) btn.click();
        }
      });
    });
}

function setPortalMsg(el, msg, ok){
  if(!el) return;
  el.textContent = msg ? '✦ ' + msg : '';
  el.classList.toggle('err', !ok);
  el.classList.toggle('ok', !!ok);
}

function enterGarden(toastMsg){
  const portal = $('#portal');
  const grimoire = $('#grimoire');
  if(!portal || !grimoire){
    document.body.classList.add('entered');
    if(toastMsg) showToast(toastMsg);
    return;
  }
  grimoire.classList.remove('open');
  setTimeout(() => portal.classList.add('closing'), 800);
  setTimeout(() => {
    document.body.classList.add('entered');
    if(toastMsg) showToast(toastMsg);
    window.scrollTo({ top: 0, behavior: 'auto' });
    renderHome();
  }, 1300);
}

/* ==========================================================================
   20. ADMIN — Painel
   ========================================================================== */
function renderAdmin(){
  if(!state.user || state.user.perfil !== "admin"){
    showToast("Acesso negado. Apenas administradores.");
    go('inicio');
    return;
  }
  $$('#adminTabs button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.adminTab === state.adminTab);
  });
  const body = $('#adminBody');
  if(!body) return;
  if(state.adminTab === 'flores'){ body.innerHTML = adminFloresHTML(); }
  else if(state.adminTab === 'significados'){ body.innerHTML = adminSignificadosHTML(); carregarSignificadosAdmin(); }
  else if(state.adminTab === 'ocasioes'){ body.innerHTML = adminOcasioesHTML(); carregarOcasioesAdmin(); }
}

function adminFloresHTML(){
  const lista = FLOWERS.map(f => `
    <tr>
      <td>${f.emoji} ${f.name}</td>
      <td><small>${f.sci}</small></td>
      <td>${(f.colors || []).join(', ')}</td>
      <td>R$ ${(f.preco || 0).toFixed(2)}</td>
      <td>
        <button class="ut-btn ut-selectable" data-admin-edit-flor="${f.id}">✏️ Editar</button>
        <button class="ut-btn ut-selectable" data-admin-del-flor="${f.id}">🗑️ Excluir</button>
      </td>
    </tr>`).join('');
  return `
    <section class="ut-box" style="padding:20px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:12px;flex-wrap:wrap">
        <h3 class="ut-dialogue" style="font-size:20px">* Catálogo de Flores (${FLOWERS.length})</h3>
        <button class="ut-btn ut-selectable" id="adminNovaFlor">+ NOVA FLOR</button>
      </div>
      <div style="overflow-x:auto">
        <table class="admin-table">
          <thead><tr><th>Nome</th><th>Espécie</th><th>Cores</th><th>Preço</th><th>Ações</th></tr></thead>
          <tbody>${lista}</tbody>
        </table>
      </div>
    </section>`;
}

function adminSignificadosHTML(){
  return `
    <section class="ut-box" style="padding:20px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:12px;flex-wrap:wrap">
        <h3 class="ut-dialogue" style="font-size:20px">* Significados</h3>
        <button class="ut-btn ut-selectable" id="adminNovoSignificado">+ NOVO</button>
      </div>
      <div id="adminSignificadosLista">* Carregando...</div>
    </section>`;
}

function adminOcasioesHTML(){
  return `
    <section class="ut-box" style="padding:20px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:12px;flex-wrap:wrap">
        <h3 class="ut-dialogue" style="font-size:20px">* Ocasiões</h3>
        <button class="ut-btn ut-selectable" id="adminNovaOcasiao">+ NOVA</button>
      </div>
      <div id="adminOcasioesLista">* Carregando...</div>
    </section>`;
}

async function carregarSignificadosAdmin(){
  const wrap = $('#adminSignificadosLista');
  if(!wrap) return;
  try{
    const lista = await apiAdminListarSignificados();
    wrap.innerHTML = lista.length ? `
      <div style="overflow-x:auto">
        <table class="admin-table">
          <thead><tr><th>Nome</th><th>Descrição</th><th>Ações</th></tr></thead>
          <tbody>${lista.map(s => `
            <tr>
              <td>${s.nome}</td>
              <td>${s.descricao}</td>
              <td>
                <button class="ut-btn ut-selectable" data-admin-edit-sig="${s._id}" data-sig-name="${s.nome}" data-sig-desc="${s.descricao}">✏️</button>
                <button class="ut-btn ut-selectable" data-admin-del-sig="${s._id}">🗑️</button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>` : '<p class="ut-dialogue">* Nenhum significado cadastrado.</p>';
  }catch(e){
    wrap.innerHTML = `<p class="ut-dialogue">* Erro: ${e.message}</p>`;
  }
}

async function carregarOcasioesAdmin(){
  const wrap = $('#adminOcasioesLista');
  if(!wrap) return;
  try{
    const lista = await apiAdminListarOcasioes();
    wrap.innerHTML = lista.length ? `
      <div style="overflow-x:auto">
        <table class="admin-table">
          <thead><tr><th>Nome</th><th>Descrição</th><th>Ações</th></tr></thead>
          <tbody>${lista.map(o => `
            <tr>
              <td>${o.nome}</td>
              <td>${o.descricao || ''}</td>
              <td>
                <button class="ut-btn ut-selectable" data-admin-edit-occ="${o._id}" data-occ-name="${o.nome}" data-occ-desc="${o.descricao || ''}">✏️</button>
                <button class="ut-btn ut-selectable" data-admin-del-occ="${o._id}">🗑️</button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>` : '<p class="ut-dialogue">* Nenhuma ocasião cadastrada.</p>';
  }catch(e){
    wrap.innerHTML = `<p class="ut-dialogue">* Erro: ${e.message}</p>`;
  }
}

function adminFormModal(titulo, campos, onSave){
  const backdrop = document.createElement('div');
  backdrop.className = 'admin-modal-backdrop';
  backdrop.innerHTML = `
    <div class="admin-modal ut-box">
      <h3 class="ut-dialogue" style="font-size:22px;margin-bottom:16px">* ${titulo}</h3>
      <form id="adminForm">
        ${campos.map(c => `
          <label class="page-field">
            <span>✦ ${c.label}</span>
            <input class="page-input" name="${c.name}" type="${c.type || 'text'}"
                   value="${c.value ?? ''}" ${c.required ? 'required' : ''}
                   ${c.type === 'number' ? 'step="0.01"' : ''}>
          </label>`).join('')}
        <div style="display:flex;gap:10px;margin-top:16px">
          <button type="submit" class="page-submit" style="flex:1"><span class="heart">♥</span> SALVAR</button>
          <button type="button" class="ut-btn ut-selectable" id="adminCancel">Cancelar</button>
        </div>
      </form>
    </div>`;
  document.body.appendChild(backdrop);
  backdrop.querySelector('#adminCancel').onclick = () => backdrop.remove();
  backdrop.querySelector('#adminForm').onsubmit = async (e) => {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(e.target).entries());
    try{
      await onSave(dados);
      backdrop.remove();
      showToast("Salvo com sucesso ✦");
    }catch(err){
      showToast(`Erro: ${err.message}`);
    }
  };
}

async function recarregarCatalogo(){
  try{
    const listaApi = await apiListarFlores();
    if(listaApi?.length){
      const local = FLOWERS.slice();
      FLOWERS.length = 0;
      listaApi.forEach(f => {
        const loc = local.find(x => x.name === f.nome);
        FLOWERS.push({
          id: f.id, name: f.nome, sci: f.especie,
          emoji: f.emoji || loc?.emoji || "🌸",
          file:  f.file  || loc?.file  || "",
          feelings: f.feelings?.length ? f.feelings : (loc?.feelings || []),
          meanings: f.meanings?.length ? f.meanings : (loc?.meanings || []),
          colors:   f.colors?.length   ? f.colors   : [f.cor],
          category: f.category || loc?.category || "",
          origin:   f.origin   || loc?.origin   || "",
          season:   f.season   || loc?.season   || "",
          about:    f.descricao|| loc?.about    || "",
          occasions:f.occasions?.length? f.occasions: (loc?.occasions || []),
          preco: f.preco, estoque: f.estoque
        });
      });
      renderHome();
    }
  }catch(e){ /* silencioso */ }
}

/* ==========================================================================
   21. EVENTOS GLOBAIS
   ========================================================================== */
document.addEventListener('click', async (event) => {
  const t = event.target;

  // Favoritos
  const favBtn = t.closest('[data-fav]');
  if(favBtn){
    event.preventDefault(); event.stopPropagation();
    toggleFavorite(favBtn.dataset.fav);
    return;
  }
  // Abrir flor
  const flowerOpen = t.closest('[data-flower-open]');
  if(flowerOpen){
    event.preventDefault();
    go('flor', { id: flowerOpen.dataset.flowerOpen });
    return;
  }
  // Navegação por data-route
  const routeEl = t.closest('[data-route]');
  if(routeEl){ event.preventDefault(); go(routeEl.dataset.route); return; }

  /* ============ ADMIN ============ */
  if(t.closest('#adminBtn') || t.closest('#sidebarAdmin')){
    closeSidebar();
    go('admin');
    return;
  }
  const adminTabBtn = t.closest('[data-admin-tab]');
  if(adminTabBtn){
    state.adminTab = adminTabBtn.dataset.adminTab;
    renderAdmin();
    return;
  }
  if(t.closest('#adminNovaFlor')){
    adminFormModal("Nova Flor", [
      { name:"nome",    label:"Nome",      required:true },
      { name:"especie", label:"Espécie",   required:true },
      { name:"cor",     label:"Cor principal", required:true },
      { name:"emoji",   label:"Emoji" },
      { name:"descricao", label:"Descrição" },
      { name:"preco",   label:"Preço",   type:"number", required:true },
      { name:"estoque", label:"Estoque", type:"number", required:true }
    ], async (dados) => {
      dados.preco = Number(dados.preco);
      dados.estoque = Number(dados.estoque);
      await apiAdminCriarFlor(dados);
      await recarregarCatalogo();
      renderAdmin();
    });
    return;
  }
  const editFlor = t.closest('[data-admin-edit-flor]');
  if(editFlor){
    const f = FLOWERS.find(x => x.id === editFlor.dataset.adminEditFlor);
    adminFormModal("Editar Flor", [
      { name:"nome",    label:"Nome",      value:f.name, required:true },
      { name:"especie", label:"Espécie",   value:f.sci,  required:true },
      { name:"cor",     label:"Cor principal", value:(f.colors && f.colors[0]) || f.cor || "", required:true },
      { name:"emoji",   label:"Emoji",     value:f.emoji },
      { name:"descricao", label:"Descrição", value:f.about },
      { name:"preco",   label:"Preço",   type:"number", value:f.preco || 0 },
      { name:"estoque", label:"Estoque", type:"number", value:f.estoque || 0 }
    ], async (dados) => {
      dados.preco = Number(dados.preco);
      dados.estoque = Number(dados.estoque);
      await apiAdminAtualizarFlor(f.id, dados);
      await recarregarCatalogo();
      renderAdmin();
    });
    return;
  }
  const delFlor = t.closest('[data-admin-del-flor]');
  if(delFlor){
    if(!confirm("Excluir esta flor?")) return;
    try{
      await apiAdminExcluirFlor(delFlor.dataset.adminDelFlor);
      await recarregarCatalogo();
      renderAdmin();
      showToast("Flor excluída.");
    }catch(e){ showToast(`Erro: ${e.message}`); }
    return;
  }
  if(t.closest('#adminNovoSignificado')){
    adminFormModal("Novo Significado", [
      { name:"nome", label:"Nome", required:true },
      { name:"descricao", label:"Descrição", required:true }
    ], async (dados) => {
      await apiAdminCriarSignificado(dados);
      carregarSignificadosAdmin();
    });
    return;
  }
  const editSig = t.closest('[data-admin-edit-sig]');
  if(editSig){
    adminFormModal("Editar Significado", [
      { name:"nome",      label:"Nome",      value: editSig.dataset.sigName, required:true },
      { name:"descricao", label:"Descrição", value: editSig.dataset.sigDesc, required:true }
    ], async (dados) => {
      await apiAdminAtualizarSignificado(editSig.dataset.adminEditSig, dados);
      carregarSignificadosAdmin();
    });
    return;
  }
  const delSig = t.closest('[data-admin-del-sig]');
  if(delSig){
    if(!confirm("Excluir este significado?")) return;
    try{
      await apiAdminExcluirSignificado(delSig.dataset.adminDelSig);
      carregarSignificadosAdmin();
      showToast("Significado excluído.");
    }catch(e){ showToast(`Erro: ${e.message}`); }
    return;
  }
  if(t.closest('#adminNovaOcasiao')){
    adminFormModal("Nova Ocasião", [
      { name:"nome", label:"Nome", required:true },
      { name:"descricao", label:"Descrição" }
    ], async (dados) => {
      await apiAdminCriarOcasiao(dados);
      carregarOcasioesAdmin();
    });
    return;
  }
  const editOcc = t.closest('[data-admin-edit-occ]');
  if(editOcc){
    adminFormModal("Editar Ocasião", [
      { name:"nome",      label:"Nome",      value: editOcc.dataset.occName, required:true },
      { name:"descricao", label:"Descrição", value: editOcc.dataset.occDesc }
    ], async (dados) => {
      await apiAdminAtualizarOcasiao(editOcc.dataset.adminEditOcc, dados);
      carregarOcasioesAdmin();
    });
    return;
  }
  const delOcc = t.closest('[data-admin-del-occ]');
  if(delOcc){
    if(!confirm("Excluir esta ocasião?")) return;
    try{
      await apiAdminExcluirOcasiao(delOcc.dataset.adminDelOcc);
      carregarOcasioesAdmin();
      showToast("Ocasião excluída.");
    }catch(e){ showToast(`Erro: ${e.message}`); }
    return;
  }
  /* ============ /ADMIN ============ */

  // Color chip
  const colorChip = t.closest('[data-color]');
  if(colorChip){
    const c = colorChip.dataset.color;
    const wasOn = state.colors.has(c);
    wasOn ? state.colors.delete(c) : state.colors.add(c);
    state.page = 1;
    const chipColor = colorChip.style.getPropertyValue('--chip-color') || '#d4af37';
    popAt(colorChip, wasOn ? '−' : '+', wasOn ? '#8b6b8b' : chipColor);
    const total = getFilteredFlowers().length;
    const corLabel = (COLORS.find(x => x.id === c) || {}).label || c;
    showToast(wasOn ? `${corLabel} removida — ${total} flores` : `${corLabel} — ${total} flores`);
    renderColorFilters();
    renderCatalogResults();
    return;
  }

  const pageBtn = t.closest('[data-page]');
  if(pageBtn && !pageBtn.disabled){
    state.page = Number(pageBtn.dataset.page);
    renderCatalogResults();
    return;
  }

  const feelingCard = t.closest('[data-feeling]');
  if(feelingCard){
    const feelingId = feelingCard.dataset.feeling;
    state.meanings.clear();
    state.meanings.add(feelingId);
    state.page = 1;
    $$('.feeling-card').forEach(c => c.classList.remove('active'));
    feelingCard.classList.add('active');
    const f = feelingById(feelingId);
    popAt(feelingCard, '♥', f.color);
    showToast(`Mostrando flores de ${f.label}...`);
    setTimeout(() => go('flores'), 400);
    return;
  }

  const addBtn = t.closest('[data-add-bouquet]');
  if(addBtn){
    const id = addBtn.dataset.addBouquet;
    state.bouquet[id] = (state.bouquet[id] || 0) + 1;
    popAt(addBtn, '+1', '#d4af37');
    showToast(`${flowerById(id).name} adicionada`);
    return;
  }

  const qtyBtn = t.closest('[data-qty]');
  if(qtyBtn){
    const id = qtyBtn.dataset.id;
    const delta = Number(qtyBtn.dataset.qty);
    state.bouquet[id] = Math.max(0, (state.bouquet[id] || 0) + delta);
    if(!state.bouquet[id]) delete state.bouquet[id];
    if(delta > 0) popAt(qtyBtn, '+1', '#d4af37');
    renderBouquet();
    return;
  }

  const stepGo = t.closest('[data-step-go]');
  if(stepGo){ state.step = Number(stepGo.dataset.stepGo); renderBouquet(); return; }

  const suggestion = t.closest('[data-suggestion]');
  if(suggestion){ state.message = suggestion.dataset.suggestion; renderBouquet(); return; }

  const gardenTab = t.closest('[data-garden-tab], [data-jardim-tab]');
  if(gardenTab){
    const tabId = gardenTab.dataset.gardenTab || gardenTab.dataset.jardimTab;
    if(tabId){
      state.gardenTab = tabId;
      closeSidebar();
      if(state.route !== 'jardim') go('jardim');
      else renderGarden();
      return;
    }
  }

  const occOpen = t.closest('[data-occasion-open]');
  if(occOpen){
    state.occasion = occOpen.dataset.occasionOpen;
    state.page = 1;
    go('flores');
    return;
  }

  const quizAnswer = t.closest('[data-quiz]');
  if(quizAnswer){ answerQuiz(quizAnswer.dataset.quiz); return; }

  if(t.closest('[data-sidebar]')){ openSidebar(); return; }
  if(t.closest('#menuBtn')){
    const nav = $('#mobileNav');
    const open = nav.classList.toggle('open');
    $('#menuBtn').setAttribute('aria-expanded', String(open));
    return;
  }
  if(t.closest('#sidebarConfig')){ showToast('Configurações em breve'); return; }
  if(t.closest('#sidebarLogout')){
    logoutUser();
    updateLoginUI();
    closeSidebar();
    document.body.classList.remove('entered');
    showToast('Você saiu do jardim');
    setupPortal();
    return;
  }
  if(t.closest('#clearFilters')){
    state.query = ''; state.colors.clear(); state.meanings.clear();
    state.occasion = 'Todas'; state.page = 1;
    const s = $('#flowerSearch'); if(s) s.value = '';
    renderCatalog();
    showToast('Filtros limpos');
    return;
  }
  if(t.closest('#clearBouquet')){ state.bouquet = {}; renderBouquet(); return; }
  if(t.closest('#nextStep')){
    if(!bouquetCount()){ showToast('Escolha ao menos uma flor'); return; }
    state.step = 2; renderBouquet();
    return;
  }
  if(t.closest('#saveBouquet')){ saveBouquet(); return; }
  if(t.closest('#restartQuiz')){
    state.quizIndex = 0; state.quizResult = null; state.quizScores = {};
    renderQuiz();
    return;
  }
  if(t.closest('#avatarBtn')){ openSidebar(); return; }
});

document.addEventListener('input', (event) => {
  const t = event.target;
  if(t.id === 'flowerSearch'){ state.query = t.value; state.page = 1; renderCatalogResults(); }
  if(t.id === 'bouquetMessage'){
    state.message = t.value;
    const counter = $('#msgCount');
    if(counter) counter.textContent = t.value.length;
  }
});

document.addEventListener('change', (event) => {
  const t = event.target;
  if(t.matches('[data-meaning]')){
    const m = t.dataset.meaning;
    t.checked ? state.meanings.add(m) : state.meanings.delete(m);
    state.page = 1;
    renderCatalogResults();
  }
  if(t.id === 'occasionFilter'){
    state.occasion = t.value;
    state.page = 1;
    renderCatalogResults();
  }
});

if(sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);
$$('#mobileNav a').forEach(a => a.addEventListener('click', closeMobileNav));

document.addEventListener('focusin', (e) => {
  if(!e.target.classList.contains('ut-selectable')) return;
  $$('.soul-active').forEach(el => { if(el !== e.target) el.classList.remove('soul-active'); });
  e.target.classList.add('soul-active');
});

/* ==========================================================================
   22. INIT
   ========================================================================== */
async function init(){
  loadState();

  // 1) Carrega catálogo do backend
  try{
    const listaApi = await apiListarFlores();
    if(listaApi && listaApi.length){
      const CATALOGO_LOCAL = [...FLOWERS];
      FLOWERS.length = 0;
      listaApi.forEach(f => {
        const local = CATALOGO_LOCAL.find(x => x.name === f.nome);
        FLOWERS.push({
          id: f.id, name: f.nome, sci: f.especie,
          emoji: f.emoji || local?.emoji || "🌸",
          file:  f.file  || local?.file  || "",
          feelings: f.feelings?.length ? f.feelings : (local?.feelings || []),
          meanings: f.meanings?.length ? f.meanings : (local?.meanings || []),
          colors:   f.colors?.length   ? f.colors   : [f.cor],
          category: f.category || local?.category || "",
          origin:   f.origin   || local?.origin   || "",
          season:   f.season   || local?.season   || "",
          about:    f.descricao|| local?.about    || "",
          occasions:f.occasions?.length? f.occasions: (local?.occasions || []),
          preco: f.preco, estoque: f.estoque
        });
      });
    }
  }catch(e){
    console.warn('[init] Backend offline, usando catálogo local:', e.message);
  }

  // 2) Restaura sessão
  const token = getToken();
  if(token){
    try{
      const u = await apiMe();
      state.user = {
        name:   u.nome   || "",
        email:  u.email  || "",
        perfil: u.perfil || "usuario"
      };
      await sincronizarDadosUsuario();
    }catch(err){
      if(err.message.includes("401") || err.message.includes("expirado") || err.message.includes("inválido")){
        setToken(null);
        state.user = null;
      }
    }
  }

  updateLoginUI();
  if(state.user) document.body.classList.add('entered');
  else { document.body.classList.remove('entered'); setupPortal(); }

  if(!state.history.length){
    state.history = [{ text: 'Bem-vindo(a) ao Floriografia', date: 'Hoje' }];
  }
  saveState();
  renderHome();
  await runPreloader();

  const hash = location.hash.replace('#', '') || 'inicio';
  const valid = ['inicio','flores','significados','ocasioes','buque','jardim','quiz','admin'];
  go(valid.includes(hash) ? hash : 'inicio');
}

document.addEventListener('DOMContentLoaded', init);
