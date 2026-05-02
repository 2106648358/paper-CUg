"""
奥运数据验证脚本
"""
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

def validate():
    path = BASE_DIR / "data" / "unified_olympic_data.json"
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    all_pass = True
    sports = data['sports']
    dims = ['popularity', 'sustainability', 'inclusivity', 'innovation']

    print(f"验证 {len(sports)} 个运动")
    print("=" * 60)

    for s in sports:
        name = s['name']
        scores = s['scores']
        issues = []

        for d in dims:
            v = scores.get(d)
            if v is None:
                issues.append(f"缺失维度: {d}")
            elif not (0 <= v <= 1):
                issues.append(f"{d}={v} 超出[0,1]")

        ge = s.get('gender_equity')
        sf = s.get('safety')
        if ge is not None and not (0 <= ge <= 1):
            issues.append(f"gender_equity={ge} 超出[0,1]")
        if sf is not None and not (0 <= sf <= 1):
            issues.append(f"safety={sf} 超出[0,1]")

        if issues:
            print(f"  FAIL {name}: {'; '.join(issues)}")
            all_pass = False

    if all_pass:
        print(f"\n== OK: 全部 {len(sports)} 个运动验证通过")

    n_full = sum(1 for s in sports if s.get('gender_equity') is not None and s.get('safety') is not None)
    print(f"完整六维数据: {n_full}/{len(sports)} 个运动")
    return all_pass

if __name__ == '__main__':
    validate()
