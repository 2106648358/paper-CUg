import ReactECharts from 'echarts-for-react';
import type { Project } from '@/types';
import { LABELS_CN } from '@/lib/thesisData';
import { getBreakdown } from '@/lib/calculation';

interface ScoreBreakdownProps {
  projects: Project[];
  weights: Record<string, number>;
}

const DIM_KEYS = ['popularity', 'gender_equity', 'sustainability', 'inclusivity', 'innovation', 'safety'];
const COLORS = ['#c96442', '#d97757', '#e8e6dc', '#5e5d59', '#87867f', '#4d4c48'];

export default function ScoreBreakdown({ projects, weights }: ScoreBreakdownProps) {
  const topN = projects.slice(0, 12);
  const breakdowns = topN.map((p) => ({
    name: p.name,
    breakdown: getBreakdown(p.indicators, weights),
    score: p.score || 0,
  }));

  const option = {
    color: COLORS,
    title: {
      text: '项目综合评分结构分解',
      left: 'center',
      textStyle: { fontSize: 13, fontWeight: 500, fontFamily: 'Georgia, serif', color: '#141413' },
    },
    tooltip: {
      trigger: 'axis' as const,
      formatter: (params: { axisValueLabel?: string; seriesName?: string; value?: number }[]) => {
        const name = params[0]?.axisValueLabel || '';
        let html = `<strong>${name}</strong><br/>`;
        params.forEach((p: { seriesName?: string; value?: number }) => {
          html += `${p.seriesName}: ${(p.value || 0).toFixed(3)}<br/>`;
        });
        return html;
      },
    },
    legend: {
      data: LABELS_CN,
      bottom: 0,
      textStyle: { fontSize: 11, fontFamily: '-apple-system, sans-serif', color: '#5e5d59' },
    },
    grid: { left: 60, right: 20, top: 40, bottom: 50 },
    xAxis: {
      type: 'category' as const,
      data: breakdowns.map((b) => b.name),
      axisLabel: { rotate: 35, fontSize: 10, fontFamily: '-apple-system, sans-serif', color: '#5e5d59' },
      axisLine: { lineStyle: { color: '#e8e6dc' } },
    },
    yAxis: {
      type: 'value' as const,
      name: '评分贡献',
      max: 1,
      nameTextStyle: { fontSize: 10, fontFamily: '-apple-system, sans-serif', color: '#87867f' },
      splitLine: { lineStyle: { color: '#f0eee6' } },
    },
    series: DIM_KEYS.map((key, i) => ({
      name: LABELS_CN[i],
      type: 'bar' as const,
      stack: 'total',
      data: breakdowns.map((b) => b.breakdown[key]),
      itemStyle: { color: COLORS[i] },
      barMaxWidth: 28,
    })),
  };

  return (
    <div className="rounded-lg p-4" style={{ backgroundColor: '#faf9f5', border: '1px solid #f0eee6', boxShadow: 'rgba(0,0,0,0.03) 0px 2px 12px' }}>
      <ReactECharts option={option} style={{ height: 380 }} />
    </div>
  );
}
