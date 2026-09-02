# Contenu à fournir

Ce fichier liste ce qui manque pour finir la refonte. Rien de ce qui est
listé ici n'a été inventé sur le site : les emplacements existent dans le
code, ils restent vides tant que l'information réelle n'existe pas.

Chaque entrée dit **où** ça se branche et **pourquoi** c'est bloquant.

---

## 1. Une garantie écrite — bloquant pour la conversion

**Où :** bandeau de preuve de l'accueil (`index.html`, `<section class="proof">`)
et au-dessus du formulaire de `/devis`.

**Pourquoi :** c'est la seule chose qui manque au bandeau de preuve. Un
visiteur qui hésite à 249 € a besoin de savoir ce qui se passe si ça se
passe mal. Aujourd'hui le site ne répond pas à cette question.

**Ce qu'il faut décider :** une phrase que tu es réellement prêt à tenir.
Par exemple, au choix, et seulement si c'est vrai :

- « Si l'animation ne démarre pas, vous ne payez rien. »
- « Annulation gratuite jusqu'à X jours avant. »
- « Report sans frais en cas de météo / maladie. »

Ne rien écrire est préférable à écrire une garantie que tu ne tiendras pas.

---

## 2. Un témoignage vidéo client — fort impact, pas bloquant

**Où :** accueil, section `#temoignages`.

**Pourquoi :** tu as 3 avis Google écrits, réels et bien tournés. Une vidéo
de 20 à 30 secondes d'un parent ou d'une directrice d'école vaut plus que
les trois réunis, parce qu'elle est invérifiable à truquer et qu'on voit
les enfants jouer derrière.

**Le plus simple :** à la prochaine animation en école ou en anniversaire,
demander à la personne qui t'a réservé de dire face caméra, au téléphone :
qui elle est, pourquoi elle a choisi ça, ce que les enfants ont fait.
Accord écrit de la personne + accord des parents si des enfants sont
identifiables.

---

## 3. Le nombre d'animations réalisées — à compter, pas à estimer

**Où :** bandeau de preuve de l'accueil.

**Pourquoi :** « X animations depuis 2025 » est un signal de confiance fort
et facile. Mais il faut le vrai chiffre. Compte tes factures.

---

## 4. Le tarif professionnel — bloquant pour la page /professionnels

**Où :** cartes « univers » pro de l'accueil, `/animation-ecole`,
`/animation-entreprise`, `/animation-evenement`, `/devis`.

**Pourquoi :** aujourd'hui tout le côté pro affiche « sur devis ». Le
particulier voit 249 € et sait s'il est dans son budget ; l'école, elle,
ne sait pas si c'est 300 € ou 3 000 €, donc elle ne demande pas. Tu m'as
dit vouloir deux tarifs différents mais tu ne m'as donné aucun chiffre,
donc je n'en ai inventé aucun.

**Ce qu'il faut :** au minimum un prix plancher honnête, formulé
« à partir de X € HTVA », pour l'école et pour l'entreprise.

---

## 5. Vérification périodique : le compteur d'avis Google

**Où :** accueil (bandeau de preuve + `#temoignages`), bas de page.

Le site affiche « 5,0 sur Google · 9 avis ». Ce chiffre vieillit tout
seul. Je n'ai pas pu le vérifier depuis ici (Google bloque l'accès
derrière son mur de consentement). À revérifier sur ta fiche Google, et à
mettre à jour à chaque nouvel avis — c'est 3 endroits dans `index.html`.
