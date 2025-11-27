import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
    },
  },
});

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  const [queryClient] = useState(client);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SafeAreaProvider>
  );
}

