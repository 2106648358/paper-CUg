import { LABELS_CN, AHJ_JUDGMENT_MATRIX, EXPERT_PRIORITIES } from '@/lib/thesisData';
import { powerIteration, calcConsistency } from '@/lib/calculation';

export default function JudgmentMatrix() {
  const n = AHJ_JUDGMENT_MATRIX.length;
  const { eigenvalue, eigenvector } = powerIteration(AHJ_JUDGMENT_MATRIX);
  const consistency = calcConsistency(AHJ_JUDGMENT_MATRIX, eigenvalue);

  return (
    <div className="rounded-lg p-5" style={{ backgroundColor: '#faf9f5', border: '1px solid #f0eee6', boxShadow: 'rgba(0,0,0,0.03) 0px 2px 12px' }}>
      <h3 className="text-base font-medium mb-4" style={{ fontFamily: 'Georgia, serif', color: '#141413' }}>
        AHP 综合判断矩阵
      </h3>
      <p className="text-xs mb-3 font-ui" style={{ color: '#87867f' }}>几何平均整合五位专家判断</p>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full text-xs border-collapse font-ui">
          <thead>
            <tr>
              <th className="px-2 py-1.5 border text-left font-medium" style={{ borderColor: '#e8e6dc', backgroundColor: '#f5f4ed', color: '#5e5d59' }}></th>
              {LABELS_CN.map((l) => (
                <th key={l} className="px-2 py-1.5 border text-right font-medium" style={{ borderColor: '#e8e6dc', backgroundColor: '#f5f4ed', color: '#5e5d59' }}>{l}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AHJ_JUDGMENT_MATRIX.map((row, i) => (
              <tr key={i}>
                <td className="px-2 py-1.5 border font-medium" style={{ borderColor: '#e8e6dc', backgroundColor: '#f5f4ed', color: '#5e5d59' }}>{LABELS_CN[i]}</td>
                {row.map((val, j) => (
                  <td key={j} className="px-2 py-1.5 border text-right font-mono" style={{
                    borderColor: '#e8e6dc',
                    backgroundColor: i === j ? 'rgba(201,100,66,0.04)' : 'transparent',
                    color: '#4d4c48',
                  }}>
                    {val.toFixed(3)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {[
          { label: 'λ_max', value: eigenvalue.toFixed(3) },
          { label: 'CI', value: consistency.CI.toFixed(4) },
          { label: 'CR', value: consistency.CR.toFixed(4) },
          { label: '一致性', value: consistency.passed ? '✓ 通过' : '✗ 不通过', color: consistency.passed ? '#c96442' : '#b53333' },
        ].map((item) => (
          <div key={item.label} className="rounded-lg p-3 text-center" style={{ backgroundColor: '#f5f4ed' }}>
            <div className="text-xs font-ui" style={{ color: '#87867f' }}>{item.label}</div>
            <div className="text-sm font-mono font-medium mt-0.5" style={{ color: item.color || '#4d4c48' }}>{item.value}</div>
          </div>
        ))}
      </div>

      <h4 className="text-xs font-medium mb-2 font-ui" style={{ color: '#5e5d59' }}>AHP 权重结果</h4>
      <div className="flex flex-wrap gap-2">
        {eigenvector.map((w, i) => (
          <span key={i} className="px-2.5 py-1 rounded text-xs font-ui" style={{
            backgroundColor: 'rgba(201,100,66,0.08)',
            color: '#c96442',
          }}>
            {LABELS_CN[i]}: {(w * 100).toFixed(1)}%
          </span>
        ))}
      </div>

      <details className="mt-4">
        <summary className="text-xs font-ui cursor-pointer" style={{ color: '#87867f' }}>查看五位专家权重偏好</summary>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-xs border-collapse font-ui">
            <thead>
              <tr>
                <th className="px-2 py-1.5 border text-left font-medium" style={{ borderColor: '#e8e6dc', backgroundColor: '#f5f4ed', color: '#5e5d59' }}></th>
                {LABELS_CN.map((l) => (
                  <th key={l} className="px-2 py-1.5 border text-right font-medium" style={{ borderColor: '#e8e6dc', backgroundColor: '#f5f4ed', color: '#5e5d59' }}>{l}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EXPERT_PRIORITIES.map((exp) => (
                <tr key={exp.name}>
                  <td className="px-2 py-1.5 border font-medium" style={{ borderColor: '#e8e6dc', backgroundColor: '#f5f4ed', color: '#3d3d3a', fontSize: '10px' }}>{exp.name}</td>
                  {exp.weights.map((w, j) => (
                    <td key={j} className="px-2 py-1.5 border text-right font-mono" style={{ borderColor: '#e8e6dc', color: '#4d4c48' }}>{(w * 100).toFixed(1)}%</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
