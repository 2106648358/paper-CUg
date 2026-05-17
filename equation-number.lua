-- Auto-number equations in docx output
local eq_count = 0
function Math(elem)
  if elem.mathtype == "DisplayMath" then
    eq_count = eq_count + 1
    -- Add LaTeX \tag for pandoc to pick up
    return {
      pandoc.RawInline("latex", "\\begin{equation}"),
      pandoc.Math("DisplayMath", elem.text),
      pandoc.RawInline("latex", "\\tag{" .. eq_count .. "}\\end{equation}")
    }
  end
end
