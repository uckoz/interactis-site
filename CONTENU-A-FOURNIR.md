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

## 4. La grille tarifaire — arrêtée le 2 septembre 2026

| Segment | Prix affiché | Base |
|---|---|---|
| Anniversaire, fête de famille | à partir de 249 € | TVA comprise |
| École, maison de repos, plaine de jeux, commune, ASBL | à partir de 300 € pour 1h30 | TVA comprise |
| École, plaine de jeux, commune : journée complète | à partir de 1 049 € | TVA comprise |
| Entreprise, team building, événement d'entreprise | à partir de 349 € pour 1h30 | Hors TVA |

**Une seule unité de durée : 1h30.** C'est ce qui transforme une liste de
prix en grille tarifaire. Avant, le site comparait 1h30 d'anniversaire à
une journée d'école : illisible. Maintenant l'échelle se lit d'un coup
d'œil — le privé au plus bas, le non-marchand au milieu, le corporate
au-dessus. Ça se défend en une phrase au téléphone.

**Tout est en « à partir de »**, journée scolaire comprise. Aucun prix
ferme nulle part, tu ajustes selon la durée, l'effectif et le lieu.

**Tout est TVA comprise, sauf l'entreprise.** C'est toi qui as eu raison
sur ce point et moi qui m'étais trompé : je t'avais donné la règle
« HTVA pour les pros, ils récupèrent la TVA ». C'est vrai d'une
entreprise, c'est faux de tes deux meilleurs segments. En Belgique
l'enseignement et les maisons de repos sont exonérés de TVA (article 44
du Code TVA) : ils ne la récupèrent pas. Leur afficher du HTVA revenait à
leur montrer un prix qu'ils ne paieraient jamais, et à leur faire une
mauvaise surprise de 21 % sur le devis. Seule l'entreprise assujettie
garde le HTVA, sans conversion TVAC affichée, pour rester comparable aux
devis de tes concurrents.

**Le doublon 249 est supprimé.** L'ancienne grille affichait 249 € TVAC
pour un anniversaire et 249 € HTVA pour une maison de repos : le même
nombre pour deux totaux différents. C'était le seul endroit du site où un
lecteur attentif pouvait croire à une erreur. La maison de repos est
passée à 300 € TVA comprise. Plus aucun montant n'apparaît deux fois avec
deux bases.

**Aucun kilométrage gratuit n'est annoncé**, à ta demande. Ni sur les
pages de vente, ni dans les CGV. Le site dit partout la même chose : les
frais de déplacement sont chiffrés dans le devis et rien ne s'ajoute
après acceptation. C'est ce qui rassure un client — il veut l'absence de
surprise, pas la gratuité — et ça te laisse décider au cas par cas.

**Ce que j'ai retiré des CGV.** L'article 4.2 engageait **0,70 €/km
au-delà du rayon**. Ce chiffre était là avant moi, personne ne l'a jamais
confirmé, et il contredisait le principe du devis au cas par cas. Un
tarif kilométrique écrit dans des CGV est opposable : mieux vaut ne rien
écrire qu'écrire un chiffre qu'on n'applique pas. Si tu veux un barème
officiel, donne-le-moi et je le remets proprement.

**Plus aucune page sans tarif.** `/animation-evenement` et
`/animation-plaine-de-jeux` affichaient « sur devis » : c'est réglé.
La plaine de jeux suit intégralement la grille école, journée complète
comprise. La page événement affiche les deux tarifs côte à côte, parce
qu'elle s'adresse à deux acheteurs différents.

**Communes et ASBL : alignées sur l'école (décision du 02/09/2026).**
Le point de vigilance soulevé plus haut est tranché. Une commune, une
ASBL ou un comité de quartier paie désormais 300 € TVA comprise pour
1h30, ou 1 049 € TVA comprise la journée, comme une école. Deux raisons :
elles ne récupèrent pas la TVA, et une kermesse communale ne se paie pas
avec le budget d'un team building. Seules les entreprises assujetties
restent à 349 € HTVA.

**Hiérarchie inversée sur école et plaine de jeux (02/09/2026).** Sur le
carnet réel d'Ubeyd — 1 anniversaire en septembre, 2 journées complètes
en octobre — la journée fait 89 % du chiffre d'affaires et lui rapporte
92 €/h de son temps contre 41 €/h pour une 1h30. Le site affichait
pourtant « 300 € » en gros orange et la journée en petit gris : on
mettait en avant le plus mauvais produit. C'est inversé. La journée est
le montant principal, la 1h30 devient la rampe d'accès (« ou à partir de
300 €, si vous voulez commencer par une seule classe »).

**À ajouter dès qu'il connaît les chiffres : le coût par enfant.**
1 049 € pour 6 classes de 22 élèves, c'est 7,95 € par enfant. Pour 8
classes, 5,96 €. C'est l'argument le plus fort face à une direction, et
il n'est nulle part sur le site. Il faut qu'Ubeyd confirme combien de
classes il fait passer sur une journée type avant qu'on l'affiche.

**Le nouveau point à surveiller, à l'inverse.** Une grande commune qui
commande l'animation phare de sa fête annuelle a souvent un budget
événementiel, pas un budget scolaire. En l'alignant sur l'école, on lui
propose peut-être moins qu'elle n'était prête à payer. À vérifier sur
les prochains devis communaux : si aucun ne fait tiquer sur le prix,
c'est le signe que le plancher est trop bas pour ce public.

---

## 5. Le compteur d'avis Google — vérifié, et deux avis oubliés

**Où :** accueil (bandeau de preuve + `#temoignages`), bas de page.

**Vérifié le 2 septembre 2026** sur ta fiche : **5,0 · 9 avis**, 627 vues.
Le chiffre affiché sur le site est donc exact aujourd'hui. Il vieillit
tout seul : à remettre à jour à chaque nouvel avis, c'est 3 endroits dans
`index.html`.

Sur les 9 notes, **8 sont des avis écrits** (la neuvième est une note sans
texte). Tu m'en avais cité quatre. Il y en a deux que tu ne m'avais pas
signalés :

| Auteur | Texte | Ce que j'en fais |
|---|---|---|
| Esra Kuruoğlu | « Hier je suis allé à l'événement ensemble pour les personnes extraordinaires à Marcinelle. J'ai vu le concept top, 100 % inclusive » | **Pas publié.** Elle a *vu* le stand, elle n'a rien acheté. La publier comme témoignage client serait faux. |
| Betül Şengül | « Super activité et original. Je conseille 👍 » | **Pas publié.** Aucun contexte : ni lieu, ni date, ni type d'événement. Ça ne convainc personne. |

Je ne les ai pas mises en ligne, et ce n'est pas un oubli. Ton site
affiche déjà cinq témoignages ; en ajouter deux faibles affaiblit les
trois forts. Une page de témoignages se juge au plus mauvais, pas au
nombre.

### Trois de tes avis étaient tronqués sur le site — corrigé

En relisant les textes originaux sur ta fiche, je me suis aperçu que le
site coupait tes trois meilleurs avis, et coupait précisément les phrases
qui vendaient. C'était le cas **avant** mon intervention. Corrigé le
2 septembre 2026, texte exact de Google désormais :

- **Pierre-Yves Maniquet** — le site affichait *« L'idée derrière
  InterActis est absolument nouvelle et géniale. Je la recommande :
  directions d'école, entreprises… »*. Il avait aussi écrit : *« Ubeyd a
  animé la fête d'anniversaire de ma fille de 7 ans. C'était démentiel.
  Même les adultes ont joué. »* C'est la phrase la plus vendeuse de toute
  ta fiche et elle n'était nulle part.
- **Maryline Salmon** — il manquait l'ouverture, *« Superbe expérience
  adaptée à l'âge des enfants »*, qui répond exactement à l'inquiétude
  d'un parent.
- **Elo C.** — il manquait *« pour vivre un moment super entre amis »*.

Les auteurs sont maintenant nommés en entier, comme sur Google : un
prénom seul se lit comme un avis inventé.

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

- ~~« 35+ jeux interactifs »~~ — **réglé** : 41 jeux, propagé sur 21 pages.
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

**Nombre de jeux : réglé le 2 septembre 2026.** Tu as compté : **41 jeux**.
Les 23 mentions de « plus de 35 jeux » / « 35+ » réparties sur 21 fichiers
ont été remplacées par « 41 jeux », y compris les compteurs animés de
l'accueil et les cartes statistiques des 9 pages villes.

J'ai supprimé le « + » et le « plus de » exprès. Un chiffre rond suivi d'un
plus se lit comme une estimation marketing ; un nombre exact et impair se
lit comme un fait vérifié. « 41 jeux » est à la fois plus crédible et plus
élevé que « plus de 35 » — tu te sous-vendais.

À refaire le jour où le catalogue bouge : une seule passe, le chiffre est
au même format partout.

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

**Angèle Demey : réglé.** Texte reçu le 2 septembre 2026, publié sur
`/animation-lille`. Avis d'août 2026, 5 étoiles.

**Mais il y a mieux dans cet avis que le texte : la photo.** Angèle a joint
une photo prise sur place, à Herzeele — une vingtaine d'enfants debout face
au jeu projeté, ballons à la main, des adultes au fond. C'est exactement
l'image que ton site n'a pas.

Rappel de ce que le site montre aujourd'hui : `images/hero.jpg`, une valise
de transport en plastique bleu, utilisée 51 fois dans le code, dont
l'`og:image` d'environ 25 pages. C'est ce visuel qui s'affiche quand
quelqu'un partage ton site sur WhatsApp, Facebook ou LinkedIn.

**Ce qu'il faut :** tes propres photos des animations, en plein cadre,
prises pendant que ça joue. Tu étais présent à chacune de ces animations,
tu en as forcément. Il en faut trois ou quatre : une école, un
anniversaire, un événement. Accord écrit des parents pour tout enfant
identifiable — sans ça, on floute ou on cadre de dos.

Ne reprends pas la photo d'Angèle : elle est à elle, pas à toi.

---

## 9. La mosquée de Cuesmes — écartée, à la demande du client

**Statut : classé.** Rien n'a été écrit à ce sujet sur le site et rien ne
le sera sans nouvelle instruction.

Le client a précisé le 2 septembre 2026 : il est lui-même d'origine turque,
on lui a demandé de venir, il y est allé. C'est un service rendu dans son
réseau personnel, pas une prestation commerciale. Il a demandé de laisser
tomber pour l'instant.

C'est cohérent : une référence qui n'a pas été vendue ne prouve pas qu'on
sait vendre. Elle prouve seulement qu'on connaît quelqu'un.

**Ce qui reste vrai malgré tout**, et qui n'a rien à voir avec cette
mosquée-là : le réseau associatif — maisons de quartier, ASBL, lieux de
culte, centres culturels — se passe un numéro de téléphone en une soirée,
là où une école attend un conseil de direction. Si un jour une de ces
structures paie une animation, ce sera une référence à part entière et il
faudra la faire figurer.

---

## 10. L'assurance RC professionnelle — nom de l'assureur manquant

**Où :** `/cgv` (article 7), `/professionnels`, `/animation-plaine-de-jeux`
(3 endroits), `/animation-ecole` (FAQ, ajoutée le 2 septembre 2026).

Tu as confirmé le 2 septembre 2026 détenir une responsabilité civile
professionnelle. Les mentions restent donc en ligne, et j'en ai ajouté une
sur la page école : c'est la page où la question se pose le plus fort et
elle était la seule à ne pas y répondre.

**Ce qui manque :** le nom de la compagnie et le numéro de police. Une
assurance anonyme se lit comme une formule ; « couvert par [compagnie],
police n° X » se vérifie. Pour un pouvoir organisateur ou un service
communal, c'est la différence entre une case à cocher et un doute.

Garde aussi une attestation PDF sous la main : une direction d'école sur
deux la demandera avant de signer.

---

## 11. Deux villes sans aucune preuve locale : Liège et Luxembourg

**Où :** `/animation-liege` et `/animation-luxembourg`.

Les sept autres pages villes affichent un bloc « Déjà venus… » qui nomme un
lieu réel. Ces deux-là n'en ont pas, parce que tu n'y es jamais allé. Je
n'ai rien inventé pour combler le trou.

**Ce qu'il faut :** soit une première intervention là-bas, même une démo
gratuite, et le bloc se remplit tout seul ; soit assumer que ces deux pages
resteront plus faibles que les autres. Ne me demande pas d'y écrire une
phrase vague du genre « nous intervenons dans toute la région liégeoise » :
ça ne convainc personne et ça ne se vérifie pas.
