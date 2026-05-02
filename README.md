# paper-CUg: 基于混合权重模型的奥运项目评估与预测系统

中国地质大学（武汉）数学与物理学院本科毕业论文

作者：何艺鸣 | 指导老师：李民 教授

## 概述

本项目构建了一个**基于 AHP-EWM 混合权重模型**的奥运项目综合评估体系，对奥运会项目进行量化评估与动态预测。核心方法包括：

- **AHP（层次分析法）** — 主观权重确定
- **EWM（熵权法）** — 客观权重确定  
- **混合权重模型** — 主客观权重融合
- **TOPSIS/综合评分** — 项目综合评价与排序

## 目录结构

```
paper-CUg/
├── thesis.tex              # 主论文文件
├── CUGThesis.cls           # 论文模板
├── chapters/               # 各章节（如有）
├── figures/                # 图表
│   ├── sensitivity.png
│   ├── ranking.png
│   └── radar_*.png         # 各项目雷达图
├── data/                   # 数据文件
│   └── unified_olympic_data.json
├── scripts/                # Python 脚本
│   ├── generate_figures.py # 图表生成
│   ├── data_pipeline.py    # 数据处理
│   └── data_validate.py    # 数据验证
├── references.bib          # 参考文献
├── gbt7714-2005.bst        # GB/T 7714 参考文献样式
└── openspec/               # 开发规范文档
```

## 编译

需要 XeLaTeX 环境：

```bash
xelatex thesis.tex
bibtex thesis
xelatex thesis.tex
xelatex thesis.tex
```

或使用 `latexmk`：

```bash
latexmk -xelatex thesis.tex
```

## 依赖

- XeLaTeX 发行版（TeX Live / MiKTeX）
- Python 3.10+（用于数据分析和图表生成）
  - matplotlib, numpy, pandas, scipy
