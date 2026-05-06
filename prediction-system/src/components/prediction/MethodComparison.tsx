import ReactECharts from 'echarts-for-react';
import type { Project } from '@/types';
import { rankProjects } from '@/lib/calculation';

interface MethodComparisonProps {
  projects: Project[];
  ahpWeights: Record<string, number>;
  ewmWeights: Record<string, number>;
  hybridWeights: Record<string, number>;
}

export default function MethodComparison({ projects, ahpWeights, ewmWeights, hybridWeights }: MethodComparisonProps) {
  const topN = projects.slice(0, 12);
  const data = topN.map((p) => ({
    name: p.name,
    ahp: rankProjects([p], ahpWeights)[0].score,
    ewm: rankProjects([p], ewmWeights)[0].score,
    hybrid: p.score || 0,
  }));

  const option = {
    title: {
      text: '三种方法评分对比',
      left: 'center',
      textStyle: { fontSize: 13, fontWeight: 500, fontFamily: 'Georgia, serif', color: '#141413' },
    },
    tooltip: { trigger: 'axis' as const },
    legend: {
      data: ['AHP (α=1)', 'EWM (α=0)', '混合 (α=0.5)'],
      bottom: 0,
      textStyle: { fontSize: 11, fontFamily: '-apple-system, sans-serif', color: '#5e5d59' },
    },
    color: ['#c96442', '#5e5d59', '#141413'],
    grid: { left: 50, right: 20, top: 40, bottom: 40 },
    xAxis: {
      type: 'category' as const,
      data: data.map((d) => d.name),
      axisLabel: { rotate: 35, fontSize: 10, fontFamily: '-apple-system, sans-serif', color: '#5e5d59' },
      axisLine: { lineStyle: { color: '#e8e6dc' } },
    },
    yAxis: {
      type: 'value' as const,
      max: 1,
      splitLine: { lineStyle: { color: '#f0eee6' } },
    },
    series: [
      { name: 'AHP (α=1)', type: 'bar', data: data.map((d) => d.ahp), barMaxWidth: 18 },
      { name: 'EWM (α=0)', type: 'bar', data: data.map((d) => d.ewm), barMaxWidth: 18 },
      { name: '混合 (α=0.5)', type: 'bar', data: data.map((d) => d.hybrid), barMaxWidth: 18 },
    ],
  };

  return (
    <div className="rounded-lg p-4" style={{ backgroundColor: '#faf9f5', border: '1px solid #f0eee6', boxShadow: 'rgba(0,0,0,0.03) 0px 2px 12px' }}>
      <ReactECharts option={option} style={{ height: 350 }} />
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full text-xs border-collapse font-ui">
          <thead>
            <tr>
              <th className="px-2 py-1.5 border text-left font-medium" style={{ borderColor: '#e8e6dc', backgroundColor: '#f5f4ed', color: '#5e5d59' }}>项目</th>
              <th className="px-2 py-1.5 border text-center font-medium" style={{ borderColor: '#e8e6dc', backgroundColor: '#f5f4ed', color: '#5e5d59' }}>AHP排名</th>
              <th className="px-2 py-1.5 border text-center font-medium" style={{ borderColor: '#e8e6dc', backgroundColor: '#f5f4ed', color: '#5e5d59' }}>EWM排名</th>
              <th className="px-2 py-1.5 border text-center font-medium" style={{ borderColor: '#e8e6dc', backgroundColor: '#f5f4ed', color: '#5e5d59' }}>混合排名</th>
            </tr>
          </thead>
          <tbody>
            {topN.map((p) => {
              const ahpR = rankProjects(projects, ahpWeights).find((r) => r.id === p.id);
              const ewmR = rankProjects(projects, ewmWeights).find((r) => r.id === p.id);
              return (
                <tr key={p.id}>
                  <td className="px-2 py-1.5 border font-medium" style={{ borderColor: '#e8e6dc', color: '#4d4c48' }}>{p.name}</td>
                  <td className="px-2 py-1.5 border text-center font-mono" style={{ borderColor: '#e8e6dc', color: '#4d4c48' }}>{ahpR?.rank || '-'}</td>
                  <td className="px-2 py-1.5 border text-center font-mono" style={{ borderColor: '#e8e6dc', color: '#4d4c48' }}>{ewmR?.rank || '-'}</td>
                  <td className="px-2 py-1.5 border text-center font-mono font-medium" style={{ borderColor: '#e8e6dc', color: '#c96442' }}>{p.rank || '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
