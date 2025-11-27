import { create } from 'zustand';

type Plan = 'free' | 'premium';

type State = {
  plan: Plan;
  offlineEnabled: boolean;
  setPlan: (plan: Plan) => void;
};

export const useSubscriptionStore = create<State>((set) => ({
  plan: 'free',
  offlineEnabled: false,
  setPlan: (plan) =>
    set({
      plan,
      offlineEnabled: plan === 'premium',
    }),
}));

