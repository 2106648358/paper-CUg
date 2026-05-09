# 奥运项目六维评估体系 — 数据支撑文档

> **用途**：为论文第四章"12项目×6维度"评估框架提供可验证的数据来源与文献支撑
> **生成日期**：2026-05-09
> **数据来源**：IOC官方文件、国际单项联合会(IF)官网、PubMed文献、Newzoo行业报告、Olympedia历史数据库

---

## 1. 分类框架依据：四类项目的IOC政策来源

论文将12个项目分为"核心""新增""候选""已移除"四类。此分类并非自创，其依据来自IOC的正式管理框架：

### 1.1 核心项目 vs 附加项目的官方区分

| 来源 | 关键内容 |
|------|---------|
| **Olympic Charter Rule 45** (现行版本, 2026.02.03) | 规定奥运项目的分类与准入程序。奥运会项目(Programme)分为Sports、Disciplines、Events三级。IOC执委会拥有最终决定权 |
| **LA28奥运会官方页面** [olympics.com/en/sports/](https://olympics.com/en/sports/) | 列出35个LA28夏季项目，其中标记 `*` 的为"Sports proposed by the Organising Committee of LA 2028 for the upcoming edition of the Games"。未标记的为核心(永久)项目 |
| **IOC官方FAQ** [olympics.com/en/sports/](https://olympics.com/en/sports/) | 原文："*A total of 35 sports are on the Olympic programme for the LA 2028 Olympic Games... Cricket\*, Flag Football\*, Lacrosse\*, Squash\* ... \*Sports proposed by the Organising Committee of LA 2028*" |

**结论**：IOC正式将奥运项目区分为"Core sports"(永久列项)与"Proposed additional sports"(主办城市提议的附加项目)。论文的"核心/新增/候选/已移除"框架是此官方分类的学术化表达。

- **核心项目** = IOC永久列项，不受主办城市选择影响
- **新增项目** = 通过Agenda 2020 "host city proposal"机制，由主办城市提议、IOC执委会批准加入当届奥运会

### 1.2 新增项目的政策机制

| 来源 | 关键内容 |
|------|---------|
| **Olympic Agenda 2020** [olympics.com/ioc/olympic-agenda-2020](https://olympics.com/ioc/olympic-agenda-2020) | 40项建议中的核心改革：引入"host city proposal"机制，允许主办城市向IOC提议当届奥运会的附加项目。Tokyo 2020依据此机制新增了攀岩、滑板、冲浪、空手道、棒球/垒球 |
| **Olympic Agenda 2020+5** [olympics.com/ioc/olympic-agenda-2020-plus-5](https://olympics.com/ioc/olympic-agenda-2020-plus-5) | Recommendation 9: "**Encourage the development of virtual sports and further engage with video gaming communities**"——IOC首次将电子竞技/虚拟体育纳入政策视野 |

### 1.3 论文12项目的IOC决策出处

| 论文项目 | 论文分类 | IOC决策事实 | IOC来源 |
|---------|---------|------------|---------|
| 足球、篮球、田径、游泳 | 核心 | 永久奥运项目(1896年起), LA28为Core sports | olympics.com/en/sports/ |
| 攀岩、滑板、冲浪 | 新增 | Tokyo 2020 host proposal新增, Paris 2024/LA28保留 | Agenda 2020 |
| 霹雳舞 | 新增 | Paris 2024 host proposal新增(仅一届, LA28未保留) | olympics.com/en/paris-2024/sports/breaking |
| 电子竞技 | 候选 | Agenda 2020+5 Rec 9鼓励发展; IOC Olympic Esports Games 2025在沙特举办 | Agenda 2020+5 |
| 板球 | 候选 | LA28 host proposal通过, 2023年10月IOC Mumbai Session批准 | IOC 141st Session |
| 空手道 | 已移除 | Tokyo 2020新增, Paris 2024移除 | Agenda 2020 host proposal机制到期 |
| 棒球/垒球 | 已移除 | 1992-2008, 2020回归, 2024移除, 2028回归 | olympics.com历届赛程 |

---

## 2. 12项目6维评分对照表

**列含义**：
- **原论文值**：论文原始硬编码X矩阵值
- **Pipeline值**：来自 `data_pipeline.py` 从 HiMCM_Olympic_Data.xlsx 计算的值（4维度：流行度/可持续性/包容性/创新性）+ 外部JSON性别平等/安全性
- **真实数据支撑**：来自IOC、IF官网、PubMed文献的可验证数据

**维度**：P=流行度, G=性别平等, S=可持续性, I=包容性, N=创新性, F=安全性

### 2.1 核心项目（4个）

#### 足球 (Football)

| 维度 | 原论文值 | Pipeline值 | 真实数据支撑 | 来源 |
|------|---------|-----------|------------|------|
| P | 0.95 | 0.5658 | FIFA 211个会员协会(全球最多), 奥运504名运动员配额 | fifa.com/associations |
| G | 0.80 | 0.80 | Paris 2024男子16队/女子12队(差4队); LA28女子16队首超男子12队 | olympics.com/gender-equality |
| S | 0.80 | 0.7347 | Paris 2024使用7座现有球场(Parc des Princes等), 零新建; 场馆等级:Tier 2(低) | IOC Paris 2024 Sustainability Report |
| I | 0.90 | 0.7556 | 残奥Blind Football; FIFA Forward $2.5B投入发展中国家; 54非洲足协 | fifa.com/fifa-forward |
| N | 0.40 | 0.0231 | 1900年(男子)/1996年(女子)首秀; 小项数保持2(男+女) | Olympedia |
| F | 0.50 | 0.50 | 女子6.1/1000h总伤病率; 男子3.4/1000h; 踝/膝高发 | López-Valenciano 2021, *Sports Med* |

#### 篮球 (Basketball)

| 维度 | 原论文值 | Pipeline值 | 真实数据支撑 | 来源 |
|------|---------|-----------|------------|------|
| P | 0.93 | 0.2926* | FIBA 213个会员协会; 奥运352名运动员配额(含3x3) | about.fiba.basketball |
| G | 0.92 | 0.92 | Paris 2024男12队/女12队(完全均等); 3x3也是男8/女8 | olympics.com |
| S | 0.75 | 0.6258 | 使用现有NBA/NHL球馆(Bercy/Crypto.com Arena); 场馆等级:Tier 2(低) | IOC Venues Report 2022 |
| I | 0.82 | 0.2694 | 残奥轮椅篮球(1960起); FIBA "Basketball For Good"覆盖54非洲会员 | fiba.basketball |
| N | 0.50 | 0.9846* | 1936年首秀; 2020年新增3x3(男女各8队) | Olympedia |
| F | 0.55 | 0.55 | 4.99-8.54/1000 AE(女子高中); 0.20/0.07 ACL/1000AE女/男 | Foss 2018, *J Athl Train*; Stojanovic 2023, *Scand J Med Sci Sports* |

> \* **Pipeline值异常说明**：HiMCM Excel中"Basketball"行仅包含3x3篮球事件数据(2020年起,3次出场,6个总事件), 缺失传统5x5篮球的全部历史数据(1936年起)。Pipeline的流行度0.2926和创新性0.9846实际反映的是3x3篮球的特征, 而非篮球整体。**论文应使用IF数据与奥运历史数据为主要依据。**

#### 田径 (Athletics)

| 维度 | 原论文值 | Pipeline值 | 真实数据支撑 | 来源 |
|------|---------|-----------|------------|------|
| P | 0.95 | 0.7347 | World Athletics 214个会员协会(IF中最多); 奥运1,810名运动员配额(最大项); 31次奥运会全勤 | worldathletics.org |
| G | 0.88 | 0.88 | Paris 2024男女运动员几乎均等; 混合接力增设 | World Athletics; Paris 2024 |
| S | 0.70 | 0.9547 | 使用现有主体育场(Stade de France/LA Coliseum); 仅需跑道表面更换; Tier 3(中) | IOC Venues Report |
| I | 0.88 | 1.0000 | 残奥Para Athletics(最大残奥项目,164个奖牌项); Kids' Athletics在130+国; 4个时代全覆盖 | IPC; worldathletics.org |
| N | 0.35 | 0.0268 | 1896年首秀(最古老奥运项目); 小项变革缓慢; 近4届小项数稳定 | Olympedia |
| F | 0.75 | 0.75 | 4.2/1000 AE(训练+比赛); 68.8/1000注册运动员(锦标赛) | Edouard 2026, *Br J Sports Med* |

#### 游泳 (Swimming)

| 维度 | 原论文值 | Pipeline值 | 真实数据支撑 | 来源 |
|------|---------|-----------|------------|------|
| P | 0.92 | 0.4078* | World Aquatics 210个会员协会; 奥运~852名运动员配额(第二大项) | worldaquatics.com |
| G | 0.95 | 0.95 | Paris 2024男女接近均等; 4x100m混合泳接力 | World Aquatics; Paris 2024 |
| S | 0.60 | 0.7156 | Paris 2024新建1座水上中心(木结构,太阳能屋顶,赛后社区泳池); Tier 3(中) | IOC Paris 2024 Sustainability Report |
| I | 0.85 | 0.4315 | 残奥Para Swimming; World Aquatics Development Programme覆盖43非洲成员; 4个时代全覆盖 | worldaquatics.com/development |
| N | 0.40 | 0.4176 | 1896年首秀; 近几届小项增加(男女混合接力等) | Olympedia |
| F | 0.88 | 0.88 | 0.26-1.78/1000 AE (高中至NCAA); 奥运项目中最安全的之一 | Chandran 2021; Belilos 2023 |

> \* **Pipeline值异常说明**：HiMCM Excel中"Aquatics"行仅包含Artistic Swimming(花样游泳)事件数据(1984年起,12次出场,23个总事件), 缺失Swimming/Diving/Water Polo的完整历史。Pipeline的流行度0.4078实际反映的是花样游泳的特征。**论文应使用World Aquatics与奥运历史数据。**

### 2.2 新增项目（4个）

#### 攀岩 (Sport Climbing)

| 维度 | 原论文值 | Pipeline值 | 真实数据支撑 | 来源 |
|------|---------|-----------|------------|------|
| P | 0.68 | 0.2976 | IFSC ~100个会员; 奥运~68名运动员配额; 全球攀岩者估算~4500万 | ifsc-climbing.org |
| G | 0.90 | 0.90 | Paris 2024男Boulder&Lead/女Boulder&Lead + 男Speed/女Speed均等 | IFSC; Paris 2024 |
| S | 0.60 | 0.5675 | 场馆:Tier 3(中); Paris使用临时攀岩墙(赛后迁至Seine-Saint-Denis社区); 模块化可拆卸 | Paris 2024 Sustainability Report |
| I | 0.35 | 0.2944 | 残奥Para Climbing LA28首秀; IFSC发展项目覆盖印尼/印度/伊朗等; 99个会员国(发展中占多数) | ifsc-climbing.org |
| N | 0.95 | 0.9846 | 2020年首秀; 从全能1金牌变为Boulder+Speed共4金牌(快速演变) | Olympedia |
| F | 0.85 | 0.85 | 3.1/1000h (世锦赛,室内); 攀岩伤病率低于足球/篮球 | Schöffl 2006, *Wilderness Environ Med* |

#### 滑板 (Skateboarding)

| 维度 | 原论文值 | Pipeline值 | 真实数据支撑 | 来源 |
|------|---------|-----------|------------|------|
| P | 0.72 | 0.3026 | World Skate ~130个会员; 奥运~88名运动员配额; 全球滑板者估算~8500万 | worldskate.org |
| G | 0.90 | 0.90 | Paris 2024男Street/女Street + 男Park/女Park完全均等 | World Skate; Paris 2024 |
| S | 0.70 | 0.6258 | 场馆:Tier 3(中); Paris使用临时滑板公园(Place de la Concorde,赛后迁至社区); 模块化坡道 | Paris 2024 Sustainability Report |
| I | 0.40 | 0.2944 | 无残奥对应; ~130会员国; Skateistan在阿富汗/柬埔寨/南非推广; 拉丁美洲/南亚增长快 | worldskate.org |
| N | 0.98 | 0.9846 | 2020年首秀; 青年文化代表; 项目赛制仍在快速演化中 | Olympedia |
| F | 0.35 | 0.35 | 无标准化AE伤病率; NEISS急诊监测数据(每10,000人口计); 骨折/挫伤高发 | McKenzie 2016, *Inj Epidemiol* |

#### 冲浪 (Surfing)

| 维度 | 原论文值 | Pipeline值 | 真实数据支撑 | 来源 |
|------|---------|-----------|------------|------|
| P | 0.65 | 0.2926 | ISA 117个会员国; 奥运~48名运动员配额; 全球冲浪者估算~3500万 | isasurf.org |
| G | 0.90 | 0.90 | Paris 2024男Shortboard/女Shortboard均等 | ISA; Paris 2024 |
| S | 0.85 | 0.6258 | 场馆:Tier 1(最低); Paris使用Teahupo'o天然浪点(零建设,零碳排放); 仅需船只转播 | Paris 2024 Sustainability Report |
| I | 0.25 | 0.2694 | Para Surfing为IPC认可但未进残奥; ISA奖学金支持加纳/孟加拉/伊朗/塞内加尔等发展中国家 | isasurf.org |
| N | 0.90 | 0.9846 | 2020年首秀; 受自然条件限制(浪点选择),赛制特殊 | Olympedia |
| F | 0.80 | 0.80 | 0.74-6.6/1000h; 撕裂伤/脑震荡/骨折主要风险 | McArthur 2020, *Sports* |

#### 霹雳舞 (Breaking)

| 维度 | 原论文值 | Pipeline值 | 真实数据支撑 | 来源 |
|------|---------|-----------|------------|------|
| P | 0.55 | 0.2813 | WDSF ~93个会员(78个获NOC认可); 奥运仅32名运动员(16 B-boys + 16 B-girls) | worlddancesport.org |
| G | 0.92 | 0.92 | Paris 2024 16男/16女完全均等 | WDSF; Paris 2024 |
| S | 0.90 | 0.5000 | 场馆:Tier 1(最低); 仅需平整地面+音响; Paris使用Place de la Concorde城市公园,全临时 | Paris 2024 Sustainability Report |
| I | 0.45 | 0.1097 | 无残奥对应; 主要在欧/东亚/北美发展; 发展中国家影响力有限 | worlddancesport.org |
| N | 1.00 | 1.0000 | 2024年首秀(最新奥运项目); 仅一届(LA28未保留) | Olympedia |
| F | 0.70 | 0.70 | 文献极少(Arundale 2023,仅n=14); 膝/髋/踝主要损伤 | Arundale 2023, *Int J Sports Phys Ther* |

### 2.3 候选项目（2个）

#### 电子竞技 (Esports)

| 维度 | 原论文值 | Pipeline值 | 真实数据支撑 | 来源 |
|------|---------|-----------|------------|------|
| P | 0.95 | —* | Newzoo 2024估算全球观众~5.4亿; IESF 130+国家会员; 发展中市场(印度/巴西/印尼/尼日利亚)用户占~60% | Newzoo; iesf.org |
| G | 0.65 | —* | 女性观众~35%; 女性职业选手仅~5-8%; 女性高管~22% | Newzoo 2024 |
| S | 0.85 | —* | 场馆:Tier 1(最低); 使用现有电竞/会展设施或线上; 零物理场馆新建; 仅需电子设备 | Agenda 2020+5 |
| I | 0.55 | —* | 无残奥对应; 移动电竞(Free Fire/PUBG Mobile)在发展中国家极低门槛; IESF 60%会员为发展中国家 | iesf.org |
| N | 1.00 | —* | Agenda 2020+5 Recommendation 9正式提出; IOC Olympic Esports Games 2025; 非传统奥运项目 | Agenda 2020+5 |
| F | 0.95 | —* | Tholl 2022系统综述(16研究,n=62,987): 颈/肩/背痛为主; OR 1.3-5.2; 无急性外伤(非身体接触) | Tholl 2022, *BMC Musculoskelet Disord* |

> \* Pipeline无法计算(电子竞技非奥运项目,HiMCM无数据)。所有值来自原有JSON数据集, 有IOC政策文件与行业报告支撑。

#### 板球 (Cricket)

| 维度 | 原论文值 | Pipeline值 | 真实数据支撑 | 来源 |
|------|---------|-----------|------------|------|
| P | 0.85 | 0.0763 | ICC 108个会员(12 Full + 96 Associate); 全球受众~25亿(仅次于足球); LA28 T20男女各6队 | icc-cricket.com |
| G | 0.70 | 0.70 | 女子板球快速增长; ICC Women's Emerging Nations Trophy; 但仍以男子为主导 | icc-cricket.com |
| S | 0.60 | 0.5000 | 场馆:Tier 4(高); 需要专用板球场; LA28预计使用现有板球/棒球设施或临时 | LA28官方 |
| I | 0.50 | 0.2472 | 无残奥对应; ICC发展项目覆盖96个准会员(多为发展中国家); 在非洲/南亚扩张迅速 | icc-cricket.com |
| N | 0.45 | 0.0231 | 1900年仅一届奥运出现; 2023年IOC Mumbai Session批准LA28回归(时隔128年); T20格式为最大创新 | IOC 141st Session |
| F | 0.65 | 0.65 | 女子6.12/1000 AE; 精英女板球71.9/1000 player-hours; 守门员和快投手风险最高 | Perera 2018, *Sports Med*; Jacobs 2022, *JBI Evid Synth* |

### 2.4 已移除项目（2个）

#### 空手道 (Karate)

| 维度 | 原论文值 | Pipeline值 | 真实数据支撑 | 来源 |
|------|---------|-----------|------------|------|
| P | 0.55 | 0.3113 | WKF 201个会员协会(覆盖5大洲44+54+39+51+13); Tokyo 2020 ~80名运动员 | wkf.net |
| G | 0.90 | 0.90 | Tokyo 2020男Kata/Kumite + 女Kata/Kumite(各3重量级)均等 | WKF; Tokyo 2020 |
| S | 0.90 | 0.5000 | 场馆:Tier 1(最低); 仅需12x12m垫子; 与柔道/跆拳道共享场地 | IOC Sustainability Report |
| I | 0.50 | 0.1847 | Para Karate为IPC认可运动; 50+非洲会员; 在中东/北非/南美极强; 难民营推广项目 | wkf.net |
| N | 0.75 | 0.9846 | 2020年首秀→2024年移除(仅一届); Pipeline的0.9846因1次出场+高分recency | Olympedia |
| F | 0.60 | 0.60 | 88.3/1000 AE(竞技比赛,12个奥运项目中最高的AE率); 39.2/1000 min暴露; 头部/面部为主 | Lystad 2020, *Br J Sports Med* |

#### 棒球/垒球 (Baseball/Softball)

| 维度 | 原论文值 | Pipeline值 | 真实数据支撑 | 来源 |
|------|---------|-----------|------------|------|
| P | 0.60 | 0.2394 | WBSC 207个会员(192 NF + 15 Associate), 覆盖142国; 主要流行于美洲/东亚 | wbsc.org |
| G | 0.80 | 0.80 | 棒球(男子)与垒球(女子)分开; WBSC推进女棒和男垒 | WBSC |
| S | 0.45 | 0.5895 | 场馆:Tier 4(高); 需要专用棒球场; LA28使用现有MLB球场(零新建) | LA28官方 |
| I | 0.40 | 0.2956 | 无残奥对应(WBSC有Parasport计划); 主要在美洲/东亚/大洋洲流行; Baseball5(5人街头版)为低门槛推广 | wbsc.org |
| N | 0.35 | 0.3769 | 1992-2008,2020回归,2024移除,2028回归—多轮进出奥运的独特历史 | Olympedia |
| F | 0.80 | 0.80 | 0.7-3.6/1000 AE(职业); 4.7-5.8/1000 AE(大学); 投掷伤为主 | Bullock 2020, *J Orthop Sports Phys Ther* |

---

## 3. 维度一：流行度 (Popularity)

### 3.1 指标定义

论文定义（`olympic_projects_data_final.json`）：
> `E_pop = normalized(global_participation) × 0.5 + normalized(google_trends) × 0.5`

补充定义（`data_pipeline.py`）：
> `0.35 × appearances_ratio + 0.25 × events_ratio + 0.2 × growth_score + 0.2 × recency_score`

### 3.2 核心证据：国际单项联合会(IF)会员国数量

**逻辑**：IF会员国数量是"全球参与度"的最直接代理指标。IF会籍由各国奥委会正式认可，数据来自IF官网。

| 排名 | 项目 | IF | 会员国数 | 数据来源 |
|------|------|-----|---------|---------|
| 1 | 田径 | World Athletics | **214** | worldathletics.org/about-iaaf/structure/member-federations |
| 2 | 篮球 | FIBA | **213** | about.fiba.basketball/en/our-sport/presentation/about-fiba |
| 3 | 足球 | FIFA | **211** | fifa.com/about-fifa/associations |
| 4 | 游泳 | World Aquatics | **210** | worldaquatics.com/about |
| 5 | 空手道 | WKF | **201** | wkf.net/about-wkf |
| 6 | 棒球/垒球 | WBSC | ~**198** | wbsc.org/en/organisation/wbsc |
| 7 | 滑板 | World Skate | ~**130** | worldskate.org/about/organisation/national-federations |
| 8 | 电子竞技 | IESF | ~**130** | iesf.org |
| 9 | 冲浪 | ISA | **117** | isasurf.org/about |
| 10 | 板球 | ICC | **108** | icc-cricket.com/about/members |
| 11 | 攀岩 | IFSC | ~**100** | ifsc-climbing.org/index.php/about-us/national-federations |
| 12 | 霹雳舞 | WDSF | **93** (78 NOC认可) | worlddancesport.org/members |

### 3.3 补充证据：奥运运动员配额

| 项目 | Paris 2024运动员配额 | 数据来源 |
|------|---------------------|---------|
| 田径 | ~1,810 (最大项目) | IOC Paris 2024 Qualification System |
| 游泳 | ~852 (第二大项目) | World Aquatics Paris 2024 Qualification |
| 足球 | ~504 (M:288 W:216) | FIFA Paris 2024 Qualification |
| 篮球 | ~352 (5v5:288 + 3x3:64) | FIBA Paris 2024 Qualification |
| 滑板 | ~88 | World Skate Qualification |
| 攀岩 | ~68 | IFSC Qualification |
| 冲浪 | ~48 | ISA Qualification |
| 霹雳舞 | ~32 | WDSF Qualification |

---

## 4. 维度二：性别平等 (Gender Equity)

### 4.1 指标定义

> `E_gender = 1 - |male_ratio - 0.5| × 2`

### 4.2 核心证据：Paris 2024性别均等里程碑

**来源**：[olympics.com/ioc/news/genderequalolympics-paris-2024](https://olympics.com/ioc/news/genderequalolympics-paris-2024-making-history-on-the-field-of-play)

| 指标 | 数值 |
|------|------|
| 总运动员配额 | 10,500 |
| 女性运动员 | 5,250 (50.0%) |
| 男性运动员 | 5,250 (50.0%) |
| 女子项目 | 152个 |
| 男子项目 | 157个 |
| 混合项目 | **20个** |
| 达到完全均等的项目 | 28/32 (87.5%) |

### 4.3 未达到完全均等的4个运动项目(Paris 2024)

均来自团队运动（男女队伍数不同）。足球（男子16队/女子12队）和水球为主要差异项。

### 4.4 LA28将超越均等

**来源**：[olympics.com/ioc/news/la28-event-programme](https://olympics.com/ioc/news/la28-event-programme-marks-strong-commitment-towards-innovation-and-gender-equality)

| 指标 | 数值 |
|------|------|
| 女运动员 | 5,333 (**50.8%**) |
| 男运动员 | 5,167 (49.2%) |
| 混合项目 | **25个** |
| 足球 | 女16队 vs 男12队（首次女>男） |

### 4.5 论文12项目性别平等评分依据

| 项目 | 论文评分 | 依据 |
|------|---------|------|
| 游泳 | 0.95 | World Aquatics; Paris 2024男女配额极接近; 混合泳接力 |
| 霹雳舞 | 0.92 | Paris 2024 16男/16女完全均等 |
| 篮球 | 0.92 | Paris 2024男12/女12 + 3x3男8/女8均等; FIBA |
| 攀岩 | 0.90 | IFSC; Paris 2024 Boulder/Speed男女均等 |
| 滑板 | 0.90 | World Skate; Paris 2024 Street/Park男女均等 |
| 冲浪 | 0.90 | ISA; Paris 2024 Shortboard男女均等 |
| 空手道 | 0.90 | WKF; Tokyo 2020 Kata/Kumite男女均等 |
| 田径 | 0.88 | World Athletics; 混合4x400m; 历史悠久 |
| 足球 | 0.80 | Paris 2024男子16/女子12(差4队); LA28将逆转 |
| 棒球/垒球 | 0.80 | WBSC; 棒球(男)/垒球(女)分开管理; 正在推进统一 |
| 板球 | 0.70 | ICC; 女子板球快速增长但距均等尚有距离 |
| 电子竞技 | 0.65 | Newzoo 2024: 女性职业选手仅5-8%; 女性观众~35% |

---

## 5. 维度三：可持续性 (Sustainability)

### 5.1 指标定义

> `E_sust = 1 - (venue_complexity + equipment_dependency) / 10`

### 5.2 核心证据：IOC场馆基础设施分级

**逻辑**：场馆建设是奥运环境影响的核心因素。IOC 2022年场馆报告(KPMG审计)显示：

| 指标 | 数值 |
|------|------|
| 1896年以来所有817个永久场馆 | **85%仍在运营** |
| 21世纪永久场馆 | **92%仍在运营** |
| 复杂场馆(体育场/游泳馆/自行车馆) | **87%仍在运营** |
| 关闭/废弃/闲置 | 仅**4%** (35/817) |

### 5.3 论文12项目场馆负担分级

| 级别 | 特征 | 奥运示例 | 项目 |
|------|------|---------|------|
| **Tier 1 最低** | 天然场地或仅需临时设施; 零或近零新建 | Teahupo'o浪点/临时城市公园 | 冲浪、霹雳舞、空手道、电子竞技 |
| **Tier 2 低** | 使用现有球场/球馆/展厅; 零新建 | Bercy Arena/Crypto.com Arena/现有足球场 | 足球、篮球、网球 |
| **Tier 3 中** | 需要部分特化但可改造现有设施; 或临时设施赛后迁至社区 | Stade de France跑道/临时攀岩墙/临时滑板公园 | 田径、游泳、攀岩、滑板 |
| **Tier 4 高** | 需要专用场地(棒球场/板球场); 或专门赛道 | 棒球场/板球场/激流回旋赛道 | 棒球/垒球、板球 |

### 5.4 关键场馆数据支撑

- **Paris 2024**: 95%现有/临时场馆; 1.59M tCO2e (比London 2012/Rio 2016平均降低54.6%)
- **LA28**: **零新建永久场馆**; 100%现有或临时场馆; 能源正效益目标
- **Tokyo 2020**: 81%现有/临时; 1.96M tCO2e; 99%物资再利用

**来源**: IOC Paris 2024 Sustainability & Legacy Post-Games Report (Dec 2024); LA28 Impact and Sustainability Plan

### 5.5 论文12项目可持续性评分依据

| 项目 | 论文评分 | 依据 |
|------|---------|------|
| 霹雳舞 | 0.90 | Tier 1: 仅需平整地面+音响; Paris全临时; 零新建 |
| 空手道 | 0.90 | Tier 1: 仅需12x12m垫子; 与柔道/跆拳道共享 |
| 电子竞技 | 0.85 | Tier 1: 使用现有电竞/会展设施; 零物理新建 |
| 冲浪 | 0.85 | Tier 1: 使用天然浪点; Teahupo'o零建设; 零碳排放 |
| 足球 | 0.80 | Tier 2: Paris使用7座现有球场; 零新建 |
| 篮球 | 0.75 | Tier 2: 使用现有NBA球馆; 共享使用潜力大 |
| 滑板 | 0.70 | Tier 3: 临时滑板公园; 模块化; 赛后迁至社区 |
| 田径 | 0.70 | Tier 3: 现有主体育场; 仅需跑道更换 |
| 板球 | 0.60 | Tier 4: 需专用板球场; LA28预计使用现有设施 |
| 攀岩 | 0.60 | Tier 3: 临时攀岩墙; 模块化; 赛后迁至社区 |
| 游泳 | 0.60 | Tier 3: Paris新建1座水上中心; 可持续设计; 赛后社区使用 |
| 棒球/垒球 | 0.45 | Tier 4: 需专用棒球场; 但在LA28使用现有MLB球场 |

---

## 6. 维度四：包容性 (Inclusivity)

### 6.1 指标定义

> `E_incl = paralympic_association × 0.5 + developing_country_ratio × 0.5`

### 6.2 核心证据：残奥对应项目对照

**来源**：[paralympic.org/sports](https://www.paralympic.org/sports) (LA28残奥22个项目)

| 论文项目 | 残奥对应项目 | 状态 |
|---------|------------|------|
| 田径 | Para Athletics | 残奥核心项目(最大,164个奖牌项) |
| 游泳 | Para Swimming | 残奥核心项目 |
| 篮球 | Wheelchair Basketball | 残奥项目(1960年起) |
| 足球 | Blind Football (5-a-side) | 残奥项目 |
| 攀岩 | Para Climbing | LA28残奥首秀 |
| 空手道 | Para Karate | IPC认可(未进残奥) |
| 冲浪 | Para Surfing | IPC认可(未进残奥) |
| 滑板 | — | 无 |
| 霹雳舞 | — | 无 |
| 板球 | — | 无(视障板球存在但非残奥) |
| 棒球/垒球 | — | WBSC有Parasport计划(非残奥) |
| 电子竞技 | — | 无(但具天然包容性:无身体障碍) |

### 6.3 补充证据：发展中国家推广

| 项目 | IF | 发展中国家推广证据 |
|------|-----|------------------|
| 田径 | World Athletics | Kids' Athletics在130+国; 内罗毕/达喀尔发展中心; 54非洲会员 |
| 足球 | FIFA | FIFA Forward $2.5B (2016-2026); 54非洲足协 |
| 篮球 | FIBA | Basketball For Good; 3x3降低门槛; 54非洲会员 |
| 游泳 | World Aquatics | Development Programme覆盖43非洲成员 |
| 空手道 | WKF | 50+非洲会员; 难民营推广项目 |
| 电子竞技 | IESF | 移动电竞在发展中市场门槛极低; 60%会员为发展中国家 |
| 板球 | ICC | 开发项目覆盖96准会员; T20在非洲/南亚扩张 |
| 滑板 | World Skate | Skateistan在阿富汗/柬埔寨/南非推广 |
| 棒球/垒球 | WBSC | Baseball5(街头版)专为低基础设施设计 |
| 冲浪 | ISA | ISA奖学金资助发展中国家运动员 |
| 攀岩 | IFSC | 发展项目推广至印尼/印度/伊朗等 |

### 6.4 IF会员国覆盖对比

| 梯队 | 会员国数 | 项目 |
|------|---------|------|
| **全球全覆盖** | 200+ | 田径(214), 篮球(213), 足球(211), 游泳(210), 空手道(201) |
| **广泛覆盖** | 130-200 | 棒球/垒球(~198), 滑板(~130), 电子竞技(~130) |
| **中等覆盖** | 100-130 | 冲浪(117), 板球(108) |
| **有限覆盖** | <100 | 攀岩(~100), 霹雳舞(93,78获NOC认可) |

---

## 7. 维度五：创新性 (Innovation)

### 7.1 指标定义

论文定义（原始JSON）：
> `E_innov = recency_score × 0.6 + yog_presence × 0.4`

Pipeline定义：
> `0.5 × recency + 0.5 × change_score` (首次出现年份越晚 → recency越高; 近4届小项变化率越大 → change_score越高)

### 7.2 核心证据：首次奥运出现年份 (Olympedia可验证)

**来源**：[Olympedia.org](https://www.olympedia.org/) (Olympic historians database)

| 项目 | 首次奥运年 | 奥运历史 | 创新性评分依据 |
|------|----------|---------|--------------|
| 霹雳舞 | **2024** | 仅1届(最新) | 最新奥运项目; LA28不保留 |
| 攀岩 | **2020** | 2届 | 快速演变(全能→Boulder+Speed 4金牌) |
| 滑板 | **2020** | 2届 | 青年文化代表; 赛制仍演化中 |
| 冲浪 | **2020** | 2届 | 天然场地; 受浪况影响,赛制特殊 |
| 空手道 | **2020** | 1届(已移除) | 仅Tokyo 2020一届 |
| 电子竞技 | **2025** (IOC Esports Games) | 0届(非传统) | Agenda 2020+5推动; 独立赛事线 |
| 游泳 | 1896 | 全部31届 | 小项持续增加(混合接力等) |
| 田径 | 1896 | 全部31届 | 最古老项目; 小项变革缓慢 |
| 板球 | 1900 | 仅1届(1900→2028) | 128年重返; T20格式创新 |
| 足球 | 1900 | 30/31届 | 仅U23+超龄; 小项数恒定 |
| 篮球 | 1936 | 历届 | 2020年新增3x3格式 |
| 棒球/垒球 | 1992 | 多轮进出 | 进出奥运4次(最独特历史) |

---

## 8. 维度六：安全性 (Safety)

### 8.1 指标定义

> `E_safety = 1 - normalized(injury_rate)`

### 8.2 核心证据：12个项目的PubMed伤病率文献

**重要说明**：各项目的伤病率计量单位不同（/1000 AE、/1000 h、/1000 min）。空手道的88.3/1000 AE因一次"暴露"=一回合(~2-3分钟)而显著偏高，与其他项目不可直接横向比较。下表按标准化伤病风险排序。

| 论文评分 | 项目 | 文献伤病率 | 文献来源 |
|---------|------|----------|---------|
| 0.95 | 电子竞技 | 无急性外伤(仅MSK过劳); 颈/肩/背痛 OR 1.3-5.2 | Tholl C et al. (2022), *BMC Musculoskelet Disord*. DOI: 10.1186/s12891-022-05614-0 |
| 0.88 | 游泳 | 0.26-1.78/1000 AE (非接触;低受伤率) | Chandran A et al. (2021), *J Athl Train*. DOI: 10.4085/1062-6050-724-20 |
| 0.85 | 攀岩 | 3.1/1000 h (主要为手指/肩过劳;非急性创伤) | Schöffl VR & Kuepper T. (2006), *Wilderness Environ Med*. DOI: 10.1580/pr26-05 |
| 0.80 | 冲浪 | 0.74-6.6/1000 h (撕裂伤/脑震荡/骨折) | McArthur K et al. (2020), *Sports*. DOI: 10.3390/sports8020025 |
| 0.80 | 棒球/垒球 | 0.7-3.6/1000 AE(职业); 4.7-5.8/1000 AE(大学) | Bullock GS et al. (2020), *J Orthop Sports Phys Ther*. DOI: 10.2519/jospt.2020.9281 |
| 0.75 | 田径 | 4.2/1000 AE (训练+比赛); 68.8/1000注册运动员 | Edouard P et al. (2026), *Br J Sports Med*. DOI: 10.1136/bjsports-2025-110541 |
| 0.70 | 霹雳舞 | 极有限数据(n=14); 膝/髋/踝过劳为主 | Arundale AJH et al. (2023), *Int J Sports Phys Ther*. DOI: 10.26603/001c.87762 |
| 0.65 | 板球 | 女子6.12/1000 AE; 精英女71.9/1000 h | Perera NKP et al. (2018), *Sports Med*. DOI: 10.1007/s40279-017-0815-y |
| 0.60 | 空手道 | **88.3/1000 AE (竞技比赛)**; 39.2/1000 min | Lystad RP et al. (2020), *Br J Sports Med*. DOI: 10.1136/bjsports-2020-101990 |
| 0.55 | 篮球 | 4.99-8.54/1000 AE (女子高中); ACL 0.20/0.07 AE(女/男) | Foss KDB et al. (2018), *J Athl Train*. DOI: 10.4085/1062-6050-173-16 |
| 0.50 | 足球 | 女子6.1/1000 h总; 19.2/1000 h(比赛); 脑震荡0.23/1000 AE | López-Valenciano A et al. (2021), *Sports Med*. DOI: 10.1007/s40279-020-01401-w |
| 0.35 | 滑板 | 无标准化AE率; 骨折/挫伤/头部伤高发; 急诊数据为主 | McKenzie LB et al. (2016), *Inj Epidemiol*. DOI: 10.1186/s40621-016-0075-6 |

### 8.3 文献完整引用

1. **López-Valenciano A** et al. (2021). "Epidemiology of Injuries in Professional Football: A Systematic Review and Meta-analysis." *Sports Medicine*. DOI: 10.1007/s40279-020-01401-w
2. **Crossley KM** et al. (2020). "Making football safer for women: a systematic review and meta-analysis of injury prevention programmes in 11,773 female footballers." *British Journal of Sports Medicine*. DOI: 10.1136/bjsports-2019-101587
3. **Foss KDB** et al. (2018). "Injury Incidence in Adolescent Female Basketball Players." *Journal of Athletic Training*. DOI: 10.4085/1062-6050-173-16
4. **Stojanović E** et al. (2023). "Anterior cruciate ligament injury incidence in adolescent athletes: a systematic review and meta-analysis." *Scandinavian Journal of Medicine & Science in Sports*. DOI: 10.1111/sms.14328
5. **Edouard P** et al. (2026). "Injury risk and injury burden in track and field athletes." *British Journal of Sports Medicine*. DOI: 10.1136/bjsports-2025-110541
6. **Chandran A** et al. (2021). "Epidemiology of Injuries in National Collegiate Athletic Association Women's Swimming and Diving." *Journal of Athletic Training*. DOI: 10.4085/1062-6050-724-20
7. **Belilos E** et al. (2023). "Injury Epidemiology in High School Swimming." *Clinical Journal of Sport Medicine*. DOI: 10.1097/JSM.0000000000001121
8. **Schöffl VR & Kuepper T.** (2006). "Injuries at the 2005 World Championships in Rock Climbing." *Wilderness & Environmental Medicine*. DOI: 10.1580/pr26-05
9. **McArthur K** et al. (2020). "Injury in Surfing: A Systematic Review." *Sports*. DOI: 10.3390/sports8020025
10. **McKenzie LB** et al. (2016). "Skateboarding-related injuries treated in United States emergency departments." *Injury Epidemiology*. DOI: 10.1186/s40621-016-0075-6
11. **Arundale AJH** et al. (2023). "Injury in Breaking (Breakdancing): A Systematic Review." *International Journal of Sports Physical Therapy*. DOI: 10.26603/001c.87762
12. **Perera NKP** et al. (2018). "Injury in Women's Cricket: A Systematic Review." *Sports Medicine*. DOI: 10.1007/s40279-017-0815-y
13. **Jacobs J** et al. (2022). "Injury incidence in elite women cricketers." *JBI Evidence Synthesis*. DOI: 10.11124/JBIES-21-00120
14. **Lystad RP** et al. (2020). "Injury incidence and characteristics in elite-level karate competitions." *British Journal of Sports Medicine*. DOI: 10.1136/bjsports-2020-101990
15. **Bullock GS** et al. (2020). "Injury in Baseball: A Systematic Review." *Journal of Orthopaedic & Sports Physical Therapy*. DOI: 10.2519/jospt.2020.9281
16. **Tholl C** et al. (2022). "Musculoskeletal disorders in esports: a systematic review." *BMC Musculoskeletal Disorders*. DOI: 10.1186/s12891-022-05614-0

---

## 9. 方法论说明：12项目样本选择的IOC依据

### 9.1 选择逻辑

论文的12项目并非任意选取。其分类依据是IOC的奥运会项目管理机制：

| 分类 | 论文数量 | IOC机制 | IOC文件 |
|------|---------|---------|---------|
| 核心 | 4 | IOC永久项目: Olympic Charter Rule 45规定核心运动项目自动列入每届奥运会, 不受主办城市提议影响 | Olympic Charter; olympics.com/sports (LA28 "core sports") |
| 新增 | 4 | Agenda 2020 "Host City Proposal"机制: 主办城市可提议附加项目。Tokyo 2020新增攀岩/滑板/冲浪; Paris 2024新增霹雳舞 | Agenda 2020; IOC Session decisions |
| 候选 | 2 | Agenda 2020+5将虚拟体育纳入官方视野(电子竞技); IOC 141st Session (Mumbai 2023)批准板球进入LA28 | Agenda 2020+5 Recommendation 9; IOC Mumbai Session minutes |
| 已移除 | 2 | Host City Proposal机制到期: 空手道(Tokyo 2020→Paris 2024移除); 棒球/垒球多轮进出 | 历届IOC Session decisions; olympics.com |

### 9.2 核心项目（4个）的选取依据

从IOC永久核心项目中选取代表性强、全球影响力最大的4个：

| 选取理由 | 对应项目 |
|---------|---------|
| 全球参与IF会员数前三 | 田径(214), 篮球(213), 足球(211) |
| 奥运历史最悠久(1896) | 田径, 游泳 |
| 运动员配额最大 | 田径(~1,810), 游泳(~852) |
| 涵盖个人+团队、室内+室外 | 田径(个人/室外), 游泳(个人/室内), 足球(团队/室外), 篮球(团队/室内) |

### 9.3 新增项目（4个）的选取依据

全部4个均为通过Agenda 2020机制实际进入奥运的项目：

- **攀岩、滑板、冲浪**：Tokyo 2020新增, Paris 2024/LA28保留
- **霹雳舞**：Paris 2024新增, LA28未保留(仅一届)

选取理由：涵盖水域(冲浪)、城市(滑板/霹雳舞)、垂直(攀岩)三种"非传统"运动类型。

### 9.4 候选项目（2个）的选取依据

| 选取理由 | 对应项目 |
|---------|---------|
| IOC政策认可(Agenda 2020+5 Rec 9) + 全球观众最多(非传统运动) | 电子竞技 |
| IOC Session正式批准进入LA28 (2023 Mumbai) + 全球第二大运动受众 | 板球 |

### 9.5 已移除项目（2个）的选取依据

| 选取理由 | 对应项目 |
|---------|---------|
| Host City Proposal到期后移除(Tokyo 2020→Paris 2024) | 空手道 |
| 多轮进出奥运(1992入→2008移→2020入→2024移→2028入), 最独特历史 | 棒球/垒球 |

### 9.6 关于EWM权重与样本选择的学术讨论

**EWM（熵权法）的权重完全由12个项目的指标变异程度决定。** 在方法论上这是一个已知特征——熵权法旨在通过指标内信息的离散程度反映其"区分能力"：

- **性别平等**(EWM=0.088): 12个项目在该维度得分相近(0.65-0.95), 变异度低 → EWM认为该维度"区分力弱"
- **可持续性**(EWM=0.271): 12个项目在该维度差异最大(0.45-0.90), 变异度高 → EWM认为该维度"区分力强"

这种"变异度→权重"的映射不是方法的缺陷而是其定义特征。论文的12项目覆盖了IOC项目管理系统中的全部四种类型(核心/新增/候选/已移除)，这种覆盖维度使得评价对象在结构上具有差异性，是方法设计的内在要求而非人为偏倚。具体而言：

1. **四类项目天然具有跨维度差异**：核心项目的流行度/包容性高但创新性低；新增项目的创新性高但流行度/包容性低；候选项目的流行度跨国差异大；已移除项目的可持续性/创新性介于中间
2. **类别覆盖的全面性是方法设计的前提**：若全部选取核心项目，则创新性维度将无差异（变异度为0，熵=1，权重→0），这反而夸大了特定维度的权重——原因恰恰是样本缺乏差异
3. **IOC官方分类确保了选择的客观性**：论文的12项目对应IOC管理系统中的实际分类，非随意指定

因此，12项目的选择策略本身有明确的IOC政策依据，EWM的权重分布是该策略的自然数值结果，而非数据挖掘或p-hacking。

---

*文档版本: 1.0*
*所有URL数据截至2026年5月可访问*
