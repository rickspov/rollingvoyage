# -*- coding: utf-8 -*-
#!#!/usr/bin/env python3
"""Generate Rolling Voyage web design specs PDF for the designer."""

from fpdf import FPDF
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "Rolling Voyage - Medidas Web.pdf"
FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_B = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_I = "/System/Library/Fonts/Supplemental/Arial Italic.ttf"


class SpecPDF(FPDF):
    def __init__(self):
        super().__init__()
        self.add_font("Arial", "", FONT)
        self.add_font("Arial", "B", FONT_B)
        self.add_font("Arial", "I", FONT_I)
        self.set_auto_page_break(auto=True, margin=20)

    def footer(self):
        self.set_y(-15)
        self.set_font("Arial", "I", 8)
        self.set_text_color(120, 120, 120)
        self.cell(0, 10, f"Rolling Voyage - Web Design Specs  |  Página {self.page_no()}", align="C")

    def cover(self):
        self.add_page()
        self.set_fill_color(41, 70, 108)
        self.rect(0, 0, 210, 297, "F")
        self.set_text_color(241, 240, 237)
        self.set_font("Arial", "B", 28)
        self.ln(60)
        self.cell(0, 14, "Rolling Voyage", align="C", new_x="LMARGIN", new_y="NEXT")
        self.set_font("Arial", "", 16)
        self.cell(0, 10, "Especificaciones de medidas - Sitio Web", align="C", new_x="LMARGIN", new_y="NEXT")
        self.ln(8)
        self.set_font("Arial", "I", 12)
        self.cell(0, 8, "Documento para diseño de assets visuales", align="C", new_x="LMARGIN", new_y="NEXT")
        self.ln(30)
        self.set_font("Arial", "", 11)
        self.cell(0, 7, "Versión: Demo v1  |  Idioma principal: Inglés  |  Julio 2026", align="C", new_x="LMARGIN", new_y="NEXT")
        self.set_text_color(176, 209, 234)
        self.cell(0, 7, "www.rollingvoyage.com (en desarrollo)", align="C")

    def h1(self, text):
        self.set_text_color(41, 70, 108)
        self.set_font("Arial", "B", 18)
        self.ln(4)
        self.cell(0, 10, text, new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(41, 70, 108)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(6)

    def h2(self, text):
        self.set_text_color(41, 70, 108)
        self.set_font("Arial", "B", 13)
        self.ln(2)
        self.cell(0, 8, text, new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def h3(self, text):
        self.set_text_color(90, 106, 122)
        self.set_font("Arial", "B", 11)
        self.cell(0, 7, text, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def body(self, text):
        self.set_text_color(30, 30, 30)
        self.set_font("Arial", "", 10)
        self.multi_cell(0, 5.5, text)
        self.ln(2)

    def bullet(self, text):
        self.set_text_color(30, 30, 30)
        self.set_font("Arial", "", 10)
        self.cell(5)
        self.multi_cell(0, 5.5, f"-  {text}")
        self.ln(1)

    def table(self, headers, rows, col_widths=None):
        if col_widths is None:
            w = 190 / len(headers)
            col_widths = [w] * len(headers)
        self.set_font("Arial", "B", 9)
        self.set_fill_color(226, 217, 199)
        self.set_text_color(41, 70, 108)
        for i, h in enumerate(headers):
            self.cell(col_widths[i], 8, h, border=1, fill=True)
        self.ln()
        self.set_font("Arial", "", 9)
        self.set_text_color(30, 30, 30)
        fill = False
        for row in rows:
            if self.get_y() > 265:
                self.add_page()
            if fill:
                self.set_fill_color(241, 240, 237)
            else:
                self.set_fill_color(255, 255, 255)
            x0, y0 = self.get_x(), self.get_y()
            heights = []
            lines_per_cell = []
            for i, cell in enumerate(row):
                self.set_xy(x0 + sum(col_widths[:i]), y0)
                lines = self.multi_cell(col_widths[i], 5, str(cell), border=0, split_only=True)
                lines_per_cell.append(lines)
                heights.append(len(lines) * 5)
            row_h = max(heights + [8])
            for i, cell in enumerate(row):
                self.set_xy(x0 + sum(col_widths[:i]), y0)
                self.rect(x0 + sum(col_widths[:i]), y0, col_widths[i], row_h)
                self.multi_cell(col_widths[i], 5, str(cell), border=0, fill=fill)
                self.set_xy(x0 + sum(col_widths[:i]), y0)
            self.set_xy(x0, y0 + row_h)
            fill = not fill
        self.ln(4)


def build():
    pdf = SpecPDF()
    pdf.cover()

    # --- GLOBAL ---
    pdf.add_page()
    pdf.h1("1. Configuración global")
    pdf.h2("Breakpoints")
    pdf.table(
        ["Nombre", "Ancho", "Uso"],
        [
            ["Mobile", "390 px (ref. iPhone 14 Pro)", "Prioridad - mayoría del tráfico esperado"],
            ["Tablet", "768 px", "iPad, tablets"],
            ["Desktop", "1440 px", "Diseño de referencia"],
            ["Desktop XL", "1920 px", "Pantallas grandes"],
        ],
        [35, 55, 100],
    )
    pdf.h2("Contenedor de contenido")
    pdf.bullet("Ancho máximo del contenido: 1280 px (max-w-7xl)")
    pdf.bullet("Padding lateral: 16 px (móvil) ? 20 px (sm) ? 32 px (md+)")
    pdf.bullet("Fondo general: #F1F0ED (blanco hueso)")

    pdf.h2("Paleta de colores")
    pdf.table(
        ["Color", "HEX", "Uso"],
        [
            ["Azul marino", "#29466C", "Primario - textos, header, footer, botones"],
            ["Azul intermedio", "#5B93C5", "Acentos, links, eyebrow text"],
            ["Azul claro", "#B0D1EA", "Slogan script, highlights"],
            ["Blanco hueso", "#F1F0ED", "Fondo de página"],
            ["Beige", "#E2D9C7", "Fondos de sección, cards secundarias"],
            ["Texto", "#1A1A1A", "Cuerpo de texto"],
        ],
        [40, 30, 120],
    )

    pdf.h2("Tipografías")
    pdf.table(
        ["Rol", "Fuente web", "Tamaños"],
        [
            ["Títulos / Display", "Libre Baskerville", "24-48 px según breakpoint"],
            ["Subtítulos", "Cormorant Garamond", "18-24 px"],
            ["Cuerpo", "DM Sans Light", "16-18 px"],
            ["Acento / Slogan", "Pinyon Script", "24-48 px (solo hero y footer)"],
        ],
        [45, 55, 90],
    )

    # --- LOGOS ---
    pdf.add_page()
    pdf.h1("2. Logotipo")
    pdf.table(
        ["Ubicación", "Archivo", "Altura en pantalla", "Entrega recomendada"],
        [
            ["Header (todas las páginas)", "logo-navy.png", "36 px móvil / 40 px sm / 48 px desktop", "PNG transparente, min. 600 px ancho"],
            ["Hero Home (sobre imagen)", "logorollingv-36.png (crema/blanco)", "48 px móvil / 64 px sm / 96 px desktop", "PNG transparente, versión clara"],
            ["Footer", "logorollingv-36.png", "56 px altura fija", "PNG transparente, versión clara"],
        ],
        [42, 48, 45, 55],
    )
    pdf.body(
        "Nota: El logo nunca debe incluir fondo. Respetar área de seguridad "
        "equivalente a 2x la altura del ave colipinta alrededor del logotipo (ver manual de marca)."
    )

    # --- HOME ---
    pdf.add_page()
    pdf.h1("3. Página Home (/)")

    pdf.h2("3.1 Hero - Imagen principal")
    pdf.table(
        ["Propiedad", "Valor"],
        [
            ["Entrega master", "3840 × 2160 px (16:9)"],
            ["Mínimo aceptable", "1920 × 1080 px"],
            ["Crop referencia móvil", "1080 × 1350 px (4:5)"],
            ["Formato", "JPG o WebP, calidad 80-85%"],
            ["Peso máximo", "400-600 KB"],
            ["Comportamiento", "object-cover - llena 100% ancho × 80-90vh altura"],
            ["Altura visible móvil", "~675 px (80vh en iPhone 14)"],
            ["Altura visible desktop", "~810-972 px (90vh)"],
        ],
        [55, 135],
    )
    pdf.h3("Zona segura del hero")
    pdf.bullet("Sujeto principal: centrado, énfasis en tercio inferior")
    pdf.bullet("Evitar detalles importantes en bordes laterales (se recortan en desktop)")
    pdf.bullet("Evitar detalles en esquina superior (tapada por header en móvil)")
    pdf.bullet("40% inferior: gradiente navy oscuro - aquí va logo + slogan + subtítulo en blanco")
    pdf.bullet("Subtítulo máximo ~670 px de ancho (max-w-2xl)")
    pdf.bullet("Sin texto incrustado en la imagen")

    pdf.h3("Texto sobre el hero (no diseñar - va en código)")
    pdf.table(
        ["Elemento", "Fuente", "Color", "Tamaño"],
        [
            ["Slogan", "Pinyon Script", "#B0D1EA", "24-48 px"],
            ["Subtítulo", "DM Sans", "Blanco 90%", "16-20 px"],
            ["Logo", "PNG crema", "-", "48-96 px alto"],
        ],
        [40, 45, 35, 70],
    )

    pdf.h2("3.2 Sección «Tu viaje, diseñado con intención»")
    pdf.body("Solo texto. Layout 2 columnas en desktop (título | párrafo + botón). Sin imagen.")

    pdf.h2("3.3 Sección «Para viajeros como tú»")
    pdf.table(
        ["Asset", "Medidas entrega", "Medidas en pantalla", "Cantidad"],
        [
            ["Stickers decorativos", "512 × 512 px PNG transparente", "40 × 40 px", "6 íconos (pueden repetirse)"],
        ],
        [40, 50, 45, 55],
    )
    pdf.body("Fondo de sección: beige #E2D9C7 al 40%. Cards en grid 1 col (móvil) / 2 cols (md+).")

    pdf.h2("3.4 Sección «Un recuerdo para el camino» - Preview guía")
    pdf.table(
        ["Imagen", "Entrega recomendada", "Ratio", "Display móvil", "Display desktop"],
        [
            ["Portada principal (col-span-2)", "1600 × 900 px", "16:9", "100% ancho × 192 px alto", "100% ancho × 224 px alto"],
            ["Portadas secundarias (×2)", "800 × 900 px", "4:5 aprox", "50% ancho × 192 px", "50% ancho × 224 px"],
        ],
        [42, 40, 22, 38, 48],
    )
    pdf.body(
        "En móvil: texto arriba, imágenes abajo. En desktop: imágenes izquierda, texto derecha. "
        "Estilo editorial - mockups de guía de viaje impresa personalizada."
    )

    pdf.h2("3.5 Testimonios")
    pdf.body("Solo texto en card blanca. Sin fotos de clientes en v1. Fondo sección: navy #29466C.")

    pdf.h2("3.6 CTA final")
    pdf.body("Solo texto centrado + botón. Sin imagen.")

    # --- ENFOQUE ---
    pdf.add_page()
    pdf.h1("4. Página Nuestro Enfoque (/enfoque)")

    pdf.h2("4.1 Pilares (4 bloques)")
    pdf.table(
        ["Asset", "Entrega", "Display", "Cantidad"],
        [
            ["Ilustraciones grabado/lino", "512 × 512 px PNG transparente", "64 × 64 px", "4 únicas (ave, palmera, etc.)"],
        ],
        [45, 55, 35, 55],
    )
    pdf.body("Grid: 1 col móvil / 2 cols desktop. Fondo card blanco con borde sutil.")

    pdf.h2("4.2 Historia aguja colipinta")
    pdf.table(
        ["Asset", "Entrega", "Display"],
        [
            ["Ilustración ave (aguja colipinta)", "512 × 512 px PNG transparente", "96 × 96 px centrada"],
        ],
        [55, 55, 80],
    )
    pdf.body("Fondo sección: beige #E2D9C7 al 50%.")

    # --- QUE ESPERAR ---
    pdf.add_page()
    pdf.h1("5. Página Qué esperar (/que-esperar)")

    pdf.h2("5.1 Timeline del proceso")
    pdf.body(
        "Sin imágenes. 6 pasos en cards blancas. Grid: 1 col móvil / 2 cols md / 3 cols lg. "
        "Línea conectora horizontal solo en desktop."
    )

    pdf.h2("5.2 Galería preview guía")
    pdf.table(
        ["Imagen", "Entrega", "Ratio", "Display"],
        [
            ["Páginas interiores guía (×3)", "800 × 1000 px", "4:5", "Grid 2×2, aspect-ratio 4:5"],
            ["Imagen lifestyle (×1)", "800 × 1000 px", "4:5", "Puede ser crop del hero"],
        ],
        [45, 40, 25, 80],
    )
    pdf.body(
        "Contenido sugerido: mapas, itinerario, restaurantes, portada. "
        "Estética editorial impresa, tonos crema y navy."
    )

    # --- SERVICIOS ---
    pdf.add_page()
    pdf.h1("6. Página Maneras de viajar (/servicios)")

    pdf.body(
        "Sin imágenes de fondo en v1. 5 cards de servicio en grid: "
        "1 col móvil / 2 cols md / 3 cols xl. Card destacada (Signature Experience) "
        "con fondo navy. Solo texto - sin íconos ni fotos por card."
    )
    pdf.table(
        ["Card", "Ancho aprox desktop", "Padding interno"],
        [
            ["Cada servicio", "~380 px (en grid 3 cols)", "24-32 px"],
            ["Card destacada", "Igual + escala 102% solo desktop", "24-32 px"],
        ],
        [50, 70, 70],
    )

    # --- CONTACTO ---
    pdf.h2("7. Página Empecemos (/contacto)")
    pdf.table(
        ["Asset", "Entrega", "Display", "Notas"],
        [
            ["Sticker decorativo", "512 × 512 px PNG", "80 × 80 px", "Solo visible en desktop (hidden móvil)"],
        ],
        [40, 45, 35, 70],
    )
    pdf.body("Layout: texto izquierda + formulario derecha en desktop. 1 columna en móvil.")

    # --- HEADER FOOTER ---
    pdf.add_page()
    pdf.h1("8. Header y Footer (global)")

    pdf.h2("8.1 Header")
    pdf.table(
        ["Propiedad", "Valor"],
        [
            ["Altura total", "~56-64 px"],
            ["Posición", "Fixed / sticky top"],
            ["Fondo móvil", "Crema #F1F0ED al 95% + blur"],
            ["Fondo desktop (top)", "Transparente sobre hero, sólido al scroll"],
            ["Nav links", "5 items + toggle EN/ES + CTA «Hablemos»"],
            ["Menú móvil", "Hamburguesa - panel full-width desplegable"],
        ],
        [55, 135],
    )

    pdf.h2("8.2 Footer")
    pdf.table(
        ["Propiedad", "Valor"],
        [
            ["Fondo", "Navy #29466C"],
            ["Texto", "Crema / azul claro"],
            ["Logo", "56 px alto, versión clara"],
            ["Slogan script", "Pinyon Script, ~24 px, #B0D1EA"],
            ["Layout", "1 col móvil / 3 cols desktop"],
            ["Toggle idioma", "También en footer"],
        ],
        [55, 135],
    )

    # --- ELEMENTOS GRAFICOS ---
    pdf.h1("9. Elementos gráficos de marca")
    pdf.table(
        ["Tipo", "Entrega master", "Uso en web", "Notas"],
        [
            ["Stickers / sellos", "1024 × 1024 px PNG", "40-80 px", "Estilo sello postal, navy sobre transparente"],
            ["Ilustraciones lino", "1024 × 1024 px PNG", "64-96 px", "Palmera, ave, montaña, etc."],
            ["Estampados (patrones)", "2000 × 2000 px", "Fondos opcionales v2", "No usados en v1"],
            ["Favicon", "512 × 512 px + 32 × 32", "Tab del browser", "Monograma RV o ave"],
            ["OG Image (redes)", "1200 × 630 px", "Link preview", "Para compartir en WhatsApp/redes"],
        ],
        [38, 42, 35, 75],
    )

    # --- RESUMEN ENTREGABLES ---
    pdf.add_page()
    pdf.h1("10. Resumen de entregables - Checklist")

    pdf.table(
        ["#", "Asset", "Dimensiones", "Prioridad"],
        [
            ["1", "Hero Home", "3840 × 2160 px", "ALTA"],
            ["2", "Páginas guía de viaje (preview)", "800 × 1000 px × 4", "ALTA"],
            ["3", "Portadas guía (hero de sección)", "1600 × 900 + 800 × 900", "ALTA"],
            ["4", "Ilustraciones pilares (×4)", "512 × 512 px PNG", "MEDIA"],
            ["5", "Stickers decorativos (set)", "512 × 512 px PNG", "MEDIA"],
            ["6", "Logo versiones (ya existen)", "Ver manual de marca", "LISTO"],
            ["7", "OG Image social", "1200 × 630 px", "MEDIA"],
            ["8", "Favicon", "512 × 512 px", "BAJA"],
        ],
        [10, 55, 55, 70],
    )

    pdf.h2("Estilo visual - Recordatorio")
    pdf.bullet("Editorial vintage mediterránea, lujo silencioso (quiet luxury)")
    pdf.bullet("Fotografía lifestyle con grano de película")
    pdf.bullet("Paleta: navy + crema + beige + azul claro")
    pdf.bullet("Sin texto incrustado en fotografías (todo el copy va en código)")
    pdf.bullet("Sin stock genérico de turismo - sensación personal, íntima, con criterio")
    pdf.bullet("Referencia mood: mujer en barco leyendo periódico, mar azul profundo")

    pdf.h2("Contacto técnico")
    pdf.body(
        "Para dudas sobre implementación: equipo de desarrollo Rolling Voyage.\n"
        "Manual de marca completo en carpeta «Rolling Voyage Linea Grafica»."
    )

    pdf.output(str(OUT))
    print(f"PDF generado: {OUT}")


if __name__ == "__main__":
    build()
