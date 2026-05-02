## ADDED Requirements

### Requirement: HiMCM数据解析
数据管道SHALL能解析HiMCM_Olympic_Data.xlsx文件，提取76个运动/小项在1896-2028年各届奥运会的设项数。

#### Scenario: 数据解析
- **WHEN** 运行数据解析脚本
- **THEN** 输出MUST为每行一个运动/小项的设项数序列
- **AND** MUST正确区分缺席（None/0）和参赛（正整数）状态

### Requirement: 从HiMCM提取四维指标
数据管道SHALL从HiMCM历史数据中为每个运动计算以下四个维度的评分：
1. 流行度：基于总参赛届数、设项数增长率、总设项规模综合计算
2. 可持续性：基于参赛连续性（方差）、是否曾经中断、是否回归
3. 包容性：基于分支项目数、总参赛届数、跨时代程度
4. 创新性：基于首次入奥年份、近年设项变化趋势

#### Scenario: 指标提取
- **WHEN** 运行指标提取脚本
- **THEN** 每个运动MUST获得以上四个维度的[0,1]区间评分
- **AND** 输出MUST包含每个维度的计算中间值（原始数据），便于论文引用

### Requirement: 外部数据补充接口
数据管道SHALL支持补充性别平等和安全性两个维度的外部数据。
性别平等数据来源：IOC官方报告、IF年度报告、Olympedia男女运动员统计。
安全性数据来源：PubMed检索的同行评审受伤率文献。

#### Scenario: 外部数据合并
- **WHEN** 外部数据准备就绪
- **THEN** 数据管道MUS能将其与HiMCM提取的四维指标合并
- **AND** 输出MUST为统一的六维评分JSON文件

### Requirement: 数据验证
数据管道SHALL包含数据验证功能，检查：完整性（6维度齐备）、范围[0,1]、来源可追溯。

#### Scenario: 数据验证
- **WHEN** 运行数据验证脚本
- **THEN** MUST输出每个项目的验证状态（PASS/FAIL/WARN）
- **AND** FAIL项MUST说明具体原因（缺失维度/超出范围）
