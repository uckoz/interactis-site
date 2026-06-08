#!/usr/bin/env python3
"""
Brochure InterActis - Generateur PDF
Theme dark cohérent avec interactis.be
Format A4 portrait, 7 pages.
Utilise les photos deja sur le site (converties en JPG en /tmp/brochure-imgs/)
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader

# ============================================
# PALETTE & FONDATIONS (cohérent avec le site)
# ============================================
BG = HexColor("#05070d")        # Noir profond
BG_SOFT = HexColor("#0a0e1a")   # Noir un peu plus clair
BG_CARD = HexColor("#0f1424")   # Cards sombres
ORANGE = HexColor("#ff7a18")
ORANGE_BRIGHT = HexColor("#ff8a2b")
BLUE = HexColor("#00d4ff")
WHITE = HexColor("#f5f7fb")
TEXT_DIM = HexColor("#c5cae0")
TEXT_FADED = HexColor("#7c8298")
LINE = HexColor("#1c2030")
GREEN = HexColor("#4ade80")

PAGE_W, PAGE_H = A4   # 595.27 x 841.89 points
MARGIN = 28 * mm

IMG_DIR = "/tmp/brochure-imgs"
OUTPUT = "/sessions/loving-gallant-tesla/mnt/contenu pour site/brochure-interactis.pdf"

# ============================================
# UTILITAIRES
# ============================================
def fill_bg(c, color=BG):
    """Fond plein page."""
    c.setFillColor(color)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

def draw_image_cropped(c, path, x, y, w, h, radius=0):
    """Dessine une image en mode 'cover' (crop pour remplir, pas deformer)."""
    img = ImageReader(path)
    iw, ih = img.getSize()
    # Calcul ratio cover
    ratio = max(w/iw, h/ih)
    new_w = iw * ratio
    new_h = ih * ratio
    # Centrage
    offset_x = x + (w - new_w) / 2
    offset_y = y + (h - new_h) / 2
    c.saveState()
    # Construction du path de clip
    p = c.beginPath()
    if radius > 0:
        p.moveTo(x + radius, y)
        p.lineTo(x + w - radius, y)
        p.arcTo(x + w - 2*radius, y, x + w, y + 2*radius, startAng=270, extent=90)
        p.lineTo(x + w, y + h - radius)
        p.arcTo(x + w - 2*radius, y + h - 2*radius, x + w, y + h, startAng=0, extent=90)
        p.lineTo(x + radius, y + h)
        p.arcTo(x, y + h - 2*radius, x + 2*radius, y + h, startAng=90, extent=90)
        p.lineTo(x, y + radius)
        p.arcTo(x, y, x + 2*radius, y + 2*radius, startAng=180, extent=90)
    else:
        p.moveTo(x, y)
        p.lineTo(x + w, y)
        p.lineTo(x + w, y + h)
        p.lineTo(x, y + h)
    p.close()
    c.clipPath(p, stroke=0, fill=0)
    c.drawImage(path, offset_x, offset_y, width=new_w, height=new_h, mask='auto')
    c.restoreState()

def rounded_rect(c, x, y, w, h, radius, fill_color=None, stroke_color=None, stroke_width=0):
    """Rectangle arrondi."""
    c.saveState()
    if fill_color:
        c.setFillColor(fill_color)
    if stroke_color:
        c.setStrokeColor(stroke_color)
        c.setLineWidth(stroke_width)
    c.roundRect(x, y, w, h, radius, stroke=1 if stroke_color else 0, fill=1 if fill_color else 0)
    c.restoreState()

def text(c, x, y, txt, font="Helvetica", size=10, color=WHITE, anchor="start"):
    """Texte simple."""
    c.setFillColor(color)
    c.setFont(font, size)
    if anchor == "middle":
        c.drawCentredString(x, y, txt)
    elif anchor == "end":
        c.drawRightString(x, y, txt)
    else:
        c.drawString(x, y, txt)

def wrapped_text(c, x, y, txt, max_width, font="Helvetica", size=10, color=WHITE, leading=14):
    """Texte avec wrap manuel."""
    from reportlab.pdfbase.pdfmetrics import stringWidth
    c.setFillColor(color)
    c.setFont(font, size)
    words = txt.split()
    line = ""
    cur_y = y
    for w in words:
        test = (line + " " + w).strip()
        if stringWidth(test, font, size) <= max_width:
            line = test
        else:
            c.drawString(x, cur_y, line)
            cur_y -= leading
            line = w
    if line:
        c.drawString(x, cur_y, line)
    return cur_y  # Retourne le dernier y pour chainage

def gradient_orange_strip(c, y, height=4):
    """Petite barre gradient orange en haut/bas de page."""
    n_steps = 50
    step_w = PAGE_W / n_steps
    for i in range(n_steps):
        # Interpolation entre orange et blue
        ratio = i / n_steps
        r = int(0xff * (1 - ratio) + 0x00 * ratio)
        g = int(0x7a * (1 - ratio) + 0xd4 * ratio)
        b = int(0x18 * (1 - ratio) + 0xff * ratio)
        c.setFillColor(HexColor("#" + f"{r:02x}{g:02x}{b:02x}"))
        c.rect(i * step_w, y, step_w + 0.5, height, stroke=0, fill=1)

# ============================================
# PAGE 1 - COVER
# ============================================
def page_cover(c):
    fill_bg(c)
    # Image hero en haut (60% hauteur page)
    img_h = PAGE_H * 0.55
    draw_image_cropped(c, f"{IMG_DIR}/hero.jpg", 0, PAGE_H - img_h, PAGE_W, img_h)
    # Overlay sombre sur l'image pour lisibilité
    c.setFillColor(HexColor("#000000"))
    c.setFillAlpha(0.35)
    c.rect(0, PAGE_H - img_h, PAGE_W, img_h, stroke=0, fill=1)
    c.setFillAlpha(1.0)
    # Gradient strip
    gradient_orange_strip(c, PAGE_H - img_h - 4, 4)

    # Logo / wordmark en haut
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(MARGIN, PAGE_H - 40, "Inter")
    c.setFillColor(ORANGE)
    text_width = c.stringWidth("Inter", "Helvetica-Bold", 22)
    c.drawString(MARGIN + text_width, PAGE_H - 40, "Actis")

    # Eyebrow
    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, PAGE_H - 80, "ANIMATION INTERACTIVE MOBILE  ·  BELGIQUE")

    # Title principal
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 38)
    c.drawString(MARGIN, PAGE_H - 130, "Le mur qui")
    c.setFillColor(BLUE)
    c.drawString(MARGIN, PAGE_H - 168, "transforme")
    c.setFillColor(ORANGE)
    c.drawString(MARGIN, PAGE_H - 206, "tout.")

    # Bas de page - contenu
    bottom_y = PAGE_H - img_h - 50
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(MARGIN, bottom_y, "L'animation qui rassemble tout le monde,")
    c.drawString(MARGIN, bottom_y - 20, "sans exception.")

    wrapped_text(
        c, MARGIN, bottom_y - 50,
        "InterActis débarque chez vous avec une seule valise. 15 minutes plus tard, n'importe quel mur devient un terrain de jeu interactif géant. De 5 à 95 ans. Sans manette. 100% accessible aux personnes en fauteuil roulant.",
        PAGE_W - 2*MARGIN, font="Helvetica", size=11, color=TEXT_DIM, leading=15
    )

    # Stats cards en bas
    stats_y = 100
    stats = [("100%", "Inclusif PMR"), ("15 min", "Installation"), ("30+", "Jeux"), ("5-95 ans", "Tous publics")]
    card_w = (PAGE_W - 2*MARGIN - 30) / 4
    for i, (n, label) in enumerate(stats):
        x = MARGIN + i * (card_w + 10)
        rounded_rect(c, x, stats_y, card_w, 60, 10, fill_color=BG_CARD, stroke_color=LINE, stroke_width=1)
        c.setFillColor(BLUE)
        c.setFont("Helvetica-Bold", 18)
        c.drawCentredString(x + card_w/2, stats_y + 36, n)
        c.setFillColor(TEXT_FADED)
        c.setFont("Helvetica-Bold", 7)
        c.drawCentredString(x + card_w/2, stats_y + 15, label.upper())

    # Footer URL
    c.setFillColor(TEXT_FADED)
    c.setFont("Helvetica", 9)
    c.drawCentredString(PAGE_W/2, 40, "www.interactis.be   ·   +32 488 43 53 42   ·   uckoz@interactis.be")
    gradient_orange_strip(c, 20, 3)

# ============================================
# PAGE 2 - LE CONCEPT
# ============================================
def page_concept(c):
    fill_bg(c)
    gradient_orange_strip(c, PAGE_H - 24, 4)

    # Eyebrow
    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, PAGE_H - 60, "LE CONCEPT")

    # Title
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 28)
    c.drawString(MARGIN, PAGE_H - 95, "Un mur, un projecteur,")
    c.drawString(MARGIN, PAGE_H - 125, "et le monde change.")

    # Description
    wrapped_text(
        c, MARGIN, PAGE_H - 170,
        "Notre système projette des jeux interactifs sur n'importe quel mur de 3 mètres. Une caméra détecte les mouvements des joueurs : ils tapent, courent, sautent, le mur réagit en temps réel.",
        PAGE_W - 2*MARGIN, font="Helvetica", size=12, color=TEXT_DIM, leading=17
    )
    wrapped_text(
        c, MARGIN, PAGE_H - 230,
        "Aucune manette. Aucun écran individuel. Aucune complexité côté joueur. C'est ça la vraie inclusion : tout le monde participe, sans pré-requis technique.",
        PAGE_W - 2*MARGIN, font="Helvetica-Bold", size=12, color=WHITE, leading=17
    )

    # PAS DE PHOTO ici (retiree a la demande utilisateur)
    # On laisse plus d'espace pour les arguments cles

    # 3 features grandes au milieu
    features = [
        ("Inclusif à 100%", "Debout, assis, en fauteuil roulant. Personne ne reste sur le banc de touche."),
        ("Installation rapide", "15 minutes chrono. On arrive, on installe, on lance. Vous vous concentrez sur votre événement."),
        ("Sans pré-requis", "Pas de manette, pas de console, pas de notice. Juste vos mains, un ballon ou votre voix."),
    ]
    feat_y = PAGE_H - 540
    card_w = PAGE_W - 2*MARGIN
    card_h = 75
    for i, (title, desc) in enumerate(features):
        y = feat_y - i * (card_h + 14)
        rounded_rect(c, MARGIN, y, card_w, card_h, 12, fill_color=BG_CARD, stroke_color=LINE, stroke_width=1)
        # Check vert dans cercle
        c.setFillColor(GREEN)
        c.circle(MARGIN + 28, y + card_h/2, 14, stroke=0, fill=1)
        c.setFillColor(BG)
        c.setFont("Helvetica-Bold", 16)
        c.drawCentredString(MARGIN + 28, y + card_h/2 - 5, "✓")
        # Titre
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 13)
        c.drawString(MARGIN + 56, y + card_h - 24, title)
        # Description
        wrapped_text(c, MARGIN + 56, y + card_h - 42, desc, card_w - 80, font="Helvetica", size=10, color=TEXT_DIM, leading=13)

    # Footer
    c.setFillColor(TEXT_FADED)
    c.setFont("Helvetica", 8)
    c.drawCentredString(PAGE_W/2, 40, "Brochure InterActis  ·  page 2/7")

# ============================================
# PAGE 3 - POUR QUI
# ============================================
def page_publics(c):
    fill_bg(c)
    gradient_orange_strip(c, PAGE_H - 24, 4)

    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, PAGE_H - 60, "POUR QUI ?")

    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 28)
    c.drawString(MARGIN, PAGE_H - 95, "Une formule, quatre univers.")

    wrapped_text(
        c, MARGIN, PAGE_H - 130,
        "Le même mur interactif s'adapte à votre public. On ajuste les jeux, la durée et le rythme.",
        PAGE_W - 2*MARGIN, font="Helvetica", size=11, color=TEXT_DIM, leading=15
    )

    # 4 cartes 2x2
    publics = [
        ("Anniversaire", "Pour les enfants de 5 à 12 ans (et les adultes qui veulent garder le sourire). 30+ jeux pensés pour les fêtes.", "anniversaire.jpg", ORANGE),
        ("Maison de repos", "Activité physique adaptée, stimulation cognitive, lien social. 100% accessible aux résidents en fauteuil.", "mr-jeu.jpg", BLUE),
        ("Team building", "Cohésion d'équipe par le jeu. Inclusif pour tous les profils RH. Effet souvenir partagé garanti.", "team.jpg", ORANGE),
        ("École et événement", "Journée récréative, fancy fair, porte ouverte, kermesse. De la maternelle au secondaire.", "ecole.jpg", BLUE),
    ]
    card_w = (PAGE_W - 2*MARGIN - 12) / 2
    card_h = 240
    grid_top = PAGE_H - 175
    for i, (title, desc, img, accent) in enumerate(publics):
        col = i % 2
        row = i // 2
        x = MARGIN + col * (card_w + 12)
        y = grid_top - card_h - row * (card_h + 12)
        rounded_rect(c, x, y, card_w, card_h, 14, fill_color=BG_CARD, stroke_color=LINE, stroke_width=1)
        # Image en haut
        draw_image_cropped(c, f"{IMG_DIR}/{img}", x, y + card_h - 130, card_w, 130, radius=14)
        # Strip accent
        c.setFillColor(accent)
        c.rect(x, y + card_h - 134, card_w, 4, stroke=0, fill=1)
        # Title
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 13)
        c.drawString(x + 14, y + 88, title)
        # Description
        wrapped_text(c, x + 14, y + 70, desc, card_w - 28, font="Helvetica", size=9, color=TEXT_DIM, leading=12)

    c.setFillColor(TEXT_FADED)
    c.setFont("Helvetica", 8)
    c.drawCentredString(PAGE_W/2, 40, "Brochure InterActis  ·  page 3/7")

# ============================================
# PAGE 4 - COMMENT ÇA MARCHE
# ============================================
def page_process(c):
    fill_bg(c)
    gradient_orange_strip(c, PAGE_H - 24, 4)

    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, PAGE_H - 60, "COMMENT ÇA MARCHE")

    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 28)
    c.drawString(MARGIN, PAGE_H - 95, "De la demande au jour J.")

    wrapped_text(
        c, MARGIN, PAGE_H - 125,
        "Un processus simple, sans paperasse, sans surprise. Vous concentrez votre énergie sur votre événement, on gère le reste.",
        PAGE_W - 2*MARGIN, font="Helvetica", size=11, color=TEXT_DIM, leading=15
    )

    # 3 étapes
    steps = [
        ("01", "Vous décrivez votre projet", "Formulaire en ligne en 2 minutes : type d'événement, lieu, date, nombre de participants. Pas de chichi."),
        ("02", "On vous répond sous 24h", "Devis gratuit personnalisé par mail ou téléphone. Si on a besoin de détails, on en parle directement."),
        ("03", "On installe en 15 minutes", "Le jour J, on arrive avec une valise, on déploie le système, et le mur devient un terrain de jeu."),
    ]
    step_y = PAGE_H - 200
    for i, (num, title, desc) in enumerate(steps):
        y = step_y - i * 130
        # Big number
        c.setFillColor(ORANGE)
        c.setFont("Helvetica-Bold", 56)
        c.drawString(MARGIN, y - 50, num)
        # Title
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 16)
        c.drawString(MARGIN + 95, y - 20, title)
        # Description
        wrapped_text(
            c, MARGIN + 95, y - 40, desc,
            PAGE_W - 2*MARGIN - 95, font="Helvetica", size=11, color=TEXT_DIM, leading=15
        )
        # Separator line (sauf dernier)
        if i < len(steps) - 1:
            c.setStrokeColor(LINE)
            c.setLineWidth(1)
            c.line(MARGIN, y - 80, PAGE_W - MARGIN, y - 80)

    c.setFillColor(TEXT_FADED)
    c.setFont("Helvetica", 8)
    c.drawCentredString(PAGE_W/2, 40, "Brochure InterActis  ·  page 4/7")

# ============================================
# PAGE 5 - PRIX & GARANTIE
# ============================================
def page_prices(c):
    fill_bg(c)
    gradient_orange_strip(c, PAGE_H - 24, 4)

    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, PAGE_H - 60, "PRIX & GARANTIE")

    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 28)
    c.drawString(MARGIN, PAGE_H - 95, "Transparent dès le départ.")

    wrapped_text(
        c, MARGIN, PAGE_H - 125,
        "Pas de prix cachés. Pas de surprise sur le devis. Voici nos tarifs de départ pour 1h30 d'animation.",
        PAGE_W - 2*MARGIN, font="Helvetica", size=11, color=TEXT_DIM, leading=15
    )

    # 3 cartes prix (anniversaire, maison de repos, autres sur devis)
    GAP = 12
    card_w = (PAGE_W - 2*MARGIN - 2*GAP) / 3
    card_h = 280
    card_y = PAGE_H - 440

    def render_price_card(x, eyebrow, accent_color, price_text, price_label, duration_label, items, is_custom=False):
        rounded_rect(c, x, card_y, card_w, card_h, 14, fill_color=BG_CARD, stroke_color=accent_color, stroke_width=2)
        # Eyebrow (en haut)
        c.setFillColor(accent_color)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(x + 16, card_y + card_h - 22, eyebrow)
        # "À partir de" mini
        c.setFillColor(TEXT_FADED)
        c.setFont("Helvetica", 7)
        if not is_custom:
            c.drawString(x + 16, card_y + card_h - 40, "À PARTIR DE")
        # Prix (gros)
        c.setFillColor(WHITE)
        if is_custom:
            # "Sur devis" en plus petit pour ce cas
            c.setFont("Helvetica-Bold", 22)
            c.drawString(x + 16, card_y + card_h - 78, price_text)
        else:
            c.setFont("Helvetica-Bold", 38)
            c.drawString(x + 16, card_y + card_h - 86, price_text)
        # TVA / HT mini sous le prix
        c.setFillColor(accent_color)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(x + 16, card_y + card_h - 104, price_label.upper())
        # Description durée
        c.setFillColor(TEXT_DIM)
        c.setFont("Helvetica", 10)
        wrapped_text(c, x + 16, card_y + card_h - 124, duration_label, card_w - 32, font="Helvetica", size=10, color=TEXT_DIM, leading=13)
        # Separator line
        c.setStrokeColor(LINE)
        c.setLineWidth(1)
        c.line(x + 16, card_y + card_h - 158, x + card_w - 16, card_y + card_h - 158)
        # Items check (3 items)
        item_top = card_y + card_h - 180
        for i, item in enumerate(items):
            y_item = item_top - i * 24
            c.setFillColor(GREEN)
            c.setFont("Helvetica-Bold", 11)
            c.drawString(x + 16, y_item, "✓")
            c.setFillColor(WHITE)
            c.setFont("Helvetica", 9)
            wrapped_text(c, x + 30, y_item, item, card_w - 50, font="Helvetica", size=9, color=WHITE, leading=11)

    # ANNIVERSAIRE
    render_price_card(
        MARGIN, "ANNIVERSAIRE", ORANGE, "249€", "TVA comprise",
        "pour 1h30 chez vous",
        ["Installation en 15 min", "Animateur inclus", "10 à 15 enfants"]
    )
    # MAISON DE REPOS
    render_price_card(
        MARGIN + card_w + GAP, "MAISON DE REPOS", BLUE, "249€", "HT",
        "pour 1h30 sur place",
        ["100% accessible PMR", "Stimulation cognitive", "10 à 15 résidents"]
    )
    # ÉVÉNEMENT / TEAM BUILDING / ÉCOLE (sur devis)
    render_price_card(
        MARGIN + 2*(card_w + GAP), "ÉVÉNEMENT & ENTREPRISE", ORANGE_BRIGHT, "Sur devis", "personnalisé",
        "Team building, école, kermesse, fancy fair…",
        ["Volumes flexibles", "Devis sous 24h", "Adapté à votre format"],
        is_custom=True
    )

    # Garantie
    g_y = 100
    rounded_rect(c, MARGIN, g_y, PAGE_W - 2*MARGIN, 90, 14, fill_color=BG_SOFT, stroke_color=GREEN, stroke_width=1.5)
    c.setFillColor(GREEN)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(MARGIN + 24, g_y + 52, "✓")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(MARGIN + 55, g_y + 60, "Satisfait ou remboursé.")
    c.setFillColor(TEXT_DIM)
    c.setFont("Helvetica", 10)
    c.drawString(MARGIN + 55, g_y + 40, "Si vos invités, vos résidents ou vos collaborateurs ne sourient pas,")
    c.drawString(MARGIN + 55, g_y + 25, "on vous rembourse l'intégralité de la prestation. Sans question.")

    c.setFillColor(TEXT_FADED)
    c.setFont("Helvetica", 8)
    c.drawCentredString(PAGE_W/2, 40, "Brochure InterActis  ·  page 5/7")

# ============================================
# PAGE 6 - TÉMOIGNAGES
# ============================================
def page_testimonials(c):
    fill_bg(c)
    gradient_orange_strip(c, PAGE_H - 24, 4)

    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, PAGE_H - 60, "TÉMOIGNAGES")

    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 28)
    c.drawString(MARGIN, PAGE_H - 95, "Ils en parlent mieux que nous.")

    wrapped_text(
        c, MARGIN, PAGE_H - 125,
        "Directeurs de maisons de repos, parents, RH, profs : voici ce qu'ils retiennent après une animation InterActis.",
        PAGE_W - 2*MARGIN, font="Helvetica", size=11, color=TEXT_DIM, leading=15
    )

    # 3 témoignages
    testimonials = [
        ("Les résidents en ont parlé pendant des jours. Même ceux qui restent habituellement en retrait ont participé. On reprend pour le mois prochain.",
         "Directrice", "Maison de repos · Hainaut"),
        ("Pour l'anniversaire de ma fille (8 ans), c'était parfait. Aucun écran, juste les enfants qui couraient devant le mur. Tous les parents nous ont demandé le contact.",
         "Sophie L.", "Anniversaire enfant · Mons"),
        ("Format idéal pour notre team building. Les équipes se sont mélangées naturellement, ça a débloqué des conversations entre services qui ne se parlaient jamais.",
         "RH PME", "Team building · Bruxelles"),
    ]

    card_y = PAGE_H - 175
    card_h = 145
    for i, (quote, name, role) in enumerate(testimonials):
        y = card_y - i * (card_h + 12) - card_h
        rounded_rect(c, MARGIN, y, PAGE_W - 2*MARGIN, card_h, 12, fill_color=BG_CARD, stroke_color=LINE, stroke_width=1)
        # Big quote mark
        c.setFillColor(ORANGE)
        c.setFont("Helvetica-Bold", 50)
        c.drawString(MARGIN + 18, y + card_h - 50, '"')
        # Quote
        wrapped_text(
            c, MARGIN + 50, y + card_h - 28, quote,
            PAGE_W - 2*MARGIN - 70, font="Helvetica", size=11, color=WHITE, leading=15
        )
        # Author
        c.setFillColor(ORANGE)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(MARGIN + 50, y + 22, name)
        c.setFillColor(TEXT_FADED)
        c.setFont("Helvetica", 9)
        c.drawString(MARGIN + 50, y + 8, role)
        # Étoiles
        c.setFillColor(HexColor("#fbbf24"))
        c.setFont("Helvetica-Bold", 12)
        c.drawString(PAGE_W - MARGIN - 80, y + 22, "★ ★ ★ ★ ★")

    c.setFillColor(TEXT_FADED)
    c.setFont("Helvetica", 8)
    c.drawCentredString(PAGE_W/2, 40, "Brochure InterActis  ·  page 6/7")

# ============================================
# PAGE 7 - CONTACT & CTA
# ============================================
def page_contact(c):
    fill_bg(c)
    gradient_orange_strip(c, PAGE_H - 24, 4)

    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, PAGE_H - 60, "PARLONS-EN")

    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 32)
    c.drawString(MARGIN, PAGE_H - 105, "Prêt à transformer")
    c.setFillColor(ORANGE)
    c.drawString(MARGIN, PAGE_H - 142, "votre événement ?")

    wrapped_text(
        c, MARGIN, PAGE_H - 180,
        "Devis gratuit et personnalisé sous 24h ouvrables. Pas d'engagement. Pas d'arnaque commerciale.",
        PAGE_W - 2*MARGIN, font="Helvetica", size=12, color=TEXT_DIM, leading=17
    )

    # CTA box principal
    cta_y = PAGE_H - 360
    rounded_rect(c, MARGIN, cta_y, PAGE_W - 2*MARGIN, 130, 18, fill_color=BG_CARD, stroke_color=ORANGE, stroke_width=2)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(MARGIN + 24, cta_y + 100, "Recevez votre devis en ligne →")
    c.setFillColor(TEXT_DIM)
    c.setFont("Helvetica", 11)
    c.drawString(MARGIN + 24, cta_y + 78, "Formulaire en 3 étapes, réponse personnalisée sous 24h.")

    # URL en gros
    c.setFillColor(ORANGE)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(MARGIN + 24, cta_y + 36, "www.interactis.be/devis")

    # 4 channels
    ch_y = 180
    channels = [
        ("Téléphone", "+32 488 43 53 42"),
        ("Email", "uckoz@interactis.be"),
        ("WhatsApp", "+32 488 43 53 42"),
        ("Zone", "Belgique · Lux · Nord France"),
    ]
    col_w = (PAGE_W - 2*MARGIN - 30) / 4
    for i, (label, value) in enumerate(channels):
        x = MARGIN + i * (col_w + 10)
        c.setFillColor(BLUE)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(x, ch_y + 25, label.upper())
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(x, ch_y + 8, value)

    # Logo wordmark bas
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(MARGIN, 80, "Inter")
    text_w = c.stringWidth("Inter", "Helvetica-Bold", 16)
    c.setFillColor(ORANGE)
    c.drawString(MARGIN + text_w, 80, "Actis")
    # Tagline
    c.setFillColor(TEXT_FADED)
    c.setFont("Helvetica-Oblique", 9)
    c.drawString(MARGIN, 62, "Le mur qui transforme tout.  ·  Animation interactive mobile  ·  Belgique")

    c.setFillColor(TEXT_FADED)
    c.setFont("Helvetica", 8)
    c.drawCentredString(PAGE_W/2, 40, "Brochure InterActis  ·  page 7/7")

# ============================================
# BUILD
# ============================================
def build():
    c = canvas.Canvas(OUTPUT, pagesize=A4)
    c.setTitle("InterActis - Brochure")
    c.setAuthor("InterActis")
    c.setSubject("Animation interactive mobile")

    pages = [page_cover, page_concept, page_publics, page_process, page_prices, page_testimonials, page_contact]
    for page_fn in pages:
        page_fn(c)
        c.showPage()
    c.save()
    print(f"OK: {OUTPUT}")
    import os
    size = os.path.getsize(OUTPUT)
    print(f"Size: {size/1024:.1f} KB")

if __name__ == "__main__":
    build()
