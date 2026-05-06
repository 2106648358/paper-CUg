interface LayoutProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  children: React.ReactNode;
}

const steps = [
  { id: 1, label: '权重配置' },
  { id: 2, label: '综合评分' },
  { id: 3, label: '预测分析' },
];

export default function Layout({ currentStep, onStepChange, children }: LayoutProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f4ed' }}>
      <header className="border-b" style={{ backgroundColor: '#faf9f5', borderColor: '#f0eee6' }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-medium" style={{ color: '#141413', fontFamily: 'Georgia, serif', lineHeight: 1.2 }}>
              奥运项目评估与预测系统
            </h1>
            <p className="text-sm mt-0.5 font-ui" style={{ color: '#87867f' }}>
              基于 AHP-EWM 混合权重模型
            </p>
          </div>
        </div>
      </header>

      <nav className="border-b" style={{ backgroundColor: '#faf9f5', borderColor: '#f0eee6' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex">
            {steps.map((s) => {
              const active = currentStep === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onStepChange(s.id)}
                  className="px-6 py-3 text-sm font-ui transition-colors relative"
                  style={{
                    color: active ? '#c96442' : '#5e5d59',
                    borderBottom: active ? '2px solid #c96442' : '2px solid transparent',
                    backgroundColor: active ? 'rgba(201,100,66,0.04)' : 'transparent',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    fontWeight: active ? 500 : 400,
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
