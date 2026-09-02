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

### Et surtout : le site se contredit sur deux de ces chiffres

Ce n'est pas une nuance, c'est visible par n'importe quel visiteur qui
ouvre deux pages :

| Chiffre | Version A | Version B |
|---|---|---|
| Nombre de jeux | **35+** — accueil, `/particuliers`, `/professionnels`, `/devis`, les 9 pages villes… soit 14 pages | **36** — `/animation-ecole` et `/animation-maison-de-repos`, soit 2 pages |
| Installation | **15 min** — mêmes 14 pages | **&lt; 3 min** — mêmes 2 pages |

J'ai laissé partout la version A, qui est la version majoritaire et celle
qu'emploient les textes rédigés. **Je n'ai pas tranché** : je ne sais pas
laquelle est vraie, et c'est à toi de le dire.

Attention au sens de l'erreur. Si l'installation prend réellement 15
minutes et que le site promet moins de 3 minutes, la promesse casse le jour
de l'animation, devant le client. Si c'est l'inverse, tu te sous-vends —
c'est regrettable mais sans dégât. En cas de doute, garde 15 min.

Dis-moi la bonne valeur pour chacun des deux et je la propage sur les 16
pages en une passe.

---

## 8. Deux textes d'avis Google que je n'ai pas pu lire

**Où :** bloc « Déjà venus… » de `/animation-charleroi` et `/animation-lille`.

Tu m'as dit qu'Élodie Orsini (organisatrice d'« Ensemble avec les personnes
extraordinaires ») et Angèle Demey (Herzeele) ont laissé un avis. Je te
crois, mais je n'ai pas lu ces deux textes : Google bloque l'accès à la
fiche derrière son mur de consentement.

**Ce que j'ai fait :** j'ai nommé les deux lieux, qui sont des faits que tu
m'as confirmés. Je n'ai cité personne. Une citation reconstituée de mémoire
reste une citation inventée.

**Ce qu'il faut :** copier-coller les deux textes depuis ta fiche Google et
me les envoyer. Je les branche à l'endroit prévu, qui existe déjà dans le
code (`.preuve-locale-avis`).

---

## 9. La mosquée — la référence que tu ne m'as toujours pas décrite

**Où :** nulle part encore. Rien n'a été écrit à ce sujet.

Tu m'as dit « je suis également allé dans une mosquée » et on n'a jamais
repris ce fil. Il me faut : le nom, la commune, le type d'événement, et
si c'était payé ou une démo.

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
