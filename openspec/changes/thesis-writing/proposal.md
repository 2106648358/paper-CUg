## Why

当前论文草稿（bak/paper_workbench_hym/）存在三个问题：Ch5和Ch6为占位符未完成、HiMCM大赛提供的76运动百年数据未被整合进核心实验、多个Chapters文件管理不便。需要创建一个统一的单文件tex论文，以HiMCM数据为核心驱动实验，完成从绪论到结论的完整论述。

## What Changes

- 创建一个新的单文件 thesis.tex，替代原有的6个chapters文件 + main.tex结构
- 重写Ch5（系统设计）和Ch6（结论展望），从占位符变为完整内容
- 将HiMCM 76运动数据融入Ch4实验设计，替代仅12小样本的实验
- 补充外部数据源（Olympedia性别数据、PubMed安全数据）完善六维指标
- 生成论文所需图表（通过Python visualization.py）
- 原有 bak/ 目录内容保留作为参考

## Capabilities

### New Capabilities
- `thesis-content`: 完整的论文正文，含绪论、文献综述、模型构建、实验分析、系统设计、结论六章
- `data-pipeline`: 从HiMCM数据提取六维指标的数据管道，含外部数据补充方案
- `thesis-compilation`: 单文件tex的编译环境配置（CUGThesis模板、字体、参考文献样式）

### Modified Capabilities
- (无)

## Impact

- thesis.tex: 新建主文件，约500-800行
- data/：需创建 unified_olympic_data.json（76运动六维评分）
- scripts/：需修改 visualization.py 生成论文图表
- 原 bak/paper_workbench_hym/ 内容保持不变作为参考
- 需配置XeLaTeX编译环境（CUGThesis.cls + 中文字体）
