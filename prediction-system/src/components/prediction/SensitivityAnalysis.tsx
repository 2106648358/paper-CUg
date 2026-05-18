import ReactECharts from 'echarts-for-react';
import type { Project } from '@/types';
import { sensitivityAnalysis } from '@/lib/calculation';

interface SensitivityAnalysisProps {
  projects: Project[];
  ahpWeights: Record<string, number>;
  ewmWeights: Record<string, number>;
  topN?: number;
}

const COLORS = ['#c96442', '#d97757', '#5e5d59', '#87867f', '#4d4c48', '#e8e6dc', '#141413', '#3d3d3a', '#b53333', '#c96442'];

export default function SensitivityAnalysis({ projects, ahpWeights, ewmWeights, topN = 10 }: SensitivityAnalysisProps) {
  const results = sensitivityAnalysis(projects.slice(0, 15), ahpWeights, ewmWeights, 10);
  const topProjects = projects.slice(0, topN);

  const series = topProjects.map((p, i) => ({
    name: p.name,
    type: 'line' as const,
    data: results.map((r) => {
      const found = r.rankings.find((rk) => rk.id === p.id);
      return found ? found.rank : 0;
    }),
    smooth: true,
    lineStyle: { width: 2 },
    itemStyle: { color: COLORS[i % COLORS.length] },
    symbolSize: 4,
  }));

  const option = {
    title: {
      text: `不同 α 取值下项目排名变化 (Top ${topN})`,
      left: 'center',
      textStyle: { fontSize: 13, fontWeight: 500, fontFamily: 'Georgia, serif', color: '#141413' },
    },
    tooltip: {
      trigger: 'axis' as const,
      formatter: (params: { seriesName: string; value: number; axisValueLabel: string }[]) => {
        let html = `<strong>α = ${params[0]?.axisValueLabel}</strong><br/>`;
        params.forEach((p) => { html += `${p.seriesName}: 第${p.value}名<br/>`; });
        return html;
      },
    },
    legend: {
      data: topProjects.map((p) => p.name),
      bottom: 0,
      textStyle: { fontSize: 10, fontFamily: '-apple-system, sans-serif', color: '#5e5d59' },
      itemWidth: 12,
      itemHeight: 8,
    },
    grid: { left: 45, right: 20, top: 40, bottom: 55 },
    xAxis: {
      type: 'category' as const,
      data: results.map((r) => r.alpha.toFixed(1)),
      axisLabel: { fontSize: 10, fontFamily: '-apple-system, sans-serif', color: '#5e5d59' },
      axisLine: { lineStyle: { color: '#e8e6dc' } },
    },
    yAxis: {
      type: 'value' as const,
      inverse: true,
      min: 1,
      max: projects.length,
      name: '排名',
      nameTextStyle: { fontSize: 10, fontFamily: '-apple-system, sans-serif', color: '#87867f' },
      splitLine: { lineStyle: { color: '#f0eee6' } },
    },
    series,
  };

  return (
    <div className="rounded-lg p-4" style={{ backgroundColor: '#faf9f5', border: '1px solid #f0eee6', boxShadow: 'rgba(0,0,0,0.03) 0px 2px 12px' }}>
      <ReactECharts option={option} style={{ height: 400 }} />
      <p className="text-xs font-ui text-center mt-3" style={{ color: '#87867f' }}>
        α∈[0.4,0.6] 范围内前5名排名波动较小
      </p>
    </div>
  );
}
