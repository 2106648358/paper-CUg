import { create } from 'zustand';
import type { Project } from '@/types';
import { AHP_WEIGHTS, EWM_WEIGHTS, HYBRID_WEIGHTS_05 } from '@/lib/thesisData';

interface AppState {
  alpha: number;
  projects: Project[];
  filteredCategory: string;
  ahpWeights: Record<string, number>;
  ewmWeights: Record<string, number>;
  hybridWeights: Record<string, number>;
  selectedProjects: string[];
  currentStep: number;

  setAlpha: (alpha: number) => void;
  setProjects: (projects: Project[]) => void;
  setFilteredCategory: (cat: string) => void;
  setWeights: (type: 'ahp' | 'ewm' | 'hybrid', weights: Record<string, number>) => void;
  toggleProjectSelection: (projectId: string) => void;
  selectAllProjects: () => void;
  clearSelection: () => void;
  setCurrentStep: (step: number) => void;
}

export const useAppStore = create<AppState>()((set, get) => ({
  alpha: 0.5,
  projects: [],
  filteredCategory: 'all',
  ahpWeights: { ...AHP_WEIGHTS },
  ewmWeights: { ...EWM_WEIGHTS },
  hybridWeights: { ...HYBRID_WEIGHTS_05 },
  selectedProjects: ['esports', 'swimming', 'basketball', 'athletics', 'football'],
  currentStep: 1,

  setAlpha: (alpha) => set({ alpha }),
  setProjects: (projects) => set({ projects }),
  setFilteredCategory: (cat) => set({ filteredCategory: cat }),

  setWeights: (type, weights) => {
    if (type === 'ahp') set({ ahpWeights: weights });
    else if (type === 'ewm') set({ ewmWeights: weights });
    else set({ hybridWeights: weights });
  },

  toggleProjectSelection: (projectId) => {
    const selected = get().selectedProjects;
    if (selected.includes(projectId)) {
      set({ selectedProjects: selected.filter((id) => id !== projectId) });
    } else {
      set({ selectedProjects: [...selected, projectId] });
    }
  },

  selectAllProjects: () => {
    set({ selectedProjects: get().projects.map((p) => p.id) });
  },

  clearSelection: () => set({ selectedProjects: [] }),
  setCurrentStep: (step) => set({ currentStep: step }),
}));
