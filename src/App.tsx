import type { ReactNode } from 'react';
import { ThemeProvider } from '@/theme/provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from '@/components/toast';

if (import.meta.env.DEV) {
  import('react-scan').then(({ scan }) => {
    scan({
      enabled: false,
      showToolbar: true,
      log: false,
      animationSpeed: 'fast'
    });
  });
}

interface IProps {
  children?: ReactNode;
}

function App({ children }: IProps) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider>
        <Toast />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
