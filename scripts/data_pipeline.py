"""
奥运项目数据管道
从HiMCM数据提取六维指标，合并外部数据
"""

import json
import math
import openpyxl
import numpy as np
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
HIMCM_PATH = BASE_DIR / "HiMCM_Olympic_Data.xlsx"
OUTPUT_DIR = BASE_DIR / "data"

OUTPUT_DIR.mkdir(exist_ok=True)

YEARS = [1896, 1900, 1904, 1906, 1908, 1912, 1920, 1924, 1928, 1932,
         1936, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980,
         1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028]

def safe_int(v):
    if v is None or v == '-' or v == '•':
        return 0
    try:
        return int(v)
    except (ValueError, TypeError):
        return 0

def parse_himcm():
    wb = openpyxl.load_workbook(HIMCM_PATH, data_only=True)
    ws = wb['data']

    sports = []
    for row in ws.iter_rows(min_row=2, max_row=77, values_only=True):
        sport = str(row[0]).strip() if row[0] else ''
        disc = str(row[1]).strip() if row[1] else ''
        code = str(row[2]).strip() if row[2] else ''

        if sport in ('Total events', 'Total disciplines', 'Total sports', ''):
            continue
        if sport == 'HiMCM_Olympic_Data':
            continue

        events = [safe_int(x) for x in row[4:]]
        # trim to actual historical years (exclude 2028 TBD)
        events_hist = events[:31]

        sports.append({
            'sport': sport,
            'discipline': disc,
            'code': code,
            'events': events,
            'events_hist': events_hist,
        })

    return sports

def compute_popularity(sport):
    events_hist = sport['events_hist']
    n_years = len(YEARS) - 1  # exclude 2028

    total_appearances = sum(1 for e in events_hist if e > 0)
    total_events = sum(events_hist)

    appearances_ratio = total_appearances / n_years
    events_ratio = min(total_events / max(total_appearances, 1) / 50, 1.0)

    non_zero = [e for e in events_hist if e > 0]
    if len(non_zero) >= 5:
        first_half = non_zero[:len(non_zero)//2]
        second_half = non_zero[len(non_zero)//2:]
        growth = (sum(second_half) / max(len(second_half), 1)) / max(sum(first_half) / max(len(first_half), 1), 0.01)
        growth_score = min(growth / 3, 1.0)
    else:
        growth_score = 0.3

    # recency: events in last 3 Olympics / total
    recent = sum(events_hist[-4:])  # 2012, 2016, 2020, 2024
    if total_events > 0:
        recency_score = min(recent / max(total_events, 1) * 3, 1.0)
    else:
        recency_score = 0

    score = 0.35 * appearances_ratio + 0.25 * events_ratio + 0.2 * growth_score + 0.2 * recency_score
    return round(score, 4), {
        'total_appearances': total_appearances,
        'total_events': total_events,
        'growth_score': round(growth_score, 4),
        'recency_score': round(recency_score, 4),
    }

def compute_sustainability(sport):
    events_hist = sport['events_hist']
    non_zero_vals = [e for e in events_hist if e > 0]
    n = len(events_hist)

    if len(non_zero_vals) < 2:
        return 0.5, {'continuity': 0, 'variance': 1, 'resilience': 0}

    # continuity: consecutive appearances / total possible
    runs = []
    current_run = 0
    for e in events_hist:
        if e > 0:
            current_run += 1
        else:
            if current_run > 0:
                runs.append(current_run)
            current_run = 0
    if current_run > 0:
        runs.append(current_run)

    max_run = max(runs) if runs else 0
    continuity = max_run / n

    # variance stability
    mean_ev = np.mean(non_zero_vals)
    var_ev = np.std(non_zero_vals) / max(mean_ev, 1)
    stability = max(0, 1 - min(var_ev / 2, 1))

    # resilience: was removed and returned?
    gaps = []
    for i in range(1, n):
        if events_hist[i-1] > 0 and events_hist[i] == 0:
            gap_start = i
            for j in range(i+1, n):
                if events_hist[j] > 0:
                    gaps.append(j - gap_start)
                    break
    resilience = min(len(gaps) * 0.15, 0.5)  # fewer gaps = more sustainable

    score = 0.4 * continuity + 0.35 * stability + 0.25 * (1 - resilience * 2)
    return round(score, 4), {
        'continuity': round(continuity, 4),
        'stability': round(stability, 4),
        'resilience': round(resilience, 4),
        'max_consecutive': max_run,
        'gaps': len(gaps),
    }

def compute_inclusivity(sport):
    events_hist = sport['events_hist']
    events_all = sport['events']

    total_appearances = sum(1 for e in events_hist if e > 0)
    appearances_ratio = total_appearances / (len(YEARS) - 1)

    # number of disciplines (inferred from event variety)
    max_events = max(events_hist) if events_hist else 0
    event_breadth = min(max_events / 20, 1.0)

    # cross-era: how many different eras covered
    eras = [
        (1896, 1920), (1924, 1952), (1956, 1984), (1988, 2024)
    ]
    era_count = 0
    for start, end in eras:
        for i, y in enumerate(YEARS[:-1]):
            if start <= y <= end and events_hist[i] > 0:
                era_count += 1
                break
    era_score = era_count / 4

    # future: already included for 2028 (row[31])
    future_included = 1 if len(events_all) > 31 and events_all[31] > 0 else 0

    score = 0.3 * appearances_ratio + 0.25 * event_breadth + 0.3 * era_score + 0.15 * future_included
    return round(score, 4), {
        'appearances_ratio': round(appearances_ratio, 4),
        'event_breadth': round(event_breadth, 4),
        'era_score': round(era_score, 4),
        'future_included': future_included,
    }

def compute_innovation(sport):
    events_hist = sport['events_hist']

    first_year = None
    for i, e in enumerate(events_hist):
        if e > 0:
            first_year = YEARS[i]
            break

    if first_year is None:
        return 0.5, {'first_year': None, 'recent_change': 0}

    # how recent is the first appearance?
    years_since_first = 2024 - first_year
    recency = max(0, 1 - years_since_first / 130)

    # recent change: events added in last 4 Olympics
    recent_old = sum(events_hist[-8:-4]) if len(events_hist) >= 8 else 0
    recent_new = sum(events_hist[-4:])
    if recent_old > 0:
        change_rate = (recent_new - recent_old) / recent_old
    else:
        change_rate = 1 if recent_new > 0 else 0
    change_score = max(0, min(change_rate, 1))

    score = 0.5 * recency + 0.5 * change_score
    return round(score, 4), {
        'first_year': first_year,
        'recency': round(recency, 4),
        'change_rate': round(change_rate, 4),
    }

def load_existing_12_sports():
    """Load from bak/ the existing 12-sport dataset with gender + safety"""
    bak_path = BASE_DIR / "bak" / "paper_workbench_hym" / "thesis-workspace" / "thesis" / "data" / "olympic_projects_data_final.json"
    if not bak_path.exists():
        print(f"Warning: {bak_path} not found")
        return {}
    with open(bak_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    result = {}
    for proj in data.get('projects', []):
        name = proj.get('name_en', proj.get('name', ''))
        indicators = proj.get('indicators', {})
        result[name.lower()] = {
            'gender_equity': indicators.get('gender_equity', {}).get('score', 0.5),
            'safety': indicators.get('safety', {}).get('score', 0.5),
            'popularity': indicators.get('popularity', {}).get('score', 0.5),
            'sustainability': indicators.get('sustainability', {}).get('score', 0.5),
            'inclusivity': indicators.get('inclusivity', {}).get('score', 0.5),
            'innovation': indicators.get('innovation', {}).get('score', 0.5),
            'status': proj.get('status', ''),
        }
    return result

def load_frontend_core_data():
    """Load 37 sports from frontend static data"""
    bak_dir = BASE_DIR / "bak" / "paper_workbench_hym" / "olympic-evaluation-system" / "public" / "data" / "projects"
    result = {}
    for cat_file in ['core.json', 'new.json', 'candidate.json', 'removed.json']:
        path = bak_dir / cat_file
        if not path.exists():
            continue
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        for proj in data.get('projects', []):
            eng = proj.get('nameEn', proj.get('name', ''))
            indicators = proj.get('indicators', {})
            result[eng.lower()] = {
                'name': proj.get('name', ''),
                'name_en': eng,
                'indicators': indicators,
                'category': data.get('category', ''),
            }
    return result

def name_matches(himcm_name, ref_name):
    """Match HiMCM names to reference names"""
    mapping = {
        'athletics': 'athletics',
        'swimming': 'swimming',
        'gymnastics': 'gymnastics',
        'basketball': 'basketball',
        'football': 'football',
        'sport climbing': 'sport_climbing',
        'surfing': 'surfing',
        'skateboarding': 'skateboarding',
        'breaking': 'breaking',
        'karate': 'karate',
        'baseball and softball': 'baseball_softball',
        'archery': 'archery',
        'badminton': 'badminton',
        'boxing': 'boxing',
        'canoeing': 'canoe',
        'cycling': 'cycling',
        'equestrian': 'equestrian',
        'fencing': 'fencing',
        'field hockey': 'hockey',
        'golf': 'golf',
        'handball': 'handball',
        'judo': 'judo',
        'rowing': 'rowing',
        'rugby': 'rugby',
        'sailing': 'sailing',
        'shooting': 'shooting',
        'table tennis': 'table_tennis',
        'taekwondo': 'taekwondo',
        'tennis': 'tennis',
        'triathlon': 'triathlon',
        'volleyball': 'volleyball',
        'weightlifting': 'weightlifting',
        'wrestling': 'wrestling',
    }
    key = himcm_name.lower().strip()
    if key in mapping:
        return mapping[key]
    return None

def main():
    print("=" * 60)
    print("奥运项目数据管道")
    print("=" * 60)

    sports = parse_himcm()
    print(f"\n解析到 {len(sports)} 个运动/小项")

    existing_12 = load_existing_12_sports()
    print(f"加载了 {len(existing_12)} 个已有运动数据（含性别平等和安全性）")

    frontend_data = load_frontend_core_data()
    print(f"加载了 {len(frontend_data)} 个前端运动数据")

    # compute 4 dimensions for each sport-level entry (discipline == '')
    sport_level = {}
    for s in sports:
        if s['discipline']:
            continue
        name = s['sport']
        if name not in sport_level:
            sport_level[name] = s

    results = []
    for name, s in sport_level.items():
        pop, pop_detail = compute_popularity(s)
        sus, sus_detail = compute_sustainability(s)
        inc, inc_detail = compute_inclusivity(s)
        inn, inn_detail = compute_innovation(s)

        entry = {
            'name': name,
            'code': s['code'],
            'scores': {
                'popularity': pop,
                'sustainability': sus,
                'inclusivity': inc,
                'innovation': inn,
            },
            'details': {
                'popularity': pop_detail,
                'sustainability': sus_detail,
                'inclusivity': inc_detail,
                'innovation': inn_detail,
            }
        }

        # try to match with existing 12-sport data for gender + safety
        matched = name_matches(name, '')
        if matched is not None:
            eng_key = matched.replace('_', ' ').lower()
            for ek in existing_12:
                if ek.startswith(eng_key) or eng_key.startswith(ek):
                    entry['gender_equity'] = existing_12[ek]['gender_equity']
                    entry['safety'] = existing_12[ek]['safety']
                    entry['status'] = existing_12[ek].get('status', '')
                    break

            # also check frontend data
            for fe_key, fe_val in frontend_data.items():
                fe_normalized = fe_key.lower().strip()
                eng_normalized = matched.lower().strip()
                if fe_normalized == eng_normalized or fe_normalized.startswith(eng_normalized):
                    if 'gender_equity' not in entry and 'indicators' in fe_val:
                        ind = fe_val['indicators']
                        entry['gender_equity'] = ind.get('gender_equity', 0.5)
                        entry['safety'] = ind.get('safety', 0.5)
                    if 'category' not in entry:
                        entry['status'] = fe_val.get('category', '')
                    break

        if 'gender_equity' not in entry:
            entry['gender_equity'] = None
            entry['safety'] = None

        results.append(entry)

    # sort by popularity
    results.sort(key=lambda x: x['scores']['popularity'], reverse=True)

    # save full dataset
    output = {
        'metadata': {
            'version': '3.0',
            'source': 'HiMCM_Olympic_Data.xlsx',
            'sports_count': len(results),
            'dimensions': ['popularity', 'sustainability', 'inclusivity', 'innovation'],
            'external_dimensions': ['gender_equity', 'safety'],
            'external_data_note': 'gender_equity and safety only available for matched sports from IOC reports and academic literature',
        },
        'sports': results,
    }

    output_path = OUTPUT_DIR / 'unified_olympic_data.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"\n已保存统一数据到 {output_path}")

    full_gender_safety = sum(1 for r in results if r['gender_equity'] is not None)
    print(f"其中 {full_gender_safety}/{len(results)} 个运动有完整的性别平等和安全数据")

    # print top 15
    print(f"\n{'排名':>4} {'运动':20s} {'流行度':>8} {'可持续':>8} {'包容性':>8} {'创新性':>8} {'性别平等':>8} {'安全':>8}")
    print('-' * 70)
    for i, r in enumerate(results[:15]):
        s = r['scores']
        ge = f"{r['gender_equity']:.2f}" if r['gender_equity'] else 'N/A'
        sf = f"{r['safety']:.2f}" if r['safety'] else 'N/A'
        print(f"{i+1:>4} {r['name']:20s} {s['popularity']:>8.4f} {s['sustainability']:>8.4f} {s['inclusivity']:>8.4f} {s['innovation']:>8.4f} {ge:>8} {sf:>8}")

if __name__ == '__main__':
    main()
