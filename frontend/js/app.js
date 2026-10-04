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
