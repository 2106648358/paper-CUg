interface AlphaSliderProps {
  value: number;
  onChange: (v: number) => void;
}

export default function AlphaSlider({ value, onChange }: AlphaSliderProps) {
  return (
    <div className="rounded-lg p-5" style={{ backgroundColor: '#faf9f5', border: '1px solid #f0eee6', boxShadow: 'rgba(0,0,0,0.03) 0px 2px 12px' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium" style={{ fontFamily: 'Georgia, serif', color: '#141413' }}>
          混合系数 α
        </span>
        <span className="text-lg font-mono font-medium" style={{ color: '#c96442' }}>
          {value.toFixed(2)}
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
        style={{
          backgroundColor: '#e8e6dc',
          accentColor: '#c96442',
        }}
      />
      <div className="flex justify-between text-xs font-ui mt-2" style={{ color: '#87867f' }}>
        <span>纯 EWM (α=0)</span>
        <span>平衡 (α=0.5)</span>
        <span>纯 AHP (α=1)</span>
      </div>
    </div>
  );
}
