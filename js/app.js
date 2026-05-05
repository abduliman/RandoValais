// RandoValais — Main Application
let currentPage = 'login';
let currentHikeId = null;
let currentRating = 0;
let leafletMap = null;
let miniMap = null;
let slideInterval = null;
let currentSlide = 0;
let currentDifficulty = 'all';
let currentCategory = 'all';
let hikesMap = null;
let hikesMapMarkers = [];
const EMOJI_HIKES = ['🏔️','🌲','⛰️','🏞️','🌄','🍃','🦅','🌿','🏕️','🍇','💎','🌉'];
const SWISS_SCALE = { 'Facile': 'T1', 'Moyen': 'T2 / T3', 'Difficile': 'T4+' };

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  try {
    const loader = document.getElementById('loadingIndicator');
    if (loader) loader.style.display = 'none';

    Storage.initDemo();
    initApp();
    setupNav();
    setupCounters();
    initSlideshow();
  } catch (e) {
    console.error("Initialization failed:", e);
    showPage('login');
  }
});

// ===== NAVIGATION =====
function showPage(page) {
  console.log("=== showPage called ===", page);
  currentPage = page;
  
  // Clean all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => {
    p.classList.remove('active');
    p.style.setProperty('display', 'none', 'important');
  });
  
  const pageMap = {
    home: 'homePage', hikes: 'hikesPage', map: 'mapPage',
    favorites: 'favoritesPage', profile: 'profilePage',
    detail: 'detailPage', admin: 'adminPage', login: 'loginPage'
  };
  
  const targetId = pageMap[page];
  const el = document.getElementById(targetId);
  if (el) {
    el.classList.add('active');
    if (page === 'login') {
      el.style.setProperty('display', 'flex', 'important');
    } else {
      el.style.setProperty('display', 'block', 'important');
    }
    console.log("Element activated:", el.id);
  } else {
    console.error("Target page element NOT FOUND:", targetId);
  }

  // Nav and Footer visibility
  const nav = document.getElementById('mainNav');
  const footer = document.getElementById('mainFooter');
  if (page === 'login') {
    if (nav) nav.style.display = 'none';
    if (footer) footer.style.display = 'none';
  } else {
    if (nav) nav.style.display = 'flex';
    if (footer) footer.style.display = page === 'map' ? 'none' : 'block';
  }

  // Active nav link
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navPage = (page === 'detail') ? 'hikes' : page;
  const navLink = document.querySelector(`.nav-links a[data-page="${navPage}"]`);
  if (navLink) navLink.classList.add('active');

  try {
    if (page === 'home') renderFeatured();
    if (page === 'hikes') renderHikes();
    if (page === 'map') setTimeout(() => initMap(), 100);
    if (page === 'favorites') renderFavorites();
    if (page === 'profile') renderProfile();
    if (page === 'admin') renderAdmin();
    window.scrollTo(0,0);
  } catch (err) {
    console.error("Error rendering page content:", err);
  }

  const adminLink = document.getElementById('navAdminLink');
  if (adminLink) adminLink.style.display = Storage.isAdmin() ? 'inline-block' : 'none';
}

function navigateTo(page) { window.location.hash = page; }

function goBack() {
  if (window.history.length > 1) {
    showPage('hikes');
    window.location.hash = 'hikes';
  }
}

function goToProfile() {
  const user = Storage.getUser();
  if (!user) { showPage('login'); return; }
  showPage('profile');
  window.location.hash = 'profile';
}

function goToBisses(e) {
  if (e) e.preventDefault();
  const user = Storage.getUser();
  if (!user) { showPage('login'); return; }
  currentCategory = 'Bisses';
  showPage('hikes');
  window.location.hash = 'bisses';
}

function setupNav() {
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('hike-')) {
      currentHikeId = parseInt(hash.split('-')[1]);
      showPage('detail');
      renderDetail(currentHikeId);
    } else if (hash === 'bisses') {
      currentCategory = 'Bisses';
      showPage('hikes');
    } else if (['home','hikes','map','favorites','profile','admin'].includes(hash)) {
      if (hash === 'hikes') currentCategory = 'all'; // reset if going to normal hikes
      showPage(hash);
    }
  });

  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Handle initial hash
  const hash = window.location.hash.slice(1);
  if (hash && Storage.getUser()) {
    if (hash.startsWith('hike-')) {
      currentHikeId = parseInt(hash.split('-')[1]);
      showPage('detail');
      renderDetail(currentHikeId);
    } else if (hash === 'bisses') {
      currentCategory = 'Bisses';
      showPage('hikes');
    } else {
      showPage(hash);
    }
  }
}


function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ===== LANGUAGE =====
function cycleLang() {
  const langs = ['fr', 'de', 'en'];
  const current = localStorage.getItem('rv_lang') || 'fr';
  const next = langs[(langs.indexOf(current) + 1) % langs.length];
  localStorage.setItem('rv_lang', next);
  document.getElementById('langBtn').textContent = next.toUpperCase();
  updateI18n();
  // Re-render current page
  if (currentPage === 'hikes') renderHikes();
  if (currentPage === 'home') renderFeatured();
  if (currentPage === 'detail') renderDetail(currentHikeId);
  if (currentPage === 'favorites') renderFavorites();
  if (currentPage === 'profile') renderProfile();
}

function updateI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (val && val !== key) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    const val = t(key);
    if (val && val !== key) el.placeholder = val;
  });
  // Update hero description
  const heroDesc = document.getElementById('heroDescription');
  if (heroDesc) heroDesc.textContent = t('hero.description');
}

// ===== HERO SLIDESHOW =====
function initSlideshow() {
  const container = document.getElementById('heroSlideshow');
  const indicators = document.getElementById('heroIndicators');
  if (!container || typeof HIKES === 'undefined') return;

  // Add hero panorama + all hike images
  const images = ['assets/images/hero.png', ...HIKES.map(h => h.image)];

  images.forEach((img, i) => {
    const slide = document.createElement('div');
    slide.className = 'hero-slide' + (i === 0 ? ' active' : '');
    slide.style.backgroundImage = `url('${img}')`;
    container.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    indicators.appendChild(dot);
  });

  // Auto-cycle every 6 seconds
  slideInterval = setInterval(() => {
    goToSlide((currentSlide + 1) % images.length);
  }, 6000);
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  slides[currentSlide]?.classList.remove('active');
  dots[currentSlide]?.classList.remove('active');
  currentSlide = index;
  slides[currentSlide]?.classList.add('active');
  dots[currentSlide]?.classList.add('active');
}

// ===== AUTH =====
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.auth-tab[onclick*="${tab}"]`).classList.add('active');
  document.getElementById('authLoginForm').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('authRegisterForm').style.display = tab === 'register' ? 'block' : 'none';
}

function doLogin() {
  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPassword').value;
  const res = Storage.login(email, pass);
  if (res.ok) {
    updateNavProfile(res.user);
    showPage('home');
    navigateTo('home');
    showToast(`Bon retour, ${res.user.name} ! 🏔️`);
  } else {
    document.getElementById('loginError').textContent = res.error;
  }
}

function doRegister() {
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const pass = document.getElementById('regPassword').value;
  const passConf = document.getElementById('regPasswordConfirm').value;

  if (pass !== passConf) {
    document.getElementById('regError').textContent = 'Les mots de passe ne correspondent pas';
    return;
  }

  const res = Storage.register(name, email, pass);
  if (res.ok) {
    updateNavProfile(res.user);
    showPage('home');
    navigateTo('home');
    showToast(`Bienvenue chez RandoValais, ${res.user.name} ! 🚀`);
  } else {
    document.getElementById('regError').textContent = res.error;
  }
}

function doGuest() {
  const guest = { name: 'Randonneur', email: '', avatar: 'R', joined: new Date().toISOString(), role: 'member' };
  Storage.setUser(guest);
  updateNavProfile(guest);
  showPage('home');
  navigateTo('home');
}

function updateNavProfile(user) {
  const btn = document.getElementById('navProfileBtn');
  if (user && btn) { btn.textContent = user.avatar || '👤'; }
}

// Ensure first page is rendered even if hash is empty
function initApp() {
  const user = Storage.getUser();
  if (user) {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('hike-')) {
       const id = parseInt(hash.split('-')[1]);
       showPage('detail');
       renderDetail(id);
    } else if (hash && ['home','hikes','map','favorites','profile','admin'].includes(hash)) {
       showPage(hash);
    } else {
       showPage('home');
    }
    updateNavProfile(user);
  } else {
    showPage('login');
  }
}

// ===== HIKE CARDS =====
function createHikeCard(hike) {
  const fav = Storage.isFavorite(hike.id);
  const liked = Storage.isLiked(hike.id);
  const likeCount = Storage.getLikeCount(hike.id);
  const diffColor = DIFFICULTY_COLORS[hike.difficulty] || '#666';

  return `
    <div class="hike-card fade-in" onclick="openHike(${hike.id})">
      <div class="hike-card-img">
        <img src="${hike.image}" alt="${tHike(hike.name)}" loading="lazy">
        <span class="hike-badge" style="background:${CATEGORY_COLORS[hike.category] || '#666'}">${hike.category}</span>
        <span class="hike-badge" style="background:${diffColor}">${tHike(DIFFICULTY_LABELS[hike.difficulty])} = ${SWISS_SCALE[hike.difficulty] || ''}</span>
        <button class="hike-fav-btn ${fav?'active':''}" onclick="event.stopPropagation();toggleCardFav(${hike.id},this)">
          ${fav ? '⭐' : '☆'}
        </button>
      </div>
      <div class="hike-card-body">
        <h3>${tHike(hike.name)}</h3>
        <div class="region">📍 ${hike.region}</div>
        <div class="hike-meta">
          <span>⏱️ ${hike.duration}</span>
          <span>📏 ${hike.distance} km</span>
          <span>⬆️ +${hike.elevation.up}m</span>
        </div>
      </div>
      <div class="hike-card-footer">
        <div class="hike-likes ${liked?'liked':''}">❤️ ${likeCount}</div>
        <div style="font-size:0.8rem;color:var(--gray)">💬 ${Storage.getComments(hike.id).length}</div>
      </div>
    </div>`;
}

function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) {
    console.warn("Element #featuredGrid not found");
    return;
  }
  try {
    const sorted = [...HIKES].sort((a,b) => Storage.getLikeCount(b.id) - Storage.getLikeCount(a.id));
    grid.innerHTML = sorted.slice(0,6).map(h => createHikeCard(h)).join('');
    updateI18n();
  } catch (err) {
    console.error("Error in renderFeatured:", err);
  }
}

function renderHikes(filter) {
  console.log("=== renderHikes called ===", "Filter:", filter);
  const grid = document.getElementById('hikesGrid');
  if (!grid) {
    console.error("hikesGrid element NOT FOUND");
    return;
  }
  
  try {
    let hikes = [...HIKES];
    console.log("Loaded HIKES:", hikes.length);
    
    const searchInput = document.getElementById('searchInput');
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    
    if (search) {
      hikes = hikes.filter(h =>
        tHike(h.name).toLowerCase().includes(search) ||
        h.region.toLowerCase().includes(search)
      );
    }
    
    if (currentCategory !== 'all') {
      hikes = hikes.filter(h => h.category === currentCategory);
    }
    
    if (currentDifficulty !== 'all') {
      hikes = hikes.filter(h => h.difficulty === currentDifficulty);
    }
    
    if (hikes.length > 0) {
      const html = hikes.map(h => createHikeCard(h)).join('');
      grid.innerHTML = html;
      console.log("Rendered hike cards:", hikes.length);
    } else {
      grid.innerHTML = `<p style="text-align:center;color:var(--gray);grid-column:1/-1;padding:3rem">${t('hikes.noResults')}</p>`;
      console.log("No hikes matched filters");
    }
    
    renderDifficultyFilters();
    renderCategoryFilters();
    updateI18n();
    
    updateHikesMap(hikes);
    
    // Fallback: force visibility of the hikes container just in case
    grid.style.setProperty('display', 'grid', 'important');
    grid.style.setProperty('visibility', 'visible', 'important');
    grid.style.setProperty('opacity', '1', 'important');
    
  } catch (err) {
    console.error("Critical error in renderHikes:", err);
    grid.innerHTML = `<p style="text-align:center;color:red;grid-column:1/-1;padding:3rem">Erreur lors du chargement des randonnées.</p>`;
  }
}

function updateHikesMap(hikesToDisplay) {
  const mapEl = document.getElementById('hikesMap');
  if (!mapEl) return;

  if (!hikesMap) {
    hikesMap = L.map('hikesMap').setView([46.22, 7.35], 9);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(hikesMap);
  }

  hikesMapMarkers.forEach(m => hikesMap.removeLayer(m));
  hikesMapMarkers = [];

  if (hikesToDisplay.length === 0) return;

  const bounds = L.latLngBounds();
  let hasPoints = false;

  hikesToDisplay.forEach(h => {
    if (h.coords && h.coords.length === 2) {
      const color = DIFFICULTY_COLORS[h.difficulty] || '#3B82F6';
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color:${color}; width:20px; height:20px; border-radius:50%; border:2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker(h.coords, { icon: customIcon }).addTo(hikesMap);
      marker.bindPopup(`<b>${tHike(h.name)}</b><br><span style="color:${color};font-weight:bold">${h.difficulty} = ${SWISS_SCALE[h.difficulty] || ''}</span>`);
      marker.on('click', () => { openHike(h.id); });
      hikesMapMarkers.push(marker);
      bounds.extend(h.coords);
      hasPoints = true;
    }
  });

  if (hasPoints) {
    setTimeout(() => {
      hikesMap.invalidateSize();
      hikesMap.fitBounds(bounds, { padding: [30, 30], maxZoom: 12 });
    }, 100);
  }
}

function renderDifficultyFilters() {
  const container = document.getElementById('difficultyFilters');
  if (!container) return;
  const diffs = ['all', 'Facile', 'Moyen', 'Difficile'];
  container.innerHTML = diffs.map(d =>
    `<button class="filter-btn difficulty-btn ${d===currentDifficulty?'active':''}" onclick="filterByDifficulty('${d}')">${d === 'all' ? 'Toutes difficultés' : d}</button>`
  ).join('');
}

function renderCategoryFilters() {
  const container = document.getElementById('categoryFilters');
  if (!container) return;
  const cats = ['all', ...Object.keys(CATEGORY_COLORS)];
  container.innerHTML = cats.map(c =>
    `<button class="filter-btn category-btn ${c===currentCategory?'active':''}" onclick="filterByCategory('${c}')">${c === 'all' ? 'Toutes catégories' : c}</button>`
  ).join('');
}

function filterByDifficulty(diff) {
  currentDifficulty = diff;
  renderHikes();
}

function filterByCategory(cat) {
  currentCategory = cat;
  renderHikes();
}

function filterHikes() { renderHikes(); }

function openHike(id) {
  currentHikeId = id;
  window.location.hash = `hike-${id}`;
  showPage('detail');
  renderDetail(id);
}

function toggleCardFav(id, btn) {
  const isFav = Storage.toggleFavorite(id);
  btn.classList.toggle('active', isFav);
  btn.textContent = isFav ? '⭐' : '☆';
  showToast(isFav ? '⭐ Ajouté aux favoris' : 'Retiré des favoris');
}

// ===== DETAIL PAGE =====
function renderDetail(id) {
  const hike = HIKES.find(h => h.id === id);
  if (!hike) return;

  document.getElementById('detailTitle').textContent = tHike(hike.name);
  document.getElementById('detailRegion').textContent = hike.region;
  document.getElementById('detailDesc').textContent = tHike(hike.description);
  document.getElementById('detailAccess').textContent = tHike(hike.access);
  document.getElementById('detailSeason').textContent = tHike(hike.season);

  // Set hero image
  const heroEl = document.getElementById('detailHero');
  heroEl.style.backgroundImage = `url('${hike.image}')`;
  heroEl.style.backgroundSize = 'cover';
  heroEl.style.backgroundPosition = 'center';

  // Info grid
  document.getElementById('detailInfo').innerHTML = `
    <div class="info-item"><div class="icon">⏱️</div><div class="value">${hike.duration}</div><div class="label">${t('hikes.duration')}</div></div>
    <div class="info-item"><div class="icon">📏</div><div class="value">${hike.distance} km</div><div class="label">${t('hikes.distance')}</div></div>
    <div class="info-item"><div class="icon">⬆️</div><div class="value">+${hike.elevation.up}m</div><div class="label">${t('hikes.elevation')}</div></div>
    <div class="info-item"><div class="icon">⬇️</div><div class="value">-${hike.elevation.down}m</div><div class="label">${t('hikes.elevation')}</div></div>
    <div class="info-item"><div class="icon">🔻</div><div class="value">${hike.altitude.min}m</div><div class="label">${t('detail.altMin')}</div></div>
    <div class="info-item"><div class="icon">🔺</div><div class="value">${hike.altitude.max}m</div><div class="label">${t('detail.altMax')}</div></div>
    <div class="info-item" style="background:${DIFFICULTY_COLORS[hike.difficulty]}22">
      <div class="icon" style="color:${DIFFICULTY_COLORS[hike.difficulty]}">●</div>
      <div class="value" style="color:${DIFFICULTY_COLORS[hike.difficulty]}">${hike.difficulty} = ${SWISS_SCALE[hike.difficulty] || ''}</div>
      <div class="label">${hike.difficulty}</div>
    </div>
  `;

  // Like & Fav buttons
  updateDetailButtons(id);

  // Comments
  renderComments(id);

  // Photos
  renderPhotos(id);

  // Points of Interest
  renderPOIs(id);

  // Weather
  fetchWeather(hike);

  // Calories & Equipment
  renderCalories(hike);
  renderEquipment(hike);

  // Similar hikes
  renderSimilarHikes(hike);

  // Mini map
  setTimeout(() => initMiniMap(hike), 200);

  updateI18n();
  window.scrollTo(0, 0);
}

function updateDetailButtons(id) {
  const likeBtn = document.getElementById('detailLikeBtn');
  const favBtn = document.getElementById('detailFavBtn');
  const liked = Storage.isLiked(id);
  const fav = Storage.isFavorite(id);
  likeBtn.classList.toggle('active', liked);
  favBtn.classList.toggle('active', fav);
  document.getElementById('detailLikeCount').textContent = `(${Storage.getLikeCount(id)})`;
}

function toggleDetailLike() {
  const liked = Storage.toggleLike(currentHikeId);
  updateDetailButtons(currentHikeId);
  const btn = document.getElementById('detailLikeBtn');
  btn.classList.add('pulse');
  setTimeout(() => btn.classList.remove('pulse'), 400);
}

function toggleDetailFav() {
  const fav = Storage.toggleFavorite(currentHikeId);
  updateDetailButtons(currentHikeId);
  showToast(fav ? '⭐ Ajouté aux favoris !' : 'Retiré des favoris');
}

// ===== COMMENTS =====
function setRating(n) {
  currentRating = n;
  document.querySelectorAll('#starRating span').forEach((s, i) => {
    s.classList.toggle('active', i < n);
  });
}

function renderComments(hikeId) {
  const comments = Storage.getComments(hikeId);
  const container = document.getElementById('commentsList');
  if (!comments.length) {
    container.innerHTML = `<p style="text-align:center;color:var(--gray);padding:2rem">${t('comments.noComments')}</p>`;
    return;
  }
  container.innerHTML = comments.map(c => {
    const stars = '★'.repeat(c.rating) + '☆'.repeat(5 - c.rating);
    const date = new Date(c.date).toLocaleDateString();
    return `
      <div class="comment-item fade-in">
        <div class="comment-avatar">${c.name[0]}</div>
        <div class="comment-body">
          <div class="comment-header">
            <span class="comment-name">${c.name}</span>
            <span class="comment-date">${date}</span>
          </div>
          <div class="comment-stars">${stars}</div>
          <p class="comment-text">${c.text}</p>
        </div>
      </div>`;
  }).join('');
}

function submitComment() {
  const user = Storage.getUser();
  const name = document.getElementById('commentName').value.trim() || user?.name || 'Anonyme';
  const text = document.getElementById('commentText').value.trim();
  if (!text) { showToast('Écrivez un commentaire !'); return; }
  if (!currentRating) { showToast('Donnez une note !'); return; }

  Storage.addComment(currentHikeId, { name, text, rating: currentRating });
  document.getElementById('commentName').value = '';
  document.getElementById('commentText').value = '';
  setRating(0);
  renderComments(currentHikeId);
  showToast('💬 Commentaire publié !');
}

// ===== PHOTOS =====
function renderPhotos(hikeId) {
  const photos = Storage.getPhotos(hikeId);
  const grid = document.getElementById('photosGrid');
  const uploadBtn = `<div class="photo-upload" onclick="document.getElementById('photoInput').click()">
    <span style="font-size:2rem">📷</span><span>${t('photos.add')}</span>
  </div>`;
  if (!photos.length) {
    grid.innerHTML = uploadBtn;
    return;
  }
  grid.innerHTML = photos.map(p =>
    `<div class="photo-item" onclick="openLightbox('${p.data}')">
      <img src="${p.data}" alt="${p.caption || ''}">
    </div>`
  ).join('') + uploadBtn;
}

function uploadPhoto(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      // Resize to max 800px
      const canvas = document.createElement('canvas');
      const max = 800;
      let w = img.width, h = img.height;
      if (w > max) { h = h * max / w; w = max; }
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      const data = canvas.toDataURL('image/jpeg', 0.7);
      Storage.addPhoto(currentHikeId, { data, caption: '' });
      renderPhotos(currentHikeId);
      showToast('📸 Photo ajoutée !');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
  event.target.value = '';
}

// ===== LIGHTBOX =====
function openLightbox(src) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

// ===== MAP =====
function initMap() {
  const container = document.getElementById('map');
  if (leafletMap) { leafletMap.invalidateSize(); return; }

  leafletMap = L.map('map').setView([46.19, 7.45], 9);
  L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenTopoMap, © OpenStreetMap',
    maxZoom: 17
  }).addTo(leafletMap);

  HIKES.forEach(hike => {
    const color = DIFFICULTY_COLORS[hike.difficulty];

    // Draw trail polyline
    if (hike.trail && hike.trail.length > 1) {
      L.polyline(hike.trail, {
        color: color, weight: 4, opacity: 0.8,
        dashArray: hike.difficulty === 'T1' ? null : '8 6'
      }).addTo(leafletMap);
    }

    // Custom marker
    const icon = L.divIcon({
      className: '',
      html: `<div style="background:${color};color:#fff;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:700;white-space:nowrap;box-shadow:0 2px 10px rgba(0,0,0,0.35);font-family:Outfit,sans-serif;cursor:pointer;border:2px solid white">${hike.difficulty} · ${tHike(hike.name).split(' ').slice(0,2).join(' ')}</div>`,
      iconSize: [0, 0], iconAnchor: [0, 0]
    });

    L.marker(hike.coords, { icon })
      .addTo(leafletMap)
      .bindPopup(`
        <div style="font-family:Outfit,sans-serif;min-width:220px">
          <img src="${hike.image}" alt="" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:8px">
          <strong style="font-size:15px">${tHike(hike.name)}</strong><br>
          <span style="color:#666">📍 ${hike.region}</span><br>
          <span style="font-size:13px">⏱️ ${hike.duration} · 📏 ${hike.distance}km · ⬆️+${hike.elevation.up}m</span><br>
          <a href="#hike-${hike.id}" style="color:#2D5016;font-weight:600;display:inline-block;margin-top:8px;font-size:14px">Voir détails →</a>
        </div>
      `, { maxWidth: 260 });
  });
}

function initMiniMap(hike) {
  const container = document.getElementById('detailMiniMap');
  if (!container) return;
  if (miniMap) { miniMap.remove(); miniMap = null; }
  miniMap = L.map(container, { zoomControl: false, attributionControl: false }).setView(hike.coords, 14);
  L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', { maxZoom: 17 }).addTo(miniMap);
  const color = 'red'; // Changed to red itinerary as requested
  if (hike.trail && hike.trail.length > 1) {
    L.polyline(hike.trail, { color: color, weight: 4, opacity: 0.9 }).addTo(miniMap);
    miniMap.fitBounds(L.polyline(hike.trail).getBounds().pad(0.2));
  }
  L.marker(hike.coords).addTo(miniMap);
}

// ===== FAVORITES =====
function renderFavorites() {
  const favIds = Storage.getFavorites();
  const container = document.getElementById('favsContent');
  if (!favIds.length) {
    container.innerHTML = `<div class="favs-empty"><div class="icon">⭐</div><p>${t('favorites.empty')}</p></div>`;
    return;
  }
  const favHikes = HIKES.filter(h => favIds.includes(h.id));
  container.innerHTML = `<div class="hikes-grid">${favHikes.map(h => createHikeCard(h)).join('')}</div>`;
}

// ===== PROFILE =====
function renderProfile() {
  const user = Storage.getUser();
  if (!user) { showPage('login'); return; }
  const card = document.getElementById('profileCard');
  const likesCount = Object.keys(Storage.getLikes()).length;
  const favsCount = Storage.getFavorites().length;
  const commentsCount = Storage.getAllCommentsCount();
  const photosCount = Storage.getAllPhotosCount();

  card.innerHTML = `
    <div class="profile-avatar">${user.avatar}</div>
    <h2>${user.name}</h2>
    <p style="color:var(--gray);margin-bottom:0.5rem">${user.email || ''}</p>
    <p style="color:var(--gray);font-size:0.85rem">🗓️ ${t('profile.member')} ${new Date(user.joined).toLocaleDateString()}</p>
    <div class="profile-stats">
      <div class="profile-stat"><div class="num">${likesCount}</div><div class="lbl">${t('profile.likes')}</div></div>
      <div class="profile-stat"><div class="num">${favsCount}</div><div class="lbl">${t('profile.favs')}</div></div>
      <div class="profile-stat"><div class="num">${commentsCount}</div><div class="lbl">${t('profile.comments')}</div></div>
      <div class="profile-stat"><div class="num">${photosCount}</div><div class="lbl">${t('profile.photos')}</div></div>
    </div>
    <button class="btn-logout" onclick="doLogout()">🚪 ${t('profile.logout')}</button>
  `;
}

function doLogout() {
  Storage.logout();
  showPage('login');
  window.location.hash = '';
  showToast('À bientôt sur les sentiers ! 👋');
}

// ===== COUNTERS ANIMATION =====
function setupCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(el => {
          const target = parseInt(el.dataset.count);
          animateCount(el, 0, target, 1500);
        });
        observer.unobserve(entry.target);
      }
    });
  });
  const stats = document.querySelector('.hero-stats');
  if (stats) observer.observe(stats);
}

function animateCount(el, start, end, duration) {
  const range = end - start;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(start + range * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== POINTS OF INTEREST =====
let activePOIFilter = 'all';
let currentPOIs = [];

async function renderPOIs(hikeId) {
  const container = document.getElementById('poiList');
  const filtersEl = document.getElementById('poiFilters');
  if (!container) return;

  // Get static POIs
  const staticPois = (typeof HIKE_POIS !== 'undefined' && HIKE_POIS[hikeId]) ? HIKE_POIS[hikeId] : [];

  // Show static immediately
  currentPOIs = [...staticPois];
  renderPOIList(currentPOIs, container);
  renderPOIFilters(currentPOIs, filtersEl);

  // Fetch dynamic POIs from Overpass (async)
  if (typeof fetchNearbyPOIs === 'function') {
    try {
      const autoPois = await fetchNearbyPOIs(hikeId);
      // Deduplicate by name
      const existing = new Set(staticPois.map(p => p.name.toLowerCase()));
      const unique = autoPois.filter(p => !existing.has(p.name.toLowerCase()));
      currentPOIs = [...staticPois, ...unique];
      renderPOIList(currentPOIs, container);
      renderPOIFilters(currentPOIs, filtersEl);
    } catch(e) { /* static POIs already shown */ }
  }
}

function renderPOIFilters(pois, container) {
  if (!container) return;
  const types = ['all', ...new Set(pois.map(p => p.type))];
  container.innerHTML = types.map(type => {
    const cat = type === 'all' ? { icon: '📋', color: '#666' } : (POI_CATEGORIES[type] || { icon: '📌', color: '#666' });
    const label = type === 'all' ? t('hikes.filterAll') : tHike(cat.label);
    return `<button class="poi-filter-btn ${type === activePOIFilter ? 'active' : ''}"
      style="${type === activePOIFilter ? 'background:' + cat.color : ''}"
      onclick="filterPOIs('${type}')">${cat.icon} ${label}</button>`;
  }).join('');
}

function filterPOIs(type) {
  activePOIFilter = type;
  const container = document.getElementById('poiList');
  const filtersEl = document.getElementById('poiFilters');
  renderPOIList(currentPOIs, container);
  renderPOIFilters(currentPOIs, filtersEl);
}

function renderPOIList(pois, container) {
  const filtered = activePOIFilter === 'all' ? pois : pois.filter(p => p.type === activePOIFilter);
  if (!filtered.length) {
    container.innerHTML = '<p style="text-align:center;color:var(--gray);padding:1rem">Aucun point d\'intérêt trouvé</p>';
    return;
  }
  container.innerHTML = filtered.map((poi, i) => {
    const cat = POI_CATEGORIES[poi.type] || { icon: '📌', color: '#666' };
    const info = tHike(poi.info) || '';
    let actions = '';
    if (poi.email) {
      actions += `<button class="poi-action-btn email" onclick="event.stopPropagation();openReservation('${poi.name}','${poi.email}','${poi.phone||''}','${info.replace(/'/g,"\\'")}')">📧 Réserver</button>`;
    }
    if (poi.phone) {
      actions += `<a class="poi-action-btn phone" href="tel:${poi.phone}" onclick="event.stopPropagation()">📞 ${poi.phone}</a>`;
    }
    return `<div class="poi-item fade-in" style="animation-delay:${i*0.05}s">
      <div class="poi-icon" style="background:${cat.color}22;color:${cat.color}">${cat.icon}</div>
      <div class="poi-body">
        <div class="poi-name">${poi.name}${poi.auto ? '<span class="poi-auto-badge">Auto</span>' : ''}</div>
        <div class="poi-info">${info}</div>
        ${actions ? '<div class="poi-actions">' + actions + '</div>' : ''}
      </div>
    </div>`;
  }).join('');
}

// ===== RESERVATION MODAL =====
let currentResPoi = null;

function openReservation(name, email, phone, info) {
  currentResPoi = { name, email, phone };
  document.getElementById('resModalTitle').textContent = `📧 ${name}`;
  document.getElementById('resModalInfo').textContent = info;
  document.getElementById('resContact').innerHTML =
    `📧 <a href="mailto:${email}" style="color:var(--green)">${email}</a>` +
    (phone ? ` · 📞 <a href="tel:${phone}" style="color:var(--green)">${phone}</a>` : '');

  // Pre-fill user info
  const user = Storage.getUser();
  if (user) {
    document.getElementById('resName').value = user.name;
    document.getElementById('resEmail').value = user.email || '';
  }
  // Set default date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('resDate').value = tomorrow.toISOString().split('T')[0];

  document.getElementById('reservationModal').classList.add('open');
}

function closeReservation() {
  document.getElementById('reservationModal').classList.remove('open');
}

function sendReservation(event) {
  event.preventDefault();
  if (!currentResPoi) return;

  const name = document.getElementById('resName').value;
  const email = document.getElementById('resEmail').value;
  const date = document.getElementById('resDate').value;
  const guests = document.getElementById('resGuests').value;
  const message = document.getElementById('resMessage').value;

  const hike = HIKES.find(h => h.id === currentHikeId);
  const hikeName = hike ? tHike(hike.name) : '';

  const subject = encodeURIComponent(`Réservation — ${currentResPoi.name} — ${date}`);
  const body = encodeURIComponent(
    `Bonjour,\n\nJe souhaite effectuer une réservation :\n\n` +
    `📅 Date : ${date}\n` +
    `👥 Personnes : ${guests}\n` +
    `🏔️ Randonnée : ${hikeName}\n\n` +
    `${message ? 'Message : ' + message + '\n\n' : ''}` +
    `Cordialement,\n${name}\n${email}\n\n` +
    `— Envoyé via RandoValais`
  );

  window.open(`mailto:${currentResPoi.email}?subject=${subject}&body=${body}`, '_blank');
  closeReservation();
  showToast('📧 Email de réservation ouvert !');
}

// ===== WEATHER (Open-Meteo API — free, no key) =====
const WEATHER_ICONS = {0:'☀️',1:'🌤️',2:'⛅',3:'☁️',45:'🌫️',48:'🌫️',51:'🌦️',53:'🌧️',55:'🌧️',61:'🌧️',63:'🌧️',65:'🌧️',71:'🌨️',73:'🌨️',75:'❄️',77:'❄️',80:'🌦️',81:'🌧️',82:'⛈️',85:'🌨️',86:'❄️',95:'⛈️',96:'⛈️',99:'⛈️'};
const DAY_NAMES = {fr:['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],de:['So','Mo','Di','Mi','Do','Fr','Sa'],en:['Sun','Mon','Tue','Wed','Thu','Fri','Sat']};

async function fetchWeather(hike) {
  const widget = document.getElementById('weatherWidget');
  if (!widget) return;

  const [lat, lon] = hike.coords;
  const alt = hike.altitude?.max || 1500;

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&elevation=${alt}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=Europe/Zurich&forecast_days=5`;
    const resp = await fetch(url);
    const data = await resp.json();
    const lang = localStorage.getItem('rv_lang') || 'fr';
    const days = DAY_NAMES[lang] || DAY_NAMES.fr;

    const c = data.current;
    const nowIcon = WEATHER_ICONS[c.weather_code] || '🌤️';
    
    // Sunrise/Sunset for today
    const sunrise = data.daily.sunrise[0].split('T')[1];
    const sunset = data.daily.sunset[0].split('T')[1];

    let html = `<div class="weather-now">
      <div class="big-icon">${nowIcon}</div>
      <div>
        <div class="big-temp">${Math.round(c.temperature_2m)}°C</div>
        <div class="details">💨 ${c.wind_speed_10m} km/h · Alt. ${alt}m</div>
        <div class="details" style="margin-top:4px">🌅 ${sunrise} · 🌇 ${sunset}</div>
      </div>
    </div>`;

    html += '<div class="weather-grid">';
    for (let i = 1; i < Math.min(5, data.daily.time.length); i++) {
      const d = new Date(data.daily.time[i]);
      const icon = WEATHER_ICONS[data.daily.weather_code[i]] || '🌤️';
      html += `<div class="weather-day">
        <div class="day">${days[d.getDay()]}</div>
        <div class="icon">${icon}</div>
        <div class="temp">${Math.round(data.daily.temperature_2m_max[i])}°/${Math.round(data.daily.temperature_2m_min[i])}°</div>
        <div class="rain">💧 ${data.daily.precipitation_probability_max[i]}%</div>
      </div>`;
    }
    html += '</div>';
    widget.innerHTML = html;
  } catch (e) {
    widget.innerHTML = '<p style="color:var(--gray);font-size:0.85rem">Météo indisponible</p>';
  }
}

// ===== CALORIES =====
function renderCalories(hike) {
  const el = document.getElementById('caloriesWidget');
  if (!el) return;

  const durationH = parseFloat(hike.duration) || 3;
  const elevUp = hike.elevation.up || 0;
  const dist = hike.distance || 0;

  // MET-based estimation (hiking = 6-8 MET depending on elevation)
  const met = 5 + (elevUp / 500) * 2;
  const calories = Math.round(met * 75 * durationH); // 75kg average
  const water = Math.max(1, (durationH * 0.5 + elevUp / 1000)).toFixed(1);
  const steps = Math.round(dist * 1400);

  el.innerHTML = `<div class="calories-grid">
    <div class="calorie-item">
      <div class="cal-icon">🔥</div>
      <div class="cal-value">${calories}</div>
      <div class="cal-label">kcal estimées</div>
    </div>
    <div class="calorie-item">
      <div class="cal-icon">💧</div>
      <div class="cal-value">${water}L</div>
      <div class="cal-label">eau recommandée</div>
    </div>
    <div class="calorie-item">
      <div class="cal-icon">👣</div>
      <div class="cal-value">${(steps/1000).toFixed(1)}k</div>
      <div class="cal-label">pas estimés</div>
    </div>
    <div class="calorie-item">
      <div class="cal-icon">⏱️</div>
      <div class="cal-value">${hike.duration}</div>
      <div class="cal-label">temps de marche</div>
    </div>
  </div>`;
}

// ===== EQUIPMENT CHECKLIST =====
const EQUIPMENT = {
  Facile: [
    { icon: '🥾', name: 'Chaussures de marche', essential: true },
    { icon: '💧', name: 'Eau (min. 1L)', essential: true },
    { icon: '📱', name: 'Téléphone chargé', essential: true },
    { icon: '🧴', name: 'Crème solaire SPF 50', essential: false },
    { icon: '🧢', name: 'Casquette / chapeau', essential: false },
    { icon: '🍫', name: 'En-cas', essential: false }
  ],
  Moyen: [
    { icon: '🥾', name: 'Chaussures de randonnée', essential: true },
    { icon: '🧥', name: 'Veste coupe-vent/imperméable', essential: true },
    { icon: '💧', name: 'Eau (min. 1.5L)', essential: true },
    { icon: '🗺️', name: 'Carte / App GPS', essential: true },
    { icon: '📱', name: 'Téléphone chargé', essential: true },
    { icon: '🦯', name: 'Bâtons de randonnée', essential: false },
    { icon: '🩹', name: 'Trousse premiers secours', essential: false }
  ],
  Difficile: [
    { icon: '🥾', name: 'Chaussures de montagne', essential: true },
    { icon: '🧥', name: 'Veste imperméable', essential: true },
    { icon: '🦯', name: 'Bâtons de randonnée', essential: true },
    { icon: '🧤', name: 'Gants + bonnet', essential: true },
    { icon: '🔦', name: 'Lampe frontale', essential: true },
    { icon: '💧', name: 'Eau (min. 2L)', essential: true },
    { icon: '🗺️', name: 'Carte / App GPS', essential: true },
    { icon: '📱', name: 'Téléphone chargé', essential: true },
    { icon: '🩹', name: 'Trousse premiers secours', essential: true },
    { icon: '🧗', name: 'Casque (recommandé)', essential: false }
  ]
};

function renderEquipment(hike) {
  const el = document.getElementById('equipmentList');
  if (!el) return;

  const items = EQUIPMENT[hike.difficulty] || [];
  el.innerHTML = '<div class="equip-list">' + items.map(item =>
    `<div class="equip-item">
      <span class="equip-check">✓</span>
      <span>${item.icon} ${item.name}</span>
      ${item.essential ? '<span class="equip-essential">Essentiel</span>' : ''}
    </div>`
  ).join('') + '</div>';
}

// ===== SHARE =====
function shareHike(method) {
  const hike = HIKES.find(h => h.id === currentHikeId);
  if (!hike) return;

  const name = tHike(hike.name);
  const url = window.location.origin + '/#hike-' + hike.id;
  const text = `🏔️ ${name} — ${hike.duration}, ${hike.distance}km, +${hike.elevation.up}m\n📍 ${hike.region}, Valais\n\n`;

  switch (method) {
    case 'whatsapp':
      window.open(`https://wa.me/?text=${encodeURIComponent(text + url)}`, '_blank');
      break;
    case 'email':
      window.open(`mailto:?subject=${encodeURIComponent('Randonnée: ' + name)}&body=${encodeURIComponent(text + url)}`, '_blank');
      break;
    case 'copy':
      navigator.clipboard.writeText(url).then(() => showToast('🔗 Lien copié !'));
      break;
  }
}

// ===== SIMILAR HIKES =====
function renderSimilarHikes(currentHike) {
  const grid = document.getElementById('similarGrid');
  if (!grid) return;

  // Score similarity by: same region, same difficulty, close distance
  const scored = HIKES.filter(h => h.id !== currentHike.id).map(h => {
    let score = 0;
    if (h.region === currentHike.region) score += 3;
    if (h.difficulty === currentHike.difficulty) score += 2;
    const distDiff = Math.abs(h.distance - currentHike.distance);
    score += Math.max(0, 3 - distDiff / 3);
    return { hike: h, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const top3 = scored.slice(0, 3).map(s => s.hike);

  grid.innerHTML = top3.map(h => createHikeCard(h)).join('');
}

// ===== GPX / KML DOWNLOAD =====
function downloadTrack(format) {
  const hike = HIKES.find(h => h.id === currentHikeId);
  if (!hike || !hike.trail || hike.trail.length < 2) {
    showToast('❌ Pas de tracé disponible');
    return;
  }

  const name = tHike(hike.name);
  const desc = tHike(hike.description);
  let content, mime, ext;

  if (format === 'gpx') {
    content = generateGPX(hike, name, desc);
    mime = 'application/gpx+xml';
    ext = 'gpx';
  } else {
    content = generateKML(hike, name, desc);
    mime = 'application/vnd.google-earth.kml+xml';
    ext = 'kml';
  }

  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `RandoValais_${name.replace(/[^a-zA-Z0-9àéèêëïôùûü]/g, '_')}.${ext}`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`📥 ${ext.toUpperCase()} téléchargé !`);
}

function generateGPX(hike, name, desc) {
  const pts = hike.trail.map(([lat, lon]) =>
    `      <trkpt lat="${lat}" lon="${lon}"><ele>${hike.altitude?.min || 1000}</ele></trkpt>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx xmlns="http://www.topografix.com/GPX/1/1" version="1.1" creator="RandoValais">
  <metadata>
    <name>${escXml(name)}</name>
    <desc>${escXml(desc)}</desc>
    <author><name>RandoValais</name></author>
    <link href="https://randovalais.ch"/>
    <time>${new Date().toISOString()}</time>
  </metadata>
  <trk>
    <name>${escXml(name)}</name>
    <desc>Difficulté: ${hike.difficulty} | Distance: ${hike.distance}km | Dénivelé: +${hike.elevation.up}m/-${hike.elevation.down}m | Durée: ${hike.duration}</desc>
    <type>Hiking</type>
    <trkseg>
${pts}
    </trkseg>
  </trk>
  <wpt lat="${hike.coords[0]}" lon="${hike.coords[1]}">
    <name>Départ: ${escXml(name)}</name>
    <desc>${escXml(tHike(hike.access))}</desc>
    <sym>Trailhead</sym>
  </wpt>
</gpx>`;
}

function generateKML(hike, name, desc) {
  const coords = hike.trail.map(([lat, lon]) => `${lon},${lat},${hike.altitude?.min || 1000}`).join(' ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>${escXml(name)} — RandoValais</name>
    <description>${escXml(desc)}</description>
    <Style id="trailStyle">
      <LineStyle>
        <color>ff0050ff</color>
        <width>4</width>
      </LineStyle>
    </Style>
    <Placemark>
      <name>${escXml(name)}</name>
      <description>Difficulté: ${hike.difficulty} | Distance: ${hike.distance}km | +${hike.elevation.up}m | ${hike.duration}</description>
      <styleUrl>#trailStyle</styleUrl>
      <LineString>
        <tessellate>1</tessellate>
        <altitudeMode>clampToGround</altitudeMode>
        <coordinates>${coords}</coordinates>
      </LineString>
    </Placemark>
    <Placemark>
      <name>Départ: ${escXml(name)}</name>
      <description>${escXml(tHike(hike.access))}</description>
      <Point><coordinates>${hike.coords[1]},${hike.coords[0]},0</coordinates></Point>
    </Placemark>
  </Document>
</kml>`;
}

function escXml(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ===== ADMIN DASHBOARD =====
let currentAdminTab = 'pending';

function renderAdmin() {
  if (!Storage.isAdmin()) { showPage('home'); return; }
  
  const stats = document.getElementById('adminStats');
  const allUsers = Storage.getAllUsers();
  const pendingComments = Storage.getPendingComments();
  
  stats.innerHTML = `
    <div class="admin-stat">
      <div class="stat-icon">👥</div>
      <div class="stat-value">${allUsers.length}</div>
      <div class="stat-label">Utilisateurs</div>
    </div>
    <div class="admin-stat">
      <div class="stat-icon">📝</div>
      <div class="stat-value">${pendingComments.length}</div>
      <div class="stat-label">En attente</div>
    </div>
    <div class="admin-stat">
      <div class="stat-icon">💬</div>
      <div class="stat-value">${Storage.getAllCommentsCount()}</div>
      <div class="stat-label">Approuvés</div>
    </div>
    <div class="admin-stat">
      <div class="stat-icon">❤️</div>
      <div class="stat-value">${Object.keys(Storage.getLikeCounts()).length}</div>
      <div class="stat-label">Randos aimées</div>
    </div>
  `;
  
  renderAdminTab();
}

function switchAdminTab(tab) {
  currentAdminTab = tab;
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.admin-tab[onclick*="${tab}"]`).classList.add('active');
  renderAdminTab();
}

function renderAdminTab() {
  const container = document.getElementById('adminContent');
  if (currentAdminTab === 'pending') {
    const pending = Storage.getPendingComments();
    if (!pending.length) {
      container.innerHTML = '<p style="text-align:center;color:var(--gray)">Aucun contenu en attente de modération. ✨</p>';
      return;
    }
    container.innerHTML = pending.map(c => {
      const hike = HIKES.find(h => h.id === c.hikeId);
      return `
        <div class="mod-card">
          <div class="mod-meta">
            <strong>${c.name}</strong> sur <strong>${tHike(hike.name)}</strong>
            <span style="float:right">${new Date(c.date).toLocaleDateString()}</span>
          </div>
          <div class="mod-text">"${c.text}" (Note: ${c.rating}★)</div>
          <div class="mod-actions">
            <button class="admin-action-btn approve" onclick="moderateComment(${c.hikeId}, ${c.id}, 'approved')">Approuver</button>
            <button class="admin-action-btn reject" onclick="moderateComment(${c.hikeId}, ${c.id}, 'rejected')">Rejeter</button>
          </div>
        </div>
      `;
    }).join('');
  } else if (currentAdminTab === 'users') {
    const users = Storage.getAllUsers();
    container.innerHTML = users.map(u => `
      <div class="admin-user-row">
        <div class="admin-user-avatar ${u.role === 'admin' ? 'admin-role' : ''}">${u.avatar}</div>
        <div class="admin-user-info">
          <div class="admin-user-name">${u.name}</div>
          <div class="admin-user-email">${u.email}</div>
        </div>
        <span class="admin-user-badge badge-${u.active ? u.role : 'inactive'}">${u.active ? u.role : 'Banni'}</span>
        <button class="admin-action-btn toggle" onclick="toggleUserStatus(${u.id})">
          ${u.active ? 'Bannir' : 'Réactiver'}
        </button>
      </div>
    `).join('');
  } else if (currentAdminTab === 'all-comments') {
    const all = HIKES.flatMap(h => Storage.getComments(h.id));
    container.innerHTML = all.map(c => `
      <div class="mod-card" style="border-left-color:${c.status === 'approved' ? 'var(--green)' : 'var(--red)'}">
        <div class="mod-meta"><strong>${c.name}</strong> · ${c.status}</div>
        <div class="mod-text">${c.text}</div>
        <button class="admin-action-btn reject" onclick="deleteComment(0, ${c.id})">Supprimer</button>
      </div>
    `).join('');
  }
}

function moderateComment(hikeId, commentId, status) {
  Storage.moderateComment(hikeId, commentId, status);
  renderAdmin();
  showToast(status === 'approved' ? 'Commentaire approuvé !' : 'Commentaire rejeté.');
}

function toggleUserStatus(userId) {
  Storage.toggleUserActive(userId);
  renderAdmin();
}

// ===== UTILITIES =====
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('rv_dark_mode', isDark);
  document.getElementById('darkToggle').textContent = isDark ? '☀️' : '🌙';
}

function toggleEmergency() {
  document.getElementById('emergencyPanel').classList.toggle('open');
}

function shareLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const msg = `Je suis en randonnée. Ma position: https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
      const sms = `sms:?body=${encodeURIComponent(msg)}`;
      window.location.href = sms;
    }, () => showToast('Erreur géolocalisation. Activez le GPS.'));
  } else {
    showToast('Géolocalisation non supportée.');
  }
}

// Auto dark mode on load
if (localStorage.getItem('rv_dark_mode') === 'true') {
  document.body.classList.add('dark-mode');
  document.getElementById('darkToggle').textContent = '☀️';
}
