import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { cacheGuides, readCachedGuides } from '@/lib/offline';
import { useSubscriptionStore } from '@/store/subscriptionStore';

export function useGuides() {
  const plan = useSubscriptionStore((s) => s.plan);
  return useQuery({
    queryKey: ['guides', plan],
    queryFn: async () => {
      const cached = await readCachedGuides();
      try {
        const { data } = await api.get('/content/guides', {
          params: { premium: plan === 'premium' },
        });
        await cacheGuides(data.data);
        return data.data;
      } catch (error) {
        if (cached.length > 0) {
          return cached;
        }
        throw error;
      }
    },
  });
}

