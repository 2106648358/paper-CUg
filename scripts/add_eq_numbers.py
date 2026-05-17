"""Add right-aligned equation numbers to thesis_with_equations.docx using Word COM"""
import win32com.client, re, os, time

DOCX = r"D:\ProjectResources\paper-CUg\docx\thesis_with_equations.docx"
DOCX_ABS = os.path.abspath(DOCX)

word = win32com.client.Dispatch("Word.Application")
word.Visible = False
word.ScreenUpdating = False

try:
    doc = word.Documents.Open(DOCX_ABS)
    
    # Track chapter for numbering
    chapter = 1
    eq_counters = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
    
    for para in doc.Paragraphs:
        # Detect chapter from Heading 1
        style_name = ""
        try:
            style_name = para.Range.Style.NameLocal
        except:
            pass
        
        if style_name == "Heading 1":
            txt = para.Range.Text.strip()
            try:
                ch = int(txt.split()[0].split('\t')[0])
                if 1 <= ch <= 6:
                    chapter = ch
            except:
                pass
            continue
        
        # Check for OMML equations
        if para.Range.OMaths.Count > 0:
            # Skip if already has a tab-based numbering
            rng_text = para.Range.Text
            if '\t(' in rng_text.split('\r')[0]:
                continue
            
            # Skip empty/minimal equation paragraphs
            if len(rng_text.strip()) < 2:
                continue
            
            # Build equation number
            eq_counters[chapter] += 1
            eq_label = f"({chapter}.{eq_counters[chapter]})"
            
            # Insert tab + number at end of paragraph (before paragraph mark)
            end_range = para.Range.Duplicate
            end_range.Collapse(0)  # wdCollapseEnd = 0
            # Move back before the paragraph mark
            end_range.MoveStart(1, -1)  # wdCharacter = 1
            end_range.MoveEnd(1, -1)
            
            # Add tab + number
            end_range.InsertAfter('\t' + eq_label)
            
            # Set right-aligned tab stop
            try:
                para.Range.ParagraphFormat.TabStops.Add(
                    Position=word.CentimetersToPoints(15.5),
                    Alignment=3  # wdAlignTabRight = 3
                )
            except:
                pass
            
            if eq_counters[chapter] % 10 == 0:
                print(f"  Ch.{chapter}: {eq_counters[chapter]} equations numbered...")

    # Summary
    for ch in range(1, 7):
        cnt = eq_counters[ch]
        if cnt > 0:
            print(f"  Chapter {ch}: {cnt} equations")

    total = sum(eq_counters.values())
    print(f"Total: {total} equations numbered")
    
    doc.Save()
    print("Saved")

finally:
    doc.Close()
    word.Quit()
    print("Done")
