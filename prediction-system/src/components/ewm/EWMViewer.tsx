import { LABELS_CN, EWM_ENTROPY, EWM_UTILITY, EWM_WEIGHTS } from '@/lib/thesisData';
import PieChart from '@/components/common/PieChart';

export default function EWMViewer() {
  const entropyData = LABELS_CN.map((name, i) => ({
    name,
    value: Object.values(EWM_ENTROPY)[i],
  }));

  const weightPieData = LABELS_CN.map((name, i) => ({
    name,
    value: Object.values(EWM_WEIGHTS)[i],
  }));

  return (
    <div className="space-y-4">
      <div className="rounded-lg p-5" style={{ backgroundColor: '#faf9f5', border: '1px solid #f0eee6', boxShadow: 'rgba(0,0,0,0.03) 0px 2px 12px' }}>
        <h3 className="text-base font-medium mb-1" style={{ fontFamily: 'Georgia, serif', color: '#141413' }}>
          EWM 熵权法计算
        </h3>
        <p className="text-xs mb-4 font-ui" style={{ color: '#87867f' }}>基于12个代表性项目的六维评分数据</p>
        <div className="overflow-x-auto mb-2">
          <table className="min-w-full text-xs border-collapse font-ui">
            <thead>
              <tr>
                <th className="px-3 py-2 border text-left font-medium" style={{ borderColor: '#e8e6dc', backgroundColor: '#f5f4ed', color: '#5e5d59' }}>指标</th>
                <th className="px-3 py-2 border text-right font-medium" style={{ borderColor: '#e8e6dc', backgroundColor: '#f5f4ed', color: '#5e5d59' }}>信息熵 H_j</th>
                <th className="px-3 py-2 border text-right font-medium" style={{ borderColor: '#e8e6dc', backgroundColor: '#f5f4ed', color: '#5e5d59' }}>效用值 D_j</th>
                <th className="px-3 py-2 border text-right font-medium" style={{ borderColor: '#e8e6dc', backgroundColor: '#f5f4ed', color: '#5e5d59' }}>EWM 权重</th>
              </tr>
            </thead>
            <tbody>
              {LABELS_CN.map((name, i) => (
                <tr key={name}>
                  <td className="px-3 py-2 border font-medium" style={{ borderColor: '#e8e6dc', color: '#4d4c48' }}>{name}</td>
                  <td className="px-3 py-2 border text-right font-mono" style={{ borderColor: '#e8e6dc', color: '#4d4c48' }}>{Object.values(EWM_ENTROPY)[i].toFixed(3)}</td>
                  <td className="px-3 py-2 border text-right font-mono" style={{ borderColor: '#e8e6dc', color: '#4d4c48' }}>{Object.values(EWM_UTILITY)[i].toFixed(3)}</td>
                  <td className="px-3 py-2 border text-right font-mono font-medium" style={{ borderColor: '#e8e6dc', color: '#c96442' }}>{(Object.values(EWM_WEIGHTS)[i] * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg p-4" style={{ backgroundColor: '#faf9f5', border: '1px solid #f0eee6', boxShadow: 'rgba(0,0,0,0.03) 0px 2px 12px' }}>
          <PieChart data={entropyData} title="信息熵分布" height={260} />
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: '#faf9f5', border: '1px solid #f0eee6', boxShadow: 'rgba(0,0,0,0.03) 0px 2px 12px' }}>
          <PieChart data={weightPieData} title="EWM 权重分布" height={260} />
        </div>
      </div>
    </div>
  );
}
