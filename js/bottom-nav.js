/* ============================================================
   HELLAS HERITAGE — Bottom Navigation Bar (Mobile)
   Εμφανίζεται μόνο σε κινητά / Capacitor app
   ============================================================ */

(function () {
  const navItems = [
    {
      href: 'index.html',
      label: 'Αρχική',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
        <polyline points="9 21 9 12 15 12 15 21"/>
      </svg>`,
      match: ['index.html', '/']
    },
    {
      href: 'regions.html',
      label: 'Περιοχές',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>`,
      match: ['regions.html', 'region.html']
    },
    {
      href: 'costumes.html',
      label: 'Φορεσιές',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/>
      </svg>`,
      match: ['costumes.html', 'costume.html']
    },
    {
      href: 'customs.html',
      label: 'Έθιμα',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>`,
      match: ['customs.html', 'custom.html']
    },
    {
      href: 'map.html',
      label: 'Χάρτης',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
        <line x1="8" y1="2" x2="8" y2="18"/>
        <line x1="16" y1="6" x2="16" y2="22"/>
      </svg>`,
      match: ['map.html']
    }
  ];

  // Detect current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  // Build nav HTML
  const navHTML = `
    <nav class="bottom-nav" id="bottomNav" role="navigation" aria-label="Κύρια πλοήγηση">
      ${navItems.map(item => {
        const isActive = item.match.some(m => currentPath === m || currentPath === '' && m === 'index.html');
        return `
          <a href="${item.href}" class="bottom-nav-item${isActive ? ' active' : ''}" aria-label="${item.label}">
            <span class="bottom-nav-icon">${item.icon}</span>
            <span class="bottom-nav-label">${item.label}</span>
          </a>
        `;
      }).join('')}
    </nav>
  `;

  // Inject into page
  document.addEventListener('DOMContentLoaded', function () {
    document.body.insertAdjacentHTML('beforeend', navHTML);

    // Add bottom padding to page so content isn't hidden behind nav
    const pageWrapper = document.querySelector('.page-wrapper') || document.querySelector('main') || document.body;
    pageWrapper.style.paddingBottom = 'calc(72px + env(safe-area-inset-bottom, 0px))';
  });
})();
