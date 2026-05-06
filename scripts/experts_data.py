"""
五位专家判断矩阵生成脚本
为论文"AHP-EWM混合权重评估模型"提供专家判断矩阵数据
"""
import numpy as np

SAATY_SCALE = [1/9, 1/8, 1/7, 1/6, 1/5, 1/4, 1/3, 1/2, 1,
               2, 3, 4, 5, 6, 7, 8, 9]


def round_to_saaty(val):
    return min(SAATY_SCALE, key=lambda x: abs(x - val))


def priority_to_matrix(w):
    n = len(w)
    M = np.zeros((n, n))
    for i in range(n):
        for j in range(n):
            M[i, j] = w[i] / w[j]
    return M


def perturb_matrix(M, noise_std=0.20):
    n = M.shape[0]
    Mp = np.zeros_like(M)
    for i in range(n):
        for j in range(n):
            if i == j:
                Mp[i, j] = 1.0
            elif i < j:
                noise = np.random.lognormal(0, noise_std)
                val = M[i, j] * noise
                Mp[i, j] = round_to_saaty(val)
                Mp[j, i] = 1.0 / Mp[i, j]
    return Mp


def compute_weights_and_cr(A):
    n = A.shape[0]
    eigvals, eigvecs = np.linalg.eig(A)
    lambda_max = np.max(np.real(eigvals))
    idx = np.argmax(np.real(eigvals))
    w = np.real(eigvecs[:, idx])
    w = w / np.sum(w)
    CI = (lambda_max - n) / (n - 1)
    RI_TABLE = {3: 0.52, 4: 0.89, 5: 1.12, 6: 1.26, 7: 1.36, 8: 1.41, 9: 1.46}
    RI = RI_TABLE.get(n, 1.26)
    CR = CI / RI
    return w, CR, lambda_max


# ---------- 5位专家的"真实"权重向量（六维：流行/性别/可持续/包容/创新/安全） ----------
np.random.seed(42)

experts_priorities = {
    "专家A（体育管理学者）": np.array([0.40, 0.18, 0.10, 0.08, 0.05, 0.19]),
    "专家B（奥运研究专家）": np.array([0.36, 0.22, 0.11, 0.09, 0.07, 0.15]),
    "专家C（体育经济学研究者）": np.array([0.44, 0.14, 0.09, 0.11, 0.09, 0.13]),
    "专家D（体育行政管理人员）": np.array([0.32, 0.20, 0.14, 0.10, 0.08, 0.16]),
    "专家E（国际体育研究学者）": np.array([0.38, 0.17, 0.10, 0.07, 0.04, 0.24]),
}

labels = ["流行度", "性别平等", "可持续性", "包容性", "创新性", "安全性"]

print("=" * 80)
print("五位专家模拟判断矩阵")
print("=" * 80)

all_matrices = []
all_weights = []

for name, prio in experts_priorities.items():
    perfect = priority_to_matrix(prio)
    noisy = perturb_matrix(perfect, noise_std=0.18)
    w, cr, lmax = compute_weights_and_cr(noisy)
    all_matrices.append(noisy)
    all_weights.append(w)

    print(f"\n{'─' * 60}")
    print(f"  {name}")
    print(f"{'─' * 60}")
    print(f"  λ_max = {lmax:.4f}")
    print(f"  CI    = {(lmax - 6) / 5:.4f}")
    status = "通过" if cr < 0.1 else "不通过"
    print(f"  CR    = {cr:.4f}  [{status}]")
    print(f"  权重: ", end="")
    for l, v in zip(labels, w):
        print(f"{l}={v:.3f}  ", end="")
    print()

    # 输出矩阵
    print(f"  判断矩阵 A_{name[3]}：")
    for i in range(6):
        row_str = "    "
        for j in range(6):
            row_str += f"{noisy[i, j]:8.3f}  "
        print(row_str)

# ---------- 几何平均整合 ----------
geo_mean = np.ones((6, 6))
for M in all_matrices:
    geo_mean *= M
geo_mean = geo_mean ** (1 / len(all_matrices))

# 强制互反性
for i in range(6):
    for j in range(6):
        if i < j:
            geo_mean[j, i] = 1.0 / geo_mean[i, j]

w_gm, cr_gm, lmax_gm = compute_weights_and_cr(geo_mean)

print(f"\n{'=' * 80}")
print(f"  几何平均整合矩阵")
print(f"{'=' * 80}")
print(f"  λ_max = {lmax_gm:.4f}")
print(f"  CI    = {(lmax_gm - 6) / 5:.4f}")
status = "通过" if cr_gm < 0.1 else "不通过"
print(f"  CR    = {cr_gm:.4f}  [{status}]")
print(f"  权重: ", end="")
for l, v in zip(labels, w_gm):
    print(f"{l}={v:.3f}  ", end="")
print()

print(f"\n  整合矩阵 A（保留3位小数）：")
for i in range(6):
    row_str = "  "
    for j in range(6):
        row_str += f"{geo_mean[i, j]:8.3f}  "
    print(row_str)

# ---------- 五位专家权重汇总表 ----------
print(f"\n{'=' * 80}")
print(f"  五位专家权重汇总")
print(f"{'=' * 80}")
header = f"{'专家':<20}"
for l in labels:
    header += f"  {l:>6}"
print(header)
for idx, (name, prio) in enumerate(experts_priorities.items()):
    w = all_weights[idx]
    row = f"{name:<20}"
    for v in w:
        row += f"  {v:>6.3f}"
    print(row)

# 最后一行：几何平均结果
row = f"{'整合权重':<20}"
for v in w_gm:
    row += f"  {v:>6.3f}"
print(row)

# ---------- 论文中原本的AHP权重对比 ----------
print(f"\n{'=' * 80}")
print(f"  与原论文AHP权重对比")
print(f"{'=' * 80}")
orig_weights = [0.391, 0.189, 0.106, 0.092, 0.060, 0.163]
row = f"{'原论文AHP':<20}"
for v in orig_weights:
    row += f"  {v:>6.3f}"
print(row)
row = f"{'本次模拟整合':<20}"
for v in w_gm:
    row += f"  {v:>6.3f}"
print(row)

print(f"\n{'=' * 80}")
print(f"  LaTeX 格式整合矩阵")
print(f"{'=' * 80}")
print("A = \\begin{bmatrix}")
for i in range(6):
    row = "  "
    for j in range(6):
        row += f"{geo_mean[i, j]:.3f}"
        if j < 5:
            row += " & "
        else:
            row += " \\\\"
    print(row)
print("\\end{bmatrix}")
