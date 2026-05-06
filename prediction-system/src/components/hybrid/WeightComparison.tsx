import ReactECharts from 'echarts-for-react';
import { LABELS_CN } from '@/lib/thesisData';

interface WeightComparisonProps {
  ahpWeights: Record<string, number>;
  ewmWeights: Record<string, number>;
  hybridWeights: Record<string, number>;
}

const DIM_KEYS = ['popularity', 'gender_equity', 'sustainability', 'inclusivity', 'innovation', 'safety'];

export default function WeightComparison({ ahpWeights, ewmWeights, hybridWeights }: WeightComparisonProps) {
  const option = {
    title: {
      text: 'AHP vs EWM vs 混合权重对比',
      left: 'center',
      textStyle: { fontSize: 13, fontWeight: 500, fontFamily: 'Georgia, serif', color: '#141413' },
    },
    tooltip: { trigger: 'axis' as const },
    legend: {
      data: ['AHP 主观权重', 'EWM 客观权重', '混合权重'],
      bottom: 0,
      textStyle: { fontSize: 11, fontFamily: '-apple-system, sans-serif', color: '#5e5d59' },
    },
    color: ['#c96442', '#87867f', '#141413'],
    grid: { left: 50, right: 20, top: 40, bottom: 40 },
    xAxis: {
      type: 'category' as const,
      data: LABELS_CN,
      axisLabel: { fontFamily: '-apple-system, sans-serif', color: '#5e5d59' },
      axisLine: { lineStyle: { color: '#e8e6dc' } },
    },
    yAxis: {
      type: 'value' as const,
      name: '权重',
      max: 0.45,
      axisLabel: { formatter: (v: number) => `${(v * 100).toFixed(0)}%`, fontFamily: '-apple-system, sans-serif', color: '#87867f' },
      splitLine: { lineStyle: { color: '#f0eee6' } },
    },
    series: [
      { name: 'AHP 主观权重', type: 'bar', data: DIM_KEYS.map((k) => ahpWeights[k]), barMaxWidth: 20 },
      { name: 'EWM 客观权重', type: 'bar', data: DIM_KEYS.map((k) => ewmWeights[k]), barMaxWidth: 20 },
      { name: '混合权重', type: 'bar', data: DIM_KEYS.map((k) => hybridWeights[k]), barMaxWidth: 20 },
    ],
  };

  return (
    <div className="rounded-lg p-4" style={{ backgroundColor: '#faf9f5', border: '1px solid #f0eee6', boxShadow: 'rgba(0,0,0,0.03) 0px 2px 12px' }}>
      <ReactECharts option={option} style={{ height: 320 }} />
    </div>
  );
}
