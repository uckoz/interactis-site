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

  // -- Cookie banner (affichage si pas encore de choix stocké) --
  var banner = document.getElementById('cookieBanner');
  if (banner) {
    var stored = null;
    try { stored = localStorage.getItem('ia-cookie-consent'); } catch (e) {}
    if (!stored) {
      setTimeout(function() { banner.classList.add('is-visible'); }, 800);
    }
    var accept = document.getElementById('cookieAccept');
    var reject = document.getElementById('cookieReject');
    function close(value) {
      try { localStorage.setItem('ia-cookie-consent', value); } catch (e) {}
      banner.classList.remove('is-visible');
    }
    if (accept) accept.addEventListener('click', function() { close('accepted'); });
    if (reject) reject.addEventListener('click', function() { close('rejected'); });
  }

});
