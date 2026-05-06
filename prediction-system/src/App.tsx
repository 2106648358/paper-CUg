import { useEffect, useMemo, useState } from 'react';
import Layout from '@/components/common/Layout';
import PieChart from '@/components/common/PieChart';
import JudgmentMatrix from '@/components/ahp/JudgmentMatrix';
import EWMViewer from '@/components/ewm/EWMViewer';
import AlphaSlider from '@/components/hybrid/AlphaSlider';
import WeightComparison from '@/components/hybrid/WeightComparison';
import RankingTable from '@/components/projects/RankingTable';
import RadarChart from '@/components/projects/RadarChart';
import ScoreBreakdown from '@/components/projects/ScoreBreakdown';
import PredictionSummary from '@/components/prediction/PredictionSummary';
import MethodComparison from '@/components/prediction/MethodComparison';
import SensitivityAnalysis from '@/components/prediction/SensitivityAnalysis';
import PredictionTable from '@/components/prediction/PredictionTable';
import OlympicTrend from '@/components/prediction/OlympicTrend';

import { projects as allProjects, dimensions } from '@/lib/thesisData';
import { combineWeights, rankProjects, calcProbability } from '@/lib/calculation';
import { useAppStore } from '@/store';

const tabStyle = (active: boolean): React.CSSProperties => ({
  flex: 1,
  padding: '10px 16px',
  fontSize: 13,
  fontWeight: active ? 500 : 400,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  color: active ? '#c96442' : '#5e5d59',
  backgroundColor: active ? 'rgba(201,100,66,0.04)' : 'transparent',
  borderBottom: active ? '2px solid #c96442' : '2px solid transparent',
  transition: 'all 0.15s ease',
  cursor: 'pointer',
  outline: 'none',
});

const cardStyle: React.CSSProperties = {
  backgroundColor: '#faf9f5',
  border: '1px solid #f0eee6',
  borderRadius: 8,
  boxShadow: 'rgba(0,0,0,0.03) 0px 2px 12px',
};

export default function App() {
  const [weightTab, setWeightTab] = useState<'ahp' | 'ewm' | 'hybrid'>('ahp');
  const [predictionTab, setPredictionTab] = useState<'summary' | 'comparison' | 'sensitivity' | 'trend'>('summary');

  const {
    alpha, setAlpha, projects, setProjects,
    filteredCategory, setFilteredCategory,
    ahpWeights, setWeights, ewmWeights, hybridWeights,
    selectedProjects, toggleProjectSelection, selectAllProjects, clearSelection,
    currentStep, setCurrentStep,
  } = useAppStore();

  useEffect(() => {
    const hybrid = combineWeights(ahpWeights, ewmWeights, alpha);
    setWeights('hybrid', hybrid);
  }, [alpha, ahpWeights, ewmWeights, setWeights]);

  useEffect(() => {
    const ranked = rankProjects(
      allProjects.map((p) => ({ id: p.id, name: p.name, indicators: p.indicators })),
      hybridWeights
    );
    const allScores = ranked.map((r) => r.score);
    const updated = allProjects.map((p) => {
      const r = ranked.find((rk) => rk.id === p.id);
      return {
        ...p,
        score: r?.score,
        rank: r?.rank,
        probability: r ? calcProbability(r.score, allScores) : 0,
      };
    });
    setProjects(updated);
  }, [hybridWeights, setProjects]);

  const filteredProjects = useMemo(() => {
    if (filteredCategory === 'all') return projects;
    return projects.filter((p) => p.category === filteredCategory);
  }, [projects, filteredCategory]);

  const selectedProjectData = useMemo(
    () => projects
      .filter((p) => selectedProjects.includes(p.id))
      .map((p) => ({ name: p.name, indicators: p.indicators })),
    [projects, selectedProjects]
  );

  const ahpPieData = Object.entries(ahpWeights).map(([id, value]) => {
    const dim = dimensions.find((d) => d.id === id);
    return { name: dim?.name || id, value };
  });
  const ewmPieData = Object.entries(ewmWeights).map(([id, value]) => {
    const dim = dimensions.find((d) => d.id === id);
    return { name: dim?.name || id, value };
  });
  const hybridPieData = Object.entries(hybridWeights).map(([id, value]) => {
    const dim = dimensions.find((d) => d.id === id);
    return { name: dim?.name || id, value };
  });

  const renderWeightContent = () => {
    switch (weightTab) {
      case 'ahp':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <JudgmentMatrix />
            <div style={cardStyle} className="p-4">
              <PieChart data={ahpPieData} title="AHP 权重分布" height={300} />
            </div>
          </div>
        );
      case 'ewm':
        return <EWMViewer />;
      case 'hybrid':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { data: ahpPieData, title: 'AHP 主观权重' },
                { data: ewmPieData, title: 'EWM 客观权重' },
                { data: hybridPieData, title: `混合权重 (α=${alpha.toFixed(2)})` },
              ].map((item) => (
                <div key={item.title} style={cardStyle} className="p-4">
                  <PieChart data={item.data} title={item.title} height={260} />
                </div>
              ))}
            </div>
            <AlphaSlider value={alpha} onChange={setAlpha} />
            <WeightComparison ahpWeights={ahpWeights} ewmWeights={ewmWeights} hybridWeights={hybridWeights} />
          </div>
        );
    }
  };

  const renderRankingContent = () => {
    const categories = [
      { key: 'all', label: '全部' },
      { key: 'core', label: '核心' },
      { key: 'new', label: '新增' },
      { key: 'candidate', label: '候选' },
      { key: 'removed', label: '已移除' },
    ];

    return (
      <div className="space-y-4">
        <div style={cardStyle} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium" style={{ fontFamily: 'Georgia, serif', color: '#141413' }}>
              项目综合评估与排名
            </h2>
            <div className="flex gap-1.5">
              {categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setFilteredCategory(c.key)}
                  className="px-3 py-1.5 rounded text-xs font-ui transition-colors"
                  style={{
                    backgroundColor: filteredCategory === c.key ? '#c96442' : '#e8e6dc',
                    color: filteredCategory === c.key ? '#faf9f5' : '#4d4c48',
                    fontWeight: filteredCategory === c.key ? 500 : 400,
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={selectAllProjects}
              className="px-3 py-1.5 rounded text-xs font-ui transition-colors"
              style={{
                backgroundColor: '#e8e6dc',
                color: '#4d4c48',
                border: '1px solid #e8e6dc',
              }}
            >
              全选
            </button>
            <button
              onClick={clearSelection}
              className="px-3 py-1.5 rounded text-xs font-ui transition-colors"
              style={{
                backgroundColor: '#e8e6dc',
                color: '#4d4c48',
                border: '1px solid #e8e6dc',
              }}
            >
              清空
            </button>
            <span className="text-xs font-ui ml-2" style={{ color: '#87867f' }}>
              已选 {selectedProjects.length} 项，可在右侧雷达图中对比
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RankingTable
            projects={filteredProjects}
            selectedIds={selectedProjects}
            onSelect={toggleProjectSelection}
          />
          <RadarChart data={selectedProjectData} />
        </div>
        <ScoreBreakdown projects={filteredProjects} weights={hybridWeights} />
      </div>
    );
  };

  const renderPredictionContent = () => {
    const tabs = [
      { key: 'summary', label: '预测概览' },
      { key: 'comparison', label: '方法对比' },
      { key: 'sensitivity', label: '灵敏度分析' },
      { key: 'trend', label: '历史趋势' },
    ];

    return (
      <div className="space-y-4">
        <div style={cardStyle}>
          <div className="flex border-b" style={{ borderColor: '#f0eee6' }}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setPredictionTab(tab.key as typeof predictionTab)}
                style={tabStyle(predictionTab === tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {predictionTab === 'summary' && (
          <>
            <PredictionSummary projects={projects} />
            <PredictionTable projects={projects} />
          </>
        )}
        {predictionTab === 'comparison' && (
          <MethodComparison
            projects={projects}
            ahpWeights={ahpWeights}
            ewmWeights={ewmWeights}
            hybridWeights={hybridWeights}
          />
        )}
        {predictionTab === 'sensitivity' && (
          <SensitivityAnalysis
            projects={projects}
            ahpWeights={ahpWeights}
            ewmWeights={ewmWeights}
          />
        )}
        {predictionTab === 'trend' && (
          <OlympicTrend />
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div style={cardStyle}>
              <div className="flex border-b" style={{ borderColor: '#f0eee6' }}>
                {[
                  { id: 'ahp', label: 'AHP 主观权重' },
                  { id: 'ewm', label: 'EWM 客观权重' },
                  { id: 'hybrid', label: '混合权重' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setWeightTab(tab.id as typeof weightTab)}
                    style={tabStyle(weightTab === tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            {renderWeightContent()}
          </div>
        );
      case 2:
        return renderRankingContent();
      case 3:
        return renderPredictionContent();
      default:
        return null;
    }
  };

  return (
    <Layout currentStep={currentStep} onStepChange={setCurrentStep}>
      {renderContent()}
    </Layout>
  );
}
