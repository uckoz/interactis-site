/*
 * InterActis — bandeau de consentement RGPD
 * Charge Google Ads + Tawk.to uniquement apres acceptation explicite.
 * Stocke le choix 12 mois dans localStorage. Defaut : refuse.
 */
(function () {
  var KEY = 'interactis_consent_v1';
  var DAYS = 365;
  var GADS_ID = 'AW-18186820643';
  var TAWK_ID = '6a0b93230ff9d11c35914030/1joujdgtg';

  // Stub gtag pour ne pas casser les appels existants
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  function getConsent() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || !data.expires || Date.now() > data.expires) return null;
      return data.value;
    } catch (e) { return null; }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        value: value,
        expires: Date.now() + DAYS * 86400000
      }));
    } catch (e) {}
  }

  var loaded = false;
  function loadTrackers() {
    if (loaded) return;
    loaded = true;
    // Google Ads
    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GADS_ID;
    document.head.appendChild(g);
    window.gtag('js', new Date());
    window.gtag('config', GADS_ID);
    // Tawk.to (differe de 3s pour ne pas penaliser le first paint)
    setTimeout(function () {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      var t = document.createElement('script');
      var s0 = document.getElementsByTagName('script')[0];
      t.async = true;
      t.charset = 'UTF-8';
      t.setAttribute('crossorigin', '*');
      t.src = 'https://embed.tawk.to/' + TAWK_ID;
      s0.parentNode.insertBefore(t, s0);
    }, 3000);
  }

  function injectStyles() {
    if (document.getElementById('ia-consent-style')) return;
    var s = document.createElement('style');
    s.id = 'ia-consent-style';
    s.textContent = [
      '.ia-banner{position:fixed;left:16px;right:16px;bottom:16px;max-width:560px;margin:0 auto;background:#0f172a;color:#fff;padding:20px 22px;border-radius:14px;box-shadow:0 25px 60px rgba(0,0,0,.45);z-index:2147483600;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.55;animation:iaUp .4s ease}',
      '.ia-banner p{margin:0 0 14px}',
      '.ia-banner a{color:#fb923c;text-decoration:underline}',
      '.ia-banner-actions{display:flex;gap:10px;flex-wrap:wrap}',
      '.ia-banner button{padding:10px 18px;border:none;border-radius:10px;font-weight:600;cursor:pointer;font-size:14px;font-family:inherit}',
      '.ia-banner .ia-accept{background:#fb923c;color:#fff}',
      '.ia-banner .ia-accept:hover{background:#ea580c}',
      '.ia-banner .ia-refuse{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3)}',
      '.ia-banner .ia-refuse:hover{background:rgba(255,255,255,.08)}',
      '.ia-cookies-link{position:fixed;left:16px;bottom:16px;background:#fff;color:#374151;border:1px solid #e5e7eb;padding:8px 12px;border-radius:8px;font-size:12px;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.08);z-index:2147483500;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}',
      '.ia-cookies-link:hover{background:#f9fafb}',
      '@keyframes iaUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}'
    ].join('');
    document.head.appendChild(s);
  }

  function buildBanner() {
    injectStyles();
    var b = document.createElement('div');
    b.className = 'ia-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Bandeau de consentement aux cookies');
    b.innerHTML =
      '<p>🍪 <strong>Nous respectons votre vie privée.</strong> ' +
      'Nous utilisons des cookies pour mesurer la fréquentation et améliorer votre expérience ' +
      '(Google Ads, chat en direct). Vous pouvez accepter ou refuser. ' +
      '<a href="/confidentialite" target="_blank" rel="noopener">En savoir plus</a></p>' +
      '<div class="ia-banner-actions">' +
      '<button type="button" class="ia-accept">Accepter</button>' +
      '<button type="button" class="ia-refuse">Refuser</button>' +
      '</div>';
    document.body.appendChild(b);
    b.querySelector('.ia-accept').addEventListener('click', function () {
      setConsent('accepted');
      b.remove();
      removeReopenLink();
      loadTrackers();
    });
    b.querySelector('.ia-refuse').addEventListener('click', function () {
      setConsent('refused');
      b.remove();
      addReopenLink();
    });
  }

  function addReopenLink() {
    if (document.getElementById('ia-cookies-link')) return;
    injectStyles();
    var l = document.createElement('button');
    l.id = 'ia-cookies-link';
    l.className = 'ia-cookies-link';
    l.type = 'button';
    l.textContent = '🍪 Cookies';
    l.addEventListener('click', function () {
      l.remove();
      buildBanner();
    });
    document.body.appendChild(l);
  }

  function removeReopenLink() {
    var l = document.getElementById('ia-cookies-link');
    if (l) l.remove();
  }

  function init() {
    var c = getConsent();
    if (c === 'accepted') {
      loadTrackers();
    } else if (c === 'refused') {
      addReopenLink();
    } else {
      buildBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
