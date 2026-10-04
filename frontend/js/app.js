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
 
/* 
========================================================================== 
   1. DADOS ESTÁTICOS 
========================================================================== */ 

const FEELINGS = [ 
  { id:'Amor',          label:'Amor',          emoji:'❤',
   color:'#ef4444', file:'amor.png',          desc:'Paixão, romance e entrega.' }, 
  { id:'Alegria',       label:'Alegria',       emoji:'⭐', 
   color:'#fbbf24', file:'alegria.png',       desc:'Luz, energia e bons momentos.' }, 
  { id:'Amizade',       label:'Amizade',       emoji:'💚', 
   color:'#22c55e', file:'amizade.png',       desc:'Lealdade, parceria e cuidado.' }, 
  { id:'Saudade',       label:'Saudade',       emoji:'💧', 
   color:'#3b82f6', file:'saudade.png',       desc:'Memória, ausência e afeto.' }, 
  { id:'Tranquilidade', label:'Tranquilidade', emoji:'🟣', 
   color:'#c084fc', file:'tranquilidade.png', desc:'Paz, equilíbrio e serenidade.' }, 
  { id:'Esperança',     label:'Esperança',     emoji:'🕊', 
   color:'#f5f3ff', file:'esperanca.png',     desc:'Renovação, fé e recomeço.' }, 
  { id:'Gratidão',      label:'Gratidão',      emoji:'🙏', 
   color:'#10b981', file:'gratidao.png',      desc:'Reconhecimento, obrigado e retribuição.' }, 
  { id:'Coragem',       label:'Coragem',       emoji:'🔥', 
   color:'#dc2626', file:'coragem.png',       desc:'Força, bravura e determinação.' }, 
  { id:'Memória',       label:'Memória',       emoji:'🕯', 
   color:'#6b7280', file:'memoria.png',       desc:'Lembrança, eternidade e homenagem.' }, 
  { id:'Renovação',     label:'Renovação',     emoji:'🌱', 
   color:'#84cc16', file:'renovacao.png',     desc:'Recomeço, primavera e novo ciclo.' }, 
  { id:'Prosperidade',  label:'Prosperidade',  emoji:'🍀', 
   color:'#eab308', file:'prosperidade.png',  desc:'Abundância, sorte e conquistas.' }, 
  { id:'Admiração',     label:'Admiração',     emoji:'✨', 
   color:'#8b5cf6', file:'admiracao.png',     desc:'Respeito, encanto e reverência.' }, 
  { id:'Espiritualidade',label:'Espiritualidade',emoji:'🪷',  
   color:'#a78bfa',file:'espiritualidade.png',  desc:'Elevação, fé e conexão interior.' }, 
  { id:'Pureza',        label:'Pureza',        emoji:'🕊', 
   color:'#f8fafc', file:'pureza.png',        desc:'Inocência, sinceridade e paz.' }, 
  { id:'Paixão',        label:'Paixão',        emoji:'💋', 
   color:'#e11d48', file:'paixao.png',        desc:'Desejo, intensidade e fogo.' }, 
  { id:'Sorte',         label:'Sorte',         emoji:'🎲', 
   color:'#22c55e', file:'sorte.png',         desc:'Fortuna, acaso e bons presságios.' }, 
  { id:'Resiliência',   label:'Resiliência',   emoji:'🪨', 
   color:'#78716c', file:'resiliencia.png',   desc:'Superação, força e recomeço.' }, 
  { id:'Serenidade',    label:'Serenidade',    emoji:'🧘', 
   color:'#67e8f9', file:'serenidade.png',    desc:'Calma profunda, paz interior.' }, 
  { id:'Encanto',       label:'Encanto',       emoji:'💫', 
   color:'#f472b6', file:'encanto.png',       desc:'Fascínio, beleza e magia.' } 
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
  { id:'namorados',   label:'Dia dos Namorados',   emoji:'💘', 
   desc:'Para dizer "eu te amo" sem palavras.' }, 
  { id:'casamento',   label:'Casamento',           emoji:'💍', 
   desc:'Celebre a união com elegância.' }, 
  { id:'aniversario', label:'Aniversário',         emoji:'🎂', 
   desc:'Um parabéns que floresce.' }, 
  { id:'desculpas',   label:'Pedido de Desculpas', emoji:'🙏', 
   desc:'Quando o coração pede recomeço.' }, 
  { id:'amizade',     label:'Amizade',             emoji:'🤝', 
   desc:'Para quem caminha ao seu lado.' }, 
  { id:'gratidao',    label:'Gratidão',            emoji:'🌷', 
   desc:'Obrigado por existir na minha vida.' }, 
  { id:'condolencias',label:'Condolências',        emoji:'🕯', 
   desc:'Presença silenciosa em momento difícil.' }, 
  { id:'parabens',    label:'Parabéns',            emoji:'🎉', 
   desc:'Conquistas merecem flores.' }, 
  { id:'maes',        label:'Dia das Mães',        emoji:'󰥢', 
   desc:'Para quem te deu a vida e o cuidado.' }, 
  { id:'pais',        label:'Dia dos Pais',        emoji:'󰥙', 
   desc:'Honre quem te ensinou a caminhar.' }, 
  { id:'formatura',   label:'Formatura',           emoji:'🎓', 
   desc:'Celebre a conquista do conhecimento.' }, 
  { id:'nascimento',  label:'Nascimento',          emoji:'👶', 
   desc:'Boas-vindas a uma nova vida.' }, 
  { id:'recomeco',    label:'Recomeço',            emoji:'🌅', 
   desc:'Para novos começos e segundas chances.' }, 
  { id:'superacao',   label:'Superação',           emoji:'💪', 
   desc:'Vitória sobre desafios e obstáculos.' }, 
  { id:'despedida',   label:'Despedida',           emoji:'👋', 
   desc:'Até logo, com carinho e memória.' }, 
  { id:'boasvindas',  label:'Boas-vindas',         emoji:'🚪', 
   desc:'Receba alguém especial com alegria.' }, 
  { id:'anonovo',     label:'Ano Novo',            emoji:'🎆', 
   desc:'Renovação e esperança para o ciclo que começa.' }, 
  { id:'mulher',      label:'Dia da Mulher',       emoji:'♀ ', 
   desc:'Celebre a força e a beleza feminina.' }, 
  { id:'amigo',       label:'Dia do Amigo',        emoji:'🫂', 
   desc:'Para celebrar a amizade verdadeira.' }, 
  { id:'pascoa',      label:'Páscoa',              emoji:'🐣', 
   desc:'Renascimento e renovação da fé.' }, 
  { id:'natal',       label:'Natal',               emoji:'🎄', 
   desc:'Celebre o amor e a união em família.' }, 
  { id:'pedido',      label:'Pedido de Casamento', emoji:'💎', 
   desc:'O momento mais importante da vida a dois.' }, 
  { id:'agradecimento',label:'Agradecimento',      emoji:'💌', 
   desc:'Um obrigado especial e sincero.' }, 
  { id:'espiritual',  label:'Cerimônia Espiritual',emoji:'🕉', 
   desc:'Para momentos de fé e conexão interior.' }, 
  { id:'empresa',     label:'Homenagem Empresarial',emoji:'🏆', 
   desc:'Reconhecimento profissional e conquistas.' }, 
  { id:'solidariedade',label:'Solidariedade',      emoji:'🤲', 
   desc:'Apoio em momentos de necessidade.' } 
]; 
 
/* -------------------------------------------------------------------------- 
   Catálogo local de flores (fallback + enriquecimento) 
   -------------------------------------------------------------------------- */ 

let FLOWERS = [ 
  { id:'rosa-vermelha', name:'Rosa Vermelha', sci:'Rosa spp.', emoji:'🌹',
   file:'rosa_vermelha.png', 
    feelings:['Amor'], meanings:['Amor profundo','Paixão','Desejo','Romance'], 
    colors:['Vermelho'], category:'Amor', origin:'Ásia', season:'Primavera / Verão', 
    about:'A rosa vermelha é o símbolo máximo do amor e da paixão.', 
    occasions:['Dia dos Namorados','Casamento','Aniversário','Pedido de Desculpas'], 
preco:15.90, estoque:100 }, 
  { id:'girassol', name:'Girassol', sci:'Helianthus annuus', emoji:'🌻',
   file:'girassol.png', 
    feelings:['Alegria','Esperança'], meanings:['Alegria','Positividade','Vitalidade'], 
    colors:['Amarelo'], category:'Alegria', origin:'América do Norte', season:'Verão', 
    about:'O girassol gira em direção ao sol.', 
    occasions:['Aniversário','Amizade','Parabéns','Gratidão'], preco:12.50, estoque:80 }, 
  { id:'tulipa-rosa', name:'Tulipa Rosa', sci:'Tulipa gesneriana', emoji:'🌷', 
   file:'tulipa_rosa.png', 
    feelings:['Amor','Amizade'], meanings:['Carinho','Cuidado','Afeto'], 
    colors:['Rosa'], category:'Afeto', origin:'Ásia Central', season:'Primavera', 
    about:'A tulipa rosa fala de afeto gentil.', 
    occasions:['Amizade','Aniversário','Gratidão','Parabéns'], preco:18, estoque:60 }, 
  { id:'lavanda', name:'Lavanda', sci:'Lavandula angustifolia', emoji:'🪻',
   file:'lavanda.png', 
    feelings:['Tranquilidade','Esperança'], meanings:['Tranquilidade','Equilíbrio','Paz'], 
    colors:['Roxo','Lilás'], category:'Tranquilidade', origin:'Mediterrâneo', season:'Verão', 
    about:'A lavanda acalma os sentidos.', 
    occasions:['Condolências','Gratidão','Amizade','Dia dos Namorados'], preco:22, estoque:50 }, 
  { id:'lirio-branco', name:'Lírio Branco', sci:'Lilium candidum', emoji:'🌸', 
file:'lirio_branco.png', 
    feelings:['Esperança','Tranquilidade'], meanings:['Pureza','Inocência','Renovação'], 
    colors:['Branco'], category:'Pureza', origin:'Europa / Ásia', season:'Primavera / Verão', 
    about:'O lírio branco simboliza pureza e recomeços.', 
    occasions:['Casamento','Condolências','Gratidão','Aniversário'], preco:20, estoque:40 }, 
  { id:'peonia', name:'Peônia', sci:'Paeonia lactiflora', emoji:'🌺', 
   file:'peonia.png', 
    feelings:['Amor','Alegria'], meanings:['Prosperidade','Honra','Romance feliz'], 
    colors:['Rosa','Branco'], category:'Prosperidade', origin:'Ásia', season:'Primavera', 
    about:'A peônia é a rainha das flores.', 
    occasions:['Casamento','Parabéns','Aniversário','Dia dos Namorados'], preco:25, estoque:45 } 
]; 
 
/* -------------------------------------------------------------------------- 
   2. ESTADO 
   -------------------------------------------------------------------------- */ 

const STORAGE_KEY = 'floriografia:v15'; 
const TOKEN_KEY   = 'floriografia:token'; 
 
const state = { 
  route:'inicio', 
  query:'', 
  colors:new Set(), 
  meanings:new Set(), 
  occasion:'Todas', 
  page:1, 
  perPage:8, 
  favorites:new Set(), 
  bouquet:{}, 
  message:'', 
  step:1, 
  gardenTab:'todas', 
  currentFlower:null, 
  quizIndex:0, 
  quizResult:null, 
  quizScores:{}, 
  user:null, 
  savedBouquets:[], 
  history:[], 
  adminTab:'flores' 
}; 
 
/* ⭐ DEBUG — permite inspecionar no Console */ 
window.state = state; 
window.FLOWERS = FLOWERS; 
 
/* -------------------------------------------------------------------------- 
   3. HELPERS 
   -------------------------------------------------------------------------- */ 

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
    <div class="flower-art" data-emoji=" {size}px"> 𝑓𝑙𝑜𝑤𝑒𝑟.𝑒𝑚𝑜𝑗𝑖"𝑠𝑡𝑦𝑙𝑒="−−𝑎𝑟𝑡−𝑠𝑖𝑧𝑒:
      <img src="assets/flores/ {flower.name}" loading="lazy" 𝑓𝑙𝑜𝑤𝑒𝑟.𝑓𝑖𝑙𝑒"𝑎𝑙𝑡="
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
const randomFlavor = () => FLAVOR_LINES[Math.floor(Math.random() * 
FLAVOR_LINES.length)]; 
 
function addHistory(text){ 
  state.history.unshift({ text, date:'Agora' }); 
  state.history = state.history.slice(0, 12); 
  saveState(); 
} 
 
/* -------------------------------------------------------------------------- 
   4. PRELOADER 
   -------------------------------------------------------------------------- */ 

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

/* -------------------------------------------------------------------------- 
   5. ROTEADOR 
   -------------------------------------------------------------------------- */ 

function go(route, params = {}){ 
  state.route = route; 
  $ {route}`)); ('.𝑣𝑖𝑒𝑤').𝑓𝑜𝑟𝐸𝑎𝑐ℎ(𝑣=>𝑣.𝑐𝑙𝑎𝑠𝑠𝐿𝑖𝑠𝑡.𝑡𝑜𝑔𝑔𝑙𝑒('𝑎𝑐𝑡𝑖𝑣𝑒',𝑣.𝑖𝑑===`𝑣𝑖𝑒𝑤−
  $$('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.route === route)); 
  $$('.bottom-nav button').forEach(b => b.classList.toggle('active', b.dataset.route === 
route)); 
 
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
 
/* -------------------------------------------------------------------------- 
   6. SOUL (navegação por teclado) 
   -------------------------------------------------------------------------- */ 

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
  if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName) && e.key 
!== 'Escape') return; 
  if(e.key === 'ArrowDown' || e.key === 'ArrowRight'){ e.preventDefault(); moveSoul(1); 
return; } 
  if(e.key === 'ArrowUp'   || e.key === 'ArrowLeft'){  e.preventDefault(); moveSoul(-1); return; 
} 
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
 
/* -------------------------------------------------------------------------- 
   7. HOME 
   -------------------------------------------------------------------------- */ 

function renderHome(){ 
  const stats = { 
    flowers:   FLOWERS.length, 
    feelings:  FEELINGS.length, 
    occasions: OCCASIONS.length 
  }; 
  document.querySelectorAll('[data-stat]').forEach(el => { 
    const key = el.dataset.stat; 
    if(stats[key] != null) el.textContent = stats[key]; 
  }); 
 
  const row = $('#feelingsRow'); 
  if(!row) return; 
 
  row.innerHTML = FEELINGS.map(f => ` 
    <button class="feeling-card ut-selectable" type="button" data-feeling="𝑓.𝑖𝑑"𝑡𝑖𝑡𝑙𝑒="
{f.desc}"> 
      <span class="ico-wrap" data-emoji=" {f.color}; text-shadow:0 0 𝑓.𝑒𝑚𝑜𝑗𝑖"𝑠𝑡𝑦𝑙𝑒="𝑐𝑜𝑙𝑜𝑟:
14px {f.emoji}</span> 𝑓.𝑐𝑜𝑙𝑜𝑟;">
      <strong>${f.label}</strong> 
      <small>${f.desc}</small> 
    </button> 
  `).join(''); 
} 
 
/* -------------------------------------------------------------------------- 
   8. CATÁLOGO 
   -------------------------------------------------------------------------- */ 

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
      const hay = `${f.name} ${f.sci} ${f.meanings.join(' ')} ${f.category} ${f.feelings.join(' 
')}`.toLowerCase(); 
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
  if(rc) rc.textContent = `* {total === 1 ? '' : 'es'} encontrada${total === 1 ? '' : 's'}`; 𝑡𝑜𝑡𝑎𝑙𝑓𝑙𝑜𝑟
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
  COLORS.forEach(c => { counts[c.id] = FLOWERS.filter(f => f.colors.includes(c.id)).length; 
}); 
 
  const visibleColors = COLORS.filter(c => counts[c.id] > 0); 
  const validIds = new Set(visibleColors.map(c => c.id)); 
  [...state.colors].forEach(id => { if(!validIds.has(id)) state.colors.delete(id); }); 
 
  wrap.innerHTML = visibleColors.map(c => { 
    const on = state.colors.has(c.id); 
    const n  = counts[c.id]; 
    return ` 
      <button class="color-chip ${on ? 'on' : ''}" type="button" 
              data-color=" {on}" 𝑐.𝑖𝑑"𝑎𝑟𝑖𝑎−𝑝𝑟𝑒𝑠𝑠𝑒𝑑="
              title=" {n} flor${n === 1 ? '' : 'es'})" 𝑐.𝑙𝑎𝑏𝑒𝑙(
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
    .map(o => `<option value="${o}" {o}</option>`) 𝑠𝑡𝑎𝑡𝑒.𝑜𝑐𝑐𝑎𝑠𝑖𝑜𝑛===𝑜?'𝑠𝑒𝑙𝑒𝑐𝑡𝑒𝑑':''>
    .join(''); 
} 
 
function renderPagination(pages){ 
  const el = $('#pagination'); 
  if(!el) return; 
  if(pages <= 1){ el.innerHTML = ''; return; } 
  let html = `<button class="page-btn ut-selectable" data-page="${state.page - 1}" 
${state.page === 1 ? 'disabled' : ''}>‹</button>`; 
  for(let i = 1; i <= pages; i++){ 
    html += `<button class="page-btn ut-selectable 
{i}">${i}</button>`; 𝑖===𝑠𝑡𝑎𝑡𝑒.𝑝𝑎𝑔𝑒?'𝑎𝑐𝑡𝑖𝑣𝑒':''"𝑑𝑎𝑡𝑎−𝑝𝑎𝑔𝑒="
  } 
  html += `<button class="page-btn ut-selectable" data-page="${state.page + 1}" 
${state.page === pages ? 'disabled' : ''}>›</button>`; 
  el.innerHTML = html; 
} 
 
/* -------------------------------------------------------------------------- 
   9. DETALHE DA FLOR 
   -------------------------------------------------------------------------- */ 

function renderFlowerDetail(id){ 
  const f = flowerById(id); 
  if(!f){ go('flores'); return; } 
  state.currentFlower = id; 
  const isFav = state.favorites.has(id); 
 
  const occasionChips = f.occasions.map(label => { 
    const occ = OCCASIONS.find(o => o.label === label); 
    return `<button type="button" class="ut-selectable" data-occasion-open="${label}"> 
      <span aria-hidden="true"> {label} 𝑜𝑐𝑐?𝑜𝑐𝑐.𝑒𝑚𝑜𝑗𝑖:'🌸'</𝑠𝑝𝑎𝑛>
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
          <button class="ut-btn ut-selectable 
{f.id}"> 𝑖𝑠𝐹𝑎𝑣?'𝑠𝑒𝑙𝑒𝑐𝑡𝑒𝑑':''"𝑡𝑦𝑝𝑒="𝑏𝑢𝑡𝑡𝑜𝑛"𝑑𝑎𝑡𝑎−𝑓𝑎𝑣="
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
              return `<span class="color-dot" style="background:𝑐𝑜𝑙?𝑐𝑜𝑙.ℎ𝑒𝑥:'#𝑓𝑓𝑓'"𝑡𝑖𝑡𝑙𝑒="
{c}"></span>`; 
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
 
/* -------------------------------------------------------------------------- 
   10. SIGNIFICADOS 
   -------------------------------------------------------------------------- */ 

function renderMeanings(){ 
  const wrap = $('#meaningGroups'); 
  if(!wrap) return; 
  wrap.innerHTML = FEELINGS.map(feel => { 
    const flowers = FLOWERS.filter(f => f.feelings.includes(feel.id)); 
    if(!flowers.length) return ''; 
    return ` 
      <section class="meaning-block ut-box"> 
        <header> 
          <span class="ico" style="color: {feel.emoji}</span> 𝑓𝑒𝑒𝑙.𝑐𝑜𝑙𝑜𝑟">
          <div> 
            <h2>
𝑓𝑒𝑒𝑙.𝑙𝑎𝑏𝑒𝑙<𝑠𝑚𝑎𝑙𝑙𝑠𝑡𝑦𝑙𝑒="𝑐𝑜𝑙𝑜𝑟:#𝑑4𝑏8𝑐8;𝑓𝑜𝑛𝑡−𝑓𝑎𝑚𝑖𝑙𝑦:𝑣𝑎𝑟(−−𝑓𝑜𝑛𝑡−𝑑𝑖𝑎𝑙𝑜𝑔𝑢𝑒);𝑓𝑜𝑛𝑡−𝑠𝑖𝑧𝑒:15𝑝𝑥;
{flowers.length} flores)</small></h2> 
            <p>${feel.desc}</p> 
          </div> 
        </header> 
        <div class="mini-flower-row"> 
          ${flowers.map(f => ` 
            <button class="mini-flower ut-selectable" type="button" data-flower-open="${f.id}"> 
              ${flowerArt(f, 32)} 
              <span><strong> {f.meanings[0]}</small></span> 𝑓.𝑛𝑎𝑚𝑒</𝑠𝑡𝑟𝑜𝑛𝑔><𝑠𝑚𝑎𝑙𝑙>
            </button> 
          `).join('')} 
        </div> 
      </section>`; 
  }).join(''); 
} 
