import type { Project } from '@/types';
import { CATEGORY_LABELS } from '@/lib/thesisData';

interface RankingTableProps {
  projects: Project[];
  selectedIds: string[];
  onSelect: (id: string) => void;
}

const catBg: Record<string, string> = {
  core: 'rgba(201,100,66,0.08)',
  new: 'rgba(201,100,66,0.08)',
  candidate: 'rgba(201,100,66,0.08)',
  removed: 'rgba(181,51,51,0.08)',
};

const catText: Record<string, string> = {
  core: '#c96442',
  new: '#c96442',
  candidate: '#c96442',
  removed: '#b53333',
};

function probColor(p: number): string {
  if (p >= 0.7) return '#c96442';
  if (p >= 0.4) return '#5e5d59';
  return '#b53333';
}

export default function RankingTable({ projects, selectedIds, onSelect }: RankingTableProps) {
  return (
    <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#faf9f5', border: '1px solid #f0eee6', boxShadow: 'rgba(0,0,0,0.03) 0px 2px 12px' }}>
      <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: '#f0eee6' }}>
        <h3 className="text-sm font-medium" style={{ fontFamily: 'Georgia, serif', color: '#141413' }}>项目排名</h3>
        <span className="text-xs font-ui" style={{ color: '#87867f' }}>{projects.length} 个项目</span>
      </div>
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="min-w-full text-xs font-ui">
          <thead className="sticky top-0" style={{ backgroundColor: '#f5f4ed' }}>
            <tr>
              <th className="px-2 py-2 text-left w-8"></th>
              <th className="px-2 py-2 text-left font-medium" style={{ color: '#5e5d59' }}>#</th>
              <th className="px-2 py-2 text-left font-medium" style={{ color: '#5e5d59' }}>项目</th>
              <th className="px-2 py-2 text-left font-medium" style={{ color: '#5e5d59' }}>分类</th>
              <th className="px-2 py-2 text-right font-medium" style={{ color: '#5e5d59' }}>评分</th>
              <th className="px-2 py-2 text-right font-medium" style={{ color: '#5e5d59' }}>概率</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: '#f0eee6' }}>
            {projects.map((p) => {
              const prob = p.probability || 0;
              const sel = selectedIds.includes(p.id);
              return (
                <tr
                  key={p.id}
                  onClick={() => onSelect(p.id)}
                  className="cursor-pointer transition-colors"
                  style={{
                    backgroundColor: sel ? 'rgba(201,100,66,0.04)' : 'transparent',
                  }}
                >
                  <td className="px-2 py-2">
                    <input
                      type="checkbox"
                      checked={sel}
                      onChange={() => onSelect(p.id)}
                      style={{ accentColor: '#c96442' }}
                      className="w-3 h-3"
                    />
                  </td>
                  <td className="px-2 py-2 font-medium" style={{ color: '#4d4c48' }}>{p.rank}</td>
                  <td className="px-2 py-2" style={{ color: '#141413' }}>{p.name}</td>
                  <td className="px-2 py-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium" style={{
                      backgroundColor: catBg[p.category] || 'rgba(201,100,66,0.08)',
                      color: catText[p.category] || '#c96442',
                    }}>
                      {CATEGORY_LABELS[p.category] || p.category}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-right font-mono" style={{ color: '#4d4c48' }}>{p.score?.toFixed(3)}</td>
                  <td className="px-2 py-2 text-right font-mono font-medium" style={{ color: probColor(prob) }}>
                    {(prob * 100).toFixed(0)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
