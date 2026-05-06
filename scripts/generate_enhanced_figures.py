"""
为论文生成增强版图表（共11张新图）
"""
import numpy as np
import matplotlib
matplotlib.rcParams["font.sans-serif"] = ["SimHei", "Microsoft YaHei", "Arial Unicode MS"]
matplotlib.rcParams["axes.unicode_minus"] = False
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
from pathlib import Path
import warnings
warnings.filterwarnings('ignore')

FIGS = Path(__file__).resolve().parent.parent / "figures"

LABELS = ["流行度","性别平等","可持续性","包容性","创新性","安全性"]
NAMES = ["足球","电子竞技","篮球","田径","游泳","攀岩","滑板","冲浪","霹雳舞","板球","空手道","棒球/垒球"]

Wa = np.array([0.362, 0.189, 0.106, 0.090, 0.064, 0.189])
We = np.array([0.218, 0.100, 0.108, 0.174, 0.297, 0.104])
Wh = 0.5 * Wa + 0.5 * We

X = np.array([
    [0.95, 0.80, 0.80, 0.90, 0.40, 0.50],
    [0.95, 0.65, 0.85, 0.55, 1.00, 0.95],
    [0.93, 0.92, 0.75, 0.82, 0.50, 0.55],
    [0.95, 0.88, 0.70, 0.88, 0.35, 0.75],
    [0.92, 0.95, 0.60, 0.85, 0.40, 0.88],
    [0.68, 0.90, 0.60, 0.35, 0.95, 0.85],
    [0.72, 0.90, 0.70, 0.40, 0.98, 0.35],
    [0.65, 0.90, 0.85, 0.25, 0.90, 0.80],
    [0.55, 0.92, 0.90, 0.45, 1.00, 0.70],
    [0.85, 0.70, 0.60, 0.50, 0.45, 0.65],
    [0.55, 0.90, 0.90, 0.50, 0.75, 0.60],
    [0.60, 0.80, 0.45, 0.40, 0.35, 0.80],
])

CATEGORIES = np.array(["核心","核心","核心","核心","核心","新增","新增","新增","新增","候选","已移除","已移除"])
CAT_COLORS = {"核心": "#3498db", "新增": "#2ecc71", "候选": "#f39c12", "已移除": "#e74c3c"}

experts = ["体育管理学者","奥运研究专家","体育经济学研究者","体育行政管理人员","国际体育研究学者"]
expert_weights = np.array([
    [0.396, 0.194, 0.091, 0.075, 0.043, 0.201],
    [0.310, 0.237, 0.102, 0.091, 0.077, 0.183],
    [0.456, 0.114, 0.088, 0.108, 0.096, 0.138],
    [0.272, 0.216, 0.151, 0.085, 0.085, 0.191],
    [0.366, 0.189, 0.097, 0.085, 0.036, 0.227],
])

cand_names = ["电子竞技","板球","匹克球","壁球","澳式足球"]
cand_scores = np.array([
    [0.95, 0.65, 0.85, 0.55, 1.00, 0.95],
    [0.85, 0.70, 0.60, 0.50, 0.45, 0.65],
    [0.50, 0.88, 0.78, 0.70, 0.82, 0.90],
    [0.48, 0.75, 0.65, 0.55, 0.50, 0.75],
    [0.60, 0.60, 0.70, 0.45, 0.35, 0.60],
])

oly_years = [1896,1900,1904,1908,1912,1920,1924,1928,1932,1936,1948,1952,1956,1960,1964,1968,1972,1976,1980,1984,1988,1992,1996,2000,2004,2008,2012,2016,2020,2024,2028]
oly_events = [43,95,91,110,102,156,126,109,117,129,136,149,151,150,163,172,195,198,203,221,237,257,271,300,301,302,302,306,339,329,340]
oly_sports = [11,19,16,22,18,22,17,14,15,20,17,17,16,17,19,20,22,21,23,23,23,25,26,28,28,28,26,28,33,32,32]

# ──────────────────────────────
# 1. 奥运项目规模历史演变趋势
# ──────────────────────────────
def fig_olympic_growth():
    fig, ax1 = plt.subplots(figsize=(11, 5.5))
    ax1.fill_between(oly_years, oly_events, alpha=0.20, color="#3498db")
    ax1.plot(oly_years, oly_events, "o-", color="#2980b9", lw=2, ms=5, label="设项数 (Events)")
    ax1.set_ylabel("设项数", fontsize=11)
    ax1.set_xlabel("年份", fontsize=11)
    ax1.set_title("奥运项目规模历史演变趋势 (1896—2028)", fontsize=13)
    ax2 = ax1.twinx()
    ax2.plot(oly_years, oly_sports, "s--", color="#e74c3c", lw=2, ms=5, label="大项数 (Sports)")
    ax2.set_ylabel("大项数", fontsize=11)
    l1, lb1 = ax1.get_legend_handles_labels()
    l2, lb2 = ax2.get_legend_handles_labels()
    ax1.legend(l1+l2, lb1+lb2, loc="upper left", fontsize=10)
    ax1.set_xlim(1896, 2028); ax1.grid(True, alpha=0.25)
    plt.tight_layout(); plt.savefig(FIGS/"olympic_growth.png", dpi=200, bbox_inches="tight"); plt.close()
    print("[x] olympic_growth.png")

# ──────────────────────────────
# 2. 五位专家权重偏好热力图
# ──────────────────────────────
def fig_expert_heatmap():
    fig, ax = plt.subplots(figsize=(9, 5))
    im = ax.imshow(expert_weights, cmap="YlOrRd", aspect="auto", vmin=0, vmax=0.5)
    ax.set_xticks(range(6)); ax.set_xticklabels(LABELS, fontsize=10)
    ax.set_yticks(range(5)); ax.set_yticklabels(experts, fontsize=10)
    ax.set_title("五位专家权重偏好对比", fontsize=13)
    for i in range(5):
        for j in range(6):
            c = "white" if expert_weights[i,j] > 0.25 else "black"
            ax.text(j, i, f"{expert_weights[i,j]:.3f}", ha="center", va="center", fontsize=9, color=c)
    plt.colorbar(im, ax=ax, shrink=0.8, label="权重值")
    plt.tight_layout(); plt.savefig(FIGS/"expert_heatmap.png", dpi=200, bbox_inches="tight"); plt.close()
    print("[x] expert_heatmap.png")

# ──────────────────────────────
# 3. 三种方法排名对比
# ──────────────────────────────
def fig_method_comparison():
    scores_ahp = X @ Wa; scores_ewm = X @ We; scores_hyd = X @ Wh
    order_ahp = np.argsort(-scores_ahp); order_ewm = np.argsort(-scores_ewm); order_hyd = np.argsort(-scores_hyd)
    fig, axes = plt.subplots(1, 3, figsize=(15, 6.5), sharey=True)
    titles = ["纯AHP (α=1)", "纯EWM (α=0)", "混合权重 (α=0.5)"]
    colors = ["#3498db", "#e74c3c", "#2ecc71"]
    all_scores = [scores_ahp, scores_ewm, scores_hyd]
    all_orders = [order_ahp, order_ewm, order_hyd]
    for idx, (ax, title, clr) in enumerate(zip(axes, titles, colors)):
        s_arr = all_scores[idx]; o_arr = all_orders[idx]
        ss = s_arr[o_arr]; sn = [NAMES[i] for i in o_arr]
        bars = ax.barh(range(12), ss, color=clr, alpha=0.85)
        ax.set_yticks(range(12)); ax.set_yticklabels(sn, fontsize=9)
        ax.set_title(title, fontsize=11, fontweight="bold"); ax.invert_yaxis()
        for b, v in zip(bars, ss):
            ax.text(v+0.005, b.get_y()+b.get_height()/2, f"{v:.3f}", va="center", fontsize=7.5)
        ax.set_xlim(0, 1.0)
        ax.tick_params(axis='y', labelsize=9)
    plt.suptitle("三种权重方法排名对比", fontsize=14, y=1.01)
    plt.tight_layout(); plt.savefig(FIGS/"method_ranking_compare.png", dpi=200, bbox_inches="tight"); plt.close()
    print("[x] method_ranking_compare.png")

# ──────────────────────────────
# 4. 不同α取值下排名变化轨迹
# ──────────────────────────────
def fig_rank_stability():
    alphas = np.linspace(0, 1, 21)
    n_sports = len(NAMES)
    rank_trace = np.zeros((len(alphas), n_sports))
    for k, a in enumerate(alphas):
        w = a * Wa + (1-a) * We; w /= w.sum()
        s = X @ w; r = np.argsort(np.argsort(-s))
        rank_trace[k] = r + 1
    fig, ax = plt.subplots(figsize=(11, 6.5))
    colors = plt.cm.tab10(np.linspace(0, 1, n_sports))
    for i in range(n_sports):
        ax.plot(alphas, rank_trace[:, i], "o-", color=colors[i], lw=2, ms=4, label=NAMES[i])
    ax.set_xlabel("组合系数 α", fontsize=12); ax.set_ylabel("排名", fontsize=12)
    ax.set_title("不同 α 取值下奥运项目排名变化轨迹", fontsize=13)
    ax.legend(loc="center left", bbox_to_anchor=(1, 0.5), fontsize=9)
    ax.invert_yaxis(); ax.set_yticks(range(1, 13)); ax.set_ylim(13, 0)
    ax.axvspan(0.4, 0.6, alpha=0.12, color="green")
    ax.axvline(0.5, ls="--", color="gray", alpha=0.6)
    ax.text(0.5, 12.5, "推荐值 α=0.5", ha="center", fontsize=9, color="gray")
    ax.text(0.5, 11.8, "稳定区间 [0.4, 0.6]", ha="center", fontsize=9, color="green", fontweight="bold")
    ax.grid(True, alpha=0.25)
    plt.tight_layout(); plt.savefig(FIGS/"rank_stability.png", dpi=200, bbox_inches="tight"); plt.close()
    print("[x] rank_stability.png")

# ──────────────────────────────
# 5. 各项目综合评分结构分解
# ──────────────────────────────
def fig_score_decomposition():
    scores = X @ Wh; order = np.argsort(-scores)
    sorted_names = [NAMES[i] for i in order]; sorted_X = X[order]
    fig, ax = plt.subplots(figsize=(12, 6))
    bottom = np.zeros(12)
    colors = ["#3498db","#e74c3c","#2ecc71","#f39c12","#9b59b6","#1abc9c"]
    for j in range(6):
        vals = sorted_X[:, j] * Wh[j]
        ax.barh(range(12), vals, left=bottom, label=LABELS[j], color=colors[j], alpha=0.85)
        bottom += vals
    ax.set_yticks(range(12)); ax.set_yticklabels(sorted_names, fontsize=10)
    ax.set_xlabel("综合评分", fontsize=11); ax.set_title("各项目综合评分结构分解", fontsize=13)
    ax.invert_yaxis(); ax.legend(loc="lower right", fontsize=9)
    for i, s in enumerate(scores[order]):
        ax.text(s+0.01, i, f"{s:.3f}", va="center", fontsize=8)
    plt.tight_layout(); plt.savefig(FIGS/"score_decomposition.png", dpi=200, bbox_inches="tight"); plt.close()
    print("[x] score_decomposition.png")

# ──────────────────────────────
# 6. 2032年候选项目对比
# ──────────────────────────────
def fig_prediction_candidates():
    total = cand_scores @ Wh
    order = np.argsort(-total); sn = [cand_names[i] for i in order]; ss = total[order]
    fig = plt.figure(figsize=(13, 5.5))
    ax1 = fig.add_subplot(1, 2, 1)
    colors_bar = ["#9b59b6","#3498db","#2ecc71","#f39c12","#e74c3c"]
    bars = ax1.barh(range(len(sn)), ss, color=[colors_bar[i] for i in order])
    ax1.set_yticks(range(len(sn))); ax1.set_yticklabels(sn, fontsize=10)
    ax1.set_title("2032年候选项目综合评分", fontsize=12, fontweight="bold"); ax1.invert_yaxis()
    for b, v in zip(bars, ss):
        ax1.text(v+0.005, b.get_y()+b.get_height()/2, f"{v:.3f}", va="center", fontsize=9)
    ax1.set_xlim(0, 1.0)
    ax2 = fig.add_subplot(1, 2, 2, polar=True)
    ang = np.linspace(0, 2*np.pi, 6, endpoint=False).tolist(); ang += ang[:1]
    lb = LABELS + [LABELS[0]]
    top3_idx = [list(cand_names).index(sn[i]) for i in range(min(3, len(sn)))]
    rc = ["#9b59b6","#3498db","#2ecc71"]
    for k, idx in enumerate(top3_idx):
        sc = np.concatenate([cand_scores[idx], [cand_scores[idx][0]]])
        ax2.plot(ang, sc, "o-", lw=2, color=rc[k], label=sn[k])
        ax2.fill(ang, sc, alpha=0.08, color=rc[k])
    ax2.set_xticks(ang[:-1]); ax2.set_xticklabels(lb[:-1], fontsize=9)
    ax2.set_title("前三名候选六维对比", fontsize=12, fontweight="bold", pad=20)
    ax2.set_ylim(0, 1); ax2.legend(loc="upper right", bbox_to_anchor=(1.35, 1.1), fontsize=9)
    plt.tight_layout(); plt.savefig(FIGS/"prediction_candidates.png", dpi=200, bbox_inches="tight"); plt.close()
    print("[x] prediction_candidates.png")

# ──────────────────────────────
# 7. 四类项目六维平均评分对比
# ──────────────────────────────
def fig_category_comparison():
    cats = ["核心", "新增", "候选", "已移除"]
    cat_indices = {c: [i for i, cc in enumerate(CATEGORIES) if cc == c] for c in cats}
    cat_means = {c: X[indices].mean(axis=0) for c, indices in cat_indices.items()}
    fig, ax = plt.subplots(figsize=(11, 5.5))
    x = np.arange(6); w = 0.18
    colors_cat = ["#3498db","#2ecc71","#f39c12","#e74c3c"]
    for i, c in enumerate(cats):
        ax.bar(x + i*w, cat_means[c], w, label=c, color=colors_cat[i], alpha=0.85)
    ax.set_xticks(x + 1.5*w); ax.set_xticklabels(LABELS, fontsize=10)
    ax.set_ylabel("平均评分", fontsize=11); ax.set_title("四类项目六维平均评分对比", fontsize=13)
    ax.legend(fontsize=10); ax.grid(True, alpha=0.2, axis='y')
    for i, c in enumerate(cats):
        for j in range(6):
            ax.text(j + i*w, cat_means[c][j] + 0.01, f"{cat_means[c][j]:.2f}", ha="center", va="bottom", fontsize=7, rotation=90)
    plt.tight_layout(); plt.savefig(FIGS/"category_comparison.png", dpi=200, bbox_inches="tight"); plt.close()
    print("[x] category_comparison.png")

# ──────────────────────────────
# 8. 六维指标相关性热力图
# ──────────────────────────────
def fig_dimension_correlation():
    corr = np.corrcoef(X.T)
    fig, ax = plt.subplots(figsize=(7, 6))
    im = ax.imshow(corr, cmap="RdYlBu", aspect="auto", vmin=-1, vmax=1)
    ax.set_xticks(range(6)); ax.set_xticklabels(LABELS, fontsize=10, rotation=30)
    ax.set_yticks(range(6)); ax.set_yticklabels(LABELS, fontsize=10)
    ax.set_title("六维指标相关系数矩阵", fontsize=13)
    for i in range(6):
        for j in range(6):
            c = "white" if abs(corr[i,j]) > 0.5 else "black"
            ax.text(j, i, f"{corr[i,j]:.2f}", ha="center", va="center", fontsize=9, color=c)
    plt.colorbar(im, ax=ax, shrink=0.8, label="Pearson r")
    plt.tight_layout(); plt.savefig(FIGS/"dimension_correlation.png", dpi=200, bbox_inches="tight"); plt.close()
    print("[x] dimension_correlation.png")

# ──────────────────────────────
# 9. 流行度-创新性散点图
# ──────────────────────────────
def fig_pop_innovation_scatter():
    fig, ax = plt.subplots(figsize=(10, 7))
    for i in range(12):
        cat = CATEGORIES[i]; c = CAT_COLORS[cat]
        ax.scatter(X[i,0], X[i,4], s=120, c=c, edgecolors="black", linewidths=0.5, alpha=0.8, zorder=5)
        offset_x = 0.01; offset_y = 0.01
        if NAMES[i] == "电子竞技":
            offset_y = -0.03
        elif NAMES[i] == "足球":
            offset_x = -0.12; offset_y = 0.0
        elif NAMES[i] == "篮球":
            offset_y = -0.03
        elif NAMES[i] == "游泳":
            offset_y = -0.03
        elif NAMES[i] == "田径":
            offset_x = -0.06; offset_y = 0.0
        ax.annotate(NAMES[i], (X[i,0]+offset_x, X[i,4]+offset_y), fontsize=9, zorder=6)
    cats_uniq = list(CAT_COLORS.keys())
    for c in cats_uniq:
        idx = [i for i, cc in enumerate(CATEGORIES) if cc == c]
        ax.scatter([], [], s=80, c=CAT_COLORS[c], edgecolors="black", linewidths=0.5, label=c)
    ax.set_xlabel("流行度", fontsize=12); ax.set_ylabel("创新性", fontsize=12)
    ax.set_title("流行度 vs 创新性: 奥运项目分布", fontsize=13)
    ax.legend(fontsize=10); ax.grid(True, alpha=0.25)
    ax.set_xlim(0.4, 1.05); ax.set_ylim(0.2, 1.05)
    plt.tight_layout(); plt.savefig(FIGS/"pop_innovation_scatter.png", dpi=200, bbox_inches="tight"); plt.close()
    print("[x] pop_innovation_scatter.png")

# ──────────────────────────────
# 10. AHP与EWM权重差异对比
# ──────────────────────────────
def fig_weight_difference():
    fig, ax = plt.subplots(figsize=(10, 5.5))
    x = np.arange(6); w = 0.3
    ax.bar(x-w/2, Wa, w, label="AHP主观权重", color="#3498db", alpha=0.85)
    ax.bar(x+w/2, We, w, label="EWM客观权重", color="#e74c3c", alpha=0.85)
    ax.set_xticks(x); ax.set_xticklabels(LABELS, fontsize=10)
    ax.set_ylabel("权重", fontsize=11); ax.set_title("AHP主观权重与EWM客观权重差异对比", fontsize=13)
    ax.legend(fontsize=10); ax.grid(True, alpha=0.2, axis='y')
    for i in range(6):
        diff = Wa[i] - We[i]
        sign = "+" if diff > 0 else ""
        ax.annotate(f"{sign}{diff:.3f}", (i, max(Wa[i], We[i])+0.008), ha="center", fontsize=8, fontweight="bold",
                    color="#27ae60" if diff > 0 else "#c0392b")
    # Add a connecting line to show the difference
    for i in range(6):
        ax.plot([i-w/2, i+w/2], [Wa[i], We[i]], "o-", color="gray", lw=1, alpha=0.5)
    plt.tight_layout(); plt.savefig(FIGS/"weight_difference.png", dpi=200, bbox_inches="tight"); plt.close()
    print("[x] weight_difference.png")

# ──────────────────────────────
# 11. 12项目六维评分平行坐标图
# ──────────────────────────────
def fig_parallel_coordinates():
    fig, ax = plt.subplots(figsize=(12, 6.5))
    colors_pl = [CAT_COLORS[CATEGORIES[i]] for i in range(12)]
    for i in range(12):
        ax.plot(range(6), X[i], "o-", lw=1.5, color=colors_pl[i], alpha=0.7, markersize=5)
        ax.annotate(NAMES[i], (5, X[i,5]), fontsize=8, color=colors_pl[i],
                    xytext=(5.02, X[i,5]), va="center")
    ax.set_xticks(range(6)); ax.set_xticklabels(LABELS, fontsize=10)
    ax.set_xlim(-0.5, 6.5); ax.set_ylim(0, 1.05)
    ax.set_ylabel("评分", fontsize=11); ax.set_title("12个奥运项目六维评分平行坐标图", fontsize=13)
    ax.grid(True, alpha=0.2)
    for c in list(CAT_COLORS.keys()):
        ax.plot([], [], "o-", color=CAT_COLORS[c], label=c, lw=2)
    ax.legend(fontsize=10, loc="lower left")
    plt.tight_layout(); plt.savefig(FIGS/"parallel_coordinates.png", dpi=200, bbox_inches="tight"); plt.close()
    print("[x] parallel_coordinates.png")

if __name__ == "__main__":
    FIGS.mkdir(exist_ok=True)
    fig_olympic_growth()
    fig_expert_heatmap()
    fig_method_comparison()
    fig_rank_stability()
    fig_score_decomposition()
    fig_prediction_candidates()
    fig_category_comparison()
    fig_dimension_correlation()
    fig_pop_innovation_scatter()
    fig_weight_difference()
    fig_parallel_coordinates()
    print("\n✓ 全部 11 张增强图片生成完成！")
