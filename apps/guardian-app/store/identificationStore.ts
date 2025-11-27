import { create } from 'zustand';

export type MatchResult = {
  latinName: string;
  commonName?: string;
  probability: number;
  toxicity?: 'non_toxic' | 'caution' | 'toxic' | 'unknown';
};

type Identification = {
  id: string;
  matches: MatchResult[];
  disclaimer: string;
  createdAt: string;
  disableRecipes: boolean;
};

type State = {
  history: Identification[];
  addResult: (result: Identification) => void;
};

export const useIdentificationStore = create<State>((set) => ({
  history: [],
  addResult: (result) =>
    set((state) => ({
      history: [result, ...state.history].slice(0, 5),
    })),
}));

