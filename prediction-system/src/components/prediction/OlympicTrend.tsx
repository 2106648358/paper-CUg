import ReactECharts from 'echarts-for-react';
import { OLYMPIC_SIZE_HISTORY } from '@/lib/thesisData';

export default function OlympicTrend() {
  const option = {
    title: {
      text: '奥运项目规模历史演变趋势',
      left: 'center',
      textStyle: { fontSize: 13, fontWeight: 500, fontFamily: 'Georgia, serif', color: '#141413' },
    },
    tooltip: {
      trigger: 'axis' as const,
      formatter: (params: { axisValueLabel?: string; seriesName?: string; value?: number }[]) => {
        let html = `<strong>${params[0]?.axisValueLabel || ''}</strong><br/>`;
        params.forEach((p: { seriesName?: string; value?: number }) => {
          html += `${p.seriesName}: ${p.value}<br/>`;
        });
        return html;
      },
    },
    legend: {
      data: ['设项数', '大项数'],
      bottom: 0,
      textStyle: { fontSize: 11, fontFamily: '-apple-system, sans-serif', color: '#5e5d59' },
    },
    color: ['#c96442', '#5e5d59'],
    grid: { left: 50, right: 20, top: 40, bottom: 35 },
    xAxis: {
      type: 'category' as const,
      data: OLYMPIC_SIZE_HISTORY.map((d) => d.year.toString()),
      axisLabel: { rotate: 45, fontSize: 9, interval: 2, fontFamily: '-apple-system, sans-serif', color: '#5e5d59' },
      axisLine: { lineStyle: { color: '#e8e6dc' } },
    },
    yAxis: [
      {
        type: 'value' as const,
        name: '设项数',
        nameTextStyle: { fontSize: 10, fontFamily: '-apple-system, sans-serif', color: '#87867f' },
        splitLine: { lineStyle: { color: '#f0eee6' } },
      },
      {
        type: 'value' as const,
        name: '大项数',
        nameTextStyle: { fontSize: 10, fontFamily: '-apple-system, sans-serif', color: '#87867f' },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: '设项数',
        type: 'line',
        data: OLYMPIC_SIZE_HISTORY.map((d) => d.events),
        lineStyle: { width: 2 },
        areaStyle: { color: 'rgba(201,100,66,0.08)' },
        smooth: true,
        symbolSize: 4,
      },
      {
        name: '大项数',
        type: 'line',
        yAxisIndex: 1,
        data: OLYMPIC_SIZE_HISTORY.map((d) => d.sports),
        lineStyle: { width: 2 },
        smooth: true,
        symbolSize: 4,
      },
    ],
  };

  return (
    <div className="rounded-lg p-4" style={{ backgroundColor: '#faf9f5', border: '1px solid #f0eee6', boxShadow: 'rgba(0,0,0,0.03) 0px 2px 12px' }}>
      <ReactECharts option={option} style={{ height: 320 }} />
    </div>
  );
}
