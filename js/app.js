/*
 * HELLAS HERITAGE — app.js
 * Shared UI logic for all pages
 */

// ── Navigation ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Hamburger toggle
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.navbar-nav');
  const navActions= document.querySelector('.navbar-actions');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks && navLinks.classList.toggle('open');
      navActions && navActions.classList.toggle('open');
    });
  }

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
    { href:'regions.html',  label:'Περιοχές' },
    { href:'costumes.html', label:'Φορεσιές' },
    { href:'customs.html',  label:'Έθιμα' },
    { href:'viewer-3d.html',label:'3D Viewer ✦' },
    { href:'index.html#map',label:'Χάρτης' },
    { href:'pricing.html',  label:'Συνδρομές' },
  ];
  const nav = links.map(l => `<a class="nav-link${l.label===active?' active':''}" href="${l.href}">${l.label}</a>`).join('');
  return `
<nav class="navbar">
  <a class="navbar-brand" href="index.html">
    <div class="navbar-logo-text">Hellas <span>Heritage</span></div>
  </a>
  <div class="navbar-nav">${nav}</div>
  <div class="navbar-actions">
    <a class="btn-nav-login" href="login.html">Σύνδεση</a>
    <a class="btn-nav-premium" href="pricing.html">Premium ✦</a>
  </div>
  <div class="nav-hamburger"><span></span><span></span><span></span></div>
</nav>`;
}

// ── Standard Footer HTML ──────────────────────────────────────
function footerHTML() {
  return `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <h3>Hellas <span>Heritage</span></h3>
        <p>Ψηφιακό αρχείο ελληνικής παράδοσης — φορεσιές, έθιμα και πολιτιστική κληρονομιά από κάθε γωνιά της Ελλάδας.</p>
        <div class="footer-social">
          <a class="social-btn" href="#">📸</a>
          <a class="social-btn" href="#">📘</a>
          <a class="social-btn" href="#">🎥</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Περιεχόμενο</h4>
        <ul>
          <li><a href="regions.html">Περιοχές</a></li>
          <li><a href="costumes.html">Φορεσιές</a></li>
          <li><a href="customs.html">Έθιμα</a></li>
          <li><a href="index.html#events">Εκδηλώσεις</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Πλατφόρμα</h4>
        <ul>
          <li><a href="pricing.html">Συνδρομές</a></li>
          <li><a href="login.html">Σύνδεση</a></li>
          <li><a href="login.html">Εγγραφή</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Επικοινωνία</h4>
        <ul>
          <li><a href="#">info@hellasheritage.gr</a></li>
          <li><a href="#">Σχετικά με εμάς</a></li>
          <li><a href="#">Πολιτική Απορρήτου</a></li>
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
});
