import ReactECharts from 'echarts-for-react';
import { LABELS_CN } from '@/lib/thesisData';
import type { Indicators } from '@/types';

interface RadarChartProps {
  data: { name: string; indicators: Indicators }[];
  height?: number;
}

const COLORS = ['#c96442', '#5e5d59', '#87867f', '#4d4c48', '#d97757'];

export default function RadarChart({ data, height = 350 }: RadarChartProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-lg p-6 flex items-center justify-center min-h-[300px]" style={{ backgroundColor: '#faf9f5', border: '1px solid #f0eee6' }}>
        <p className="text-sm font-ui" style={{ color: '#87867f' }}>请选择项目查看雷达图</p>
      </div>
    );
  }

  const dimKeys = ['popularity', 'gender_equity', 'sustainability', 'inclusivity', 'innovation', 'safety'];

  const option = {
    title: {
      text: data.length === 1 ? `${data[0].name} 六维评分` : '多个项目六维评分对比',
      left: 'center',
      textStyle: { fontSize: 13, fontWeight: 500, fontFamily: 'Georgia, serif', color: '#141413' },
    },
    tooltip: {},
    legend: {
      data: data.map((d) => d.name),
      bottom: 0,
      textStyle: { fontSize: 11, fontFamily: '-apple-system, sans-serif', color: '#5e5d59' },
    },
    radar: {
      indicator: LABELS_CN.map((name) => ({ name, max: 1 })),
      center: ['50%', '52%'],
      radius: '55%',
      splitArea: { areaStyle: { color: ['rgba(201,100,66,0.02)', 'rgba(201,100,66,0.04)'] } },
      axisLine: { lineStyle: { color: '#e8e6dc' } },
      splitLine: { lineStyle: { color: '#e8e6dc' } },
    },
    series: [{
      type: 'radar',
      data: data.map((d, i) => ({
        value: dimKeys.map((k) => d.indicators[k as keyof Indicators]),
        name: d.name,
        itemStyle: { color: COLORS[i % COLORS.length] },
        areaStyle: { color: COLORS[i % COLORS.length], opacity: 0.08 },
      })),
    }],
  };

  return (
    <div className="rounded-lg p-4" style={{ backgroundColor: '#faf9f5', border: '1px solid #f0eee6', boxShadow: 'rgba(0,0,0,0.03) 0px 2px 12px' }}>
      <ReactECharts option={option} style={{ height }} />
    </div>
  );
}
