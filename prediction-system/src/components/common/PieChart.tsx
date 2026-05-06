import ReactECharts from 'echarts-for-react';

interface PieChartProps {
  data: { name: string; value: number }[];
  title: string;
  height?: number;
}

const COLORS = ['#c96442', '#d97757', '#e8e6dc', '#5e5d59', '#87867f', '#4d4c48'];

export default function PieChart({ data, title, height = 280 }: PieChartProps) {
  const option = {
    title: {
      text: title,
      left: 'center',
      textStyle: { fontSize: 13, fontWeight: 500, fontFamily: 'Georgia, serif', color: '#141413' },
    },
    tooltip: {
      trigger: 'item' as const,
      formatter: (params: { name: string; value: number; percent: number }) =>
        `${params.name}: ${(params.value * 100).toFixed(1)}% (${params.value.toFixed(3)})`,
    },
    series: [{
      type: 'pie',
      radius: ['30%', '60%'],
      center: ['50%', '55%'],
      data: data.map((d, i) => ({ ...d, itemStyle: { color: COLORS[i % COLORS.length] } })),
      label: {
        formatter: (params: { name: string; percent: number }) =>
          `${params.name}\n${params.percent.toFixed(1)}%`,
        fontSize: 11,
        fontFamily: '-apple-system, sans-serif',
        color: '#5e5d59',
      },
      labelLine: { lineStyle: { color: '#e8e6dc' } },
    }],
  };

  return <ReactECharts option={option} style={{ height }} />;
}
