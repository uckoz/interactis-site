/* ============================================
   InterActis - CRO (Conversion Rate Optimization)
   - Banner d'urgence sticky en haut
   - Pop-up exit-intent (recupere leads sortants)
   - Lazy-load des videos (gain LCP / data mobile)
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // LAZY-LOAD DES VIDEOS DECORATIVES
  // Charge la source uniquement quand la video est sur le point d'etre visible.
  // Gain massif sur le LCP mobile (4G) car on n'attend pas la fin du download
  // de plusieurs MB de video avant d'afficher le contenu critique.
  // ============================================
  function initLazyVideos() {
    var vids = document.querySelectorAll('video.lazy-video[data-src]');
    if (!vids.length) return;
    if (!('IntersectionObserver' in window)) {
      vids.forEach(function(v){
        var src = v.getAttribute('data-src');
        if (src && !v.src) { v.src = src; v.load(); v.play().catch(function(){}); }
      });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (!e.isIntersecting) return;
        var v = e.target;
        var src = v.getAttribute('data-src');
        if (src && !v.src) {
          v.src = src;
          v.load();
          v.play().catch(function(){});
        }
        io.unobserve(v);
      });
    }, { rootMargin: '400px 0px' });
    vids.forEach(function(v){ io.observe(v); });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyVideos);
  } else {
    initLazyVideos();
  }

  // ============================================
  // 0) CHARGE LE CSS CRO (banner + popup styles)
  // Injecte dynamiquement /assets/cro.css pour que toutes les pages
  // qui chargent cro.js aient automatiquement les styles, sans avoir
  // a modifier chaque HTML.
  // ============================================
  (function loadCss() {
    if (document.querySelector('link[href="/assets/cro.css"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/cro.css';
    document.head.appendChild(link);
  })();

  // ============================================
  // 1) BANNER D'URGENCE (calendrier qui se remplit)
  // ============================================
  function injectUrgencyBanner() {
    // Ne pas re-afficher si dejà fermé par l'utilisateur
    try {
      if (localStorage.getItem('ia-urgency-dismissed') === '1') return;
    } catch (e) {}

    var banner = document.createElement('div');
    banner.className = 'urgency-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Information urgence');
    banner.innerHTML = ''
      + '<div class="urgency-banner-inner">'
      +   '<span class="urgency-banner-emoji" aria-hidden="true">🗓</span>'
      +   '<span class="urgency-banner-text">Calendrier qui se remplit · <strong>quelques dates encore disponibles</strong></span>'
      +   '<a href="/devis" class="urgency-banner-link">Réserver ma date <span aria-hidden="true">→</span></a>'
      +   '<button type="button" class="urgency-banner-close" aria-label="Fermer la bannière">×</button>'
      + '</div>';

    document.body.insertBefore(banner, document.body.firstChild);
    document.body.classList.add('has-urgency-banner');

    banner.querySelector('.urgency-banner-close').addEventListener('click', function() {
      banner.classList.add('is-closing');
      setTimeout(function() {
        banner.remove();
        document.body.classList.remove('has-urgency-banner');
      }, 250);
      try { localStorage.setItem('ia-urgency-dismissed', '1'); } catch (e) {}
    });
  }

  // ============================================
  // 2) POP-UP EXIT-INTENT (recupere les leads qui partent)
  // ============================================
  function setupExitIntent() {
    // Pas sur mobile (pas de mouseleave fiable)
    if (window.matchMedia('(pointer: coarse)').matches) return;
    // Pas si deja montré dans cette session
    try {
      if (sessionStorage.getItem('ia-exit-popup-shown') === '1') return;
    } catch (e) {}
    // Pas si on est deja sur /devis ou /merci (deja en cours de conversion)
    var path = location.pathname || '';
    if (path.indexOf('/devis') === 0 || path.indexOf('/merci') === 0) return;

    var triggered = false;

    document.addEventListener('mouseleave', function(e) {
      if (triggered) return;
      // Trigger seulement si la souris sort par le haut (vers les onglets/barre URL)
      if (e.clientY > 0) return;
      triggered = true;
      showExitPopup();
    });
  }

  function showExitPopup() {
    try { sessionStorage.setItem('ia-exit-popup-shown', '1'); } catch (e) {}

    var overlay = document.createElement('div');
    overlay.className = 'exit-popup-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'exitPopupTitle');
    overlay.innerHTML = ''
      + '<div class="exit-popup">'
      +   '<button type="button" class="exit-popup-close" aria-label="Fermer">×</button>'
      +   '<div class="exit-popup-emoji" aria-hidden="true">🎁</div>'
      +   '<h3 id="exitPopupTitle">Une dernière chose...</h3>'
      +   '<p>Pas encore prêt à demander un devis ? Recevez notre <strong>brochure PDF</strong> par email pour y revenir plus tard.</p>'
      +   '<form class="exit-popup-form" action="https://api.web3forms.com/submit" method="POST">'
      +     '<input type="hidden" name="access_key" value="f08ff9b7-efb2-4e47-bd2c-d79267ffee7a" />'
      +     '<input type="hidden" name="subject" value="Demande brochure - exit popup" />'
      +     '<input type="hidden" name="from_name" value="Exit popup interactis.be" />'
      +     '<input type="hidden" name="source" value="exit-popup" />'
      +     '<input type="hidden" name="page" id="exitPopupPage" value="" />'
      +     '<input type="hidden" name="redirect" value="https://www.interactis.be/merci" />'
      +     '<input type="checkbox" name="botcheck" style="display:none;" tabindex="-1" autocomplete="off" />'
      +     '<input type="email" name="email" required placeholder="vous@exemple.com" autocomplete="email" inputmode="email" aria-label="Votre adresse email" />'
      +     '<button type="submit" class="exit-popup-submit">Recevoir la brochure →</button>'
      +   '</form>'
      +   '<p class="exit-popup-trust">🔒 Aucun spam · Désabonnement en 1 clic</p>'
      + '</div>';

    document.body.appendChild(overlay);
    var pageInput = document.getElementById('exitPopupPage');
    if (pageInput) pageInput.value = location.pathname || '/';

    function close() {
      overlay.classList.add('is-closing');
      setTimeout(function() {
        if (overlay.parentNode) overlay.remove();
      }, 280);
      document.removeEventListener('keydown', onEscape);
    }
    function onEscape(e) {
      if (e.key === 'Escape') close();
    }
    overlay.querySelector('.exit-popup-close').addEventListener('click', close);
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', onEscape);

    // Animation d'entree
    requestAnimationFrame(function() {
      overlay.classList.add('is-visible');
      var emailInput = overlay.querySelector('input[type="email"]');
      if (emailInput) setTimeout(function() { emailInput.focus(); }, 300);
    });
  }

  // ============================================
  // INIT
  // ============================================
  function init() {
    injectUrgencyBanner();
    setupExitIntent();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
