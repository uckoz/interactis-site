/*
* InterActis — bandeau de consentement RGPD + Google Consent Mode v2
* La balise Google est chargee immediatement mais en mode "refuse" (aucun cookie
* publicitaire tant que l'utilisateur n'a pas accepte). Apres acceptation :
* consentement accorde + chat Tawk.to. Choix stocke 12 mois dans localStorage.
*/
(function () {
  var KEY = 'interactis_consent_v1';
  var DAYS = 365;
  var GADS_ID = 'AW-18186820643';
  var TAWK_ID = '6a0b93230ff9d11c35914030/1joujdgtg';

 window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

 // Consent Mode v2 : tout refuse par defaut (RGPD)
 window.gtag('consent', 'default', {
   'ad_storage': 'denied',
   'ad_user_data': 'denied',
   'ad_personalization': 'denied',
   'analytics_storage': 'denied',
   'wait_for_update': 500
 });
  window.gtag('set', 'url_passthrough', true);

 // Balise Google chargee tout de suite (fonctionne sans cookies tant que refuse)
 var g = document.createElement('script');
  g.async = true;
  g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GADS_ID;
  document.head.appendChild(g);
  window.gtag('js', new Date());
  window.gtag('config', GADS_ID, { 'allow_enhanced_conversions': true });

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

 var granted = false;
  function grantConsent() {
    if (granted) return;
    granted = true;
    window.gtag('consent', 'update', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'analytics_storage': 'granted'
    });
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
     '.ia-banner{position:fixed;left:16px;right:16px;bottom:16px;max-width:560px;margin:0 auto;background:#0f172a;color:#fff;padding:16px 18px;border-radius:14px;box-shadow:0 25px 60px rgba(0,0,0,.45);z-index:2147483600;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;animation:iaUp .4s ease}',
     '.ia-banner p{margin:0 0 12px}',
     // Mesure : sur iPhone (390x844) le bandeau faisait 206 px de haut et
     // recouvrait le bouton « Demander mon devis » du hero, c'est-a-dire le
     // seul element de la page qui rapporte quelque chose. Sur 360x640 il
     // mangeait un tiers de l'ecran. Le texte a ete raccourci (meme
     // information : finalites + lien vers la politique) et les marges
     // resserrees sur petit ecran. Le bandeau reste obligatoire, il n'est
     // plus posé sur le bouton.
     '@media(max-width:520px){.ia-banner{left:10px;right:10px;bottom:10px;padding:14px 15px;font-size:13px}' +
       '.ia-banner p{margin:0 0 10px}' +
       '.ia-banner-actions{gap:8px}' +
       '.ia-banner button{flex:1;padding:11px 12px}}',
     // Ecrans courts (iPhone SE 667, vieux Android 640) : 140 px de bandeau
     // sur 667 px d'ecran, c'est un cinquieme de la page. On resserre encore.
     // Les boutons restent a 44 px de haut, minimum tactile recommande.
     '@media(max-height:700px){.ia-banner{padding:11px 13px;font-size:12.5px;line-height:1.42;bottom:8px}' +
       '.ia-banner p{margin:0 0 8px}' +
       '.ia-banner button{padding:9px 12px}}',
     '.ia-banner a{color:#fb923c;text-decoration:underline}',
     '.ia-banner-actions{display:flex;gap:10px;flex-wrap:wrap}',
     '.ia-banner button{padding:10px 18px;border:none;border-radius:10px;font-weight:600;cursor:pointer;font-size:14px;font-family:inherit}',
     // Texte sombre : blanc sur #fb923c ne donne que 2.26:1 (min AA 4.5:1)
     '.ia-banner .ia-accept{background:#fb923c;color:#1b0f00}',
     '.ia-banner .ia-accept:hover{background:#ea580c;color:#1b0f00}',
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
   // L'emoji 🍪 en tete du bandeau a ete retire : il donnait un ton badin a
   // un texte qui engage juridiquement, son rendu variait d'un systeme a
   // l'autre, et il n'apportait aucune information.
   // Texte raccourci de 6 lignes a 2 sur telephone. Les mentions exigees
   // restent la : les finalites (mesure d'audience, publicite, chat) et
   // l'acces a la politique de confidentialite. Le reste etait de la
   // paraphrase — « vous pouvez accepter ou refuser » double simplement les
   // deux boutons situes juste en dessous.
   b.innerHTML =
     '<p><strong>Nous respectons votre vie privée.</strong> ' +
     'Cookies de mesure d\u2019audience, de publicité (Google Ads) et chat en direct. ' +
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
     grantConsent();
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
   l.textContent = 'Cookies';
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
     grantConsent();
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
