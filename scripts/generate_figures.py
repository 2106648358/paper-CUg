import sys, numpy as np
from pathlib import Path

BASE_DIR = Path(r"D:\ProjectResources\paper-CUg")
sys.path.insert(0, str(BASE_DIR / "bak" / "paper_workbench_hym" / "thesis-workspace" / "thesis" / "scripts"))

from ahp_calculator import ahp_analysis

import matplotlib
matplotlib.rcParams["font.sans-serif"] = ["SimHei", "Microsoft YaHei", "Arial Unicode MS"]
matplotlib.rcParams["axes.unicode_minus"] = False
import matplotlib.pyplot as plt

FIGURES = BASE_DIR / "figures"

LABELS = ["流行度","性别平等","可持续性","包容性","创新性","安全性"]

A = np.array([
    [1,2.667,3.667,3.928,4.718,2.667],
    [0.375,1,2,2.297,3.301,1.148],
    [0.273,0.5,1,1.189,2,0.638],
    [0.255,0.435,0.841,1,1.741,0.536],
    [0.212,0.303,0.5,0.575,1,0.347],
    [0.375,0.871,1.568,1.866,2.884,1],
])

X = np.array([
    [0.95,0.80,0.80,0.90,0.40,0.50],
    [0.95,0.65,0.85,0.55,1.00,0.95],
    [0.93,0.92,0.75,0.82,0.50,0.55],
    [0.95,0.88,0.70,0.88,0.35,0.75],
    [0.92,0.95,0.60,0.85,0.40,0.88],
    [0.68,0.90,0.60,0.35,0.95,0.85],
    [0.72,0.90,0.70,0.40,0.98,0.35],
    [0.65,0.90,0.85,0.25,0.90,0.80],
    [0.55,0.92,0.90,0.45,1.00,0.70],
    [0.85,0.70,0.60,0.50,0.45,0.65],
    [0.55,0.90,0.90,0.50,0.75,0.60],
    [0.60,0.80,0.45,0.40,0.35,0.80],
])
NAMES = ["足球","电子竞技","篮球","田径","游泳","攀岩","滑板","冲浪","霹雳舞","板球","空手道","棒球/垒球"]
FNAMES = ["football","esports","basketball","athletics","swimming","climbing","skateboarding","surfing","breaking","cricket","karate","baseball"]

def plot_weight_comparison(Wa, We, Wh, labels, path):
    x = np.arange(len(labels)); w = 0.25
    fig, ax = plt.subplots(figsize=(10,6))
    ax.bar(x-w, Wa, w, label="AHP", color="#3498db")
    ax.bar(x, We, w, label="EWM", color="#e74c3c")
    ax.bar(x+w, Wh, w, label="Hybrid", color="#2ecc71")
    ax.set_xticks(x); ax.set_xticklabels(labels, fontsize=10)
    ax.set_title("三种权重方法对比", fontsize=14); ax.legend()
    plt.tight_layout(); plt.savefig(path, dpi=150, bbox_inches="tight"); plt.close()

def plot_radar(scores, labels, title, path):
    ang = np.linspace(0,2*np.pi,len(labels),endpoint=False).tolist()
    sc = np.concatenate([scores, [scores[0]]]); ang += ang[:1]; lb = labels + [labels[0]]
    fig, ax = plt.subplots(figsize=(7,7), subplot_kw=dict(polar=True))
    ax.plot(ang, sc, "o-", lw=2, color="#3498db"); ax.fill(ang, sc, alpha=0.25, color="#3498db")
    ax.set_xticks(ang[:-1]); ax.set_xticklabels(lb[:-1], fontsize=11)
    ax.set_title(title, fontsize=14, pad=20); ax.set_ylim(0,1)
    plt.tight_layout(); plt.savefig(path, dpi=150, bbox_inches="tight"); plt.close()

def plot_ranking(names, scores, title, path):
    si = np.argsort(scores)[::-1]; sn = [names[i] for i in si]; ss = scores[si]
    fig, ax = plt.subplots(figsize=(11,6))
    cs = plt.cm.viridis(np.linspace(0.2,0.8,len(ss)))
    ax.barh(range(len(sn)), ss, color=cs)
    ax.set_yticks(range(len(sn))); ax.set_yticklabels(sn, fontsize=10)
    ax.set_title(title, fontsize=14); ax.invert_yaxis()
    for b, s in zip(ax.patches, ss):
        ax.text(s+0.005, b.get_y()+b.get_height()/2, f"{s:.3f}", va="center", fontsize=9)
    plt.tight_layout(); plt.savefig(path, dpi=150, bbox_inches="tight"); plt.close()

def plot_sensitivity(Wa, We, labels, path):
    alphas = np.linspace(0,1,11)
    fig, ax = plt.subplots(figsize=(10,6))
    for j, lb in enumerate(labels):
        ws = [a*Wa[j]+(1-a)*We[j] for a in alphas]
        ax.plot(alphas, ws, "o-", label=lb, lw=2)
    ax.set_xlabel("alpha", fontsize=12); ax.set_ylabel("权重", fontsize=12)
    ax.set_title("权重灵敏度分析", fontsize=14); ax.legend(); ax.grid(True, alpha=0.3)
    plt.tight_layout(); plt.savefig(path, dpi=150, bbox_inches="tight"); plt.close()

def main():
    FIGURES.mkdir(exist_ok=True)

    # AHP
    ar = ahp_analysis(A); Wa = ar["weights"].real

    # EWM
    Xn = X.copy()
    for j in range(6):
        c = Xn[:,j]; r = c.max()-c.min()
        Xn[:,j] = (c-c.min())/max(r,1e-10)
    p = Xn / Xn.sum(axis=0, keepdims=True)
    p = np.where(p==0, 1e-10, p)
    H = -np.sum(p*np.log(p), axis=0) / np.log(12)
    We = (1-H) / (1-H).sum()

    # Hybrid
    Wh = 0.5*Wa + 0.5*We; Wh /= Wh.sum()

    print(f"AHP: {Wa}")
    print(f"EWM: {We}")
    print(f"H: {H}")

    # Rankings
    scores = Xn @ Wh
    si = np.argsort(-scores)
    rn = [NAMES[i] for i in si]; rs = scores[si]; re = Xn[si]

    for i in range(12):
        print(f"  {i+1}. {rn[i]} {rs[i]:.4f}")

    # 1. Weight comparison
    plot_weight_comparison(Wa, We, Wh, LABELS, str(FIGURES/"weight_comparison.png"))
    print("[x] weight comparison")

    # 2. Ranking
    plot_ranking(rn, rs, "奥运项目综合评分排名", str(FIGURES/"ranking.png"))
    print("[x] ranking")

    # 3. Radar charts (top 4)
    for i in range(4):
        plot_radar(re[i], LABELS, f"{rn[i]}六维评分", str(FIGURES/f"radar_{FNAMES[NAMES.index(rn[i])]}.png"))
        print(f"[x] radar {rn[i]}")

    # 4. Sensitivity
    plot_sensitivity(Wa, We, LABELS, str(FIGURES/"sensitivity.png"))
    print("[x] sensitivity")

if __name__ == "__main__":
    main()
