/*
 * HELLAS HERITAGE — app.js
 * Shared UI logic for all pages
 */

// ── Mobile Menu (Professional Drawer) ────────────────────────
function toggleMobileNav() {
  const drawer  = document.getElementById('mobileMenuDrawer');
  const overlay = document.getElementById('mobileMenuOverlay');
  const hamburger = document.querySelector('.nav-hamburger');
  if (!drawer) return;
  const isOpen = drawer.classList.toggle('open');
  overlay && overlay.classList.toggle('open', isOpen);
  hamburger && hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
function closeMobileNav() {
  const drawer  = document.getElementById('mobileMenuDrawer');
  const overlay = document.getElementById('mobileMenuOverlay');
  const hamburger = document.querySelector('.nav-hamburger');
  drawer  && drawer.classList.remove('open');
  overlay && overlay.classList.remove('open');
  hamburger && hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Navigation ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // Active nav link based on page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(l => {
    if (l.getAttribute('href') === currentPage) l.classList.add('active');
  });
});

// ── URL Params ────────────────────────────────────────────────
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// ── Toast Notification ────────────────────────────────────────
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── Region badge color ────────────────────────────────────────
function regionTypeBadge(type) {
  const map = { 'ηπειρος':'Ήπειρος', 'νησι':'Νησί', 'νομος':'Νομός', 'πολη':'Πόλη' };
  return map[type] || type;
}

// ── Gender label ──────────────────────────────────────────────
function genderLabel(g) {
  const m = { 'ΑΝΔΡΙΚΗ':'Ανδρική', 'ΓΥΝΑΙΚΕΙΑ':'Γυναικεία', 'ΠΑΙΔΙΚΗ':'Παιδική', 'ΜΙΚΤΗ':'Μικτή' };
  return m[g] || g;
}

// ── Category label ────────────────────────────────────────────
function categoryLabel(c) {
  const m = { 'ΓΑΜΗΛΙΟ':'Γαμήλιο','ΘΡΗΣΚΕΥΤΙΚΟ':'Θρησκευτικό','ΑΓΡΟΤΙΚΟ':'Αγροτικό',
              'ΕΠΟΧΙΑΚΟ':'Εποχιακό','ΚΟΙΝΩΝΙΚΟ':'Κοινωνικό','ΕΠΕΤΕΙΑΚΟ':'Επετειακό' };
  return m[c] || c;
}

// ── Get region name by id ─────────────────────────────────────
function regionName(id) {
  const r = HH.regions.find(x => x.id === id);
  return r ? r.name : '';
}
function regionSlug(id) {
  const r = HH.regions.find(x => x.id === id);
  return r ? r.slug : '';
}

// ── Render Region Card ────────────────────────────────────────
function renderRegionCard(r) {
  return `
  <a class="card" href="region.html?id=${r.id}">
    <div class="card-image">
      <img src="${r.image}" alt="${r.name}" loading="lazy">
      <div class="card-badge">${regionTypeBadge(r.type)}</div>
    </div>
    <div class="card-body">
      <div class="card-meta">📍 ${r.costumesCount} φορεσιές · ${r.customsCount} έθιμα</div>
      <h3 class="card-title">${r.name}</h3>
      <p class="card-desc">${r.description}</p>
    </div>
    <div class="card-footer">
      <span class="card-footer-tag">${r.nameEn}</span>
      <span class="card-arrow">→</span>
    </div>
  </a>`;
}

// ── Render Costume Card ───────────────────────────────────────
function renderCostumeCard(c) {
  const premiumOverlay = c.isPremium ? `
    <div class="premium-lock">
      <div class="premium-lock-icon">🔒</div>
      <div class="premium-lock-text">PREMIUM</div>
    </div>` : '';
  return `
  <a class="card" href="costume.html?id=${c.id}">
    <div class="card-image">
      <img src="${c.image}" alt="${c.name}" loading="lazy">
      <div class="card-badge ${c.isPremium ? 'premium' : ''}">${genderLabel(c.gender)}</div>
      ${c.isPremium ? premiumOverlay : ''}
    </div>
    <div class="card-body">
      <div class="card-meta">📍 ${regionName(c.regionId)}</div>
      <h3 class="card-title">${c.name}</h3>
      <p class="card-desc">${c.description}</p>
    </div>
    <div class="card-footer">
      <span class="card-footer-tag">${c.period}</span>
      <span class="card-arrow">→</span>
    </div>
  </a>`;
}

// ── Render Custom Card ────────────────────────────────────────
function renderCustomCard(cu) {
  const premiumOverlay = cu.isPremium ? `
    <div class="premium-lock">
      <div class="premium-lock-icon">🔒</div>
      <div class="premium-lock-text">PREMIUM</div>
    </div>` : '';
  return `
  <a class="card" href="custom.html?id=${cu.id}">
    <div class="card-image">
      <img src="${cu.image}" alt="${cu.name}" loading="lazy">
      <div class="card-badge gold">${categoryLabel(cu.category)}</div>
      ${cu.isPremium ? premiumOverlay : ''}
    </div>
    <div class="card-body">
      <div class="card-meta">📅 ${cu.periodOfYear} · 📍 ${regionName(cu.regionId)}</div>
      <h3 class="card-title">${cu.name}</h3>
      <p class="card-desc">${cu.description}</p>
    </div>
    <div class="card-footer">
      <span class="card-footer-tag">${cu.nameEn}</span>
      <span class="card-arrow">→</span>
    </div>
  </a>`;
}

// ── Standard Navbar HTML ──────────────────────────────────────
function navbarHTML(active) {
  const links = [
    { href:'regions.html',   label:'Περιοχές',   icon:'🏛️' },
    { href:'costumes.html',  label:'Φορεσιές',   icon:'👗' },
    { href:'customs.html',   label:'Έθιμα',      icon:'🛡️' },
    { href:'viewer-3d.html', label:'3D Viewer',  icon:'🎭' },
    { href:'map.html',       label:'Χάρτης',     icon:'🗺️' },
    { href:'pricing.html',   label:'Συνδρομές',  icon:'⭐' },
  ];
  const desktopNav = links.map(l =>
    `<a class="nav-link${l.label===active?' active':''}" href="${l.href}">${l.label}</a>`
  ).join('');
  const mobileLinks = links.map(l =>
    `<a class="${l.label===active?'active':''}" href="${l.href}" onclick="closeMobileNav()">
      <span style="margin-right:.65rem;font-size:1.1rem">${l.icon}</span>${l.label}
    </a>`
  ).join('');

  return `
<!-- Overlay -->
<div class="mobile-menu-overlay" id="mobileMenuOverlay" onclick="closeMobileNav()"></div>
<!-- Drawer -->
<div class="mobile-menu-drawer" id="mobileMenuDrawer">
  <div class="mobile-menu-header">
    <div class="mobile-menu-logo">Hellas <span>Heritage</span></div>
    <button class="mobile-menu-close" onclick="closeMobileNav()" aria-label="Κλείσιμο">✕</button>
  </div>
  <div class="mobile-menu-links">${mobileLinks}</div>
  <div class="mobile-menu-actions">
    <a class="btn-nav-login" href="login.html" onclick="closeMobileNav()">Σύνδεση</a>
    <a class="btn-nav-premium" href="pricing.html" onclick="closeMobileNav()">Κληρονόμος ⭐</a>
  </div>
</div>
<!-- Navbar -->
<nav class="navbar">
  <div class="navbar-content">
    <a class="navbar-brand" href="index.html">
      <div class="navbar-logo-text">Hellas <span>Heritage</span></div>
    </a>
    <div class="navbar-nav">${desktopNav}</div>
    <div class="navbar-actions">
      <a class="btn-nav-login" href="login.html">Σύνδεση</a>
      <a class="btn-nav-premium" href="pricing.html">Κληρονόμος</a>
    </div>
    <button class="nav-hamburger" aria-label="Μενού" onclick="toggleMobileNav()">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;
}

// ── Standard Footer HTML ──────────────────────────────────────
function footerHTML() {
  return `
<footer>
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <h3>Hellas <span>Heritage</span></h3>
        <p>Ψηφιακό αρχείο ελληνικής παράδοσης — φορεσιές, έθιμα και πολιτιστική κληρονομιά από κάθε γωνιά της Ελλάδας. Τεκμηριωμένο, διαδραστικό, ζωντανό.</p>
        <div class="footer-social">
          <a class="social-btn" href="#" aria-label="Instagram">📸</a>
          <a class="social-btn" href="#" aria-label="Facebook">📘</a>
          <a class="social-btn" href="#" aria-label="YouTube">🎥</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Περιεχόμενο</h4>
        <ul>
          <li><a href="regions.html">Περιοχές</a></li>
          <li><a href="costumes.html">Φορεσιές</a></li>
          <li><a href="customs.html">Έθιμα</a></li>
          <li><a href="map.html">Διαδρ. Χάρτης</a></li>
          <li><a href="viewer-3d.html">3D Viewer</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Πλατφόρμα</h4>
        <ul>
          <li><a href="pricing.html">Συνδρομές</a></li>
          <li><a href="login.html">Σύνδεση</a></li>
          <li><a href="login.html">Δωρεάν Εγγραφή</a></li>
          <li><a href="pricing.html">Εκπαιδευτικά</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Πληροφορίες</h4>
        <ul>
          <li><a href="#">Σχετικά με εμάς</a></li>
          <li><a href="#">info@hellasheritage.gr</a></li>
          <li><a href="#">Πολιτική Απορρήτου</a></li>
          <li><a href="#">Βιβλιογραφία</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div>© 2025 <span>Hellas Heritage</span>. Με επιφύλαξη παντός δικαιώματος.</div>
      <div>Φτιαγμένο με ❤ για την ελληνική παράδοση</div>
    </div>
  </div>
</footer>`;
}

// ── Inject nav + footer if placeholders exist ─────────────────
document.addEventListener('DOMContentLoaded', () => {
  const navEl = document.getElementById('navbar-placeholder');
  if (navEl) navEl.outerHTML = navbarHTML(navEl.dataset.active || '');
  const ftEl = document.getElementById('footer-placeholder');
  if (ftEl) ftEl.outerHTML = footerHTML();

  // Navbar scroll behaviour (for non-hero pages — start scrolled)
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const heroEl = document.querySelector('.hero');
    if (!heroEl) navbar.classList.add('scrolled');  // non-hero pages start white
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // Global scroll reveal
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal,.reveal-left').forEach(el => io.observe(el));
});
