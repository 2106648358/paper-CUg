import ReactECharts from 'echarts-for-react';

interface BarChartProps {
  data: { name: string; values: number[]; stack?: string }[];
  categories: string[];
  title: string;
  height?: number;
  colors?: string[];
  yAxisName?: string;
}

const DEFAULT_COLORS = ['#c96442', '#d97757', '#5e5d59', '#87867f', '#4d4c48'];

export default function BarChart({ data, categories, title, height = 350, colors = DEFAULT_COLORS, yAxisName }: BarChartProps) {
  const series = data.map((d, i) => ({
    name: d.name,
    type: 'bar' as const,
    data: d.values,
    stack: d.stack,
    itemStyle: { color: colors[i % colors.length] },
    barMaxWidth: d.stack ? 25 : 35,
  }));

  const option = {
    title: {
      text: title,
      left: 'center',
      textStyle: { fontSize: 13, fontWeight: 500, fontFamily: 'Georgia, serif', color: '#141413' },
    },
    tooltip: { trigger: 'axis' as const },
    legend: {
      bottom: 0,
      textStyle: { fontSize: 11, fontFamily: '-apple-system, sans-serif', color: '#5e5d59' },
    },
    grid: { left: 50, right: 20, top: 40, bottom: 40 },
    xAxis: {
      type: 'category' as const,
      data: categories,
      axisLabel: { rotate: 30, fontSize: 10, fontFamily: '-apple-system, sans-serif', color: '#5e5d59' },
      axisLine: { lineStyle: { color: '#e8e6dc' } },
    },
    yAxis: {
      type: 'value' as const,
      name: yAxisName,
      nameTextStyle: { fontSize: 10, fontFamily: '-apple-system, sans-serif', color: '#87867f' },
      splitLine: { lineStyle: { color: '#f0eee6' } },
    },
    series,
  };

  return <ReactECharts option={option} style={{ height }} />;
}
