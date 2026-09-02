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

---

## 6. Trois témoignages que j'ai retirés de /devis — à confirmer

**Où :** `devis.html`, colonne de droite `.devis-proof`.

La page affichait quatre témoignages. Un seul était nommé et attribué
à Google (Romina Loria). Les trois autres étaient anonymes et ne
correspondent à aucun de tes avis Google :

| Attribution affichée | Texte | Problème |
|---|---|---|
| Directrice d'EHPAD · Maison de repos · Hainaut | « Les résidents en ont parlé pendant des jours… On reprend pour le mois prochain. » | Tu m'as dit n'avoir **aucune maison de repos payante**, uniquement des démos. Le texte affirme une reconduction. |
| Sophie L. · Anniversaire enfant · Mons | — | Aucun avis Google à ce nom. Source inconnue. |
| RH PME · Team building · Bruxelles | — | Aucun avis Google. Tu as fait **un** team building. |

**Ce que j'ai fait :** je les ai remplacés par tes trois vrais avis
Google (Maryline, Elo, Pierre-Yves), chacun avec un badge « Avis
Google ». La page compte toujours quatre témoignages, tous vérifiables.

**Ce qu'il faut me dire :** si ces trois témoignages venaient de retours
réels reçus par mail ou SMS, on peut les remettre — mais il faut alors
l'accord écrit de la personne et une attribution honnête. S'ils ont été
inventés pour remplir la page, il faut aussi vérifier qu'ils n'existent
nulle part ailleurs sur le site. En Belgique, un faux avis client est
une pratique commerciale trompeuse (Livre VI du Code de droit
économique) : le risque n'est pas seulement moral.

---

## 7. Quatre chiffres produits que je n'ai pas pu vérifier

**Où :** `devis.html`, bloc `.proof-stats`.

Ces chiffres étaient déjà sur ton site et je ne les ai pas touchés, mais
je ne peux pas les confirmer depuis ici. Confirme-les ou corrige-les :

- « 35+ jeux interactifs » — le catalogue en compte-t-il vraiment 35 ?
- « 100 % inclusif PMR » — vrai pour *tous* les jeux, ou seulement une partie ?
- « 15 min d'installation » — chronométré, ou estimé ?
- « 5-95 ans » — formule marketing, celle-là passe.

Et dans le bloc « Notre engagement », la phrase « Vous ne payez rien tant
que vous n'avez pas signé un bon de commande » suppose que tu envoies
réellement un bon de commande à signer. Si ton process est plus informel
(un accord par mail), reformule.

### Deux chiffres sur lesquels le site se contredisait

**Installation : réglé.** Tu m'as confirmé le 2 septembre 2026 que
l'installation prend **15 minutes**. Les deux pages qui annonçaient
« moins de 3 minutes » (`/animation-ecole` et `/animation-maison-de-repos`)
ont été corrigées, aux quatre endroits concernés. Le site annonce
maintenant 15 minutes partout, sans exception.

**Nombre de jeux : toujours ouvert.** Le site dit encore deux choses :

| Version | Où |
|---|---|
| **35+ jeux** | accueil, `/particuliers`, `/professionnels`, `/devis`, les 9 pages villes — 14 pages |
| **36 jeux** | `/animation-ecole` et `/animation-maison-de-repos` — 2 pages |

Ce n'est pas grave, mais ça se voit. Compte le catalogue et donne-moi le
chiffre : je le propage sur les 16 pages en une passe. Si c'est bien 36,
autant l'écrire — un chiffre exact est plus crédible qu'un « 35+ ».

---

## 8. Les textes des avis Google d'Élodie Orsini et d'Angèle Demey

**Où :** bloc « Déjà venus… » de `/animation-charleroi` et `/animation-lille`.

**Élodie Orsini : réglé.** Tu m'as transmis le texte le 2 septembre 2026.
Il est en ligne à trois endroits : `/animation-charleroi`,
`/animation-belgique`, et en tête de la colonne de preuve de `/devis`, où
il remplace Romina Loria comme témoignage mis en avant.

Ce choix n'est pas esthétique. C'est le seul avis de ton site qui soit à la
fois daté, signé d'un rôle vérifiable (coordinatrice d'un événement
provincial), descriptif de ce qui a réellement eu lieu, et terminé par une
réinvitation pour 2027. Une direction d'école ou un service RH peut le lire
sans avoir besoin de te faire confiance au préalable. Tes trois autres avis
sont bons mais viennent de particuliers : ils ne pèsent pas dans le même
sens. Romina Loria reste affichée, en témoignage standard.

**Angèle Demey : toujours manquant.** Copie-colle son texte depuis ta fiche
Google et je le branche sur `/animation-lille` ; l'emplacement existe déjà
dans le code (`.preuve-locale-avis`).

---

## 9. La mosquée de Cuesmes

**Où :** nulle part encore. Rien n'a été écrit à ce sujet sur le site.

Tu m'as dit le 2 septembre qu'il s'agit d'une **mosquée turque à Cuesmes**.
Cuesmes fait partie de Mons — c'est donc une référence directement
exploitable sur `/animation-mons`, où Cuesmes est déjà cité nommément dans
le texte.

**Il me manque encore deux choses :** le type d'événement (fête pour les
enfants ? journée portes ouvertes ? ramadan, aïd ?) et si c'était payé ou
une démo.

**Et une question que je ne veux pas trancher à ta place :** est-ce que tu
veux que la référence soit nommée publiquement sur le site ? Ce n'est pas
la même décision que pour une école. Certains visiteurs y verront une
preuve que tu travailles avec tous les publics, ce qui est un vrai
argument, surtout pour les écoles et les communes. D'autres réagiront
autrement. C'est ton commerce et ton quartier, tu es mieux placé que moi
pour juger. Trois options possibles : la nommer, l'écrire sans la nommer
(« un centre communautaire à Cuesmes »), ou ne pas la mettre sur le site
et l'utiliser uniquement en démarchage. Dis-moi laquelle et je l'applique.

**Pourquoi j'insiste :** les lieux de culte, maisons de quartier et ASBL
qui organisent des activités enfants se recommandent entre eux beaucoup
plus vite qu'une école ne recommande une autre école. Une école change
d'avis en conseil de direction, une fois par trimestre. Un réseau
associatif se passe un numéro de téléphone le soir même. À mon avis c'est
ton meilleur canal et c'est celui dont tu m'as le moins parlé.

---

## 10. Deux villes sans aucune preuve locale : Liège et Luxembourg

**Où :** `/animation-liege` et `/animation-luxembourg`.

Les sept autres pages villes affichent un bloc « Déjà venus… » qui nomme un
lieu réel. Ces deux-là n'en ont pas, parce que tu n'y es jamais allé. Je
n'ai rien inventé pour combler le trou.

**Ce qu'il faut :** soit une première intervention là-bas, même une démo
gratuite, et le bloc se remplit tout seul ; soit assumer que ces deux pages
resteront plus faibles que les autres. Ne me demande pas d'y écrire une
phrase vague du genre « nous intervenons dans toute la région liégeoise » :
ça ne convainc personne et ça ne se vérifie pas.
