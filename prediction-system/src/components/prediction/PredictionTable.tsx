import type { Project } from '@/types';
import { CATEGORY_LABELS } from '@/lib/thesisData';

interface PredictionTableProps {
  projects: Project[];
}

const catBg: Record<string, string> = {
  core: 'rgba(201,100,66,0.08)',
  new: 'rgba(201,100,66,0.08)',
  candidate: 'rgba(201,100,66,0.08)',
  removed: 'rgba(181,51,51,0.08)',
};
const catText: Record<string, string> = {
  core: '#c96442', new: '#c96442', candidate: '#c96442', removed: '#b53333',
};

export default function PredictionTable({ projects }: PredictionTableProps) {
  const sorted = [...projects].sort((a, b) => (b.probability || 0) - (a.probability || 0));

  const probColor = (p: number) => {
    if (p >= 0.7) return '#c96442';
    if (p >= 0.4) return '#5e5d59';
    return '#b53333';
  };

  return (
    <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#faf9f5', border: '1px solid #f0eee6', boxShadow: 'rgba(0,0,0,0.03) 0px 2px 12px' }}>
      <div className="px-4 py-3 border-b" style={{ borderColor: '#f0eee6' }}>
        <h3 className="text-sm font-medium" style={{ fontFamily: 'Georgia, serif', color: '#141413' }}>2032 年奥运项目预测结果</h3>
      </div>
      <div className="overflow-x-auto max-h-[480px] overflow-y-auto">
        <table className="min-w-full text-xs font-ui">
          <thead className="sticky top-0" style={{ backgroundColor: '#f5f4ed' }}>
            <tr>
              <th className="px-3 py-2 text-left font-medium" style={{ color: '#5e5d59' }}>#</th>
              <th className="px-3 py-2 text-left font-medium" style={{ color: '#5e5d59' }}>项目</th>
              <th className="px-3 py-2 text-left font-medium" style={{ color: '#5e5d59' }}>分类</th>
              <th className="px-3 py-2 text-right font-medium" style={{ color: '#5e5d59' }}>评分</th>
              <th className="px-3 py-2 text-right font-medium" style={{ color: '#5e5d59' }}>概率</th>
              <th className="px-3 py-2 text-right font-medium" style={{ color: '#5e5d59' }}>流行度</th>
              <th className="px-3 py-2 text-right font-medium" style={{ color: '#5e5d59' }}>性别平等</th>
              <th className="px-3 py-2 text-right font-medium" style={{ color: '#5e5d59' }}>可持续</th>
              <th className="px-3 py-2 text-right font-medium" style={{ color: '#5e5d59' }}>包容性</th>
              <th className="px-3 py-2 text-right font-medium" style={{ color: '#5e5d59' }}>创新性</th>
              <th className="px-3 py-2 text-right font-medium" style={{ color: '#5e5d59' }}>安全性</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: '#f0eee6' }}>
            {sorted.map((p) => {
              const prob = p.probability || 0;
              return (
                <tr key={p.id} className="hover:bg-[rgba(201,100,66,0.02)]">
                  <td className="px-3 py-2 font-medium" style={{ color: '#4d4c48' }}>{p.rank}</td>
                  <td className="px-3 py-2 font-medium" style={{ color: '#141413' }}>{p.name}</td>
                  <td className="px-3 py-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium" style={{
                      backgroundColor: catBg[p.category] || 'rgba(201,100,66,0.08)',
                      color: catText[p.category] || '#c96442',
                    }}>
                      {CATEGORY_LABELS[p.category] || p.category}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right font-mono font-medium" style={{ color: probColor(prob) }}>{p.score?.toFixed(3) || '-'}</td>
                  <td className="px-3 py-2 text-right font-mono font-medium" style={{ color: probColor(prob) }}>{(prob * 100).toFixed(0)}%</td>
                  <td className="px-3 py-2 text-right font-mono" style={{ color: '#4d4c48' }}>{p.indicators.popularity.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right font-mono" style={{ color: '#4d4c48' }}>{p.indicators.gender_equity.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right font-mono" style={{ color: '#4d4c48' }}>{p.indicators.sustainability.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right font-mono" style={{ color: '#4d4c48' }}>{p.indicators.inclusivity.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right font-mono" style={{ color: '#4d4c48' }}>{p.indicators.innovation.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right font-mono" style={{ color: '#4d4c48' }}>{p.indicators.safety.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
