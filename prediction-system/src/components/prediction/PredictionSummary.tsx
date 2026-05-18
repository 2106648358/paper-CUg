import type { Project } from '@/types';
import { THRESHOLDS, CATEGORY_LABELS } from '@/lib/thesisData';

interface PredictionSummaryProps {
  projects: Project[];
}

export default function PredictionSummary({ projects }: PredictionSummaryProps) {
  const high = projects.filter((p) => (p.probability || 0) >= THRESHOLDS.high);
  const medium = projects.filter((p) => {
    const prob = p.probability || 0;
    return prob >= THRESHOLDS.medium && prob < THRESHOLDS.high;
  });
  const low = projects.filter((p) => (p.probability || 0) < THRESHOLDS.medium);

  const catCounts: Record<string, number> = {};
  projects.forEach((p) => {
    catCounts[p.category] = (catCounts[p.category] || 0) + 1;
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: '评分较高', count: high.length, threshold: `≥${THRESHOLDS.high * 100}%`, items: high, border: '#c96442', bg: 'rgba(201,100,66,0.06)', countColor: '#c96442' },
          { label: '中等评分', count: medium.length, threshold: `${THRESHOLDS.medium * 100}-${THRESHOLDS.high * 100}%`, items: medium, border: '#e8e6dc', bg: '#f5f4ed', countColor: '#5e5d59' },
          { label: '评分较低', count: low.length, threshold: `<${THRESHOLDS.medium * 100}%`, items: low, border: '#b53333', bg: 'rgba(181,51,51,0.04)', countColor: '#b53333' },
        ].map((card) => (
          <div key={card.label} className="rounded-lg p-5 text-center" style={{
            backgroundColor: card.bg,
            border: `1px solid ${card.border}`,
          }}>
            <div className="text-3xl font-medium" style={{ color: card.countColor, fontFamily: 'Georgia, serif' }}>{card.count}</div>
            <div className="text-xs font-ui mt-1" style={{ color: '#87867f' }}>{card.label} ({card.threshold})</div>
            <div className="flex flex-wrap justify-center gap-1 mt-3">
              {card.items.slice(0, 5).map((p) => (
                <span key={p.id} className="px-2 py-0.5 rounded text-[10px] font-ui font-medium" style={{
                  backgroundColor: card.border === '#c96442' ? 'rgba(201,100,66,0.08)' : card.border === '#b53333' ? 'rgba(181,51,51,0.08)' : '#e8e6dc',
                  color: card.border === '#c96442' ? '#c96442' : card.border === '#b53333' ? '#b53333' : '#4d4c48',
                }}>{p.name}</span>
              ))}
              {card.items.length > 5 && <span className="text-[10px] font-ui" style={{ color: '#87867f' }}>+{card.items.length - 5}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg p-5" style={{ backgroundColor: '#faf9f5', border: '1px solid #f0eee6', boxShadow: 'rgba(0,0,0,0.03) 0px 2px 12px' }}>
        <h3 className="text-sm font-medium mb-3" style={{ fontFamily: 'Georgia, serif', color: '#141413' }}>分类统计</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(catCounts).map(([cat, count]) => (
            <div key={cat} className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f5f4ed' }}>
              <div className="text-lg font-medium" style={{ color: '#4d4c48' }}>{count}</div>
              <div className="text-xs font-ui" style={{ color: '#87867f' }}>{CATEGORY_LABELS[cat] || cat}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
