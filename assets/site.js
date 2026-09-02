/* ============================================
   InterActis - JS partagé (curseur, menu mobile, année footer)
   Utilisé par /devis, /blog et les articles de blog.
   Note : /index.html garde son propre JS inline (avec Lenis + GSAP)
   pour les animations complexes du scroll cinématique.
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // -- Année du footer --
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // -- Curseur custom (désactivé sur mobile/tablette) --
  var isCoarse = window.matchMedia('(pointer: coarse)').matches;
  if (!isCoarse) {
    var cursor = document.querySelector('.cursor');
    var ring = document.querySelector('.cursor-ring');
    if (cursor && ring) {
      var mx = 0, my = 0, cx = 0, cy = 0, rx = 0, ry = 0;
      window.addEventListener('mousemove', function(e){ mx = e.clientX; my = e.clientY; });
      (function animateCursor(){
        cx += (mx - cx) * 0.55;
        cy += (my - cy) * 0.55;
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        cursor.style.transform = 'translate(' + cx + 'px, ' + cy + 'px) translate(-50%, -50%)';
        ring.style.transform = 'translate(' + rx + 'px, ' + ry + 'px) translate(-50%, -50%)';
        requestAnimationFrame(animateCursor);
      })();
      document.querySelectorAll('[data-hover]').forEach(function(el){
        el.addEventListener('mouseenter', function(){
          cursor.classList.add('is-hover');
          ring.classList.add('is-hover');
        });
        el.addEventListener('mouseleave', function(){
          cursor.classList.remove('is-hover');
          ring.classList.remove('is-hover');
        });
      });
    }
  }

  // -- Menu mobile (burger) --
  var burger = document.getElementById('burger');
  var overlay = document.getElementById('menuOverlay');
  if (burger && overlay) {
    burger.addEventListener('click', function() {
      var open = overlay.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Fermer au clic sur un lien du menu
    overlay.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        overlay.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Le second bandeau cookies a ete retire : il s'affichait en meme temps
  // que celui de assets/consent.js, il n'agissait sur aucun traceur (il ne
  // faisait qu'ecrire 'ia-cookie-consent' dans localStorage) et son texte
  // affirmait "aucune publicite, aucun pistage tiers" alors que le site
  // charge Google Ads, PostHog et tawk.to. Le consentement reel est gere
  // par assets/consent.js (Google Consent Mode v2).

});

/* ============================================
   FAQ - accordeon du composant partage (.faq de assets/site.css)
   ============================================
   Ce gestionnaire vivait en copie locale dans index.html uniquement. La CSS
   du composant (.faq-item.is-open .faq-a { max-height: 400px }) est pourtant
   chargee sur TOUTES les pages : n'importe quelle page reprenant le balisage
   partage heritait donc du style mais pas du comportement, et sa FAQ restait
   muette au clic. C'est ce qui est arrive a /animation-plaine-de-jeux.
   On centralise ici, une fois, et la copie d'index.html a ete supprimee pour
   eviter un double basculement (deux gestionnaires = clic sans effet).

   Non touchees volontairement : /animation-maison-de-repos et
   /animation-entreprise. Elles n'utilisent pas ce composant mais leur propre
   balisage et leur propre CSS locale, avec un mecanisme different
   (classe 'open' pour l'une, max-height en style inline pour l'autre).
   Les brancher ici les casserait. Elles fonctionnent, on les laisse.
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
  var items = document.querySelectorAll('.faq .faq-item');
  if (!items.length) return;

  items.forEach(function(item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;

    // Accessibilite : le bouton annonce l'etat du panneau qu'il commande.
    var panel = item.querySelector('.faq-a');
    q.setAttribute('aria-expanded', 'false');
    if (panel) {
      if (!panel.id) panel.id = 'faq-a-' + Math.random().toString(36).slice(2, 8);
      q.setAttribute('aria-controls', panel.id);
    }

    q.addEventListener('click', function() {
      var wasOpen = item.classList.contains('is-open');
      // Accordeon : une seule reponse ouverte a la fois. Sur telephone, deux
      // reponses ouvertes repoussent les suivantes hors de l'ecran.
      items.forEach(function(other) {
        other.classList.remove('is-open');
        var ob = other.querySelector('.faq-q');
        if (ob) ob.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('is-open');
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
