"""Modify reference.docx fonts: 仿宋 body, 黑体 headings"""
from docx import Document
from docx.shared import Pt
from docx.oxml.ns import qn
import copy

doc = Document(r"D:\ProjectResources\paper-CUg\reference.docx")

# Font mapping: style name -> (Latin font, East Asian font, size, bold)
FONT_MAP = {
    "Normal":            ("Times New Roman", "仿宋", 12, False),
    "Heading 1":         ("Times New Roman", "黑体", 16, True),
    "Heading 2":         ("Times New Roman", "黑体", 14, True),
    "Heading 3":         ("Times New Roman", "黑体", 14, True),
    "Heading 4":         ("Times New Roman", "黑体", 12, True),
    "Title":             ("Times New Roman", "黑体", 22, True),
    "Subtitle":          ("Times New Roman", "楷体", 15, False),
    "Block Text":        ("Times New Roman", "仿宋", 12, False),
    "Body Text":         ("Times New Roman", "仿宋", 12, False),
    "Table Caption":     ("Times New Roman", "黑体", 10.5, True),
    "Image Caption":     ("Times New Roman", "仿宋", 10.5, False),
    "Header":            ("Times New Roman", "仿宋", 9, False),
    "Footer":            ("Times New Roman", "仿宋", 9, False),
}

for style in doc.styles:
    sname = style.name
    base = style.base_style.name if style.base_style else None

    # Inherit from base style font settings if not explicitly defined
    mapped_base = FONT_MAP.get(base)
    if sname in FONT_MAP:
        latin, ea, size, bold = FONT_MAP[sname]
    elif mapped_base:
        latin, ea, size, bold = mapped_base
    else:
        continue

    rpr = style.element.get_or_add_rPr()
    # Latin font
    rFonts = rpr.find(qn('w:rFonts'))
    if rFonts is None:
        rFonts = rpr.makeelement(qn('w:rFonts'), {})
        rpr.insert(0, rFonts)
    rFonts.set(qn('w:ascii'), latin)
    rFonts.set(qn('w:hAnsi'), latin)
    rFonts.set(qn('w:eastAsia'), ea)
    # Size
    sz = rpr.find(qn('w:sz'))
    if sz is None:
        sz = rpr.makeelement(qn('w:sz'), {})
        rpr.append(sz)
    sz.set(qn('w:val'), str(int(size * 2)))  # half-points
    # Bold
    b = rpr.find(qn('w:b'))
    if bold:
        if b is None:
            b = rpr.makeelement(qn('w:b'), {})
            rpr.append(b)
    else:
        if b is not None:
            rpr.remove(b)

    print(f"  [✓] {sname}: {latin} / {ea} / {size}pt / bold={bold}")

doc.save(r"D:\ProjectResources\paper-CUg\reference.docx")
print("\n✓ reference.docx updated with font styles")
