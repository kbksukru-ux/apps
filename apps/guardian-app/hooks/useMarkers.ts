import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export function useMarkers(bounds?: string) {
  return useQuery({
    queryKey: ['markers', bounds],
    queryFn: async () => {
      try {
        const { data } = await api.get('/map/markers', {
          params: { bbox: bounds },
        });
        return data.data;
      } catch (error) {
        console.error('Markers API error:', error);
        return { markers: [] }; // Return empty markers on error
      }
    },
    enabled: !!bounds, // Only run query when bounds is available
  });
}

