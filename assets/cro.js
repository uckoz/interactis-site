/* ============================================
   InterActis - CRO (Conversion Rate Optimization)
   - Bandeau de reassurance sticky en haut (faits verifiables uniquement)
   - Pop-up de sortie : capture email PUIS remise immediate de la brochure
   - Lazy-load des videos (gain LCP / data mobile)

   REGLE : aucun message de rarete, de compte a rebours ou de disponibilite
   qui ne soit relie a une donnee reelle. Aucune promesse d'envoi qui ne
   soit honoree dans la seconde.
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
    // Pour les videos "user-play" (.lazy-video-userplay) on ne fait QUE charger la
    // src quand la video est visible -- pas d'autoplay programmatique. Comme ca,
    // quand l'utilisateur clique play depuis les controls natifs, le navigateur
    // considere que c'est un user-gesture et le son fonctionne tout de suite.
    function loadSrc(v, autoplay) {
      var src = v.getAttribute('data-src');
      if (src && !v.src) {
        v.src = src;
        v.load();
        if (autoplay) v.play().catch(function(){});
      }
    }
    if (!('IntersectionObserver' in window)) {
      vids.forEach(function(v){ loadSrc(v, !v.classList.contains('lazy-video-userplay')); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (!e.isIntersecting) return;
        var v = e.target;
        loadSrc(v, !v.classList.contains('lazy-video-userplay'));
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
  // 1) BANDEAU DE REASSURANCE
  // Remplace l'ancien bandeau "calendrier qui se remplit", qui affichait une
  // rarete inventee (texte fige, relie a aucun agenda). On n'affiche ici que
  // des engagements que l'entreprise tient reellement et qui sont deja
  // annonces ailleurs sur le site (devis gratuit, reponse sous 24 h).
  // ============================================
  function injectUrgencyBanner() {
    // Ne pas re-afficher si dejà fermé par l'utilisateur
    try {
      if (localStorage.getItem('ia-urgency-dismissed') === '1') return;
    } catch (e) {}

    var chemin = (location.pathname || '').replace(/\/+$/, '') || '/';

    // Sur /merci le message est au passe : le visiteur vient d'envoyer sa
    // demande. Lui reafficher "devis gratuit, demandez-le" donne l'impression
    // que le formulaire n'est pas parti. On n'affiche rien.
    if (chemin === '/merci' || chemin === '/merci.html') return;

    // Sur /devis le texte de reassurance reste utile juste au-dessus du
    // formulaire, mais le bouton pointerait vers la page en cours : on le
    // retire pour ne pas proposer un lien mort.
    var surDevis = (chemin === '/devis' || chemin === '/devis.html');

    var banner = document.createElement('div');
    banner.className = 'urgency-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Informations pratiques');
    banner.innerHTML = ''
      + '<div class="urgency-banner-inner">'
      +   '<span class="urgency-banner-emoji" aria-hidden="true">✅</span>'
      +   '<span class="urgency-banner-text">Devis gratuit et sans engagement · <strong>réponse sous 24 h</strong></span>'
      +   (surDevis ? '' : '<a href="/devis" class="urgency-banner-link">Demander mon devis <span aria-hidden="true">→</span></a>')
      +   '<button type="button" class="urgency-banner-close" aria-label="Fermer la bannière">×</button>'
      + '</div>';

    document.body.insertBefore(banner, document.body.firstChild);
    document.body.classList.add('has-urgency-banner');

    // Le header fixe doit descendre exactement de la hauteur de la banniere.
    // Cette hauteur depend de la largeur de l'ecran et de la langue : sur un
    // mobile de 390 px le texte passe sur deux lignes et la banniere fait 94 px,
    // pas les 68 px codes en dur auparavant. Resultat : la banniere recouvrait
    // le logo et le bouton menu. On mesure donc, et on remesure au redimensionnement.
    function syncBannerHeight() {
      if (!banner.isConnected) return;
      var h = Math.round(banner.getBoundingClientRect().height);
      if (h > 0) document.documentElement.style.setProperty('--urgency-h', h + 'px');
    }
    syncBannerHeight();
    if (window.ResizeObserver) {
      new ResizeObserver(syncBannerHeight).observe(banner);
    } else {
      window.addEventListener('resize', syncBannerHeight);
    }
    // Les polices web changent la hauteur du texte une fois chargees.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncBannerHeight).catch(function() {});
    }

    banner.querySelector('.urgency-banner-close').addEventListener('click', function() {
      banner.classList.add('is-closing');
      setTimeout(function() {
        banner.remove();
        document.body.classList.remove('has-urgency-banner');
        document.documentElement.classList.remove('has-urgency-banner');
        document.documentElement.style.removeProperty('--urgency-h');
      }, 250);
      try { localStorage.setItem('ia-urgency-dismissed', '1'); } catch (e) {}
    });
  }

  // ============================================
  // 2) POP-UP EXIT-INTENT (recupere les leads qui partent)
  // ============================================
  function setupExitIntent() {
    // Pas si deja montré dans cette session
    try {
      if (sessionStorage.getItem('ia-exit-popup-shown') === '1') return;
    } catch (e) {}
    // Pages ou la pop-up n'a rien a faire :
    //  - /devis et /merci : le visiteur est deja en train de convertir,
    //    l'interrompre ne peut que lui faire abandonner le formulaire.
    //  - pages legales : quelqu'un qui lit la politique de confidentialite
    //    ou les CGV cherche une information precise, souvent parce qu'il se
    //    pose deja une question de confiance. Lui reclamer son adresse mail
    //    a ce moment-la est au mieux inutile, au pire contre-productif.
    var path = (location.pathname || '').replace(/\/+$/, '') || '/';
    var exclues = ['/devis', '/merci', '/mentions-legales', '/confidentialite', '/cgv'];
    for (var i = 0; i < exclues.length; i++) {
      if (path === exclues[i] || path === exclues[i] + '.html') return;
    }

    var triggered = false;
    function fire() {
      if (triggered) return;
      triggered = true;
      showExitPopup();
    }

    if (window.matchMedia('(pointer: coarse)').matches) {
      // ---- MOBILE ----
      // Il n'y a pas de mouseleave fiable sur ecran tactile. On considere que
      // le visiteur "s'apprete a partir" quand il a lu une bonne partie de la
      // page puis remonte franchement vers le haut (reflexe avant de fermer
      // l'onglet ou de revenir en arriere).
      var maxDepth = 0;
      var lastY = window.scrollY;
      var upward = 0;

      window.addEventListener('scroll', function() {
        if (triggered) return;
        var y = window.scrollY;
        var doc = document.documentElement.scrollHeight - window.innerHeight;
        if (doc > 0) maxDepth = Math.max(maxDepth, y / doc);

        if (y < lastY) {
          upward += (lastY - y);
        } else {
          upward = 0;
        }
        lastY = y;

        // A lu au moins 45 % de la page, puis est remonte de 500 px d'affilee
        if (maxDepth > 0.45 && upward > 500) fire();
      }, { passive: true });

      // Filet : le visiteur bascule vers une autre appli / verrouille l'ecran
      document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'hidden' && maxDepth > 0.35) fire();
      });
    } else {
      // ---- DESKTOP ----
      document.addEventListener('mouseleave', function(e) {
        // Trigger seulement si la souris sort par le haut (vers les onglets/barre URL)
        if (e.clientY > 0) return;
        fire();
      });
    }
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
      +   '<div class="exit-popup-emoji" aria-hidden="true">📄</div>'
      +   '<h3 id="exitPopupTitle">Une dernière chose...</h3>'
      +   '<p>Pas encore prêt à demander un devis ? Laissez votre email et <strong>téléchargez la brochure tout de suite</strong> pour y revenir plus tard.</p>'
      +   '<form class="exit-popup-form" novalidate>'
      +     '<input type="checkbox" name="botcheck" style="display:none;" tabindex="-1" autocomplete="off" />'
      +     '<input type="email" name="email" required placeholder="vous@exemple.com" autocomplete="email" inputmode="email" aria-label="Votre adresse email" />'
      +     '<button type="submit" class="exit-popup-submit">Recevoir la brochure →</button>'
      +   '</form>'
      +   '<p class="exit-popup-error" role="alert" hidden></p>'
      +   '<p class="exit-popup-trust">🔒 Aucun spam · Désabonnement en 1 clic · <a href="/confidentialite">Vie privée</a></p>'
      + '</div>';

    document.body.appendChild(overlay);
    setupBrochureForm(overlay);

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
  // 3) FORMULAIRE BROCHURE
  // On enregistre l'email (base de donnees) PUIS on remet le PDF tout de
  // suite. Point important : la brochure est remise MEME si l'enregistrement
  // echoue. On a promis un telechargement immediat, on le tient ; c'est nous
  // qui perdons le contact, pas le visiteur qui perd son document.
  // ============================================
  var BROCHURE_URL = '/assets/brochure-interactis.pdf';
  var W3F_KEY = 'f08ff9b7-efb2-4e47-bd2c-d79267ffee7a';

  function deliverBrochure() {
    // Ouvre le PDF dans un nouvel onglet. On passe par un <a> temporaire
    // plutot que window.open() : moins bloque par les popup blockers car
    // l'action reste rattachee au clic de l'utilisateur.
    var a = document.createElement('a');
    a.href = BROCHURE_URL;
    a.target = '_blank';
    a.rel = 'noopener';
    a.download = 'brochure-interactis.pdf';
    document.body.appendChild(a);
    a.click();
    setTimeout(function() { if (a.parentNode) a.remove(); }, 0);
  }

  function setupBrochureForm(overlay) {
    var form = overlay.querySelector('.exit-popup-form');
    var errorEl = overlay.querySelector('.exit-popup-error');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      var emailInput = form.querySelector('input[type="email"]');
      var submitBtn = form.querySelector('.exit-popup-submit');
      var honeypot = form.querySelector('[name="botcheck"]');
      var email = (emailInput && emailInput.value || '').trim();

      // Validation simple cote client (le navigateur ne la fait pas : novalidate)
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        if (errorEl) {
          errorEl.textContent = 'Merci de saisir une adresse email valide.';
          errorEl.hidden = false;
        }
        if (emailInput) emailInput.focus();
        return;
      }
      if (errorEl) errorEl.hidden = true;

      // Honeypot rempli = bot. On ne fait rien de visible.
      if (honeypot && honeypot.checked) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Préparation…';
      }

      var payload = {
        access_key: W3F_KEY,
        subject: 'Demande brochure - exit popup',
        from_name: 'Exit popup interactis.be',
        email: email,
        source: 'exit-popup',
        page: location.pathname || '/',
        botcheck: ''
      };

      function done() {
        showBrochureSuccess(overlay);
        deliverBrochure();
      }

      var settled = false;
      function once() {
        if (settled) return;
        settled = true;
        done();
      }

      // Filet de securite : si l'API met plus de 6 s, on remet quand meme
      // la brochure. La promesse passe avant la collecte.
      var timer = setTimeout(once, 6000);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(function() { clearTimeout(timer); once(); })
      .catch(function() { clearTimeout(timer); once(); });
    });
  }

  function showBrochureSuccess(overlay) {
    var card = overlay.querySelector('.exit-popup');
    if (!card) return;
    card.innerHTML = ''
      + '<button type="button" class="exit-popup-close" aria-label="Fermer">×</button>'
      + '<div class="exit-popup-emoji" aria-hidden="true">✅</div>'
      + '<h3>Votre brochure arrive</h3>'
      + '<p>Le téléchargement démarre automatiquement. Si rien ne se passe, utilisez le bouton ci-dessous.</p>'
      + '<p><a class="exit-popup-submit exit-popup-download" href="' + BROCHURE_URL + '" target="_blank" rel="noopener" download>Télécharger la brochure (PDF)</a></p>'
      + '<p class="exit-popup-trust">Une question d\'ici là ? <a href="/devis">Demander un devis gratuit</a></p>';

    card.querySelector('.exit-popup-close').addEventListener('click', function() {
      overlay.classList.add('is-closing');
      setTimeout(function() { if (overlay.parentNode) overlay.remove(); }, 280);
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

/*
 * Conversions ameliorees Google Ads : au moment ou un formulaire de devis
 * est soumis, on memorise nom/email/telephone en sessionStorage.
 * La page /merci les lit et les transmet a gtag via user_data
 * (donnees hachees par la balise Google, jamais stockees ailleurs).
 */
(function () {
  function grab(form, names) {
    for (var i = 0; i < names.length; i++) {
      var el = form.querySelector('[name="' + names[i] + '"]');
      if (el && el.value) return el.value.trim();
    }
    return '';
  }
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || !form.classList || !form.classList.contains('contact-form')) return;
    try {
      sessionStorage.setItem('ia_ec', JSON.stringify({
        fn: grab(form, ['nom', 'name']),
        em: grab(form, ['email']),
        ph: grab(form, ['tel', 'phone'])
      }));
    } catch (err) { /* silent */ }
  }, true);
})();


/* ---- Conversion Google Ads : clic WhatsApp ---- */
(function () {
   document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]') : null;
      if (!a) return;
      if (window.gtag) {
         window.gtag('event', 'conversion', {
            'send_to': 'AW-18186820643/dWq4CIr9iuscEKO4k-BD',
            'value': 1.0,
            'currency': 'EUR'
         });
      }
   }, true);
})();


/* ---- Conversion Google Ads : clic telephone ---- */
(function () {
   document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href^="tel:"]') : null;
      if (!a) return;
      if (window.gtag) {
         window.gtag('event', 'conversion', {
            'send_to': 'AW-18186820643/_WXHCM3HpOscEKO4k-BD',
            'value': 1.0,
            'currency': 'EUR'
         });
      }
   }, true);
})();
